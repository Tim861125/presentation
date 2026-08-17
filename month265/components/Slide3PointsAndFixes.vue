<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH / WEBPAT · BUG FIXES"
      title="點數與功能修正"
      subtitle="完善點數扣抵生命週期與 AI 模組穩定度提升"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">點數機制</TechBadge>
          <span class="text-xs font-mono text-zinc-400">CREDIT MANAGEMENT</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">點數扣抵與處理</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>分類通點數不足之阻擋與提示處理</li>
          <li>點數管理後台手動扣點與紀錄功能</li>
        </ul>
      </TechCard>

      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">功能修正</TechBadge>
          <span class="text-xs font-mono text-zinc-400">STABILITY FIXES</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">閱讀通、價值通與檢索通</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>閱讀通、價值通自動執行功能邏輯修正</li>
          <li>檢索通新增異常錯誤捕捉與修復連續提問問題</li>
          <li>IPTECH 專案批次下載專利異常修復</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
