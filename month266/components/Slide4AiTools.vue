<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="AI INTEGRATION & EXPORT"
      title="AI 洞察通 / 速讀通 / 閱讀通"
      subtitle="Prompt 調整、匯出功能與 Dify 正式站台同步"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">輸出擴充</TechBadge>
          <span class="text-xs font-mono text-zinc-400">EXPORT & COPY</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">多格式匯出支援</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>速讀通提供結構化匯出 Excel 功能</li>
          <li>專利詳細頁：閱讀通、價值通支援一鍵複製 Markdown</li>
        </ul>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">正式站台</TechBadge>
          <span class="text-xs font-mono text-zinc-400">PROD DEPLOYMENT</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Dify 正式站同步</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>洞察通介面跑版修復並針對專利語意微調 Prompt</li>
          <li>AI 通 Dify 服務順利同步更新至正式站台</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
