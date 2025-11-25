<template>
  <div :class="['loading-wrapper', { fullscreen }]">
    <a-spin :size="size" :tip="tip" />
  </div>
</template>

<script setup>
defineProps({
  fullscreen: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'large'
  },
  tip: {
    type: String,
    default: 'Cargando...'
  }
})
</script>

<style scoped>
.loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.loading-wrapper.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: 9999;
  min-height: 100vh;
}
</style>

