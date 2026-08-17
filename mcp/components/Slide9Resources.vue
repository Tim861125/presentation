<script setup lang="ts">
const resourceSchema = `{
  "uri": "file:///project/architecture.md",
  "name": "System Architecture",
  "mimeType": "text/markdown",
  "description": "後端系統架構說明文件"
}`;
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CORE PRIMITIVE 1"
      title="核心概念一：Resources (資料資源)"
      subtitle="唯讀型資料來源：讓 AI 被動讀取檔案、文件或資料庫紀錄"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">Resource 定義結構</div>
        <JsonCard
          filename="resource_schema.json"
          :code="resourceSchema"
        />
      </div>

      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">典型應用</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>本機專案中的 README、設定檔與原始碼</li>
          <li>資料庫唯讀視圖 (Read-only Views) 與報表數據</li>
          <li>即時日誌串流與 API 靜態規格檔</li>
          <li>由 Client 主動拉取 (Pull) 並作為 Context 傳給 LLM</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
