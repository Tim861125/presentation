<template>
  <div class="h-full flex flex-col justify-center px-2">
    <h2 class="text-2xl font-bold text-white mb-4">LLM Node — 參數與輸出控制</h2>
    <div class="grid grid-cols-2 gap-5">
      <div class="space-y-3">
        <InfoCard title="生成參數" color="blue">
          <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <div class="text-gray-400">Temperature 0–1</div><div class="text-gray-200">創意度 vs 穩定</div>
            <div class="text-gray-400">Top P</div><div class="text-gray-200">詞彙多樣性</div>
            <div class="text-gray-400">Frequency Penalty</div><div class="text-gray-200">降低重複詞彙</div>
            <div class="text-gray-400">Presence Penalty</div><div class="text-gray-200">鼓勵新主題</div>
          </div>
        </InfoCard>
        <InfoCard title="結構化輸出（JSON）" color="purple">
          <div class="text-xs text-gray-300 mb-2">① Visual Editor &nbsp;② JSON Schema &nbsp;③ AI 產生</div>
          <Callout type="warning">⚠️ 只有原生支援 JSON mode 的模型才穩定，其他可能輸出 markdown code block</Callout>
        </InfoCard>
      </div>
      <div class="space-y-3">
        <InfoCard title="Memory / Context" color="green">
          <div class="text-xs text-gray-300 space-y-1">
            <div>• 記憶範圍：同一 Chatflow 的對話輪次</div>
            <div>• 不跨 Conversation（開新對話即清空）</div>
            <div>• <span class="font-mono text-gray-400">TokenBufferMemory</span> 控制 token 用量</div>
            <div>• Top K + Score Threshold 過濾低相關結果</div>
          </div>
        </InfoCard>
        <InfoCard title="多模態支援" color="cyan">
          <div class="text-xs text-gray-300 space-y-1">
            <div>• Vision 模型支援圖片輸入（上限 2 MB）</div>
            <div>• 文件需先過 Doc Extractor 轉文字</div>
            <div>• Detail Level：High / Low 可選</div>
          </div>
        </InfoCard>
        <InfoCard title="變數語法" color="orange">
          <div class="font-mono text-xs text-gray-300">
            <span v-pre class="text-blue-300">{{variable}}</span>　<span v-pre class="text-green-300">{{node.output.field}}</span>
          </div>
        </InfoCard>
      </div>
    </div>
  </div>
</template>
