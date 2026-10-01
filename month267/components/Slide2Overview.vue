<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="2026-07 · OVERVIEW"
      title="本月概覽"
      subtitle="Done 118 項 · To Do 7 項"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
      <TechCard accent="sky" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="sky">重點成果 01</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-1">Patent Embedding Search</h4>
        <p class="text-xs text-zinc-300">語意搜尋功能：從多向量策略研究到正式站台完整建置上線。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="emerald">重點成果 02</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-1">快檢通</h4>
        <p class="text-xs text-zinc-300">WEBPAT（專利搜尋平台）新功能上線，整合全站點數扣抵機制。</p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="purple">重點成果 03</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-1">多國專利資料管線</h4>
        <p class="text-xs text-zinc-300">CN／EPO／KR 新增匯入管線：File → RAW → L1 → L3 → OpenSearch。</p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="amber">重點成果 04</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-1">工具與維護</h4>
        <p class="text-xs text-zinc-300">SEP（標準必要專利）差速工具實裝上線與 TipoMusic 欄位擴充。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
