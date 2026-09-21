<script setup lang="ts">
const slicePit = `{
  "size": 50000,
  "slice": { "id": 0, "max": 5 },
  "pit": { "id": "<pit_id>", "keep_alive": "100m" },
  "sort": [{ "line_id": "asc" }],
  "search_after": [14186]
}`
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="PIT · Slicing"
      title="PIT 版 Search Slicing：快照 + 並行"
      subtitle="像 Scroll 一樣並行拉全量，又保留 PIT 的快照語義"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-1">
      <div class="lg:col-span-6 space-y-3">
        <div class="p-3.5 rounded-xl border border-indigo-500/20 bg-indigo-500/5 space-y-2">
          <div class="text-xs font-mono font-bold text-indigo-400 flex items-center gap-2">
            <span class="size-2 rounded-full bg-indigo-400" /> 新版 OpenSearch 的 PIT search 也支援 slice
          </div>
          <ul class="text-[11px] text-zinc-300 space-y-1.5 list-disc list-inside">
            <li>1,000,000 筆 × 50,000／批，切 5 個 slice × 5 條線程平行消費</li>
            <li>取代單一長串串行呼叫，同時維持快照一致性</li>
            <li>每個 slice 仍共用同一個 pit_id，各自帶自己的 search_after</li>
          </ul>
        </div>
        <div class="p-3 rounded-xl border border-white/10 bg-white/[0.02] flex items-center gap-2 text-xs text-zinc-300">
          <span class="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono text-[10px]">匯流</span>
          Scroll slicing 與 PIT 的甜點在這裡會合：全量匯出也能吃到新分頁架構。
        </div>
      </div>

      <div class="lg:col-span-6 space-y-2">
        <div class="text-xs font-mono font-bold text-white">Slice 請求（在 PIT 分頁請求上加 slice）</div>
        <JsonCard method="GET" path="/_search" :code="slicePit" />
        <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-zinc-400">
          <code class="text-indigo-300 font-mono">slice.id</code> 逐 1 遞增（0～max−1），每條線程從自己的 slice 起點開始翻。
        </div>
      </div>
    </div>
  </SlideShell>
</template>
