<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="R&D / POC · VECTOR SEARCH"
      title="Patent Embedding 專利向量化"
      subtitle="專利向量化架構研發、OpenSearch 學習與 Mapping 規格"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">向量化架構</TechBadge>
          <span class="text-xs font-mono text-zinc-400">EMBEDDING ANALYSIS</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">方向探討與規格制定</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>研討專利向量化方向與文本切分策略</li>
          <li>建立 patent-embedding-analysis 評測專案</li>
          <li>深入研讀 OpenSearch 向量搜尋機制</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">搜尋實作</TechBadge>
          <span class="text-xs font-mono text-zinc-400">SEARCH PIPELINE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Mapping 與 Search 實作</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>完成 Patent Embedding Index Mapping 規格定義</li>
          <li>Patent embedding search 核心查詢邏輯開發推進</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
