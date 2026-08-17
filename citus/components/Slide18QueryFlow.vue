<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="QUERY PIPELINE"
      title="完整查詢定位流程"
      subtitle="雙層加速機制：Citus Routing + PG Local Index"
    />

    <div class="mt-3">
      <JsonCard
        filename="query.sql"
        :code="`SELECT *
FROM l1_kda_biblio
WHERE formatted_pn = 'US10000001'
  AND period = '202401';`"
      />
    </div>

    <div class="mt-4 flex flex-col gap-2 text-sm max-w-2xl">
      <div><span class="text-cyan-400 font-mono font-bold">1.</span> Citus 根據 <code class="text-cyan-300 font-mono">formatted_pn</code> ➔ 定位到 <span class="text-cyan-300 font-semibold">Worker 2</span></div>
      <div><span class="text-cyan-400 font-mono">2.</span> Worker 2 使用本地索引 <code class="text-zinc-300 font-mono">(period, formatted_pn, ...)</code></div>
      <div><span class="text-cyan-400 font-mono">3.</span> 快速精準檢索並回傳結果</div>
    </div>
  </SlideShell>
</template>
