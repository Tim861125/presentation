<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="WEBPAT · NEW MODULE"
      title="微分通：分類品質微調模組"
      subtitle="微分通（針對已分類專利做品質微調的新模組）：相似度門檻回流＋流程改造"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">功能概念</TechBadge>
          <span class="text-xs font-mono text-zinc-400">CORE VALUE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">節點純淨度調節</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          針對選取的分類節點設定相似度門檻，將不夠相似的雜訊專利批次移回未分類；第二頁採雙分類樹對照版面，即時顯示節點專利比例（如 37/70）。
        </p>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">流程改造</TechBadge>
          <span class="text-xs font-mono text-zinc-400">REFACTORING</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">單一 dialog 與邏輯複用</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>進入分類改為開啟分類通 dialog，移除獨立第三頁、複用既有分類邏輯</li>
          <li>dialog 內 AI 氣泡改串流呈現＋打字機效果，支援節點展開收合與 RWD</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
