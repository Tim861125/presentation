<script setup lang="ts">
</script>

<template>
  <SlideShell :center="true">
    <div class="max-w-3xl space-y-5">
      <div class="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-sky-400">
        <span class="size-2 rounded-full bg-sky-400 animate-pulse" />
        Section 02
      </div>
      <h1 class="text-5xl font-extrabold tracking-tight text-white leading-tight">
        search_after
        <span class="bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">即時、免狀態的游標</span>
      </h1>
      <p class="text-lg text-zinc-400 leading-relaxed max-w-2xl">
        客戶端帶著排序座標回來 —— 成本與翻頁深度無關
      </p>
      <div class="flex items-center gap-2 pt-2">
        <span class="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-zinc-300">sort 值 = 游標</span>
        <span class="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-zinc-300">O(shards × size)</span>
        <span class="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-zinc-300">ES 5.3+ / OpenSearch 1.x+</span>
      </div>
    </div>
  </SlideShell>
</template>
