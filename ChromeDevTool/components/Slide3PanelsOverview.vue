<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ARCHITECTURE"
      title="DevTools 六大核心面板一覽"
      subtitle="涵蓋 DOM 結構、腳本斷點、網路傳輸與效能分析"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <TechCard accent="cyan" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">1. Elements (DOM & CSS)</h4>
        <p class="text-xs text-zinc-300">顯示 DOM 階層結構，支援即時修改 HTML 節點與 CSS 樣式規則。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">2. Console (JS & Logs)</h4>
        <p class="text-xs text-zinc-300">輸出錯誤與日誌，支援即時執行 JavaScript 指令與 API 互動。</p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">3. Network (HTTP & WS)</h4>
        <p class="text-xs text-zinc-300">監控 Request / Response，分析 API 狀態碼、傳輸耗時與資源大小。</p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">4. Performance (Profiling)</h4>
        <p class="text-xs text-zinc-300">錄製頁面渲染管線，分析 FPS 掉幀、主執行緒阻塞與記憶體漏水。</p>
      </TechCard>

      <TechCard accent="sky" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">5. Application (Storage)</h4>
        <p class="text-xs text-zinc-300">檢查 LocalStorage、SessionStorage、Cookies、IndexedDB 與 Cache。</p>
      </TechCard>

      <TechCard accent="rose" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">6. Security (HTTPS)</h4>
        <p class="text-xs text-zinc-300">驗證 HTTPS 憑證有效性，排查混合內容 (Mixed Content) 警訊。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
