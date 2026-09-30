<script setup lang="ts">
const items = [
  { no: '01', title: '新增價值通', tech: '專利 AI 技術價值評估：後端 API＋專利詳情頁整合，中英語系切換與閱讀通／價值通切換' },
  { no: '02', title: '檢索通修正與 Prompt 調校', tech: 'LLM 換型 Gemini、MCP 查詢鏈路修正、對話記錄寫入 DB、Prompt tuning 小工具、Shift+Enter 換行' },
  { no: '03', title: '洞察通與閱讀通優化', tech: '送到模型的專利筆數與 token 上限控管、自動開啟設定防呆' },
  { no: '04', title: '系統修正', tech: 'Header bar 版面修正、全站「檢索式」改為「分項」、CRM 開通與點數管理整合' },
  { no: '05', title: '修正、排查與維運', tech: '登入登出 log 檢查、會員 log 查詢修復、資料轉置與 TipoMusic 正式機協助' },
]
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="AGENDA · 2026-02"
      title="本月異動項目"
      subtitle="WEBPAT / IPTECH（專利搜尋與 AI 分析平台，模組含價值通、檢索通、洞察通、閱讀通）的前後端開發與系統維護"
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
