<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ROUTING ENGINE"
      title="SELECT Routing 查詢流程"
      subtitle="條件精準下推，避免全節點廣播"
    />

    <div class="mt-4">
      <JsonCard
        filename="select.sql"
        :code="`SELECT *
FROM l1_kda_biblio
WHERE formatted_pn = 'US10000002';`"
      />
    </div>

    <div class="mt-4 p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 text-sm text-zinc-300 font-mono">
      Coordinator ➔ Hash('US10000002') ➔ 找到 Worker 2 ➔ <span class="text-cyan-300 font-bold">僅查詢 Worker 2</span>
    </div>

    <div class="mt-3 text-xs text-cyan-300">
      精準定位：不需要向所有 Worker 廣播 (Broadcast)，大幅降低資料庫整體負載。
    </div>
  </SlideShell>
</template>
