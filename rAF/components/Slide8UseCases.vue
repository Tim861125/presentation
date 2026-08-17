<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="APPLICATIONS"
      title="rAF 五大經典應用場景"
      subtitle="從平滑滾動、Canvas 遊戲引擎到複雜資料視覺化"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <TechCard accent="cyan" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">1. 自訂平滑滾動 (Smooth Scroll)</h4>
        <p class="text-xs text-zinc-300">精準控制滾動緩動曲線 (Easing Function)。</p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">2. Canvas / WebGL 遊戲循環</h4>
        <p class="text-xs text-zinc-300">粒子系統、物理引擎模擬與即時著色器渲染。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">3. 視差滾動效果 (Parallax)</h4>
        <p class="text-xs text-zinc-300">多圖層非線性差速位移。</p>
      </TechCard>

      <TechCard accent="sky" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">4. 數字翻牌與進度條</h4>
        <p class="text-xs text-zinc-300">流暢的數值漸變與圖表填滿過渡。</p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">5. 互動式資料視覺化</h4>
        <p class="text-xs text-zinc-300">D3.js / ECharts 動態節點力導向圖模擬。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
