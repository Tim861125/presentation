<script setup lang="ts">
const code = `{
  "score-ranker-processor": {
    "combination": {
      "technique": "rrf",
      "rank_constant": 40,
      "parameters": { "weights": [0.7, 0.3] }
    }
  }
}`
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="score-ranker-processor · RRF"
      title="Reciprocal Rank Fusion：只看名次"
      subtitle="每份文件在各路子查詢的名次取倒數再相加 —— 完全不看原始分數，對尺度差異天生免疫。"
    />

    <div class="grid grid-cols-2 gap-5 flex-1">
      <!-- RRF intuition -->
      <div class="rounded-xl border border-white/10 bg-white/[0.03] p-5 flex flex-col justify-center">
        <div class="text-[11px] font-mono uppercase tracking-wider text-blue-400/80 mb-4">直覺</div>

        <div class="font-mono text-center text-lg text-zinc-200 mb-1">
          score(<span class="text-emerald-400">d</span>) =
          <span class="text-white">Σ</span>
          <span class="inline-flex flex-col align-middle text-sm mx-1">
            <span class="border-b border-zinc-500 px-2">1</span>
            <span class="px-2">k + rank<sub>i</sub>(d)</span>
          </span>
        </div>
        <div class="text-xs text-zinc-500 text-center mb-5">k = rank_constant（預設 60）</div>

        <div class="rounded-lg border border-white/10 bg-black/30 p-3 text-xs font-mono text-zinc-300 space-y-1 mb-4">
          <div class="text-zinc-500">// 文件 d：BM25 第 2 名、向量 第 1 名，k=60</div>
          <div>1/(60+2) + 1/(60+1)</div>
          <div class="text-emerald-400">= 0.01613 + 0.01639 = 0.03252</div>
        </div>

        <p class="text-xs text-zinc-400">
          <span class="font-mono text-zinc-300">rank_constant</span> 越<span class="text-white">大</span>分數越均勻，越<span class="text-white">小</span>越偏重前段名次。
        </p>
      </div>

      <div class="flex flex-col gap-4">
        <JsonCard method="PUT" path="/_search/pipeline/rrf-pipeline" :code="code" />

        <div class="rounded-xl border border-blue-500/20 bg-blue-500/[0.06] p-4">
          <div class="text-[11px] font-mono uppercase tracking-wider text-blue-400/90 mb-2">何時選 RRF</div>
          <p class="text-sm text-zinc-200">
            各路分數尺度差異大、難以正規化調權重時，RRF 只信名次、無需調 min/max，通常更穩健、免調參。
          </p>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
