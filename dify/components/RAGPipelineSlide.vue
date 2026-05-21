<template>
  <div class="h-full flex flex-col justify-center px-2">
    <h2 class="text-2xl font-bold text-white mb-5">RAG Pipeline 完整流程</h2>
    <div class="space-y-3">
      <div v-click class="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4 flex items-center gap-4">
        <div class="text-3xl shrink-0">📄</div>
        <div class="flex-1">
          <div class="text-sm font-bold text-blue-300 mb-1">Indexing Phase</div>
          <div class="flex items-center gap-2 text-xs text-gray-300 flex-wrap">
            <span class="px-2 py-0.5 rounded bg-white/10">文件上傳</span>
            <span class="text-gray-600">→</span>
            <span class="px-2 py-0.5 rounded bg-white/10">Chunking</span>
            <span class="text-gray-600">→</span>
            <span class="px-2 py-0.5 rounded bg-white/10">Embedding</span>
            <span class="text-gray-600">→</span>
            <span class="px-2 py-0.5 rounded bg-white/10">存入 Weaviate</span>
          </div>
        </div>
      </div>
      <div v-click class="rounded-xl border border-green-500/30 bg-green-500/5 p-4 flex items-center gap-4">
        <div class="text-3xl shrink-0">🔍</div>
        <div class="flex-1">
          <div class="text-sm font-bold text-green-300 mb-1">Retrieval Phase</div>
          <div class="flex items-center gap-2 text-xs text-gray-300 flex-wrap">
            <span class="px-2 py-0.5 rounded bg-white/10">使用者查詢</span>
            <span class="text-gray-600">→</span>
            <span class="px-2 py-0.5 rounded bg-white/10">Query Embedding</span>
            <span class="text-gray-600">→</span>
            <span class="px-2 py-0.5 rounded bg-white/10">向量搜尋</span>
            <span class="text-gray-600">→</span>
            <span class="px-2 py-0.5 rounded bg-white/10">Top K</span>
            <span class="text-gray-600">→</span>
            <span class="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300">Reranking（可選）</span>
          </div>
        </div>
      </div>
      <div v-click class="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4 flex items-center gap-4">
        <div class="text-3xl shrink-0">🤖</div>
        <div class="flex-1">
          <div class="text-sm font-bold text-purple-300 mb-1">Generation Phase</div>
          <div class="flex items-center gap-2 text-xs text-gray-300 flex-wrap">
            <span class="px-2 py-0.5 rounded bg-white/10">User Query</span>
            <span class="text-gray-600">+</span>
            <span class="px-2 py-0.5 rounded bg-white/10">Retrieved Chunks</span>
            <span class="text-gray-600">→</span>
            <span class="px-2 py-0.5 rounded bg-white/10">LLM</span>
            <span class="text-gray-600">→</span>
            <span class="px-2 py-0.5 rounded bg-green-500/20 text-green-300">精確回答</span>
          </div>
        </div>
      </div>
    </div>
    <div v-click class="mt-4">
      <Callout type="warning">⚠️ RAG 的品質 80% 取決於 Chunking 策略和 Embedding 模型的選擇</Callout>
    </div>
  </div>
</template>
