<script setup lang="ts">
import CoverSlide from './CoverSlide.vue'
</script>

<template>
  <CoverSlide v-bind="$attrs">
    <slot />
  </CoverSlide>
</template>
