<script setup lang="ts">
/**
 * TechCard - Glassmorphic card container with optional variants
 */
withDefaults(
  defineProps<{
    variant?: 'default' | 'emerald' | 'blue' | 'rose' | 'amber'
    title?: string
    tag?: string
  }>(),
  {
    variant: 'default',
    title: '',
    tag: '',
  }
)

const variantStyles: Record<string, string> = {
  default: 'border-white/10 bg-white/[0.03] text-zinc-200',
  emerald: 'border-emerald-500/20 bg-emerald-500/[0.06] text-zinc-200',
  blue: 'border-blue-500/20 bg-blue-500/[0.06] text-zinc-200',
  rose: 'border-rose-500/20 bg-rose-500/[0.06] text-zinc-200',
  amber: 'border-amber-500/20 bg-amber-500/[0.06] text-zinc-200',
}
</script>

<template>
  <div class="rounded-xl border p-4 flex flex-col transition-colors" :class="variantStyles[variant] || variantStyles.default">
    <div v-if="title || tag" class="flex items-center justify-between gap-2 mb-2.5">
      <div v-if="title" class="font-bold text-white text-base">
        {{ title }}
      </div>
      <div v-if="tag" class="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
        {{ tag }}
      </div>
    </div>
    <slot />
  </div>
</template>
