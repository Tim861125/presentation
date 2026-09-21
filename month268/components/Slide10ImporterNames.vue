<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DATA-IMPORTER · L2"
      title="TW Embedding 與 L2 Name Jobs"
      subtitle="向量嵌入接入與人名資料攤平建表"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky" label="170634" />
          <span class="text-xs font-mono text-zinc-400">TW EMBEDDING</span>
        </div>
        <h3 class="text-base font-semibold text-white mb-2">TWA / TWB L2 embedding jobs</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>共用 embedding Input Function：依格式化專利號讀 L1 書目、呼叫 embedding API</li>
          <li>六支 L3 搜尋 job 欄位銜接，純 Transform 完整單元測試</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald" label="171512 / 171662 / 171663 / 171665" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">四國 L2 name jobs</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>申請人 / 發明人攤平寫入 PostgreSQL（TW · JP · CN · KR）</li>
          <li>Citus 分散表以 <code>formatted_pn</code> 為分佈鍵，真實 fixture 完整相等測試</li>
        </ul>
      </TechCard>
    </div>

    <div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3 mt-4">
      <p class="text-xs text-zinc-400">輸出重構（171666）：陣列資料列轉換抽至 <code>factories/output/postgres.ts</code> 共用，四國 job 行為一致 · twa 即期 embedding 排查（170919）</p>
    </div>
  </SlideShell>
</template>
