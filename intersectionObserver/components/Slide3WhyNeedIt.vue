<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="PAIN POINTS"
      title="為什麼需要它？傳統方式的效能瓶頸"
      subtitle="scroll 事件結合 getBoundingClientRect() 引發的頻繁重排 (Reflow)"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-rose-400 mb-2">❌ 舊做法：高頻監聽 + 強制同步佈局</div>
        <JsonCard
          filename="legacy_scroll.js"
          :code="`window.addEventListener('scroll', () => {
  // 強制觸發重排 (Reflow) 計算幾何資訊
  const rect = element.getBoundingClientRect();

  if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
    loadImage();
  }
});`"
        />
      </div>

      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">致命缺陷</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>滾動時每秒觸發上百次回調函式</li>
          <li><code class="text-rose-300 font-mono">getBoundingClientRect()</code> 強制瀏覽器立刻同步重繪</li>
          <li>多個元素各自綁定時引發嚴重的 Layout Thrashing</li>
          <li>難以處理 iframe、巢狀 overflow 容器邊界</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
