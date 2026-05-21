<template>
  <div class="rounded-lg border border-white/10 bg-white/5 p-3">
    <div v-if="title" :class="`text-xs font-mono mb-2 ${titleColor}`">{{ title }}</div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title?: string
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow' | 'cyan' | 'pink'
}>()

const palette: Record<string, string> = {
  blue:   'text-blue-400',
  green:  'text-green-400',
  purple: 'text-purple-400',
  orange: 'text-orange-400',
  red:    'text-red-400',
  yellow: 'text-yellow-400',
  cyan:   'text-cyan-400',
  pink:   'text-pink-400',
}

const titleColor = computed(() => palette[props.color ?? 'blue'])
</script>
