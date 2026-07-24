<script setup lang="ts">
import SlideShell from './SlideShell.vue'
import SlideHeader from './SlideHeader.vue'
import JsonCard from './JsonCard.vue'

const pipelineJson = `{
  "description": "Patent hybrid search pipeline",
  "phase_results_processors": [
    {
      "normalization-processor": {
        "normalization": {
          "technique": "min_max"
        },
        "combination": {
          "technique": "arithmetic_mean",
          "parameters": {
            "weights": [0.4, 0.3, 0.3]
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
      title="Normalization Processor 深潛與配置"
      subtitle="Score-Based：分數正規化 + 加權平均二階段合成機制 (OpenSearch 2.10+)"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-1">
      <!-- Left Column: Architecture & Rules (6 cols) -->
      <div class="lg:col-span-6 space-y-3">
        <div class="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
          <div class="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2">
            <span class="size-2 rounded-full bg-emerald-400" />
            兩階段處理邏輯 (Two-Stage Execution)
          </div>
          <div class="space-y-2 text-xs">
            <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
              <span class="font-bold text-white font-mono">1. Normalization (正規化)</span>
              <p class="text-zinc-300 text-[11px]">將各路子查詢 (BM25 (Best Matching 25), Dense 向量, Multi-Vector) 的得分拉升至統一可比尺度 (如 [0, 1])。</p>
            </div>
            <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
              <span class="font-bold text-white font-mono">2. Combination (分數加權合併)</span>
              <p class="text-zinc-300 text-[11px]">將各路正規化分數依權重比例 <code class="text-amber-300 font-mono">weights</code> 融合算出 Final Score (最終得分)。</p>
            </div>
          </div>
        </div>

        <div class="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] space-y-2 text-xs">
          <div class="font-mono font-bold text-amber-400">⚠️ weights 配置三大金律</div>
          <ul class="space-y-1 text-zinc-300 list-disc list-inside text-[11px]">
            <li><strong class="text-white">長度匹配</strong>：<code class="text-amber-300 font-mono">weights</code> 陣列長度必須等於子查詢數量。</li>
            <li><strong class="text-white">總和約束</strong>：所有權重總和必須嚴格等於 <code class="text-emerald-400 font-mono">1.0</code>（例如 0.4 + 0.3 + 0.3）。</li>
            <li><strong class="text-white">預設值</strong>：若省略 weights 欄位，系統預設為全路等權重。</li>
          </ul>
        </div>
      </div>

      <!-- Right Column: JSON Pipeline (6 cols) -->
      <div class="lg:col-span-6 space-y-2">
        <div class="text-xs font-mono font-bold text-white flex items-center justify-between">
          <span>Search Pipeline REST (Representational State Transfer) API 定義</span>
          <span class="text-emerald-400 text-[10px]">OpenSearch 2.10+</span>
        </div>
        <JsonCard method="PUT" path="/_search/pipeline/patent-hybrid" :code="pipelineJson" />
      </div>
    </div>
  </SlideShell>
</template>
