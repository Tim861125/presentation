<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DATA PIPELINE · ETL"
      title="CN／EPO 即期專利資料管線"
      subtitle="資料匯入四段鏈路：File → RAW（原始資料入庫）→ L1（解析）→ L3（塑形）→ OpenSearch（索引）"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">EPO 即期資料</TechBadge>
          <span class="text-xs font-mono text-zinc-400">FILE → RAW → L1 → L3 → OS</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">EPA 公開案＋EPB 核准案雙鏈路</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>EPO（歐洲專利局）EPAB 卷期 XML 原無匯入管線，以卷期為觸發參數新建 A 案（公開）四段全鏈</li>
          <li>A／B 案抽出兩支共用 transform，再補 B 案（核准）四段鏈與 Citus（PostgreSQL 分散擴充）分散表</li>
          <li>全卷實跑驗證：A 案 4,410 筆、B 案 1,576 筆跑完四段全鏈，重跑以 docId 覆寫不產生重複</li>
          <li>43＋4 個 transform 單元測試與規格文件；批次大小依單筆體積（最大 1.8 MB）調至 50 筆</li>
        </ul>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">CN／KR 即期資料</TechBadge>
          <span class="text-xs font-mono text-zinc-400">CN · KR · KP · KD</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">中國四類型轉置全數完成</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>分析 CN（中國）即期專利資料結構並撰寫轉置程式：發明公開、發明授權、新型、設計四類型全數完成</li>
          <li>同月於匯入系統新增 CN／EPA／EPB job；KR（韓國）與 kp 發明／新型、kd 設計轉置同期完成</li>
          <li>美國專利 embedding 同期建立，供語意搜尋資料集使用</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
