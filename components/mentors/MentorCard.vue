<template>
  <div class="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <span class="text-gray-500 font-semibold">{{ 1}}.</span>
      <img :src="mentor.user.avatar || '/prof-ill.svg'" :alt="displayName" class="w-12 h-12 rounded-full object-cover">
      <h3 class="font-semibold text-gray-800">{{ formatName(displayName) }}</h3>
    </div>
      <div class="w-36">
        <p class="font-semibold text-gray-800">
          {{ mentor.user.isOrganization ? 'Organization' : 'Individual' }}
        </p>
        <p class="text-sm text-gray-500">Type</p>
      </div>
      <div class="w-36">
        <p  class="font-semibold text-gray-800" 
            v-if="mentor.languages && mentor.languages.length > 0" 
            v-for="language in mentor.languages" :key="language">{{  language  }}</p>
        <p class="font-semibold text-gray-800" v-else>Not provided</p>
        <p class="text-sm text-gray-500">Languages</p>
      </div>
      <div class="w-36">
        <p class="font-semibold text-gray-800">{{ mentor.user.country }}</p>
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
      <button @click="navigateTo(`/mentors/${mentor._id}`)" class="flex items-center space-x-2 px-3 py-1 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
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

// Computed property to get display name (organizationName for orgs, firstName + lastName for individuals)
const displayName = computed(() => {
  if (props.mentor.user.isOrganization) {
    return props.mentor.user.organizationName || 'Organization'
  }
  const fullName = `${props.mentor.user.firstName || ''} ${props.mentor.user.lastName || ''}`.trim()
  return fullName || 'User'
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
