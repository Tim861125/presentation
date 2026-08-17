<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="MUSIC PLATFORM & ETL"
      title="TipoMusic 與資料轉置"
      subtitle="日期範圍查詢修復、清單比對與排程轉置維護"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">系統修正</TechBadge>
          <span class="text-xs font-mono text-zinc-400">TIPOMUSIC</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">TipoMusic 功能維護</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>修復日期範圍檢索在特定格式下的比對與篩選異常</li>
          <li>與業務需求對齊並確認使用清單比對規格</li>
        </ul>
      </TechCard>

      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">資料管線</TechBadge>
          <span class="text-xs font-mono text-zinc-400">ETL PIPELINE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">資料轉置排障</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          針對大批量專利與著作權資料轉置過程中的欄位對齊與中文字元編碼異常進行即時修正。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
