<script setup lang="ts">
</script>

<template>
  <SlideShell :center="true" px="px-16">
    <div class="flex flex-col justify-center">
      <div class="flex items-center gap-2 mb-6">
        <div class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <span class="size-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span class="text-[10px] font-mono uppercase tracking-widest text-zinc-400">RD 技術分享 · 2026</span>
        </div>
      </div>
      <h1 class="text-5xl font-bold tracking-tight mb-3">
        <span class="text-white">Chrome DevTools · </span>
        <span class="text-blue-400">MCP</span>
      </h1>
      <p class="text-lg font-light text-zinc-300 mb-6 max-w-3xl leading-snug">
        工具介紹與實戰展示 — 27 個工具 · 初階到進階 · 直接可用的 Prompt 指令
      </p>
      <div class="flex items-center gap-6 text-[10px] text-zinc-500 font-mono">
        <div class="flex items-center gap-2">
          <div class="size-1 rounded-full bg-blue-400" />
          <span>Chrome DevTools · MCP · Browser Automation · Debugging · RD Team</span>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
