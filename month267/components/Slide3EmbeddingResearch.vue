<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="WEBPAT / IPTECH · EMBEDDING SPEC"
      title="Patent Embedding Search 研究與規格"
      subtitle="一專利多向量策略與多欄位查詢規格制定"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">多向量策略</TechBadge>
          <span class="text-xs font-mono text-zinc-400">TAC + AN/IN EMBEDDING</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">一專利兩向量架構</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>TAC（標題／摘要／請求項）獨立一組向量</li>
          <li>申請人、專利權人、發明人名稱各自獨立向量化</li>
          <li>動機：需能以專利權人／申請人／發明人名稱做語意搜尋</li>
        </ul>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">欄位切分與工具</TechBadge>
          <span class="text-xs font-mono text-zinc-400">SEARCH TOOL SPEC</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">多向量查詢與規格制定</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>向量欄位切分：TAC／applicants／assignees／inventors，POC 建立 tac-an-in、tac-dual 兩變體實測 kNN</li>
          <li>回填管線泛化為一專利 N 個命名向量，支援增量與中斷續跑</li>
          <li>查詢端支援多向量複合檢索；研究範圍含台灣全部與美、中近 10 年</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
