<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SDK CODE"
      title="MCP Client 實作範例 (TypeScript SDK)"
      subtitle="建立 Client 實例並透過 HTTP / SSE 建立連線"
    />

    <div class="mt-4">
      <JsonCard
        filename="client.ts"
        :code="`import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

// 1. 初始化 Client 實體
export const mcpClient = new Client(
  { name: 'bun-agent', version: '1.0.0' },
  { capabilities: { prompts: {}, resources: {}, tools: {} } }
);

// 2. 建立連線 Transport
export async function initMcp(serverUrl: string) {
  const transport = new StreamableHTTPClientTransport(new URL(serverUrl));
  await mcpClient.connect(transport);
  console.log('✅ Connected to MCP Server');
}`"
      />
    </div>
  </SlideShell>
</template>
