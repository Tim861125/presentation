<script setup lang="ts">
/**
 * InfoCard - Glassmorphic info card with title and custom accent
 */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    title?: string
    tag?: string
    color?: 'blue' | 'emerald' | 'green' | 'purple' | 'orange' | 'red' | 'yellow' | 'cyan' | 'zinc'
  }>(),
  {
    color: 'blue',
  }
)

const palette: Record<string, { text: string; dot: string }> = {
  blue:    { text: 'text-blue-400',    dot: 'bg-blue-400' },
  emerald: { text: 'text-emerald-400', dot: 'bg-emerald-400' },
  green:   { text: 'text-emerald-400', dot: 'bg-emerald-400' },
  purple:  { text: 'text-purple-400',  dot: 'bg-purple-400' },
  orange:  { text: 'text-orange-400',  dot: 'bg-orange-400' },
  red:     { text: 'text-rose-400',    dot: 'bg-rose-400' },
  yellow:  { text: 'text-amber-400',   dot: 'bg-amber-400' },
  cyan:    { text: 'text-cyan-400',    dot: 'bg-cyan-400' },
  zinc:    { text: 'text-zinc-400',    dot: 'bg-zinc-400' },
}

const colorStyle = computed(() => palette[props.color] || palette.blue)
</script>

<template>
  <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col transition-all">
    <div v-if="title || tag" class="flex items-center justify-between gap-2 mb-2.5">
      <div v-if="title" class="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider" :class="colorStyle.text">
        <span class="size-1.5 rounded-full" :class="colorStyle.dot" />
        <span>{{ title }}</span>
      </div>
      <div v-if="tag" class="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
        {{ tag }}
      </div>
    </div>
    <div class="text-sm text-zinc-200 flex-1">
      <slot />
    </div>
  </div>
</template>
