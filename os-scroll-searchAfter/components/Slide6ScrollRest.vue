<script setup lang="ts">
const firstBatch = `{
  "size": 10000
}`
const nextBatch = `{
  "scroll": "10m",
  "scroll_id": "DXF1ZXJ5QW5kRmV0Y2gB..."
}`
const closeScroll = `{
  // DELETE _search/scroll/{scroll_id}
  // DELETE _search/scroll/_all
}
// → { "succeeded": true, "num_freed": 1 }`
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Scroll · REST"
      title="Scroll 用法：首批、續批、釋放"
      subtitle="首批帶 scroll 參數，之後每批只交 id，用完手動釋放"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-1">
      <div class="lg:col-span-7 space-y-3">
        <JsonCard method="GET" path="/shakespeare/_search?scroll=10m" title="首批 — 註冊 context，拿第一批" :code="firstBatch" />
        <JsonCard method="GET" path="/_search/scroll" title="續批 — 不帶 query，只交 id" :code="nextBatch" />
        <JsonCard method="DELETE" path="/_search/scroll/_all" title="釋放 — context 提早歸還記憶體" :code="closeScroll" />
      </div>

      <div class="lg:col-span-5 space-y-3">
        <div class="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 space-y-2">
          <div class="text-xs font-mono font-bold text-rose-400 flex items-center gap-2">
            <span class="size-2 rounded-full bg-rose-400 animate-pulse" /> 必記兩件事
          </div>
          <ul class="text-[11px] text-zinc-300 space-y-2 list-disc list-inside">
            <li><strong class="text-white">scroll_id 可能會換</strong>：每次都存回應裡最新的那個。</li>
            <li><strong class="text-white">務必手動 close</strong>：否則 context 佔著記憶體直到逾時。</li>
          </ul>
        </div>
        <div class="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] space-y-2 text-xs">
          <div class="font-mono font-bold text-amber-400">資源上限</div>
          <p class="text-[11px] text-zinc-300 leading-relaxed">
            節點 <code class="text-amber-300 font-mono">search.max_open_scrolls</code> 預設 <strong class="text-white">500</strong>；耗盡後新請求直接報錯。每個 open context 都佔 segment 記憶體與 heap。
          </p>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
