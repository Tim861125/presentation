<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DEFINITION"
      title="What is IntersectionObserver?"
      subtitle="瀏覽器原生非同步可視區域重疊觀察 API"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-center">
      <TechCard accent="cyan" class="p-6">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">核心機制</TechBadge>
        </div>
        <ul class="text-sm text-zinc-300 space-y-2.5 list-disc list-inside leading-relaxed">
          <li>非同步觀察目標元素與其祖先元素或視窗 (Viewport) 的交叉重疊變化</li>
          <li>自動偵測元素「進入」或「離開」畫面可視區域</li>
          <li>完全擺脫繁重的 scroll 事件監聽與手動邊界座標換算</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-6">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">關鍵效能優勢</TechBadge>
        </div>
        <p class="text-sm text-zinc-200 leading-relaxed">
          由瀏覽器底層優化排程，不阻塞主執行緒 (Main Thread)，徹底杜絕傳統滾動監聽引發的 Layout Thrashing 與掉幀。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
