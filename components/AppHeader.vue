<template>
  <div class="bg-white">
    <div class="nav-row flex items-center justify-between p-4 md:p-8">
      <div class="logo">
        <NuxtLink to="/">
          <img src="/logo-no-tagline.svg" alt="logo" class="h-8 md:h-auto lg:mr-8" />
        </NuxtLink>
      </div>
      <div class="flex items-center gap-4">
        <!-- Notification Bell -->
        <div class="relative">
          <div class="w-10 h-10 bg-[#FFF0EF] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#eaccca] transition-colors">
            <svg class="w-5 h-5 text-red-800" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
            </svg>
          </div>
          <!-- Notification Badge -->
          <div class="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
            <span class="text-white text-xs font-semibold">6</span>
          </div>
        </div>

        <!-- User Profile -->
        <div ref="profileDropdownRef" class="relative">
          <div 
            @click="toggleProfileDropdown" 
            class="flex items-center bg-[#FFF0EF] rounded-full px-3 py-2 cursor-pointer hover:bg-[#eaccca] transition-colors"
          >
            <div class="w-8 h-8 rounded-full overflow-hidden mr-3">
              <img 
                src="/prof-ph.svg" 
                alt="User profile" 
                class="w-full h-full object-cover"
              />
            </div>
            <svg class="w-4 h-4 text-red-800" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </div>
          
          <!-- Dropdown Menu -->
          <div 
            v-if="isProfileDropdownOpen" 
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
          >
            <NuxtLink 
              to="/profile/my-profile" 
              @click="toggleProfileDropdown"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              My Profile
            </NuxtLink>
            <button 
              @click="handleLogout"
              class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isMobileMenuOpen = ref(false)
const isAboutDropdownOpen = ref(false)
const isProfileDropdownOpen = ref(false)
const profileDropdownRef = ref<HTMLElement | null>(null)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleAboutDropdown = () => {
  isAboutDropdownOpen.value = !isAboutDropdownOpen.value
}

const toggleProfileDropdown = () => {
  isProfileDropdownOpen.value = !isProfileDropdownOpen.value
}

const handleLogout = () => {
  // Clear all localStorage
  localStorage.clear()
  
  // Close dropdown
  isProfileDropdownOpen.value = false
  
  // Redirect to sign-in page
  navigateTo('/auth/sign-in')
}

// Close dropdown when clicking outside
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (profileDropdownRef.value && !profileDropdownRef.value.contains(target)) {
      isProfileDropdownOpen.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
.router-link-active {
  color: #00BF63;
}
</style>

