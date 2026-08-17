<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SOLUTION 2 (RECOMMENDED)"
      title="使用 Nonce (一次性隨機權杖)"
      subtitle="每次 HTTP 請求動態生成唯一隨機值，安全授權合法腳本"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">1. HTML 標籤帶上 nonce 屬性</div>
        <JsonCard
          filename="index.html"
          :code="`<script nonce='random123'>
  console.log('hello secure world');
</script>`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-purple-400 mb-2">2. CSP Header 帶上對應 nonce</div>
        <JsonCard
          filename="response_header.http"
          :code="`Content-Security-Policy:
  script-src 'self' 'nonce-random123';`"
        />
      </div>
    </div>
  </SlideShell>
</template>
