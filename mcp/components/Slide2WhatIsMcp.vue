<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DEFINITION"
      title="什麼是 Model Context Protocol (MCP)？"
      subtitle="Anthropic 推出的 AI 應用與外部系統標準化開放協定"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">OPEN STANDARD</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">開源開放協定</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          由 Anthropic 開源，旨在建立如同 USB-C 之於硬體設備的 AI 統一通訊介面。
        </p>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">CONTEXT BRIDGE</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">上下文與工具橋樑</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          安全、標準化地將本地檔案、企業資料庫與雲端 API 注入大語言模型 (LLM)。
        </p>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">NO WHEEL REINVENTION</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">告別重複造輪子</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          撰寫一次 MCP Server，即可被 Claude Desktop、Cursor、VS Code 與客製 Agent 共同使用。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
