<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="OVERVIEW"
      title="Citus 是什麼？"
      subtitle="PostgreSQL 的分散式開源擴充套件"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">01</TechBadge>
          <span class="text-xs font-mono text-zinc-400">HORIZONTAL SCALING</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">水平擴充能力</h3>
        <p class="text-sm text-zinc-300">突破單機硬體資源極限，將資料與運算量無縫分散至多台節點。</p>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">02</TechBadge>
          <span class="text-xs font-mono text-zinc-400">SHARDING</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">資料透明分片</h3>
        <p class="text-sm text-zinc-300">基於 Hash 演算法自動切分 Shard，對應用層完全透明。</p>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">03</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DISTRIBUTED QUERY</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">平行分散式查詢</h3>
        <p class="text-sm text-zinc-300">Coordinator 自動下推查詢至多個 Worker 平行運算並聚合結果。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
