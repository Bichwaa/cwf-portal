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
            <div class="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 class="text-sm font-semibold text-gray-800">Notifications</h3>
              <div v-if="notifications.length > 0" class="flex items-center gap-2">
                <button
                  v-if="unreadCount > 0"
                  @click.stop="markAllAsRead"
                  class="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Mark all as read
                </button>
                <button
                  @click.stop="clearAllNotifications"
                  class="text-xs text-gray-500 hover:text-gray-700 font-medium"
                >
                  Clear all
                </button>
              </div>
            </div>
            <div v-if="notifications.length === 0" class="p-4 text-center text-sm text-gray-500">
              No notifications
            </div>
            <div v-else class="divide-y divide-gray-100">
              <div 
                v-for="notification in notifications" 
                :key="notification._id || notification.id || notification.notificationId"
                class="p-4 hover:bg-gray-50 transition-colors group"
                :class="{ 'bg-gray-50/50': isNotificationRead(notification) }"
              >
                <div class="flex items-start space-x-3">
                  <div 
                    class="flex-1 min-w-0 cursor-pointer"
                    @click="markAsRead(notification)"
                  >
                    <p 
                      class="text-sm font-medium"
                      :class="isNotificationRead(notification) ? 'text-gray-600' : 'text-gray-800'"
                    >
                      {{ notification.title || notification.message || 'Notification' }}
                    </p>
                    <p v-if="notification.message && notification.title" class="text-xs text-gray-500 mt-1">
                      {{ notification.message }}
                    </p>
                    <p v-if="notification.createdAt" class="text-xs text-gray-400 mt-1">
                      {{ formatNotificationDate(notification.createdAt) }}
                    </p>
                  </div>
                  <div class="flex items-center gap-2">
                    <div v-if="!isNotificationRead(notification)" class="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                    <button
                      @click.stop="deleteNotification(notification)"
                      class="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                      title="Delete notification"
                    >
                      <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
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
              :to="profileLink" 
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

// Computed property for profile link
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
  // Clear all cookies (auth tokens and user data)
  const authTokenCookie = useCookie<string | null>('auth_token')
  const refreshTokenCookie = useCookie<string | null>('refresh_token')
  const userCookie = useCookie<string | null>('user')
  
  authTokenCookie.value = null
  refreshTokenCookie.value = null
  userCookie.value = null
  
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
  // Check for token in cookies
  const authToken = useCookie<string | null>('auth_token')
  if (!authToken.value) {
    notificationCount.value = 0
    notifications.value = []
    return
  }

  try {
    const { get } = useApi()
    // useApi automatically includes the authorization header from cookies and handles token refresh
    // The endpoint is /api/v1/notifications/user (useApi adds the baseURL)
    const response = await get<any>('/notifications/user')
    
    let notificationArray: any[] = []
    
    // Handle different response structures
    if (response.data) {
      // If response.data is an array (direct array response)
      if (Array.isArray(response.data)) {
        notificationArray = response.data
      } 
      // If response.data has a data array (from repository findAll - standard structure)
      else if (response.data.data && Array.isArray(response.data.data)) {
        notificationArray = response.data.data
      }
      // If response.data has a notifications array (alternative structure)
      else if ((response.data as any).notifications && Array.isArray((response.data as any).notifications)) {
        notificationArray = (response.data as any).notifications
      }
    }
    
    notifications.value = notificationArray
    // Update notification count using computed property
    notificationCount.value = unreadCount.value
  } catch (e: any) {
    // If it's a 401, useApi should have already tried to refresh the token
    // If refresh failed, it redirects to sign-in
    // For 401 errors, just clear notifications silently (user will be redirected)
    if (e.status === 401 || e.statusCode === 401) {
      notificationCount.value = 0
      notifications.value = []
      // Don't log 401 errors - they're handled by useApi (token refresh or redirect)
      return
    }
    // For other errors, silently fail - don't show errors for notification fetching
    console.error('Failed to fetch notifications:', e)
    notificationCount.value = 0
    notifications.value = []
  }
}

// Get current user ID for checking read status
const getCurrentUserId = (): string | null => {
  const userCookie = useCookie<any>('user')
  if (!userCookie.value) return null
  
  try {
    const user = typeof userCookie.value === 'string' 
      ? JSON.parse(userCookie.value) 
      : userCookie.value
    return user.userId || user._id || user.id || null
  } catch {
    return null
  }
}

// Check if a notification is read by the current user
const isNotificationRead = (notification: any): boolean => {
  const currentUserId = getCurrentUserId()
  if (!currentUserId) return false
  
  // Check if status is 'read'
  if (notification.status === 'read') return true
  
  // Check if read property exists
  if (notification.read === true) return true
  
  // Check metadata.readBy array
  const readBy = notification.metadata?.readBy || []
  const userIdString = String(currentUserId)
  return readBy.some((id: any) => String(id) === userIdString)
}

// Computed property for unread count
const unreadCount = computed(() => {
  return notifications.value.filter((n: any) => !isNotificationRead(n)).length
})

// Mark a notification as read
const markAsRead = async (notification: any) => {
  if (isNotificationRead(notification)) return // Already read
  
  const notificationId = notification.notificationId || notification._id || notification.id
  if (!notificationId) return
  
  try {
    const { post } = useApi()
    await post(`/notifications/${notificationId}/read`)
    
    // Update local state optimistically
    const index = notifications.value.findIndex((n: any) => 
      (n.notificationId || n._id || n.id) === notificationId
    )
    if (index !== -1) {
      const updated = { ...notifications.value[index] }
      const currentUserId = getCurrentUserId()
      if (currentUserId) {
        const readBy = updated.metadata?.readBy || []
        if (!readBy.some((id: any) => String(id) === String(currentUserId))) {
          updated.metadata = {
            ...(updated.metadata || {}),
            readBy: [...readBy, currentUserId]
          }
        }
        updated.status = 'read'
        updated.read = true
      }
      notifications.value[index] = updated
      notificationCount.value = unreadCount.value
    }
  } catch (e) {
    console.error('Failed to mark notification as read:', e)
    await fetchNotifications()
  }
}

// Mark all notifications as read
const markAllAsRead = async () => {
  if (unreadCount.value === 0) return
  
  try {
    const { post } = useApi()
    await post('/notifications/read-all')
    
    // Update local state optimistically
    const currentUserId = getCurrentUserId()
    notifications.value = notifications.value.map((n: any) => {
      if (isNotificationRead(n)) return n
      const updated = { ...n }
      const readBy = updated.metadata?.readBy || []
      if (currentUserId && !readBy.some((id: any) => String(id) === String(currentUserId))) {
        updated.metadata = {
          ...(updated.metadata || {}),
          readBy: [...readBy, currentUserId]
        }
      }
      updated.status = 'read'
      updated.read = true
      return updated
    })
    notificationCount.value = 0
  } catch (e) {
    console.error('Failed to mark all notifications as read:', e)
    await fetchNotifications()
  }
}

// Delete a single notification
const deleteNotification = async (notification: any) => {
  const notificationId = notification.notificationId || notification._id || notification.id
  if (!notificationId) return
  
  try {
    const { del } = useApi()
    await del(`/notifications/${notificationId}/delete`)
    
    // Remove from local state
    notifications.value = notifications.value.filter((n: any) => 
      (n.notificationId || n._id || n.id) !== notificationId
    )
    notificationCount.value = unreadCount.value
  } catch (e) {
    console.error('Failed to delete notification:', e)
    await fetchNotifications()
  }
}

// Clear all notifications
const clearAllNotifications = async () => {
  if (notifications.value.length === 0) return
  
  try {
    const { del } = useApi()
    const deletePromises = notifications.value.map((n: any) => {
      const notificationId = n.notificationId || n._id || n.id
      if (!notificationId) return Promise.resolve()
      return del(`/notifications/${notificationId}/delete`).catch(() => {})
    })
    
    await Promise.all(deletePromises)
    
    notifications.value = []
    notificationCount.value = 0
  } catch (e) {
    console.error('Failed to clear notifications:', e)
    await fetchNotifications()
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

