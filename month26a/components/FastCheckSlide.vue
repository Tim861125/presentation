<template>
  <MonthlySlideFrame
    eyebrow="快檢通 / DELIVERY"
    title="快檢通：點數不足與輸入處理"
    subtitle="把服務限制轉成使用者看得懂、能採取行動的回饋"
  >
    <ul class="space-y-4 text-lg leading-relaxed text-zinc-300">
      <li>辨識 patentpilot-service 的 403／<code>Insufficient points</code>，回傳 <code>INSUFFICIENT_POINTS</code>。</li>
      <li>搜尋、探索方向、相關專利與重排共用點數不足提示，立即停止後續請求。</li>
      <li>提示視窗不能用 Escape 或點擊背景關閉，必須按下「確定」才能結束。</li>
      <li>新增 claim 編號清洗，避免原文標號與 <code>ol</code> 自動編號產生「1. 1.」。</li>
      <li>v1.0.29 上線；253 個測試與 production build 通過。</li>
    </ul>
  </MonthlySlideFrame>
</template>
