<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH · MAINTENANCE"
      title="核心系統維護"
      subtitle="多分類樹顯示修正與快檢通入口整合"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky" label="分類頁" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">多分類樹修正</h3>
        <ul
          class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed"
        >
          <li>新增分類自動勾選顯示</li>
          <li>修正「未分類名稱重複」誤判</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald" label="入口整合" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">
          頁面新增快檢通入口
        </h3>
        <ul
          class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed"
        >
          <li>魚骨、檢視、分類、分析與專案頁加入快檢通連結入口</li>
          <li>快檢通入口隨功能權限顯示</li>
        </ul>
      </TechCard>
    </div>

    <div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3 mt-4">
      <p class="text-xs text-zinc-400">
        v8.0.159 正式站台上線 · 測試站台更新並修復分類頁異常 · WEBPAT AI 通
        model 更新 gpt-6-luna · code coverage 盤點 · 協助排查 Excel
        下載連結（登入狀態問題）
      </p>
    </div>
  </SlideShell>
</template>
