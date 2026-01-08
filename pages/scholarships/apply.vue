<template>
  <div>
    <div v-if="scholarshipId">
      <Form :scholarshipId="scholarshipId"/>
    </div>
    <div v-else class="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div class="text-red-600 text-xl font-bold mb-4">Invalid Access</div>
      <p class="text-gray-600 mb-8">No scholarship selected for application.</p>
      <button @click="navigateTo('/scholarships')" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Browse Scholarships
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Form from '~/components/scholarships/application/Form.vue';

const route = useRoute();
const scholarshipId = computed(() => {
    const id = route.query.scholarshipId;
    return typeof id === 'string' ? id : '';
});
</script>

<style>

</style>