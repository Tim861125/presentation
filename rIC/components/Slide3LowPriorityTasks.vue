<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CHALLENGE"
      title="痛點：大量低優先級背景任務怎麼辦？"
      subtitle="非關鍵工作若直接塞入主執行緒，將引發使用者操作卡頓"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">常見低優先級工作</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>埋點數據批次上傳與客戶端 Error Log 回報</li>
          <li>下一個路由頁面的靜態資源與圖片預載入 (Preloading)</li>
          <li>本地 IndexedDB / LocalStorage 快取整理與垃圾回收</li>
          <li>非視窗內 (Offscreen) 的次要 DOM 更新</li>
        </ul>
      </TechCard>

      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">直接執行的代價</TechBadge>
        </div>
        <p class="text-sm text-zinc-300 leading-relaxed">
          如果這些背景雜務與使用者點擊輸入或動畫幀搶佔同一個主執行緒，瀏覽器將無法在 16.67ms 內完成渲染，導致嚴重的 Jank (畫面卡頓) 與 INP (Interaction to Next Paint) 指標惡化！
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
