<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="MUSIC PLATFORM & ETL"
      title="TipoMusic 與資料轉置"
      subtitle="TipoMusic（音樂串流服務）清單比對修復、資料轉置規格文件化"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">系統修正</TechBadge>
          <span class="text-xs font-mono text-zinc-400">TIPOMUSIC</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">使用清單比對修復</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>修復使用清單比對的日期比較錯誤，比對結果恢復正確</li>
          <li>與需求方確認清單比對規則，完成發版上線</li>
        </ul>
      </TechCard>

      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">資料管線</TechBadge>
          <span class="text-xs font-mono text-zinc-400">ETL PIPELINE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">資料轉置問題處理</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>排查批次專利與著作權資料轉置過程中的問題並修正</li>
          <li>撰寫 data-importer 轉置規格，文件化匯入流程與規則</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
