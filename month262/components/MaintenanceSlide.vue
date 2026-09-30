<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="MAINTENANCE · 2026-02"
      title="修正、排查與維運"
      subtitle="Log 檢查與修復、資料轉置與正式機更新協助"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">Log 與會員系統</TechBadge>
          <span class="text-xs font-mono text-zinc-400">LOG & CRM</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Log 紀錄檢查與修復</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>檢查 IPTECH 登入／登出 log 紀錄，更新 LoginHelper 寫入邏輯</li>
          <li>排查 CRM 會員 log 無法查詢問題，修正資料庫連線設定</li>
          <li>檢索通關鍵鏈路加 DEBUG log，縮短問題定位時間</li>
        </ul>
      </TechCard>

      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">資料與正式機</TechBadge>
          <span class="text-xs font-mono text-zinc-400">ETL & RELEASE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">資料轉置與系統維運</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>專利資料轉置異常排查與修復協助</li>
          <li>TipoMusic 正式機版本更新，修復日期查詢功能</li>
          <li>WEBPAT 發版至 v8.0.178、IPTECH 發版至 v8.0.130</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
