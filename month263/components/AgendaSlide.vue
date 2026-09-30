<script setup lang="ts">
const items = [
  { no: '01', title: '分類通：相似度篩選與 AI 暖場回應', tech: '相似度分數與滑桿動態篩選、低於門檻專利批次回流未分類、串流 AI 評論＋打字機氣泡' },
  { no: '02', title: '微分通（分類品質微調模組）新功能', tech: '雙分類樹版面＋節點比例顯示、分類功能整合為單一 dialog 並複用分類通邏輯' },
  { no: '03', title: '系統與 UI 修正', tech: 'z-index 分層修復提示遮擋、設定頁精簡、修改密碼 UI 修正' },
  { no: '04', title: 'Dify：Prompt 調整工作流與 API 整合', tech: 'promptKey 查表取得工作流設定、SSE 轉 OpenAI 格式、串流 generator 取代 vLLM 直連' },
  { no: '05', title: '修正、排查與維運', tech: '魚骨通／時序表修復、正式機部署與環境設定、資料轉置與點數系統整合排查' },
]
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="AGENDA · 2026-03"
      title="本月異動項目"
      subtitle="WEBPAT / IPTECH（專利搜尋與 AI 分析平台，模組含分類通、微分通、檢索通、魚骨通）的前後端開發與系統維護"
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
