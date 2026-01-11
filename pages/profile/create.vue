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
    
    <!-- Role Selection (Mentee or Mentor) -->
    <div v-if="!userRole" class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <h3 class="text-2xl text-start font-medium text-gray-700 mb-6">Select Your Role</h3>
        <div class="space-y-4">
          <label
            @click="selectUserRole('mentee')"
            class="border-2 rounded-lg p-6 flex items-center space-x-4 cursor-pointer hover:border-blue-500 transition-colors"
            :class="userRole === 'mentee' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
          >
            <div :class="['w-5 h-5 p-1 rounded-full border-2 flex items-center justify-center', userRole === 'mentee' ? 'border-blue-500' : 'border-gray-300']">
              <span v-if="userRole === 'mentee'" class="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
            </div>
            <div class="text-left">
              <h3 class="font-semibold text-lg">Mentee</h3>
              <p class="text-sm text-gray-500">Register as a mentee seeking guidance</p>
            </div>
          </label>

          <label
            @click="selectUserRole('mentor')"
            class="border-2 rounded-lg p-6 flex items-center space-x-4 cursor-pointer hover:border-blue-500 transition-colors"
            :class="userRole === 'mentor' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
          >
            <div :class="['w-5 h-5 rounded-full p-1 border-2 flex items-center justify-center', userRole === 'mentor' ? 'border-blue-500' : 'border-gray-300']">
              <span v-if="userRole === 'mentor'" class="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
            </div>
            <div class="text-left">
              <h3 class="font-semibold text-lg">Mentor</h3>
              <p class="text-sm text-gray-500">Register as a mentor to provide guidance</p>
            </div>
          </label>
        </div>
      </div>
    </div>

    <!-- Account Type Selection (only show if mentor is selected and account type not set) -->
    <div v-else-if="userRole === 'mentor' && !accountType" class="container mx-auto px-4 py-8">
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
              <p class="text-sm text-gray-500">Register as an individual mentor</p>
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

    <div v-else-if="(userRole === 'mentee') || (userRole === 'mentor' && accountType)" class="flex px-20">
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
        <!-- Profile Photo Upload -->
        <div class="px-8 py-8">
          <div class="max-w-2xl">
            <label for="profilePhoto" class="block text-2xl text-left font-bold text-gray-800 mb-2">Profile Photo</label>
            <div class="flex items-center space-x-4">
              <div v-if="profilePhotoUrl" class="relative">
                <img :src="profilePhotoUrl" alt="Profile" class="w-24 h-24 rounded-full object-cover border-2 border-gray-300" />
                <button 
                  @click="removeProfilePhoto"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                  type="button"
                >
                  <Icon name="mdi:close" class="w-4 h-4" />
                </button>
              </div>
              <div v-else class="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                <Icon name="mdi:camera" class="w-8 h-8 text-gray-400" />
              </div>
              <div class="flex-1">
                <label 
                  for="profilePhotoInput" 
                  class="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Icon name="mdi:upload" class="w-5 h-5 mr-2" />
                  {{ profilePhotoUrl ? 'Change Photo' : 'Upload Photo' }}
                </label>
                <input 
                  id="profilePhotoInput"
                  type="file" 
                  accept="image/*" 
                  @change="handleProfilePhotoUpload"
                  class="hidden"
                />
                <p v-if="uploadingPhoto" class="text-sm text-gray-500 mt-2">Uploading...</p>
                <p v-else-if="profilePhotoUrl" class="text-sm text-green-600 mt-2">Photo uploaded successfully</p>
                <p v-else class="text-sm text-gray-500 mt-2">JPG, PNG or GIF (max 50MB)</p>
              </div>
            </div>
          </div>
        </div>
        <PersonalInfoForm 
          v-model:user="user"
          :account-type="accountType || 'individual'"
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
        :goals="goals"
        :show-goals="userRole === 'mentee'"
        @update:goals="goals = $event"
      />
    </div>
    <!-- Continue Button -->
    <hr v-if="(userRole === 'mentee') || (userRole === 'mentor' && accountType)" class="border-gray-300 w-full mt-12"/>
    <div v-if="(userRole === 'mentee') || (userRole === 'mentor' && accountType)" class="mt-8 flex justify-end px-56 pb-8">
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
const userRole = ref<'mentee' | 'mentor' | null>(null);
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

// Additional field for mentee registration
const goals = ref<string[]>([]);

// Additional fields for mentor registration
const yearsOfExperience = ref(0);
const profilePicture = ref('');
const profilePictureId = ref<string | null>(null); // Store attachment _id
const availabilityStatus = ref('available');
const maxMentees = ref(4);

// Profile photo upload state
const profilePhotoUrl = ref<string | null>(null);
const uploadingPhoto = ref(false);

const selectUserRole = (role: 'mentee' | 'mentor') => {
  userRole.value = role;
  user.value.role = role;
  
  if (role === 'mentee') {
    // For mentees, set defaults and skip account type selection
    user.value.isOrganization = false;
    user.value.organizationName = '';
    accountType.value = null; // No account type needed for mentees
  } else {
    // For mentors, reset account type to show selection
    accountType.value = null;
    user.value.isOrganization = false;
    user.value.organizationName = '';
  }
};

const selectAccountType = (type: 'individual' | 'organization') => {
  accountType.value = type;
  if (type === 'organization') {
    user.value.isOrganization = true;
    user.value.firstName = '';
    user.value.lastName = '';
  } else {
    user.value.isOrganization = false;
    user.value.organizationName = '';
  }
};

const handleProfilePhotoUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (!file) return;
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    error.value = 'Please upload an image file';
    return;
  }
  
  // Validate file size (50MB)
  if (file.size > 52_428_800) {
    error.value = 'File size exceeds 50MB limit';
    return;
  }
  
  uploadingPhoto.value = true;
  error.value = '';
  
  try {
    const { post } = useApi();
    const config = useRuntimeConfig();
    const baseURL = config.public.backendRootUrl;
    
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('file', file);
    
    // Upload file
    const response = await $fetch<{ url: string; attachmentId: string; _id?: string; name: string; fileType: string; size: number }>(
      `${baseURL}/media/upload-media`,
      {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - browser will set it with boundary
      }
    );
    
    if (response.url && response._id) {
      profilePhotoUrl.value = response.url;
      // Store both URL (for preview) and _id (for backend)
      profilePicture.value = response.url;
      profilePictureId.value = response._id;
    } else {
      error.value = 'Failed to upload photo';
    }
  } catch (e: any) {
    console.error('Photo upload error:', e);
    error.value = e?.data?.error || e?.message || 'Failed to upload photo. Please try again.';
  } finally {
    uploadingPhoto.value = false;
  }
};

const removeProfilePhoto = () => {
  profilePhotoUrl.value = null;
  profilePicture.value = '';
  profilePictureId.value = null;
};

const handleSubmit = async () => {
  error.value = '';
  isSubmitting.value = true;
  loading.value = true;

  try {
    // Validate role is selected
    if (!userRole.value) {
      error.value = 'Please select a role (Mentee or Mentor)';
      loading.value = false;
      isSubmitting.value = false;
      return;
    }

    // Validate account type for mentors
    if (userRole.value === 'mentor' && !accountType.value) {
      error.value = 'Please select an account type';
      loading.value = false;
      isSubmitting.value = false;
      return;
    }

    // Combine phone country code and number
    // The phoneNumber from PersonalInfoForm is just the number part
    if (user.value.phoneNumber && !user.value.phoneNumber.startsWith('+')) {
      user.value.phoneNumber = phoneCountryCode.value + user.value.phoneNumber;
    } else if (!user.value.phoneNumber) {
      // If no phone number was set, we might need to get it from the form
      // For now, we'll leave it empty
    }

    const { post } = useApi();
    
    // Use different endpoints based on role
    const endpoint = userRole.value === 'mentor' 
      ? '/mentorship/mentors/register-mentor'
      : '/mentorship/mentees/create';
    
    let payload: any;

    if (userRole.value === 'mentor') {
      // Mentor payload matches the nested structure in payload.json
      payload = {
        password: user.value.password || '',
        isOrganization: user.value.isOrganization,
        organizationName: user.value.organizationName || '',
        contacts: {
          email: user.value.email,
          phoneNumber: user.value.phoneNumber || '',
        },
        personalInfo: {
          firstName: user.value.firstName || '',
          surname: user.value.lastName || '',
          gender: user.value.gender || '',
          dateOfBirth: user.value.dateOfBirth || '',
          nationality: user.value.nationality || '',
          countryOfResidence: user.value.country || '',
          profilePhoto:  profilePhotoUrl.value || null,
        },
        socialMedia: {
          linkedin: user.value.linkedIn || '',
          twitter: user.value.twitter || '',
        },
        bio: user.value.bio || '',
        skillsAndInterests: user.value.skillsAndInterests || [],
        yearsOfExperience: yearsOfExperience.value || 0,
        profilePicture: profilePhotoUrl.value || null,
        availabilityStatus: availabilityStatus.value || 'available',
        maxMentees: maxMentees.value || 4,
      };
    } else {
      // Mentee payload matches the nested structure in mentee_payload.json
      payload = {
        password: user.value.password || '',
        contacts: {
          email: user.value.email,
          phoneNumber: user.value.phoneNumber || '',
        },
        personalInfo: {
          firstName: user.value.firstName || '',
          surname: user.value.lastName || '',
          gender: user.value.gender || '',
          dateOfBirth: user.value.dateOfBirth || '',
          nationality: user.value.nationality || '',
          countryOfResidence: user.value.country || '',
          profilePhoto: profilePhotoUrl.value || null,
        },
        socialMedia: {
          linkedin: user.value.linkedIn || '',
          instagram: user.value.instagram || '',
        },
        bio: user.value.bio || '',
        skillsAndInterests: user.value.skillsAndInterests || [],
        goals: goals.value || [],
      };
    }
    
    const response = await post(endpoint, payload);

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