<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DIFY WORKFLOW · PROMPT TUNING"
      title="Dify — Prompt 調整工作流"
      subtitle="建立自動化 Prompt 微調與實驗流程"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">工作流建置</TechBadge>
          <span class="text-xs font-mono text-zinc-400">PROMPT WORKFLOW</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Prompt 調整 Workflow</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          於 Dify 平台建立專屬 Prompt 調整工作流，讓團隊可針對各 AI 模組快速評估不同 Prompt 版本的分類準確率與回應品質。
        </p>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">效益分析</TechBadge>
          <span class="text-xs font-mono text-zinc-400">ITERATION CYCLE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">加速迭代週期</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          透過視覺化節點即時比對輸出成果，大幅縮短專利分類與摘要提示詞的調優時間。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
