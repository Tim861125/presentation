<script setup lang="ts">
import { computed } from 'vue'
import SlideShell from './SlideShell.vue'

const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    tag?: string
    dotColor?: 'emerald' | 'cyan' | 'blue' | 'purple' | 'amber' | 'rose' | 'sky' | string
    links?: string[] | string
    author?: string
    date?: string
  }>(),
  {
    title: '工作報告結束',
    subtitle: '',
    tag: 'THANK YOU',
    dotColor: 'emerald',
    links: () => [],
    author: '',
    date: '',
  }
)

const dots: Record<string, string> = {
  emerald: 'bg-emerald-400',
  cyan: 'bg-cyan-400',
  blue: 'bg-blue-400',
  purple: 'bg-purple-400',
  amber: 'bg-amber-400',
  rose: 'bg-rose-400',
  sky: 'bg-sky-400',
}

const dotClass = computed(() => dots[props.dotColor] || dots.emerald)

const parsedLinks = computed(() => {
  if (Array.isArray(props.links)) return props.links
  if (typeof props.links === 'string' && props.links.trim()) {
    return props.links.split(',').map(l => l.trim())
  }
  return []
})
</script>

<template>
  <SlideShell :center="true" px="px-16">
    <div class="slidev-layout tech-end flex flex-col items-center justify-center text-center">
      <div v-if="tag" class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6">
        <span class="size-2 rounded-full animate-pulse" :class="dotClass" />
        <span class="text-xs font-mono uppercase tracking-widest text-zinc-400">{{ tag }}</span>
      </div>
      <h1 v-if="title" class="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="text-zinc-400 text-sm font-mono mb-4">
        {{ subtitle }}
      </p>
      <slot />
      <div v-if="parsedLinks.length" class="text-xs text-zinc-500 font-mono space-y-1 mt-4">
        <div v-for="(link, i) in parsedLinks" :key="i">
          {{ link }}
        </div>
      </div>
    </div>
  </SlideShell>
</template>
