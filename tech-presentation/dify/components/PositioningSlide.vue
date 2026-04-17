<template>
  <div class="h-full flex flex-col justify-center px-2">
    <h2 class="text-2xl font-bold text-white mb-1">Dify 定位</h2>
    <p class="text-gray-400 text-sm mb-4">開源 Agentic Workflow 平台 — <span class="text-blue-300 font-mono">Do It For You</span></p>
    <div class="grid grid-cols-2 gap-6">
      <div>
        <div class="space-y-2 mb-4">
          <div v-click class="flex items-center gap-2 text-sm"><span class="text-green-400 font-bold shrink-0">✓</span><span class="text-gray-200">視覺化設計工作流，快速 prototype</span></div>
          <div v-click class="flex items-center gap-2 text-sm"><span class="text-green-400 font-bold shrink-0">✓</span><span class="text-gray-200">支援 GPT / Claude / Gemini / Ollama 本地模型</span></div>
          <div v-click class="flex items-center gap-2 text-sm"><span class="text-green-400 font-bold shrink-0">✓</span><span class="text-gray-200">內建 RAG 知識庫（Weaviate 向量 DB）</span></div>
          <div v-click class="flex items-center gap-2 text-sm"><span class="text-green-400 font-bold shrink-0">✓</span><span class="text-gray-200">多種發佈：Web App / API / MCP Server</span></div>
          <div v-click class="flex items-center gap-2 text-sm"><span class="text-yellow-400 font-bold shrink-0">△</span><span class="text-gray-400">複雜流程調試比純程式碼麻煩</span></div>
          <div v-click class="flex items-center gap-2 text-sm"><span class="text-yellow-400 font-bold shrink-0">△</span><span class="text-gray-400">Code Node 有 Sandbox 限制</span></div>
        </div>
      </div>
      <div v-click class="space-y-3">
        <InfoCard title="Workflow" color="blue">
          <div class="text-xs text-gray-300 space-y-0.5">
            <div>一次性執行：輸入 → 節點鏈 → 輸出</div>
            <div class="text-gray-500">無對話記憶，適合批次/報告/Pipeline</div>
          </div>
        </InfoCard>
        <InfoCard title="Chatflow" color="purple">
          <div class="text-xs text-gray-300 space-y-0.5">
            <div>對話層 + Workflow，每輪訊息觸發一次</div>
            <div class="text-gray-500">有 Conversation Variables，適合 Q&A 助理</div>
          </div>
        </InfoCard>
        <InfoCard title="技術堆疊" color="green">
          <div class="text-xs text-gray-400 font-mono leading-relaxed">
            FastAPI · Next.js · PostgreSQL<br>
            Redis · Weaviate · Celery · Sandbox
          </div>
        </InfoCard>
      </div>
    </div>
  </div>
</template>
