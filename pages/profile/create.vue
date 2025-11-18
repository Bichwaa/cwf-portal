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
    
    <!-- Account Type Selection (only show if not set) -->
    <div v-if="!accountType" class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <h3 class="text-2xl text-start font-medium text-gray-700 mb-6">Select Account Type</h3>
        <div class="space-y-4">
          <label
            @click="selectAccountType('individual')"
            class="border-2 rounded-lg p-6 flex items-center space-x-4 cursor-pointer hover:border-blue-500 transition-colors"
            :class="accountType === 'individual' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
          >
            <div :class="['w-5 h-5 p-1 rounded-full border-2 flex items-center justify-center', accountType === 'individual' ? 'border-blue-500' : 'border-gray-300']">
              <span v-if="accountType === 'individual'" class="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
            </div>
            <div class="text-left">
              <h3 class="font-semibold text-lg">Individual</h3>
              <p class="text-sm text-gray-500">Register as an individual user</p>
            </div>
          </label>

          <label
            @click="selectAccountType('organization')"
            class="border-2 rounded-lg p-6 flex items-center space-x-4 cursor-pointer hover:border-blue-500 transition-colors"
            :class="accountType === 'organization' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
          >
            <div :class="['w-5 h-5 rounded-full p-1 border-2 flex items-center justify-center', accountType === 'organization' ? 'border-blue-500' : 'border-gray-300']">
              <span v-if="accountType === 'organization'" class="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
            </div>
            <div class="text-left">
              <h3 class="font-semibold text-lg">Organization</h3>
              <p class="text-sm text-gray-500">Register as an organization</p>
            </div>
          </label>
        </div>
      </div>
    </div>

    <div v-else class="flex px-20">
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
      <div v-if="formStep === 1" class="flex-1">
        <PersonalInfoForm 
          v-model:user="user"
          :account-type="accountType"
          :phone-country-code="phoneCountryCode"
          @update:phone-country-code="phoneCountryCode = $event"
        />
        <!-- Bio Field -->
        <div class="px-8 pb-8">
          <div class="max-w-2xl">
            <label for="bio" class="block text-sm text-left font-medium text-gray-700 mb-2">Bio</label>
            <textarea 
              v-model="user.bio"
              id="bio" 
              name="bio" 
              rows="6" 
              :placeholder="accountType === 'organization' ? 'Tell us about your organization...' : 'Tell us about yourself...'"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-gray-50 text-gray-900 text-sm"
            ></textarea>
          </div>
        </div>
      </div>
      <SocialMediaInfoForm 
        v-if="formStep === 2" 
        v-model:user="user"
      />
      <SkillInterestForm 
        v-if="formStep === 3" 
        v-model:user="user"
      />
    </div>
    <!-- Continue Button -->
    <hr v-if="accountType" class="border-gray-300 w-full mt-12"/>
    <div v-if="accountType" class="mt-8 flex justify-end px-56 pb-8">
      <button 
        v-if="formStep <= 2"
        @click="formStep++"
        class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
        Continue
      </button>
      <button 
        v-else 
        @click="handleSubmit"
        :disabled="isSubmitting"
        class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
        {{ isSubmitting ? 'Saving...' : 'Save' }}
      </button>
    </div>
    
    <!-- Error Message -->
    <div v-if="error" class="text-red-600 text-sm text-center pb-4">
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PersonalInfoForm from '~/components/my-profile/PersonalInfoForm.vue';
import SocialMediaInfoForm from '~/components/my-profile/SocialMediaInfoForm.vue';
import SkillInterestForm from '~/components/my-profile/SkillInterestForm.vue';
import ProfileBanner from '~/components/ProfileBanner.vue';
import type { User } from '~/types';

definePageMeta({
  layout: 'loading',
})

const formStep = ref(1);
const loading = ref(false);
const accountType = ref<'individual' | 'organization' | null>(null);
const phoneCountryCode = ref('+234');
const isSubmitting = ref(false);
const error = ref('');

const user = ref<User>({
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isOrganization: false,
  role: 'mentee',
  __v: 0,
  googleId: '',
  facebookId: '',
  phoneNumber: '',
  organizationName: '',
  gender: '',
  dateOfBirth: '',
  nationality: '',
  country: '',
  linkedIn: '',
  twitter: '',
  facebook: '',
  youtube: '',
  instagram: '',
  skillsAndInterests: [],
  bio: '',
});

const selectAccountType = (type: 'individual' | 'organization') => {
  accountType.value = type;
  if (type === 'organization') {
    user.value.isOrganization = true;
    user.value.role = 'mentor';
    user.value.firstName = '';
    user.value.lastName = '';
  } else {
    user.value.isOrganization = false;
    user.value.role = 'mentee';
    user.value.organizationName = '';
  }
};

const handleSubmit = async () => {
  error.value = '';
  isSubmitting.value = true;
  loading.value = true;

  try {
    // Combine phone country code and number
    // The phoneNumber from PersonalInfoForm is just the number part
    if (user.value.phoneNumber && !user.value.phoneNumber.startsWith('+')) {
      user.value.phoneNumber = phoneCountryCode.value + user.value.phoneNumber;
    } else if (!user.value.phoneNumber) {
      // If no phone number was set, we might need to get it from the form
      // For now, we'll leave it empty
    }

    // Prepare payload matching the SignUpForm structure
    const payload = {
      firstName: user.value.firstName || '',
      lastName: user.value.lastName || '',
      email: user.value.email,
      password: user.value.password || '',
      role: user.value.role,
      googleId: user.value.googleId || '',
      facebookId: user.value.facebookId || '',
      isOrganization: user.value.isOrganization,
      organizationName: user.value.organizationName || '',
      phoneNumber: user.value.phoneNumber || '',
      gender: user.value.gender || '',
      dateOfBirth: user.value.dateOfBirth || '',
      nationality: user.value.nationality || '',
      country: user.value.country || '',
      linkedIn: user.value.linkedIn || '',
      twitter: user.value.twitter || '',
      facebook: user.value.facebook || '',
      youtube: user.value.youtube || '',
      instagram: user.value.instagram || '',
      skillsAndInterests: user.value.skillsAndInterests || [],
      bio: user.value.bio || '',
    };

    const { post } = useApi();
    const response = await post('/auth/register', payload);

    if (response.status === 200 || response.status === 201) {
      // Success - redirect to sign in or profile
      navigateTo('/auth/sign-in');
    } else {
      error.value = 'Registration failed. Please try again.';
      loading.value = false;
    }
  } catch (e: any) {
    console.error('Registration error:', e);
    error.value = e?.data?.message || 'Registration failed. Please try again.';
    loading.value = false;
  } finally {
    isSubmitting.value = false;
  }
};
</script>