<template>
  <div class="relative h-full w-full overflow-hidden bg-zinc-950 text-zinc-100">
    <div class="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
    <div class="absolute inset-0 opacity-[0.05]"
         style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 44px 44px;" />
    <div class="absolute -top-32 -right-32 size-[440px] rounded-full bg-emerald-500/12 blur-3xl" />
    <div class="absolute -bottom-32 -left-32 size-[440px] rounded-full bg-blue-500/12 blur-3xl" />

    <div class="relative h-full flex flex-col justify-center px-16">
      <div class="flex items-center gap-2 mb-6">
        <div class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <span class="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span class="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
            RD 技術分享 · 2026
          </span>
        </div>
        <span class="text-[10px] font-mono uppercase tracking-widest text-zinc-500 border border-white/10 rounded-full px-3 py-1">
          OpenSearch 2.11+
        </span>
      </div>

      <h1 class="text-6xl font-bold tracking-tight mb-3">
        <span class="text-white">Hybrid</span>
        <span class="text-emerald-400"> Search</span>
      </h1>
      <div class="text-lg font-mono text-zinc-500 mb-6">on OpenSearch</div>

      <div class="text-xl font-light text-zinc-300 mb-8 max-w-3xl leading-snug">
        把 <span class="text-emerald-400 font-semibold">BM25 關鍵字</span>
        與 <span class="text-blue-400 font-semibold">向量語意搜尋</span>
        的分數正規化後合併，取兩者所長。
      </div>

      <div class="flex flex-wrap gap-2 mb-10">
        <span v-for="t in tags" :key="t"
              class="text-xs font-mono rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-zinc-300">
          {{ t }}
        </span>
      </div>

      <div class="flex items-center gap-6 text-[10px] text-zinc-500 font-mono">
        <div class="flex items-center gap-2">
          <div class="size-1 rounded-full bg-zinc-500" />
          docs.opensearch.org / vector-search / hybrid-search
        </div>
        <div class="flex items-center gap-2">
          <div class="size-1 rounded-full bg-emerald-500" />
          範例：專利搜尋 · "smart office"
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tags = ['BM25 + Neural', 'normalization', 'min_max', 'RRF', 'pre / post filter', 'Patent Search']
</script>
