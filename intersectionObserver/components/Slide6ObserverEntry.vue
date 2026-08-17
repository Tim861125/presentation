<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CALLBACK PAYLOAD"
      title="IntersectionObserverEntry 核心屬性"
      subtitle="回調函式中提供的豐富幾何與狀態資訊"
    />

    <div class="mt-4">
      <JsonCard
        filename="entry_properties.ts"
        :code="`const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.isIntersecting       // boolean: 當前是否處於可見交叉狀態
    entry.intersectionRatio    // number (0.0 ~ 1.0): 目標元素可見面積比例
    entry.target               // Element: 當前觸發事件的目標 DOM 節點
    entry.time                 // DOMHighResTimeStamp: 狀態變化的精確時間戳
    entry.boundingClientRect   // DOMRectReadOnly: 目標元素外框矩形邊界
    entry.intersectionRect     // DOMRectReadOnly: 實際重疊可見部分的矩形
    entry.rootBounds           // DOMRectReadOnly: 根視窗 (root) 的外框邊界
  });
});`"
      />
    </div>
  </SlideShell>
</template>
