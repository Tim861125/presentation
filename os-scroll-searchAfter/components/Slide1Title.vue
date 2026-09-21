<script setup lang="ts">
</script>

<template>
  <SlideShell :center="true">
    <div class="max-w-4xl mx-auto w-full text-left space-y-6">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono"
      >
        <span class="size-2 rounded-full bg-cyan-400 animate-pulse" />
        OpenSearch 2.x / 3.x · Elasticsearch 7.x / 8.x
      </div>

      <div class="space-y-3">
        <h1 class="text-5xl font-extrabold tracking-tight text-white leading-tight">
          深度分頁實戰
          <span
            class="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent"
            >Scroll vs search_after</span
          >
        </h1>
        <p class="text-lg text-zinc-300 leading-relaxed">
          從 from + size 的瓶頸，到 PIT + search_after 的現代推薦解
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
        <div class="p-3.5 rounded-xl border border-cyan-400/60 bg-cyan-500/15 shadow-lg shadow-cyan-500/10 backdrop-blur-sm space-y-1">
          <div class="text-xs font-mono text-cyan-300 font-bold">01. 分頁的成本模型</div>
          <div class="text-xs text-zinc-100">shard 優先隊列 · 10,000 上限 · 快照漂移</div>
        </div>
        <div class="p-3.5 rounded-xl border border-white/5 bg-black/20 opacity-40 space-y-1">
          <div class="text-xs font-mono text-emerald-400 font-bold">02. Scroll 快照游標</div>
          <div class="text-xs text-zinc-300">search context · _scroll_id · sliced scroll</div>
        </div>
        <div class="p-3.5 rounded-xl border border-white/5 bg-black/20 opacity-40 space-y-1">
          <div class="text-xs font-mono text-sky-400 font-bold">03. search_after 游標</div>
          <div class="text-xs text-zinc-300">免狀態 · 成本與深度無關 · 全序排序</div>
        </div>
        <div class="p-3.5 rounded-xl border border-white/5 bg-black/20 opacity-40 space-y-1">
          <div class="text-xs font-mono text-indigo-400 font-bold">04. PIT + Slicing</div>
          <div class="text-xs text-zinc-300">快照一致 · 前後可翻 · 官方首選</div>
        </div>
      </div>

      <div class="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
        <div>丁吾心 · RD 技術分享 · 2026</div>
        <div>Deep Pagination · Scroll · search_after · PIT</div>
      </div>
    </div>
  </SlideShell>
</template>
