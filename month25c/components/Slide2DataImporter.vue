<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DATA-IMPORTER · TECH STACK"
      title="data-importer 與新技術調研"
      subtitle="Docker Compose 容器編排與 OpenSearch 分散式搜尋引擎"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">容器編排</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DOCKER COMPOSE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Docker Compose 實踐</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>多服務容器化快速啟動與網路互通配置</li>
          <li>本地開發環境與資料匯入管線容器化標準化</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">搜尋引擎</TechBadge>
          <span class="text-xs font-mono text-zinc-400">OPENSEARCH</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">OpenSearch 分析與整合</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>分散式全文檢索、向量搜尋與分析架構學習</li>
          <li>專利大量資料 Batch Indexing 效能調優</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
