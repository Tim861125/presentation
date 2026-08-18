<script setup lang="ts">
import EndSlide from './EndSlide.vue'
</script>

<template>
  <EndSlide v-bind="$attrs">
    <slot />
  </EndSlide>
</template>
