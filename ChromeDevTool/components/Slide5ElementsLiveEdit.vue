<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ELEMENTS PANEL"
      title="查看與修改 HTML & CSS"
      subtitle="免重整即可在瀏覽器端即時實驗 UI 樣式與排版效果"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <TechCard accent="cyan" class="p-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <TechBadge color="cyan">HTML 即時編輯</TechBadge>
          </div>
          <ul class="space-y-2 text-xs text-zinc-200 list-disc list-inside">
            <li>雙擊 DOM 節點即可即時修改標籤名、屬性與文字</li>
            <li>支援滑鼠拖曳直接調整 DOM 節點先後排序</li>
            <li>選取節點按下 <code class="text-cyan-300 bg-white/5 px-1 rounded">Delete</code> 鍵立即移除節點</li>
          </ul>
        </div>
        <div class="text-[11px] text-zinc-500 font-mono mt-3">
          💡 快捷操作：按 <code class="text-zinc-300">H</code> 可快速切換隱藏選取節點
        </div>
      </TechCard>

      <TechCard accent="blue" class="p-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <TechBadge color="blue">CSS 樣式除錯</TechBadge>
          </div>
          <ul class="space-y-2 text-xs text-zinc-200 list-disc list-inside">
            <li><strong class="text-white">Styles</strong> 窗格：顯示並即時開關 CSS 屬性</li>
            <li>點擊 <code class="text-blue-300 bg-white/5 px-1 rounded">:hov</code> 強制切換元素狀態（:hover, :active）</li>
            <li>點擊 <code class="text-blue-300 bg-white/5 px-1 rounded">.cls</code> 快速手動附加新 class 名稱</li>
          </ul>
        </div>
        <div class="flex items-center gap-3 p-2 rounded-lg bg-black/40 border border-white/5 mt-3">
          <span class="text-xs text-zinc-400">即時測試：</span>
          <button class="px-3 py-1 text-xs rounded-md bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all">
            懸停按鈕測試
          </button>
        </div>
      </TechCard>
    </div>
  </SlideShell>
</template>
