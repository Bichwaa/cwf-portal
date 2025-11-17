<template>
  <div>
    <div class="px-4 sm:px-6 md:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-24">
      <h3 class="text-xl sm:text-2xl text-start font-bold text-gray-800 leading-tight py-6">OUR FINANCIALS</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <financials-financial-report 
          title="2025 - Financial Year" 
          :files="['Annual_Budget_2025.xlsx', 'Program_Budget_Breakdown_2025.pdf', 'Annual_Financial_Report_2025.pdf', 'Audit_Summary_2025.pdf']" />
        <financials-financial-report 
          title="2024 - Financial Year" 
          :files="['Annual_Budget_2024.xlsx', 'Program_Budget_Breakdown_2024.pdf', 'Annual_Financial_Report_2024.pdf', 'Audit_Summary_2024.pdf']" />
        <financials-financial-report 
          title="2023 - Financial Year" 
          :files="['Annual_Budget_2023.xlsx', 'Program_Budget_Breakdown_2023.pdf', 'Annual_Financial_Report_2023.pdf', 'Audit_Summary_2023.pdf']" />
      </div>
    </div>
    <div class="px-4 sm:px-6 md:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-24">
      <home-banner-card />
    </div>
    <app-footer />
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>