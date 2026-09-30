<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="AI INTEGRATION & EXPORT"
      title="AI 洞察通 / 速讀通 / 閱讀通"
      subtitle="洞察通（洞察分析）· 速讀通（快速閱讀）· 閱讀通（深度解讀）· 價值通（價值評估）：Prompt 調整與匯出擴充"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">輸出擴充</TechBadge>
          <span class="text-xs font-mono text-zinc-400">EXPORT & COPY</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">多格式匯出支援</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>速讀通（AI 專利摘要）結果匯出 Excel：匯出服務改雙欄排版、大資料分塊輸出</li>
          <li>專利詳細頁閱讀通／價值通一鍵複製 Markdown，點擊後打勾回饋</li>
          <li>匯出完成訊息 UI 修正</li>
        </ul>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">正式站台</TechBadge>
          <span class="text-xs font-mono text-zinc-400">PROD DEPLOYMENT</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Prompt 版本化與 Dify 上線</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>Prompt 調參管理頁更新，魚骨通／洞察通 prompt 批次調整</li>
          <li>PromptId 納入 AI 比對快取 key，prompt 更新後自動重算免髒資料</li>
          <li>洞察通跑版修復與專利語意 prompt 微調，提問 agent 歷史紀錄修復</li>
          <li>Dify（開源 LLM 應用開發平台）AI 服務建置並同步至正式站台</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
