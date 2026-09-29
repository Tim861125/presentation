<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH / WEBPAT · CONSISTENCY"
      title="雙平台一致性：點數顯示與使用者體驗"
      subtitle="兩平台各自發展多年，同一資訊顯示方式不同——本期把三個不一致點對齊"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <TechCard variant="emerald" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge label="點數顯示" color="emerald" />
        </div>
        <h4 class="text-base font-semibold text-white mb-2">點數餘額入口統一</h4>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>兩站前端統一：AI 未開通時右上角一律顯示「0 點」</li>
          <li>星星圖示配色改用 CSS 變數，兩站一致為黃色</li>
        </ul>
      </TechCard>

      <TechCard variant="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge label="餘額不足" color="amber" />
        </div>
        <h4 class="text-base font-semibold text-white mb-2">點數不足一定看得到提示</h4>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>彈窗「不再通知」狀態改存 localStorage，不再永久靜音</li>
          <li>手動觸發 AI 功能時強制再跳「點數不足」提示</li>
        </ul>
      </TechCard>

      <TechCard variant="blue" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge label="使用者資訊" color="blue" />
        </div>
        <h4 class="text-base font-semibold text-white mb-2">右上角顯示姓名</h4>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>IPTECH 頂欄資料綁定由登入帳號改為使用者姓名，對齊 WEBPAT</li>
        </ul>
      </TechCard>
    </div>

    <div class="mt-5 text-center font-mono text-[10px] tracking-wider text-zinc-500">
      本月上線：WEBPAT v8.0.139–v8.0.143 · IPTECH v8.0.108–v8.0.109 · func-point-service v1.0.15–v1.0.17
    </div>
  </SlideShell>
</template>
