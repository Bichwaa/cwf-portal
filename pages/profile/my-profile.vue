<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-2xl text-left font-bold uppercase">MY PROFILE</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column - Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Profile Header Card -->
        <div class="bg-white rounded-2xl shadow-sm p-6">
          <div class="flex items-start justify-between">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <h2 class="text-2xl text-left font-semibold text-gray-800">Hello {{ user?.firstName || 'User' }},</h2>
                <div class="flex items-center space-x-2 text-gray-500 mt-1">
                  <Icon name="material-symbols:location-on-outline-rounded" class="w-6 h-6 text-gray-400" />
                  <span>{{ user?.country || '—' }}</span>
                  <span>•</span>
                  <span class="text-gray-500">2:46 pm local time</span>
                </div>
                
              </div>
            </div>
            <div class="flex items-center space-x-2 bg-[#D0FBE0] rounded-3xl px-4 py-1">
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              <span class="text-green-600 font-medium">Active</span>
            </div>
          </div>
        </div>

        <!-- Personal Info Card -->
        <div class="bg-white shadow-sm p-6 rounded-2xl">
          <h3 class="text-lg text-left font-semibold text-gray-800 mb-4">Personal Info</h3>
          <hr class="my-4"/>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-full bg-gray-200">
                <Icon name="hugeicons:mail-at-sign-01" class="w-6 h-6 text-gray-600" />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-sm text-gray-400 text-start">Email Address</span>
                <span class="text-gray-700 text-start">{{ user?.email || '—' }}</span>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-full bg-gray-200">
                <Icon name="mdi:phone-in-talk-outline" class="w-6 h-6 text-gray-600" />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-sm text-gray-400 text-start">Phone Number</span>
                <span class="text-gray-700 text-start">{{ user?.phoneNumber || '—' }}</span>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-full bg-gray-200">
                <Icon name="ion:male-female-outline" class="w-6 h-6 text-gray-600" />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-sm text-gray-400 text-start">Gender</span>
                <span class="text-gray-700 text-start capitalize">{{ user?.gender || '—' }}</span>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-full bg-gray-200">
                <Icon name="material-symbols-light:calendar-month-outline-rounded" class="w-6 h-6 text-gray-600" />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-sm text-gray-400 text-start">Date of Birth</span>
                <span class="text-gray-700 text-start">{{ formattedDob }}</span>
              </div>
            </div>
            <hr class="my-4 col-span-2"/>
            <div class="col-span-2 grid grid-cols-2 gap-4">
              <div class="flex items-center space-x-3">
              <div class="p-2 rounded-full bg-gray-200">
                <Icon name="healthicons:globe-outline" class="w-6 h-6 text-gray-600" />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-sm text-gray-400 text-start">Nationality</span>
                <span class="text-gray-700 text-start">{{ user?.nationality || '—' }}</span>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-full bg-gray-200">
                <Icon name="healthicons:globe-outline" class="w-6 h-6 text-gray-600" />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-sm text-gray-400 text-start">Country of Residence</span>
                <span class="text-gray-700 text-start">{{ user?.country || '—' }}</span>
              </div>
            </div>
            </div>
          </div>
        </div>

        <!-- Volunteered Events Card -->
        <div class="bg-white rounded-2xl shadow-sm p-6">
          <h3 class="text-lg text-left font-semibold text-gray-800 mb-4">Volunteered Events</h3>
          <hr class="my-4"/>
          <div class="text-center py-8">
            <div class="w-32 h-32 mx-auto mb-4 rounded-lg flex items-center justify-center">
              <nuxt-img src="/volunteers.svg" alt="Volunteer" class="w-64 h-34 object-cover" />
            </div>
            <h4 class="text-lg font-semibold text-gray-800 mb-2">You Haven't Volunteered Any Event Yet</h4>
            <p class="text-gray-500 mb-4">Make difference with your time and skills.</p>
            <button class="px-6 py-2 border shadow-sm border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              View Events
            </button>
          </div>
        </div>
      </div>

      <!-- Right Column - Sidebar -->
      <div class="space-y-6">
        <!-- Connect with Mentor Card -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg text-start font-semibold text-gray-800 mb-4">Connect with a Mentor or Become One</h3>
          <p class="text-gray-500 mb-4">Our mentorship program brings together experienced professionals who want to guide with young people</p>
          
          <div class="flex -space-x-2 mb-4">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center border-2 border-white">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center border-2 border-white">
              <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          
          <div class="flex items-center gap-4">
            <button @click="navigateTo('/mentors')" class="w-full px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
              Find a mentor
            </button>
            <button @click="navigateTo('/profile/become-a-mentor')" class="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
              Become a mentor
            </button>
          </div>
        </div>

        <!-- Skills & Interest Card -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg text-start font-semibold text-gray-800 mb-4">Skills & Interest</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="(skill, i) in (user?.skillsAndInterests || [])" :key="i" class="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">{{ skill }}</span>
            <span v-if="!user?.skillsAndInterests || user.skillsAndInterests.length === 0" class="text-gray-500 text-sm">No skills added yet</span>
          </div>
        </div>

        <!-- Social Media Card -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg text-start font-semibold text-gray-800 mb-4">Social Media</h3>
          <hr class="my-4"/>
          <div class="flex justify-between">
            <NuxtLink :to="user?.facebook || ''" target="_blank" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span class="text-gray-600 font-bold text-sm">f</span>
            </NuxtLink>
            <NuxtLink :to="user?.twitter || ''" target="_blank" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span class="text-gray-600 font-bold text-sm">X</span>
            </NuxtLink>
            <NuxtLink :to="user?.youtube || ''" target="_blank" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>
            <NuxtLink :to="user?.linkedIn || ''" target="_blank" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span class="text-gray-600 font-bold text-sm">in</span>
            </NuxtLink>
            <NuxtLink :to="user?.instagram || ''" target="_blank" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from '../../types'

const user = ref<User | null>(null)
const isLoading = ref(true)
const error = ref('')

const formattedDob = computed(() => {
  const dob = user.value?.dateOfBirth
  if (!dob) return '—'
  const iso = typeof dob === 'string' ? dob : (dob as { $date: string }).$date
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return '—'
  }
})

onMounted(async () => {
  const token = localStorage.getItem('auth_token')
  if (!token) {
    isLoading.value = false
    error.value = 'Not authenticated'
    return
  }

  try {
    const { get } = useApi()
    const me = await get<User>('/auth/me', {
      headers: { authorization: `Bearer ${token}` }
    })
    user.value = me.data
  } catch (e) {
    error.value = 'Failed to load profile'
  } finally {
    isLoading.value = false
  }
})
</script>
