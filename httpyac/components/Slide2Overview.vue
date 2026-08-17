<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="OVERVIEW"
      title="What is httpYac?"
      subtitle="高度可擴充的開源 HTTP Request 開發與自動化測試工具"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">VS CODE</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">VS Code Extension</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          直接在編輯器內編寫、執行並即時預覽 HTTP Request 回應，支援 CodeLens 點擊發送。
        </p>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">CLI & CI/CD</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Command Line App</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          提供獨立 CLI 執行檔，支援批次運行與 JSON 報告輸出，無縫整合入 CI/CD 自動化測試。
        </p>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">HTTPBOOK</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">httpBook Notebook</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          以 Jupyter Notebook 互動筆記形式文件化與組織所有 API 測試流程。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
