<script setup lang="ts">
import SlideShell from './SlideShell.vue'
import SlideHeader from './SlideHeader.vue'
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Part 1 · BM25 演算法"
      title="BM25 vs TF-IDF 比較與 BM25 限制"
      subtitle="為何單靠 BM25 不夠？字面匹配的天然盲點與 Hybrid (混合搜尋) 雙引擎需求"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-2">
      <!-- Left Column: Comparison Table (6 cols) -->
      <div class="lg:col-span-6 space-y-3">
        <div class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
          BM25 (Best Matching 25) vs TF-IDF (Term Frequency - Inverse Document Frequency) 演算法對比
        </div>
        <div class="rounded-xl border border-white/10 overflow-hidden bg-black/40 text-xs">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-white/10 bg-white/[0.04] text-zinc-300 font-mono">
                <th class="p-2.5">比較維度</th>
                <th class="p-2.5 text-zinc-400">TF-IDF (舊版)</th>
                <th class="p-2.5 text-emerald-400">BM25 (現代預設)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5 text-zinc-300">
              <tr>
                <td class="p-2.5 font-medium text-white">TF (Term Frequency) 飽和</td>
                <td class="p-2.5 text-rose-400/90">無，線性無限成長</td>
                <td class="p-2.5 text-emerald-300">有，k₁ 控制上限</td>
              </tr>
              <tr>
                <td class="p-2.5 font-medium text-white">Document Length Normalization (長度正規化)</td>
                <td class="p-2.5 text-rose-400/90">無（或僅向量模長）</td>
                <td class="p-2.5 text-emerald-300">有，b 依 avgdl 正規化</td>
              </tr>
              <tr>
                <td class="p-2.5 font-medium text-white">可調參數</td>
                <td class="p-2.5 text-zinc-400">無（固化）</td>
                <td class="p-2.5 text-emerald-300 font-mono">k₁ (1.2), b (0.75)</td>
              </tr>
              <tr>
                <td class="p-2.5 font-medium text-white">預設時期</td>
                <td class="p-2.5 text-zinc-400">ES (Elasticsearch) 2.x / Lucene 5 之前</td>
                <td class="p-2.5 text-emerald-300 font-semibold">OpenSearch & ES 5.x+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right Column: Limitations & Hybrid Need (6 cols) -->
      <div class="lg:col-span-6 space-y-3">
        <div class="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
          BM25 的 4 大盲點 (為何需要 Hybrid 混合搜尋)
        </div>

        <div class="space-y-2 text-xs">
          <div class="p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-1">
            <div class="font-bold text-rose-400 flex items-center gap-1.5">
              <span>❌ 1. 嚴格字面依賴 (Lexical Gap / 字面鴻溝)</span>
            </div>
            <p class="text-zinc-300 leading-relaxed text-[11px]">
              專利查詢 <code class="text-amber-300 font-mono">"smart office"</code> 查不到寫著「智慧辦公室」或「智能工作空間」的台灣專利，完全無詞頻重疊。
            </p>
          </div>

          <div class="p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-1">
            <div class="font-bold text-rose-400 flex items-center gap-1.5">
              <span>❌ 2. 缺乏語意概念理解 (Lack of Semantic Understanding)</span>
            </div>
            <p class="text-zinc-300 leading-relaxed text-[11px]">
              無法識別「半導體封裝技術」與「晶片立體整合」在概念上的近義關係。
            </p>
          </div>

          <div class="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-1">
            <div class="font-bold text-amber-400 flex items-center gap-1.5">
              <span>💡 雙引擎互補 (Hybrid Solution / 混合搜尋解法)</span>
            </div>
            <p class="text-zinc-300 leading-relaxed text-[11px]">
              <strong class="text-emerald-400">BM25 關鍵字 (精確度)</strong> + <strong class="text-blue-400">Neural 向量 (泛化與語意)</strong>，由 OpenSearch Pipeline 結合打分！
            </p>
          </div>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
