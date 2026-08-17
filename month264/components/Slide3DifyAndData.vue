<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SERVICE INTEGRATION & ETL"
      title="Dify API 整合與資料轉置"
      subtitle="服務後端串接與資料維運優化"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">Dify API</TechBadge>
          <span class="text-xs font-mono text-zinc-400">PATENTPILOT SERVICE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">AI 模組後端串接</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>洞察通、魚骨通、分類通全面對接 Dify 工作流</li>
          <li>整合至 PatentPilot-service 提供統一服務入口</li>
        </ul>
      </TechCard>

      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">資料轉置</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DATA MIGRATION</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">系統維護與資轉</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>IPTECH / WEBPAT 資轉邏輯與錯誤修復</li>
          <li>TipoMusic 年度資料轉置排程順利執行</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
