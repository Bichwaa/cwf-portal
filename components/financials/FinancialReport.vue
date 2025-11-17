<template>
  <div class="bg-white rounded-2xl overflow-hidden">
    <!-- Header -->
    <div class="bg-[#004AAD] text-white px-4 sm:px-6 py-3 sm:py-4">
      <h3 class="text-lg sm:text-xl font-bold">{{ title }}</h3>
    </div>
    
    <!-- Content -->
    <div class="bg-[#F4F3FA] px-4 sm:px-6 py-3 sm:py-4 space-y-2 sm:space-y-3">
      <a href="#" class="block text-blue-600 underline hover:text-blue-800 transition-colors text-sm sm:text-base" v-for="file in files" :key="file">
        {{ file}}
        </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title?: string,
  files?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Financial Year',
  files: () => [
    'Annual_Budget_2025.xlsx',
    'Program_Budget_Breakdown_2025.pdf',
    'Annual_Financial_Report_2025.pdf',
    'Audit_Summary_2025.pdf'
  ]
})
</script>

<style>

</style>