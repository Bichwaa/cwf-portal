<template>
  <div>
    <ProfileBanner imagesrc="scholar.svg">
      <div class="flex flex-col justify-start">
        <h1 class="text-left text-sm text-blue-900 mb-8 font-bold">BECOME A MENTOR</h1>
        <h2 class="text-left text-3xl font-semibold text-gray-800 mb-2">Share Your Experience,</h2>
        <h3 class="text-left text-5xl my-8 font-medium text-gray-700 mb-3">To Inspire The Next Generation</h3>
        <p class="text-left text-gray-800 text-lg mt-4">Register today and guide a student or young professional toward growth, confidence, and opportunity.</p>
      </div>
    </ProfileBanner>
  </div>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto">
      <h3 class="text-2xl text-start font-medium text-gray-700 mb-6">Apply to be a mentor</h3>
      <div class="mb-6">
        <label for="bio" class="block text-sm text-start font-medium text-gray-700 mb-2">About Me</label>
        <textarea 
          v-model="bio"
          id="bio" 
          name="bio" 
          rows="6" 
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Write your bio"></textarea>
      </div>
    </div>
  </div>
  <hr class="mb-6">
  <div class="container mx-auto px-4 py-2">
    <div class="max-w-2xl mx-auto">
      <div class="flex justify-end">
        <button @click="apply" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Apply now</button>
      </div>
    </div>
  </div>
  <ApplicationSentModal v-if="showModal" @close="closeModal" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ApplicationSentModal from '~/components/ApplicationSentModal.vue';

const showModal = ref(false)
const bio = ref('')
const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false;
  navigateTo('/profile/mentor-profile')
}

const apply = async () => {
  const payload = {
    bio: bio.value,
    role: 'mentor'
  }
  const { put } = useApi()
  const response = await put(
    '/auth/profile', 
    payload, 
    { headers: { authorization: `Bearer ${localStorage.getItem('auth_token')}` } }
  )
  if (response.status === 200) {
    openModal()
  } else {
    console.log(response.data)
  }
}
</script>

<style>

</style>