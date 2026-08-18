<script setup lang="ts">
import CoverSlide from '../components/CoverSlide.vue'

defineProps<{
  title?: string
  highlight?: string
  subtitle?: string
  tag?: string
  version?: string
  tags?: string[] | string
  author?: string
  date?: string
  footer?: string
  dotColor?: string
}>()
</script>

<template>
  <CoverSlide
    :title="title"
    :highlight="highlight"
    :subtitle="subtitle"
    :tag="tag"
    :version="version"
    :tags="tags"
    :author="author"
    :date="date"
    :footer="footer"
    :dot-color="dotColor"
  >
    <slot />
  </CoverSlide>
</template>

