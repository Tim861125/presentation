<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SOLUTION 3 (BEST PRACTICE)"
      title="方案三：腳本全面外掛化 (External Script)"
      subtitle="將所有 JavaScript 移至外部獨立檔案並透過 src 引用"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">1. 獨立 main.js 檔案</div>
        <JsonCard
          filename="main.js"
          :code="`console.log('hello world');
initApplication();`"
        />
        <div class="mt-3">
          <div class="text-xs font-mono text-cyan-400 mb-2">2. HTML 透過 src 引用</div>
          <JsonCard
            filename="index.html"
            :code="`<script src='/js/main.js'></script>`"
          />
        </div>
      </div>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">優勢總結</TechBadge>
        </div>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>架構最乾淨、最符合網頁工程最佳實踐</li>
          <li>CSP 設定極為簡單：`script-src 'self'`</li>
          <li>瀏覽器可對 .js 檔案進行強大快取 (HTTP Caching)</li>
          <li>便於現代 Bundler (Vite / Webpack) 進行代碼分割與壓縮</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
