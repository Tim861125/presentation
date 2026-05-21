<template>
  <div class="h-full flex flex-col justify-center px-2">
    <h2 class="text-2xl font-bold text-white mb-4">架構選型</h2>
    <div class="grid grid-cols-2 gap-5">
      <div class="space-y-3">
        <InfoCard title="✅ 適合用 Dify" color="green">
          <div class="text-xs text-gray-300 space-y-1">
            <div>• 快速 prototype 驗證 AI 可行性</div>
            <div>• 非工程師也需要調整 prompt / 流程</div>
            <div>• 標準 RAG + LLM 呼叫組合</div>
            <div>• 需要多種 LLM provider 快速切換</div>
            <div>• 希望內建 Dashboard 監控 token 用量</div>
          </div>
        </InfoCard>
        <InfoCard title="❌ 不適合用 Dify" color="red">
          <div class="text-xs text-gray-300 space-y-1">
            <div>• Workflow 邏輯需要 git 版控</div>
            <div>• 高並發生產流量（> 1000 req/min）</div>
            <div>• Loop 中需要 Human Input（#32555）</div>
            <div>• 複雜狀態管理或長時間非同步任務</div>
          </div>
        </InfoCard>
      </div>
      <div class="space-y-3">
        <InfoCard title="方案比較" color="purple">
          <div class="text-xs">
            <div class="grid grid-cols-4 gap-1 text-center mb-1">
              <div class="text-gray-500"></div>
              <div class="text-blue-300">Dify</div>
              <div class="text-orange-300">LangChain</div>
              <div class="text-green-300">LlamaIndex</div>
            </div>
            <div class="grid grid-cols-4 gap-1 text-center py-0.5 border-t border-white/5"><div class="text-gray-500 text-left">視覺化</div><div>✅</div><div>❌</div><div>❌</div></div>
            <div class="grid grid-cols-4 gap-1 text-center py-0.5 border-t border-white/5"><div class="text-gray-500 text-left">程式碼控制</div><div class="text-yellow-300">部分</div><div>✅</div><div>✅</div></div>
            <div class="grid grid-cols-4 gap-1 text-center py-0.5 border-t border-white/5"><div class="text-gray-500 text-left">RAG 內建</div><div>✅</div><div class="text-gray-500">需組裝</div><div>✅</div></div>
            <div class="grid grid-cols-4 gap-1 text-center py-0.5 border-t border-white/5"><div class="text-gray-500 text-left">版本控制</div><div>❌</div><div>✅</div><div>✅</div></div>
            <div class="grid grid-cols-4 gap-1 text-center py-0.5 border-t border-white/5"><div class="text-gray-500 text-left">部署簡易</div><div>✅</div><div class="text-gray-500">需自建</div><div class="text-gray-500">需自建</div></div>
          </div>
        </InfoCard>
        <Callout type="info">🔑 <strong>混合策略</strong>：Dify 做 Orchestration Layer，透過 HTTP Node / Plugin 呼叫自己的微服務 → 視覺化好處 + 程式碼控制</Callout>
      </div>
    </div>
  </div>
</template>
