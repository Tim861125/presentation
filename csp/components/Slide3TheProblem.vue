<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="INCIDENT"
      title="遇到問題：移除 'unsafe-inline' 後的錯誤"
      subtitle="瀏覽器嚴格阻擋未經授權的內嵌腳本執行"
    />

    <div class="mt-4">
      <JsonCard
        filename="browser_console_error.log"
        :code="`Executing inline script violates the following Content Security Policy
directive 'script-src \\'self\\' \\'unsafe-eval\\' https://www.google-analytics.com'.

Either the 'unsafe-inline' keyword, a hash
('sha256-rv2ceEjgVgUF3WrXXp9dIVnznWv+/L9ybKd8ksvZSWQ='),
or a nonce ('nonce-...') is required to enable inline execution.

The action has been blocked.`"
      />
    </div>

    <div class="mt-4 flex items-center gap-3">
      <TechBadge color="rose">問題核心</TechBadge>
      <span class="text-xs text-zinc-300">移除了 unsafe-inline 雖然提升了安全性，但所有合法 inline script 也隨之被擋，亟需安全的替代方案。</span>
    </div>
  </SlideShell>
</template>
