<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SOLUTION 1"
      title="使用 Script Hash (內容雜湊)"
      subtitle="透過 SHA-256 雜湊值授權特定內嵌腳本"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <TechCard accent="cyan" class="p-4">
        <h4 class="text-base font-semibold text-white mb-2">步驟 1：取得 Hash</h4>
        <p class="text-xs text-zinc-300 mb-2">由瀏覽器 Console 錯誤中直接複製該腳本的 SHA-256：</p>
        <code class="text-xs font-mono text-cyan-300 bg-black/40 p-2 rounded block">
          'sha256-rv2ceEjgVgUF3WrXXp9dIVnznWv+/L9ybKd8ksvZSWQ='
        </code>
      </TechCard>

      <div>
        <h4 class="text-base font-semibold text-white mb-2">步驟 2：加入 CSP Header</h4>
        <JsonCard
          filename="csp_hash.http"
          :code="`Content-Security-Policy:
  script-src 'self' 'unsafe-eval'
  https://www.google-analytics.com
  'sha256-rv2ceEjgVgUF3WrXXp9dIVnznWv+/L9ybKd8ksvZSWQ=';`"
        />
      </div>
    </div>
  </SlideShell>
</template>
