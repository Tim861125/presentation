<script setup lang="ts">
import SlideShell from './SlideShell.vue'
import SlideHeader from './SlideHeader.vue'
import JsonCard from './JsonCard.vue'

const mappingConfig = `{
  "settings": {
    "index": {
      "similarity": {
        "custom_patent_bm25": {
          "type": "BM25",
          "k1": 1.2,
          "b": 0.75
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "title": { "type": "text", "similarity": "custom_patent_bm25" },
      "abstract": { "type": "text", "similarity": "custom_patent_bm25" },
      "claims": { "type": "text", "similarity": "custom_patent_bm25" }
    }
  }
}`
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Part 1 · BM25 演算法"
      title="k₁ 飽和曲線與 b 長度正規化"
      subtitle="調校 k₁ 與 b 參數，掌控關鍵字排名的飽和度與文件長度懲罰"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-1">
      <!-- Left Column: k1 & b deep dive (7 cols) -->
      <div class="lg:col-span-7 space-y-3">
        <!-- k1 Box -->
        <div class="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-2">
          <div class="flex items-center justify-between text-amber-400 font-bold text-xs font-mono">
            <span>k₁ 參數：TF (Term Frequency, 詞頻) 飽和度 (預設 1.2)</span>
            <span>tf_saturated = tf × (k₁ + 1) / (tf + k₁)</span>
          </div>
          <div class="grid grid-cols-3 gap-2 text-[11px]">
            <div class="p-2 rounded bg-black/40 border border-white/5">
              <span class="text-amber-300 font-mono font-bold">k₁ = 0</span>
              <p class="text-zinc-400 text-[10.5px]">完全不看詞頻，只要出現一次即得分（Binary Match）</p>
            </div>
            <div class="p-2 rounded bg-black/40 border border-white/5">
              <span class="text-amber-300 font-mono font-bold">k₁ = 1.2 (預設)</span>
              <p class="text-zinc-400 text-[10.5px]">雙曲線飽和，得分上限限制在 2.2 倍基礎分內</p>
            </div>
            <div class="p-2 rounded bg-black/40 border border-white/5">
              <span class="text-amber-300 font-mono font-bold">k₁ → ∞</span>
              <p class="text-zinc-400 text-[10.5px]">退化為傳統線性 TF (Term Frequency)，出現 100 次即獲得 100 倍高分</p>
            </div>
          </div>
        </div>

        <!-- b Box -->
        <div class="p-3.5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 space-y-2">
          <div class="flex items-center justify-between text-cyan-400 font-bold text-xs font-mono">
            <span>b 參數：Document Length Normalization (長度正規化, 預設 0.75)</span>
            <span>length_norm = 1 - b + b × (dl / avgdl)</span>
          </div>
          <div class="grid grid-cols-3 gap-2 text-[11px]">
            <div class="p-2 rounded bg-black/40 border border-white/5">
              <span class="text-cyan-300 font-mono font-bold">b = 0</span>
              <p class="text-zinc-400 text-[10.5px]">完全忽略文件長度，長文章自然高詞頻大獲全勝</p>
            </div>
            <div class="p-2 rounded bg-black/40 border border-white/5">
              <span class="text-cyan-300 font-mono font-bold">b = 0.75 (預設)</span>
              <p class="text-zinc-400 text-[10.5px]">長度 dl (Document Length) > avgdl (Average Document Length) 時分母放大，適度懲罰長篇專利</p>
            </div>
            <div class="p-2 rounded bg-black/40 border border-white/5">
              <span class="text-cyan-300 font-mono font-bold">b = 1.0</span>
              <p class="text-zinc-400 text-[10.5px]">完全成反比正規化，對短專利標題極度有利</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: OpenSearch Mapping JSON (5 cols) -->
      <div class="lg:col-span-5 space-y-2">
        <div class="text-xs font-mono font-bold text-white flex items-center justify-between">
          <span>OpenSearch Index Similarity 設定</span>
          <span class="text-emerald-400 text-[10px]">custom_bm25</span>
        </div>
        <JsonCard method="PUT" path="/patent" :code="mappingConfig" />
      </div>
    </div>
  </SlideShell>
</template>
