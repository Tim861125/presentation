<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="WEBPAT · UI & FISHBONE"
      title="Embedding Search UI 與魚骨模組"
      subtitle="魚骨圖介面設計、動畫優化與相似專利推薦"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">魚骨 UI & 動畫</TechBadge>
          <span class="text-xs font-mono text-zinc-400">UI / API IMPLEMENTATION</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">介面設計與 API 串接</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>完成魚骨 UI 設計與前後端 API 串接</li>
          <li>修正 Loading 魚骨節點過渡動畫卡頓問題</li>
          <li>新增按鈕儲存功能並優化儲存專案流程</li>
        </ul>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">推薦與資訊</TechBadge>
          <span class="text-xs font-mono text-zinc-400">RECOMMENDATION</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">相似推薦與用戶資訊</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>新增智慧「相似專利推薦」區塊</li>
          <li>導航列右上角正確顯示登入使用者名稱</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
