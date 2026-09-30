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
          <li>點選樹節點，專利清單即同步顯示各樹分類結果與完整分類路徑</li>
          <li>專利跨樹拖曳移動、節點拖曳與節點合併機制</li>
          <li>未分類專利以獨立未分類節點暫存派發，並修正節點重複問題</li>
          <li>修正跨樹移動時相同 Node ID 節點被重複高亮</li>
        </ul>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">規格優化</TechBadge>
          <span class="text-xs font-mono text-zinc-400">CLASSIFICATION ENGINE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">分類通（AI 自動分類）流程與效能</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>修正多樹切換時 API 重複呼叫，消除冗餘請求</li>
          <li>配合多樹調整 AI 分類通流程規格與對話框、下拉選單互動</li>
          <li>修正點選節點誤顯示根節點清單等樹切換邊界問題</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
