<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH / WEBPAT · MAINTENANCE"
      title="問題處理、UI 優化與資轉"
      subtitle="Token 限制調整、自動執行優化與 Log 修正"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">模組調優</TechBadge>
          <span class="text-xs font-mono text-zinc-400">AI MODULES</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">洞察通與閱讀通優化</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>洞察通：精準控制傳送至 LLM 的 Context Token 字數，防止超長報錯</li>
          <li>閱讀通：設定自動開啟的 UI 流程與開關防呆優化</li>
        </ul>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">系統與資料維運</TechBadge>
          <span class="text-xs font-mono text-zinc-400">SYS & ETL</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">系統維護與資轉排障</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>IPTECH：修正登入／登出 Audit Log 紀錄不完整問題</li>
          <li>頂部 Header bar 響應式排版與樣式微調</li>
          <li>例行專利資料轉置異常排查與修復</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
