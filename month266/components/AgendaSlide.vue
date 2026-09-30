<script setup lang="ts">
const items = [
  { title: 'IPTECH 分類頁多分類樹', note: '跨樹專利清單即時切換、拖曳移動與節點合併' },
  { title: '魚骨通（魚骨圖檢索模組）', note: '版面跑版修復與關閉視窗雙重確認防呆' },
  { title: 'AI 助手匯出與 Prompt 調整', note: '速讀通 Excel 匯出、Markdown 複製、prompt 版本化快取' },
  { title: 'WEBPAT（專利搜尋平台）體驗模式與 FTO', note: 'FB 廣告導流體驗模式、FTO（Freedom to Operate）AI POC' },
  { title: 'Patent Embedding 專利向量化', note: 'OpenSearch + embedding 模型 + rerank 搜尋管線 POC' },
  { title: 'IPTECH 系統問題修復', note: '分類樹操作、公告機制與帳號功能修復' },
  { title: '修正、排查與維運', note: 'TipoMusic（音樂授權平台）維運、站台部署與問題排查' },
]
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="OVERVIEW"
      title="本月異動項目"
      subtitle="IPTECH、WEBPAT、Patent Embedding POC 與維運排查"
    />

    <div class="mt-6 space-y-2.5">
      <div
        v-for="(item, i) in items"
        :key="item.title"
        class="flex items-baseline gap-4 rounded-lg border border-white/5 bg-white/5 px-4 py-2"
      >
        <span class="font-mono text-xs text-emerald-400">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="w-[300px] shrink-0 text-sm font-semibold text-white">{{ item.title }}</span>
        <span class="font-mono text-xs text-zinc-400">{{ item.note }}</span>
      </div>
    </div>
  </SlideShell>
</template>
