<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="END-TO-END"
      title="完整查詢定位流程"
      subtitle="Citus 分布定位 + 本地 Index 雙層加速"
    />

    <div class="mt-3">
      <JsonCard
        filename="query.sql"
        :code="`SELECT * FROM l1_kda_biblio
WHERE formatted_pn = 'US10000001' AND period = '202401';`"
      />
    </div>

    <div class="mt-4 flex flex-col gap-3 text-sm max-w-2xl">
      <div class="flex items-center gap-3">
        <span class="text-cyan-400 font-mono font-bold">1.</span>
        <span>Citus 依 <code class="text-cyan-300 font-mono">formatted_pn</code> 精準定位 ➔ <span class="text-cyan-300 font-semibold">Worker2</span></span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-cyan-400 font-mono font-bold">2.</span>
        <span>Worker2 使用本地複合索引 <code class="text-zinc-300 font-mono">(period, formatted_pn, ...)</code></span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-cyan-400 font-mono font-bold">3.</span>
        <span>微秒級快速檢索並回傳結果給 Coordinator</span>
      </div>
    </div>
  </SlideShell>
</template>
