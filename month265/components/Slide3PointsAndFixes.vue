<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH / WEBPAT · BUG FIXES"
      title="點數與功能修正"
      subtitle="完善點數（AI 功能使用額度）扣抵生命週期與各 AI 模組穩定度"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">點數機制</TechBadge>
          <span class="text-xs font-mono text-zinc-400">CREDIT MANAGEMENT</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">點數不足處理與後台扣點</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>分類通批量分類回傳點數不足狀態，前端提示所需與剩餘點數、補點後清除異常狀態</li>
          <li>AI 點數管理後台無法扣點修復：重構扣點 API 與點數服務核心交易邏輯</li>
          <li>同步補寫點數調整 API 規格書</li>
        </ul>
      </TechCard>

      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">功能修正</TechBadge>
          <span class="text-xs font-mono text-zinc-400">STABILITY FIXES</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">閱讀通、檢索通與魚骨通</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>閱讀通／價值通（系統內 AI 分析模組）自動啟動修復：兩模組同設自動時僅單模組觸發，前後端同步修正偏好設定同步 API</li>
          <li>檢索通穩定性：修復查詢解析異常、補錯誤日誌；熱修問答代理對話歷史，解決無法提問第二次</li>
          <li>魚骨通（AI 魚骨圖分析）：修復版面位移、AI 產出視窗關閉加二次確認</li>
          <li>專案儲存後無法下載專利問題排查與修復</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
