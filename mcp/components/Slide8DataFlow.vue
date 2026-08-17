<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DATA FLOW"
      title="完整端到端資料流剖析"
      subtitle="使用者輸入 ➔ Host 意圖識別 ➔ Client 協定打包 ➔ Server 外部執行 ➔ 最終回覆"
    />

    <div class="grid grid-cols-1 md:grid-cols-5 gap-3 mt-6">
      <TechCard accent="cyan" class="p-3">
        <div class="text-xs font-mono text-cyan-400 mb-1">01. 使用者提問</div>
        <p class="text-xs text-zinc-300">「幫我查上週的專利檢索數量」</p>
      </TechCard>

      <TechCard accent="sky" class="p-3">
        <div class="text-xs font-mono text-sky-400 mb-1">02. Host (LLM)</div>
        <p class="text-xs text-zinc-300">決定呼叫 `query_database` 工具</p>
      </TechCard>

      <TechCard accent="purple" class="p-3">
        <div class="text-xs font-mono text-purple-400 mb-1">03. MCP Client</div>
        <p class="text-xs text-zinc-300">封裝 JSON-RPC 2.0 請求並傳輸</p>
      </TechCard>

      <TechCard accent="emerald" class="p-3">
        <div class="text-xs font-mono text-emerald-400 mb-1">04. MCP Server</div>
        <p class="text-xs text-zinc-300">連線 PostgreSQL 執行 SQL 查詢</p>
      </TechCard>

      <TechCard accent="amber" class="p-3">
        <div class="text-xs font-mono text-amber-400 mb-1">05. 彙整回覆</div>
        <p class="text-xs text-zinc-300">LLM 讀取結果生成自然語言解答</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
