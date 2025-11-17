<template>
  <!-- Header Banner -->
  <div class="lines-bg bg-[#F4F3FA] from-white to-blue-50 relative overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image: url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23e0f2fe%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
      <div class="relative px-8 py-12">
        <div class="flex items-start">
          <slot />
          <div class="hidden md:block">
            <div class=" h-full bg-blue-100 rounded-full flex items-center justify-center">
              <nuxt-img :src="imagesrc" alt="User profile" class="w-64 h-full object-cover absolute bottom-0 right-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  imagesrc: {
    type: String,
    required: true,
    default: '/prof-ill.svg'
  }
})
</script>

<style scoped>
.vignette {
  position: absolute;
  top: 0;
  right: 0;
  width: 600px;
  height: 500px;
  z-index: 2000000;
  box-shadow: 0 0 70px 90px rgba(17,35,59,1) inset;
}

.lines-bg{
  background-image: url('/wavy.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

@media (max-width: 768px) {
  .lines-bg {
    background-size: 200px;
    background-position: top left;
  }
}
</style>