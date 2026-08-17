<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="RECIPE 2"
      title="實戰範例二：閒置期間靜態資源預載"
      subtitle="利用用戶閱讀停留的空白期，預載下一章圖片"
    />

    <div class="mt-4">
      <JsonCard
        filename="preload_images.js"
        :code="`const imagesToPreload = [
  '/images/chapter2_hero.webp',
  '/images/chapter2_bg.webp',
  '/images/chapter2_diagram.webp'
];

function preloadImages(deadline) {
  while (deadline.timeRemaining() > 0 && imagesToPreload.length > 0) {
    const img = new Image();
    img.src = imagesToPreload.shift();
    // 預載圖片發起後讓出微小時間
    if (imagesToPreload.length > 0) break;
  }

  if (imagesToPreload.length > 0) {
    requestIdleCallback(preloadImages);
  }
}

requestIdleCallback(preloadImages);`"
      />
    </div>
  </SlideShell>
</template>
