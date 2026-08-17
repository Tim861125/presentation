<script setup lang="ts">
import SlideShell from './SlideShell.vue'
import SlideHeader from './SlideHeader.vue'
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Part 2 · Phase Results Processors"
      title="兩種 Phase Results Processors 選擇與架構比較"
      subtitle="介入於 Query Phase 結束與 Fetch Phase 開始之間的多路結果整合處理器"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-1">
      <!-- Top Architecture Banner (Full Width) -->
      <div class="lg:col-span-12 p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between text-xs font-mono">
        <div class="flex items-center gap-3">
          <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">Search Pipeline 順序</span>
          <span class="text-zinc-300">Hybrid Query (多路子查詢)</span>
          <span class="text-zinc-500">➔</span>
          <span class="text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded">Query Phase (各自打分)</span>
          <span class="text-zinc-500">➔</span>
          <span class="text-emerald-300 font-bold bg-emerald-500/20 px-2.5 py-0.5 rounded border border-emerald-400/40">phase_results_processor 介入</span>
          <span class="text-zinc-500">➔</span>
          <span class="text-zinc-300">Fetch Phase (抓取 Document 文件)</span>
        </div>
      </div>

      <!-- Left Column: Comparison Table (8 cols) -->
      <div class="lg:col-span-8 space-y-2">
        <div class="rounded-xl border border-white/10 overflow-hidden bg-black/40 text-xs">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-white/10 bg-white/[0.04] text-zinc-300 font-mono">
                <th class="p-2.5">維度</th>
                <th class="p-2.5 text-emerald-400">Normalization Processor (2.10+)</th>
                <th class="p-2.5 text-blue-400">Score Ranker Processor (2.19+)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5 text-zinc-300">
              <tr>
                <td class="p-2.5 font-medium text-white">評分機制</td>
                <td class="p-2.5 text-emerald-300">分數制 (Score-Based)</td>
                <td class="p-2.5 text-blue-300">名次制 (Rank-Based)</td>
              </tr>
              <tr>
                <td class="p-2.5 font-medium text-white">核心演算法</td>
                <td class="p-2.5 text-zinc-300">Min-Max / L2 / Z-Score + 加權平均</td>
                <td class="p-2.5 text-zinc-300">RRF (Reciprocal Rank Fusion, 倒數排名融合)</td>
              </tr>
              <tr>
                <td class="p-2.5 font-medium text-white">核心優勢</td>
                <td class="p-2.5 text-emerald-300">可精細調整各路權重 (如 40% / 60%)</td>
                <td class="p-2.5 text-blue-300">天生免疫異質分數尺度，免複雜調參</td>
              </tr>
              <tr>
                <td class="p-2.5 font-medium text-white">調參複雜度</td>
                <td class="p-2.5 text-amber-300">高 (需指定 technique + weights)</td>
                <td class="p-2.5 text-emerald-300 font-mono">低 (僅調 rank_constant k)</td>
              </tr>
              <tr>
                <td class="p-2.5 font-medium text-white">適用情境</td>
                <td class="p-2.5 text-zinc-300">分數具實際物理意義、需業務定權</td>
                <td class="p-2.5 text-zinc-300">BM25 (Best Matching 25)與向量尺度落差巨大、求穩健</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right Column: Decision Tree (4 cols) -->
      <div class="lg:col-span-4 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
        <div class="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <span class="size-2 rounded-full bg-blue-400" />
          Processor 快速選型決策樹
        </div>

        <div class="space-y-2 text-xs">
          <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
            <div class="text-emerald-400 font-bold text-[11px]">👉 各路分數有意義 & 需要精確權重？</div>
            <p class="text-zinc-400 text-[10.5px]">選擇 <strong class="text-emerald-300">normalization-processor</strong> (Min-Max + Arithmetic Mean)</p>
          </div>

          <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
            <div class="text-blue-400 font-bold text-[11px]">👉 分數尺度極端 (如 BM25 50 vs Dense 0.8)？</div>
            <p class="text-zinc-400 text-[10.5px]">選擇 <strong class="text-blue-300">score-ranker-processor</strong> (RRF k=60)</p>
          </div>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
