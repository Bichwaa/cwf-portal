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
      
      if (me.data.role === 'mentor') {
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
        const user = JSON.parse(userCookie.value);
        if (user?.role === 'mentor') {
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