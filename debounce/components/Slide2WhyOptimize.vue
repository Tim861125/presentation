<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="BACKGROUND"
      title="為什麼前端需要頻率優化？"
      subtitle="高頻事件觸發引發的重繪、回流與網路資源浪費"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">高頻觸發事件</TechBadge>
        </div>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li><span class="text-white font-semibold">scroll</span> — 滾動事件 (每秒可觸發數十至上百次)</li>
          <li><span class="text-white font-semibold">resize</span> — 視窗尺寸改變</li>
          <li><span class="text-white font-semibold">input / keyup</span> — 輸入框內容即時變動</li>
          <li><span class="text-white font-semibold">mousemove</span> — 滑鼠軌跡移動</li>
        </ul>
      </TechCard>

      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">未優化引發的代價</TechBadge>
        </div>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>每次觸發都發送後端 API ➔ 伺服器遭受非必要流量衝擊</li>
          <li>高頻操作 DOM 與樣式計算 ➔ 畫面卡頓、FPS 驟降</li>
          <li>複雜矩陣運算 ➔ 阻塞主執行緒 (Main Thread)</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
