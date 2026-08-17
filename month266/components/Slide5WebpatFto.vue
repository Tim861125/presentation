<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="WEBPAT & NEW INITIATIVES"
      title="WEBPAT 閱讀通廣告與 FTO"
      subtitle="新用戶轉化機制、FTO 技術調研與 PDF 匯出排查"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">體驗機制</TechBadge>
          <span class="text-xs font-mono text-zinc-400">GUEST EXPERIENCE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">無帳號體驗與轉化</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          新增閱讀通 / 價值通顯示條件，針對無帳號訪客提供受限體驗與註冊升級引導。
        </p>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">FTO 調研</TechBadge>
          <span class="text-xs font-mono text-zinc-400">POC & SURVEY</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">FTO AI POC 與匯出排查</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>FTO (Freedom to Operate) AI 比對可行性 POC 與技術 Survey</li>
          <li>專利匯出 PDF 排版與中文編碼問題排查</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
