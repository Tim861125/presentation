<script setup lang="ts">
import SlideShell from '../components/SlideShell.vue'
import SlideHeader from '../components/SlideHeader.vue'

const props = defineProps<{
  eyebrow?: string
  title?: string
  subtitle?: string
  dotColor?: string
  frontmatter?: Record<string, any>
}>()

// `title` is a reserved frontmatter field and stripped from layout props;
// fall back to the raw frontmatter object that slidev still passes down.
const resolvedTitle = () => props.title || props.frontmatter?.title || ''
</script>

<template>
  <SlideShell>
    <SlideHeader
      v-if="resolvedTitle() || eyebrow"
      :eyebrow="eyebrow"
      :title="resolvedTitle()"
      :subtitle="subtitle"
      :dot-color="dotColor"
    />
    <div class="slidev-layout tech-content flex-1 flex flex-col justify-start">
      <slot />
    </div>
  </SlideShell>
</template>
