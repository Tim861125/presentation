<script setup lang="ts">
/**
 * IssueCard - Issue & resolution card component
 */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    badge?: string
    title?: string
    description?: string
    solution?: string
    color?: 'red' | 'orange' | 'yellow' | 'blue' | 'emerald' | 'cyan'
  }>(),
  {
    badge: '',
    title: '',
    description: '',
    solution: '',
    color: 'red',
  }
)

const palette: Record<string, { border: string; bg: string; badge: string }> = {
  red:     { border: 'border-red-500/30',     bg: 'bg-red-500/5',     badge: 'text-red-400' },
  orange:  { border: 'border-orange-500/30',  bg: 'bg-orange-500/5',  badge: 'text-orange-400' },
  yellow:  { border: 'border-yellow-500/30',  bg: 'bg-yellow-500/5',  badge: 'text-yellow-400' },
  blue:    { border: 'border-blue-500/30',    bg: 'bg-blue-500/5',    badge: 'text-blue-400' },
  emerald: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/5', badge: 'text-emerald-400' },
  cyan:    { border: 'border-cyan-500/30',    bg: 'bg-cyan-500/5',    badge: 'text-cyan-400' },
}

const style = computed(() => palette[props.color] || palette.red)
</script>

<template>
  <div :class="`rounded-lg border p-3 flex gap-3 items-start ${style.border} ${style.bg}`">
    <span v-if="badge" :class="`text-xs font-mono shrink-0 mt-0.5 ${style.badge}`">{{ badge }}</span>
    <div class="flex-1">
      <div v-if="title" class="text-sm font-semibold text-white">{{ title }}</div>
      <div v-if="description" class="text-xs text-gray-400 mt-0.5">{{ description }}</div>
      <div v-if="solution" class="text-xs text-yellow-300 mt-1">{{ solution }}</div>
      <slot />
    </div>
  </div>
</template>
