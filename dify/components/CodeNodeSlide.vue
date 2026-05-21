<template>
  <div class="h-full flex flex-col justify-center px-2">
    <h2 class="text-2xl font-bold text-white mb-4">Code Node — 能做 & 不能做</h2>
    <div class="grid grid-cols-2 gap-5">
      <div class="space-y-3">
        <InfoCard title="可用套件（Python）" color="green">
          <div class="font-mono text-xs text-gray-300 leading-relaxed">
            numpy, pandas　數值 / 資料處理<br>
            json, re　　　 格式解析<br>
            datetime　　　 時間處理<br>
            <span class="text-gray-500">// JS: lodash 可用</span>
          </div>
        </InfoCard>
        <InfoCard title="輸出上限" color="yellow">
          <div class="text-xs space-y-1">
            <div class="flex justify-between"><span class="text-gray-400">字串</span><span class="text-gray-200">80,000 字元</span></div>
            <div class="flex justify-between"><span class="text-gray-400">數字</span><span class="text-gray-200">±999,999,999</span></div>
            <div class="flex justify-between"><span class="text-gray-400">巢狀結構</span><span class="text-gray-200">最深 5 層</span></div>
          </div>
        </InfoCard>
      </div>
      <div class="space-y-3">
        <InfoCard title="Sandbox 安全限制 🚫" color="red">
          <div class="font-mono text-xs space-y-1">
            <div><span class="text-red-400">✗</span> <span class="text-gray-300">import requests</span><span class="text-gray-600"> # 無網路</span></div>
            <div><span class="text-red-400">✗</span> <span class="text-gray-300">open('/etc/...')</span><span class="text-gray-600"> # 無檔案系統</span></div>
            <div><span class="text-red-400">✗</span> <span class="text-gray-300">import subprocess</span><span class="text-gray-600"> # 無系統指令</span></div>
          </div>
          <div class="mt-2 text-xs text-gray-400">
            需要 HTTP？→ <span class="text-blue-300">HTTP Request Node</span><br>
            需要讀檔？→ <span class="text-blue-300">Doc Extractor Node</span>
          </div>
        </InfoCard>
        <Callout type="caution">⚠️ 社群案例：PDF 轉換需要 Chrome engine，Sandbox 無法執行。改用 unstructured 服務 or 外部 API</Callout>
        <Callout type="warning">⚠️ 自架注意：<span class="font-mono">sandbox</span> 服務未啟動 → Code Node 全部失敗</Callout>
      </div>
    </div>
  </div>
</template>
