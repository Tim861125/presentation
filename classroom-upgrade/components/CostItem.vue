<script setup lang="ts">
defineProps<{
  index: number
  name: string
  spec?: string
  image?: string
  cost: string
}>()
</script>

<template>
  <div class="flex items-center gap-5 rounded-xl bg-white/5 border border-white/10 px-5 py-3 backdrop-blur">
    <div class="shrink-0 w-8 h-8 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-sm">
      {{ index }}
    </div>
    <img v-if="image" :src="image" class="w-16 h-16 rounded-lg object-cover shrink-0 bg-white" />
    <div class="flex-1 min-w-0">
      <div class="text-base font-semibold leading-snug">{{ name }}</div>
      <div v-if="spec" class="text-xs opacity-60">{{ spec }}</div>
    </div>
    <div class="text-right shrink-0">
      <div class="text-xs opacity-50">工材費</div>
      <div class="text-lg font-bold text-teal-300 font-mono whitespace-nowrap">{{ cost }}</div>
    </div>
  </div>
</template>
