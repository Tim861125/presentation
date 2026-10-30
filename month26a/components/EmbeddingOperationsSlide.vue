<template>
  <MonthlySlideFrame
    eyebrow="DATA PLATFORM"
    title="為大批量轉置補上安全邊界"
    subtitle="能跑得快，也要知道跑到哪裡、怎麼接續"
  >
    <div class="grid grid-cols-2 gap-8">
      <ul class="space-y-5 text-lg leading-relaxed text-zinc-300">
        <li>向量 index 統一 <code>pat_vector_{source}_{year}_v{version}</code></li>
        <li>CA onto <code>_id</code> 使用來源原值，依公告年份分流 index</li>
        <li>多端點 round-robin，固定端點重試，不 failover</li>
        <li>中斷時提示 <code>START_AFTER_SYS_NO</code></li>
      </ul>
      <ul class="space-y-5 text-lg leading-relaxed text-zinc-300">
        <li><code>concurrency × 2</code> 預取佇列重疊 PostgreSQL 與 embedding API</li>
        <li>計時與彙總區分 indexed／failed，錯誤不輸出專利全文與向量</li>
        <li>22 個來源、50 筆 fixture 與 TAC hash 證據</li>
        <li>明確區分離線基準與尚未完成的完整資料驗收</li>
      </ul>
    </div>
  </MonthlySlideFrame>
</template>
