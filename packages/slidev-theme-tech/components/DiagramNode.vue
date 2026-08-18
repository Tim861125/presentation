<script setup lang="ts">
/**
 * DiagramNode - Standardized architecture/concept diagram node component
 */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    tone?: 'cyan' | 'blue' | 'slate' | 'red' | 'green' | 'amber' | 'purple' | string
    items?: string[]
    compact?: boolean
  }>(),
  {
    title: '',
    subtitle: '',
    tone: 'cyan',
    items: () => [],
    compact: false,
  }
)

// Full static class strings for UnoCSS scanner
const tones: Record<string, string> = {
  cyan:   'border-cyan-400/40 bg-cyan-400/5 text-cyan-300',
  blue:   'border-blue-400/40 bg-blue-400/5 text-blue-300',
  slate:  'border-slate-400/30 bg-slate-400/5 text-slate-300',
  red:    'border-red-400/40 bg-red-400/5 text-red-300',
  green:  'border-green-400/40 bg-green-400/5 text-green-300',
  amber:  'border-amber-400/40 bg-amber-400/5 text-amber-300',
  purple: 'border-purple-400/40 bg-purple-400/5 text-purple-300',
}

const toneClass = computed(() => tones[props.tone] || tones.cyan)
</script>

<template>
  <div
    class="rounded-lg border backdrop-blur-sm flex flex-col"
    :class="[toneClass, compact ? 'px-3 py-2' : 'px-4 py-3']"
  >
    <div v-if="title" class="font-semibold tracking-wide" :class="compact ? 'text-sm' : 'text-base'">
      {{ title }}
    </div>
    <div v-if="subtitle" class="text-xs opacity-60 font-mono mt-0.5">{{ subtitle }}</div>
    <div v-if="items.length" class="mt-1.5 flex flex-col gap-1">
      <div
        v-for="(it, i) in items"
        :key="i"
        class="font-mono text-xs text-slate-200/90 bg-white/5 rounded px-2 py-0.5"
      >
        {{ it }}
      </div>
    </div>
    <slot />
  </div>
</template>
