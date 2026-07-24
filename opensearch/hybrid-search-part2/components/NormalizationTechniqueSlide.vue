<script setup lang="ts">
import SlideShell from './SlideShell.vue'
import SlideHeader from './SlideHeader.vue'
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Part 3 · Normalization & Combination"
      title="三種分數正規化技術 (Normalization Techniques)"
      subtitle="將 BM25 (Best Matching 25) 與向量搜尋等不同維度的分數映射至統一尺度的數學機制"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
      <!-- Technique 1: min_max -->
      <div class="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-emerald-400 font-mono font-bold text-sm">1. min_max (Min-Max, 預設)</span>
          <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">[0, 1] 縮放</span>
        </div>
        <div class="p-2.5 rounded bg-black/60 border border-white/10 font-mono text-[11px] text-emerald-300 text-center">
          (x - min) / (max - min)
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          將該路子查詢的最低分映為 0.0、最高分映為 1.0。最直觀易懂。
        </p>

        <!-- Bounds feature -->
        <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1 text-[11px]">
          <div class="text-amber-300 font-mono font-semibold">💡 支援 Bounds 截斷控管</div>
          <p class="text-zinc-400 text-[10.5px]">
            可設 <code class="text-emerald-400 font-mono">apply</code> (自訂 min/max)、<code class="text-emerald-400 font-mono">clip</code> (極限截斷) 或 <code class="text-emerald-400 font-mono">ignore</code>。
          </p>
        </div>
      </div>

      <!-- Technique 2: l2 -->
      <div class="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-blue-400 font-mono font-bold text-sm">2. l2 (Euclidean Norm / L2 範數)</span>
          <span class="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono">L2 Norm = 1</span>
        </div>
        <div class="p-2.5 rounded bg-black/60 border border-white/10 font-mono text-[11px] text-blue-300 text-center">
          x_i / sqrt( Σ x_j² )
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          除以整體分數向量的 L2 範數 (Euclidean Norm, 歐氏距離)，維護分數之間的相對比例關係。
        </p>
        <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1 text-[11px]">
          <div class="text-blue-300 font-mono font-semibold">🎯 適用情境</div>
          <p class="text-zinc-400 text-[10.5px]">
            當各路得分之間的比例放大縮小關係比絕對邊界值更重要時使用。
          </p>
        </div>
      </div>

      <!-- Technique 3: z_score -->
      <div class="p-4 rounded-xl border border-purple-500/30 bg-purple-500/5 space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-purple-400 font-mono font-bold text-sm">3. z_score (Z-Score Standard Score)</span>
          <span class="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono">μ=0, σ=1</span>
        </div>
        <div class="p-2.5 rounded bg-black/60 border border-white/10 font-mono text-[11px] text-purple-300 text-center">
          (x - μ) / σ
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          以平均數 μ (Mean) 為中心、標準差 σ (Standard Deviation) 為單位轉換。免疫離群極端高分。
        </p>

        <!-- Important constraint -->
        <div class="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 space-y-1 text-[11px]">
          <div class="text-rose-400 font-mono font-bold">⚠️ 硬性約束條款</div>
          <p class="text-zinc-300 text-[10.5px]">
            <strong class="text-white">只支援 arithmetic_mean</strong>！不可搭配 geometric 或 harmonic mean。
          </p>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
