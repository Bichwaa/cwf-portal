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
          const user = JSON.parse(userCookie.value);
          if (user?.role === 'mentor') {
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

  // For all other pages, require authentication
  if (!authToken.value) {
    // No token, redirect to login
    return navigateTo('/auth/sign-in');
  }

  // Token exists - let the API layer handle token refresh automatically
  // The useApi composable will handle 401 errors and refresh tokens as needed
  // This keeps the middleware lightweight and avoids blocking navigation
});
