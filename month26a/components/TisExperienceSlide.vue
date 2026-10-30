<template>
  <MonthlySlideFrame
    eyebrow="DOMAIN SEARCH / EXPERIENCE"
    title="TIS：讓搜尋結果更容易使用"
    subtitle="圖式檢視、結果操作與無障礙回饋一起補齊"
  >
    <div class="grid grid-cols-2 gap-8">
      <ul class="space-y-4 text-lg leading-relaxed text-zinc-300">
        <li><code>nuxt-tiff-provider</code> 搭配 Service Worker，統一 TIFF 轉 WebP。</li>
        <li>圖片支援縮放、旋轉、拖曳、觸控、鍵盤與循環翻頁。</li>
        <li>圖式加入載入失敗提示、skeleton、單張重試與避免重複下載。</li>
        <li>桌面版搜尋結果預選第一篇，詳情操作列固定於窗格底部。</li>
      </ul>
      <ul class="space-y-4 text-lg leading-relaxed text-zinc-300">
        <li>結果卡加入方向鍵、<code>j</code>／<code>k</code>、<code>[</code>／<code>]</code> 快捷鍵。</li>
        <li>統一元件 UI，按下 Tab 時顯示清楚的焦點框線。</li>
        <li>搜尋中加入 <code>aria-live</code> 回饋，控制項補足 24px 點擊範圍。</li>
        <li>統一權利人、IPC、國碼、人名與卡片資訊格式。</li>
      </ul>
    </div>
  </MonthlySlideFrame>
</template>
