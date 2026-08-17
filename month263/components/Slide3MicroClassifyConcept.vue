<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH / WEBPAT · QUALITY TUNING"
      title="新增微分通功能"
      subtitle="調節節點分類純淨度，精準移除非相關專利"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">功能概念</TechBadge>
          <span class="text-xs font-mono text-zinc-400">CORE VALUE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">專利品質微調</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          「微分通」專門用於調整分類品質。使用者可針對選取的分類節點設定「相似度門檻」，將不夠相似的雜訊專利批次移回「未分類」。
        </p>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">操作流程</TechBadge>
          <span class="text-xs font-mono text-zinc-400">INTERACTIVE FLOW</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">直覺式篩選與確認</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>選取目標節點 ➔ 調節相似度閥值 ➔ 即時預覽受影響專利</li>
          <li>確認後自動批次重置分類狀態，避免人工逐一核對</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
