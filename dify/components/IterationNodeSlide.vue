<template>
  <div class="h-full flex flex-col justify-center px-2">
    <h2 class="text-2xl font-bold text-white mb-4">Iteration Node — 批次處理</h2>
    <div class="grid grid-cols-2 gap-5">
      <div class="space-y-3">
        <InfoCard title="Sequential（循序）" color="blue">
          <div class="text-xs text-gray-300 space-y-1">
            <div>一個一個處理，保留順序，支援 Streaming</div>
            <div class="text-gray-500">適合：有順序依賴的場景</div>
          </div>
        </InfoCard>
        <InfoCard title="Parallel（並行）" color="purple">
          <div class="text-xs text-gray-300 space-y-1">
            <div>同時最多 10 個，速度快</div>
            <div class="text-red-300">❌ 不支援 Streaming Output</div>
            <div class="text-gray-500">適合：項目互相獨立的場景</div>
          </div>
        </InfoCard>
        <InfoCard title="輸出轉換（Array → String）" color="green">
          <div class="font-mono text-xs text-gray-300">
            <span class="text-gray-500"># Code Node</span><br>
            <span class="text-blue-300">"\n"</span>.join(iteration_output)<br>
            <span class="text-gray-500"># Jinja2</span><br>
            <span v-pre>{{ items | join("\n") }}</span>
          </div>
        </InfoCard>
      </div>
      <div class="space-y-3">
        <InfoCard title="Error Handling" color="orange">
          <div class="text-xs space-y-1.5">
            <div class="flex gap-2"><span class="text-red-400 shrink-0">Terminate</span><span class="text-gray-400">遇錯即停全部</span></div>
            <div class="flex gap-2"><span class="text-yellow-400 shrink-0">Continue on Error</span><span class="text-gray-400">錯誤填 null 繼續</span></div>
            <div class="flex gap-2"><span class="text-green-400 shrink-0">Remove Failed</span><span class="text-gray-400">只回傳成功項目</span></div>
          </div>
        </InfoCard>
        <Callout type="caution">
          <div class="font-bold mb-1">Issue #32555 / #32453（高票）</div>
          <div>Loop 內部無法放 Human Input Node（人工審核）</div>
          <div class="text-gray-300 mt-1">→ 改用多個串接的 Workflow，每段各自等待輸入</div>
        </Callout>
        <Callout type="danger">⚠️ 長 Iteration 鏈路容易觸發 SSE timeout，並行模式尤其明顯。解法：調整 nginx <span class="font-mono">proxy_read_timeout</span></Callout>
      </div>
    </div>
  </div>
</template>
