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
    <div class="max-w-2xl mx-auto space-y-6">
      <h3 class="text-2xl text-start font-medium text-gray-700 mb-6">Apply to be a mentor</h3>
      
      <!-- Bio -->
      <div class="mb-6">
        <label for="bio" class="block text-sm text-start font-medium text-gray-700 mb-2">About Me</label>
        <textarea 
          v-model="bio"
          id="bio" 
          name="bio" 
          rows="6" 
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Write your bio"></textarea>
      </div>

      <!-- Specializations -->
      <div>
        <label class="block text-sm text-start font-medium text-gray-700 mb-2">Specializations</label>
        <input 
          v-model="newSpecialization"
          @keydown.enter.prevent="addSpecialization"
          type="text" 
          placeholder="Enter specialization and press enter" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div class="flex flex-wrap gap-2 mt-2">
          <div 
            v-for="(spec, index) in specializations" 
            :key="index"
            class="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm"
          >
            <span>{{ spec }}</span>
            <button 
              @click="removeSpecialization(index)"
              class="ml-2 text-gray-500 hover:text-gray-700"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Years of Experience -->
      <div>
        <label for="yearsOfExperience" class="block text-sm text-start font-medium text-gray-700 mb-2">Years of Experience</label>
        <input 
          v-model.number="yearsOfExperience"
          id="yearsOfExperience"
          type="number" 
          min="0"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Certifications -->
      <div>
        <label class="block text-sm text-start font-medium text-gray-700 mb-2">Certifications</label>
        <input 
          v-model="newCertification"
          @keydown.enter.prevent="addCertification"
          type="text" 
          placeholder="Enter certification and press enter" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div class="flex flex-wrap gap-2 mt-2">
          <div 
            v-for="(cert, index) in certifications" 
            :key="index"
            class="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm"
          >
            <span>{{ cert }}</span>
            <button 
              @click="removeCertification(index)"
              class="ml-2 text-gray-500 hover:text-gray-700"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Availability Status -->
      <div>
        <label for="availabilityStatus" class="block text-sm text-start font-medium text-gray-700 mb-2">Availability Status</label>
        <select 
          v-model="availabilityStatus"
          id="availabilityStatus"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
          <option value="on-break">On Break</option>
        </select>
      </div>

      <!-- Max Mentees -->
      <div>
        <label for="maxMentees" class="block text-sm text-start font-medium text-gray-700 mb-2">Max Mentees</label>
        <input 
          v-model.number="maxMentees"
          id="maxMentees"
          type="number" 
          min="0"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Languages -->
      <div>
        <label class="block text-sm text-start font-medium text-gray-700 mb-2">Languages</label>
        <input 
          v-model="newLanguage"
          @keydown.enter.prevent="addLanguage"
          type="text" 
          placeholder="Enter language and press enter" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div class="flex flex-wrap gap-2 mt-2">
          <div 
            v-for="(lang, index) in languages" 
            :key="index"
            class="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm"
          >
            <span>{{ lang }}</span>
            <button 
              @click="removeLanguage(index)"
              class="ml-2 text-gray-500 hover:text-gray-700"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Preferred Communication -->
      <div>
        <label class="block text-sm text-start font-medium text-gray-700 mb-2">Preferred Communication</label>
        <div class="space-y-2">
          <label class="flex items-center">
            <input 
              type="checkbox" 
              value="video" 
              v-model="preferredCommunication"
              class="mr-2"
            />
            <span>Video</span>
          </label>
          <label class="flex items-center">
            <input 
              type="checkbox" 
              value="email" 
              v-model="preferredCommunication"
              class="mr-2"
            />
            <span>Email</span>
          </label>
          <label class="flex items-center">
            <input 
              type="checkbox" 
              value="phone" 
              v-model="preferredCommunication"
              class="mr-2"
            />
            <span>Phone</span>
          </label>
          <label class="flex items-center">
            <input 
              type="checkbox" 
              value="chat" 
              v-model="preferredCommunication"
              class="mr-2"
            />
            <span>Chat</span>
          </label>
        </div>
      </div>

      <!-- Industries -->
      <div>
        <label class="block text-sm text-start font-medium text-gray-700 mb-2">Industries</label>
        <input 
          v-model="newIndustry"
          @keydown.enter.prevent="addIndustry"
          type="text" 
          placeholder="Enter industry and press enter" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div class="flex flex-wrap gap-2 mt-2">
          <div 
            v-for="(industry, index) in industries" 
            :key="index"
            class="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm"
          >
            <span>{{ industry }}</span>
            <button 
              @click="removeIndustry(index)"
              class="ml-2 text-gray-500 hover:text-gray-700"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr class="mb-6">
  <div class="container mx-auto px-4 py-2">
    <div class="max-w-2xl mx-auto">
      <div class="flex justify-end">
        <div v-if="error" class="text-red-600 text-sm mr-4 self-center">{{ error }}</div>
        <button 
          @click="apply" 
          type="submit" 
          :disabled="isSubmitting"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? 'Submitting...' : 'Apply now' }}
        </button>
      </div>
    </div>
  </div>
  <ApplicationSentModal v-if="showModal" @close="closeModal" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import ApplicationSentModal from '~/components/ApplicationSentModal.vue';

const showModal = ref(false)
const bio = ref('')
const specializations = ref<string[]>([])
const newSpecialization = ref('')
const yearsOfExperience = ref(0)
const certifications = ref<string[]>([])
const newCertification = ref('')
const availabilityStatus = ref('available')
const maxMentees = ref(0)
const languages = ref<string[]>([])
const newLanguage = ref('')
const preferredCommunication = ref<string[]>([])
const industries = ref<string[]>([])
const newIndustry = ref('')
const currentUserId = ref('')
const isSubmitting = ref(false)
const error = ref('')

const addSpecialization = () => {
  if (newSpecialization.value.trim() && !specializations.value.includes(newSpecialization.value.trim())) {
    specializations.value.push(newSpecialization.value.trim())
    newSpecialization.value = ''
  }
}

const removeSpecialization = (index: number) => {
  specializations.value.splice(index, 1)
}

const addCertification = () => {
  if (newCertification.value.trim() && !certifications.value.includes(newCertification.value.trim())) {
    certifications.value.push(newCertification.value.trim())
    newCertification.value = ''
  }
}

const removeCertification = (index: number) => {
  certifications.value.splice(index, 1)
}

const addLanguage = () => {
  if (newLanguage.value.trim() && !languages.value.includes(newLanguage.value.trim())) {
    languages.value.push(newLanguage.value.trim())
    newLanguage.value = ''
  }
}

const removeLanguage = (index: number) => {
  languages.value.splice(index, 1)
}

const addIndustry = () => {
  if (newIndustry.value.trim() && !industries.value.includes(newIndustry.value.trim())) {
    industries.value.push(newIndustry.value.trim())
    newIndustry.value = ''
  }
}

const removeIndustry = (index: number) => {
  industries.value.splice(index, 1)
}

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false;
  navigateTo('/profile/mentor-profile')
}

// Fetch current user ID on mount
onMounted(async () => {
  const token = localStorage.getItem('auth_token')
  if (!token) {
    error.value = 'Not authenticated'
    return
  }

  try {
    const { get } = useApi()
    const me = await get<any>('/auth/me', {
      headers: { authorization: `Bearer ${token}` }
    })
    currentUserId.value = me.data._id
  } catch (e) {
    error.value = 'Failed to load user information'
  }
})

const apply = async () => {
  if (!currentUserId.value) {
    error.value = 'User information not loaded. Please refresh the page.'
    return
  }

  isSubmitting.value = true
  error.value = ''

  const token = localStorage.getItem('auth_token')
  if (!token) {
    error.value = 'Not authenticated'
    isSubmitting.value = false
    return
  }

  try {
    const payload = {
      userId: currentUserId.value,
      specializations: specializations.value,
      yearsOfExperience: yearsOfExperience.value || 0,
      certifications: certifications.value,
      availabilityStatus: availabilityStatus.value,
      bio: bio.value || '',
      maxMentees: maxMentees.value || 0,
      currentMenteeCount: 0,
      rating: {
        average: 0,
        count: 0
      },
      languages: languages.value,
      preferredCommunication: preferredCommunication.value,
      industries: industries.value
    }

    const { post } = useApi()
    const response = await post(
      '/mentorship/mentors/register-mentor', 
      payload, 
      { headers: { authorization: `Bearer ${token}` } }
    )

    if (response.status === 200 || response.status === 201) {
      openModal()
    } else {
      error.value = 'Failed to register as mentor. Please try again.'
      console.log(response.data)
    }
  } catch (e: any) {
    error.value = e?.data?.message || 'Failed to register as mentor. Please try again.'
    console.error('Registration error:', e)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style>

</style>