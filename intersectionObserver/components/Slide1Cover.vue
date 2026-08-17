<script setup lang="ts">
</script>

<template>
  <SlideShell :center="true" px="px-16">
    <div class="flex flex-col justify-center">
      <div class="flex items-center gap-2 mb-6">
        <div class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <span class="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span class="text-[10px] font-mono uppercase tracking-widest text-zinc-400">RD 技術分享 · 2026</span>
        </div>
      </div>
      <h1 class="text-5xl font-bold tracking-tight mb-3">
        <span class="text-white">IntersectionObserver · </span>
        <span class="text-cyan-400">可視區域觀察器</span>
      </h1>
      <p class="text-lg font-light text-zinc-300 mb-6 max-w-3xl leading-snug">
        Deep Dive into Modern Viewport Observation Techniques — Lazy Loading · Infinite Scroll · Viewport Visibility
      </p>
      <div class="flex items-center gap-6 text-[10px] text-zinc-500 font-mono">
        <div class="flex items-center gap-2">
          <div class="size-1 rounded-full bg-cyan-400" />
          <span>Web API · IntersectionObserver · Performance · LazyLoad · Non-blocking</span>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
