<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="API USAGE"
      title="基本語法與生命週期"
      subtitle="創建實例、註冊目標元素與銷毀監聽"
    />

    <div class="mt-4">
      <JsonCard
        filename="intersection_syntax.js"
        :code="`// 1. 建立觀察器實例
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    console.log('Is intersecting:', entry.isIntersecting);
    console.log('Intersection ratio:', entry.intersectionRatio);
  });
});

// 2. 開始觀察目標 DOM 節點
observer.observe(document.querySelector('.target-card'));

// 3. 停止觀察單一元素 或 銷毀全部觀察
// observer.unobserve(targetElement);
// observer.disconnect();`"
      />
    </div>
  </SlideShell>
</template>
