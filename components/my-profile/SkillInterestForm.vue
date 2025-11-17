<template>
  <div class="flex-1 p-8">
    <div class="max-w-2xl">
      <h2 class="text-2xl text-left font-semibold text-gray-800 mb-8">Skills & Interests</h2>
      
      <!-- Skills Input Section -->
      <div class="space-y-4">
        <!-- Input Field -->
        <div>
          <input 
            v-model="newSkill"
            @keydown.enter="addSkill"
            type="text" 
            placeholder="Enter skill or interest and press &quot;enter&quot;" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Skills Tags -->
        <div class="flex flex-wrap gap-2">
          <div 
            v-for="(skill, index) in skills" 
            :key="index"
            class="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm"
          >
            <span>{{ skill }}</span>
            <button 
              @click="removeSkill(index)"
              class="ml-2 text-gray-500 hover:text-gray-700"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const newSkill = ref('');
const skills = ref(['Teaching', 'Event planning']);

const addSkill = () => {
  if (newSkill.value.trim() && !skills.value.includes(newSkill.value.trim())) {
    skills.value.push(newSkill.value.trim());
    newSkill.value = '';
  }
};

const removeSkill = (index: number) => {
  skills.value.splice(index, 1);
};
</script>