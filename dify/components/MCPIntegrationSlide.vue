<template>
  <div class="h-full flex flex-col justify-center px-2">
    <h2 class="text-2xl font-bold text-white mb-4">MCP 整合踩坑</h2>
    <div class="grid grid-cols-2 gap-5">
      <div class="space-y-3">
        <InfoCard title="什麼是 MCP？" color="blue">
          <div class="text-xs text-gray-300 space-y-1">
            <div>Anthropic 提出的開放標準，讓 AI 工具與外部服務標準化溝通</div>
            <div class="mt-1 text-gray-400">Dify 支援：</div>
            <div>• 將應用發佈為 MCP Server</div>
            <div>• 在 Agent 中呼叫 MCP Tool</div>
          </div>
        </InfoCard>
        <InfoCard title="SSRF 擋掉本機 MCP" color="red">
          <div class="text-xs text-gray-300 space-y-1">
            <div>情境：本機跑 MCP Service（localhost:3000）</div>
            <div>結果：<span class="text-red-300 font-mono">403 Error — SSRF Proxy blocked</span></div>
          </div>
        </InfoCard>
      </div>
      <div class="space-y-3">
        <InfoCard title="三種解法" color="green">
          <div class="text-xs space-y-2">
            <div><span class="text-green-300">A. 自架版調整 .env</span><br><span class="font-mono text-gray-400">SSRF_PROXY_HTTP_URL=http://ssrf_proxy:3128</span></div>
            <div><span class="text-green-300">B. 用 Plugin 機制</span><span class="text-gray-400">（不受 SSRF 限制）</span></div>
            <div><span class="text-green-300">C. 改用公開 URL</span></div>
          </div>
        </InfoCard>
        <InfoCard title="MCP Streaming 失敗" color="orange">
          <div class="text-xs text-gray-300">MCP Tool 的 streaming 結果無法正確回傳</div>
          <div class="text-xs text-gray-400 mt-1">已知問題，官方 tracking 中。暫解：改用非 streaming 工具</div>
        </InfoCard>
        <Callout type="warning">🔑 MCP 整合目前是 early stage，生產環境使用要謹慎評估</Callout>
      </div>
    </div>
  </div>
</template>
