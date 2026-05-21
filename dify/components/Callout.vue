<template>
  <div :class="`rounded px-3 py-2 text-xs border ${style.border} ${style.bg} ${style.text}`">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type?: 'warning' | 'danger' | 'info' | 'tip' | 'caution'
}>()

const palette = {
  warning: { border: 'border-yellow-500/20', bg: 'bg-yellow-500/10', text: 'text-yellow-300' },
  danger:  { border: 'border-red-500/20',    bg: 'bg-red-500/10',    text: 'text-red-300'    },
  caution: { border: 'border-orange-500/20', bg: 'bg-orange-500/10', text: 'text-orange-300' },
  info:    { border: 'border-blue-500/20',   bg: 'bg-blue-500/10',   text: 'text-blue-300'   },
  tip:     { border: 'border-green-500/20',  bg: 'bg-green-500/10',  text: 'text-green-300'  },
}

const style = computed(() => palette[props.type ?? 'warning'])
</script>
