<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="OUTLOOK COMPATIBILITY"
      title="萬惡的 Outlook：可以安全正常使用的標籤"
      subtitle="MJML 在編譯時自動轉換為 VML 與 Nested Table 來支援 Outlook"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <TechCard accent="emerald" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ &amp;lt;mj-section&amp;gt; / &amp;lt;mj-column&amp;gt;</h4>
        <p class="text-xs text-zinc-300">Outlook 會自動以 table 結構安全渲染，保持版面寬度不崩塌。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ &amp;lt;mj-text&amp;gt;</h4>
        <p class="text-xs text-zinc-300">文字排版正常，但強烈建議務必設定具體的 `line-height` (px)。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ &amp;lt;mj-image&amp;gt;</h4>
        <p class="text-xs text-zinc-300">支援良好，務必給予固定 `width` 寬度與 `alt` 文字。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ &amp;lt;mj-button&amp;gt;</h4>
        <p class="text-xs text-zinc-300">MJML 自動使用微軟專屬 VML &amp;lt;v:roundrect&amp;gt; 模擬圓角按鈕。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
