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
          <li>專利跨域分類後頁面刷新找不到專利問題</li>
          <li>新建專案分類頁持續 Loading 轉圈無法顯示</li>
          <li>修復無分類分類樹展示異常</li>
          <li>需點擊兩次才切換至目標節點清單問題</li>
          <li>點擊空白處選取分類未高亮該分類樹</li>
          <li>跨樹移動誤高亮相同 Node ID 節點</li>
        </ul>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="amber">其他功能維護</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>列表內刪除專利、未分類節點異常修復</li>
          <li>產品公告選「不再提示並關閉」後重複彈窗修復</li>
          <li>專案下載專利進度條回報穩定性改善</li>
          <li>檢視頁首圖模式新增放大鏡預覽功能</li>
          <li>修正帳號修改密碼功能異常</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
