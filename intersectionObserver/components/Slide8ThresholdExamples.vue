<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CONFIG PATTERNS"
      title="常用配置模式實例"
      subtitle="即時出現、完全進入、多段進度追蹤與預加載"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <TechCard accent="cyan" class="p-3">
        <div class="text-xs font-mono text-cyan-400 mb-1">露出 1px 立即觸發</div>
        <JsonCard
          filename="threshold_0.js"
          :code="`// 只要有任何 1 個像素露出來就觸發
new IntersectionObserver(cb, { threshold: 0 });`"
        />
      </TechCard>

      <TechCard accent="purple" class="p-3">
        <div class="text-xs font-mono text-purple-400 mb-1">完全進入可見區才觸發</div>
        <JsonCard
          filename="threshold_1.js"
          :code="`// 元素 100% 完整露出來才觸發
new IntersectionObserver(cb, { threshold: 1.0 });`"
        />
      </TechCard>

      <TechCard accent="amber" class="p-3">
        <div class="text-xs font-mono text-amber-400 mb-1">多段比例追蹤進度</div>
        <JsonCard
          filename="threshold_array.js"
          :code="`// 追蹤 0%, 25%, 50%, 75%, 100% 滾動進度
new IntersectionObserver(cb, {
  threshold: [0, 0.25, 0.5, 0.75, 1]
});`"
        />
      </TechCard>

      <TechCard accent="emerald" class="p-3">
        <div class="text-xs font-mono text-emerald-400 mb-1">提早 200px 預加載</div>
        <JsonCard
          filename="root_margin.js"
          :code="`// 離進入視窗尚有 200px 時便提早發起載入
new IntersectionObserver(cb, {
  rootMargin: '200px'
});`"
        />
      </TechCard>
    </div>
  </SlideShell>
</template>
