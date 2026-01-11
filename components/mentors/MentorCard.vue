<template>
  <div class="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <span class="text-gray-500 font-semibold">{{ 1}}.</span>
      <img :src="avatar || '/prof-ill.svg'" :alt="displayName" class="w-12 h-12 rounded-full object-cover">
      <h3 class="font-semibold text-gray-800">{{ formatName(displayName) }}</h3>
    </div>
      <div class="w-36">
        <p class="font-semibold text-gray-800">
          {{ isOrganization ? 'Organization' : 'Individual' }}
        </p>
        <p class="text-sm text-gray-500">Type</p>
      </div>
      <div class="w-36">
        <p  class="font-semibold text-gray-800" 
            v-if="languages && languages.length > 0" 
            v-for="language in languages" :key="language">{{  language  }}</p>
        <p class="font-semibold text-gray-800" v-else>Not provided</p>
        <p class="text-sm text-gray-500">Languages</p>
      </div>
      <div class="w-36">
        <p class="font-semibold text-gray-800">{{ country || 'Not provided' }}</p>
        <p class="text-sm text-gray-500">Location</p>
      </div>
      <span
        :class="{
          'bg-green-100 text-green-700': mentor.availabilityStatus === 'available',
          'bg-yellow-100 text-yellow-700': mentor.availabilityStatus === 'unavailable',
        }"
        class="px-3 py-1 text-sm font-medium rounded-full flex items-center space-x-1.5"
      >
        <span class="w-2 h-2 rounded-full" :class="{
          'bg-green-500': mentor.availabilityStatus === 'available',
          'bg-yellow-500': mentor.availabilityStatus === 'unavailable',
        }"></span>
        <span>{{ mentor.availabilityStatus }}</span>
      </span>
      <button @click="navigateTo(`/mentors/${mentor._id || mentorData.mentorId}`)" class="flex items-center space-x-2 px-3 py-1 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
        <Icon name="mdi:eye-outline" class="w-5 h-5" />
        <span>View</span>
      </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { PropType } from 'vue'
import type { MentorProfile as Mentor } from '../../types'

const props = defineProps({
  mentor: {
    type: Object as PropType<Mentor>,
    required: true,
  },
})

// Handle both API response structure (flat) and component expected structure (nested)
// The API returns: { fullName, email, profilePhoto, specializations, ... }
// The component expects: { user: { avatar, firstName, lastName, ... }, languages, ... }
const mentorData = props.mentor as any

const avatar = computed(() => {
  // Check if mentor has nested user object (component structure)
  if (mentorData.user?.avatar) {
    return mentorData.user.avatar
  }
  // Check if user has populated profilePicture object with url
  if (mentorData.user?.profilePicture?.url) {
    return mentorData.user.profilePicture.url
  }
  // Check if mentor has flat structure (API response) with profilePhoto
  if (mentorData.profilePhoto) {
    // Handle both string URL and populated object
    if (typeof mentorData.profilePhoto === 'string') {
      return mentorData.profilePhoto
    }
    if (mentorData.profilePhoto.url) {
      return mentorData.profilePhoto.url
    }
  }
  // Check if mentor has flat structure with profilePicture
  if (mentorData.profilePicture) {
    // Handle both string URL and populated object
    if (typeof mentorData.profilePicture === 'string') {
      return mentorData.profilePicture
    }
    if (mentorData.profilePicture.url) {
      return mentorData.profilePicture.url
    }
  }
  return null
})

const isOrganization = computed(() => {
  return mentorData.user?.isOrganization || false
})

const country = computed(() => {
  return mentorData.user?.country || mentorData.country || null
})

const languages = computed(() => {
  return mentorData.languages || mentorData.specializations || []
})

// Computed property to get display name (organizationName for orgs, firstName + lastName for individuals)
const displayName = computed(() => {
  // If API returns flat structure with fullName
  if (mentorData.fullName) {
    return mentorData.fullName
  }
  
  // If nested user structure
  if (mentorData.user) {
    if (mentorData.user.isOrganization) {
      return mentorData.user.organizationName || 'Organization'
  }
    const fullName = `${mentorData.user.firstName || ''} ${mentorData.user.lastName || ''}`.trim()
  return fullName || 'User'
  }
  
  return 'User'
})

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
</script>
