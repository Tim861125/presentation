<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH / WEBPAT · ARCHITECTURE"
      title="AI 與架構"
      subtitle="AI 模型工作流、服務架構調整與 Dify 站台建置"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">AI 流程管理</TechBadge>
          <span class="text-xs font-mono text-zinc-400">MODEL & SETTINGS</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">模型流程與設定規格</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>IPTECH / WEBPAT AI model 流程與設定規格制定</li>
          <li>微分通、分類通開關控制機制</li>
          <li>分類通合併分類支援</li>
        </ul>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">架構升級</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DIFY TEST ENV</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">服務架構與 Dify 測試</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>重構與調整 PatentPilot-service 內部架構</li>
          <li>Dify 成功部署至測試站台進行聯調</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
