<script setup lang="ts">
const preCode = `"hybrid": {
  "filter": {
    "term": { "category": "shoes" }
  },
  "queries": [ ... ]
}`

const postCode = `"query":  { "match": { ... } },
"aggs":   { "brands": { "terms": {...} } },
"post_filter": {
  "term": { "brand.keyword": "Nike" }
}`
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Filtering"
      title="Pre-filtering vs Post-filtering"
      subtitle="差別在「排除發生在打分前還是打分後」，以及會不會影響 aggregation。"
    />

    <div class="grid grid-cols-2 gap-5 flex-1">
      <!-- pre -->
      <div class="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.05] p-5 flex flex-col">
        <div class="flex items-baseline gap-2 mb-2">
          <span class="text-lg font-bold text-white">Pre-filtering</span>
          <span class="text-[10px] font-mono rounded-full border border-emerald-400/40 text-emerald-400 px-2 py-0.5">最常用</span>
        </div>
        <p class="text-xs text-zinc-400 mb-3">
          在 <span class="font-mono text-zinc-200">hybrid</span> 加 top-level
          <span class="font-mono text-emerald-400">filter</span>，
          <span class="text-white font-semibold">打分前</span>排除，等同對每一路子查詢套同一 filter。
        </p>
        <JsonCard :code="preCode" />
        <div class="mt-auto pt-3 text-xs text-zinc-400">用途：範圍限定（分類、日期、狀態）後再做相關性排序。</div>
      </div>

      <!-- post -->
      <div class="rounded-xl border border-white/10 bg-white/[0.03] p-5 flex flex-col">
        <div class="flex items-baseline gap-2 mb-2">
          <span class="text-lg font-bold text-white">Post-filtering</span>
          <span class="text-[10px] font-mono rounded-full border border-white/15 text-zinc-400 px-2 py-0.5">faceted</span>
        </div>
        <p class="text-xs text-zinc-400 mb-3">
          請求層加 <span class="font-mono text-blue-400">post_filter</span>，
          <span class="text-white font-semibold">打分後</span>排除；
          <span class="text-white font-semibold">不影響 aggregation</span>。
        </p>
        <JsonCard :code="postCode" />
        <div class="mt-auto pt-3 text-xs text-zinc-400">用途：faceted search — facet 計數反映全集，只縮小顯示的 hits。</div>
      </div>
    </div>
  </SlideShell>
</template>
