<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SUMMARY"
      title="核心總結"
      subtitle="強大、宣告式且極致流暢的現代視窗偵測標準"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <TechCard accent="emerald" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ 顛覆傳統的高效能</h4>
        <p class="text-xs text-zinc-300">徹底告別 scroll 事件的高頻計算，非同步交由瀏覽器底層優化排程。</p>
      </TechCard>

      <TechCard accent="cyan" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ 簡潔的宣告式 API</h4>
        <p class="text-xs text-zinc-300">統一封裝 entries、intersectionRatio 與 boundingClientRect 等完整座標資訊。</p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ 橫跨多元業務情境</h4>
        <p class="text-xs text-zinc-300">完美勝任 Lazyload、無限滾動分頁、進場視差動畫與廣告有效曝光埋點。</p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ 全球瀏覽器全面原生相容</h4>
        <p class="text-xs text-zinc-300">2016 年至今支援度達 97%+，現代前端開發必備核心 API。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
