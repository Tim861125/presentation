<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="NONCE IMPLEMENTATION"
      title="Nonce 伺服器端實作細節"
      subtitle="Node.js / Express 密碼學安全隨機生成範例"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">後端生成 Nonce 並注入 Header</div>
        <JsonCard
          filename="server.js"
          :code="`const crypto = require('crypto');

app.use((req, res, next) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  res.locals.nonce = nonce;
  res.setHeader('Content-Security-Policy',
    \`script-src 'self' 'nonce-\${nonce}'\`);
  next();
});`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-purple-400 mb-2">模板引擎 (EJS / Pug / Razor) 使用</div>
        <JsonCard
          filename="view.ejs"
          :code="`<script nonce='<%= nonce %>'>
  console.log('安全且可動態執行');
</script>`"
        />
        <div class="mt-3 text-xs text-emerald-400">
          ✓ 核心要求：每次 HTTP 請求都必須生成全域唯一的動態 Nonce，嚴禁重用。
        </div>
      </div>
    </div>
  </SlideShell>
</template>
