<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH / WEBPAT · AI MODULES"
      title="新增價值通 ＆ 調整檢索通"
      subtitle="專利 AI 價值評估模型與智慧檢索互動提升"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">新功能上線</TechBadge>
          <span class="text-xs font-mono text-zinc-400">PATENT VALUE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">新增價值通</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          建立專利在 AI 時代的技術價值與商業潛力評估模型，提供結構化評分與多維度摘要。
        </p>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">檢索通優化</TechBadge>
          <span class="text-xs font-mono text-zinc-400">AI SEARCH TUNING</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">調整檢索通與 Prompt 工具</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>全面由人工規則過渡為大模型自然語言理解</li>
          <li>新增內部 Prompt 調優小工具，便於快速對比 Prompt 版本</li>
          <li>輸入框支援 Shift + Enter 換行與多行提問</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
