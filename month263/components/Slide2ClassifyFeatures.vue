<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH / WEBPAT · AI CLASSIFICATION"
      title="分類通＆微分通機制"
      subtitle="相似度動態篩選與 AI 暖場對話評論整合"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">相似度篩選</TechBadge>
          <span class="text-xs font-mono text-zinc-400">SLIDER & APIS</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">動態閥值過濾機制</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>實作相似度分數運算邏輯，支援前端動態 Slide bar 篩選</li>
          <li>新增 `SimilarityRange` 與 `NodeSimilarityDistribution` API</li>
          <li>支援批次將低於門檻之專利一鍵移回「未分類」狀態</li>
        </ul>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">AI 暖場回應</TechBadge>
          <span class="text-xs font-mono text-zinc-400">EMOTIONAL VALUE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">智慧評論與打字效果</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>新增 `AiClassificationComment` API，依據分類樹給予即時 AI 評論</li>
          <li>在分類對話框中整合打字機動畫，提升使用者等待體驗</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
