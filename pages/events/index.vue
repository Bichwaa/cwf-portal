<template>
  <div class="bg-gray-100 min-h-screen p-8">
    <h1 class="text-2xl text-left font-bold uppercase mb-8">EVENTS</h1>
    <div class="space-y-4">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import EventCard from '~/components/events/EventCard.vue';

interface Event {
  id: number;
  image: string;
  location: string;
  title: string;
  description: string;
  date: string;
  time: string;
}

const events = ref<Event[]>([
  { id: 1, image: '/event-1.png', location: 'Kumbotso LGA, Kano State', title: 'Community Health Outreach', description: 'Inspiring the Next Generation of Women in Science and Technology', date: '5 Nov - 12 Nov, 2025', time: '9:00 AM - 3:00 PM' },
  { id: 2, image: '/event-1.png', location: 'Kumbotso LGA, Kano State', title: 'Community Health Outreach', description: 'Inspiring the Next Generation of Women in Science and Technology', date: '5 Nov - 12 Nov, 2025', time: '9:00 AM - 3:00 PM' },
  { id: 3, image: '/event-1.png', location: 'Kumbotso LGA, Kano State', title: 'Community Health Outreach', description: 'Inspiring the Next Generation of Women in Science and Technology', date: '5 Nov - 12 Nov, 2025', time: '9:00 AM - 3:00 PM' },
  { id: 4, image: '/event-1.png', location: 'Kumbotso LGA, Kano State', title: 'Community Health Outreach', description: 'Inspiring the Next Generation of Women in Science and Technology', date: '5 Nov - 12 Nov, 2025', time: '9:00 AM - 3:00 PM' },
])
</script>

<style>
</style>