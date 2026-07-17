<script setup lang="ts">
const normalization = [
  ['min_max', '預設，重新縮放到 [0,1]；可加 lower/upper bounds'],
  ['l2', 'L2 歐氏距離正規化'],
  ['z_score', '標準分數；只支援 arithmetic_mean'],
]
const combination = ['arithmetic_mean', 'geometric_mean', 'harmonic_mean']

const code = `{
  "normalization": { "technique": "min_max" },
  "combination": {
    "technique": "arithmetic_mean",
    "parameters": { "weights": [0.3, 0.7] }
  }
}`
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="normalization-processor"
      title="正規化 + 合併 + 權重"
      subtitle="normalize 決定分數怎麼拉齊尺度，combine 決定怎麼加權合成一分。"
    />

    <div class="grid grid-cols-2 gap-5 flex-1">
      <div class="flex flex-col gap-4">
        <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div class="text-[11px] font-mono uppercase tracking-wider text-emerald-400/80 mb-2">normalization.technique</div>
          <div class="space-y-2">
            <div v-for="n in normalization" :key="n[0]" class="flex gap-3 items-baseline">
              <span class="text-sm font-mono text-white w-20 shrink-0">{{ n[0] }}</span>
              <span class="text-xs text-zinc-400">{{ n[1] }}</span>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div class="text-[11px] font-mono uppercase tracking-wider text-blue-400/80 mb-2">combination.technique</div>
          <div class="flex flex-wrap gap-2">
            <span v-for="c in combination" :key="c"
                  class="text-xs font-mono rounded-md border border-white/10 bg-black/30 px-2.5 py-1 text-zinc-200">
              {{ c }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <JsonCard method="PUT" path="/_search/pipeline/nlp-search-pipeline" :code="code" />

        <div class="rounded-xl border border-amber-500/20 bg-amber-500/[0.05] p-4">
          <div class="text-[11px] font-mono uppercase tracking-wider text-amber-400/90 mb-2">weights 規則 & 調校</div>
          <ul class="space-y-1.5 text-sm text-zinc-200">
            <li class="flex gap-2">
              <span class="text-amber-400 shrink-0">•</span>
              <span>陣列長度 = 子查詢數，<span class="text-white font-semibold">總和需為 1.0</span></span>
            </li>
            <li class="flex gap-2">
              <span class="text-amber-400 shrink-0">•</span>
              <span>值越接近 1.0，該路影響越大；省略則等權重</span>
            </li>
            <li class="flex gap-2">
              <span class="text-amber-400 shrink-0">•</span>
              <span>sample size 建議 <span class="font-mono text-white">100–200</span>（資料量 ≤ 10M），過大只增延遲</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
