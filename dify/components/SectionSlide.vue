<template>
  <div :class="`h-full flex flex-col items-center justify-center bg-gradient-to-br ${colorConfig.gradient}`">
    <div :class="`text-xs tracking-widest ${colorConfig.label} uppercase font-mono mb-3`">
      Section {{ number }}
    </div>
    <div class="text-5xl font-bold text-white">{{ title }}</div>
    <div :class="`text-xl ${colorConfig.subtitle} mt-3`">{{ subtitle }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  number: string
  title: string
  subtitle: string
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'cyan'
}>()

const palette = {
  blue:   { gradient: 'from-blue-900/40 to-gray-900',   label: 'text-blue-400',   subtitle: 'text-blue-300'   },
  green:  { gradient: 'from-green-900/40 to-gray-900',  label: 'text-green-400',  subtitle: 'text-green-300'  },
  purple: { gradient: 'from-purple-900/40 to-gray-900', label: 'text-purple-400', subtitle: 'text-purple-300' },
  orange: { gradient: 'from-orange-900/40 to-gray-900', label: 'text-orange-400', subtitle: 'text-orange-300' },
  red:    { gradient: 'from-red-900/40 to-gray-900',    label: 'text-red-400',    subtitle: 'text-red-300'    },
  cyan:   { gradient: 'from-cyan-900/40 to-gray-900',   label: 'text-cyan-400',   subtitle: 'text-cyan-300'   },
}

const colorConfig = computed(() => palette[props.color ?? 'blue'])
</script>
