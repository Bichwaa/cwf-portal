<template>
  <div class="bg-white shadow-sm p-6 rounded-2xl">
          <h3 class="text-lg text-left font-semibold text-gray-800 mb-4">Personal Info</h3>
          <hr class="my-4"/>
          <div class="py-4">
            <h3 class="text-left text-lg py-2 text-gray-700 font-medium">About {{ formatName(mentor.user.firstName + ' ' + mentor.user.lastName) }}</h3>
            <pre class="text-left text-sm text-gray-700">{{ mentor.user.bio || 'No bio available' }}</pre>
          </div>
          <hr class="my-4"/>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-full bg-gray-200">
                <Icon name="hugeicons:mail-at-sign-01" class="w-6 h-6 text-gray-600" />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-sm text-gray-400 text-start">Email Address</span>
                <span class="text-gray-700 text-start">{{ mentor.user.email || '—' }}</span>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-full bg-gray-200">
                <Icon name="mdi:phone-in-talk-outline" class="w-6 h-6 text-gray-600" />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-sm text-gray-400 text-start">Phone Number</span>
                <span class="text-gray-700 text-start">{{ mentor.user.phoneNumber || '—' }}</span>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-full bg-gray-200">
                <Icon name="ion:male-female-outline" class="w-6 h-6 text-gray-600" />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-sm text-gray-400 text-start">Gender</span>
                <span class="text-gray-700 text-start capitalize">{{ mentor.user.gender || '—' }}</span>
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
            <div class="col-span-1 grid grid-cols-2 gap-4">
              <div class="flex items-center space-x-3">
              <div class="p-2 rounded-full bg-gray-200">
                <Icon name="healthicons:globe-outline" class="w-6 h-6 text-gray-600" />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-sm text-gray-400 text-start">Nationality</span>
                <span class="text-gray-700 text-start">{{ mentor.user.nationality || '—' }}</span>
              </div>
            </div>
            <div class="col-span-1"></div>
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-full bg-gray-200">
                <Icon name="healthicons:globe-outline" class="w-6 h-6 text-gray-600" />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-sm text-gray-400 text-start">Country of Residence</span>
                <span class="text-gray-700 text-start">{{ mentor.user.country || '—' }}</span>
              </div>
            </div>
            </div>
          </div>
        </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { MentorProfile } from '~/types'

const props = defineProps({
  mentor: {
    type: Object as PropType<MentorProfile>,
    required: true,
  },
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

const formattedDob = computed(() => {
  const dob = props.mentor.user.dateOfBirth
  if (!dob) return '—'
  const iso = typeof dob === 'string' ? dob : dob
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return '—'
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