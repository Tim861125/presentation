<template>
  <div class="h-full flex flex-col justify-center px-2">
    <h2 class="text-2xl font-bold text-white mb-4">Agent Node vs 固定 Workflow</h2>
    <div class="grid grid-cols-2 gap-5">
      <div class="space-y-3">
        <InfoCard title="Function Calling" color="purple">
          <div class="text-xs text-gray-300 space-y-1">
            <div>使用模型原生工具呼叫能力</div>
            <div class="text-gray-500">適合 GPT-4 / Claude 3.5，輸出格式穩定</div>
          </div>
        </InfoCard>
        <InfoCard title="ReAct" color="blue">
          <div class="text-xs text-gray-300 space-y-1">
            <div>Thought → Action → Observation 循環</div>
            <div class="text-gray-500">適合不支援 Function Call 的模型，較耗 token</div>
          </div>
        </InfoCard>
        <InfoCard title="Iteration Limit 建議" color="yellow">
          <div class="text-xs text-gray-300">簡單任務：3–5　　複雜研究：10–15</div>
        </InfoCard>
      </div>
      <div class="space-y-3">
        <InfoCard title="選型對照" color="green">
          <div class="text-xs space-y-1.5">
            <div class="flex gap-2"><span class="text-gray-500 shrink-0">流程固定可預測</span><span class="text-green-300">→ 固定 Workflow</span></div>
            <div class="flex gap-2"><span class="text-gray-500 shrink-0">動態工具選擇</span><span class="text-purple-300">→ Agent Node</span></div>
            <div class="flex gap-2"><span class="text-gray-500 shrink-0">精確控制成本</span><span class="text-green-300">→ 固定 Workflow</span></div>
            <div class="flex gap-2"><span class="text-gray-500 shrink-0">複雜研究任務</span><span class="text-purple-300">→ Agent Node</span></div>
          </div>
        </InfoCard>
        <InfoCard title="Agent 輸出欄位" color="cyan">
          <div class="font-mono text-xs text-gray-300 leading-relaxed">
            <span class="text-blue-300">final_response</span>　最終回答<br>
            <span class="text-green-300">reasoning_traces</span>　推理過程（除錯用）<br>
            <span class="text-orange-300">iteration_count</span>　呼叫輪次<br>
            <span class="text-red-300">__reason</span>　失敗原因
          </div>
        </InfoCard>
        <Callout type="info">🔑 工具的 description 寫得好不好，直接決定 Agent 會不會選對工具</Callout>
      </div>
    </div>
  </div>
</template>
