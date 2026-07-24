<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="mb-3">
    <div v-if="eyebrow" class="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-emerald-400/90 mb-1">
      <span class="size-1.5 rounded-full bg-emerald-400" />
      {{ eyebrow }}
    </div>
    <h2 class="text-2.5xl font-bold text-white tracking-tight leading-tight">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-xs text-zinc-400 mt-1 leading-relaxed max-w-4xl">
      {{ subtitle }}
    </p>
  </div>
</template>
