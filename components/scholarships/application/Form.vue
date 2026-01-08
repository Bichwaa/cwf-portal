<template>
  <div class="bg-white py-8 lg:px-48 rounded-lg shadow-md min-h-screen">
    <div class="flex items-center mb-6">
      <button v-if="currentStep > 1" @click="currentStep--" class="mr-4">
        <Icon name="material-symbols:arrow-back" class="w-6 h-6 text-gray-600" />
      </button>
      <h1 class="text-xl font-semibold">SCHOLARSHIP APPLICATION</h1>
    </div>

    <div class="mb-8">
      <ul class="flex flex-wrap space-x-4 text-sm text-gray-500 list-none">
        <li :class="{ 'font-semibold text-blue-600': currentStep === 1 }">Personal Details</li>
        <li>&gt;</li>
        <li :class="{ 'font-semibold text-blue-600': currentStep === 2 }">Level of Education</li>
        <li>&gt;</li>
        <li :class="{ 'font-semibold text-blue-600': currentStep === 3 }">Study Interests</li>
        <li>&gt;</li>
        <li :class="{ 'font-semibold text-blue-600': currentStep === 4 }">Attachments</li>
      </ul>
    </div>

    <!-- Step 1: Personal Details -->
    <div v-if="currentStep === 1">
      <h2 class="text-2xl font-bold mb-6">Personal Details</h2>
      <form @submit.prevent="currentStep = 2">
        <div class="flex flex-col gap-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input v-model="form.applicantData.firstName" type="text" required class="w-full border-gray-300 rounded-md shadow-sm p-2 border">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input v-model="form.applicantData.lastName" type="text" required class="w-full border-gray-300 rounded-md shadow-sm p-2 border">
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input v-model="form.applicantData.email" type="email" required class="w-full border-gray-300 rounded-md shadow-sm p-2 border">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input v-model="form.applicantData.phone" type="tel" class="w-full border-gray-300 rounded-md shadow-sm p-2 border">
          </div>
        </div>
        <div class="mt-8 pt-6 border-t flex justify-end space-x-4">
          <button type="button" @click="navigateTo('/scholarships')" class="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            Continue
          </button>
        </div>
      </form>
    </div>

    <!-- Step 2: Level of Education -->
    <div v-if="currentStep === 2">
      <h2 class="text-2xl font-bold mb-6">Level of Education</h2>
      <form @submit.prevent="currentStep = 3">
        <div class="flex flex-col gap-6">
          <div>
            <label for="education-level" class="block text-sm font-medium text-gray-700 mb-1">Current Education Level</label>
            <select id="education-level" v-model="form.education.level" class="w-full border-gray-300 rounded-md shadow-sm p-2 border">
              <option>Graduate</option>
              <option>Undergraduate</option>
            </select>
          </div>
          <div></div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <div class="flex space-x-2">
              <select v-model="form.education.startDate.month" class="w-full border-gray-300 rounded-md shadow-sm p-2 border">
                <option disabled value="">Month</option>
                <option v-for="m in months" :key="m" :value="m">{{ m }}</option>
              </select>
              <select v-model="form.education.startDate.year" class="w-full border-gray-300 rounded-md shadow-sm p-2 border">
                <option disabled value="">Year</option>
                <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <div class="flex space-x-2">
              <select v-model="form.education.endDate.month" class="w-full border-gray-300 rounded-md shadow-sm p-2 border">
                <option disabled value="">Month</option>
                <option v-for="m in months" :key="m" :value="m">{{ m }}</option>
              </select>
              <select v-model="form.education.endDate.year" class="w-full border-gray-300 rounded-md shadow-sm p-2 border">
                <option disabled value="">Year</option>
                <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
              </select>
            </div>
          </div>
          <div class="flex items-center">
            <input type="checkbox" id="ongoing" v-model="form.education.ongoing" class="h-4 w-4 text-blue-600 border-gray-300 rounded">
            <label for="ongoing" class="ml-2 block text-sm text-gray-900">Ongoing</label>
          </div>
          <div></div>
          <div>
            <label for="certificates" class="block text-sm font-medium text-gray-700 mb-1">Certificates Attained</label>
            <input type="text" id="certificates" v-model="form.education.certificates" placeholder="e.g. WAEC, Bachelor of Science" class="w-full border-gray-300 rounded-md shadow-sm p-2 border">
          </div>
          <div>
            <label for="awards" class="block text-sm font-medium text-gray-700 mb-1">Awards (if any)</label>
            <input type="text" id="awards" v-model="form.education.awards" placeholder="e.g. Best STEM Student Award 2022" class="w-full border-gray-300 rounded-md shadow-sm p-2 border">
          </div>
        </div>

        <div class="mt-8 pt-6 border-t flex justify-end space-x-4">
          <button type="button" @click="currentStep = 1" class="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Back
          </button>
          <button type="submit" class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            Continue
          </button>
        </div>
      </form>
    </div>

    <!-- Step 3: Study Interests -->
    <div v-if="currentStep === 3">
      <h2 class="text-2xl font-bold mb-6">Study Interests</h2>
      <form @submit.prevent="currentStep = 4">
        <div class="flex flex-col gap-6">
          <div>
            <label for="preferred-schools" class="block text-sm font-medium text-gray-700 mb-1">Preferred Schools</label>
            <input type="text" id="preferred-schools" v-model="form.studyInterests.preferredSchools" placeholder="e.g. University of Lagos, Covenant University" class="w-full border-gray-300 rounded-md shadow-sm p-2 border">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Preferred Start Month</label>
            <div class="flex space-x-2">
              <select v-model="form.studyInterests.startMonth.month" class="w-full border-gray-300 rounded-md shadow-sm p-2 border">
                <option disabled value="">Month</option>
                 <option v-for="m in months" :key="m" :value="m">{{ m }}</option>
              </select>
              <select v-model="form.studyInterests.startMonth.year" class="w-full border-gray-300 rounded-md shadow-sm p-2 border">
                <option disabled value="">Year</option>
                <option v-for="y in futureYears" :key="y" :value="y">{{ y }}</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Preferred End Month</label>
            <div class="flex space-x-2">
              <select v-model="form.studyInterests.endMonth.month" class="w-full border-gray-300 rounded-md shadow-sm p-2 border">
                <option disabled value="">Month</option>
                 <option v-for="m in months" :key="m" :value="m">{{ m }}</option>
              </select>
              <select v-model="form.studyInterests.endMonth.year" class="w-full border-gray-300 rounded-md shadow-sm p-2 border">
                <option disabled value="">Year</option>
                 <option v-for="y in futureYears" :key="y" :value="y">{{ y }}</option>
              </select>
            </div>
          </div>
          <div>
            <label for="study-type" class="block text-sm font-medium text-gray-700 mb-1">Study Type</label>
            <select id="study-type" v-model="form.studyInterests.studyType" class="w-full border-gray-300 rounded-md shadow-sm p-2 border">
              <option>Online</option>
              <option>Offline</option>
            </select>
          </div>
          <div>
            <label for="english-level" class="block text-sm font-medium text-gray-700 mb-1">English Level</label>
            <select id="english-level" v-model="form.studyInterests.englishLevel" class="w-full border-gray-300 rounded-md shadow-sm p-2 border">
              <option>Advanced</option>
              <option>Intermediate</option>
              <option>Beginner</option>
            </select>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t flex justify-end space-x-4">
          <button type="button" @click="currentStep = 2" class="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Back
          </button>
          <button type="submit" class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            Continue
          </button>
        </div>
      </form>
    </div>

    <!-- Step 4: Attachments -->
    <div v-if="currentStep === 4">
      <h2 class="text-2xl font-bold mb-6">Attachments</h2>
      <div class="space-y-4">
        <!-- Static examples preserved as UI, but not functional for upload since backend has no route -->
        <div class="border rounded-md p-4 flex items-center justify-between">
          <div class="flex items-center">
             <Icon name="vscode-icons:file-type-pdf2" class="w-8 h-8 mr-4" />
            <div>
              <p class="font-semibold">Curriculum Vitae</p>
              <p class="text-sm text-gray-500">2.8 MB</p>
            </div>
          </div>
          <div>
             <button class="text-red-600 hover:text-red-800 text-sm font-semibold">Delete</button>
            <span class="text-gray-300 mx-2">|</span>
            <button class="text-blue-600 hover:text-blue-800 text-sm font-semibold">Replace</button>
          </div>
        </div>
        <!-- ... other static items ... -->
      </div>

      <div class="mt-8">
        <p class="text-sm font-medium text-gray-700 mb-2">Upload any other supporting document</p>
        <div class="border-2 border-dashed border-gray-300 rounded-md p-8 text-center bg-gray-50">
           <Icon name="material-symbols:cloud-upload-outline" class="mx-auto h-12 w-12 text-gray-400" />
          <p class="mt-4 text-sm text-gray-600">Drag your file(s) or <button class="font-medium text-blue-600 hover:text-blue-500">browse</button></p>
          <p class="mt-1 text-xs text-gray-500">Max 10 MB files are allowed</p>
        </div>
        <p class="text-xs text-orange-500 mt-2">* File upload is currently disabled in this demo.</p>
      </div>

      <div class="mt-8 pt-6 border-t flex justify-end space-x-4">
        <button type="button" @click="currentStep = 3" class="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
          Back
        </button>
        <button @click="submitApplication" :disabled="submitting" class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
          {{ submitting ? 'Submitting...' : 'Submit Application' }}
        </button>
      </div>
      <p v-if="errorMsg" class="text-red-600 text-right mt-2">{{ errorMsg }}</p>
      <p v-if="successMsg" class="text-green-600 text-right mt-2">{{ successMsg }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';

const props = defineProps({
    scholarshipId: {
        type: String,
        default: ''
    }
});

const currentStep = ref(1);
const submitting = ref(false);
const errorMsg = ref('');
const successMsg = ref('');
const config = useRuntimeConfig();

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
const futureYears = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

const form = reactive({
  applicantData: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
  },
  education: {
      level: 'Undergraduate',
      startDate: { month: '', year: '' },
      endDate: { month: '', year: '' },
      ongoing: false,
      certificates: '',
      awards: ''
  },
  studyInterests: {
      preferredSchools: '',
      startMonth: { month: '', year: '' },
      endMonth: { month: '', year: '' },
      studyType: 'Online',
      englishLevel: 'Intermediate'
  }
});

onMounted(() => {
    try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user) {
                form.applicantData.firstName = user.firstName || '';
                form.applicantData.lastName = user.surname || user.lastName || '';
                form.applicantData.email = user.email || '';
                form.applicantData.phone = user.phone || '';
            }
        }
    } catch (e) {
        console.error('Failed to load user details from local storage', e);
    }
});

const submitApplication = async () => {
    submitting.value = true;
    errorMsg.value = '';
    successMsg.value = '';

    try {
        const targetScholarshipId = props.scholarshipId || (useRoute().query.scholarshipId as string);

        if (!targetScholarshipId) {
            throw new Error("Scholarship ID is missing.");
        }

        const storedUser = localStorage.getItem('user');
        let applicantId = '';
        if (storedUser) {
            const user = JSON.parse(storedUser);
            // Assuming the user object has an _id or userId that corresponds to the applicant ID
            // If the user needs to be registered as an applicant first, that logic handles elsewhere, 
            // but for now we assume the logged in user's ID is the applicant ID reference.
            applicantId = user._id || user.userId;
        }

        // Mapping form fields to the specific payload structure requested
        const payload = {
            scholarship: targetScholarshipId,
            applicant: applicantId, 
            status: 'draft',
            answers: [
                 {
                    questionId: "education_level",
                    prompt: "Current Education Level",
                    response: form.education.level
                 },
                 {
                    questionId: "education_dates",
                    prompt: "Education Dates",
                    response: `Start: ${form.education.startDate.month} ${form.education.startDate.year}, End: ${form.education.endDate.month} ${form.education.endDate.year} (Ongoing: ${form.education.ongoing})`
                 },
                 {
                    questionId: "certificates",
                    prompt: "Certificates Attained",
                    response: form.education.certificates || "N/A"
                 },
                 {
                     questionId: "awards",
                     prompt: "Awards",
                     response: form.education.awards || "N/A"
                 },
                 {
                     questionId: "study_interests",
                     prompt: "Study Interests",
                     response: `Preferred Schools: ${form.studyInterests.preferredSchools || 'N/A'}, Type: ${form.studyInterests.studyType}, English Level: ${form.studyInterests.englishLevel}`
                 }
            ],
            attachments: [],
             applicantData: !applicantId ? {
                firstName: form.applicantData.firstName,
                lastName: form.applicantData.lastName,
                email: form.applicantData.email,
                phone: form.applicantData.phone
            } : undefined
        };

        const response = await $fetch(`${config.public.backendRootUrl}/scholarship-management/applications/create-application`, {
            method: 'POST',
            body: payload
        });

        successMsg.value = "Application submitted successfully!";
        // Redirect or reset?
        setTimeout(() => {
             navigateTo('/scholarships');
        }, 2000);

    } catch (err: any) {
        console.error(err);
        errorMsg.value = err.data?.message || err.message || "Failed to submit application.";
    } finally {
        submitting.value = false;
    }
}
</script>

<style>

</style>