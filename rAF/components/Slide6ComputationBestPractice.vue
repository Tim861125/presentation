<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="BEST PRACTICES"
      title="最佳實踐：避免在回調中進行繁重計算"
      subtitle="將高耗時邏輯移至 Web Worker，保持回調耗時在 5ms 以內"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-rose-400 mb-2">❌ 錯誤：在幀回調中執行複雜計算 (導致掉幀)</div>
        <JsonCard
          filename="bad_raf.js"
          :code="`function animate() {
  heavyComputation(); // 耗時 > 16ms ➔ 掉幀！
  updateDOM();
  requestAnimationFrame(animate);
}`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-emerald-400 mb-2">✅ 正確：僅負責輕量 DOM / Canvas 寫入</div>
        <JsonCard
          filename="good_raf.js"
          :code="`function animate() {
  // 只套用預先計算好的座標或樣式
  updateDOM();
  requestAnimationFrame(animate);
}`"
        />
      </div>
    </div>
  </SlideShell>
</template>
