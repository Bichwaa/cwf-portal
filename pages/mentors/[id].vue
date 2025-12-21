<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <p class="text-gray-600">Loading mentor profile...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <p class="text-red-600">{{ error }}</p>
    </div>
    
    <!-- Content -->
    <div v-else-if="mentor">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-2xl text-left font-bold">{{ formatName(mentor.user.firstName + ' ' + mentor.user.lastName) }}</h1>
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
                <h2 class="text-2xl text-left font-semibold text-gray-800">{{ formatName(mentor.user.firstName + ' ' + mentor.user.lastName) }}</h2>
                <div class="flex items-center space-x-2 text-gray-500 mt-1">
                  <Icon name="material-symbols:location-on-outline-rounded" class="w-6 h-6 text-gray-400" />
                  <span>{{ mentor.user.country || '—' }}</span>
                </div>
                
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div v-if="mentor.availabilityStatus === 'unavailable'" class="flex items-center space-x-2 bg-[#f9c8c8] rounded-3xl px-4 py-1">
                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
              <span class="text-[#e53023] font-medium">Unavailable</span>
            </div>
            <div v-else-if="mentor.availabilityStatus === 'on-break'" class="flex items-center space-x-2 bg-[#F9F4C8] rounded-3xl px-4 py-1">
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span class="text-yellow-600 font-medium">On Break</span>
            </div>
            <div v-else class="flex items-center space-x-2 bg-[#D0FBE0] rounded-3xl px-4 py-1">
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              <span class="text-green-600 font-medium">Available</span>
            </div>
            </div>
          </div>
          <div class="flex items-center gap-4 lg:gap-24 my-8">
            <NuxtLink 
              class="p-2 rounded-lg hover:bg-blue-600 flex items-center gap-2 cursor-pointer"
              :class="activePanel==1?'bg-blue-700 text-white':'text-gray-800 text-sm'"
              @click="switchPanel(1)">
              <Icon name="solar:home-smile-angle-line-duotone" class="w-4 h-4" :class="activePanel==1?'text-white':''" />
              <span>Overview</span>
            </NuxtLink>
            <NuxtLink 
              class="p-2 rounded-lg hover:bg-blue-600 flex items-center gap-2 cursor-pointer"
              :class="activePanel==2?'bg-blue-700 text-white':'text-gray-800 text-sm'"
              @click="switchPanel(2)">
              <Icon name="solar:star-outline" class="w-4 h-4" :class="activePanel==2?'text-white':''" />
              <span>Reviews</span>
            </NuxtLink>
            <NuxtLink 
              class="p-2 rounded-lg hover:bg-blue-600 flex items-center gap-2 cursor-pointer invisible"
              :class="activePanel==3?'bg-blue-700 text-white':'text-gray-800 text-sm'"
              @click="switchPanel(3)">
              <Icon name="solar:calendar-line-duotone" class="w-4 h-4" :class="activePanel==3?'text-white':''" />
              <span>Availability</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Personal Info Card -->
        <MentorPersonalInfoCard v-if="activePanel==1 && mentor" :mentor="mentor"/>
        <MentorsMentorReviewsCard v-if="(activePanel==2||activePanel==3) && mentor" :mentor="mentor"/>
      </div>

      <!-- Right Column - Sidebar -->
      <div class="space-y-6">
        <!-- Mentorship Request Card -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg text-start font-semibold text-gray-800 mb-4">Connect</h3>
          <hr class="my-4"/>
          <div class="space-y-4">
            <button 
              @click="handleRequestMentorship"
              :disabled="isRequesting || isRequestSuccessful"
              :class="[
                'p-2 rounded-lg lg:w-64 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center',
                isRequestSuccessful ? 'bg-gray-500 hover:bg-gray-500' : 'bg-blue-700 hover:bg-blue-600'
              ]"
            >
              <span v-if="isRequesting">Requesting...</span>
              <span v-else-if="isRequestSuccessful">Request Sent</span>
              <span v-else>Request Mentorship</span>
            </button>
          </div>
        </div>

        <!-- Skills & Interest Card -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg text-start font-semibold text-gray-800 mb-4">Skills & Interest</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="(skill, i) in (mentor.user.skillsAndInterests || [])" :key="i" class="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">{{ skill }}</span>
            <span v-if="!mentor.user.skillsAndInterests || mentor.user.skillsAndInterests.length === 0" class="text-gray-500 text-sm">No skills added yet</span>
          </div>
        </div>

        <!-- Languages -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg text-start font-semibold text-gray-800 mb-4">Languages</h3>
          <hr class="my-4"/>
          <div class="flex flex-col gap-6">
            <div v-for="(language, i) in (mentor.languages || [])" :key="i" class="flex items-center space-x-3">
              <div class="p-2 rounded-full bg-gray-100">
                <Icon name="solar:microphone-2-bold" class="w-6 h-6 text-gray-500" />
              </div>
              <div class="flex flex-col">
                <span class="text-gray-700 font-semibold text-start">{{ language }}</span>
              </div>
            </div>
            <div v-if="!mentor.languages || mentor.languages.length === 0" class="text-gray-500 text-sm">
              No languages specified
            </div>
          </div>
        </div>

        <!-- Social Media Card -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg text-start font-semibold text-gray-800 mb-4">Social Media</h3>
          <hr class="my-4"/>
          <div class="flex justify-between">
            <NuxtLink v-if="mentor.user.facebook" :to="mentor.user.facebook" target="_blank" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <span class="text-gray-600 font-bold text-sm">f</span>
            </NuxtLink>
            <div v-else class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center opacity-50">
              <span class="text-gray-400 font-bold text-sm">f</span>
            </div>
            <NuxtLink v-if="mentor.user.twitter" :to="mentor.user.twitter" target="_blank" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <span class="text-gray-600 font-bold text-sm">X</span>
            </NuxtLink>
            <div v-else class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center opacity-50">
              <span class="text-gray-400 font-bold text-sm">X</span>
            </div>
            <NuxtLink v-if="mentor.user.youtube" :to="mentor.user.youtube" target="_blank" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
              </svg>
            </NuxtLink>
            <div v-else class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center opacity-50">
              <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
              </svg>
            </div>
            <NuxtLink v-if="mentor.user.linkedIn" :to="mentor.user.linkedIn" target="_blank" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <span class="text-gray-600 font-bold text-sm">in</span>
            </NuxtLink>
            <div v-else class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center opacity-50">
              <span class="text-gray-400 font-bold text-sm">in</span>
            </div>
            <NuxtLink v-if="mentor.user.instagram" :to="mentor.user.instagram" target="_blank" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
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
    
    <!-- Application Sent Modal -->
    <ApplicationSentModal v-if="showSuccessModal" @close="closeSuccessModal" />
  </div>
</template>

<script lang="ts" setup>
import MentorPersonalInfoCard from '@/components/mentors/MentorPersonalInfoCard.vue'
import ApplicationSentModal from '@/components/ApplicationSentModal.vue'
import type { MentorProfile } from '~/types'

const route = useRoute()
const mentor = ref<MentorProfile | null>(null)
const isLoading = ref(true)
const error = ref('')
const activePanel = ref(1)
const isRequesting = ref(false)
const isRequestSuccessful = ref(false)
const currentUser = ref<{ _id: string; role: string } | null>(null)
const showSuccessModal = ref(false)

const formatName = (name: string): string => {
  if (!name) return ''
  const words = name.trim().split(/\s+/)
  // If only one word, return as is
  if (words.length <= 1) {
    return name
  }
  // Take first letter of each word except the last, add '.', and keep last word as is
  const shortenedWords = words.slice(0, -1).map(word => {
    return word.charAt(0) + '.'
  })
  // Add the last word as is
  shortenedWords.push(words[words.length - 1])
  return shortenedWords.join(' ')
}

const switchPanel = (panel: number) => {
  activePanel.value = panel
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}

const handleRequestMentorship = async () => {
  if (!mentor.value || !currentUser.value) {
    alert('Unable to request mentorship. Please try again.')
    return
  }

  isRequesting.value = true
  const token = localStorage.getItem('auth_token')

  try {
    const { post } = useApi()
    
    // Calculate dates (1 year from now)
    const startDate = new Date('2025-01-01T00:00:00.000Z')
    const endDate = new Date('2025-12-31T00:00:00.000Z')
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    const payload = {
      mentor: mentor.value._id,
      initiatedBy: 'mentee',
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      duration: duration,
      status: 'pending',
      requests: [currentUser.value._id],
      createdBy: {
        _id: currentUser.value._id,
        role: currentUser.value.role || 'mentee'
      }
    }

    const response = await post('/mentorship/mentorships/create', payload, {
      headers: { authorization: `Bearer ${token}` }
    })

    if (response.status === 200 || response.status === 201) {
      isRequestSuccessful.value = true
      showSuccessModal.value = true
    } else {
      alert('Failed to send mentorship request. Please try again.')
    }
  } catch (e) {
    console.error('Error requesting mentorship:', e)
    alert('Failed to send mentorship request. Please try again.')
  } finally {
    isRequesting.value = false
  }
}

onMounted(async () => {
  const mentorId = route.params.id as string
  const token = localStorage.getItem('auth_token')
  
  if (!token) {
    isLoading.value = false
    error.value = 'Not authenticated'
    return
  }

  try {
    const { get } = useApi()
    
    // Fetch current user
    const userResponse = await get<any>('/auth/profile/me', {
      headers: { authorization: `Bearer ${token}` }
    })
    currentUser.value = {
      _id: userResponse.data._id,
      role: userResponse.data.role || 'mentee'
    }

    // Fetch mentor profile
    const mentorResponse = await get<MentorProfile>(`/mentorship/mentors/find-mentor/${mentorId}`, {
      headers: { authorization: `Bearer ${token}` }
    })
    mentor.value = mentorResponse.data
  } catch (e) {
    error.value = 'Failed to load mentor profile'
    console.error('Error loading mentor:', e)
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