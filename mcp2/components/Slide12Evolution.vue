<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="EVOLUTION"
      title="MCP 傳輸協定的演化歷程"
      subtitle="從過渡期的單向事件推播，走向終極全雙工串流 RPC"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">第一代：SSE (過渡方案)</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>初衷：利用瀏覽器現成的 EventSource 技術快速實現伺服器主動推播</li>
          <li>硬傷：終究不是為對稱式雙向 RPC 設計，遇到進度與取消等複雜場景捉襟見肘</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">第二代：Streamable HTTP (現代標準)</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>初衷：徹底將 MCP 打造為真正雲端原生的 RPC over HTTP 協定</li>
          <li>成果：重塑傳輸層語意，完美支援所有現代 LLM 與 Agent 工具鏈特性</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
