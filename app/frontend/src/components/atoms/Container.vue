<template>
  <div :class="['container', containerClass]">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  containerClass: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>

