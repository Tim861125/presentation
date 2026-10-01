<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="資料轉置 · DOCDB"
      title="DOCDB 世界各國拓展"
      subtitle="schema 盤點與可追溯的整合設計"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky" label="SCHEMA" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">共同欄位規格</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>專利號、申請案號、國別、文獻種類、日期等共同轉置欄位設計</li>
          <li>國別特有欄位採明確 mapping 與正規化，避免語意誤併</li>
          <li>與學長討論 docdb 拓展規格並確認各國 OS mapping</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald" label="MAPPING" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">合併與寫入修正</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>合併欄位修正：優先來源與空值處理，不覆蓋正確內容</li>
          <li>OS mapping：文字／日期／數值型別正確寫入，格式化專利號支援去重</li>
          <li>建立測試 fixture：國別、公開／公告、缺漏與特殊格式情境</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
