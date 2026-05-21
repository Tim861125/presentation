<template>
  <div class="h-full flex flex-col justify-center px-2">
    <h2 class="text-2xl font-bold text-white mb-4">HTTP Request Node — SSRF 是最常踩的坑</h2>
    <div class="grid grid-cols-2 gap-5">
      <div class="space-y-3">
        <InfoCard title="基本功能" color="blue">
          <div class="text-xs text-gray-300 space-y-1">
            <div>支援 GET / POST / PUT / PATCH / DELETE</div>
            <div>動態變數：<span v-pre class="font-mono text-green-300">{{node.output.field}}</span></div>
            <div>巢狀路徑：<span v-pre class="font-mono text-green-300">{{resp.data.items[0].id}}</span></div>
          </div>
        </InfoCard>
        <InfoCard title="認證方式" color="purple">
          <div class="text-xs text-gray-300 space-y-0.5">
            <div>No Auth　/　API Key（Basic / Bearer / Custom）</div>
            <div class="text-gray-500">SSL 驗證可關閉（自簽憑證適用）</div>
          </div>
        </InfoCard>
        <InfoCard title="錯誤處理" color="green">
          <div class="text-xs text-gray-300">最多重試 <strong>10 次</strong>，間隔最長 <strong>5 秒</strong>，失敗可走 fallback</div>
        </InfoCard>
      </div>
      <div class="space-y-3">
        <InfoCard title="SSRF Proxy 擋掉的請求" color="red">
          <div class="font-mono text-xs text-gray-400 space-y-0.5">
            <div><span class="text-red-400">✗</span> http://localhost:xxxx</div>
            <div><span class="text-red-400">✗</span> http://10.x.x.x</div>
            <div><span class="text-red-400">✗</span> http://192.168.x.x</div>
            <div><span class="text-red-400">✗</span> http://172.16.x.x</div>
          </div>
        </InfoCard>
        <InfoCard title="三種解法" color="yellow">
          <div class="text-xs space-y-1.5">
            <div><span class="text-green-400">A.</span> <span class="text-gray-300">自架版 .env 設定 </span><span class="font-mono text-cyan-300">SSRF_PROXY_HTTP_URL</span></div>
            <div><span class="text-green-400">B.</span> <span class="text-gray-300">改用 Plugin 機制（不受 SSRF 限制）</span></div>
            <div><span class="text-green-400">C.</span> <span class="text-gray-300">改用公開可存取的 URL</span></div>
          </div>
        </InfoCard>
      </div>
    </div>
  </div>
</template>
