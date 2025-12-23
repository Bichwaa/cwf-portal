<template>
  <div class="flex-1 p-8">
    <div class="max-w-2xl">
      <h2 class="text-2xl text-left font-semibold text-gray-800 mb-8">Skills & Interests</h2>
      
      <!-- Skills Input Section -->
      <div class="space-y-6 mb-8">
        <div>
          <label class="block text-sm text-left font-medium text-gray-700 mb-2">Skills & Interests</label>
          <!-- Input Field -->
          <div>
            <input 
              v-model="newSkill"
              @keydown.enter.prevent="addSkill"
              type="text" 
              placeholder="Enter skill or interest and press &quot;enter&quot;" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Skills Tags -->
          <div class="flex flex-wrap gap-2 mt-3">
            <div 
              v-for="(skill, index) in localUser.skillsAndInterests" 
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

        <!-- Goals Input Section (for mentees) -->
        <div v-if="showGoals">
          <label class="block text-sm text-left font-medium text-gray-700 mb-2">Goals</label>
          <!-- Input Field -->
          <div>
            <input 
              v-model="newGoal"
              @keydown.enter.prevent="addGoal"
              type="text" 
              placeholder="Enter a goal and press &quot;enter&quot;" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Goals Tags -->
          <div class="flex flex-wrap gap-2 mt-3">
            <div 
              v-for="(goal, index) in localGoals" 
              :key="index"
              class="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm"
            >
              <span>{{ goal }}</span>
              <button 
                @click="removeGoal(index)"
                class="ml-2 text-blue-500 hover:text-blue-700"
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
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { User } from '~/types';

const props = defineProps<{
  user: User;
  goals?: string[];
  showGoals?: boolean;
}>();

const emit = defineEmits<{
  'update:user': [value: User];
  'update:goals': [value: string[]];
}>();

const localUser = computed({
  get: () => props.user,
  set: (value) => emit('update:user', value)
});

const localGoals = computed({
  get: () => props.goals || [],
  set: (value) => emit('update:goals', value)
});

const newSkill = ref('');
const newGoal = ref('');

// Initialize skills array if it doesn't exist
if (!localUser.value.skillsAndInterests) {
  localUser.value.skillsAndInterests = [];
}

const addSkill = () => {
  if (newSkill.value.trim() && !localUser.value.skillsAndInterests?.includes(newSkill.value.trim())) {
    if (!localUser.value.skillsAndInterests) {
      localUser.value.skillsAndInterests = [];
    }
    localUser.value.skillsAndInterests.push(newSkill.value.trim());
    newSkill.value = '';
    // Trigger update
    emit('update:user', { ...localUser.value });
  }
};

const removeSkill = (index: number) => {
  if (localUser.value.skillsAndInterests) {
    localUser.value.skillsAndInterests.splice(index, 1);
    // Trigger update
    emit('update:user', { ...localUser.value });
  }
};

const addGoal = () => {
  if (newGoal.value.trim() && !localGoals.value.includes(newGoal.value.trim())) {
    const updatedGoals = [...localGoals.value, newGoal.value.trim()];
    emit('update:goals', updatedGoals);
    newGoal.value = '';
  }
};

const removeGoal = (index: number) => {
  const updatedGoals = [...localGoals.value];
  updatedGoals.splice(index, 1);
  emit('update:goals', updatedGoals);
};
</script>