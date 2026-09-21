<script setup lang="ts">
const sliceJson = `{
  "slice": { "id": 0, "max": 10 },
  "query": { "match_all": {} }
}`
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Scroll · Slicing"
      title="Sliced Scroll：並行加速全量掃描"
      subtitle="把一條長串串行掃描，切成 N 條平行線程"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-1">
      <div class="lg:col-span-6 space-y-3">
        <div class="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] space-y-2.5">
          <div class="text-xs font-mono font-bold text-rose-400">串行：1,000,000 筆 × 每批 50,000</div>
          <div class="flex items-center gap-1">
            <span v-for="n in 20" :key="n" class="h-2.5 flex-1 rounded-sm bg-rose-500/40" />
          </div>
          <div class="text-[10px] text-zinc-500 font-mono">20 次串行請求，一條線程慢慢掃</div>
          <div class="text-xs font-mono font-bold text-emerald-400 pt-1">切片：10 slices × 10 條線程</div>
          <div class="space-y-1">
            <div v-for="n in 4" :key="n" class="flex items-center gap-1">
              <span class="w-14 text-[9px] font-mono text-zinc-500 shrink-0">slice {{ n - 1 }}</span>
              <span class="h-2.5 flex-1 rounded-sm bg-emerald-500/50" />
              <span class="h-2.5 flex-1 rounded-sm bg-emerald-500/50" />
              <span class="w-8 text-[9px] font-mono text-zinc-600 shrink-0">×2 批</span>
            </div>
            <div class="text-[10px] text-zinc-600 font-mono pl-[60px]">⋯ slice 4~9 同形，共 10 條線程</div>
          </div>
        </div>
        <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-zinc-400">
          每個 slice 各開一個 scroll context（記憶體 ×N），<code class="text-emerald-300 font-mono">id</code> 逐 1 遞增。
        </div>
      </div>

      <div class="lg:col-span-6 space-y-3">
        <JsonCard method="GET" path="/shakespeare/_search?scroll=10m" title="首批帶 slice 參數" :code="sliceJson" />
        <div class="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
          <div class="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2">
            <span class="size-2 rounded-full bg-emerald-400" /> 適用場景
          </div>
          <ul class="text-[11px] text-zinc-300 space-y-1.5 list-disc list-inside">
            <li>ETL、全量重索引、備份匯出</li>
            <li>每條線程獨立持有自己的 scroll_id 平行消費</li>
            <li>吞吐量 ≈ 線程數，代價是 N 倍 context 記憶體</li>
          </ul>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
