<template>
  <div class="bg-gray-100 min-h-screen p-8">
    <h1 class="text-2xl text-left font-bold uppercase mb-8">SCHOLARSHIPS</h1>
    <div class="space-y-4">
      <div v-if="pending" class="text-center py-8">Loading...</div>
      <div v-else-if="error" class="text-center py-8 text-red-600">Failed to load scholarships</div>
      <ScholarshipCard
        v-else
        v-for="scholarship in scholarships"
        :key="scholarship.id"
        :scholarship="scholarship"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import ScholarshipCard from '~/components/scholarships/ScholarshipCard.vue'

const config = useRuntimeConfig()

interface ApiScholarship {
  _id: string;
  scholarshipId: string;
  title: string;
  providerName: string;
  applicationWindow: {
    opensAt: string;
    closesAt: string;
  };
  benefits?: {
    amount: number;
    currency: string;
  };
  isActive: boolean;
  applicationCount: number;
  tags?: string[];
}

interface ApiResponse {
  data: ApiScholarship[];
}

const { data: scholarshipData, pending, error } = await useFetch<ApiResponse>(`${config.public.backendRootUrl}/scholarship-management/scholarships`)

const getDeadlineText = (closesAt: string) => {
  const deadline = new Date(closesAt);
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'Closed';
  return `${diffDays} Days Remain`;
}

const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: currency }).format(amount);
}

const scholarships = computed(() => {
  if (!scholarshipData.value?.data) return [];

  return scholarshipData.value.data.map((s) => ({
    id: s._id,
    scholarshipId: s.scholarshipId, // Keep both for safety
    title: s.title,
    type: (s.tags?.includes('Full Funded') || s.tags?.includes('full-tuition')) ? 'Full Funded' : 'Partially Funded',
    tuition: s.benefits ? formatCurrency(s.benefits.amount, s.benefits.currency) : 'N/A',
    deadline: getDeadlineText(s.applicationWindow.closesAt),
    status: (s.isActive ? 'Active' : 'Inactive') as 'Active' | 'Inactive' | 'Applied'
  }))
})
</script>

<style>
</style>
