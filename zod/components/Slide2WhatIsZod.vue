<script setup lang="ts">
</script>

<template>
  <SlideShell :center="true" px="px-16">
    <div class="flex flex-col items-center justify-center text-center">
      <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6">
        <span class="size-2 rounded-full bg-blue-400 animate-pulse" />
        <span class="text-xs font-mono uppercase tracking-widest text-zinc-400">WHAT IS ZOD?</span>
      </div>
      <h2 class="text-4xl font-bold text-white mb-6">
        TypeScript-first Schema Declaration & Validation
      </h2>
      <p class="text-lg text-zinc-300 max-w-2xl leading-relaxed">
        Zod 是以 TypeScript 為核心設計的 Schema 宣告與執行時期 (Runtime) 資料驗證函式庫，兼具零依賴、型別自動推導與極致效能。
      </p>
    </div>
  </SlideShell>
</template>
