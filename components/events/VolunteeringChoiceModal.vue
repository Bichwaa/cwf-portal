<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full text-center relative">
      <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
        <Icon name="mdi:close" class="w-6 h-6" />
      </button>

      <h2 class="text-2xl font-bold mb-2">Volunteer This Event</h2>
      <p class="text-sm text-gray-500 mb-8 max-w-md mx-auto">
        Volunteer the event by giving your time, skills, or energy, either on the ground in remotely from anywhere.
      </p>

      <div class="space-y-4">
        <label
          @click="selectedOption = 'on-ground'"
          :class="['border-2 rounded-lg p-4 flex items-center space-x-4 cursor-pointer', selectedOption === 'on-ground' ? 'border-blue-500 bg-blue-50' : 'border-gray-200']"
        >
          <div :class="['w-5 h-5 p-1 rounded-full border-2 flex items-center justify-center', selectedOption === 'on-ground' ? 'border-blue-500' : 'border-gray-300']">
            <span v-if="selectedOption === 'on-ground'" class="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
          </div>
          <img src="/ground.svg" alt="On-ground volunteering" class="w-16 h-16">
          <div class="text-left">
            <h3 class="font-semibold">Volunteer On-ground</h3>
            <p class="text-sm text-gray-500">Join us at the event location to make a direct impact on the ground. On-ground volunteers work closely with beneficiaries and professionals.</p>
          </div>
        </label>

        <label
          @click="selectedOption = 'remotely'"
          :class="['border-2 rounded-lg p-4 flex items-center space-x-4 cursor-pointer', selectedOption === 'remotely' ? 'border-blue-500 bg-blue-50' : 'border-gray-200']"
        >
          <div :class="['w-5 h-5 rounded-full p-1 border-2 flex items-center justify-center', selectedOption === 'remotely' ? 'border-blue-500' : 'border-gray-300']">
            <span v-if="selectedOption === 'remotely'" class="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
          </div>
          <img src="/remote.svg" alt="Remote volunteering" class="w-16 h-16">
          <div class="text-left">
            <h3 class="font-semibold">Volunteer Remotely</h3>
            <p class="text-sm text-gray-500">Contribute from anywhere by offering your skills online, and we'll connect you with tasks you can do remotely.</p>
          </div>
        </label>
      </div>
      
      <div class="mt-8">
        <buttons-gradient-button 
          @click="$emit('close')" 
          text="Continue"
          class="w-full" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineEmits(['close'])

const selectedOption = ref('on-ground')
</script>

<style>
</style>