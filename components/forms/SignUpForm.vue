<template>
  <div class="overlay-bg min-h-screen grid place-content-center p-4">
    <div class="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Sign Up</h1>
        <p class="text-gray-600 text-sm">You're about to join 12,000+ incredible members</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Social Sign Up -->
        <div>
          <p class="text-sm text-gray-600 mb-4 text-center">Sign Up With</p>
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

        <!-- OR Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        <!-- Form Fields -->
        <div class="space-y-4">
          <!-- Account Type -->
          <div class="relative">
            <select v-model="accountType" @change="handleAccountTypeChange" class="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 appearance-none cursor-pointer">
              <option value="individual">Individual</option>
              <option value="organization">Organization</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>

          <!-- Organization Name (shown only for organizations) -->
          <div v-if="accountType === 'organization'">
            <input 
              v-model="user.organizationName" 
              type="text" 
              placeholder="Organization Name" 
              class="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400"
              required
            >
          </div>

          <!-- Name Fields (shown only for individuals) -->
          <div v-if="accountType === 'individual'" class="grid grid-cols-2 gap-3">
            <input 
              v-model="user.firstName" 
              type="text" 
              placeholder="First Name" 
              class="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400"
              required
            >
            <input 
              v-model="user.lastName" 
              type="text" 
              placeholder="Last Name" 
              class="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400"
              required
            >
          </div>

          <!-- Email -->
          <input 
            v-model="user.email" 
            type="email" 
            placeholder="Email" 
            class="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400"
            required
          >

          <!-- Phone Number -->
          <div class="flex">
            <div class="relative w-32">
              <select v-model="phoneCountryCode" class="w-full p-3 border border-gray-300 rounded-l-lg bg-white text-gray-700 appearance-none cursor-pointer">
                <option value="+234">🇳🇬 +234</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            <input 
              v-model="phoneNumber" 
              type="tel" 
              placeholder="Phone Number" 
              class="flex-1 p-3 border border-gray-300 rounded-r-lg border-l-0 placeholder-gray-400"
              required
            >
          </div>

          <!-- Password -->
          <input 
            v-model="user.password" 
            type="password" 
            placeholder="Password" 
            class="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-400"
            required
          >
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-600 text-sm text-center">
          {{ error }}
        </div>

        <!-- Sign Up Button -->
        <div class="pt-2">
          <buttons-hover-gradient-button 
            :text="isSubmitting ? 'Signing Up...' : 'Sign Up'" 
            :disabled="isSubmitting"
            class="w-full"
            @click="handleSubmit"
          />
        </div>

        <!-- Sign In Link -->
        <div class="text-right">
          <p class="text-sm text-gray-600">
            Have an account? 
            <NuxtLink to="/auth/sign-in" class="text-blue-600 hover:text-blue-700 font-medium">Sign In</NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User} from '../../types';

const accountType = ref<'individual' | 'organization'>('individual')
const phoneCountryCode = ref('+234')
const phoneNumber = ref('')
const isSubmitting = ref(false)
const error = ref('')

const user = ref<User>({
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isOrganization: false,
  role: 'mentee',
  __v: 0,
  googleId: '',
  facebookId: '',
  phoneNumber: '',
  organizationName: '',
})

const handleAccountTypeChange = () => {
  if (accountType.value === 'organization') {
    user.value.isOrganization = true
    user.value.role = 'mentor'
    user.value.firstName = ''
    user.value.lastName = ''
  } else {
    user.value.isOrganization = false
    user.value.role = 'mentee'
    user.value.organizationName = ''
  }
}

const handleSubmit = async () => {
  error.value = ''
  isSubmitting.value = true

  try {
    // Combine phone country code and number
    user.value.phoneNumber = phoneCountryCode.value + phoneNumber.value

    // Prepare payload matching the sample request structure
    const payload = {
      firstName: user.value.firstName || '',
      lastName: user.value.lastName || '',
      email: user.value.email,
      password: user.value.password,
      role: user.value.role,
      googleId: user.value.googleId || '',
      facebookId: user.value.facebookId || '',
      isOrganization: user.value.isOrganization,
      organizationName: user.value.organizationName || '',
      phoneNumber: user.value.phoneNumber,
      gender: user.value.gender || '',
      dateOfBirth: user.value.dateOfBirth || '',
      nationality: user.value.nationality || '',
      country: user.value.country || '',
      linkedIn: user.value.linkedIn || '',
      twitter: user.value.twitter || '',
      facebook: user.value.facebook || '',
      youtube: user.value.youtube || '',
      instagram: user.value.instagram || '',
      skillsAndInterests: user.value.skillsAndInterests || [],
      bio: user.value.bio || '',
    }

    const { post } = useApi()
    const response = await post('/auth/register', payload)

    if (response.status === 200 || response.status === 201) {
      // Success - redirect to sign in or show success message
      navigateTo('/auth/sign-in')
    } else {
      error.value = 'Registration failed. Please try again.'
    }
  } catch (e: any) {
    console.error('Registration error:', e)
    error.value = e?.data?.message || 'Registration failed. Please try again.'
  } finally {
    isSubmitting.value = false
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

