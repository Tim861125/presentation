<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="FORBIDDEN FEATURES"
      title="Outlook 嚴格禁用的現代 Web 特性"
      subtitle="這些特性在桌面版 Outlook 會完全失效或產生不可預期的版面破裂"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <TechCard accent="rose" class="p-4">
        <h4 class="text-sm font-bold text-rose-300 mb-1">❌ CSS Animation / Transition</h4>
        <p class="text-xs text-zinc-300">所有 CSS 關鍵影格動畫與過渡效果全部不支援，只會停留在初始靜態影格。</p>
      </TechCard>

      <TechCard accent="rose" class="p-4">
        <h4 class="text-sm font-bold text-rose-300 mb-1">❌ Web Fonts (Google Fonts)</h4>
        <p class="text-xs text-zinc-300">外掛網路字型極易失效，甚至強制回退到 Times New Roman，建議配置安全系統字型。</p>
      </TechCard>

      <TechCard accent="rose" class="p-4">
        <h4 class="text-sm font-bold text-rose-300 mb-1">❌ 動態 GIF 動畫播放</h4>
        <p class="text-xs text-zinc-300">Outlook 舊版桌機僅會固定顯示 GIF 的第一幀，重要的關鍵資訊絕不能放在 GIF 動態中。</p>
      </TechCard>

      <TechCard accent="rose" class="p-4">
        <h4 class="text-sm font-bold text-rose-300 mb-1">❌ Media Queries 媒體查詢</h4>
        <p class="text-xs text-zinc-300">桌機版 Word 引擎不解析 `@media`，僅能依靠 Fluid Table 與 Ghost Tables 實現流動響應。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
