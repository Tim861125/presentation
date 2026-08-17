<script setup lang="ts">
import SlideShell from '../components/SlideShell.vue'
import SlideHeader from '../components/SlideHeader.vue'

defineProps<{
  eyebrow?: string
  title?: string
  subtitle?: string
  dotColor?: string
}>()
</script>

<template>
  <SlideShell>
    <SlideHeader
      v-if="title || eyebrow"
      :eyebrow="eyebrow"
      :title="title || ''"
      :subtitle="subtitle"
      :dot-color="dotColor"
    />
    <div class="slidev-layout tech-content flex-1 flex flex-col justify-start">
      <slot />
    </div>
  </SlideShell>
</template>
