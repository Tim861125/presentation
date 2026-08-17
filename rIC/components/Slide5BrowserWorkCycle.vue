<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="FRAME TIMELINE"
      title="一幀 (16.67ms) 的工作週期與 rIC 時機"
      subtitle="在 Input ➔ rAF ➔ Paint 完成後的 Idle Period 執行"
    />

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      <TechCard accent="sky" class="p-4">
        <div class="text-xs font-mono text-sky-400 mb-1">01. 使用者輸入</div>
        <p class="text-xs text-zinc-300">處理 click, touch, keydown 事件</p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <div class="text-xs font-mono text-purple-400 mb-1">02. 動畫計算</div>
        <p class="text-xs text-zinc-300">執行 requestAnimationFrame 回調</p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <div class="text-xs font-mono text-amber-400 mb-1">03. 樣式佈局與繪製</div>
        <p class="text-xs text-zinc-300">Style, Layout, Paint & Composite</p>
      </TechCard>

      <TechCard accent="emerald" class="p-4 border-emerald-500/50">
        <div class="text-xs font-mono text-emerald-400 font-bold mb-1">04. 閒置時間 (rIC) ⭐</div>
        <p class="text-xs text-emerald-200">若離 16.67ms 尚有剩餘時間，執行 rIC</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
