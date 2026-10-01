<script setup lang="ts">
const items = [
  { title: 'Patent Embedding Search 語意搜尋', note: '一專利多向量研究 → 魚骨 UI → 站台與登入/點數機制' },
  { title: 'patent-service API 與文件', note: '回傳筆數參數化、索引指向修正、Swagger 文件工廠化' },
  { title: '多國專利資料管線', note: 'CN／EPO 即期資料四段匯入鏈：File → RAW → L1 → L3 → OpenSearch' },
  { title: '快檢通', note: 'WEBPAT 快速檢索模式：SSO 入口、kNN 排序、10 點／次' },
  { title: 'SEP 差速工具', note: 'publunique 子指令免建快照＋清單快取，掃描時間減半' },
  { title: 'TIPOMusic 與其他維護', note: '錄音著作比對途徑擴充、郵件下載網址修復、站台發版' },
  { title: '修正、排查與維運', note: '資料轉置支援、資轉問題協助與工具開發' },
]
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="OVERVIEW"
      title="本月異動項目"
      subtitle="WEBPAT（專利搜尋平台）、IPTECH（專利分析與專案管理平台）與資料管線"
    />

    <div class="mt-6 space-y-2.5">
      <div
        v-for="(item, i) in items"
        :key="item.title"
        class="flex items-baseline gap-4 rounded-lg border border-white/5 bg-white/5 px-4 py-2"
      >
        <span class="font-mono text-xs text-cyan-400">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="w-[320px] shrink-0 text-sm font-semibold text-white">{{ item.title }}</span>
        <span class="font-mono text-xs text-zinc-400">{{ item.note }}</span>
      </div>
    </div>
  </SlideShell>
</template>
