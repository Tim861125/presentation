<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="BEST PRACTICES"
      title="工程實務三大最佳實踐"
      subtitle="完成即解綁、元件銷毀清理與預載邊界調優"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">01. 載入後即解綁</TechBadge>
        </div>
        <h4 class="text-sm font-semibold text-white mb-2">Unobserve When Done</h4>
        <JsonCard
          filename="unobserve.js"
          :code="`if (entry.isIntersecting) {
  loadContent();
  observer.unobserve(entry.target);
}`"
        />
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">02. 生命週期銷毀</TechBadge>
        </div>
        <h4 class="text-sm font-semibold text-white mb-2">Vue / React 清理</h4>
        <JsonCard
          filename="cleanup.ts"
          :code="`onUnmounted(() => {
  observer.disconnect();
});`"
        />
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">03. rootMargin 體驗</TechBadge>
        </div>
        <h4 class="text-sm font-semibold text-white mb-2">平滑無縫加載</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          設定 `rootMargin: '300px'` 在圖片進入視窗前提早請求完成，使用者完全無感知等待。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
