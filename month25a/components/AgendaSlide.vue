<script setup lang="ts">
const items: { no: string; title: string; tech: string }[] = [
  { no: '01', title: 'IPTECH / WEBPAT 雙平台一致性', tech: '前端顯示統一 · CSS 變數 · localStorage 記錄提示狀態' },
  { no: '02', title: '閱讀通 · 速讀通（AI 摘要）', tech: '摘要 API 前後端串接 · profile-setting API 儲存個人設定' },
  { no: '03', title: 'AI 點數計費升級：期限與扣款順序', tech: '單次 SQL 排序扣減 · cron 排程 · 白名單 · Math.ceil 整數化' },
  { no: '04', title: 'AI 摘要支援四種語系', tech: '呼叫端帶語系標識 · prompt key 四語系 · 管理後台加功能代碼' },
  { no: '05', title: '小穎客服顯示範圍縮小', tech: '頁面層級條件掛載懸浮元件' },
  { no: '06', title: 'TIPOMUSIC · IPTECH · 專利異動通知信', tech: '欄位取值 fallback 鏈 · 檢索語法修正 · 信件範本四語系' },
  { no: '07', title: 'UI 修正、排查與站台維護', tech: 'CSS 變數樣式統一 · 跨系統問題排查 · 測試環境維護' },
]
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="AGENDA"
      title="本月異動項目"
      subtitle="六個項目，每項以一句話標出關鍵技術做法"
    />

    <div class="mt-5 divide-y divide-white/5 rounded-xl border border-white/10 bg-white/[0.03]">
      <div v-for="item in items" :key="item.no" class="flex flex-col gap-0.5 px-4 py-2 md:flex-row md:items-baseline md:gap-4">
        <span class="font-mono text-xs text-emerald-400">{{ item.no }}</span>
        <span class="w-96 shrink-0 text-sm font-semibold text-white">{{ item.title }}</span>
        <span class="text-xs font-mono text-zinc-400 leading-snug">{{ item.tech }}</span>
      </div>
    </div>
  </SlideShell>
</template>
