<script setup lang="ts">
/**
 * StatCard - Large metric display card with label and trend/subtitle
 */
withDefaults(
  defineProps<{
    value: string | number
    label: string
    unit?: string
    sub?: string
    color?: 'emerald' | 'blue' | 'sky' | 'amber' | 'rose' | 'zinc'
  }>(),
  {
    unit: '',
    sub: '',
    color: 'emerald',
  }
)

const colorMap: Record<string, string> = {
  emerald: 'text-emerald-400',
  blue:    'text-blue-400',
  sky:     'text-sky-400',
  amber:   'text-amber-400',
  rose:    'text-rose-400',
  zinc:    'text-zinc-200',
}
</script>

<template>
  <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col justify-between">
    <div class="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
      {{ label }}
    </div>
    <div class="my-2 flex items-baseline gap-1">
      <span class="text-3xl font-bold tracking-tight" :class="colorMap[color] || colorMap.emerald">
        {{ value }}
      </span>
      <span v-if="unit" class="text-xs font-mono text-zinc-500">
        {{ unit }}
      </span>
    </div>
    <div v-if="sub" class="text-xs text-zinc-500 truncate">
      {{ sub }}
    </div>
  </div>
</template>
