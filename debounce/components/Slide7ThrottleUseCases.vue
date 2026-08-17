<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="APPLICATIONS"
      title="Throttle 典型應用場景"
      subtitle="無限滾動 (Infinite Scroll)、即時數據圖表與拖曳監聽"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">無限滾動載入 (Infinite Scroll)</TechBadge>
        </div>
        <div class="font-mono text-xs text-zinc-300 space-y-1 bg-black/40 p-3 rounded mb-3">
          <div>window.addEventListener('scroll',</div>
          <div>&nbsp;&nbsp;throttle(() => {</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;if (isNearBottom()) loadMore();</div>
          <div>&nbsp;&nbsp;}, 200)</div>
          <div>);</div>
        </div>
        <p class="text-xs text-zinc-400">固定每 200ms 檢查一次是否接近底部，避免瘋狂觸發重算。</p>
      </TechCard>

      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">即時行情與 Canvas 繪圖</TechBadge>
        </div>
        <div class="font-mono text-xs text-zinc-300 space-y-1 bg-black/40 p-3 rounded mb-3">
          <div>socket.on('stock-tick',</div>
          <div>&nbsp;&nbsp;throttle((data) => {</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;updateChart(data);</div>
          <div>&nbsp;&nbsp;}, 1000)</div>
          <div>);</div>
        </div>
        <p class="text-xs text-zinc-400">防止高頻 WebSocket 訊息過度頻繁重繪圖表，保持 60 FPS 流暢度。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
