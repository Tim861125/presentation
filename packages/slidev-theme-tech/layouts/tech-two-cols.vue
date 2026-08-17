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
    <div class="slidev-layout tech-two-cols grid grid-cols-2 gap-6 flex-1">
      <div class="col-left flex flex-col justify-start">
        <slot />
      </div>
      <div class="col-right flex flex-col justify-start">
        <slot name="right" />
      </div>
    </div>
  </SlideShell>
</template>
