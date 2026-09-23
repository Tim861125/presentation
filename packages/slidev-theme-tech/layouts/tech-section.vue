<script setup lang="ts">
import SlideShell from '../components/SlideShell.vue'
import SlideHeader from '../components/SlideHeader.vue'

const props = defineProps<{
  section?: string
  title?: string
  subtitle?: string
  frontmatter?: Record<string, any>
}>()

// `title` is a reserved frontmatter field and stripped from layout props
const resolvedTitle = () => props.title || props.frontmatter?.title || ''
</script>

<template>
  <SlideShell :center="true" px="px-16">
    <div class="slidev-layout tech-section flex flex-col justify-center">
      <div v-if="section" class="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3">
        <span class="size-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>SECTION {{ section }}</span>
      </div>
      <h1 v-if="resolvedTitle()" class="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
        {{ resolvedTitle() }}
      </h1>
      <p v-if="subtitle" class="text-lg text-zinc-400 max-w-2xl leading-relaxed">
        {{ subtitle }}
      </p>
      <slot />
    </div>
  </SlideShell>
</template>
