<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="OVERVIEW"
      title="什麼是 MJML？傳統 HTML Email 痛點 vs 解決方案"
      subtitle="Mailjet Markup Language：專為跨郵件客戶端設計的開源標記語言"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">❌ 傳統 HTML 郵件噩夢</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>必須使用 90 年代的老舊巢狀 table 佈局</li>
          <li>所有 CSS 樣式必須手動 Inline 內聯化</li>
          <li>跨平台 (Outlook / Gmail / Apple Mail) 渲染破碎</li>
          <li>手機與桌機雙端響應式 (RWD) 實作極端困難</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">✅ MJML 救贖方案</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>高階語義化組件 (&lt;mj-section&gt;, &lt;mj-column&gt;)</li>
          <li>自動編譯轉換為高相容性、內聯化的原生 HTML</li>
          <li>內建跨平台與 Microsoft Word 引擎相容修復 (VML)</li>
          <li>開箱即用的百分百響應式佈局支援</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
