<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="APPLICATIONS"
      title="四大核心應用場景"
      subtitle="圖片延遲載入、無限滾動、進場動畫與廣告曝光埋點"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <TechCard accent="cyan" class="p-4">
        <div class="flex items-center gap-2 mb-1">
          <TechBadge color="cyan">01</TechBadge>
          <h4 class="text-sm font-bold text-white">圖片延遲載入 (Lazy Loading)</h4>
        </div>
        <p class="text-xs text-zinc-300">進入視窗前才動態載入 high-res 圖片，極致節省首屏頻寬與加載時間。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <div class="flex items-center gap-2 mb-1">
          <TechBadge color="emerald">02</TechBadge>
          <h4 class="text-sm font-bold text-white">無限滾動分頁 (Infinite Scroll)</h4>
        </div>
        <p class="text-xs text-zinc-300">在列表底部設置 Sentinel 標記元素，一旦可見自動發起下一頁請求。</p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <div class="flex items-center gap-2 mb-1">
          <TechBadge color="purple">03</TechBadge>
          <h4 class="text-sm font-bold text-white">元素進場動畫觸發 (Scroll Reveal)</h4>
        </div>
        <p class="text-xs text-zinc-300">元素滾入視角 20% 時啟動 CSS / GSAP 漸入、縮放動畫。</p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <div class="flex items-center gap-2 mb-1">
          <TechBadge color="amber">04</TechBadge>
          <h4 class="text-sm font-bold text-white">精確廣告與可見度埋點 (Analytics)</h4>
        </div>
        <p class="text-xs text-zinc-300">精準統計廣告在畫面中停留超過 50% 達 1 秒以上的有效曝光次數。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
