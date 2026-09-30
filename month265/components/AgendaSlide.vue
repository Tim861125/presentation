<script setup lang="ts">
const items = [
  { tag: 'AI FLOW & DIFY', desc: 'AI 模型流程與設定規格、PatentPilot-service 架構調整、Dify 測試站聯調' },
  { tag: 'MULTI-TREE', desc: '分類頁多分類樹同時顯示，跨樹移動、合併與相似度標章' },
  { tag: 'MERGE CLASSIFY', desc: '專案合併模式自動分類：主件分類複製給子件、子件去重對齊' },
  { tag: 'POINTS', desc: '分類通點數不足阻擋提示、AI 點數管理後台扣點修復' },
  { tag: 'STABILITY', desc: '閱讀通自動啟動、檢索通連續提問、魚骨通介面修正' },
  { tag: 'OPS & ANNOUNCE', desc: 'CRM 公告編輯器換型、TipoMusic 公告橫幅、資料轉置防呆' },
]
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="AGENDA · 2026-05"
      title="本月異動項目"
      subtitle="六大主項：AI 架構、多分類樹、合併分類、點數機制、穩定性修正、公告與維運"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 mt-8">
      <div
        v-for="item in items"
        :key="item.tag"
        class="flex flex-col gap-1.5 border-l-2 border-emerald-400/60 pl-4"
      >
        <span class="text-[11px] font-mono uppercase tracking-widest text-emerald-400">{{ item.tag }}</span>
        <span class="text-sm text-zinc-300 leading-relaxed">{{ item.desc }}</span>
      </div>
    </div>
  </SlideShell>
</template>
