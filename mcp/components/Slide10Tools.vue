<script setup lang="ts">
const toolSchema = `{
  "name": "search_patents",
  "description": "根據關鍵字與分類號檢索專利資料庫",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "檢索語法" }
    },
    "required": ["query"]
  }
}`;
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CORE PRIMITIVE 2"
      title="核心概念二：Tools (可執行工具)"
      subtitle="可操作型函數：讓 AI 主動呼叫外部系統、發送請求與執行副作用"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-emerald-400 mb-2">Tool 定義結構 (JSON Schema)</div>
        <JsonCard
          filename="tool_schema.json"
          :code="toolSchema"
        />
      </div>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">典型動作</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>執行 SQL Query、新增或更新資料表紀錄</li>
          <li>建立、寫入或重構專案程式碼檔案</li>
          <li>調用外部 REST API / Webhook</li>
          <li>模型自主決定參數並執行 (Function Calling)</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
