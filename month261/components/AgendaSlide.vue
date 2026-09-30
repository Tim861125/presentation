<script setup lang="ts">
const items = [
  { no: '01', title: '檢索通 AI 檢索流程重建', tech: '獨立 AI Agent API＋SSE 串流；經 Upat MCP 查詢專利並解析 tool_calls' },
  { no: '02', title: 'WEBPAT / IPTECH 介面與點數把關', tech: 'AI 搜尋思考中 UI、移除舊 AI 檢索；進線前檢查剩餘點數的中間層' },
  { no: '03', title: 'TipoMusic 系統修正', tech: '使用清單比對的日期比較錯誤修復與比對規格確認' },
  { no: '04', title: '資料轉置', tech: 'data-importer 轉置規格文件化、批次轉置問題排查' },
  { no: '05', title: '修正、排查與維運', tech: '點數提示與分類頁修正、點數服務 API 修復、各系統發版' },
]
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="AGENDA · 2026-01"
      title="本月異動項目"
      subtitle="智慧財產權平台相關系統的前後端開發、AI 串流整合與系統維護"
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
