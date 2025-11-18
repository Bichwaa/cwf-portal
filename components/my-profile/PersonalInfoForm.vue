<template>
  <div class="flex-1 p-8">
        <div class="max-w-2xl">
          <h2 class="text-2xl text-left font-semibold text-gray-800 mb-8">Personal Info</h2>
          
          <!-- Profile Image Section -->
          <div class="mb-8">
            <label class="block text-sm text-left font-medium text-gray-700 mb-3">Profile Image</label>
            <div class="flex items-center space-x-4">
              <div class="w-20 h-20 bg-[#E9EAF0] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M12 18q2.075 0 3.538-1.462Q17 15.075 17 13q0-2.075-1.462-3.538Q14.075 8 12 8Q9.925 8 8.463 9.462Q7 10.925 7 13q0 2.075 1.463 3.538Q9.925 18 12 18Zm0-2q-1.25 0-2.125-.875T9 13q0-1.25.875-2.125T12 10q1.25 0 2.125.875T15 13q0 1.25-.875 2.125T12 16Zm6-6q.425 0 .712-.288Q19 9.425 19 9t-.288-.713Q18.425 8 18 8t-.712.287Q17 8.575 17 9t.288.712Q17.575 10 18 10ZM4 21q-.825 0-1.412-.587Q2 19.825 2 19V7q0-.825.588-1.412Q3.175 5 4 5h3.15L8.7 3.325q.15-.15.337-.238Q9.225 3 9.425 3h5.15q.2 0 .388.087q.187.088.337.238L16.85 5H20q.825 0 1.413.588Q22 6.175 22 7v12q0 .825-.587 1.413Q20.825 21 20 21Z"/></svg>  
              </div>
              <button class="px-4 py-2 bg-white shadow-sm text-gray-700 rounded-lg hover:bg-[#E9EAF0] transition-colors">
                Upload photo
              </button>
            </div>
          </div>

          <!-- Form Fields -->
          <div class="space-y-6">
            <!-- Organization Name (shown only for organizations) -->
            <div v-if="accountType === 'organization'">
              <label class="block text-sm text-left font-medium text-gray-700 mb-2">Organization Name</label>
              <input 
                v-model="localUser.organizationName" 
                type="text" 
                placeholder="Organization Name" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
            </div>

            <!-- Name Fields (shown only for individuals) -->
            <div v-if="accountType === 'individual'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm text-left font-medium text-gray-700 mb-2">First Name</label>
                <input 
                  v-model="localUser.firstName" 
                  type="text" 
                  placeholder="Erica" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
              </div>
              <div>
                <label class="block text-sm text-left font-medium text-gray-700 mb-2">Last Name</label>
                <input 
                  v-model="localUser.lastName" 
                  type="text" 
                  placeholder="Jonas" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
              </div>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm text-left font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                v-model="localUser.email" 
                type="email" 
                placeholder="Anitha12@gmail.com" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm text-left font-medium text-gray-700 mb-2">Password</label>
              <input 
                v-model="localUser.password" 
                type="password" 
                placeholder="Enter password" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
            </div>

            <!-- Phone Number -->
            <div>
              <label class="block text-sm text-left font-medium text-gray-700 mb-2">Phone Number</label>
              <div class="flex space-x-2">
                <select 
                  :value="phoneCountryCode" 
                  @change="updatePhoneCountryCode($event)"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="+234">🇳🇬 +234</option>
                  <option value="+233">🇬🇭 +233</option>
                  <option value="+254">🇰🇪 +254</option>
                  <option value="+27">🇿🇦 +27</option>
                  <option value="+20">🇪🇬 +20</option>
                  <option value="+212">🇲🇦 +212</option>
                  <option value="+213">🇩🇿 +213</option>
                  <option value="+216">🇹🇳 +216</option>
                  <option value="+255">🇹🇿 +255</option>
                </select>
                <input 
                  v-model="phoneNumberLocal" 
                  @input="updatePhoneNumber"
                  type="tel" 
                  placeholder="000-0000000" 
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
              </div>
            </div>

            <!-- Gender (hidden for organizations) -->
            <div v-if="accountType === 'individual'">
              <label class="block text-sm text-left font-medium text-gray-700 mb-2">Gender</label>
              <select 
                v-model="localUser.gender" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>

            <!-- Date of Birth (hidden for organizations) -->
            <div v-if="accountType === 'individual'">
              <label class="block text-sm text-left font-medium text-gray-700 mb-2">Date of Birth</label>
              <div class="grid grid-cols-3 gap-2">
                <select 
                  v-model="dobDay" 
                  @change="updateDateOfBirth"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Date</option>
                  <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
                </select>
                <select 
                  v-model="dobMonth" 
                  @change="updateDateOfBirth"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Month</option>
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <select 
                  v-model="dobYear" 
                  @change="updateDateOfBirth"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Year</option>
                  <option v-for="year in Array.from({length: 100}, (_, i) => new Date().getFullYear() - i)" :key="year" :value="year">{{ year }}</option>
                </select>
              </div>
            </div>

            <!-- Nationality -->
            <div>
              <label class="block text-sm text-left font-medium text-gray-700 mb-2">Nationality</label>
              <select 
                v-model="localUser.nationality" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Nationality</option>
                <option value="nigeria">Nigeria</option>
                <option value="ghana">Ghana</option>
                <option value="kenya">Kenya</option>
                <option value="south-africa">South Africa</option>
                <option value="egypt">Egypt</option>
                <option value="morocco">Morocco</option>
                <option value="algeria">Algeria</option>
                <option value="tunisia">Tunisia</option>
                <option value="tanzania">Tanzania</option>
              </select>
            </div>

            <!-- Country of Residence -->
            <div>
              <label class="block text-sm text-left font-medium text-gray-700 mb-2">Country of Residence</label>
              <select 
                v-model="localUser.country" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Country</option>
                <option value="nigeria">Nigeria</option>
                <option value="ghana">Ghana</option>
                <option value="kenya">Kenya</option>
                <option value="south-africa">South Africa</option>
                <option value="egypt">Egypt</option>
                <option value="morocco">Morocco</option>
                <option value="algeria">Algeria</option>
                <option value="tunisia">Tunisia</option>
                <option value="tanzania">Tanzania</option>
              </select>
            </div>
          </div>
        </div>
      </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import type { User } from '~/types';

const props = defineProps<{
  user: User;
  accountType: 'individual' | 'organization';
  phoneCountryCode: string;
}>();

const emit = defineEmits<{
  'update:user': [value: User];
  'update:phone-country-code': [value: string];
}>();

const localUser = computed({
  get: () => props.user,
  set: (value) => emit('update:user', value)
});

const phoneNumberLocal = ref('');
const dobDay = ref('');
const dobMonth = ref('');
const dobYear = ref('');

// Initialize phone number from user.phoneNumber if it exists
watch(() => props.user.phoneNumber, (newVal) => {
  if (newVal && !phoneNumberLocal.value) {
    // Extract phone number without country code
    const code = props.phoneCountryCode;
    if (newVal.startsWith(code)) {
      phoneNumberLocal.value = newVal.substring(code.length);
    } else {
      phoneNumberLocal.value = newVal;
    }
  }
}, { immediate: true });

// Initialize date of birth fields
watch(() => props.user.dateOfBirth, (newVal) => {
  if (newVal && !dobDay.value && !dobMonth.value && !dobYear.value) {
    try {
      const date = new Date(newVal);
      dobDay.value = date.getDate().toString();
      dobMonth.value = (date.getMonth() + 1).toString();
      dobYear.value = date.getFullYear().toString();
    } catch (e) {
      // Invalid date, ignore
    }
  }
}, { immediate: true });

const updatePhoneCountryCode = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:phone-country-code', target.value);
};

const updatePhoneNumber = () => {
  // Store just the number part (without country code)
  // Parent component will combine with country code before submission
  localUser.value.phoneNumber = phoneNumberLocal.value;
  emit('update:user', { ...localUser.value });
};

const updateDateOfBirth = () => {
  if (dobDay.value && dobMonth.value && dobYear.value) {
    try {
      const date = new Date(
        parseInt(dobYear.value),
        parseInt(dobMonth.value) - 1,
        parseInt(dobDay.value)
      );
      localUser.value.dateOfBirth = date.toISOString();
    } catch (e) {
      // Invalid date, ignore
    }
  } else {
    localUser.value.dateOfBirth = '';
  }
};
</script>

<style>

</style>