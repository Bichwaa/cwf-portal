<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl text-left font-bold mb-4">Reviews (3)</h2>
    <hr class="text-gray-200 my-4"/>
    <div class="border-b pb-4 mb-4">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-bold">Mentee Reviews</h3>
          <p class="text-sm text-gray-500">
            <span class="font-bold text-gray-800">4.90</span> 80 Reviews
          </p>
        </div>
        <div class="flex items-center">
          <Icon v-for="i in 4" :key="i" name="mdi:star" class="w-6 h-6 text-yellow-400" />
          <Icon name="mdi:star-outline" class="w-6 h-6 text-yellow-400" />
        </div>
      </div>
    </div>

    <div class="space-y-6">
      <div v-for="(review, index) in reviews" :key="index" class="border-b pb-4">
        <div class="flex items-start">
          <img :src="review.avatar|| '/prof-ill.svg'" :alt="review.name" class="w-12 h-12 rounded-full mr-4">
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-bold">{{ review.name }}</h4>
                <p class="text-sm text-gray-500">{{ review.date }}</p>
              </div>
              <div class="flex items-center">
                <Icon v-for="i in review.rating" :key="i" name="mdi:star" class="w-5 h-5 text-yellow-400" />
                <Icon v-if="review.rating < 5" name="mdi:star-outline" class="w-5 h-5 text-yellow-400" />
              </div>
            </div>
            <p class="mt-2 text-gray-600">
              {{ review.text }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 text-center">
      <button class="font-bold invisble text-blue-600 hover:underline">
        View more
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const reviews = ref([
  {
    name: 'Alex Johnson',
    date: '15 Jul, 2026',
    rating: 4,
    text: 'In a world where creativity thrives, the essence of life is found in the details. Every moment is a chance to embrace the beauty around us, from the gentle rustle of leaves to the vibrant colors of a sunset. Let your journey be filled with inspiration and joy.',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    name: 'Jordan Smith',
    date: '22 Aug, 2027',
    rating: 4,
    text: 'Life is a canvas, and every experience adds a stroke of color. Embrace the challenges and triumphs that shape your story, for they are the threads that weave the fabric of your existence. Celebrate each day as a new opportunity to create.',
    avatar: 'https://i.pravatar.cc/150?img=6'
  },
  {
    name: 'Taylor Brown',
    date: '30 Sep, 2028',
    rating: 4,
    text: 'Every day is a fresh start, a blank page waiting to be filled with adventures and memories. Take a moment to appreciate the little things that bring joy to your life, and let your heart guide you on this beautiful journey.',
    avatar: 'https://i.pravatar.cc/150?img=7'
  }
])
</script>

<style>

</style>