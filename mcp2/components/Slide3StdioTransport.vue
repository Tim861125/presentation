<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="TRANSPORT 1"
      title="StdioClientTransport (本機標準 I/O)"
      subtitle="進程內高速通道：適用於 Claude Desktop、VS Code 與本地工具整合"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">Stdio 連線代碼</div>
        <JsonCard
          filename="stdio_client.ts"
          :code="`import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const client = new Client({ name: 'stdio-client', version: '1.0.0' });

const transport = new StdioClientTransport({
  command: 'node',
  args: ['dist/server.js']
});

await client.connect(transport);`"
        />
      </div>

      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">特點剖析</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2.5 list-disc list-inside leading-relaxed">
          <li>由 Host 行程直接 fork 子行程 (Subprocess) 執行 Server</li>
          <li>通訊完全透過管線 (Pipe) 的 stdin/stdout，零網路 Socket 開銷</li>
          <li>安全性極高：僅限本機存取，完全不對外開放網路埠 (Port)</li>
          <li>生命週期與父行程完全綁定，隨開即用、隨關即滅</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
