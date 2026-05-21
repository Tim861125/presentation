<template>
  <span
    class="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-mono font-medium tracking-wide"
    :class="variantClass"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'success'
}>()

const variants: Record<string, string> = {
  default: 'border-white/15 bg-white/10 text-zinc-100',
  outline: 'border-white/15 bg-transparent text-zinc-300',
  secondary: 'border-zinc-700/50 bg-zinc-800/50 text-zinc-300',
  destructive: 'border-red-500/30 bg-red-500/10 text-red-300',
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
}

const variantClass = computed(() => variants[props.variant ?? 'default'])
</script>
