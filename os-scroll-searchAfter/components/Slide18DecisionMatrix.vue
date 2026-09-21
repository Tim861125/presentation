<script setup lang="ts">
const rows = [
  { need: '前端前幾頁、可容忍漂移', pick: 'from + size', note: '≤ 10,000 · 隨機跳頁', star: false },
  { need: '深度翻頁、允許輕微不一致', pick: 'search_after', note: '免 context · 成本恆定', star: false },
  { need: '深度翻頁，要快照一致 + 可回上一頁 + 可換 query', pick: 'PIT + search_after', note: '推薦預設 · 官方首選', star: true },
  { need: '一次性全量匯出／reindex，懶得管 PIT 續期', pick: 'scroll（或 PIT + slicing）', note: '批次工具，別給用戶用', star: false },
]
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Decision Matrix · 決策矩陣"
      title="四種分頁方法，什麼時候用哪個"
      subtitle="一句話：小頁 from+size，深頁帶 sort 值，要一致性就上 PIT"
    />

    <div class="space-y-3 mt-1">
      <div
        v-for="r in rows" :key="r.need"
        class="rounded-xl border px-4 py-3 flex items-center gap-4"
        :class="r.star ? 'border-cyan-400/60 bg-cyan-500/10 shadow-lg shadow-cyan-500/10' : 'border-white/10 bg-white/[0.02]'"
      >
        <div class="flex-1 text-xs text-zinc-200 leading-snug">{{ r.need }}</div>
        <div class="w-5 shrink-0 text-zinc-500 font-mono">→</div>
        <div class="w-64 shrink-0">
          <div class="font-mono text-sm font-bold" :class="r.star ? 'text-cyan-300' : 'text-emerald-400'">
            {{ r.pick }}
            <span v-if="r.star" class="ml-1 text-[9px] px-1.5 py-0.5 rounded bg-cyan-400/20 text-cyan-300 align-middle">DEFAULT</span>
          </div>
          <div class="text-[10px] text-zinc-500 font-mono mt-0.5">{{ r.note }}</div>
        </div>
      </div>
    </div>

    <div class="mt-4 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center gap-2 text-xs text-zinc-300">
      <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">落地建議</span>
      新專案預設直接上 <strong class="text-cyan-300">PIT + search_after</strong>；Scroll 只留給接不上的舊系統與一次性遷移。
    </div>
  </SlideShell>
</template>
