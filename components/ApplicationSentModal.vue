<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center relative">
      <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 class="text-lg font-bold mb-2">Application sent!</h2>
      <p class="text-sm text-gray-600 mb-8">
        Your mentorship application was sent successfully, our team will review your profile and activate your mentor profile.
      </p>



      <div class="w-24 h-24 mx-auto mb-6">
        <nuxt-img src="/tick.svg"  alt="Mentor accepted" class="w-full h-full" />
      </div>
      
      <buttons-gradient-button 
        @click="$emit('close')" 
        text="Back To Profile"
        class="bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold py-2 px-6 rounded-lg" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineEmits(['close'])
</script>

<style>

</style>