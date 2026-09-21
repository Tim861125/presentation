<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DATA-IMPORTER · ADR 0008 / 0009 / 0010"
      title="即期資轉統一更新鏈"
      subtitle="L2 待更新清單驅動 L3 重建，不再以卷期重掃全部 L1"
    />

    <div class="grid grid-cols-3 gap-4 mt-4">
      <div class="rounded-lg border border-cyan-400/30 bg-cyan-400/5 px-4 py-3">
        <p class="text-[11px] font-mono text-cyan-400 mb-1">ADR 0008</p>
        <p class="text-xs text-zinc-300">L2 待更新清單：以身分三元組（格式化專利號 + 申請號 + Kind Code）記錄待重建案件</p>
      </div>
      <div class="rounded-lg border border-cyan-400/30 bg-cyan-400/5 px-4 py-3">
        <p class="text-[11px] font-mono text-cyan-400 mb-1">ADR 0009</p>
        <p class="text-xs text-zinc-300">目標檔案路徑線索：volumeDir / caseDir / sourceBuckets 一路帶入搜尋文件，可反推 RAW XML 位置</p>
      </div>
      <div class="rounded-lg border border-cyan-400/30 bg-cyan-400/5 px-4 py-3">
        <p class="text-[11px] font-mono text-cyan-400 mb-1">ADR 0010</p>
        <p class="text-xs text-zinc-300">來源節點完整覆蓋：書目與 XML 節點具名保留，真實 fixture 精確比對</p>
      </div>
    </div>

    <table class="w-full mt-4 text-xs">
      <thead>
        <tr class="text-left text-zinc-400 border-b border-white/10">
          <th class="py-1.5 font-mono uppercase tracking-wider">國家</th>
          <th class="py-1.5 font-mono uppercase tracking-wider">案別</th>
          <th class="py-1.5 font-mono uppercase tracking-wider">完成重點</th>
        </tr>
      </thead>
      <tbody class="text-zinc-300">
        <tr class="border-b border-white/5"><td class="py-1.5">EP</td><td class="py-1.5">EPA / EPB</td><td class="py-1.5">待更新清單 + drawings / search-report / EP 參考文獻來源 XML 保留</td></tr>
        <tr class="border-b border-white/5"><td class="py-1.5">CN</td><td class="py-1.5">CB / CU / CD</td><td class="py-1.5">CBB → CB 全鏈改名、依公告日清單 + keyset cursor、設計書目節點補齊</td></tr>
        <tr class="border-b border-white/5"><td class="py-1.5">KR</td><td class="py-1.5">KD / KP / KU + KDA / KDB</td><td class="py-1.5">6 job 更新鏈、strict mapping 補 sourceDir / designSeq</td></tr>
        <tr class="border-b border-white/5"><td class="py-1.5">JP</td><td class="py-1.5">JPA / JPB / JPU / JPD</td><td class="py-1.5">路徑推導抽為共用 processor，bucket 可重現且不進搜尋文件</td></tr>
        <tr><td class="py-1.5">WO / CA</td><td class="py-1.5">WA 全文 / CA</td><td class="py-1.5">LexisNexis 欄位修正 + triggerTag mapping；三鍵 cursor + AFUL fixture</td></tr>
      </tbody>
    </table>
  </SlideShell>
</template>
