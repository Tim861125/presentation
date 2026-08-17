<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="PITFALLS"
      title="常見誤區與避坑指南"
      subtitle="避免過度觀察、SPA 記憶體洩漏與 CSS 原生替代方案"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">切勿觀察過多元件</TechBadge>
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          避免為畫面上數萬個 DOM 節點各自新建實例。應針對不同業務功能共用單一 Observer 實例。
        </p>
      </TechCard>

      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">SPA 路由切換記憶體洩漏</TechBadge>
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          在 Vue / React 單頁應用中，若離開頁面未呼叫 `disconnect()`，Observer 會持續常駐記憶體造成洩漏。
        </p>
      </TechCard>

      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">勿盲目取代原生 CSS</TechBadge>
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          固定導覽列建議優先使用 CSS <code class="text-cyan-300 font-mono">position: sticky</code>，視差滾動可考慮 CSS `animation-timeline`。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
