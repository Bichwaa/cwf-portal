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
// Helper function to check if user is a mentor
const isMentor = (user: any): boolean => {
  if (!user) return false
  // Check if user has a mentor property (most reliable indicator)
  if (user.mentor && typeof user.mentor === 'object') return true
  // Check if user has a role property (legacy)
  if (user.role === 'mentor') return true
  // Check roles array for MENTOR code (if roles are populated objects)
  if (Array.isArray(user.roles)) {
    // Check if roles are objects with code/name (populated)
    if (user.roles.some((role: any) => 
      typeof role === 'object' && (role?.code === 'MENTOR' || role?.name === 'Mentor')
    )) return true
    // If roles are just IDs (strings), we can't determine from them alone
    // So we rely on the mentor property check above
  }
  return false
}

const profileLink = computed(() => {
  const userCookie = useCookie<any>('user')
  
  if (userCookie.value) {
    try {
      // userCookie.value might already be an object (if useCookie auto-parsed it)
      // or it might be a string (if it was stored as a string)
      let user: any
      if (typeof userCookie.value === 'string') {
        user = JSON.parse(userCookie.value)
      } else {
        user = userCookie.value
      }
      
      if (isMentor(user)) {
        return '/profile/mentor-profile'
      }
    } catch (error) {
      console.error('Failed to parse user from cookie:', error)
    }
  }
  return '/profile/my-profile'
})
</script>