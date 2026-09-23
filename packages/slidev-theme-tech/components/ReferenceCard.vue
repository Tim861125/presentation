<script setup lang="ts">
/**
 * ReferenceCard - Glassmorphic external-link card for References slides
 */
const props = withDefaults(
  defineProps<{
    href: string
    title: string
    index?: number
  }>(),
  {
    index: undefined,
  }
)

const label = props.index !== undefined ? String(props.index).padStart(2, '0') : ''
</script>

<template>
  <a
    :href="href"
    target="_blank"
    class="group rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 flex flex-col gap-1 transition-colors hover:border-cyan-400/40 hover:bg-white/[0.06]"
  >
    <div class="flex items-baseline gap-2">
      <span v-if="label" class="shrink-0 text-[10px] font-mono text-zinc-500">{{ label }}</span>
      <span class="text-sm font-semibold text-zinc-100 leading-snug transition-colors group-hover:text-cyan-300">
        {{ title }}
      </span>
    </div>
    <div class="text-[11px] font-mono text-zinc-500 leading-snug break-all transition-colors group-hover:text-zinc-400">
      {{ href }}
    </div>
  </a>
</template>
