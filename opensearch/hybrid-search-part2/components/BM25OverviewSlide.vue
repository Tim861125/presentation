<script setup lang="ts">
import SlideShell from './SlideShell.vue'
import SlideHeader from './SlideHeader.vue'
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Part 1 · BM25 演算法"
      title="什麼是 BM25？關鍵字排名的基石"
      subtitle="BM25 (Best Matching 25) 是現代搜尋引擎最主流的全文檢索相關度打分演算法"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
      <!-- Card 1: 定義與地位 -->
      <div class="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
        <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <div class="size-6 rounded-lg bg-emerald-500/20 flex items-center justify-center font-mono text-xs">01</div>
          核心定義 & 預設演算法
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          <strong class="text-white">BM25 (Best Matching 25)</strong> 是由 Stephen Robertson 與 Hugo Zaragoza 等人發明的概率檢索模型，OpenSearch 及 Elasticsearch 自 5.x 起預設選用。
        </p>
        <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-emerald-300/90 font-mono">
          「25」代表它是 Okapi BM (Best Match) 演算法系列第 25 次改進迭代版。
        </div>
      </div>

      <!-- Card 2: 解決問題 -->
      <div class="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 space-y-3">
        <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">
          <div class="size-6 rounded-lg bg-blue-500/20 flex items-center justify-center font-mono text-xs">02</div>
          解決傳統 TF-IDF 兩大痛點
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li><strong class="text-white">詞頻爆炸 (TF / Term Frequency Unbounded)</strong>：傳統 TF-IDF (Term Frequency - Inverse Document Frequency) 出現 100 次得分為 100 倍，不合理。BM25 設有雙曲線飽和上限。</li>
          <li><strong class="text-white">長篇優勢 (Document Length Bias / 文件長度偏差)</strong>：長文章自然詞頻偏高。BM25 根據全庫平均長度 (avgdl) 進行長度正規化。</li>
        </ul>
      </div>

      <!-- Card 3: 三大核心組件 -->
      <div class="p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 space-y-3">
        <div class="flex items-center gap-2 text-purple-400 font-bold text-sm">
          <div class="size-6 rounded-lg bg-purple-500/20 flex items-center justify-center font-mono text-xs">03</div>
          BM25 得分三大支柱
        </div>
        <div class="space-y-2 text-xs">
          <div class="p-2 rounded bg-black/40 border border-white/5">
            <span class="text-purple-300 font-mono font-semibold">1. IDF (Inverse Document Frequency, 逆文件頻率)</span>: 越罕見的詞，得分權重越高
          </div>
          <div class="p-2 rounded bg-black/40 border border-white/5">
            <span class="text-purple-300 font-mono font-semibold">2. TF Saturated (Term Frequency, 詞頻飽和 k1)</span>: 詞頻雙曲線飽和，設有得分上限
          </div>
          <div class="p-2 rounded bg-black/40 border border-white/5">
            <span class="text-purple-300 font-mono font-semibold">3. Length Norm (Document Length Norm, 長度正規化 b)</span>: 依據文件長度比例適度懲罰長文
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom summary banner -->
    <div class="mt-4 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between text-xs">
      <div class="flex items-center gap-2 text-zinc-300">
        <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">專利搜尋範例</span>
        查詢 <code class="text-amber-300 font-mono bg-black/40 px-1.5 py-0.5 rounded">"smart office"</code> 時，BM25 會精準計算 "smart" 與 "office" 在專利內文中的 IDF 與 TF 飽和得分。
      </div>
      <div class="text-zinc-500 font-mono text-[11px]">Lucene BM25Similarity</div>
    </div>
  </SlideShell>
</template>
