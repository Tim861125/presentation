<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="BENEFITS"
      title="Streamable HTTP 帶來了什麼巨大改善？"
      subtitle="架構精簡、雲端原生相容與完整 RPC 語意保障"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <TechCard accent="emerald" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ 單一通道 (Single Channel)</h4>
        <p class="text-xs text-zinc-300">徹底消除雙連線管理負擔，狀態機大幅簡化。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ 原生串流回應 (Native Streaming)</h4>
        <p class="text-xs text-zinc-300">將 Progress 視為一等公民，即時回傳大模型生成進度與長任務耗時。</p>
      </TechCard>

      <TechCard accent="cyan" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ 基礎設施友善 (Infra Friendly)</h4>
        <p class="text-xs text-zinc-300">標準 HTTP POST Chunked / HTTP/2 串流，與 NGINX、Kong、Cloudflare 完美契合。</p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ MCP Spec 原生對齊</h4>
        <p class="text-xs text-zinc-300">最新 TypeScript 與 Python SDK 完全圍繞此架構優化，具備最佳長期支援保證。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
