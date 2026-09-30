<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="WEBPAT & NEW INITIATIVES"
      title="WEBPAT 體驗模式與 FTO"
      subtitle="FB 廣告導流體驗模式、FTO AI POC 與匯出排查"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">體驗模式</TechBadge>
          <span class="text-xs font-mono text-zinc-400">EXPERIENCE MODE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">FB 廣告導流的無帳號體驗</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>白名單訪客自動執行 AI 閱讀通／價值通並隱藏積分消耗，引導註冊</li>
          <li>體驗帳號改以 CRM ID、文件 esId 辨識，解析失敗採 fail-closed 不誤放行</li>
        </ul>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">FTO POC</TechBadge>
          <span class="text-xs font-mono text-zinc-400">POC & SURVEY</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">FTO AI POC 與匯出排查</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>FTO（Freedom to Operate，產品可自由實施評估）AI 比對 POC demo 開發與可行性評估</li>
          <li>專利匯出 PDF、警示更新連結問題排查</li>
          <li>專利號雷達不顯示、號碼檢索無結果問題排查</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
