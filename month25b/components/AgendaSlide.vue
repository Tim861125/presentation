<script setup lang="ts">
const items = [
  { tag: 'BILLING', text: 'AI 扣點機制修正：到期日優先、負點數透支、常駐迴圈扣點 daemon' },
  { tag: 'PILOT', text: 'PatentPilot Service（AI 專利助理後端）：餘額 Middleware、多語系 Prompt、API 重構' },
  { tag: 'AUTO-RUN', text: '速讀通（AI 專利摘要）Auto Run 與邊滾邊產：IntersectionObserver 捲入視窗才觸發' },
  { tag: 'WHITELIST', text: 'AI 功能管理白名單：前端免扣點顯示 + 後端雙重驗證' },
  { tag: 'I18N', text: 'WEBPAT / IPTECH（專利檢索與分析平台）：介面英、簡體翻譯與 UI 修正' },
  { tag: 'PIPELINE', text: 'TIPO MUSIC 弱掃更新 · 專利英譯資料管線（TWIP）· 發佈與排查維運' },
]
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="2025-11 · AGENDA"
      title="本月異動項目"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6">
      <div
        v-for="item in items"
        :key="item.tag"
        class="flex items-start gap-3 border-b border-white/5 pb-3"
      >
        <span class="mt-0.5 shrink-0 rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-emerald-300">
          {{ item.tag }}
        </span>
        <span class="text-sm text-zinc-300 leading-relaxed">{{ item.text }}</span>
      </div>
    </div>
  </SlideShell>
</template>
