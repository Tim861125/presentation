<script setup lang="ts">
const createPit = `// 建立 PIT，鎖定當下 segment 快照`
const page1 = `{
  "size": 10000,
  "query": { "match": { "play_name": "Hamlet" } },
  "pit": { "id": "<pit_id>", "keep_alive": "100m" },
  "sort": [{ "line_id": "asc" }]
}`
const page2 = `{
  "size": 10000,
  "query": { "match": { "play_name": "Hamlet" } },
  "pit": { "id": "<pit_id>", "keep_alive": "100m" },
  "sort": [{ "line_id": "asc" }],
  "search_after": [14186]
}`
const closePit = `// 收尾：釋放 PIT context`
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="PIT · REST"
      title="PIT + search_after 用法"
      subtitle="建立 PIT → 帶 pit + sort 查第一頁 → 帶 search_after 續批 → 收尾釋放"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-1">
      <div class="lg:col-span-6 space-y-3">
        <JsonCard method="POST" path="/shakespeare/_search/point_in_time?keep_alive=15m" title="Step 1 — 建立 PIT，回 pit_id" :code="createPit" />
        <JsonCard method="GET" path="/_search" title="Step 2 — 第一頁（pit + sort）" :code="page1" />
      </div>

      <div class="lg:col-span-6 space-y-3">
        <JsonCard method="GET" path="/_search" title="Step 3 — 下一頁（同 pit、同 sort、加 search_after）" :code="page2" />
        <JsonCard method="DELETE" path="/_search/point_in_time (或 /_all)" title="Step 4 — 收尾釋放" :code="closePit" />
        <div class="p-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-[11px] text-amber-200">
          pit_id 每次回應可能被刷新 —— 和 scroll_id 一樣，<strong class="text-white">永遠用回應裡最新的那個</strong>。
        </div>
      </div>
    </div>
  </SlideShell>
</template>
