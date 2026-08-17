<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CONFIGURATION"
      title="配置參數 (Options)：root, rootMargin, threshold"
      subtitle="客製化觀察邊界與靈敏度閥值"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">Options 結構</div>
        <JsonCard
          filename="options.js"
          :code="`const options = {
  root: null,          // null 代表瀏覽器視窗 (Viewport)
  rootMargin: '100px', // 擴展/縮小判定邊界
  threshold: 0.5       // 可見比例達到 50% 時觸發
};

const observer = new IntersectionObserver(callback, options);`"
        />
      </div>

      <TechCard accent="purple" class="p-5">
        <div class="space-y-3 text-xs text-zinc-300">
          <div>
            <span class="text-cyan-300 font-bold font-mono">root</span>
            <p>指定作為滾動容器的祖先元素。預設為 `null`（整頁 Viewport）。</p>
          </div>
          <div>
            <span class="text-purple-300 font-bold font-mono">rootMargin</span>
            <p>類似 CSS margin（如 `'200px 0px'`），可用於提早 200px 預先載入資源。</p>
          </div>
          <div>
            <span class="text-emerald-300 font-bold font-mono">threshold</span>
            <p>觸發回調的比例門檻（0.0 ~ 1.0），可傳入單一數值或陣列 `[0, 0.5, 1.0]`。</p>
          </div>
        </div>
      </TechCard>
    </div>
  </SlideShell>
</template>
