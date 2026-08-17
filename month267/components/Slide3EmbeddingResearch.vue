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
          <li>TAC (名稱/摘要/請求項) 獨立一組向量</li>
          <li>AN (申請人) + IN (發明人) 分別獨立向量化</li>
          <li>滿足以專利權人／申請人／發明人維度進行語意搜尋的需求</li>
        </ul>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">欄位切分與工具</TechBadge>
          <span class="text-xs font-mono text-zinc-400">SEARCH TOOL SPEC</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">多向量查詢與規格制定</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>多向量欄位切分：TAC / applicants / assignees / inventors</li>
          <li>查詢端全面支援多向量複合檢索</li>
          <li>Patent Embedding Tool 規格制定與調校</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
