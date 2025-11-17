<script setup lang="ts">
const props = withDefaults(defineProps<{
  backgroundColor?: string;
  text?: string;
}>(), {
  backgroundColor: '#11233B',
  text: 'Getting Ready'
});
</script>

<template>
  <div 
    class="min-h-screen flex flex-col items-center justify-center"
    :style="{ backgroundColor: props.backgroundColor }">
    <!-- Spinning Loading Icon -->
    <div class="mb-6 relative">
      <div class="w-12 h-12 border-4 border-[#11233B] border-t-[#004AAD] rounded-full animate-spin"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-8 h-8 border-4 border-[#11233B] border-t-[#B9DEFE] rounded-full animate-reverse-spin"></div>
      </div>
    </div>
    
    <!-- Getting Ready Text -->
    <div 
      class="text-xl font-sans"
      :class="backgroundColor=='#11233B'? 'text-white': 'text-black'">
      {{ text }}
    </div>
  </div>
</template>
