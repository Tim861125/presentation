<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="BENEFITS"
      title="四大核心優勢"
      subtitle="記憶體精簡、支援動態注入、架構清晰與執行效能"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <TechCard accent="cyan" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">1. 極致減少記憶體使用</h4>
        <p class="text-xs text-zinc-300">1 個監聽器取代成百上千個回調函式與 Closure 佔用，避免記憶體洩漏 (Memory Leak)。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">2. 原生支援動態內容</h4>
        <p class="text-xs text-zinc-300">後續透過 Ajax 或 DOM API 動態新增的子元素，自動享有事件響應，完全不需手動重新綁定。</p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">3. 代碼集中好維護</h4>
        <p class="text-xs text-zinc-300">在單一父級入口集中管理分派邏輯，職責清晰，解綁或改造時極為簡單。</p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">4. 提升初始化效能</h4>
        <p class="text-xs text-zinc-300">頁面初次渲染時無需遍歷繁多 DOM 節點註冊事件，大幅縮短 TTI (Time to Interactive)。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
