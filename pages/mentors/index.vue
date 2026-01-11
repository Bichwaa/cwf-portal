<template>
  <div class="bg-gray-100 min-h-screen p-8">
    <h1 class="text-2xl text-left font-bold uppercase mb-8">MENTORS</h1>
    <div class="space-y-4">
      <MentorCard
        v-for="mentor in mentors"
        :key="mentor._id"
        :mentor="mentor"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MentorCard from '~/components/mentors/MentorCard.vue';
import type { MentorProfile } from '~/types';
const isLoading = ref(true)
const error = ref('')
const mentors = ref<MentorProfile[]>([{
  _id: "ss",
  userId: 'Dr. John Doe',
  certifications: ['Public Health'],
  languages: ['English, Yoruba'],
  availabilityStatus: 'available',
  user: {
    _id: 'ss',
    firstName: 'John',
    lastName: 'Doe',
    role: 'mentor',
    isOrganization: false,
    __v: 0,
    email: 'john.doe@example.com',
    phoneNumber: '1234567890',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  specializations: [],
  yearsOfExperience: 0,
  timeZone: '',
  preferredCommunication: [],
  hourlyRate: 0,
  industries: [],
  maxMentees: 0,
  currentMenteeCount: 0,
  rating: { average: 0, count: 0 },
  createdAt: '',
  lastModifiedAt: '',
  __v: 0
},
])

onMounted(async () => {
  // Check for token in cookies
  const authToken = useCookie<string | null>('auth_token')
  if (!authToken.value) {
    isLoading.value = false
    error.value = 'Not authenticated'
    await navigateTo('/auth/sign-in')
    return
  }

  try {
    const { get } = useApi()
    // useApi automatically includes the authorization header from cookies
    const res = await get<any>('/mentorship/mentors/list-mentors')
    mentors.value = res.data?.data || []
  } catch (e) {
    error.value = 'Failed to load mentors'
    console.error('Error loading mentors:', e)
  } finally {
    isLoading.value = false
  }
})
</script>

<style>
</style>