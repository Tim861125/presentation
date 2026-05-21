<template>
  <div
    class="rounded-lg border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20"
    :class="padding"
  >
    <div v-if="title || $slots.header" class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-1.5">
        <div v-if="dot" class="size-1.5 rounded-full" :class="dotColor" />
        <h3 v-if="title" class="text-xs font-semibold tracking-tight text-zinc-100">
          {{ title }}
        </h3>
      </div>
      <slot name="header" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title?: string
  dot?: boolean
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow' | 'cyan' | 'pink' | 'zinc'
  size?: 'sm' | 'md' | 'lg'
}>()

const palette: Record<string, string> = {
  blue: 'bg-blue-400',
  green: 'bg-emerald-400',
  purple: 'bg-purple-400',
  orange: 'bg-orange-400',
  red: 'bg-red-400',
  yellow: 'bg-yellow-400',
  cyan: 'bg-cyan-400',
  pink: 'bg-pink-400',
  zinc: 'bg-zinc-400',
}

const dotColor = computed(() => palette[props.color ?? 'blue'])
const padding = computed(() => {
  if (props.size === 'sm') return 'p-2'
  if (props.size === 'lg') return 'p-4'
  return 'p-3'
})
</script>
