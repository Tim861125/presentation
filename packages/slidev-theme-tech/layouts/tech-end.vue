<script setup lang="ts">
import EndSlide from '../components/EndSlide.vue'

defineProps<{
  title?: string
  subtitle?: string
  tag?: string
  dotColor?: string
  links?: string[] | string
  author?: string
  date?: string
}>()
</script>

<template>
  <EndSlide
    :title="title"
    :subtitle="subtitle"
    :tag="tag"
    :dot-color="dotColor"
    :links="links"
    :author="author"
    :date="date"
  >
    <slot />
  </EndSlide>
</template>
