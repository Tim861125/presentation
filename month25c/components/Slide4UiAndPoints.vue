<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH / WEBPAT · UI & FEATURES"
      title="UI 多語系修訂與速讀通 auto run"
      subtitle="多頁面翻譯補齊與版面修正；速讀通自動執行機制與點數扣點配套"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">介面與翻譯</TechBadge>
          <span class="text-xs font-mono text-zinc-400">UI / I18N</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">多頁面翻譯與版面修訂</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>檢索結果、檢視、分類、技術、魚骨圖、管理等頁面的多語系字串補齊與修正</li>
          <li>修正檢索結果頁元件相互覆蓋、速讀通按鈕移位至專利框內</li>
          <li>新增提示方框與操作 hint</li>
        </ul>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">速讀通 auto run</TechBadge>
          <span class="text-xs font-mono text-zinc-400">AI SPEED</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">自動／手動執行切換與扣點</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>auto run 關閉時速讀通圖示灰顯、hover 顯示開啟按鈕、開啟時自動觸發畫面中的專利</li>
          <li>單筆手動執行；檢視頁與詳細頁統一 auto run 設定</li>
          <li>新增 AI 觸發紀錄供點數扣點，修正點數不足與使用者方案查詢異常</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
