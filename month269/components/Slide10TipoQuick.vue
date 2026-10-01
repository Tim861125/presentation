<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="TIPOMUSIC / 快檢通 · SUPPORT"
      title="產品維護與支援"
      subtitle="欄位修正、多語系與新產品前期討論"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky" label="TIPOMUSIC" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">曲目語言分析修正</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>主表 <code>SongSN</code> 為 NULL 時改用明細表，集管團體欄位與歌曲數恢復正確</li>
          <li>與主管確認分析改用 UseListSongDetail 資料及實際 SQL</li>
          <li>MÜST 作詞權利人補值：排程更新至正確版本；信箱收件者調整</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald" label="快檢通 / 其他" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">多語系與 PQAI</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>英文版 i18n 新增；簡體語系結果頁顯示修正</li>
          <li>embedding 向量 id 對不上：來源 index 有誤，修正並重新轉置</li>
          <li>PQAI：新增頁面／站台／領域向量庫、先 filter 再 KNN，撰寫規格</li>
        </ul>
      </TechCard>
    </div>

    <div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3 mt-4">
      <p class="text-xs text-zinc-400">小穎客服異常排查，與上級討論後暫時停用 · 協助業務推廣域見通錄影 · 每週晨會／週會進度同步</p>
    </div>
  </SlideShell>
</template>
