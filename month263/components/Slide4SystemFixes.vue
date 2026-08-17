<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SYSTEM & UI REFINEMENT"
      title="系統與 UI 修正"
      subtitle="版面遮擋問題修正與使用者設定簡化"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">版面調整</TechBadge>
          <span class="text-xs font-mono text-zinc-400">HEADER FIX</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">專案提示遮擋修復</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          修正專案頁中的浮動提示文字被頂部 Header bar 遮擋之問題，重整 Z-index 與排版層級。
        </p>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">使用者設定</TechBadge>
          <span class="text-xs font-mono text-zinc-400">PROFILE SETTINGS</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">個人設定流程簡化</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          移除個人自訂頭像功能，精簡個人設定頁面欄位與互動，維持介面簡潔性。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
