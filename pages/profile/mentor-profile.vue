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
              <div class="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center bg-blue-100">
                <img 
                  v-if="profilePictureUrl" 
                  :src="profilePictureUrl" 
                  :alt="displayName" 
                  class="w-full h-full object-cover"
                />
                <svg v-else class="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <h2 class="text-2xl text-left font-semibold text-gray-800">Hello {{ displayName }},</h2>
                <div class="flex items-center space-x-2 text-gray-500 mt-1">
                  <Icon name="material-symbols:location-on-outline-rounded" class="w-6 h-6 text-gray-400" />
                  <span>{{ (user as any)?.metadata?.countryOfResidence || user?.country || '—' }}</span>
                  <span>•</span>
                  <span class="text-gray-500">2:46 pm local time</span>
                </div>
                
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex items-center space-x-2 bg-[#F9F4C8] rounded-3xl px-4 py-1">
              <Icon name="material-symbols:crown" class="w-6 h-6 text-[#E5BA23]" />
              <span class="text-[#E5BA23] font-medium">Mentor</span>
            </div>
            <div class="flex items-center space-x-2 bg-[#D0FBE0] rounded-3xl px-4 py-1">
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              <span class="text-green-600 font-medium">Active</span>
            </div>
            </div>
          </div>
        </div>

        <!-- Personal Info Card -->
        <div class="bg-white shadow-sm p-6 rounded-2xl">
          <h3 class="text-lg text-left font-semibold text-gray-800 mb-4">Personal Info</h3>
          <hr class="my-4"/>
          <div class="py-4">
            <h3 class="text-left text-lg py-2 text-gray-700 font-medium">About {{ displayName }}</h3>
            <pre class="text-left text-sm text-gray-700">{{ (user as any)?.mentor?.bio || (user as any)?.mentee?.bio || 'No bio available' }}</pre>
          </div>
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
            <!-- Gender (only for individuals) -->
            <div v-if="!user?.isOrganization" class="flex items-center space-x-3">
              <div class="p-2 rounded-full bg-gray-200">
                <Icon name="ion:male-female-outline" class="w-6 h-6 text-gray-600" />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-sm text-gray-400 text-start">Gender</span>
                <span class="text-gray-700 text-start capitalize">{{ (user as any)?.metadata?.gender || user?.gender || '—' }}</span>
              </div>
            </div>
            <!-- Date of Birth (only for individuals) -->
            <div v-if="!user?.isOrganization" class="flex items-center space-x-3">
              <div class="p-2 rounded-full bg-gray-200">
                <Icon name="material-symbols-light:calendar-month-outline-rounded" class="w-6 h-6 text-gray-600" />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-sm text-gray-400 text-start">Date of Birth</span>
                <span class="text-gray-700 text-start">{{ formattedDob }}</span>
              </div>
            </div>
            <!-- Organization Name (only for organizations) -->
            <div v-if="user?.isOrganization" class="flex items-center space-x-3">
              <div class="p-2 rounded-full bg-gray-200">
                <Icon name="mdi:office-building-outline" class="w-6 h-6 text-gray-600" />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-sm text-gray-400 text-start">Organization Name</span>
                <span class="text-gray-700 text-start">{{ user?.organizationName || '—' }}</span>
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
                <span class="text-gray-700 text-start">{{ (user as any)?.metadata?.nationality || user?.nationality || '—' }}</span>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-full bg-gray-200">
                <Icon name="healthicons:globe-outline" class="w-6 h-6 text-gray-600" />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-sm text-gray-400 text-start">Country of Residence</span>
                <span class="text-gray-700 text-start">{{ (user as any)?.metadata?.countryOfResidence || user?.country || '—' }}</span>
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
        <!-- Mentorship Request Card -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg text-start font-semibold text-gray-800 mb-4">Mentorship Requests</h3>
          <hr class="my-4"/>
          <div v-if="mentorshipRequests && mentorshipRequests.length > 0" class="space-y-4">
            <div v-for="request in mentorshipRequests" :key="request._id" class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div class="flex items-center space-x-4">
                <img :src="request.avatar || '/prof-ill.svg'" alt="Avatar" class="w-10 h-10 rounded-full">
                <div>
                  <p class="font-semibold text-gray-800">
                    {{ request.isOrganization 
                      ? (request.organizationName || 'Organization') 
                      : ((request.firstName || '') + ' ' + (request.lastName || '')).trim() || 'User' }}
                  </p>
                  <p class="text-sm text-gray-500">{{ request.country || '—' }}</p>
                </div>
              </div>
              <button @click="previewMentee(request._id)" class="flex items-center space-x-2 px-3 py-1 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <Icon name="mdi:eye-outline" class="w-5 h-5" />
                <span>View</span>
              </button>
            </div>
          </div>
          <div v-else class="text-center py-4 text-gray-500 text-sm">
            No mentorship requests yet
          </div>
        </div>

        <!-- Skills & Interest Card -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg text-start font-semibold text-gray-800 mb-4">Skills & Interest</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="(skill, i) in skillsAndInterests" :key="i" class="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">{{ skill }}</span>
            <span v-if="skillsAndInterests.length === 0" class="text-gray-500 text-sm">No skills added yet</span>
          </div>
        </div>

        <!-- Social Media Card -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg text-start font-semibold text-gray-800 mb-4">Social Media</h3>
          <hr class="my-4"/>
          <div class="flex justify-between">
            <NuxtLink v-if="socialLinks.facebook" :to="socialLinks.facebook" target="_blank" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <span class="text-gray-600 font-bold text-sm">f</span>
            </NuxtLink>
            <div v-else class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center opacity-50">
              <span class="text-gray-400 font-bold text-sm">f</span>
            </div>
            <NuxtLink v-if="socialLinks.twitter" :to="socialLinks.twitter" target="_blank" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <span class="text-gray-600 font-bold text-sm">X</span>
            </NuxtLink>
            <div v-else class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center opacity-50">
              <span class="text-gray-400 font-bold text-sm">X</span>
            </div>
            <NuxtLink v-if="socialLinks.youtube" :to="socialLinks.youtube" target="_blank" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>
            <div v-else class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center opacity-50">
              <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
              </svg>
            </div>
            <NuxtLink v-if="socialLinks.linkedin" :to="socialLinks.linkedin" target="_blank" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <span class="text-gray-600 font-bold text-sm">in</span>
            </NuxtLink>
            <div v-else class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center opacity-50">
              <span class="text-gray-400 font-bold text-sm">in</span>
            </div>
            <NuxtLink v-if="socialLinks.instagram" :to="socialLinks.instagram" target="_blank" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>
            <div v-else class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center opacity-50">
              <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User as UserMe} from '../../types'

const user = ref<UserMe | null>(null)
const isLoading = ref(true)
const error = ref('')

// Computed property to get display name (organization name for orgs, firstName + lastName for individuals)
const displayName = computed(() => {
  if (!user.value) return 'User'
  if (user.value.isOrganization) {
    return user.value.organizationName || 'Organization'
  }
  const fullName = `${user.value.firstName || ''} ${user.value.lastName || ''}`.trim()
  return fullName || 'User'
})

const formattedDob = computed(() => {
  if (!user.value) return '—'
  const dob = (user.value as any)?.metadata?.dateOfBirth || user.value?.dateOfBirth
  if (!dob) return '—'
  const iso = typeof dob === 'string' ? dob : (dob as { $date: string })?.$date
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return '—'
  }
})

// Extract profile picture URL
// Backend now returns profilePicture as a URL string (extracted from populated attachment)
const profilePictureUrl = computed(() => {
  if (!user.value) return null
  const profilePic = (user.value as any)?.profilePicture
  if (!profilePic) return null
  
  // Backend transforms profilePicture to return just the URL string
  // So it should be a string (the URL to the static file)
  if (typeof profilePic === 'string') {
    return profilePic
  }
  
  // Fallback: if it's still an object (shouldn't happen with new backend, but handle for compatibility)
  if (typeof profilePic === 'object' && profilePic.url) {
    return profilePic.url
  }
  
  // Handle edge cases: buffer or invalid objects
  if (typeof profilePic === 'object') {
    if (profilePic.buffer) {
      console.warn('Profile picture is saved as buffer, not ObjectId reference. Cannot display.');
      return null
    }
    if (profilePic._id && !profilePic.url) {
      console.warn('Profile picture ObjectId is not populated with attachment data.');
      return null
    }
  }
  
  return null
})

// Extract skills and interests from mentee or mentor data, or fallback to user
const skillsAndInterests = computed(() => {
  if (!user.value) return []
  
  // Check mentee first
  const menteeSkills = (user.value as any)?.mentee?.skillsAndInterests
  if (Array.isArray(menteeSkills) && menteeSkills.length > 0) {
    return menteeSkills
  }
  
  // Check mentor
  const mentorSkills = (user.value as any)?.mentor?.skillsAndInterests
  if (Array.isArray(mentorSkills) && mentorSkills.length > 0) {
    return mentorSkills
  }
  
  // Fallback to user's skillsAndInterests
  const userSkills = user.value?.skillsAndInterests
  if (Array.isArray(userSkills) && userSkills.length > 0) {
    return userSkills
  }
  
  return []
})

// Extract social media links from metadata
const socialLinks = computed(() => {
  if (!user.value) return { linkedin: '', twitter: '', facebook: '', youtube: '', instagram: '' }
  const links = (user.value as any)?.metadata?.socialLinks || {}
  return {
    linkedin: links.linkedin || user.value?.linkedIn || '',
    twitter: links.twitter || user.value?.twitter || '',
    facebook: links.facebook || user.value?.facebook || '',
    youtube: links.youtube || user.value?.youtube || '',
    instagram: links.instagram || user.value?.instagram || '',
  }
})

const mentorshipRequests = ref<UserMe[]>()

const getMentorshipRequests = async (mentorId: string) => {
  try {
    const authToken = useCookie<string | null>('auth_token')
    if (!authToken.value) {
      return
    }
    const { get } = useApi()
    // useApi automatically includes the authorization header from cookies
    const response = await get<any>(`/mentorship/mentorships/mentor/${mentorId}/requests`)
    
    // The backend now returns enriched mentees in the requests array
    if (response.data?.requests && Array.isArray(response.data.requests) && response.data.requests.length > 0) {
      mentorshipRequests.value = response.data.requests
    } else {
      mentorshipRequests.value = []
    }
  } catch (e) {
    console.error('Error fetching mentorship requests:', e)
    mentorshipRequests.value = []
  }
}

const previewMentee = (menteeId: string) => {
  navigateTo(`/profile/mentee-profile/${menteeId}`)
}

onMounted(async () => {
  // Check for token in cookies
  const authToken = useCookie<string | null>('auth_token')
  if (!authToken.value) {
    isLoading.value = false
    error.value = 'Not authenticated'
    // Redirect to login if not authenticated
    await navigateTo('/auth/sign-in')
    return
  }

  try {
    const { get } = useApi()
    // useApi automatically includes the authorization header from cookies
    // The endpoint returns { user: {...} } based on the controller
    const me = await get<{user:UserMe}>('/auth/users/profile/me')
    // getMentorshipRequests handles its own errors internally
    // Pass userId instead of _id since the endpoint expects userId
    await getMentorshipRequests(me.data.user.userId || me.data.user._id)
    user.value = me.data.user
    
    // Update user cookie with latest data
    const userCookie = useCookie<string | null>('user')
    userCookie.value = JSON.stringify(me.data.user)
  } catch (e) {
    error.value = 'Failed to load profile'
    console.error('Profile load error:', e)
  } finally {
    isLoading.value = false
  }

})


</script>

<style scoped>
pre {
  white-space: pre-wrap; 
  word-wrap: break-word;
  font-family: inherit;
  font-size: .8rem;
}
</style>