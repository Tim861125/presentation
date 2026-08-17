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
          <li>設定檢索條件中之國家欄位跑版修復</li>
        </ul>
      </TechCard>

      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">體驗改善</TechBadge>
          <span class="text-xs font-mono text-zinc-400">USER EXPERIENCE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">意外關閉保護機制</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>架構尚未建立完成時若意外關閉視窗，新增狀態防呆與自動復原</li>
          <li>避免分析流程中斷造成資料丟失</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
