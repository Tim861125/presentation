<script setup lang="ts">
/**
 * Callout - Alert / notice box with tech aesthetic styling
 */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: 'warning' | 'danger' | 'info' | 'tip' | 'caution' | 'success'
    title?: string
  }>(),
  {
    type: 'info',
  }
)

const palette: Record<string, { border: string; bg: string; text: string; dot: string; title: string }> = {
  warning: { border: 'border-amber-500/30', bg: 'bg-amber-500/10', text: 'text-amber-200', dot: 'bg-amber-400', title: 'text-amber-300' },
  danger:  { border: 'border-rose-500/30',  bg: 'bg-rose-500/10',  text: 'text-rose-200',  dot: 'bg-rose-400',  title: 'text-rose-300'  },
  caution: { border: 'border-orange-500/30', bg: 'bg-orange-500/10', text: 'text-orange-200', dot: 'bg-orange-400', title: 'text-orange-300' },
  info:    { border: 'border-sky-500/30',    bg: 'bg-sky-500/10',    text: 'text-sky-200',    dot: 'bg-sky-400',    title: 'text-sky-300'    },
  tip:     { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-200', dot: 'bg-emerald-400', title: 'text-emerald-300' },
  success: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-200', dot: 'bg-emerald-400', title: 'text-emerald-300' },
}

const style = computed(() => palette[props.type] || palette.info)
</script>

<template>
  <div class="rounded-xl border px-4 py-3 text-xs leading-relaxed" :class="[style.border, style.bg, style.text]">
    <div v-if="title" class="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-[11px] mb-1" :class="style.title">
      <span class="size-1.5 rounded-full" :class="style.dot" />
      <span>{{ title }}</span>
    </div>
    <slot />
  </div>
</template>
