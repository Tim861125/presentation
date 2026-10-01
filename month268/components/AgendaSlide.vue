<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="2026-08 · AGENDA"
      title="本月異動項目"
      subtitle="四大主線與維護、排查工作"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mt-5">
      <div class="flex items-baseline gap-3 border-b border-white/5 pb-2">
        <span class="text-[10px] font-mono text-cyan-400 shrink-0">01</span>
        <div>
          <p class="text-sm font-semibold text-white">多國家檢索註冊表</p>
          <p class="text-xs font-mono text-zinc-400">合併鍵改 country + 申請號，新增一國僅需註冊表兩筆</p>
        </div>
      </div>
      <div class="flex items-baseline gap-3 border-b border-white/5 pb-2">
        <span class="text-[10px] font-mono text-cyan-400 shrink-0">02</span>
        <div>
          <p class="text-sm font-semibold text-white">檢索全面改接 UPat</p>
          <p class="text-xs font-mono text-zinc-400">kNN 只回向量，內容以 ID 批次向 UPat 補回（200 筆 182ms）</p>
        </div>
      </div>
      <div class="flex items-baseline gap-3 border-b border-white/5 pb-2">
        <span class="text-[10px] font-mono text-cyan-400 shrink-0">03</span>
        <div>
          <p class="text-sm font-semibold text-white">CN 專利向量轉置 5,230 萬筆</p>
          <p class="text-xs font-mono text-zinc-400">來源端 SOURCE_FILTER 分流，僅存向量索引 + checkpoint 續跑</p>
        </div>
      </div>
      <div class="flex items-baseline gap-3 border-b border-white/5 pb-2">
        <span class="text-[10px] font-mono text-cyan-400 shrink-0">04</span>
        <div>
          <p class="text-sm font-semibold text-white">即期資轉管線依 ADR 重整</p>
          <p class="text-xs font-mono text-zinc-400">L2 待更新清單驅動 L3 重建，路徑線索可反推 RAW XML</p>
        </div>
      </div>
      <div class="flex items-baseline gap-3 border-b border-white/5 pb-2">
        <span class="text-[10px] font-mono text-cyan-400 shrink-0">05</span>
        <div>
          <p class="text-sm font-semibold text-white">es-to-citus 歷史資料回填</p>
          <p class="text-xs font-mono text-zinc-400">ES Scroll 全量讀取 + 身分三元組 upsert，六國 + WOA 上線</p>
        </div>
      </div>
      <div class="flex items-baseline gap-3 border-b border-white/5 pb-2">
        <span class="text-[10px] font-mono text-cyan-400 shrink-0">06</span>
        <div>
          <p class="text-sm font-semibold text-white">快檢通與 WEBPAT 修正發版</p>
          <p class="text-xs font-mono text-zinc-400">美國檢索範圍 + KNN 語意排序，v8.0.159 / v8.0.218 上線</p>
        </div>
      </div>
      <div class="flex items-baseline gap-3 border-b border-white/5 pb-2 md:col-span-2">
        <span class="text-[10px] font-mono text-cyan-400 shrink-0">07</span>
        <div>
          <p class="text-sm font-semibold text-white">排查、維運與工具</p>
          <p class="text-xs font-mono text-zinc-400">通知寄送失敗追到 SMTP 根因；sep-tool 移除 673 行收斂職責</p>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
