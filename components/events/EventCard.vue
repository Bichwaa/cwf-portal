<template>
  <div class="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
    <div class="flex items-center justify-between w-full">
      <div class="flex items-center gap-2">
        <span class="text-gray-500 font-semibold">{{ event.id }}.</span>
      <img :src="event.image" :alt="event.title" class="w-28 h-20 rounded-lg object-cover">
      </div>
      <div class="flex flex-col items-start gap-1">
        <div class="flex items-center space-x-2 text-sm text-gray-500">
          <Icon name="mdi:location-outline" class="w-4 h-4" />
          <span>{{ event.location }}</span>
        </div>
        <h3 class="font-bold text-gray-800 mt-1">{{ event.title }}</h3>
        <p class="text-sm text-gray-500 text-wrap">{{ event.description.slice(0, 63) }}...</p>
      </div>
      <div class="">
        <div class="flex items-center text-sm text-gray-600">
          <Icon name="mdi:calendar-blank-outline" class="w-5 h-5 text-gray-400" />
          <span>{{ event.date }}</span>
        </div>
        <div class="flex items-center  text-sm text-gray-600 mt-2">
          <Icon name="mdi:clock-outline" class="w-5 h-5 text-gray-400" />
          <span>{{ event.time }}</span>
        </div>
      </div>
      <button @click="navigateTo(`/events/${event.id}`)" class="flex-shrink-0 ml-8 flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
        <Icon name="mdi:eye-outline" class="w-5 h-5" />
        <span>View</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

interface Event {
  id: number;
  image: string;
  location: string;
  title: string;
  description: string;
  date: string;
  time: string;
}

defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
})
</script>
