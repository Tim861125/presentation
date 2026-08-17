<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SDK CODE"
      title="MCP Server 建立範例 (TypeScript SDK)"
      subtitle="透過 McpServer 高階類別封裝能力"
    />

    <div class="mt-4">
      <JsonCard
        filename="server.ts"
        :code="`import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// 1. 建立 MCP Server 實例
const server = new McpServer({
  name: 'PatentPilot-MCP',
  version: '1.0.0',
});

// 2. 啟動並監聽 Stdio (或 HTTP/SSE)
const transport = new StdioServerTransport();
await server.connect(transport);
console.error('🚀 MCP Server running on stdio');`"
      />
    </div>
  </SlideShell>
</template>
