<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="BEST PRACTICE"
      title="正確設計：Colocation 共置"
      subtitle="所有相關 Table 使用同一個 Distribution Key"
    />

    <div class="mt-4">
      <JsonCard
        filename="colocation.sql"
        :code="`-- Patent
create_distributed_table('Patent', 'formatted_pn');
-- Assignee
create_distributed_table('Assignee', 'formatted_pn');
-- Inventor
create_distributed_table('Inventor', 'formatted_pn');`"
      />
    </div>

    <div class="mt-4 flex items-center gap-2">
      <TechBadge color="emerald">LOCAL JOIN</TechBadge>
      <span class="text-xs text-zinc-300">同一篇專利的所有附屬資料均在同一台 Worker，JOIN 完全在本地記憶體與硬碟完成。</span>
    </div>
  </SlideShell>
</template>
