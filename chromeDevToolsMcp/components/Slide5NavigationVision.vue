<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="NAVIGATION & VISION"
      title="核心工具：頁面導航 (navigate_page) + 視覺截圖 (take_screenshot)"
      subtitle="網頁加載、等待載入狀態與多模態視覺畫面確認"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
      <div class="flex flex-col gap-3">
        <TechCard accent="blue" class="p-3.5">
          <div class="flex items-center justify-between mb-1">
            <code class="text-blue-300 font-bold text-xs">navigate_page</code>
            <TechBadge color="blue">Navigation</TechBadge>
          </div>
          <p class="text-xs text-zinc-400 mb-2">瀏覽器切換至指定 URL，支援等待 DOM 或網路完全載入後再繼續。</p>
          <div class="rounded-lg bg-black/40 border border-white/5 p-2 font-mono text-zinc-300 text-[11px]">
            打開 https://example.com/login
          </div>
        </TechCard>

        <TechCard accent="emerald" class="p-3.5">
          <div class="flex items-center justify-between mb-1">
            <code class="text-emerald-300 font-bold text-xs">take_screenshot</code>
            <TechBadge color="emerald">Vision</TechBadge>
          </div>
          <p class="text-xs text-zinc-400 mb-2">截取目前頁面的完整畫面，可指定解析度視窗或鎖定特定元素節點。</p>
          <div class="rounded-lg bg-black/40 border border-white/5 p-2 font-mono text-zinc-300 text-[11px]">
            截圖目前頁面，解析度設為 1440×900
          </div>
        </TechCard>
      </div>

      <TechCard accent="emerald" class="p-5 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <TechBadge color="emerald">組合使用範例 Prompt</TechBadge>
          </div>
          <div class="rounded-lg bg-black/40 border border-white/5 p-3 font-mono text-emerald-300 text-xs leading-relaxed">
            導航到 https://example.com，<br/>
            等待頁面完全載入，<br/>
            截圖並回傳圖片
          </div>
        </div>
        <div class="text-[11px] text-zinc-500 mt-3">
          💡 截圖會直接在對話中以圖片呈現，大模型可直觀分析頁面渲染狀態。
        </div>
      </TechCard>
    </div>
  </SlideShell>
</template>
