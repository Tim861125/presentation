<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DIFY WORKFLOW · API INTEGRATION"
      title="Dify：Prompt 工作流與 API 整合"
      subtitle="Dify（LLM 應用與工作流開發平台）：七項 prompt 調整工作流＋問答服務串接"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">工作流建置</TechBadge>
          <span class="text-xs font-mono text-zinc-400">PROMPT WORKFLOW</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">七項 Prompt 調整工作流</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>於 Dify 建立七項 prompt 調整 workflow，快速比對各 AI 模組不同 prompt 版本的分類準確率與回應品質</li>
          <li>搭配 prompt editor 小工具調整 feature code 與模型設定（換型 qwen3.5）</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">服務端整合</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DIFY API</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">問答鏈路改走 Dify</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>promptKey 查表取得 Dify API 設定，取代前端逐筆傳入金鑰與工作流 URL</li>
          <li>撰寫 Dify SSE 轉 OpenAI 格式轉換器與串流 generator，取代原 vLLM 直連、前端不改即切換後端</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
