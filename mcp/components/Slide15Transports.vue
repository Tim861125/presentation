<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="TRANSPORT LAYER"
      title="傳輸層機制：Stdio 與 HTTP / SSE"
      subtitle="本機行程內通訊 vs 遠端分散式微服務"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <TechCard accent="cyan" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="cyan">Standard I/O (Stdio)</TechBadge>
        </div>
        <JsonCard
          filename="stdio_transport.ts"
          :code="`const transport = new StdioClientTransport({
  command: 'node',
  args: ['dist/server.js']
});`"
        />
        <p class="text-xs text-zinc-300 mt-2">
          子行程標準輸入輸出，速度最快、零網路開銷。Claude Desktop 與 Cursor 預設模式。
        </p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="purple">HTTP with SSE / WebSocket</TechBadge>
        </div>
        <JsonCard
          filename="http_transport.ts"
          :code="`const transport = new StreamableHTTPClientTransport(
  new URL('https://mcp.company.internal/sse')
);`"
        />
        <p class="text-xs text-zinc-300 mt-2">
          Server-Sent Events 串流，適合遠端集中託管與多租戶雲端企業級 MCP Server。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
