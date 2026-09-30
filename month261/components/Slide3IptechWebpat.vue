<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH / WEBPAT · AI SEARCH"
      title="檢索通流程重建與 Upat MCP 串接"
      subtitle="WEBPAT（專利檢索平台）與 IPTECH（專利智慧分析平台）的 AI 功能開發與發版"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">檢索通</TechBadge>
          <span class="text-xs font-mono text-zinc-400">AI AGENT + UPAT MCP</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">檢索通（AI 專利檢索助理）流程重建</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>於 PatentPilotService（AI 分析後端，Bun + Hono）獨立出 AI Agent API，改以 SSE 串流回應前端並補 [DONE] 結束訊號</li>
          <li>以 MCP 協定（Model Context Protocol）串接 Upat MCP 服務，查詢專利筆數與基本資訊</li>
          <li>以 EventSourceParserStream 解析模型 tool_calls 回應，完成工具呼叫到串流的轉換</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">前端與把關</TechBadge>
          <span class="text-xs font-mono text-zinc-400">UI & MIDDLEWARE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">介面更新與點數把關</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>新增 AI 搜尋「思考中」進度 UI；移除舊 AI 檢索與多餘流程，修正錯誤時重複回應</li>
          <li>PatentPilotService 新增 middleware，於進入 AI 功能前檢查使用者剩餘點數</li>
          <li>調整速讀通（AI 速讀助理）按鈕介面；專利詳情頁移除 SEP（標準必要專利）欄位</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
