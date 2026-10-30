<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  subtitle: string
}>()
</script>

<template>
  <div class="relative h-full w-full overflow-hidden bg-zinc-950 text-zinc-100 font-sans select-none">
    <div class="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pointer-events-none" />
    <div
      class="absolute inset-0 opacity-[0.04] pointer-events-none"
      style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 40px 40px;"
    />
    <div class="absolute -top-40 -right-40 size-[420px] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
    <div class="absolute -bottom-40 -left-40 size-[420px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

    <div class="relative h-full flex flex-col px-12 py-5">
      <div class="mb-4">
        <div class="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-cyan-300/80 mb-2">
          <span class="size-1.5 rounded-full bg-cyan-300" />
          <span>{{ eyebrow }}</span>
        </div>
        <h2 class="text-3xl font-bold text-white tracking-tight leading-tight">{{ title }}</h2>
        <p class="text-sm text-zinc-400 mt-2 leading-relaxed max-w-4xl">{{ subtitle }}</p>
      </div>
      <div class="flex-1 min-h-0">
        <slot />
      </div>
    </div>
  </div>
</template>
