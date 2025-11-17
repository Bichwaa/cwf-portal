<template>
  <div class="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <span class="text-gray-500">{{ scholarship.id }}.</span>
      <div>
        <h3 class="font-semibold text-gray-800">{{ scholarship.title }}</h3>
        <p class="text-sm text-gray-500">Type: {{ scholarship.type }}</p>
      </div>
    </div>
    <div class="flex items-center space-x-8">
      <div>
        <p class="font-semibold text-gray-800">{{ scholarship.tuition }}</p>
        <p class="text-sm text-gray-500 text-right">Tuition Fee</p>
      </div>
      <div>
        <p class="font-semibold text-gray-800">{{ scholarship.deadline }}</p>
        <p class="text-sm text-gray-500">Deadline</p>
      </div>
      <span
        :class="{
          'bg-green-100 text-green-700': scholarship.status === 'Applied',
          'bg-blue-100 text-blue-700': scholarship.status === 'Active',
        }"
        class="px-3 py-1 text-sm font-medium rounded-full flex items-center space-x-1"
      >
        <span class="w-2 h-2 rounded-full" :class="{
          'bg-green-500': scholarship.status === 'Applied',
          'bg-blue-500': scholarship.status === 'Active',
        }"></span>
        <span>{{ scholarship.status }}</span>
      </span>
      <button @click="navigateTo(`/scholarships/${scholarship.id}`)" class="flex items-center space-x-2 px-3 py-1 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
        <Icon name="mdi:eye-outline" class="w-5 h-5" />
        <span>View</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

interface Scholarship {
  id: number;
  title: string;
  type: string;
  tuition: string;
  deadline: string;
  status: 'Applied' | 'Active';
}

defineProps({
  scholarship: {
    type: Object as PropType<Scholarship>,
    required: true,
  },
})
</script>
