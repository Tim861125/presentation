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
        <h3 class="text-lg font-semibold text-white mb-2">向量化管線與評測</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>建立 patent-embedding POC 評測專案：本地 OpenSearch（docker compose）＋ vLLM 部署的 qwen3 embedding 模型批次向量化管線</li>
          <li>文本切分策略與雙來源（公開案／申請案）索引規劃</li>
          <li>儲存結構比較實驗：單欄位／多欄位／nested 索引的搜尋效果評測</li>
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
          <li>串接 embedding ＋ rerank（LLM-as-reranker）搜尋流程與中斷續跑機制</li>
          <li>Nuxt.js 搜尋介面 POC：Dify 測試站 API 串接、reranker 模型與搜尋介面迭代</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
