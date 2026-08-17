<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="OUTLOOK PITFALLS 2"
      title="Outlook 踩坑要點 (二)：間距、向量圖與尺寸限制"
      subtitle="Spacer 代替 Margin · PNG 代替 SVG"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <TechCard accent="amber" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">5. margin 全面無效</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          所有外邊距在 Outlook 均失效。垂直留白請一律使用 <span class="text-amber-300 font-mono">&amp;lt;mj-spacer height="20px" /&amp;gt;</span> 或 padding。
        </p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">6. SVG 圖檔無法顯示</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          Outlook 桌機版完全不渲染向量 SVG 圖檔，Logo 與 Icon 請務必轉換為高解析度 <span class="text-amber-300 font-bold">PNG / WebP</span>。
        </p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">7. min-height / max-width</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          CSS 限制尺寸屬性無效，需靠 MJML 實體 table 寬度屬性與內文撐開。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
