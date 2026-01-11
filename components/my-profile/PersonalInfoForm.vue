<template>
  <div class="flex-1 p-8">
        <div class="max-w-2xl">
          <h2 class="text-2xl text-left font-semibold text-gray-800 mb-8">Personal Info</h2>
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