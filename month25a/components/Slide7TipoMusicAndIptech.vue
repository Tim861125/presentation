<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="TIPOMUSIC & IPTECH · LOGIC"
      title="TIPOMUSIC 與 IPTECH 規格調整"
      subtitle="音樂查詢欄位更新、所屬國合併與新帳號預設檢索"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">TIPOMUSIC</TechBadge>
          <span class="text-xs font-mono text-zinc-400">FIELD SPEC UPDATE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">音樂查詢欄位調整</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          依據最新版權規格，精準調整音樂著作與錄音著作之查詢欄位內容與回傳 Schema。
        </p>
      </TechCard>

      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">IPTECH 平台</TechBadge>
          <span class="text-xs font-mono text-zinc-400">MERGE & RE-SEARCH</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">所屬國合併與再檢索修復</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>所屬國篩選器新增項目合併邏輯</li>
          <li>修復檢視頁中「新帳號再檢索失效」問題，預設啟用「申請案合併」檢索</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
