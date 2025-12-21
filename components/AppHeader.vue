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
        <div ref="notificationDropdownRef" class="relative">
          <div 
            @click="toggleNotificationDropdown"
            class="w-10 h-10 bg-[#FFF0EF] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#eaccca] transition-colors"
          >
            <svg class="w-5 h-5 text-red-800" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
            </svg>
          </div>
          <!-- Notification Badge -->
          <div 
            v-if="notificationCount > 0"
            class="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center"
          >
            <span class="text-white text-xs font-semibold">{{ notificationCount }}</span>
          </div>
          
          <!-- Notification Dropdown -->
          <div 
            v-if="isNotificationDropdownOpen" 
            class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto"
          >
            <div class="p-4 border-b border-gray-200">
              <h3 class="text-sm font-semibold text-gray-800">Notifications</h3>
            </div>
            <div v-if="notifications.length === 0" class="p-4 text-center text-sm text-gray-500">
              No notifications
            </div>
            <div v-else class="divide-y divide-gray-100">
              <div 
                v-for="notification in notifications" 
                :key="notification._id || notification.id"
                class="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div class="flex items-start space-x-3">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-800">
                      {{ notification.title || notification.message || 'Notification' }}
                    </p>
                    <p v-if="notification.message && notification.title" class="text-xs text-gray-500 mt-1">
                      {{ notification.message }}
                    </p>
                    <p v-if="notification.createdAt" class="text-xs text-gray-400 mt-1">
                      {{ formatNotificationDate(notification.createdAt) }}
                    </p>
                  </div>
                  <div v-if="!notification.read" class="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                </div>
              </div>
            </div>
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
import { onMounted, onUnmounted } from 'vue'

const isMobileMenuOpen = ref(false)
const isAboutDropdownOpen = ref(false)
const isProfileDropdownOpen = ref(false)
const isNotificationDropdownOpen = ref(false)
const profileDropdownRef = ref<HTMLElement | null>(null)
const notificationDropdownRef = ref<HTMLElement | null>(null)
const notificationCount = ref(0)
const notifications = ref<any[]>([])
let notificationPollInterval: ReturnType<typeof setInterval> | null = null

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleAboutDropdown = () => {
  isAboutDropdownOpen.value = !isAboutDropdownOpen.value
}

const toggleProfileDropdown = () => {
  isProfileDropdownOpen.value = !isProfileDropdownOpen.value
}

const toggleNotificationDropdown = () => {
  isNotificationDropdownOpen.value = !isNotificationDropdownOpen.value
  // Close profile dropdown if open
  if (isNotificationDropdownOpen.value) {
    isProfileDropdownOpen.value = false
  }
}

const handleLogout = () => {
  // Clear all localStorage
  localStorage.clear()
  
  // Clear notification polling
  if (notificationPollInterval) {
    clearInterval(notificationPollInterval)
    notificationPollInterval = null
  }
  
  // Close dropdown
  isProfileDropdownOpen.value = false
  
  // Redirect to sign-in page
  navigateTo('/auth/sign-in')
}

const fetchNotifications = async () => {
  const token = localStorage.getItem('auth_token')
  if (!token) {
    notificationCount.value = 0
    notifications.value = []
    return
  }

  try {
    const { get } = useApi()
    // const response = await get<any>('/notifications', {
    //   headers: { authorization: `Bearer ${token}` }
    // })
    const response = { data: {data:[], notifications:[]} }
    
    let notificationArray: any[] = []
    
    // Handle different response structures
    if (response.data) {
      // If response.data is an array
      if (Array.isArray(response.data)) {
        notificationArray = response.data
      } 
      // If response.data has a data array
      else if (response.data.data && Array.isArray(response.data.data)) {
        notificationArray = response.data.data
      }
      // If response.data has a notifications array
      else if (response.data.notifications && Array.isArray(response.data.notifications)) {
        notificationArray = response.data.notifications
      }
    }
    
    notifications.value = notificationArray
    notificationCount.value = notificationArray.length
  } catch (e) {
    // Silently fail - don't show errors for notification fetching
    console.error('Failed to fetch notifications:', e)
    notificationCount.value = 0
    notifications.value = []
  }
}

const formatNotificationDate = (dateString: string) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) {
      return 'Just now'
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days} day${days > 1 ? 's' : ''} ago`
    } else {
      return date.toLocaleDateString()
    }
  } catch (e) {
    return dateString
  }
}

// Close dropdown when clicking outside
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (profileDropdownRef.value && !profileDropdownRef.value.contains(target)) {
      isProfileDropdownOpen.value = false
    }
    if (notificationDropdownRef.value && !notificationDropdownRef.value.contains(target)) {
      isNotificationDropdownOpen.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  
  // Fetch notifications immediately
  fetchNotifications()
  
  // Set up polling every 30 seconds
  notificationPollInterval = setInterval(() => {
    fetchNotifications()
  }, 30000)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    
    // Clear notification polling interval
    if (notificationPollInterval) {
      clearInterval(notificationPollInterval)
      notificationPollInterval = null
    }
  })
})
</script>

<style scoped>
.router-link-active {
  color: #00BF63;
}
</style>

