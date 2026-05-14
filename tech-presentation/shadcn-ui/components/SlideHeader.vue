<template>
  <div class="mb-4">
    <div v-if="eyebrow" class="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
      <span class="size-1 rounded-full bg-zinc-500" />
      {{ eyebrow }}
    </div>
    <h2 class="text-2xl font-bold text-white tracking-tight leading-tight">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-xs text-zinc-400 mt-1 leading-relaxed">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
}>()
</script>
