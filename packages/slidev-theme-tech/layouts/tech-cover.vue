<script setup lang="ts">
import CoverSlide from '../components/CoverSlide.vue'

const props = defineProps<{
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
  frontmatter?: Record<string, any>
}>()

// `title` is a reserved frontmatter field and stripped from layout props
const resolvedTitle = () => props.title || props.frontmatter?.title || ''
</script>

<template>
  <CoverSlide
    :title="resolvedTitle()"
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

