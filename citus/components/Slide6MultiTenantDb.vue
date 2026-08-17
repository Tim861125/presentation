<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="MULTI-TENANT PATTERN"
      title="Multi-tenant 做法：所有資料放一起"
      subtitle="導入 tenant_id 欄位，邏輯隔離與彈性管理"
    />

    <div class="mt-4">
      <JsonCard
        filename="query_by_tenant.sql"
        :code="`SELECT *
FROM Orders
WHERE tenant_id = 'Google';`"
      />
    </div>

    <div class="mt-4 flex items-center gap-3">
      <TechBadge color="emerald">優勢</TechBadge>
      <span class="text-sm text-zinc-300">單一 Schema 結構，集中管理與升級，搭配 Citus Sharding 即可實現百萬租戶擴充。</span>
    </div>
  </SlideShell>
</template>
