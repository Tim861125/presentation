<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="RISK ANALYSIS"
      title="為什麼非得移除 'unsafe-inline'？"
      subtitle="保留 unsafe-inline 帶來的致命安全漏洞"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <TechCard accent="rose" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="rose">1. XSS 門戶大開</TechBadge>
        </div>
        <p class="text-xs text-zinc-300 mb-2">攻擊者可任意注入內嵌惡意腳本：</p>
        <code class="text-xs text-rose-300 font-mono bg-black/40 p-1.5 rounded block">&lt;img src=x onerror="alert('XSS')"&gt;</code>
      </TechCard>

      <TechCard accent="rose" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="rose">2. CSP 防護形同虛設</TechBadge>
        </div>
        <p class="text-xs text-zinc-300 mb-2">失去 CSP 最關鍵的執行阻擋力：</p>
        <code class="text-xs text-rose-300 font-mono bg-black/40 p-1.5 rounded block">&lt;script&gt;steal_data();&lt;/script&gt;</code>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="amber">3. 資安稽核合規問題</TechBadge>
        </div>
        <p class="text-xs text-zinc-300">不符合現代安全標準 (OWASP / ISO 27001)，無法通過第三方弱點滲透審查。</p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="amber">4. 維護黑洞</TechBadge>
        </div>
        <p class="text-xs text-zinc-300">無法分辨哪些 inline script 是業務合法程式，大幅增加資安管理盲區。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
