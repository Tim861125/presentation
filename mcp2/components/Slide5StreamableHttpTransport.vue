<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="TRANSPORT 3 (MODERN STANDARD)"
      title="StreamableHTTPClientTransport (新一代串流)"
      subtitle="統一在單一 HTTP 串流上的完整 RPC 通訊標準"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-emerald-400 mb-2">Streamable HTTP 連線代碼</div>
        <JsonCard
          filename="streamable_http_client.ts"
          :code="`import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const client = new Client({ name: 'http-client', version: '1.0.0' });

const transport = new StreamableHTTPClientTransport(
  new URL('https://api.example.com/mcp')
);

await client.connect(transport);`"
        />
      </div>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">架構優勢</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2.5 list-disc list-inside leading-relaxed">
          <li>所有 Request, Response, Progress 與 Notification 走同一套 HTTP 機制</li>
          <li>原生支援 Streaming Response，長時間任務即時進度追蹤 (Progress)</li>
          <li>大幅簡化 Load Balancer、API Gateway 與 Cloudflare 轉發設定</li>
          <li>是 MCP 官方團隊力推的現代標準遠端協議</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
