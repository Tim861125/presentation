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
        <p class="text-xs text-zinc-300">完成一專利多向量研究至正式站台建置與上線。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="emerald">重點成果 02</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-1">快檢通</h4>
        <p class="text-xs text-zinc-300">WEBPAT 正式上線與全站點數扣抵機制整合。</p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="purple">重點成果 03</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-1">多國專利資料管線</h4>
        <p class="text-xs text-zinc-300">新增 EP / KR / CN 資料流：File → RAW → L1 → L3 → OS。</p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="amber">重點成果 04</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-1">工具與維護</h4>
        <p class="text-xs text-zinc-300">SEP diff tool 規格推進與 TipoMusic 欄位擴充比對。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
