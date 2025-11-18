<template>
  <div class="overlay-bg min-h-screen grid place-content-center p-4">
    <div class="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Sign In</h1>
        <p class="text-gray-600 text-sm">Log in to access your dashboard</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        
        <!-- Form Fields -->
        <div class="space-y-4">

          <!-- Email -->
          <div>
            <input 
              v-model="formData.email" 
              type="email" 
              placeholder="Email" 
              :class="[
                'w-full p-3 border rounded-lg placeholder-gray-400',
                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              ]"
              @blur="validateEmail"
            >
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div>
            <input 
              v-model="formData.password" 
              type="password" 
              placeholder="Password" 
              :class="[
                'w-full p-3 border rounded-lg placeholder-gray-400',
                errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
              ]"
              @blur="validatePassword"
            >
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
          </div>
        </div>

        <!-- OR Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white font-bold">Continue With</span>
          </div>
        </div>

        <!-- Social Sign Up -->
        <div>
          <div class="flex gap-3">
            <button type="button" class="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span class="text-gray-700 font-medium">Facebook</span>
            </button>
            <button type="button" class="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span class="text-gray-700 font-medium">Google</span>
            </button>
          </div>
        </div>


        <!-- Sign Up Button -->
        <div class="pt-2">
          <buttons-hover-gradient-button 
            :text="isLoading ? 'Signing In...' : 'Sign In'" 
            :disabled="isLoading"
            class="w-full"
            @click="handleSubmit"
          />
        </div>

        <!-- Error Message -->
        <div v-if="submitError" class="bg-red-50 border border-red-200 rounded-lg p-3">
          <p class="text-red-600 text-sm">{{ submitError }}</p>
        </div>

        <!-- Sign In Link -->
        <div class="text-right">
          <p class="text-sm text-gray-600">
            Don't have an account? 
            <a href="/profile/create" class="text-blue-600 hover:text-blue-700 font-medium">Sign Up</a>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()

// Form data
const formData = ref({
  email: '',
  password: ''
})

// Form state
const isLoading = ref(false)
const errors = ref({
  email: '',
  password: ''
})
const submitError = ref('')

// Validation functions
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.value.email) {
    errors.value.email = 'Email is required'
  } else if (!emailRegex.test(formData.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  } else {
    errors.value.email = ''
  }
}

const validatePassword = () => {
  if (!formData.value.password) {
    errors.value.password = 'Password is required'
  } else if (formData.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
  } else {
    errors.value.password = ''
  }
}

const validateForm = () => {
  validateEmail()
  validatePassword()
  return !errors.value.email && !errors.value.password
}

// Form submission
const handleSubmit = async () => {
  submitError.value = ''
  
  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    const { post } = useApi()
    const response = await post<{ accessToken?: string; refreshToken?: string, user: { role: string } }, { email: string; password: string }>(
      '/auth/login',
      {
        email: formData.value.email,
        password: formData.value.password
      }
    )

    // Handle successful login
    if (response.data.accessToken && response.data.refreshToken) {
      // Store token in localStorage or cookie
      localStorage.setItem('auth_token', response.data.accessToken)
      localStorage.setItem('refresh_token', response.data.refreshToken)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      // Redirect to profile
      if (response.data.user?.role === 'mentor') {
        await navigateTo('/profile/mentor-profile')
      } else {
        await navigateTo('/profile/my-profile')
      }
    }
  } catch (error: any) {
    console.error('Login error:', error)
    
    if (error.status === 401) {
      submitError.value = 'Invalid email or password'
    } else if (error.status === 422) {
      submitError.value = 'Please check your input and try again'
    } else if (error.status >= 500) {
      submitError.value = 'Server error. Please try again later.'
    } else {
      submitError.value = 'An error occurred. Please try again.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.overlay-bg {
  background-image: url('/also-mama.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
}

.overlay-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 80%, transparent 100%);
  z-index: 1;
}

.overlay-bg > * {
  position: relative;
  z-index: 2;
}
</style>

