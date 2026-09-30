<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH / WEBPAT · ARCHITECTURE"
      title="AI 模型流程與服務架構"
      subtitle="IPTECH / WEBPAT（兩套專利分析與檢索系統）的 AI 模型規格、後端服務架構調整與 Dify 聯調"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">AI 流程管理</TechBadge>
          <span class="text-xs font-mono text-zinc-400">MODEL & SETTINGS</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">模型流程與設定規格</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>制定兩系統 AI model 流程與設定規格，統一各 AI 模組的呼叫方式</li>
          <li>模型註冊與切換：新增 Gemini 2.5 Flash 等模型、按站台更新設定</li>
          <li>分類頁讀取 AI 模組開關設定，控制分類通（AI 自動分類）等模組顯示</li>
          <li>更新 prompt tuning 管理工具，調整檢索通（AI 專利搜尋助理）與魚骨通提示詞</li>
        </ul>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">架構升級</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DIFY TEST ENV</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">PatentPilot-service 與 Dify 聯調</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>PatentPilot-service（檢索通 AI 後端服務）調整 Dify 呼叫架構，回退一次後重新整合上線</li>
          <li>Dify（開源 LLM 應用編排平台）部署測試站：問答代理流程測試、錯誤訊息正確上拋</li>
          <li>Dify API key 與模型設定集中移至 WEBPAT / IPTECH 設定端</li>
          <li>單月推出 14 個修補版本（v1.0.47 → v1.0.60）</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
