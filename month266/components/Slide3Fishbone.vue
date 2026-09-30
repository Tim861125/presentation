<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH · FISHBONE MODULE"
      title="IPTECH 魚骨通"
      subtitle="魚骨圖展示佈局修正與互動穩定性強化"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">版面修復</TechBadge>
          <span class="text-xs font-mono text-zinc-400">LAYOUT FIXES</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">功效與應用魚骨版面</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>修復功效／應用魚骨圖特定解析度下跑版</li>
          <li>設定檢索條件之國家欄位跑版修復</li>
          <li>魚骨節點文案限制 10～500 字元，修補重複詞輸出</li>
        </ul>
      </TechCard>

      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">體驗改善</TechBadge>
          <span class="text-xs font-mono text-zinc-400">USER EXPERIENCE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">意外關閉保護與生成修復</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>魚骨架構建立中關閉視窗改為雙重確認，避免分析資料遺失</li>
          <li>修復主題填入後畫面無魚骨的生成異常</li>
          <li>AI 端魚骨生成問題修復並調整 prompt</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
