<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH · BUG FIXES & STABILITY"
      title="IPTECH 系統問題修復"
      subtitle="專利跨樹分類、樹狀節點連動、檢視模式與公告優化"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
      <TechCard accent="rose" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="rose">分類樹操作修復</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>專利跨樹分類後頁面刷新、找不到專利問題修復</li>
          <li>新建專案分類頁持續 Loading 無法顯示修復</li>
          <li>無資料分類樹無法顯示、分類筆數顯示異常修復</li>
          <li>需點擊兩次才切換至目標節點清單問題修復</li>
          <li>點擊空白處未高亮所選分類樹修復</li>
          <li>跨樹移動誤高亮相同 Node ID 節點修復</li>
        </ul>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="amber">其他功能維護</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>清單內刪除專利、未分類節點重複異常修復</li>
          <li>公告「不再提示」狀態由 Cookie 改存 localStorage，修復重複彈窗</li>
          <li>專案下載專利進度條回報穩定性改善（測試站台）</li>
          <li>檢視頁首圖模式新增放大顯示</li>
          <li>帳號修改密碼功能異常修復</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
