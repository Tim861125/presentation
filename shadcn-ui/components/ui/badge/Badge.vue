<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'secondary' | 'destructive' | 'outline' | null
    class?: HTMLAttributes['class']
  }>(),
  {
    variant: 'default',
    class: '',
  }
)
</script>

<template>
  <span
    class="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-mono font-semibold transition-colors text-zinc-300"
    :class="props.class"
  >
    <slot />
  </span>
</template>
