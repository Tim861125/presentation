<template>
  <MonthlySlideFrame
    eyebrow="TIPOMUSIC / MAINTENANCE"
    title="TipoMusic：資料與權限修正"
    subtitle="修正資料欄位、統計口徑與使用清單可見度"
  >
    <ul class="space-y-4 text-lg leading-relaxed text-zinc-300">
      <li>修正 MÜST 歌曲的作詞權利人誤記在作曲欄位，更新 database PRC。</li>
      <li>修正 ARCO／RPAT 曲目語言分析的重複計數，讓每筆播放只歸入一個代表語言。</li>
      <li>歌曲數維持使用明細的計數粒度，避免修正語言後影響原有統計意義。</li>
      <li>教育訓練影片改用 YouTube embed，完成測試機與正式機更新。</li>
      <li>修正利用人看不到管理者代為匯入使用清單的權限條件。</li>
    </ul>
  </MonthlySlideFrame>
</template>
