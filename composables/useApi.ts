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

function mergeHeaders(defaults: ApiHeaders, overrides?: ApiHeaders, body?: any): ApiHeaders {
  const merged = { ...defaults, ...(overrides || {}) };
  
  // If body is FormData, remove Content-Type header - browser will set it automatically with boundary
  if (body instanceof FormData) {
    delete merged['Content-Type'];
  }
  
  return merged;
}

/**
 * Read tokens from cookies (not localStorage)
 */
function getAccessToken() {
  const tokenCookie = useCookie<string | null>("auth_token");
  return tokenCookie.value;
}

function getRefreshToken() {
  const tokenCookie = useCookie<string | null>("refresh_token");
  return tokenCookie.value;
}

// Prevent concurrent refresh attempts
let refreshPromise: Promise<string | null> | null = null;

/**
 * Refresh token using cookies
 */
async function refreshToken(): Promise<string | null> {
  // If a refresh is already in progress, wait for it
  if (refreshPromise) {
    return refreshPromise;
  }

  const refreshTokenValue = getRefreshToken();
  if (!refreshTokenValue) return null;

  refreshPromise = (async () => {
    try {
      const config = useRuntimeConfig();
      const response = await $fetch<{ accessToken: string; refreshToken: string }>(
        `${config.public.backendRootUrl}/auth/users/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            refreshToken: refreshTokenValue,
          },
        }
      );

      if (response.accessToken) {
        const tokenCookie = useCookie<string | null>("auth_token");
        const refreshTokenCookie = useCookie<string | null>("refresh_token");
        tokenCookie.value = response.accessToken;
        if (response.refreshToken) {
          refreshTokenCookie.value = response.refreshToken;
        }

        return response.accessToken;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      useCookie("auth_token").value = null;
      useCookie("refresh_token").value = null;
      return null;
    } finally {
      // Clear the promise so future refreshes can proceed
      refreshPromise = null;
    }
    return null;
  })();

  return refreshPromise;
}

async function makeRequest<TResponse>(
  url: string,
  options: any,
  retryCount = 0
): Promise<ApiResponse<TResponse>> {
  const maxRetries = 1;

  try {
    const response = await $fetch.raw<TResponse>(url, {
      ...options,
      credentials: "include", // ⬅ important for cookies
    });

    return {
      data: response._data as TResponse,
      status: response.status,
    };
  } catch (error: any) {
    if (error.status === 401 && retryCount < maxRetries) {
      const newToken = await refreshToken();
      if (newToken) {
        const updatedOptions = {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newToken}`,
          },
        };
        return await makeRequest<TResponse>(url, updatedOptions, retryCount + 1);
      } else {
        await navigateTo("/auth/sign-in");
        throw error;
      }
    }
    throw error;
  }
}

export function useApi() {
  const config = useRuntimeConfig();
  const baseURL = config.public.backendRootUrl;

  // Create headers dynamically to always get the latest token
  function getDefaultHeaders(body?: any): ApiHeaders {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken() ?? ""}`,
    };
  }

  async function get<TResponse>(path: string, options?: ApiOptions) {
    return makeRequest<TResponse>(`${baseURL}${path}`, {
      method: "GET",
      headers: mergeHeaders(getDefaultHeaders(), options?.headers),
      query: options?.query,
    });
  }

  async function post<TResponse, TBody extends FetchBody>(
    path: string,
    body?: TBody,
    options?: ApiOptions<TBody>
  ) {
    const requestBody = (body ?? options?.body) as FetchBody;
    return makeRequest<TResponse>(`${baseURL}${path}`, {
      method: "POST",
      headers: mergeHeaders(getDefaultHeaders(requestBody), options?.headers, requestBody),
      body: requestBody,
    });
  }

  async function put<TResponse, TBody extends FetchBody>(
    path: string,
    body?: TBody,
    options?: ApiOptions<TBody>
  ) {
    const requestBody = (body ?? options?.body) as FetchBody;
    return makeRequest<TResponse>(`${baseURL}${path}`, {
      method: "PUT",
      headers: mergeHeaders(getDefaultHeaders(requestBody), options?.headers, requestBody),
      body: requestBody,
    });
  }

  async function patch<TResponse, TBody extends FetchBody>(
    path: string,
    body?: TBody,
    options?: ApiOptions<TBody>
  ) {
    return makeRequest<TResponse>(`${baseURL}${path}`, {
      method: "PATCH",
      headers: mergeHeaders(getDefaultHeaders(), options?.headers),
      body: (body ?? options?.body) as FetchBody,
    });
  }

  async function del<TResponse>(path: string, options?: ApiOptions) {
    return makeRequest<TResponse>(`${baseURL}${path}`, {
      method: "DELETE",
      headers: mergeHeaders(getDefaultHeaders(), options?.headers),
      body: options?.body as FetchBody,
    });
  }

  return { get, post, put, patch, del };
}
