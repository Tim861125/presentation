<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SUMMARY"
      title="核心總結"
      subtitle="瀏覽器視覺更新與動畫執行的黃金標準"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <TechCard accent="emerald" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ 幀率嚴格同步</h4>
        <p class="text-xs text-zinc-300">永遠與顯示器垂直同步 (V-Sync) 頻率一致，徹底消除掉幀與撕裂。</p>
      </TechCard>

      <TechCard accent="cyan" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ 智慧省電優化</h4>
        <p class="text-xs text-zinc-300">背景分頁自動暫停調度，零浪費 CPU 與電池續航。</p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ 高精度時間戳</h4>
        <p class="text-xs text-zinc-300">自帶 DOMHighResTimeStamp，使得補間動畫 (Tweening) 計算精準無比。</p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ 現代 Web 動畫基石</h4>
        <p class="text-xs text-zinc-300">進行任何 JavaScript 視覺更新時，優先考慮 requestAnimationFrame！</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
