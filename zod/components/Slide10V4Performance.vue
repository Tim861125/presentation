<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="PERFORMANCE"
      title="Zod v4 核心效能躍升"
      subtitle="重寫驗證引擎核心、記憶體大幅降低 30%"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">SPEED BOOST</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">執行速度倍增</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>核心引擎全面重寫，簡化內部閉包與函式呼叫</li>
          <li>簡單物件驗證提升約 2~3 倍速度</li>
          <li>深度巢狀結構驗證提升約 1.5~2 倍速度</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">MEMORY OPTIMIZATION</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">記憶體佔用降低 30%</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>Core 程式碼大小縮減約 15%</li>
          <li>全新架構提供完美的 Tree-shaking 支援</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
