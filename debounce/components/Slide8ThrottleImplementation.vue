<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IMPLEMENTATION"
      title="Throttle 程式碼實作與冷卻機制"
      subtitle="基於定時器標記 (timerID / cooldown) 的節流控制"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">手寫 Throttle 核心邏輯</div>
        <JsonCard
          filename="throttle.js"
          :code="`function throttle(callback, delay) {
  let timerID = null;

  return function throttledFunction(...args) {
    // 若冷卻定時器存在，則直接忽略
    if (timerID) return;

    timerID = setTimeout(() => {
      callback.apply(this, args);
      timerID = null;  // 冷卻結束，允許下次觸發
    }, delay);
  };
}`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-purple-400 mb-2">執行歷程剖析</div>
        <JsonCard
          filename="timeline.js"
          :code="`const throttledLog = throttle(logScroll, 1000);

// 使用者每 100ms 快速觸發一次
// 0ms    ➔ 立即登記計時器
// 100ms  ➔ 處於冷卻期，直接忽略
// ...
// 1000ms ➔ 執行回調並重置 timerID ✓
// 1100ms ➔ 再次開啟全新週期 ✓`"
        />
      </div>
    </div>
  </SlideShell>
</template>
