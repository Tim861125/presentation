<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="mb-6">
    <div v-if="eyebrow" class="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-emerald-400/80 mb-2">
      <span class="size-1.5 rounded-full bg-emerald-400" />
      {{ eyebrow }}
    </div>
    <h2 class="text-3xl font-bold text-white tracking-tight leading-tight">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-sm text-zinc-400 mt-2 leading-relaxed max-w-4xl">
      {{ subtitle }}
    </p>
  </div>
</template>
