<script setup lang="ts">

const rrfPipelineJson = `{
  "description": "Patent hybrid RRF pipeline",
  "phase_results_processors": [
    {
      "score-ranker-processor": {
        "combination": {
          "technique": "rrf",
          "rank_constant": 60,
          "parameters": {
            "weights": [0.6, 0.4]
          }
        }
      }
    }
  ]
}`
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Part 2 · Phase Results Processors"
      title="Score Ranker Processor (RRF) 深潛"
      subtitle="Rank-Based：Reciprocal Rank Fusion (RRF, 倒數排名融合) 機制 (OpenSearch 2.19+)"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-1">
      <!-- Left Column: Math & Example (6 cols) -->
      <div class="lg:col-span-6 space-y-3">
        <!-- RRF Formula Box -->
        <div class="p-3.5 rounded-xl border border-blue-500/30 bg-black/60 space-y-1.5">
          <div class="flex items-center justify-between text-xs font-mono text-blue-400 font-bold">
            <span>RRF 得分公式</span>
            <span class="text-zinc-500">Reciprocal Rank Fusion (倒數排名融合)</span>
          </div>
          <div class="p-2 rounded bg-zinc-900 border border-white/10 font-mono text-xs text-blue-300 text-center">
            RRF_score(d) = Σ<sub>i</sub> [ 1 / ( <span class="text-amber-300">k</span> + <span class="text-emerald-300">rank<sub>i</sub>(d)</span> ) ]
          </div>
        </div>

        <!-- Calculation Example -->
        <div class="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] space-y-2 text-xs">
          <div class="font-mono font-bold text-emerald-400">實例算式示範 (k = 60)</div>
          <div class="space-y-1.5 font-mono text-[11px]">
            <div class="p-2 rounded bg-black/40 border border-white/5 space-y-1">
              <div class="text-white font-bold">文件 A：BM25 (Best Matching 25) 排名 #2，向量 排名 #1</div>
              <div class="text-emerald-300">RRF(A) = 1/(60+2) + 1/(60+1) = 0.01613 + 0.01639 = 0.03252</div>
            </div>
            <div class="p-2 rounded bg-black/40 border border-white/5 space-y-1">
              <div class="text-zinc-400 font-bold">文件 B：BM25 (Best Matching 25) 排名 #1，向量 排名 #5</div>
              <div class="text-zinc-400">RRF(B) = 1/(60+1) + 1/(60+5) = 0.01639 + 0.01538 = 0.03177</div>
            </div>
          </div>
          <p class="text-[10.5px] text-emerald-400/90 font-medium">👉 文件 A 勝出！因為雙路名次均位於最頂尖。</p>
        </div>

        <!-- rank_constant Table -->
        <div class="p-2.5 rounded-xl border border-white/10 bg-black/40 text-[11px]">
          <div class="font-mono text-amber-400 font-bold mb-1">rank_constant (k) 調校影響</div>
          <div class="grid grid-cols-3 gap-1.5 text-[10.5px]">
            <div class="p-1.5 rounded bg-white/5">
              <span class="text-amber-300 font-mono font-bold">k = 10–30</span>
              <p class="text-zinc-400">極度看重第 1 名，前段名次分水嶺大</p>
            </div>
            <div class="p-1.5 rounded bg-white/5">
              <span class="text-emerald-300 font-mono font-bold">k = 60 (預設)</span>
              <p class="text-zinc-400">平滑穩定，兼顧首頁與前 20 名</p>
            </div>
            <div class="p-1.5 rounded bg-white/5">
              <span class="text-blue-300 font-mono font-bold">k = 100+</span>
              <p class="text-zinc-400">縮小名次差距，名次打分趨向等權</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Pipeline JSON (6 cols) -->
      <div class="lg:col-span-6 space-y-2">
        <div class="text-xs font-mono font-bold text-white flex items-center justify-between">
          <span>Score Ranker Pipeline API</span>
          <span class="text-blue-400 text-[10px]">OpenSearch 2.19+</span>
        </div>
        <JsonCard method="PUT" path="/_search/pipeline/rrf-pipeline" :code="rrfPipelineJson" />
      </div>
    </div>
  </SlideShell>
</template>
