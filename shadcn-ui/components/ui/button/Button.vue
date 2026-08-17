<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null
    size?: 'default' | 'sm' | 'lg' | 'icon' | null
    class?: HTMLAttributes['class']
  }>(),
  {
    variant: 'default',
    size: 'default',
    class: '',
  }
)
</script>

<template>
  <button
    class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50 bg-emerald-500 text-black hover:bg-emerald-400 px-3 py-1.5"
    :class="props.class"
  >
    <slot />
  </button>
</template>
