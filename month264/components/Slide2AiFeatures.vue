<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH / WEBPAT · AI MODULES"
      title="分類通 · 微分通 · 魚骨通改版"
      subtitle="分類通（AI 專利自動分類）、微分通（分類樹細部調整）、魚骨通（因果魚骨圖分析）"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">分類與微分</TechBadge>
          <span class="text-xs font-mono text-zinc-400">CLASSIFICATION</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">分類頁優化</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>分類頁支援多個分類任務併行顯示，免切換比對結果</li>
          <li>新增工程模式：Shift+M 即時切換，跳過進階步驟頁快速分類</li>
          <li>微分通支援假刪除與移回未分類，節點調整可悔可復原</li>
        </ul>
      </TechCard>

      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">魚骨通</TechBadge>
          <span class="text-xs font-mono text-zinc-400">FISHBONE ANALYSIS</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">節點專利筆數修正</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>節點專利筆數範圍統一為 10~500，前後端參數驗證一致</li>
          <li>修正筆數解析與參數傳遞錯誤，魚骨圖顯示恢復穩定</li>
        </ul>
      </TechCard>

      <TechCard variant="rose" class="p-5 md:col-span-2">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">扣點機制</TechBadge>
          <span class="text-xs font-mono text-zinc-400">POINT DEDUCTION</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">AI 功能點數扣點修正</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>AI 分類與分析點數不足時，前端顯示明確點數提示訊息</li>
          <li>扣點背景服務成本單位重校；扣點服務當機導致專利無法顯示一併修復</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
