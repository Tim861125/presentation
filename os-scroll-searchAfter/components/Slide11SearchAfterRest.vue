<script setup lang="ts">
const page1 = `{
  "size": 3,
  "query": {
    "match": { "play_name": "Hamlet" }
  },
  "sort": [
    { "speech_number": "asc" },
    { "line_id": "asc" }
  ]
}`
const page2 = `{
  "size": 10,
  "search_after": [1, 32436],
  "query": {
    "match": { "play_name": "Hamlet" }
  },
  "sort": [
    { "speech_number": "asc" },
    { "line_id": "asc" }
  ]
}`
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="search_after · REST"
      title="search_after 用法"
      subtitle="第一頁正經排序，之後每一頁把最後一筆的 sort 值帶回來"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-1">
      <div class="lg:col-span-5 space-y-2">
        <div class="text-xs font-mono font-bold text-white flex items-center justify-between">
          <span>第一頁</span>
          <span class="text-sky-400 text-[10px]">sort 含唯一欄位 line_id</span>
        </div>
        <JsonCard method="GET" path="/shakespeare/_search" :code="page1" />
        <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-zinc-400">
          回應每筆 hit 都帶 <code class="text-sky-300 font-mono">"sort": [1, 32436]</code>，取最後一筆的值即可。
        </div>
      </div>

      <div class="lg:col-span-7 space-y-2">
        <div class="text-xs font-mono font-bold text-white flex items-center justify-between">
          <span>下一頁</span>
          <span class="text-amber-400 text-[10px]">sort 必須與上一頁完全一致</span>
        </div>
        <JsonCard method="GET" path="/shakespeare/_search" :code="page2" />
        <div class="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center gap-2 text-[11px] text-amber-200">
          <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px]">注意</span>
          每頁請求可以換 query，但 sort 組合一旦改變，游標座標就失效。
        </div>
      </div>
    </div>
  </SlideShell>
</template>
