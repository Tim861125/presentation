<script setup lang="ts">
const items = [
  { title: 'PatentPilot（AI 問答服務）改接 Dify 工作流', tech: 'Dify SSE → OpenAI 格式轉換 · promptKey 設定化' },
  { title: '分類通、微分通改版', tech: '多分類並行顯示 · Shift+M 工程模式' },
  { title: '魚骨通筆數修正', tech: '節點專利筆數 10~500 參數驗證' },
  { title: '點數扣點機制修正', tech: '點數不足提示 · 扣點服務成本單位重校' },
  { title: '音樂版權系統年度資轉', tech: '測試區多輪驗證 · 停機切換正式區' },
  { title: '安全強化與排查維運', tech: 'SQL Injection 修正 · error log 集中至 Hangfire' },
]
</script>

<template>
  <SlideShell px="px-16">
    <SlideHeader
      eyebrow="AGENDA · 2026-04"
      title="本月異動項目"
      subtitle="六大主軸，細節皆對應本月實際交付與修正"
    />

    <div class="flex flex-col gap-3 mt-8">
      <div
        v-for="(item, i) in items"
        :key="i"
        class="flex items-baseline gap-4 border border-white/10 bg-white/5 rounded-lg px-5 py-3"
      >
        <span class="text-xs font-mono text-emerald-400 shrink-0">{{ String(i + 1).padStart(2, '0') }}</span>
        <div class="flex flex-col md:flex-row md:items-baseline md:gap-4 min-w-0">
          <span class="text-base text-white font-medium">{{ item.title }}</span>
          <span class="text-xs font-mono text-zinc-400 truncate">{{ item.tech }}</span>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
