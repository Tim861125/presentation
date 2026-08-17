<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CROSS-PLATFORM · OPS"
      title="WEBPAT / IPTECH 站台維護"
      subtitle="匯出信件下載異常修復與雙站台正式版發布"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">問題修復</TechBadge>
          <span class="text-xs font-mono text-zinc-400">EMAIL & EXPORT</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">匯出信件下載網址處理</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          解決匯出郵件中下載連結過期或因網址編碼導致使用者無法正常下載專利檔案之問題。
        </p>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">站台更新</TechBadge>
          <span class="text-xs font-mono text-zinc-400">PRODUCTION DEPLOYMENT</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">正式站台版本發布</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>IPTECH 正式站台同步更新完成</li>
          <li>WEBPAT 正式站台同步更新完成</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
