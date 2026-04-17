<template>
  <div class="h-full flex flex-col justify-center px-2">
    <h2 class="text-2xl font-bold text-white mb-6 text-center">重點總結</h2>
    <div class="grid grid-cols-3 gap-4">
      <div v-click class="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
        <div class="text-sm font-bold text-red-300 mb-2">必知限制</div>
        <div class="text-xs text-gray-400 space-y-1">
          <div>• Code Node 無網路/檔案存取</div>
          <div>• HTTP Node 有 SSRF 防護</div>
          <div>• Loop 內不支援 Human Input</div>
          <div>• 無知識庫匯出功能</div>
        </div>
      </div>
      <div v-click class="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4">
        <div class="text-sm font-bold text-yellow-300 mb-2">升版要謹慎</div>
        <div class="text-xs text-gray-400 space-y-1">
          <div>• 升版前備份 PostgreSQL</div>
          <div>• 對比 .env.example 補新參數</div>
          <div>• 先在 staging 驗證</div>
          <div>• 每次只升 1–2 個版本</div>
        </div>
      </div>
      <div v-click class="rounded-xl border border-orange-500/30 bg-orange-500/5 p-4">
        <div class="text-sm font-bold text-orange-300 mb-2">常見坑</div>
        <div class="text-xs text-gray-400 space-y-1">
          <div>• SSRF 擋內網呼叫</div>
          <div>• SSE timeout 需調 nginx</div>
          <div>• Metadata Filter 讓查詢變慢</div>
          <div>• Celery Worker 調優缺文件</div>
        </div>
      </div>
      <div v-click class="rounded-xl border border-green-500/30 bg-green-500/5 p-4">
        <div class="text-sm font-bold text-green-300 mb-2">省錢技巧</div>
        <div class="text-xs text-gray-400 space-y-1">
          <div>• 格式化用 Template Node</div>
          <div>• 條件判斷用 IF/ELSE</div>
          <div>• 簡單任務用輕量模型</div>
          <div>• Parameter Extractor 取代 prompt</div>
        </div>
      </div>
      <div v-click class="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
        <div class="text-sm font-bold text-blue-300 mb-2">RAG 調優</div>
        <div class="text-xs text-gray-400 space-y-1">
          <div>• Hybrid Search + Reranker 最佳</div>
          <div>• Chunk Size 依文件類型調整</div>
          <div>• Score Threshold 過濾低相關</div>
          <div>• Embedding 選定後不能換</div>
        </div>
      </div>
      <div v-click class="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-4">
        <div class="text-sm font-bold text-cyan-300 mb-2">選型建議</div>
        <div class="text-xs text-gray-400 space-y-1">
          <div>• Prototype 首選 Dify</div>
          <div>• 需 git 版控考慮純程式碼</div>
          <div>• 混合架構取兩者優點</div>
          <div>• MCP 整合仍是 early stage</div>
        </div>
      </div>
    </div>
    <div class="mt-5 text-center text-xs text-gray-600">
      官方文件：https://docs.dify.ai　·　GitHub：github.com/langgenius/dify
    </div>
  </div>
</template>
