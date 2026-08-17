<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH · AI CLASSIFICATION"
      title="分類通"
      subtitle="由 AI 將專利自動分類到現有分類樹中"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald" pulse>核心功能</TechBadge>
          <span class="text-xs font-mono text-zinc-400">AUTOMATIC MAPPING</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">自動化專利歸類</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          透過 AI 模型深度理解專利文本與技術特徵，快速對齊至既有的樹狀階層結構。
        </p>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">互動機制</TechBadge>
          <span class="text-xs font-mono text-zinc-400">AI ANALYSIS & ADVICE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">智慧分析與建議</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>根據節點與專利特徵，由 AI 即時分析關聯度</li>
          <li>提供推薦置放原因與信心度評估</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
