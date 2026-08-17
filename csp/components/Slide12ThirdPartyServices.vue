<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="THIRD-PARTY SCRIPTS"
      title="特殊情況：GA / GTM 等第三方服務"
      subtitle="Google Analytics 與 Tag Manager 的安全配置策略"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 items-center">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">為 GA 內嵌追蹤碼加上 Nonce</div>
        <JsonCard
          filename="ga_snippet.html"
          :code="`<script nonce='<%= nonce %>'>
  (function(i,s,o,g,r,a,m){
    /* Google Analytics 注入邏輯 */
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
</script>`"
        />
      </div>

      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">資安鐵律</TechBadge>
        </div>
        <p class="text-sm text-zinc-300 leading-relaxed">
          切勿為了省事而對第三方代碼放行 `'unsafe-inline'`！一旦放行，所有 XSS 攻擊者皆可偽裝成合法腳本執行，全站防線即刻崩潰。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
