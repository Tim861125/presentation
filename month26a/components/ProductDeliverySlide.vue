<template>
  <MonthlySlideFrame
    eyebrow="DELIVERY"
    title="快檢通與 TipoMusic：產品維護"
    subtitle="兩個專案各自完成本月的修正與發布工作"
  >
      <ul class="space-y-5 text-lg leading-relaxed text-zinc-300">
        <li>快檢通點數不足回應改為 <code>INSUFFICIENT_POINTS</code>，前端立即顯示補點提示</li>
        <li>claim 編號清洗避免「1. 1.」；v1.0.29 發布，253 個測試與 production build 通過</li>
        <li>TipoMusic 修正 MÜST 作詞權利人、曲目語言重複計數與使用清單權限</li>
        <li>教育訓練影片改用 YouTube embed，正式／測試機部署完成</li>
        <li>空白 Description 81 張盤點：依 commit 證據補登 64 張，17 張保留跳過原因</li>
      </ul>
  </MonthlySlideFrame>
</template>
