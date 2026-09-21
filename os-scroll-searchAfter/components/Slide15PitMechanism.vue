<script setup lang="ts">
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="PIT · Mechanism"
      title="Point in Time：把快照與游標拆開"
      subtitle="Scroll 把「快照」與「游標」綁在一起；PIT 只保留快照，游標交給 search_after"
    />

    <div class="grid grid-cols-2 gap-3.5 mt-1">
      <div class="p-3.5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 space-y-2">
        <div class="flex items-center gap-2 text-indigo-400 font-bold text-sm">
          <div class="size-6 rounded-lg bg-indigo-500/20 flex items-center justify-center font-mono text-xs">1</div>
          鎖定 segment 集合
        </div>
        <p class="text-[11px] text-zinc-300 leading-relaxed">
          <code class="text-indigo-300 font-mono">POST /&lt;index&gt;/_search/point_in_time?keep_alive=1h</code> → 取得 <code class="text-indigo-300 font-mono">pit_id</code>；segment merge 時保留舊副本直到到期＝快照語義。
        </p>
      </div>

      <div class="p-3.5 rounded-xl border border-violet-500/20 bg-violet-500/5 space-y-2">
        <div class="flex items-center gap-2 text-violet-400 font-bold text-sm">
          <div class="size-6 rounded-lg bg-violet-500/20 flex items-center justify-center font-mono text-xs">2</div>
          不綁 query
        </div>
        <p class="text-[11px] text-zinc-300 leading-relaxed">
          同一個 PIT 上可以跑<strong class="text-white">不同查詢</strong>——這是相對 Scroll 最關鍵的自由度。
        </p>
      </div>

      <div class="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
        <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <div class="size-6 rounded-lg bg-emerald-500/20 flex items-center justify-center font-mono text-xs">3</div>
          前後皆可翻
        </div>
        <p class="text-[11px] text-zinc-300 leading-relaxed">
          同一 PIT + 同一 sort，第 1 → 2 → 1 頁結果完全可重複，<strong class="text-white">支援「上一頁」</strong>。
        </p>
      </div>

      <div class="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-2">
        <div class="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <div class="size-6 rounded-lg bg-amber-500/20 flex items-center justify-center font-mono text-xs">4</div>
          看不到 PIT 之後的新資料
        </div>
        <p class="text-[11px] text-zinc-300 leading-relaxed">
          live 段不在快照內：建立後新 index 的文件搜不到，要新資料得重開 PIT。
        </p>
      </div>
    </div>

    <div class="mt-4 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between text-xs">
      <div class="flex items-center gap-2 text-zinc-300">
        <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">官方態度</span>
        OpenSearch PIT 文件：<strong class="text-white">PIT + search_after 是首選分頁法，尤其深度分頁</strong>
      </div>
      <div class="text-zinc-500 font-mono text-[11px] whitespace-nowrap">ES 7.12 GA · OS 2.4/2.5 · 3.0 起 Scroll 棄用</div>
    </div>
  </SlideShell>
</template>
