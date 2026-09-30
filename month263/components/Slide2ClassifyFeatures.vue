<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH / WEBPAT · AI CLASSIFICATION"
      title="分類通：相似度篩選與 AI 暖場回應"
      subtitle="分類通（以 AI 將專利批次歸入分類樹的模組）：動態門檻過濾與串流 AI 評論"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">相似度篩選</TechBadge>
          <span class="text-xs font-mono text-zinc-400">SLIDER & APIS</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">動態門檻過濾機制</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>後端運算專利與節點的相似度分數，前端滑桿拖动即時過濾</li>
          <li>新增 SimilarityRange、NodeSimilarityDistribution API，回傳門檻範圍與節點分數分佈</li>
          <li>低於門檻的專利批次移回「未分類」，並支援一鍵重新分類</li>
        </ul>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">AI 暖場回應</TechBadge>
          <span class="text-xs font-mono text-zinc-400">STREAMING FEEDBACK</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">串流評論與打字機效果</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>新增 AiClassificationComment 串流 API，依分類樹與策略即時生成 AI 評論</li>
          <li>分類對話框整合氣泡訊息與打字機動畫，縮短等待感的空窗</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
