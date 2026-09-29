<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="AI BILLING · FUNC-POINT-SERVICE"
      title="AI 點數計費微服務升級"
      subtitle="點數有了使用期限——扣款順序、排程作業、試開範圍、數值精度四件事一次到位"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard variant="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge label="到期與扣款順序" color="amber" />
          <span class="text-xs font-mono text-zinc-400">EXPIRY & CRON</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">一次 SQL 完成排序扣減</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>取代贈送／付費兩段式查詢：單次查詢以 ORDER BY 決定順序——到期日升序 → 同日 gifted 優先於 paid → 無到期日最後</li>
          <li>改由 cron 排程定期執行扣點，每筆寫入 PointTransaction 交易明細</li>
        </ul>
      </TechCard>

      <TechCard variant="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge label="白名單與整數化" color="rose" />
          <span class="text-xs font-mono text-zinc-400">WHITELIST + MATH.CEIL</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">功能試開與數值精度</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>功能白名單：新增白名單驗證與管理 UI，新功能先只開給指定帳號</li>
          <li>管理後台：使用紀錄新增日期明細頁、修正排序與大數值跑版</li>
          <li>點數顯示統一 Math.ceil 轉整數，杜絕小數四捨五入誤差</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
