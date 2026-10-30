<template>
  <MonthlySlideFrame
    eyebrow="TIS / SEARCH"
    title="TIS：從輸入條件到還原搜尋"
    subtitle="處理常見專利號寫法、日期邊界與搜尋狀態"
  >
    <ul class="space-y-4 text-lg leading-relaxed text-zinc-300">
      <li>專利號接受空白與種類碼，依各國資料格式補齊；未填國碼且有多個來源時，讓使用者選擇。</li>
      <li>日期改用日曆選擇，支援年份展開與單邊範圍；無效日期或起訖顛倒時，不提交設定。</li>
      <li>優先權日完全缺值時才以申請日補判，避免優先權日不符的案件被錯誤納入。</li>
      <li>搜尋文字上限統一為 5,000 字，歷史紀錄也套用相同限制；搜尋中阻擋重複送出。</li>
      <li>網址以 searchId 保存模式、查詢與領域，保留 90 天；開啟連結時重新搜尋，而非保存固定結果。</li>
    </ul>
  </MonthlySlideFrame>
</template>
