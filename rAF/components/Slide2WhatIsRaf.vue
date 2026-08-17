<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DEFINITION"
      title="什麼是 requestAnimationFrame (rAF)？"
      subtitle="瀏覽器專為流暢視覺更新量身打造的重繪同步 API"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">核心特點</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li><span class="text-white font-semibold">與重繪嚴格同步</span>：在瀏覽器下一次 Paint 之前精準執行</li>
          <li><span class="text-white font-semibold">自動省電降頻</span>：分頁進入背景 (Hidden) 時自動暫停節省 CPU/GPU</li>
          <li><span class="text-white font-semibold">極致流暢幀率</span>：自動匹配螢幕刷新率 (60Hz / 120Hz ProMotion)</li>
          <li><span class="text-white font-semibold">微秒級高精時間</span>：傳入 DOMHighResTimeStamp 方便精確補間計算</li>
        </ul>
      </TechCard>

      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">基本遞迴驅動語法</div>
        <JsonCard
          filename="raf_loop.js"
          :code="`function animate(timestamp) {
  // 1. 更新動畫幾何或狀態
  update(timestamp);

  // 2. 請求下一幀重繪
  const animId = requestAnimationFrame(animate);
}

// 啟動動畫
const id = requestAnimationFrame(animate);

// 取消動畫
// cancelAnimationFrame(id);`"
        />
      </div>
    </div>
  </SlideShell>
</template>
