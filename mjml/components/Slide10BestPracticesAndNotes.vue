<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="BEST PRACTICES"
      title="Email 排版黃金心法與測試工具"
      subtitle="以最保守的結構實現最高品質的跨平台一致性"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <TechCard accent="cyan" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">🧪 跨客戶端即時測試工具</h4>
        <p class="text-xs text-zinc-300">上線前務必使用 <span class="text-cyan-300 font-bold">Litmus</span> 或 <span class="text-cyan-300 font-bold">Email on Acid</span> 進行超過 50+ 款用戶端截圖測試。</p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">📏 行高一律使用明確 px</h4>
        <p class="text-xs text-zinc-300">避免使用 `line-height: normal` 或純倍數，防止微軟渲染引擎擠壓文字或垂直裁切。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">🧱 使用 &amp;lt;mj-spacer&amp;gt; 取代 Margin</h4>
        <p class="text-xs text-zinc-300">所有區塊垂直間距交由 MJML Spacer 元件處理，跨平台最穩定。</p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">🖼️ 保持版型簡約，圖片嚴格限制</h4>
        <p class="text-xs text-zinc-300">全面避免 SVG、複雜背景圖與動畫，圖片格式限定為 PNG / JPG / WebP。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
