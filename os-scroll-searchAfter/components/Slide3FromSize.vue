<script setup lang="ts">
const fromSizeJson = `{
  "from": 10,
  "size": 10,
  "query": {
    "match": { "play_name": "Hamlet" }
  }
}`
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Baseline · 對照組"
      title="from + size：傳統分頁"
      subtitle="前幾頁很好用，往深就開始付出代價"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-1">
      <div class="lg:col-span-6 space-y-2">
        <div class="text-xs font-mono font-bold text-white flex items-center justify-between">
          <span>一般查詢請求</span>
          <span class="text-cyan-400 text-[10px]">from = size × (page − 1)</span>
        </div>
        <JsonCard method="GET" path="/shakespeare/_search" :code="fromSizeJson" />
        <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-zinc-400">
          每個 shard 都要先撈滿 <code class="text-cyan-300 font-mono">from + size</code> 筆候選，coordinating node合併後才丟掉前 from 筆。
        </div>
      </div>

      <div class="lg:col-span-6 space-y-3">
        <div class="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
          <div class="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2">
            <span class="size-2 rounded-full bg-emerald-400" /> 適用
          </div>
          <ul class="text-[11px] text-zinc-300 space-y-1.5 list-disc list-inside">
            <li>前端「前幾頁」的傳統分頁，總筆數可控</li>
            <li>需要隨機跳頁（直接跳第 5 頁）</li>
          </ul>
        </div>
        <div class="p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-2">
          <div class="text-xs font-mono font-bold text-rose-400 flex items-center gap-2">
            <span class="size-2 rounded-full bg-rose-400" /> 不適用
          </div>
          <ul class="text-[11px] text-zinc-300 space-y-1.5 list-disc list-inside">
            <li>全量匯出、深度翻頁（上限 10,000）</li>
            <li>結果不凍結：頁間寫入會造成重複／漏失</li>
          </ul>
        </div>
        <div class="p-2.5 rounded-lg border border-white/10 bg-white/[0.02] text-[11px] text-zinc-400">
          深頁成本公式：<code class="text-rose-300 font-mono">O(shards × (from + size))</code>，其中大多數候選最終被報廢。
        </div>
      </div>
    </div>
  </SlideShell>
</template>
