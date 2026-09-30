<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="AI SERVICE & DATA MIGRATION"
      title="PatentPilot 串接 Dify 工作流 · 年度資轉"
      subtitle="AI 服務後端改接開源工作流平台，並完成音樂版權系統年度資料轉置"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="blue">Dify 整合</TechBadge>
          <span class="text-xs font-mono text-zinc-400">PATENTPILOT SERVICE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">AI 問答後端改接 Dify</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>AI 問答由自行串接 vLLM 改為走 Dify 工作流，統一服務入口</li>
          <li>新增 dify-service：Dify SSE 事件流即時轉換為 OpenAI 格式轉傳</li>
          <li>支援串流與 blocking 回應兩種模式，並補上完整 http 測試</li>
          <li>移除請求參數中的 API key 與 workflow URL，改由伺服器端 promptKey 對應工作流</li>
          <li>洞察／魚骨／檢索／分類四大分析模組完成工作流 API，同步修正 prompt editor</li>
        </ul>
      </TechCard>

      <TechCard variant="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">年度資轉</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DATA MIGRATION</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">音樂版權系統資料轉置</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>2025 年度資料轉置：測試區多輪驗證後發布停機公告，切換正式區上線</li>
          <li>ISRC 專輯下載程式與日期欄位處理修正</li>
          <li>全文搜尋 SQL Injection 風險修正，補上單元測試</li>
          <li>轉置過程異常資料比對資料庫原始值逐筆修正後回填</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
