<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="MULTI-PLATFORM · OPS & I18N"
      title="跨站台維運與多語系處理"
      subtitle="IPTECH / WEBPAT、TIPO MUSIC 與 TWIP 英譯管線"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <TechCard accent="sky" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="sky">IPTECH / WEBPAT</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-2">介面與翻譯修訂</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          全站多語系欄位翻譯精準化校對與按鈕排版微調。
        </p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="purple">TIPO MUSIC</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-2">弱掃排查與更新</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          安全性弱點掃描排查、測試站驗證與正式機順利部署。
        </p>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="emerald">TWIP</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-2">英譯資料處理</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          完成台灣專利英譯文本轉置與例外字元清洗作業。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
