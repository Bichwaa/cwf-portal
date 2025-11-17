<template>
  <LoadingScreen 
    backgroundColor="white"
    text="Setting up your profile..."
    v-if="loading"
    />
  <div v-else class="bg-white">
    <ProfileBanner>
      <div class="flex flex-col justify-start">
        <h1 class="text-left text-sm text-blue-900 mb-8 font-bold">MY PROFILE</h1>
        <h2 class="text-left text-3xl font-semibold text-gray-800 mb-2">Hello Anitha,</h2>
        <h3 class="text-left text-5xl my-8 font-medium text-gray-700 mb-3">Welcome to Care Wave Portal!</h3>
        <p class="text-left text-gray-800 text-lg mt-4">Complete your profile to continue...</p>
      </div>
    </ProfileBanner>
    <div class="flex px-20">
      <!-- Left Navigation -->
      <div class="w-64 bg-white">
        <div class="p-6">
          <nav class="space-y-4">
            <div 
              @click="formStep = 1"
              class="text-right border-r-4 text-[#004AAD] px-4 py-3 font-medium cursor-pointer"
              :class="{ 'bg-[#D9E2FF] border-r-4 border-black text-[#004AAD]': formStep === 1 }">
              Personal Info
            </div>
            <div 
              @click="formStep = 2"
              class="text-right border-r-4 text-gray-600 px-4 py-3 hover:bg-gray-50 cursor-pointer"
              :class="{ 'bg-[#D9E2FF] border-r-4 border-black text-[#004AAD]': formStep === 2 }">
              Social Media
            </div>
            <div 
              @click="formStep = 3"
              class="text-right border-r-4 text-gray-600 px-4 py-3 hover:bg-gray-50 cursor-pointer"
              :class="{ 'bg-[#D9E2FF] border-r-4 border-black text-[#004AAD]': formStep === 3 }">
              Skills & Interests
            </div>
          </nav>
        </div>
      </div>

      <!-- Main Form Area -->
      <PersonalInfoForm v-if="formStep === 1" />
      <SocialMediaInfoForm v-if="formStep === 2" />
      <SkillInterestForm v-if="formStep === 3" />
    </div>
    <!-- Continue Button -->
    <hr class="border-gray-300 w-full mt-12"/>
    <div class="mt-8 flex justify-end px-56 pb-8">
      <button 
        v-if="formStep <= 2"
        @click="formStep++"
        class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
        Continue
      </button>
      <button 
        v-else 
        @click="showLoadScreen"
        class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
        Save
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PersonalInfoForm from '~/components/my-profile/PersonalInfoForm.vue';
import SocialMediaInfoForm from '~/components/my-profile/SocialMediaInfoForm.vue';
import SkillInterestForm from '~/components/my-profile/SkillInterestForm.vue';
import ProfileBanner from '~/components/ProfileBanner.vue';
// My Profile page component

const formStep = ref(1);
const loading = ref(false);


const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const showLoadScreen = async () => {
  loading.value = true;
  await wait(3000);
  navigateTo('/profile/my-profile');
};
</script>