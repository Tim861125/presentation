<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="資料轉置 · CURRENT & L3"
      title="即期與 L3 資料處理"
      subtitle="批次轉置、系統號合併與索引補資料"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky" label="即期轉置" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">即期轉 2~3 期</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>欄位正規化、識別碼格式化、國別與文獻種類判定</li>
          <li>筆數與必填欄位檢查，異常來源保留可追蹤結果</li>
          <li>補即期資料一期至 OpenSearch；補 WA／EUIPO 測試資料</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald" label="L3 合併" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">onto 系統號合併</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>整理世界各國 onto 資料系統號，合併至即期 L3 job</li>
          <li>後續修正 onto 系統號並重跑合併工作</li>
          <li>各國 ES 資料至 L3（進行中）</li>
        </ul>
      </TechCard>
    </div>

    <div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3 mt-4">
      <p class="text-xs text-zinc-400">更新資料轉置 KM 紀錄（各國逐年筆數）· 整理 ES to Citus 預估時間文件</p>
    </div>
  </SlideShell>
</template>
