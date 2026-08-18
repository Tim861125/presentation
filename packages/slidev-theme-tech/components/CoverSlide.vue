<script setup lang="ts">
import { computed } from 'vue'
import SlideShell from './SlideShell.vue'

const props = withDefaults(
  defineProps<{
    title?: string
    highlight?: string
    subtitle?: string
    tag?: string
    version?: string
    tags?: string[] | string
    author?: string
    date?: string
    footer?: string
    dotColor?: 'emerald' | 'cyan' | 'blue' | 'purple' | 'amber' | 'rose' | 'sky' | string
  }>(),
  {
    title: '',
    highlight: '',
    subtitle: '',
    tag: 'RD 技術分享 · 2026',
    version: '',
    tags: () => [],
    author: '',
    date: '',
    footer: '',
    dotColor: 'emerald',
  }
)

const dots: Record<string, { dot: string; highlight: string }> = {
  emerald: { dot: 'bg-emerald-400', highlight: 'text-emerald-400' },
  cyan:    { dot: 'bg-cyan-400',    highlight: 'text-cyan-400' },
  blue:    { dot: 'bg-blue-400',    highlight: 'text-blue-400' },
  purple:  { dot: 'bg-purple-400',  highlight: 'text-purple-400' },
  amber:   { dot: 'bg-amber-400',   highlight: 'text-amber-400' },
  rose:    { dot: 'bg-rose-400',    highlight: 'text-rose-400' },
  sky:     { dot: 'bg-sky-400',     highlight: 'text-sky-400' },
}

const colorStyle = computed(() => dots[props.dotColor] || dots.emerald)

const parsedTags = computed(() => {
  if (Array.isArray(props.tags)) return props.tags
  if (typeof props.tags === 'string' && props.tags.trim()) {
    return props.tags.split(',').map(t => t.trim())
  }
  return []
})
</script>

<template>
  <SlideShell :center="true" px="px-16">
    <div class="slidev-layout tech-cover flex flex-col justify-center">
      <!-- Top badges -->
      <div v-if="tag || version" class="flex items-center gap-2 mb-6">
        <div v-if="tag" class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <span class="size-1.5 rounded-full animate-pulse" :class="colorStyle.dot" />
          <span class="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
            {{ tag }}
          </span>
        </div>
        <span v-if="version" class="text-[10px] font-mono uppercase tracking-widest text-zinc-500 border border-white/10 rounded-full px-3 py-1">
          {{ version }}
        </span>
      </div>

      <!-- Main Title -->
      <h1 v-if="title || highlight" class="text-5xl md:text-6xl font-bold tracking-tight mb-3">
        <span class="text-white">{{ title }}</span>
        <span v-if="highlight" :class="colorStyle.highlight"> {{ highlight }}</span>
      </h1>

      <!-- Slot for custom markdown/vue content if provided -->
      <slot />

      <!-- Subtitle -->
      <p v-if="subtitle" class="text-lg md:text-xl font-light text-zinc-300 mb-6 max-w-3xl leading-snug">
        {{ subtitle }}
      </p>

      <!-- Tags -->
      <div v-if="parsedTags.length" class="flex flex-wrap gap-2 mb-8">
        <span
          v-for="t in parsedTags"
          :key="t"
          class="text-xs font-mono rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-zinc-300"
        >
          {{ t }}
        </span>
      </div>

      <!-- Footer / Author / Date -->
      <div class="flex items-center gap-6 text-[10px] text-zinc-500 font-mono">
        <div v-if="author" class="flex items-center gap-2">
          <div class="size-1 rounded-full" :class="colorStyle.dot" />
          <span>{{ author }}</span>
        </div>
        <div v-if="date" class="flex items-center gap-2">
          <div class="size-1 rounded-full bg-zinc-500" />
          <span>{{ date }}</span>
        </div>
        <div v-if="footer" class="flex items-center gap-2">
          <div class="size-1 rounded-full bg-sky-400" />
          <span>{{ footer }}</span>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
