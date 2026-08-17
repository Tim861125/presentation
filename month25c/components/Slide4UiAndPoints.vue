<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH / WEBPAT · UI & UX"
      title="UI 多頁面調整、點數與速讀通"
      subtitle="多語系翻譯補齊、點數機制與自動執行功能"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">介面與翻譯</TechBadge>
          <span class="text-xs font-mono text-zinc-400">UI / I18N</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">多頁面翻譯與版面修訂</h3>
        <p class="text-xs text-zinc-300 leading-relaxed">
          全面修訂包含：檢索頁、檢索結果頁、詳細頁、魚骨圖、檢視頁、分類頁、管理頁、技術頁與報告頁之多語系字串與響應式排版。
        </p>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">點數與 AI 通</TechBadge>
          <span class="text-xs font-mono text-zinc-400">FEATURES</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">點數優化與速讀／閱讀通</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>點數餘額計算與扣抵即時性優化</li>
          <li>速讀通 / 閱讀通新增支援「自動執行」與「手動觸發」切換</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
