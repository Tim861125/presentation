<script setup lang="ts">
const items = [
  { no: '01', title: '專利資料管線擴充', tech: 'data-importer 匯入積體電路佈局與公報影像／書目，逐層加工後同步 OpenSearch' },
  { no: '02', title: 'AI 通 SSE 串流架構', tech: 'C# 後端轉發 text/event-stream，前端打字串流回應；移除 JWT、AI 觸發紀錄供扣點' },
  { no: '03', title: 'UI 多語系與速讀通 auto run', tech: '多頁面翻譯修訂；速讀通（AI 速讀助理）自動／手動執行切換與扣點紀錄' },
  { no: '04', title: 'TipoMusic 弱掃修復', tech: 'CSP 移除 unsafe-eval 改 nonce、補齊指令；資料轉置問題處理' },
  { no: '05', title: '修正、排查與維運', tech: '測試站／正式站部署、問題排查與規格討論、技術研調' },
]
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="AGENDA · 2025-12"
      title="本月異動項目"
      subtitle="智慧財產權平台相關系統的前後端開發、資料管線與資安修護"
    />

    <div class="flex flex-col gap-3 mt-6">
      <div
        v-for="item in items"
        :key="item.no"
        class="flex items-center gap-4 rounded-lg border border-white/10 bg-white/5 px-5 py-3"
      >
        <span class="text-sm font-mono text-emerald-400">{{ item.no }}</span>
        <span class="text-base font-semibold text-white whitespace-nowrap">{{ item.title }}</span>
        <span class="text-xs font-mono text-zinc-400 text-right">{{ item.tech }}</span>
      </div>
    </div>
  </SlideShell>
</template>
