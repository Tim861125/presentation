<script setup lang="ts">
/**
 * TechBadge - Tech pill badge with status dot
 */
withDefaults(
  defineProps<{
    label: string
    color?: string
    dot?: boolean
    pulse?: boolean
  }>(),
  {
    color: 'emerald',
    dot: true,
    pulse: false,
  }
)

const colorMap: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-300',
    dot: 'bg-emerald-400',
  },
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-300',
    dot: 'bg-blue-400',
  },
  sky: {
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/30',
    text: 'text-sky-300',
    dot: 'bg-sky-400',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-300',
    dot: 'bg-amber-400',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-300',
    dot: 'bg-rose-400',
  },
  zinc: {
    bg: 'bg-white/5',
    border: 'border-white/10',
    text: 'text-zinc-300',
    dot: 'bg-zinc-400',
  },
}
</script>

<template>
  <div
    class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider"
    :class="[
      colorMap[color]?.bg || colorMap.zinc.bg,
      colorMap[color]?.border || colorMap.zinc.border,
      colorMap[color]?.text || colorMap.zinc.text,
    ]"
  >
    <span
      v-if="dot"
      class="size-1.5 rounded-full"
      :class="[
        colorMap[color]?.dot || colorMap.zinc.dot,
        pulse ? 'animate-pulse' : '',
      ]"
    />
    <span>{{ label }}</span>
  </div>
</template>
