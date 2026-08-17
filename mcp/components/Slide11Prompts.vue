<script setup lang="ts">
const promptSchema = `{
  "name": "fto_analysis",
  "description": "針對特定產品進行 FTO 專利風險分析模板",
  "arguments": [
    {
      "name": "patent_id",
      "description": "目標專利公開號",
      "required": true
    }
  ]
}`;
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CORE PRIMITIVE 3"
      title="核心概念三：Prompts (提示詞模板)"
      subtitle="工作流預設模板：讓 Server 提供結構化、可重複調用的對話樣板"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-purple-400 mb-2">Prompt 模板結構</div>
        <JsonCard
          filename="prompt_schema.json"
          :code="promptSchema"
        />
      </div>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">典型範例</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>Code Review 標準審查引導</li>
          <li>自動生成 Unit Test 測試案例引導</li>
          <li>專利 Claim Mapping 逐步比對流程</li>
          <li>使用者可由 UI 下拉選單一鍵發起專業工作流</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
