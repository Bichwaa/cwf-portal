<template>
  <div class="bg-gray-100 rounded-2xl shadow-sm overflow-hidden lines-bg">
    <div class="p-8 flex flex-col gap-4">
      <h1 class="text-4xl text-left font-bold text-gray-800">{{ scholarship.title }}</h1>
      <p class="text-gray-600 text-left mt-2 mb-6">{{ scholarship.providerName }}</p>
      <ButtonsGradientButton @click="navigateTo({ path: '/scholarships/apply', query: { scholarshipId: scholarship.scholarshipId } })" text="Start Application" class="self-start" />
    </div>
    <hr/>
    <div class="bg-gray-100 p-4 grid grid-cols-4 gap-4">
      <div class="flex items-center space-x-2 col-span-1">
        <Icon name="healthicons:money-bag-outline" class="w-6 h-6 text-gray-500" />
        <div>
          <p class="text-sm text-gray-500">Grant</p>
          <p class="font-bold text-gray-800">{{ scholarship.benefits?.amount ? `${scholarship.benefits.amount.toLocaleString()} ${scholarship.benefits.currency}` : 'N/A' }}</p>
        </div>
      </div>
      <div class="flex items-center space-x-2 col-span-1">
        <Icon name="material-symbols:school-outline" class="w-6 h-6 text-gray-500" />
        <div>
          <p class="text-sm text-gray-500">Study Location</p>
          <p class="font-bold text-gray-800">{{ scholarship.eligibleInstitutions?.length ? (scholarship.eligibleInstitutions.length > 1 ? 'Multiple Universities' : scholarship.eligibleInstitutions[0]) : 'Any University' }}</p>
        </div>
      </div>
      <div class="flex items-center space-x-2 col-span-1">
        <Icon name="material-symbols:calendar-month-outline-rounded" class="w-6 h-6 text-gray-500" />
        <div>
          <p class="text-sm text-gray-500">Scholarship Type</p>
          <p class="font-bold text-gray-800">{{ scholarship.tags?.includes('Full Funded') || scholarship.tags?.includes('full-tuition') ? 'Fully Funded' : 'Partially Funded' }}</p>
        </div>
      </div>
      <div class="flex items-center space-x-2 col-span-1">
        <Icon name="material-symbols:timer-outline" class="w-6 h-6 text-gray-500" />
        <div>
          <p class="text-sm text-gray-500">Deadline</p>
          <p class="font-bold text-gray-800">{{ formatDate(scholarship.applicationWindow?.closesAt) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

interface Scholarship {
  _id?: string;
  scholarshipId?: string;
  title: string;
  providerName: string;
  benefits?: {
    amount: number;
    currency: string;
  };
  eligibleInstitutions?: string[];
  tags?: string[];
  applicationWindow: {
    opensAt: string;
    closesAt: string;
  };
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
</script>

<style scoped>
.lines-bg{
  background-image: url('/wavy.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>