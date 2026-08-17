<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CODE COMPARISON"
      title="代碼對比：初始化連線"
      subtitle="SSE 雙連線生命週期 vs Streamable HTTP 單一簡潔連線"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-amber-400 mb-2">❌ SSEClientTransport (舊式)</div>
        <JsonCard
          filename="legacy_sse.ts"
          :code="`const client = new Client({ name: 'sse-client', version: '1.0.0' });
const transport = new SSEClientTransport(new URL(baseUrl));

await client.connect(transport);
// 需底層監聽兩條獨立通道的生命週期與掛斷事件`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-emerald-400 mb-2">✅ StreamableHTTPClientTransport (現代)</div>
        <JsonCard
          filename="modern_streamable.ts"
          :code="`const client = new Client({ name: 'http-client', version: '1.0.0' });
const transport = new StreamableHTTPClientTransport(new URL(baseUrl));

await client.connect(transport);
// 單一標準 HTTP 連線，乾淨俐落`"
        />
      </div>
    </div>
  </SlideShell>
</template>
