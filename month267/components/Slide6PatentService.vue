<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="BACKEND · API & DOCS"
      title="patent-service API 修正與文件"
      subtitle="v1.0.36 發布 · Dify 串接調整與文件標準化"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">API 調整</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DIFY API REFACTOR</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">串接 Dify API 調整</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          配合 Dify 工作流變更，調整後端調用格式與逾時重試策略，提高 API 穩定性與回應速度。
        </p>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">文件維護</TechBadge>
          <span class="text-xs font-mono text-zinc-400">SWAGGER & KM</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">更新 Swagger 與 KM 文件</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>補齊各 API Endpoint 與 Schema 欄位中文說明</li>
          <li>修復自動生成文件與實際執行行為不一致之處</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
