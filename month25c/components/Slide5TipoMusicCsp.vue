<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SECURITY & ETL"
      title="TipoMusic 弱點掃描修復與資轉"
      subtitle="CSP 安全標頭設定完善與資料轉置處理"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">安全性強化</TechBadge>
          <span class="text-xs font-mono text-zinc-400">CSP HEADERS</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">CSP 弱點全面排查修復</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>修復 Failure to Define Directive with No Fallback</li>
          <li>安全隔離 `script-src unsafe-eval` 與 `unsafe-inline`</li>
          <li>限制 `style-src` 內聯樣式注入風險</li>
          <li>全面正確配置 Content Security Policy 標頭防禦 XSS</li>
        </ul>
      </TechCard>

      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">資料轉置</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DATA SYNC</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">專利資料轉置處理</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          持續監控並處理定期資料轉置排程，解決跨資料庫欄位對齊與歷史資料格式容錯。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
