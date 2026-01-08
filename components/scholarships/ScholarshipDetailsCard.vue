<template>
  <div class="bg-gray-100 py-12 px-24 rounded-2xl text-left">
    <div class="bg-white py-6 px-12 rounded-xl">
      <p>
        {{ scholarship.description }}
      </p>

      <div v-if="scholarship.objectives">
          <h3 class="font-semibold text-2xl pt-6">Scholarship Objective</h3>
          <p class="mb-6">
            {{ scholarship.objectives }}
          </p>
      </div>

      <h4 class="font-semibold text-lg pt-6 ">Key Dates</h4>
      <hr class="text-gray-100 my-3"/>
      <div class="grid grid-cols-2 gap-4">
        <p>Application Opens</p>
        <p>{{ formatDate(scholarship.applicationWindow.opensAt) }}</p>
      </div>
      <hr class="text-gray-100 my-3"/>
      <div class="grid grid-cols-2 gap-4">
        <p>Application Deadline</p>
        <p>{{ formatDate(scholarship.applicationWindow.closesAt) }}</p>
      </div>
      <!-- Add other dates if available in the scholarship object -->
      
      <div class="my-3" v-if="(scholarship.benefits && scholarship.benefits.extras && scholarship.benefits.extras.length) || (scholarship.coverage && scholarship.coverage.length)">
        <h3 class="font-semibold text-2xl pt-6">What the scholarship covers</h3>
        <ul class="px-6 flex flex-col gap-2 list-disc">
           <li v-for="(item, index) in (scholarship.benefits?.extras || scholarship.coverage)" :key="index">{{ item }}</li>
        </ul>
        <div v-if="scholarship.benefits && scholarship.benefits.amount" class="mt-4">
            <p><strong>Additional Benefit:</strong> {{ formatCurrency(scholarship.benefits.amount, scholarship.benefits.currency) }} / {{ scholarship.benefits.periodicity }}</p>
        </div>
      </div>

      <div class="my-3">
        <h3 class="font-semibold text-2xl pt-6">Eligibility Criteria</h3>
        <span class="block">All applicants must:</span>
        <ul class="px-6 flex flex-col gap-2 list-disc">
          <li v-if="scholarship.eligibleNationalities && scholarship.eligibleNationalities.length">
              Be a citizen of: {{ scholarship.eligibleNationalities.join(', ') }}
          </li>
          <li v-if="scholarship.academicLevels && scholarship.academicLevels.length">
              Academic Level: {{ scholarship.academicLevels.join(', ') }}
          </li>
          <li v-if="scholarship.gpaMin">
             Have a minimum GPA of {{ scholarship.gpaMin }}
          </li>
          <li v-if="scholarship.ageRange">
             Be between {{ scholarship.ageRange.min }} and {{ scholarship.ageRange.max }} years old
          </li>
           <li v-if="scholarship.disciplines && scholarship.disciplines.length">
              Focus in: {{ scholarship.disciplines.join(', ') }}
          </li>
           <li v-if="scholarship.eligibleInstitutions && scholarship.eligibleInstitutions.length">
              Attending one of: {{ scholarship.eligibleInstitutions.join(', ') }}
          </li>
          <!-- Fallback/Legacy support -->
          <li v-if="scholarship.criteria" v-for="(item, index) in scholarship.criteria" :key="`criteria-${index}`">{{ item }}</li>
        </ul>
      </div>

      <div class="my-3" v-if="(scholarship.requiredDocuments && scholarship.requiredDocuments.length) || (scholarship.requirements && scholarship.requirements.length)">
        <h3 class="font-semibold text-2xl pt-6">Required Documents</h3>
        <ul class="px-6 flex flex-col gap-2 list-disc">
          <li v-for="(item, index) in (scholarship.requiredDocuments || scholarship.requirements)" :key="index">{{ item }}</li>
        </ul>
      </div>

      <div class="my-3">
        <h3 class="font-semibold text-2xl pt-6">How to apply</h3>
        <ul class="px-6 flex flex-col gap-2 list-disc">
          <li>Click the "apply now" button</li>
          <li>Fill out online form with personal and academic details</li>
          <li>Upload all required documents</li>
          <li>Submit your application before the deadline</li>
        </ul>
        <span class="font-bold">Note:</span> <span>Incomplete applications will not be considered.</span>
        <div v-if="scholarship.contactEmail" class="mt-4 text-sm text-gray-600">
            Questions? Contact us at: <a :href="`mailto:${scholarship.contactEmail}`" class="text-blue-600 hover:underline">{{ scholarship.contactEmail }}</a>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

interface Scholarship {
  description: string;
  objectives?: string;
  applicationWindow: {
    opensAt: string;
    closesAt: string;
  };
  coverage?: string[]; // Legacy support
  criteria?: string[]; // Legacy support
  // New fields from payload
  benefits?: {
      type: string;
      amount: number;
      currency: string;
      periodicity: string;
      extras: string[];
  };
  requiredDocuments: string[];
  eligibleNationalities?: string[];
  academicLevels?: string[];
  disciplines?: string[];
  eligibleInstitutions?: string[];
  gpaMin?: number;
  ageRange?: {
      min: number;
      max: number;
  };
  contactEmail?: string;
  requirements?: string[]; // Legacy mapping if needed
}

defineProps({
  scholarship: {
    type: Object as PropType<Scholarship>,
    required: true,
  }
})

const formatDate = (dateString: string) => {
  if (!dateString) return 'TBA';
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: currency }).format(amount);
}
</script>

<style>

</style>
