export type ApiHeaders = Record<string, string>

export type FetchBody = Record<string, any> | BodyInit | null | undefined

export interface ApiOptions<TBody extends FetchBody = FetchBody> {
  headers?: ApiHeaders
  query?: Record<string, string | number | boolean | null | undefined>
  body?: TBody
}

export interface ApiResponse<TData = unknown> {
  data: TData
  status: number
}

function mergeHeaders(defaults: ApiHeaders, overrides?: ApiHeaders): ApiHeaders {
  return { ...defaults, ...(overrides || {}) }
}

async function refreshToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refresh_token')
  if (!refreshToken) return null

  try {
    const config = useRuntimeConfig()
    const response = await $fetch<{ accessToken: string }>(`${config.public.backendRootUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken}`
      }
    })

    if (response.accessToken) {
      localStorage.setItem('auth_token', response.accessToken)
      return response.accessToken
    }
  } catch (error) {
    console.error('Token refresh failed:', error)
    // Clear invalid tokens
    localStorage.removeItem('auth_token')
    localStorage.removeItem('refresh_token')
  }

  return null
}

async function makeRequest<TResponse>(
  url: string,
  options: any,
  retryCount = 0
): Promise<ApiResponse<TResponse>> {
  const maxRetries = 1

  try {
    const response = await $fetch.raw<TResponse>(url, options)
    return {
      data: response._data as TResponse,
      status: response.status
    }
  } catch (error: any) {
    // Handle 401 Unauthorized with token refresh
    if (error.status === 401 && retryCount < maxRetries) {
      const newToken = await refreshToken()
      
      if (newToken) {
        // Update authorization header and retry
        const updatedOptions = {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${newToken}`
          }
        }
        
        return await makeRequest<TResponse>(url, updatedOptions, retryCount + 1)
      } else {
        // Refresh failed, redirect to login
        await navigateTo('/auth/sign-in')
        throw error
      }
    }
    
    throw error
  }
}

export function useApi() {
  const config = useRuntimeConfig()
  const baseURL = config.public.backendRootUrl

  const defaultHeaders: ApiHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  async function get<TResponse = unknown>(path: string, options: ApiOptions | undefined = undefined) {
    return await makeRequest<TResponse>(`${baseURL}${path}`, {
      method: 'GET',
      headers: mergeHeaders(defaultHeaders, options?.headers),
      query: options?.query
    })
  }

  async function post<
    TResponse = unknown,
    TBody extends FetchBody = FetchBody
  >(path: string, body?: TBody, options: ApiOptions<TBody> | undefined = undefined) {
    return await makeRequest<TResponse>(`${baseURL}${path}`, {
      method: 'POST',
      headers: mergeHeaders(defaultHeaders, options?.headers),
      body: (body ?? options?.body) as FetchBody
    })
  }

  async function put<
    TResponse = unknown,
    TBody extends FetchBody = FetchBody
  >(path: string, body?: TBody, options: ApiOptions<TBody> | undefined = undefined) {
    return await makeRequest<TResponse>(`${baseURL}${path}`, {
      method: 'PUT',
      headers: mergeHeaders(defaultHeaders, options?.headers),
      body: (body ?? options?.body) as FetchBody
    })
  }

  async function patch<
    TResponse = unknown,
    TBody extends FetchBody = FetchBody
  >(path: string, body?: TBody, options: ApiOptions<TBody> | undefined = undefined) {
    return await makeRequest<TResponse>(`${baseURL}${path}`, {
      method: 'PATCH',
      headers: mergeHeaders(defaultHeaders, options?.headers),
      body: (body ?? options?.body) as FetchBody
    })
  }

  async function del<TResponse = unknown>(path: string, options: ApiOptions | undefined = undefined) {
    return await makeRequest<TResponse>(`${baseURL}${path}`, {
      method: 'DELETE',
      headers: mergeHeaders(defaultHeaders, options?.headers),
      body: options?.body as FetchBody
    })
  }

  return { get, post, put, patch, del }
}
