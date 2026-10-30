<template>
  <MonthlySlideFrame
    eyebrow="PLATFORM SUPPORT"
    title="data-importer：Embedding job 與資料流程"
    subtitle="以一頁整理本月的平台整合、效能與資料轉置工作"
  >
    <div class="grid grid-cols-2 gap-8">
      <ul class="space-y-4 text-lg leading-relaxed text-zinc-300">
        <li>TW、US、JP、KR、EP、WO、CN、DOCDB 等來源收斂至 <code>os-patent-embedding</code>。</li>
        <li>移除向量中間表，改由專利全文直接產生向量並寫入 OpenSearch。</li>
        <li>統一 vLLM／Ollama 協定、重試、預取與並行控制，支援大批量處理。</li>
      </ul>
      <ul class="space-y-4 text-lg leading-relaxed text-zinc-300">
        <li>向量 index、CA onto 識別碼與多來源設定完成整理。</li>
      </ul>
    </div>
  </MonthlySlideFrame>
</template>
