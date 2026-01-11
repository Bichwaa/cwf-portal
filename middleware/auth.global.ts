export default defineNuxtRouteMiddleware(async (to, from) => {
  // Check for authentication token
  const authToken = useCookie<string | null>('auth_token');
  
  // If accessing auth pages and already authenticated, redirect to appropriate page
  if (to.path.startsWith('/auth/')) {
    if (authToken.value) {
      // Already authenticated, check user role and redirect accordingly
      const userCookie = useCookie<string | null>('user');
      if (userCookie.value) {
        try {
          // userCookie.value might already be an object or a string
          let user: any
          if (typeof userCookie.value === 'string') {
            user = JSON.parse(userCookie.value)
          } else {
            user = userCookie.value
          }
          // Check if user is a mentor
          const isMentor = 
            (user?.mentor && typeof user.mentor === 'object') || // Most reliable: check mentor property
            (Array.isArray(user?.roles) && user.roles.some((role: any) => 
              typeof role === 'object' && (role?.code === 'MENTOR' || role?.name === 'Mentor')
            )) || // Check populated roles array
            user?.role === 'mentor'; // Legacy support
          if (isMentor) {
            return navigateTo('/profile/mentor-profile');
          } else {
            return navigateTo('/profile/my-profile');
          }
        } catch {
          // If user data is invalid, redirect to profile
          return navigateTo('/profile/my-profile');
        }
      }
      return navigateTo('/profile/my-profile');
    }
    // Not authenticated, allow access to auth pages
    return;
  }

  // Allow access to profile creation page without authentication
  if (to.path === '/profile/create') {
    return;
  }

  // For all other pages, require authentication
  if (!authToken.value) {
    // No token, redirect to login
    return navigateTo('/auth/sign-in');
  }

  // Token exists - let the API layer handle token refresh automatically
  // The useApi composable will handle 401 errors and refresh tokens as needed
  // This keeps the middleware lightweight and avoids blocking navigation
});
