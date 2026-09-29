<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="FIXES · SUPPORT"
      title="UI 修正、問題排查與站台維護"
      subtitle="功能開發之外的日常：介面疑義修正、跨系統問題排查與測試環境維護"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <TechCard variant="emerald" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge label="雙站 UI 修正" color="emerald" />
        </div>
        <h4 class="text-base font-semibold text-white mb-2">介面疑義收尾</h4>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>按鈕 hover、彈窗顏色統一改用 CSS 變數</li>
          <li>修正 IPTECH 詳細頁標籤誤顯示為 WEBPAT</li>
          <li>修正檢索結果頁 header 顏色顯示異常</li>
        </ul>
      </TechCard>

      <TechCard variant="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge label="問題排查" color="amber" />
        </div>
        <h4 class="text-base font-semibold text-white mb-2">查根因，不只改表面</h4>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>WEBPAT 分類號查詢：字詞螢光、結果無字詞等問題追查</li>
          <li>IPTECH 引證檢索存專案、再檢索規格追查</li>
          <li>AI 點數：登入流程與使用紀錄介面排查</li>
          <li>內部資料轉換問題排查五輪</li>
        </ul>
      </TechCard>

      <TechCard variant="blue" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge label="維運與學習" color="blue" />
        </div>
        <h4 class="text-base font-semibold text-white mb-2">環境維護與技術儲備</h4>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>WEBPAT / IPTECH / TipoMusic 測試站台佈署維護</li>
          <li>TipoMusic Footer 信箱與教育訓練素材更新</li>
          <li>AI 新功能提供內部測試、參加月會</li>
          <li>zod、LINQPad 學習，作為驗證工具储备</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
