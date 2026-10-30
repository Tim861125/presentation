<template>
  <MonthlySlideFrame
    eyebrow="DOMAIN SEARCH / QUALITY"
    title="TIS：搜尋品質、事件與可觀測性"
    subtitle="改善結果排序，也讓每次操作與服務狀態都能被追蹤"
  >
    <div class="grid grid-cols-2 gap-8">
      <ul class="space-y-4 text-lg leading-relaxed text-zinc-300">
        <li>新增可選 rerank：文字搜尋先取 raw 400 筆，再合併 200 筆交由自架服務重排。</li>
        <li>rerank 失敗時退回 kNN 順序；Find similar 維持原有向量搜尋流程。</li>
        <li>Find similar 顯示 <code>Nearness</code>，來源專利標示 <code>This patent</code>。</li>
      </ul>
      <ul class="space-y-4 text-lg leading-relaxed text-zinc-300">
        <li>PostHog 補上領域、模式、Find similar、圖式操作與重試事件。</li>
        <li>OpenObserve 串接 RUM、OTLP trace／log、API request log 與 dev dashboard。</li>
        <li>域見通 v1.0.32～v1.0.34 更新測試站，v1.0.34-release 更新正式站。</li>
      </ul>
    </div>
  </MonthlySlideFrame>
</template>
