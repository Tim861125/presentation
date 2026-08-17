<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="FUNDAMENTALS"
      title="什麼是 CSP (Content Security Policy)？"
      subtitle="瀏覽器第一道防線：透過 HTTP Header 控制網頁可載入的資源來源"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 items-center">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">核心防護目標</TechBadge>
        </div>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>防禦跨網站腳本攻擊 (Cross-Site Scripting, XSS)</li>
          <li>防禦未授權資料注入 (Data Injection)</li>
          <li>限制 Clickjacking 與混合內容 (Mixed Content) 載入</li>
        </ul>
      </TechCard>

      <div>
        <JsonCard
          filename="csp_header.http"
          :code="`Content-Security-Policy:
  script-src 'self' 'unsafe-inline';
  style-src 'self';
  img-src *;`"
        />
        <div class="mt-2 text-xs text-zinc-400">
          `script-src` 控制 JS、`style-src` 控制 CSS、`img-src` 控制圖片來源。
        </div>
      </div>
    </div>
  </SlideShell>
</template>
