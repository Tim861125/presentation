<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="PIPELINE"
      title="瀏覽器渲染流水線與 rAF 執行時機"
      subtitle="在 Style ➔ Layout ➔ Paint ➔ Composite 前置階段完成更新"
    />

    <div class="grid grid-cols-1 md:grid-cols-5 gap-3 mt-8">
      <TechCard accent="cyan" class="p-3">
        <div class="text-xs font-mono text-cyan-400 mb-1">01. JS / Event</div>
        <p class="text-xs text-zinc-300">宏任務與微任務執行</p>
      </TechCard>

      <TechCard accent="emerald" class="p-3 border-emerald-500/50">
        <div class="text-xs font-mono text-emerald-400 font-bold mb-1">02. rAF 回調 ⭐</div>
        <p class="text-xs text-emerald-200">精準於重繪前修改 DOM / Canvas</p>
      </TechCard>

      <TechCard accent="purple" class="p-3">
        <div class="text-xs font-mono text-purple-400 mb-1">03. Style & Layout</div>
        <p class="text-xs text-zinc-300">計算 CSS 規則與佈局幾何</p>
      </TechCard>

      <TechCard accent="sky" class="p-3">
        <div class="text-xs font-mono text-sky-400 mb-1">04. Paint & Composite</div>
        <p class="text-xs text-zinc-300">圖層繪製與 GPU 合成</p>
      </TechCard>

      <TechCard accent="amber" class="p-3">
        <div class="text-xs font-mono text-amber-400 mb-1">05. V-Sync 輸出</div>
        <p class="text-xs text-zinc-300">顯示器光柵掃描呈像</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
