<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SUMMARY"
      title="核心總結"
      subtitle="create_distributed_table 核心精髓"
    />

    <div class="mt-4">
      <JsonCard
        filename="distributed_table.sql"
        :code="`SELECT create_distributed_table(
    'table_name',
    'distribution_column'
);`"
      />
    </div>

    <div class="mt-4 p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 text-sm text-zinc-300">
      把 PostgreSQL Table 交給 Citus 管理，並指定哪個欄位決定資料分布位置。
    </div>
  </SlideShell>
</template>
