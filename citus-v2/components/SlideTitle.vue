<script setup>
defineProps({
  title: { type: String, required: true },
  kicker: { type: String, default: '' },
})
</script>

<template>
  <div class="mb-4">
    <div v-if="kicker" class="text-xs font-mono uppercase tracking-widest text-cyan-400/70">
      {{ kicker }}
    </div>
    <h1 class="text-3xl font-bold leading-tight">{{ title }}</h1>
    <div class="h-px w-16 bg-cyan-400/50 mt-2" />
  </div>
</template>
