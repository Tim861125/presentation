<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ARCHITECTURE LAYERS"
      title="Distribution vs Index：不同層級"
      subtitle="跨節點分派 vs 單節點內部檢索優化"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">層級 01</TechBadge>
          <span class="text-xs font-mono text-zinc-400">CITUS DISTRIBUTION</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">決定資料放在哪台 Worker</h3>
        <p class="text-sm text-zinc-300 font-mono">US10000001 ➔ Worker 2</p>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">層級 02</TechBadge>
          <span class="text-xs font-mono text-zinc-400">POSTGRESQL INDEX</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Worker 內快速尋找紀錄</h3>
        <p class="text-xs text-zinc-300 font-mono mb-2">CREATE INDEX ON l1_kda_biblio (period, formatted_pn, formatted_apn, kindcode);</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
