<script setup lang="ts">
defineProps<{
  index: number
  name: string
  spec?: string
  image: string
  unit: string
  price: number
  qty: number
}>()

const fmt = (n: number) => n.toLocaleString('zh-TW')
</script>

<template>
  <div class="flex items-center gap-6 rounded-xl bg-white/5 border border-white/10 px-6 py-4 backdrop-blur">
    <div class="shrink-0 w-9 h-9 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
      {{ index }}
    </div>
    <img :src="image" class="w-20 h-20 rounded-lg object-cover shrink-0 bg-white" />
    <div class="flex-1 min-w-0">
      <div class="text-lg font-semibold">{{ name }}</div>
      <div v-if="spec" class="text-sm opacity-60 truncate">{{ spec }}</div>
    </div>
    <div class="text-right shrink-0 text-sm opacity-70 w-40">
      <span class="font-mono">{{ fmt(price) }}</span>
      <span class="opacity-50"> × </span>
      <span class="font-mono">{{ qty }}</span>
      <span class="opacity-50"> {{ unit }}</span>
    </div>
    <div class="text-right shrink-0 w-32">
      <div class="text-xl font-bold text-teal-300 font-mono">${{ fmt(price * qty) }}</div>
    </div>
  </div>
</template>
