<template>
  <nav class="absolute left-0 top-0 h-full w-64 bg-[#11233B] border-r border-gray-300/10 z-40">
    <div class="flex flex-col py-8 px-6 space-y-6">
      <!-- MY PROFILE -->
      <NuxtLink :to="profileLink" class="flex items-center space-x-4 cursor-pointer hover:bg-blue-800/30 rounded-lg p-3 transition-colors">
        <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <Icon name="ic:outline-account-box" class="w-6 h-6 text-white" />
        </div>
        <span class="text-white font-medium text-sm">MY PROFILE</span>
      </NuxtLink>

      <!-- SCHOLARSHIPS -->
      <NuxtLink to="/scholarships" class="flex items-center space-x-4 cursor-pointer hover:bg-blue-800/30 rounded-lg p-3 transition-colors">
        <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <Icon name="hugeicons:graduation-scroll" class="w-6 h-6 text-white" />
        </div>
        <span class="text-white font-medium text-sm">SCHOLARSHIPS</span>
      </NuxtLink>

      <!-- MENTORS -->
      <NuxtLink to="/mentors" class="flex items-center space-x-4 cursor-pointer hover:bg-blue-800/30 rounded-lg p-3 transition-colors">
        <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <Icon name="mdi:lightbulb-on-20" class="w-6 h-6 text-white" />
        </div>
        <span class="text-white font-medium text-sm">MENTORS</span>
      </NuxtLink>

      <!-- EVENTS -->
      <NuxtLink to="/events" class="flex items-center space-x-4 cursor-pointer hover:bg-blue-800/30 rounded-lg p-3 transition-colors">
        <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <Icon name="material-symbols:calendar-month-outline" class="w-6 h-6 text-white" />
        </div>
        <span class="text-white font-medium text-sm">EVENTS</span>
      </NuxtLink>

      <!-- OUR FINANCIALS -->
      <NuxtLink to="/our-financials" class="flex items-center space-x-4 cursor-pointer hover:bg-blue-800/30 rounded-lg p-3 transition-colors">
        <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <Icon name="streamline:money-cash-bag-dollar-bag-payment-cash-money-finance" class="w-6 h-6 text-white" />
        </div>
        <span class="text-white font-medium text-sm">OUR FINANCIALS</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const currentUser = ref<string | null>(null)

const profileLink = computed(() => {
  if (currentUser.value) {
    try {
      const user = JSON.parse(currentUser.value)
      if (user.role === 'mentor') {
        return '/profile/mentor-profile'
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error)
    }
  }
  return '/profile/my-profile'
})

onMounted(async () => {
  try {
    currentUser.value = localStorage.getItem('user')
    const token = localStorage.getItem('auth_token')
    if (!token) return
  } catch (error) {
    console.error('Failed to fetch user role:', error)
  }
})
</script>