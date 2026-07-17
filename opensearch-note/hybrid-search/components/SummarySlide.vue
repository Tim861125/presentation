<script setup lang="ts">
const recap = [
  ['心智模型', '合併發生在 search pipeline 的 phase_results_processor，不在查詢裡'],
  ['兩種處理器', 'normalization（分數制）｜ score-ranker（RRF 排名制），二選一'],
  ['貫穿範例', 'patent-hybrid：match tac + neural title / claims，weights [0.4, 0.3, 0.3]'],
]

const decisions = [
  ['要不要 hybrid？', '同時需要精確詞命中 + 語意召回時就用'],
  ['選哪個處理器？', '要細調權重 → normalization；尺度難統一 → RRF'],
  ['pre 還是 post？', '先縮範圍 → pre-filter；要保留 facet 全集 → post-filter'],
  ['調校', 'sample size 100–200；weights 總和 = 1.0；RRF 調 rank_constant'],
]
</script>

<template>
  <SlideShell>
    <SlideHeader eyebrow="Summary" title="重點回顧 & 決策清單" />

    <div class="grid grid-cols-2 gap-5 flex-1">
      <div class="flex flex-col gap-3">
        <div class="text-[11px] font-mono uppercase tracking-wider text-emerald-400/80">Recap</div>
        <div v-for="r in recap" :key="r[0]"
             class="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div class="text-sm font-semibold text-white mb-0.5">{{ r[0] }}</div>
          <div class="text-xs text-zinc-400">{{ r[1] }}</div>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <div class="text-[11px] font-mono uppercase tracking-wider text-blue-400/80">Decisions</div>
        <div v-for="d in decisions" :key="d[0]"
             class="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex gap-3">
          <span class="text-blue-400 font-mono">?</span>
          <div>
            <div class="text-sm font-semibold text-white mb-0.5">{{ d[0] }}</div>
            <div class="text-xs text-zinc-400">{{ d[1] }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
      <span>OpenSearch · Hybrid Search</span>
      <span class="text-emerald-400">Thanks — Q&amp;A</span>
    </div>
  </SlideShell>
</template>
