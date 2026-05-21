<template>
  <div class="h-full flex flex-col justify-center px-2">
    <h2 class="text-2xl font-bold text-white mb-4">Debug 技巧 & 成本控制</h2>
    <div class="grid grid-cols-2 gap-5">
      <div>
        <InfoCard title="三大 Debug 工具" color="blue">
          <div class="text-xs space-y-2.5">
            <div>
              <div class="text-white font-semibold">單節點測試</div>
              <div class="text-gray-400">選取節點 → 輸入資料 → Run（Answer/End 除外）</div>
            </div>
            <div>
              <div class="text-white font-semibold">Variable Inspector（快取變數）</div>
              <div class="text-gray-400">跑完前段後直接編輯快取值，測試後段不用重跑整個 Workflow → 效率大幅提升</div>
            </div>
            <div>
              <div class="text-white font-semibold">Last Run</div>
              <div class="text-gray-400">每個節點可看輸入值、輸出值、執行時間 → 找效能瓶頸</div>
            </div>
          </div>
        </InfoCard>
      </div>
      <div class="space-y-2">
        <div class="text-xs text-green-400 font-mono mb-1">成本控制：能不呼叫 LLM 就不呼叫</div>
        <div class="rounded border border-green-500/20 bg-green-500/5 p-2.5 text-xs">
          <div class="flex gap-2"><span class="text-green-300 shrink-0">格式化輸出</span><span class="text-gray-400">→ Template Node（Jinja2），省 token 且輸出穩定</span></div>
        </div>
        <div class="rounded border border-blue-500/20 bg-blue-500/5 p-2.5 text-xs">
          <div class="flex gap-2"><span class="text-blue-300 shrink-0">條件判斷</span><span class="text-gray-400">→ IF/ELSE Node，速度快不會有幻覺</span></div>
        </div>
        <div class="rounded border border-purple-500/20 bg-purple-500/5 p-2.5 text-xs">
          <div class="flex gap-2"><span class="text-purple-300 shrink-0">結構化轉換</span><span class="text-gray-400">→ Parameter Extractor + Function Calling</span></div>
        </div>
        <InfoCard title="模型選型" color="orange">
          <div class="text-xs space-y-1">
            <div class="flex gap-3"><span class="text-gray-500 w-20 shrink-0">簡單任務</span><span class="text-gray-300">GPT-3.5 / Claude Haiku</span></div>
            <div class="flex gap-3"><span class="text-gray-500 w-20 shrink-0">複雜推理</span><span class="text-gray-300">GPT-4 / Claude Sonnet</span></div>
            <div class="flex gap-3"><span class="text-gray-500 w-20 shrink-0">隱私/高量</span><span class="text-green-300">Ollama 本地模型</span></div>
          </div>
        </InfoCard>
      </div>
    </div>
  </div>
</template>
