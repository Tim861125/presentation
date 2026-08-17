<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="PROTOCOL OVERVIEW"
      title="MCP 通訊基礎與三大 Transport"
      subtitle="基於 JSON-RPC 2.0 的雙向通訊介面規範"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">STDIO</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">StdioClientTransport</h3>
        <p class="text-xs text-zinc-300 leading-relaxed">
          透過本機子行程的 stdin/stdout 通訊，極致低延遲，桌面 IDE 本機整合的首選。
        </p>
      </TechCard>

      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">SSE (LEGACY)</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">SSEClientTransport</h3>
        <p class="text-xs text-zinc-300 leading-relaxed">
          第一代遠端 Web 方案，POST 請求發送搭配 Server-Sent Events 事件推送長連線。
        </p>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">STREAMABLE HTTP</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">StreamableHTTP</h3>
        <p class="text-xs text-zinc-300 leading-relaxed">
          新一代統一 HTTP 全雙工串流傳輸，原生支援 Progress 追蹤與完整的 RPC 語意。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
