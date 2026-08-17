<script setup lang="ts">
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Part 4 · 台灣專利多向量實戰"
      title="台灣專利「一專利多向量」三種儲存架構與 MRR 評測"
      subtitle="TAC (Title, Abstract, Claims, 專利名稱/摘要/請求項) + 人名/公司名向量與 CJK (Chinese, Japanese, Korean, 中日韓) BM25 的三種 OpenSearch 架構評測"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 mt-1">
      <!-- 3 Architectures Cards (9 cols) -->
      <div class="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-3">
        <!-- 1. Twofield Mode -->
        <div class="p-3 rounded-xl border border-white/10 bg-black/40 space-y-2 text-xs flex flex-col justify-between">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-white font-mono">1. Twofield 模式</span>
              <span class="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 text-[10px]">3 臂查詢</span>
            </div>
            <p class="text-zinc-300 text-[11px] leading-relaxed">
              1 Document 包含獨立雙頂層欄位：<code class="text-emerald-400 font-mono">embedding</code> (TAC) 與 <code class="text-blue-400 font-mono">nameEmbedding</code> (名稱)。
            </p>
            <div class="p-2 rounded bg-white/[0.03] border border-white/5 font-mono text-[10px] text-zinc-400">
              BM25 + k-NN(TAC) + k-NN(Name)
            </div>
          </div>
          <div class="p-2 rounded bg-blue-500/10 border border-blue-500/30 text-[10.5px] text-blue-300">
            MRR (Mean Reciprocal Rank): <strong>0.860</strong> (加入 CJK BM25 後從 0.53 暴升)
          </div>
        </div>

        <!-- 2. Nested Mode (Winner) -->
        <div class="p-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 space-y-2 text-xs flex flex-col justify-between shadow-lg">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-emerald-300 font-mono flex items-center gap-1">
                <span>🏆 2. Nested 模式</span>
              </span>
              <span class="px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-200 text-[10px] font-bold">2 臂查詢 (最佳)</span>
            </div>
            <p class="text-zinc-200 text-[11px] leading-relaxed">
              1 Document 包含 Nested 陣列 <code class="text-emerald-300 font-mono">vectors:[{kind, vec}]</code>，搭配 <code class="text-amber-300 font-mono">score_mode:"max"</code>。
            </p>
            <div class="p-2 rounded bg-black/50 border border-emerald-500/30 font-mono text-[10px] text-emerald-300">
              BM25 + Nested k-NN (k-Nearest Neighbors, score_mode: max)
            </div>
          </div>
          <div class="p-2 rounded bg-emerald-500/20 border border-emerald-400/50 text-[10.5px] text-emerald-200 font-bold">
            MRR (Mean Reciprocal Rank) 冠軍: <strong>0.907 ~ 0.921</strong> (架構最簡潔)
          </div>
        </div>

        <!-- 3. MultiDoc Mode -->
        <div class="p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-2 text-xs flex flex-col justify-between opacity-80">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="font-bold text-rose-300 font-mono">❌ 3. MultiDoc 模式</span>
              <span class="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px]">Collapse 折疊</span>
            </div>
            <p class="text-zinc-300 text-[11px] leading-relaxed">
              1 專利拆為 2 Documents，查詢時透過 OpenSearch <code class="text-rose-300 font-mono">collapse</code> 去重。
            </p>
            <div class="p-2 rounded bg-white/[0.03] border border-white/5 font-mono text-[10px] text-zinc-400">
              BM25 + k-NN + Collapse patentId
            </div>
          </div>
          <div class="p-2 rounded bg-rose-500/20 border border-rose-500/30 text-[10.5px] text-rose-300">
            不建議：空間膨脹 2 倍，且 Collapse 大幅破壞深層召回
          </div>
        </div>
      </div>

      <!-- Right Column: Key Takeaway Summary (3 cols) -->
      <div class="lg:col-span-3 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] space-y-2.5 text-xs">
        <div class="font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <span class="size-2 rounded-full bg-emerald-400" />
          實測結論對比 Summary
        </div>

        <div class="space-y-2 text-[11px]">
          <div class="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
            <strong class="text-white">Nested 2 臂組合</strong>：以 <code class="text-amber-300 font-mono">score_mode: max</code> 原生融合多向量，MRR (Mean Reciprocal Rank) 突破 0.92，為企業級台灣專利最佳解。
          </div>
          <div class="p-2 rounded bg-blue-500/10 border border-blue-500/30 text-blue-300">
            <strong class="text-white">CJK (Chinese, Japanese, Korean) 分詞效益</strong>：Applicants/Assignees 加上 <code class="text-cyan-300 font-mono">cjk_html</code> 分詞器大幅提升精確匹配得分。
          </div>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
