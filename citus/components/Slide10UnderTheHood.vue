<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="INTERNAL STEPS"
      title="create_distributed_table 實際做了什麼？"
      subtitle="Metadata 註冊與 Shard 分配機制"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">步驟 01</TechBadge>
          <span class="text-xs font-mono text-zinc-400">METADATA</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">記錄 Metadata</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          Citus 在 Coordinator 系統表記錄 Table 與 Distribution Key，後續所有 CRUD 皆依此規則路由。
        </p>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">步驟 02</TechBadge>
          <span class="text-xs font-mono text-zinc-400">SHARD ALLOCATION</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">建立並分配 Shards</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          預設建立 32 個 Shard，並均勻分派至各 Worker 節點，利於未來擴容 Rebalance。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
