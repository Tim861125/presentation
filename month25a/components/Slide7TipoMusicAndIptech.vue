<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="TIPOMUSIC · IPTECH · MAILER"
      title="TIPOMUSIC、IPTECH 與其他系統調整"
      subtitle="音樂版權欄位取值邏輯、檢索修正與分析功能、專利異動通知信"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <TechCard variant="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge label="TIPOMUSIC" color="amber" />
        </div>
        <h4 class="text-base font-semibold text-white mb-2">「著作財產權人」改取值鏈</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          欄位資料來源改為 fallback 鏈：錄音著作權人（RecordOwner）→ 集管團體為 ARCO 時顯示發行公司 → 發行公司為空退回製作公司。
        </p>
      </TechCard>

      <TechCard variant="blue" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge label="IPTECH" color="blue" />
        </div>
        <h4 class="text-base font-semibold text-white mb-2">檢索修正與分析增強</h4>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>還原 ANDNOT 語法下的再檢索正確行為</li>
          <li>技術分析頁新增公司件數分析</li>
          <li>「所屬國合併」問題追查完成，並新增預設合併設定（設定層調整）</li>
          <li>規格確認：檢視頁新帳號預設以「申請案合併」檢索</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge label="專利異動通知信" color="emerald" />
        </div>
        <h4 class="text-base font-semibold text-white mb-2">訂閱郵件改版</h4>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>新增「專利異動」信件範本，文案以 JSON 檔維護四語系；依需求調整樣板視覺</li>
          <li>PDF 匯出信件改為可列出多檔案下載；修正匯出服務傳出的檔案型態</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
