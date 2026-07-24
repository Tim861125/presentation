<script setup lang="ts">
import SlideShell from './SlideShell.vue'
import SlideHeader from './SlideHeader.vue'
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Part 1 · BM25 演算法"
      title="BM25 數學公式與符號拆解"
      subtitle="雙曲線飽和與長度正規化的精巧融合"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-2">
      <!-- Left Column: Formulas (7 cols) -->
      <div class="lg:col-span-7 space-y-3">
        <!-- Main Formula Box -->
        <div class="p-4 rounded-xl border border-emerald-500/30 bg-black/60 shadow-lg space-y-2">
          <div class="flex items-center justify-between text-xs font-mono text-emerald-400">
            <span class="font-bold">BM25 (Best Matching 25) 總得分公式 Score(d, q)</span>
            <span class="text-zinc-500">Okapi BM25</span>
          </div>
          <div class="p-3 rounded-lg bg-zinc-900/90 border border-white/10 font-mono text-xs md:text-sm text-emerald-300 text-center overflow-x-auto leading-relaxed">
            Score(d, q) = Σ<sub>t ∈ q</sub> [ IDF(t) × <span class="text-amber-300">tf(t, d) × (k₁ + 1)</span> / (<span class="text-amber-300">tf(t, d)</span> + <span class="text-cyan-300">k₁ × (1 - b + b × dl / avgdl)</span>) ]
          </div>
        </div>

        <!-- IDF Formula Box -->
        <div class="p-4 rounded-xl border border-blue-500/30 bg-black/60 shadow-lg space-y-2">
          <div class="flex items-center justify-between text-xs font-mono text-blue-400">
            <span class="font-bold">IDF(t) 逆文件頻率 (Inverse Document Frequency) 公式 (Lucene 實作)</span>
            <span class="text-zinc-500">Smoothed IDF</span>
          </div>
          <div class="p-3 rounded-lg bg-zinc-900/90 border border-white/10 font-mono text-xs text-blue-300 text-center overflow-x-auto">
            IDF(t) = ln( 1 + ( N - df(t) + 0.5 ) / ( df(t) + 0.5 ) )
          </div>
          <p class="text-[11px] text-zinc-400 leading-relaxed">
            當詞 $t$ 在極多文件中出現（如「的」、「在」），df(t) (Document Frequency, 文件頻率) ≈ N (全庫文件數) → IDF ≈ 0；當詞極為稀有（如專利專有技術詞），df(t) 很小 → IDF 高。
          </p>
        </div>
      </div>

      <!-- Right Column: Symbol Breakdown (5 cols) -->
      <div class="lg:col-span-5 p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
        <div class="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span class="size-2 rounded-full bg-emerald-400" />
          符號與物理意義對照
        </div>

        <div class="space-y-2 text-xs">
          <div class="p-2 rounded bg-black/40 border border-white/5 flex items-start justify-between">
            <span class="font-mono text-emerald-400 font-bold w-16">t & q</span>
            <span class="text-zinc-300 flex-1">查詢句 $q$ (Query) 分詞後的每個單詞 term $t$</span>
          </div>

          <div class="p-2 rounded bg-black/40 border border-white/5 flex items-start justify-between">
            <span class="font-mono text-blue-400 font-bold w-16">tf(t, d)</span>
            <span class="text-zinc-300 flex-1">TF (Term Frequency, 詞頻) — 詞 $t$ 在文件 $d$ (Document) 出現次數</span>
          </div>

          <div class="p-2 rounded bg-black/40 border border-white/5 flex items-start justify-between">
            <span class="font-mono text-cyan-400 font-bold w-16">dl / avgdl</span>
            <span class="text-zinc-300 flex-1">dl (Document Length, 文件長度) / avgdl (Average Document Length, 平均文件長度)</span>
          </div>

          <div class="p-2 rounded bg-black/40 border border-white/5 flex items-start justify-between">
            <span class="font-mono text-amber-400 font-bold w-16">k₁ = 1.2</span>
            <span class="text-zinc-300 flex-1">TF (Term Frequency) 飽和度控制係數 (預設 1.2)</span>
          </div>

          <div class="p-2 rounded bg-black/40 border border-white/5 flex items-start justify-between">
            <span class="font-mono text-purple-400 font-bold w-16">b = 0.75</span>
            <span class="text-zinc-300 flex-1">Length Norm (Document Length Normalization, 長度正規化) 懲罰係數 (預設 0.75)</span>
          </div>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
