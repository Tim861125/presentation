<script setup lang="ts">
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Part 5 · 總結與決策清單"
      title="重點回顧與生產環境落地決策清單"
      subtitle="OpenSearch Hybrid Search 技術深潛核心要點與落地指南"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-2">
      <!-- Check 1 -->
      <div class="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
        <div class="flex items-center gap-2 text-emerald-400 font-bold font-mono text-xs">
          <div class="size-6 rounded bg-emerald-500/20 flex items-center justify-center">01</div>
          BM25 (Best Matching 25) 基礎扎根
        </div>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside text-[11px] leading-relaxed">
          <li>掌握 <code class="text-emerald-300 font-mono">k₁=1.2</code> 飽和與 <code class="text-emerald-300 font-mono">b=0.75</code> 長度懲罰。</li>
          <li>中文專利建議配置 CJK (Chinese, Japanese, Korean) <code class="text-amber-300 font-mono">cjk_html</code> 分詞器。</li>
          <li>明白 BM25 缺乏語意能力，需 Hybrid 雙引擎。</li>
        </ul>
      </div>

      <!-- Check 2 -->
      <div class="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 space-y-2">
        <div class="flex items-center gap-2 text-blue-400 font-bold font-mono text-xs">
          <div class="size-6 rounded bg-blue-500/20 flex items-center justify-center">02</div>
          Processor 精準選型
        </div>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside text-[11px] leading-relaxed">
          <li><strong class="text-white">Score-Based</strong>: normalization-processor，適合需精準調控 weights。</li>
          <li><strong class="text-white">Rank-Based</strong>: score-ranker-processor (RRF, Reciprocal Rank Fusion)，適合跨模態巨大分數落差。</li>
        </ul>
      </div>

      <!-- Check 3 -->
      <div class="p-4 rounded-xl border border-teal-500/30 bg-teal-500/5 space-y-2">
        <div class="flex items-center gap-2 text-teal-400 font-bold font-mono text-xs">
          <div class="size-6 rounded bg-teal-500/20 flex items-center justify-center">03</div>
          正規化與合併
        </div>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside text-[11px] leading-relaxed">
          <li><code class="text-teal-300 font-mono">min_max</code> + <code class="text-teal-300 font-mono">arithmetic_mean</code> 為首選 baseline。</li>
          <li>z_score 限搭配 arithmetic_mean。</li>
          <li>記得控制 query size 在 100-200 間。</li>
        </ul>
      </div>

      <!-- Check 4 -->
      <div class="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 space-y-2">
        <div class="flex items-center gap-2 text-indigo-400 font-bold font-mono text-xs">
          <div class="size-6 rounded bg-indigo-500/20 flex items-center justify-center">04</div>
          台灣專利多向量最佳解
        </div>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside text-[11px] leading-relaxed">
          <li><strong class="text-emerald-300">Nested Hybrid 2 臂架構</strong>為品質最佳解 (MRR / Mean Reciprocal Rank > 0.90)。</li>
          <li>避免使用 MultiDoc (膨脹儲存且破壞召回)。</li>
          <li>結合名稱 CJK BM25 檢索。</li>
        </ul>
      </div>
    </div>

    <!-- Final Callout Banner -->
    <div class="mt-4 p-3.5 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-between text-xs">
      <div class="text-zinc-300 flex items-center gap-2">
        <span class="size-2 rounded-full bg-emerald-400 animate-ping" />
        <span class="font-bold text-white">OpenSearch Hybrid Search (混合搜尋, Part 2)</span>
        — 打造高效、穩定且語意精確的現代搜尋體驗
      </div>
      <div class="font-mono text-zinc-500 text-[11px]">Thank You</div>
    </div>
  </SlideShell>
</template>
