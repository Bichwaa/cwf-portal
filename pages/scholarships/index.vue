<template>
  <div class="bg-gray-100 min-h-screen p-8">
    <h1 class="text-2xl text-left font-bold uppercase mb-8">SCHOLARSHIPS</h1>
    <div class="space-y-4">
      <ScholarshipCard
        v-for="scholarship in scholarships"
        :key="scholarship.id"
        :scholarship="scholarship"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ScholarshipCard from '~/components/scholarships/ScholarshipCard.vue'

interface Scholarship {
  id: number;
  title: string;
  type: string;
  tuition: string;
  deadline: string;
  status: 'Applied' | 'Active';
}

const scholarships = ref<Scholarship[]>([
  { id: 1, title: 'STEM for Girls 2025', type: 'Full Funded', tuition: '₦ 3,408,000', deadline: '45 Days Remains', status: 'Applied' },
  { id: 2, title: 'STEM for Girls 2025', type: 'Full Funded', tuition: '₦ 3,408,000', deadline: '45 Days Remains', status: 'Active' },
  { id: 3, title: 'STEM for Girls 2025', type: 'Full Funded', tuition: '₦ 3,408,000', deadline: '45 Days Remains', status: 'Active' },
  { id: 4, title: 'STEM for Girls 2025', type: 'Full Funded', tuition: '₦ 3,408,000', deadline: '45 Days Remains', status: 'Active' },
])
</script>

<style>
</style>