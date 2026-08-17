<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="TRANSPORT 2 (LEGACY)"
      title="SSEClientTransport (Server-Sent Events)"
      subtitle="第一代 HTTP 遠端通訊方案及其雙連線事件流設計"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-amber-400 mb-2">SSE 連線代碼</div>
        <JsonCard
          filename="sse_client.ts"
          :code="`import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';

const client = new Client({ name: 'sse-client', version: '1.0.0' });

const transport = new SSEClientTransport(
  new URL('https://api.example.com/sse')
);

await client.connect(transport);`"
        />
      </div>

      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">設計限制</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>Client 透過標準 HTTP POST 發送 JSON-RPC 請求</li>
          <li>Server 透過獨立建立的 SSE 長連線單向推播事件回覆</li>
          <li>本質是「事件推播」而非「對稱式 RPC 通道」</li>
          <li>需要同時維持並同步兩條連線狀態，極易引發連線懸掛</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
