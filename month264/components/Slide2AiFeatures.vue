<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH / WEBPAT · AI MODULES"
      title="AI - 分類通 ＆ 微分通 & 魚骨通"
      subtitle="專利智慧分析與節點聚類功能持續優化"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">分類與微分</TechBadge>
          <span class="text-xs font-mono text-zinc-400">CLASSIFICATION OPTIMIZATION</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">分類通、微分通優化</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          針對專利自動分類準確度與相似度篩選閥值進行調校，提升樹狀結構整理效率。
        </p>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">魚骨通</TechBadge>
          <span class="text-xs font-mono text-zinc-400">FISHBONE ANALYSIS</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">節點專利筆數支援</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          支援節點專利筆數範圍 10 ~ 500 筆，滿足大中小規模專利組合之多維度魚骨分析。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
