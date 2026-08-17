<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="API SPEC"
      title="create_distributed_table 兩個參數"
      subtitle="指定目標資料表與分片欄位 (Distribution Key)"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">參數 01</TechBadge>
          <span class="text-xs font-mono text-zinc-400">TABLE NAME</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">目標資料表名稱</h3>
        <p class="text-sm text-zinc-300">
          指定哪一張 PostgreSQL Table 要變成分散式資料表交由 Citus 託管。
        </p>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">參數 02</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DISTRIBUTION COLUMN</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">分片鍵 (Sharding Key)</h3>
        <p class="text-sm text-zinc-300">
          用哪個欄位的值決定資料存放於哪台 Worker，又稱 Distribution Key。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
