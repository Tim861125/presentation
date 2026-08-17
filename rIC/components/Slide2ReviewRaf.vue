<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="RECAP"
      title="前情回顧：requestAnimationFrame 的定位"
      subtitle="專注於每幀繪製前的極高優先級視覺更新"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 items-center">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">rAF 核心特質</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>嚴格在瀏覽器下一次重繪 (Paint) 之前執行</li>
          <li>標準幀率 60 FPS (約每 16.67ms 觸發一次)</li>
          <li>專為「時間敏感、視覺關鍵」的連續動畫設計</li>
          <li>必須在每一幀優先佔用主執行緒資源</li>
        </ul>
      </TechCard>

      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">rAF 典型寫法</div>
        <JsonCard
          filename="raf_loop.js"
          :code="`function animate() {
  updateVisuals();
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);`"
        />
      </div>
    </div>
  </SlideShell>
</template>
