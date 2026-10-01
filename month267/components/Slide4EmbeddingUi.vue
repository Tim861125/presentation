<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="WEBPAT · UI & FISHBONE"
      title="Embedding Search UI 與魚骨模組"
      subtitle="魚骨圖（檢索結果分類視覺化）介面設計、動畫優化與相似專利推薦"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">魚骨 UI & 動畫</TechBadge>
          <span class="text-xs font-mono text-zinc-400">UI / API IMPLEMENTATION</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">介面設計與互動優化</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>階層 k-means 分群產出魚骨圖，節點名稱由 Dify（LLM 工作流平台）自動命名、失敗降級為標題</li>
          <li>魚骨圖滾輪縮放與拖曳平移、點節點展開子群清單、鍵盤上下鍵切換結果</li>
          <li>Loading 節點過渡動畫與相似專利出現動畫修正</li>
        </ul>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">推薦與儲存</TechBadge>
          <span class="text-xs font-mono text-zinc-400">RECOMMENDATION & SAVE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">相似推薦與專案儲存</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>新增相似專利推薦區塊與對應查詢 API</li>
          <li>儲存對話框改用可展開專案樹：lazy 載入子節點、快取 120 秒</li>
          <li>非必填欄位收進「進階」Dialog 並支援縮放；右上角顯示使用者名稱</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
