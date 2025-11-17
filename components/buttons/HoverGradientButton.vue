<template>
    <button class="donate-btn border hover:border-none border-[#004AAD] text-[#004AAD] px-6 py-3 rounded-lg font-semibold hover:text-white hover:border-transparent transition-all duration-300"><span>{{ props.text }}</span></button>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: 'Donate Now'
  }
})
</script>

<style scoped>
.donate-btn {
  position: relative;
  overflow: hidden;
  background: transparent;
}

.donate-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #00BF63, #004AAD);
  transition: left 300ms ease-in-out;
  z-index: 1;
  border-radius: 0.5rem;
}

.donate-btn:hover::before {
  left: 0;
}

.donate-btn span {
  position: relative;
  z-index: 2;
}
</style>