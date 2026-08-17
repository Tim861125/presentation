<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CLEANUP"
      title="最佳實踐：務必妥善取消動畫 (Cancel Animation)"
      subtitle="防止元件卸載後遞迴持續執行引發記憶體洩漏"
    />

    <div class="mt-4">
      <JsonCard
        filename="raf_cleanup.ts"
        :code="`let animationId: number | null = null;

function start() {
  function loop(timestamp: number) {
    updateVisuals(timestamp);
    animationId = requestAnimationFrame(loop);
  }
  animationId = requestAnimationFrame(loop);
}

function stop() {
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

// Vue 元件卸載時立即清理
onUnmounted(() => stop());`"
      />
    </div>
  </SlideShell>
</template>
