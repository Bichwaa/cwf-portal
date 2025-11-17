<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- Page Header -->
    <div class="mb-8">
      <button @click="$router.back()" class="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
        <Icon name="mdi:arrow-left" class="w-6 h-6" />
        <span class="font-semibold">Community Health Outreach</span>
      </button>
    </div>

    <div class="space-y-8">
      <!-- Event Banner Card -->
      <div class="bg-white rounded-2xl shadow-sm p-6 flex gap-12 items-center">
        <img src="/event-1.png" alt="Community Health Outreach" class="lg:h-64 rounded-lg object-cover">
        <div class="flex flex-col items-start">
          <h1 class="text-3xl font-bold text-gray-800">Community Health Outreach</h1>
          <p class="text-gray-500 mt-1">Inspiring the Next Generation of Women in Science and Technology</p>
          <div class="flex flex-col gap-2 text-gray-600 mt-4">
            <div class="flex items-center space-x-2">
              <Icon name="mdi:location-outline" class="w-5 h-5 text-gray-400" />
              <span>Kumbotso LGA, Kano State</span>
            </div>
            <div class="flex items-center space-x-2">
              <Icon name="mdi:calendar-blank-outline" class="w-5 h-5 text-gray-400" />
              <span>5 Nov - 12 Nov, 2025</span>
            </div>
            <div class="flex items-center space-x-2">
              <Icon name="mdi:clock-outline" class="w-5 h-5 text-gray-400" />
              <span>9:00 AM - 3:00 PM</span>
            </div>
          </div>
          <div class="mt-6">
            <ButtonsGradientButton text="Volunteer" @click="showVolunteeringChoiceModal = true"/>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 text-left">
          <h2 class="text-xl text-left font-bold mb-4">About the Event</h2>
          <hr class="text-gray-100 my-4" />
          <div class="text-gray-600 space-y-4">
            <p>Access to quality healthcare is still out of reach for many families, especially in rural and low-income communities. At Care Wave Foundation, we believe that health is dignity—and no one should be left behind because they cannot afford basic medical care.</p>
            <p>Our Community Health Outreach event is designed to bridge this gap. Through the support of healthcare professionals, volunteers, and partners, we provide free consultations, medical screenings, health education, and essential supplies to hundreds of beneficiaries.</p>
            <p>This event is more than treatment—it is about prevention, awareness, and empowering individuals to take charge of their well-being.</p>
          </div>
          <h3 class="text-lg font-bold mt-6 mb-4">Event Goals</h3>
          <ul class="space-y-2 text-gray-600 list-disc list-inside">
            <li>Provide free medical consultations and check-ups for widows, elders, and vulnerable families.</li>
            <li>Conduct screenings for common health issues such as malaria, diabetes, hypertension, and maternal health.</li>
            <li>Distribute basic medication and health supplies at no cost.</li>
            <li>Offer health education sessions on nutrition, hygiene, and preventive care.</li>
            <li>Build trust between communities and healthcare providers.</li>
          </ul>
        </div>

        <!-- Right Column -->
        <div class="space-y-8">
          <div class="bg-white rounded-2xl shadow-sm p-6">
            <h2 class="text-xl text-left font-bold mb-4">Target Group(s)</h2>
            <hr class="text-gray-100 my-4" />
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">Widows</span>
              <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">Single Parents</span>
              <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">Elderly Individuals</span>
              <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">Vulnerable Families</span>
            </div>
          </div>
          <div class="bg-white rounded-2xl shadow-sm p-6">
            <h2 class="text-xl text-left font-bold mb-4">Planned Activities</h2>
            <hr class="text-gray-100 my-4" />
            <ul class="space-y-4">
              <li class="flex items-center space-x-3">
                <nuxt-img src="/arrow-vector.svg" alt="Impact 1" class="w-6 h-6" />
                <span class="text-gray-600 text-left">Medical check-ups (blood pressure, malaria, diabetes, maternal health).</span>
              </li>
              <li class="flex items-center space-x-3">
                <nuxt-img src="/arrow-vector.svg" alt="Impact 1" class="w-6 h-6" />
                <span class="text-gray-600 text-left">Community health education on hygiene, nutrition, and elderly care.</span>
              </li>
              <li class="flex items-center space-x-3">
                <nuxt-img src="/arrow-vector.svg" alt="Impact 1" class="w-6 h-6" />
                <span class="text-gray-600 text-left">Distribution of medicines, mosquito nets, and hygiene kits.</span>
              </li>
              <li class="flex items-center space-x-3">
                <nuxt-img src="/arrow-vector.svg" alt="Impact 1" class="w-6 h-6" />
                <span class="text-gray-600 text-left">Registration of beneficiaries for continued healthcare support.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <VolunteeringChoiceModal v-if="showVolunteeringChoiceModal" @close="showVolunteeringChoiceModal = false"/>
  </div>
</template>

<script lang="ts" setup>
import VolunteeringChoiceModal from '~/components/events/VolunteeringChoiceModal.vue'

const showVolunteeringChoiceModal = ref(false)
// This page can be enhanced to fetch event data based on the route ID.
</script>

<style scoped>
/* No specific styles needed if using Tailwind utility classes */
</style>