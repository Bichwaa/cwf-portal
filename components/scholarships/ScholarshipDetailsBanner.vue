<template>
  <div class="bg-gray-100 rounded-2xl shadow-sm overflow-hidden lines-bg">
    <div class="p-8 flex flex-col gap-4">
      <h1 class="text-4xl text-left font-bold text-gray-800">STEM for Girls 2025</h1>
      <p class="text-gray-600 text-left mt-2 mb-6">Inspiring the Next Generation of Women in Science and Technology</p>
      <ButtonsGradientButton @click="navigateTo('/scholarships/apply')" text="Start Application" class="self-start" />
    </div>
    <hr/>
    <div class="bg-gray-100 p-4 grid grid-cols-4 gap-4">
      <div class="flex items-center space-x-2 col-span-1">
        <Icon name="healthicons:money-bag-outline" class="w-6 h-6 text-gray-500" />
        <div>
          <p class="text-sm text-gray-500">Grant</p>
          <p class="font-bold text-gray-800">3,408,000 NGN</p>
        </div>
      </div>
      <div class="flex items-center space-x-2 col-span-1">
        <Icon name="material-symbols:school-outline" class="w-6 h-6 text-gray-500" />
        <div>
          <p class="text-sm text-gray-500">Study Location</p>
          <p class="font-bold text-gray-800">Any University</p>
        </div>
      </div>
      <div class="flex items-center space-x-2 col-span-1">
        <Icon name="material-symbols:calendar-month-outline-rounded" class="w-6 h-6 text-gray-500" />
        <div>
          <p class="text-sm text-gray-500">Scholarship Type</p>
          <p class="font-bold text-gray-800">Fully Funded</p>
        </div>
      </div>
      <div class="flex items-center space-x-2 col-span-1">
        <Icon name="material-symbols:timer-outline" class="w-6 h-6 text-gray-500" />
        <div>
          <p class="text-sm text-gray-500">Deadline</p>
          <p class="font-bold text-gray-800">12 July, 2025</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.lines-bg{
  background-image: url('/wavy.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>