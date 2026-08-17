<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="PRODUCTION GUIDELINES"
      title="實務選型指引與生產建議"
      subtitle="業務情境對照與 Lodash / Lodash-es 成熟函式庫選用"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <TechCard accent="sky" class="p-4">
        <h4 class="text-base font-semibold text-white mb-2">選用 Debounce</h4>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>搜尋框關鍵字建議 (Search Autocomplete)</li>
          <li>表單欄位非同步驗證 (Form Validation)</li>
          <li>編輯器文章/草稿自動儲存 (Auto-save)</li>
          <li>視窗 Resize 後的響應式版面重排計算</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <h4 class="text-base font-semibold text-white mb-2">選用 Throttle</h4>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>滾動加載 (Infinite Scroll) 與閱讀進度條</li>
          <li>即時股價 / 儀表板資料可視化重繪</li>
          <li>DOM 拖曳 (Drag & Drop) 座標即時更新</li>
          <li>滑鼠移動軌跡繪製</li>
        </ul>
      </TechCard>
    </div>

    <div class="mt-4">
      <JsonCard
        filename="production_import.js"
        :code="`// 生產環境推薦直接引入成熟函式庫 (包含 leading, trailing, maxWait 等完整邊界處理)
import { debounce, throttle } from 'lodash-es';`"
      />
    </div>
  </SlideShell>
</template>
