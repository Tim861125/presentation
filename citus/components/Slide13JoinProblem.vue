<script setup lang="ts">
</script>

<template>
  <SlideShell :center="true" px="px-16">
    <div class="flex flex-col items-center justify-center text-center">
      <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6">
        <span class="size-2 rounded-full bg-cyan-400 animate-pulse" />
        <span class="text-xs font-mono uppercase tracking-widest text-zinc-400">DISTRIBUTED CHALLENGE</span>
      </div>
      <h2 class="text-3xl font-medium text-zinc-300 mb-4">
        分散式資料庫最大的核心命題：
      </h2>
      <div class="text-4xl font-bold text-white bg-cyan-400/10 border border-cyan-400/30 rounded-2xl px-8 py-5">
        JOIN 的資料，是否在同一個 Worker？
      </div>
    </div>
  </SlideShell>
</template>
