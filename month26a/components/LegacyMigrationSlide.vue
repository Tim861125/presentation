<template>
  <MonthlySlideFrame
    eyebrow="DATA MIGRATION"
    title="舊資料轉置可靠性"
    subtitle="收斂設定、分年執行，避免誤讀與誤寫"
  >
      <ul class="space-y-5 text-lg leading-relaxed text-zinc-300">
        <li>EP／KR 來源改單一 <code>SOURCE_INDEX</code>，JP 案別由 index 名推導</li>
        <li><code>PD_YEARS</code> 讓 EP、JP、KR、WA 逐年處理，續跑 offset 只套當年</li>
        <li>JP <code>TARGET_TABLE_NAME</code> 限制對應案別；移除 SOURCE／index 不一致風險</li>
        <li>六國 usage runbook 統一 ES → L1 → L2 → L3 → OS 操作步驟</li>
        <li>各國 <code>pn</code>／<code>apn</code> formatter 對齊，非法資料個別處理</li>
      </ul>
  </MonthlySlideFrame>
</template>
