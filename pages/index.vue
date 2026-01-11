<template>
  <NuxtLayout name="loading">
    <LoadingScreen />
  </NuxtLayout>
</template>

<script setup lang="ts">
import LoadingScreen from '~/components/LoadingScreen.vue';

definePageMeta({
  layout: 'loading',
})

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const showLoadScreen = async () => {
  await wait(3000);
  
  // Check for token in cookies
  const authToken = useCookie<string | null>('auth_token');
  const userCookie = useCookie<string | null>('user');
  
  if (!authToken.value) {
    navigateTo('/auth/sign-in');
    return;
  }
  
  // Try to get user profile to verify token and get latest user data
  try {
    const { get } = useApi()
    const me = await get<any>('/auth/users/profile/me')
    
    // Update user cookie with latest data
    if (me.data) {
      userCookie.value = JSON.stringify(me.data);
      
      // Check if user is a mentor
      const isMentor = 
        (me.data.mentor && typeof me.data.mentor === 'object') || // Most reliable: check mentor property
        (Array.isArray(me.data.roles) && me.data.roles.some((role: any) => 
          typeof role === 'object' && (role?.code === 'MENTOR' || role?.name === 'Mentor')
        )) || // Check populated roles array
        me.data.role === 'mentor'; // Legacy support
      
      if (isMentor) {
        navigateTo('/profile/mentor-profile')
      } else {
        navigateTo('/profile/my-profile')
      }
    } else {
      navigateTo('/profile/my-profile')
    }
  } catch (e) {
    // If profile fetch fails, try to use cached user data
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
          navigateTo('/profile/mentor-profile')
        } else {
          navigateTo('/profile/my-profile')
        }
      } catch {
        navigateTo('/auth/sign-in')
      }
    } else {
    navigateTo('/auth/sign-in')
    }
  }
};

onMounted(() => {
  showLoadScreen();
});
</script>