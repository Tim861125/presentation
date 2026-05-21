<template>
  <div :class="`rounded-lg border p-3 flex gap-3 items-start ${style.border} ${style.bg}`">
    <span :class="`text-xs font-mono shrink-0 mt-0.5 ${style.badge}`">{{ badge }}</span>
    <div>
      <div class="text-sm font-semibold text-white">{{ title }}</div>
      <div class="text-xs text-gray-400 mt-0.5">{{ description }}</div>
      <div class="text-xs text-yellow-300 mt-1">{{ solution }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  badge: string
  title: string
  description: string
  solution: string
  color?: 'red' | 'orange' | 'yellow' | 'blue'
}>()

const palette = {
  red:    { border: 'border-red-500/30',    bg: 'bg-red-500/5',    badge: 'text-red-400'    },
  orange: { border: 'border-orange-500/30', bg: 'bg-orange-500/5', badge: 'text-orange-400' },
  yellow: { border: 'border-yellow-500/30', bg: 'bg-yellow-500/5', badge: 'text-yellow-400' },
  blue:   { border: 'border-blue-500/30',   bg: 'bg-blue-500/5',   badge: 'text-blue-400'   },
}

const style = computed(() => palette[props.color ?? 'red'])
</script>
