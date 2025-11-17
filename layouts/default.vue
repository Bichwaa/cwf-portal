<template>
  <div class="flex flex-col">
    <AppHeader/>
    <div class="flex relative">
    <!-- Side Navigation -->
    <SideNav />
    
    <!-- Main Content Area -->
    <main class="flex-1 ml-64 text-center">
      <slot />
    </main>
  </div>
  </div>
</template>
