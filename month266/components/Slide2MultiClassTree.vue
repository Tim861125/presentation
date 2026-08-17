<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH · CORE DEVELOPMENT"
      title="IPTECH 分類頁多分類樹"
      subtitle="多分類樹架構與互動管理機制全新升級"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">多分類樹架構</TechBadge>
          <span class="text-xs font-mono text-zinc-400">PATENT LIST DISPLAY</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">多分類樹展示與節點操作</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>多分類樹專利清單即時切換與高亮顯示</li>
          <li>專利移動、節點拖曳移動與節點合併機制</li>
          <li>獨立未分類節點暫存與派發機制</li>
        </ul>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">規格優化</TechBadge>
          <span class="text-xs font-mono text-zinc-400">CLASSIFICATION ENGINE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">分類通流程調整</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>因應多分類樹調整 AI 分類通流程規格</li>
          <li>優化多樹切換時的效能與資料同步</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
