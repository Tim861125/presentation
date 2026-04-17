<template>
  <div class="h-full flex flex-col justify-center px-2">
    <h2 class="text-2xl font-bold text-white mb-4">Retrieval 策略選擇</h2>
    <div class="grid grid-cols-3 gap-4 mb-4">
      <div class="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
        <div class="text-xs text-blue-400 font-mono mb-2">Semantic Search</div>
        <div class="text-xs text-gray-300 space-y-1 mb-3">
          <div>Embedding 向量 → Cosine Similarity</div>
          <div class="text-green-400">✓ 理解同義詞、近似表達</div>
          <div class="text-red-400">✗ 精確關鍵字可能被稀釋</div>
        </div>
        <div class="text-xs text-gray-500">概念性問答 · 自然語言查詢</div>
      </div>
      <div class="rounded-xl border border-orange-500/30 bg-orange-500/5 p-4">
        <div class="text-xs text-orange-400 font-mono mb-2">Full-text Search</div>
        <div class="text-xs text-gray-300 space-y-1 mb-3">
          <div>BM25 關鍵字匹配</div>
          <div class="text-green-400">✓ 精確詞彙不遺漏</div>
          <div class="text-red-400">✗ 無法理解語義</div>
        </div>
        <div class="text-xs text-gray-500">專有名詞 · 代碼 / ID 搜尋</div>
      </div>
      <div class="rounded-xl border border-green-500/30 bg-green-500/5 p-4 relative">
        <div class="absolute top-2 right-2 text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">推薦</div>
        <div class="text-xs text-green-400 font-mono mb-2">Hybrid Search ⭐</div>
        <div class="text-xs text-gray-300 space-y-1 mb-3">
          <div>語義 + 全文，Weighted Score 可調</div>
          <div>可接 Reranker 模型二次排序</div>
          <div class="text-green-400">✓ 兼顧語義與精確度</div>
        </div>
        <div class="text-xs text-gray-500">生產環境首選</div>
      </div>
    </div>
    <Callout type="warning">⚠️ 社群踩坑：Metadata Filtering 開啟後反而讓<strong>檢索變慢</strong>，知識庫大時尤其明顯。建議先壓測再決定是否啟用</Callout>
  </div>
</template>
