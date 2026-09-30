<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SYSTEM & UI REFINEMENT"
      title="系統與 UI 修正"
      subtitle="版面分層修復與設定流程精簡"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">版面分層</TechBadge>
          <span class="text-xs font-mono text-zinc-400">HEADER FIX</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">提示遮擋與文字異常修復</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          專案頁第一列功能列的浮動提示被頂部 Header bar 遮擋：重整 z-index 與排版層級；同步修正 Header bar 文字顯示異常。
        </p>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">設定精簡</TechBadge>
          <span class="text-xs font-mono text-zinc-400">PROFILE SETTINGS</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">個人設定流程簡化</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          移除個人頭像功能、精簡設定頁欄位與互動；修正修改密碼頁 UI。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
