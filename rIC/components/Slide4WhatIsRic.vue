<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DEFINITION"
      title="什麼是 requestIdleCallback (rIC)？"
      subtitle="瀏覽器在主執行緒「閒置空檔」安全執行低優先級工作的原生機制"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-center">
      <TechCard accent="cyan" class="p-6">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">核心原則</TechBadge>
        </div>
        <ul class="text-sm text-zinc-300 space-y-2.5 list-disc list-inside leading-relaxed">
          <li>僅在當前幀 (Frame) 完成必要工作後的<span class="text-cyan-400 font-semibold">剩餘空閒時間</span>執行</li>
          <li>優先級永遠低於渲染、CSS 動畫與使用者交互</li>
          <li>若瀏覽器極度繁忙，會自動延後調度避免阻礙關鍵路徑</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-6">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">React Fiber 的靈感源泉</TechBadge>
        </div>
        <p class="text-sm text-zinc-300 leading-relaxed">
          React 16+ 重構的 Fiber 調度器 (Scheduler) 與時間切片 (Time Slicing) 核心概念，即是基於 rIC 的協同式多工 (Cooperative Multitasking) 設計思想！
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
