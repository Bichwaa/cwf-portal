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
  const token = localStorage.getItem('auth_token')
  if (!token) {
    navigateTo('/auth/sign-in');
  }
  try {
    const { get } = useApi()
    const me = await get<any>('/auth/profile/me', {
      headers: { authorization: `Bearer ${token}` }
    })
    if (me.data.role === 'mentor') {
      navigateTo('/profile/mentor-profile')
    } else {
      navigateTo('/profile/my-profile')
    }
  } catch (e) {
    navigateTo('/auth/sign-in')
  }
};

onMounted(() => {
  showLoadScreen();
});
</script>