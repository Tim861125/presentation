<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SUMMARY"
      title="核心總結"
      subtitle="create_distributed_table 帶來的架構優勢"
    />

    <div class="mt-2">
      <JsonCard
        filename="summary.sql"
        :code="`SELECT create_distributed_table('table_name', 'distribution_column');`"
      />
    </div>

    <p class="mt-3 text-sm text-zinc-300">
      把 PostgreSQL Table 交給 Citus 管理，並指定哪個欄位決定資料分布位置。
    </p>

    <div class="mt-4 grid grid-cols-2 gap-4 text-xs">
      <TechCard accent="cyan" class="p-3">
        <span class="text-cyan-400 font-mono font-bold">▸</span> 同一篇 Patent 資料共置 (Colocated)
      </TechCard>
      <TechCard accent="cyan" class="p-3">
        <span class="text-cyan-400 font-mono font-bold">▸</span> JOIN 100% 在本地 Worker 完成
      </TechCard>
      <TechCard accent="cyan" class="p-3">
        <span class="text-cyan-400 font-mono font-bold">▸</span> 查詢直接定位單一 Worker
      </TechCard>
      <TechCard accent="cyan" class="p-3">
        <span class="text-cyan-400 font-mono font-bold">▸</span> 完美適合海量專利資料水平擴充
      </TechCard>
    </div>
  </SlideShell>
</template>
