<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="WIDGET VISIBILITY · CS BOT"
      title="小穎客服懸浮按鈕顯示範圍調整"
      subtitle="精簡頁面視覺雜訊，聚焦核心檢索與登入轉化"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">IPTECH 平台</TechBadge>
          <span class="text-xs font-mono text-zinc-400">LOGIN & HOME ONLY</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">登入頁與首頁顯示</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          除了「登入頁」與「首頁」保留小穎客服按鈕以協助用戶排障與引導，其餘功能頁面全面隱藏，避免干擾作業。
        </p>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">WEBPAT 平台</TechBadge>
          <span class="text-xs font-mono text-zinc-400">LOGIN & SEARCH ONLY</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">登入頁與檢索頁顯示</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          除了「登入頁」與「檢索主頁」外，其餘結果列表、詳細頁與分析模組皆不顯示小穎客服懸浮元件。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
