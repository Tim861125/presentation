<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SECURITY & DATA"
      title="TipoMusic 弱掃修復與資料轉置"
      subtitle="TipoMusic（自研 Web 應用程式）弱點掃描修復；專利資料轉置問題處理"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">弱掃修復</TechBadge>
          <span class="text-xs font-mono text-zinc-400">CSP HEADERS</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Content Security Policy 資安修復</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>移除 <code>script-src</code> 的 <code>unsafe-eval</code>、<code>unsafe-inline</code>，改用 nonce 放行腳本</li>
          <li>補齊指令與 fallback：<code>object-src 'none'</code>、<code>base-uri</code>、<code>form-action</code>、<code>frame-ancestors</code></li>
          <li>清理頁面與全域版面中多餘的內聯腳本，消除注入風險</li>
          <li>修復後複掃通過，更新弱掃測試區版本</li>
        </ul>
      </TechCard>

      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">資料轉置</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DATA SYNC</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">專利資料轉置問題處理</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>排查並修復多起資料轉置排程異常，確保匯入管線恢復正常產出</li>
          <li>處理公告案專利公報影像轉置問題並完成測試驗證</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
