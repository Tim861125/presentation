<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ARCHITECTURE"
      title="架構對比"
      subtitle="單機集中式 vs Citus Coordinator-Worker 分散式叢集"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">傳統模式</TechBadge>
          <span class="text-xs font-mono text-zinc-400">SINGLE NODE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">一般 PostgreSQL</h3>
        <p class="text-xs text-zinc-400 mb-4">單一機器乘載所有 Table 與連線負載</p>
        <div class="p-4 rounded bg-black/40 border border-white/5 text-center font-mono text-xs text-zinc-300">
          PostgreSQL Server ➔ Table ➔ 單台硬體極限
        </div>
      </TechCard>

      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">Citus 叢集</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DISTRIBUTED CLUSTER</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Coordinator + Workers</h3>
        <p class="text-xs text-zinc-400 mb-4">Coordinator 負責 Routing，Workers 儲存與運算</p>
        <div class="p-4 rounded bg-black/40 border border-white/5 text-center font-mono text-xs text-zinc-300">
          Coordinator ➔ Worker 1 / Worker 2 / Worker 3
        </div>
      </TechCard>
    </div>
  </SlideShell>
</template>
