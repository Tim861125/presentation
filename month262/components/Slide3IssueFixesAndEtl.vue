<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH / WEBPAT · MODULE TUNING & UI"
      title="洞察通／閱讀通優化與介面修正"
      subtitle="Token 上限控管、自動開啟防呆、Header bar 與全站用語修正"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">模組調優</TechBadge>
          <span class="text-xs font-mono text-zinc-400">AI MODULES</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">洞察通與閱讀通優化</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>洞察通（多篇專利 AI 分析）：調整送到 qwen3 模型的專利筆數上限，防止超出 token 限制報錯</li>
          <li>閱讀通：修正 AI 閱讀顯示邏輯與自動開啟設定的 UI 防呆</li>
        </ul>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">介面與整合</TechBadge>
          <span class="text-xs font-mono text-zinc-400">UI & INTEGRATION</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">全站 UI 修正與 CRM 整合</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>Header bar 響應式排版與文字顯示異常修正</li>
          <li>全站「檢索式」統一改為「分項」，同步更新中／英／日等多語系資源</li>
          <li>Server 取得 loginId／crmId 傳給 AI 服務，串接會員身分</li>
          <li>CRM（會員與點數管理系統）整合：已開通使用者自 AI 功能管理進入點數調整，恢復「新增功能」按鈕</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
