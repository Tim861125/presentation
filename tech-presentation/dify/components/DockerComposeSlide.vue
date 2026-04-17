<template>
  <div class="h-full flex flex-col justify-center px-2">
    <h2 class="text-2xl font-bold text-white mb-4">Docker Compose 部署架構</h2>
    <div class="grid grid-cols-2 gap-5">
      <div class="space-y-3">
        <InfoCard title="11 個服務" color="blue">
          <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono">
            <div><span class="text-green-300">api</span><span class="text-gray-500">  FastAPI 後端</span></div>
            <div><span class="text-green-300">web</span><span class="text-gray-500">  Next.js 前端</span></div>
            <div><span class="text-blue-300">worker</span><span class="text-gray-500">  Celery</span></div>
            <div><span class="text-blue-300">db</span><span class="text-gray-500">  PostgreSQL</span></div>
            <div><span class="text-purple-300">redis</span><span class="text-gray-500">  快取佇列</span></div>
            <div><span class="text-purple-300">weaviate</span><span class="text-gray-500">  向量 DB</span></div>
            <div><span class="text-orange-300">sandbox</span><span class="text-gray-500">  程式碼執行</span></div>
            <div><span class="text-orange-300">nginx</span><span class="text-gray-500">  反向代理</span></div>
            <div><span class="text-red-300">ssrf_proxy</span><span class="text-gray-500">  防護</span></div>
            <div><span class="text-yellow-300">plugin_daemon</span></div>
            <div><span class="text-yellow-300">unstructured</span></div>
          </div>
        </InfoCard>
        <InfoCard title="硬體需求" color="green">
          <div class="text-xs space-y-1">
            <div class="flex gap-4"><span class="text-gray-500 w-12">CPU</span><span class="text-gray-300">2 核心</span><span class="text-gray-500">→ 建議 4+</span></div>
            <div class="flex gap-4"><span class="text-gray-500 w-12">RAM</span><span class="text-gray-300">4 GB</span><span class="text-gray-500">→ 建議 8–16 GB</span></div>
            <div class="flex gap-4"><span class="text-gray-500 w-12">Disk</span><span class="text-gray-300">20 GB</span><span class="text-gray-500">→ 建議 50+ GB</span></div>
          </div>
        </InfoCard>
      </div>
      <div class="space-y-3">
        <InfoCard title="關鍵 .env 設定" color="yellow">
          <div class="font-mono text-xs text-gray-300 leading-relaxed">
            <span class="text-gray-500"># 跨子網域部署（必設）</span><br>
            <span class="text-cyan-300">COOKIE_DOMAIN</span>=.yourdomain.com<br>
            <span class="text-cyan-300">NEXT_PUBLIC_COOKIE_DOMAIN</span>=1<br>
            <span class="text-gray-500"># 向量 DB（可換 pgvector）</span><br>
            <span class="text-cyan-300">VECTOR_STORE</span>=weaviate<br>
            <span class="text-gray-500"># Celery 並發</span><br>
            <span class="text-cyan-300">CELERY_WORKER_AMOUNT</span>=1
          </div>
        </InfoCard>
        <Callout type="warning">⚠️ <strong>Celery Worker 調優</strong>：<span class="font-mono">CELERY_WORKER_AMOUNT</span> 對效能影響極大，但官方文件缺乏指導。建議從 <span class="font-mono">2</span> 開始依負載調整</Callout>
      </div>
    </div>
  </div>
</template>
