<script setup lang="ts">
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="search_after · Mechanism"
      title="search_after 機制：帶著座標回來"
      subtitle="上一頁最後一筆的 sort 值，就是下一頁的入場券"
    />

    <div class="p-4 rounded-xl border border-white/10 bg-white/[0.02] mt-1">
      <div class="flex items-center justify-between gap-2 text-center">
        <div class="flex-1 p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/30 space-y-1">
          <div class="text-[10px] font-mono text-sky-400">Page 1 回應</div>
          <div class="text-[11px] font-mono text-zinc-200">last hit.sort<br />= [1, 32436]</div>
        </div>
        <div class="text-sky-400 text-lg font-mono">→</div>
        <div class="flex-1 p-2.5 rounded-lg bg-black/40 border border-white/10 space-y-1">
          <div class="text-[10px] font-mono text-zinc-400">Page 2 請求</div>
          <div class="text-[11px] font-mono text-zinc-200">"search_after":<br />[1, 32436]</div>
        </div>
        <div class="text-sky-400 text-lg font-mono">→</div>
        <div class="flex-1 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 space-y-1">
          <div class="text-[10px] font-mono text-emerald-400">節點端</div>
          <div class="text-[11px] text-zinc-200 leading-snug">全新獨立查詢<br /><strong class="text-white">零 context</strong></div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3.5 mt-3.5">
      <div class="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
        <div class="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2">
          <span class="size-2 rounded-full bg-emerald-400" /> 為什麼便宜
        </div>
        <p class="text-[11px] text-zinc-300 leading-relaxed">
          每個 shard 只需維持 <code class="text-emerald-300 font-mono">size</code> 大小的隊列（而不是 from + size）→ 成本
          <code class="text-emerald-300 font-mono">O(shards × size)</code>，翻到第 100 萬筆也是同一個價。
        </p>
      </div>
      <div class="p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-2">
        <div class="text-xs font-mono font-bold text-rose-400 flex items-center gap-2">
          <span class="size-2 rounded-full bg-rose-400" /> 全序（total order）是前提
        </div>
        <p class="text-[11px] text-zinc-300 leading-relaxed">
          必須有 sort，且最後補一個<strong class="text-white">唯一 tiebreaker</strong>（<code class="text-rose-300 font-mono">line_id</code>、<code class="text-rose-300 font-mono">_shard</code>+<code class="text-rose-300 font-mono">doc</code>、ES 7.12+ 的 <code class="text-rose-300 font-mono">_shard_doc</code>），否則同分值文件整批漏掉。
        </p>
      </div>
    </div>

    <div class="mt-3.5 p-3 rounded-xl border border-white/10 bg-white/[0.02] flex items-center gap-2 text-[11px] text-zinc-400">
      <span class="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 font-mono text-[10px]">版本</span>
      ES 5.3 起支援；OpenSearch 繼承自 ES 7.x 分支，1.x 即有。
    </div>
  </SlideShell>
</template>
