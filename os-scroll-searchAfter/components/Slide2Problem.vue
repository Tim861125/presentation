<script setup lang="ts">
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Background · 問題背景"
      title="為什麼深度分頁是個問題"
      subtitle="分散式索引讓 from + size 越翻越貴、越翻越不準"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
      <div class="p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 space-y-3">
        <div class="flex items-center gap-2 text-cyan-400 font-bold text-sm">
          <div class="size-6 rounded-lg bg-cyan-500/20 flex items-center justify-center font-mono text-xs">01</div>
          每個 shard 都要陪你翻頁
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          結果分散在多個 shard，每個 shard 各自維持一個大小 <strong class="text-white">from + size</strong> 的優先隊列，再由 coordinating node 合併。
        </p>
        <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-cyan-300/90">
          成本 O(shards × (from + size))：翻到第 10,000 筆，每 shard 產生上萬筆候選、再丟掉 99.9%。
        </div>
      </div>

      <div class="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 space-y-3">
        <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">
          <div class="size-6 rounded-lg bg-blue-500/20 flex items-center justify-center font-mono text-xs">02</div>
          10,000 筆的硬上限
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          預設 <code class="text-blue-300 font-mono">index.max_result_window</code> = 10,000，超過直接報錯，不是變慢而已。
        </p>
        <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-blue-300/90">
          from + size > 10000 → search_phase_execution_exception。
        </div>
      </div>

      <div class="p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 space-y-3">
        <div class="flex items-center gap-2 text-purple-400 font-bold text-sm">
          <div class="size-6 rounded-lg bg-purple-500/20 flex items-center justify-center font-mono text-xs">03</div>
          無狀態：兩頁之間會漂移
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          每次都打「當下最新」的索引。頁間有新增／刪除／改分數，就會看到<strong class="text-white">重複</strong>或<strong class="text-white">漏失</strong>的文件。
        </p>
        <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-purple-300/90">
          新文件插進第 1 頁，把原本最後一筆挤到第 2 頁 → 用戶看到兩份。
        </div>
      </div>
    </div>

    <div class="mt-4 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between text-xs">
      <div class="flex items-center gap-2 text-zinc-300">
        <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono text-[10px]">需求分裂</span>
        快照一致性 → <strong class="text-white">Scroll / PIT</strong> · 省資源游標 → <strong class="text-white">search_after</strong> · 兩者都要 → <strong class="text-cyan-300">PIT + search_after</strong>
      </div>
      <div class="text-zinc-500 font-mono text-[11px]">Pagination 101</div>
    </div>
  </SlideShell>
</template>
