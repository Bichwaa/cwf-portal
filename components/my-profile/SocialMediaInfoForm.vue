<template>
  <div class="flex-1 p-8">
    <div class="max-w-2xl">
      <h2 class="text-2xl text-left font-semibold text-gray-800 mb-8">Social Media</h2>
      
      <!-- Social Media Form Fields -->
      <div class="space-y-6">
        <!-- LinkedIn -->
        <div>
          <label class="block text-sm text-left font-medium text-gray-700 mb-2">LinkedIn</label>
          <input 
            v-model="localUser.linkedIn" 
            type="url" 
            placeholder="Enter link" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Twitter (X) -->
        <div>
          <label class="block text-sm text-left font-medium text-gray-700 mb-2">Twitter (X)</label>
          <input 
            v-model="localUser.twitter" 
            type="url" 
            placeholder="Enter link" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Facebook -->
        <div>
          <label class="block text-sm text-left font-medium text-gray-700 mb-2">Facebook</label>
          <input 
            v-model="localUser.facebook" 
            type="url" 
            placeholder="Enter link" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Youtube -->
        <div>
          <label class="block text-sm text-left font-medium text-gray-700 mb-2">Youtube</label>
          <input 
            v-model="localUser.youtube" 
            type="url" 
            placeholder="Enter link" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Instagram -->
        <div>
          <label class="block text-sm text-left font-medium text-gray-700 mb-2">Instagram</label>
          <input 
            v-model="localUser.instagram" 
            type="url" 
            placeholder="Enter link" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { User } from '~/types';

const props = defineProps<{
  user: User;
}>();

const emit = defineEmits<{
  'update:user': [value: User];
}>();

const localUser = computed({
  get: () => props.user,
  set: (value) => emit('update:user', value)
});
</script>