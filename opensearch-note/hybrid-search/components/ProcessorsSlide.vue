<script setup lang="ts">
const procs = [
  {
    name: 'normalization-processor',
    since: '2.10',
    accent: 'border-emerald-500/30 bg-emerald-500/[0.05]',
    badge: 'text-emerald-400',
    mechanism: '分數制 (score-based)',
    how: '把各路分數正規化到同一尺度，再加權合併。',
    rows: [
      ['正規化', 'min_max · l2 · z_score'],
      ['合併', 'arithmetic / geometric / harmonic mean'],
      ['權重', 'weights 陣列，總和 = 1.0'],
    ],
    when: '想精細控制各路分數尺度與權重時。',
  },
  {
    name: 'score-ranker-processor',
    since: '2.19',
    accent: 'border-blue-500/30 bg-blue-500/[0.05]',
    badge: 'text-blue-400',
    mechanism: '排名制 (rank-based)',
    how: '用 RRF：只看每份文件在各路的「名次」，對分數尺度不敏感。',
    rows: [
      ['演算法', 'rrf (Reciprocal Rank Fusion)'],
      ['調節', 'rank_constant，預設 60'],
      ['權重', 'weights 陣列，總和 = 1.0'],
    ],
    when: '各路分數尺度差異大、只想信任名次時更穩健。',
  },
]
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Processors"
      title="兩種 phase_results_processor：二選一"
      subtitle="都掛在 search pipeline 的 phase_results_processors，負責把多路子查詢的結果合併成單一排名。"
    />

    <div class="grid grid-cols-2 gap-5 flex-1">
      <div v-for="p in procs" :key="p.name"
           class="rounded-xl border p-5 flex flex-col" :class="p.accent">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-base font-bold font-mono text-white">{{ p.name }}</span>
          <span class="text-[10px] font-mono rounded-full border border-white/15 px-2 py-0.5 ml-auto" :class="p.badge">
            since {{ p.since }}
          </span>
        </div>

        <div class="text-sm font-semibold mb-1" :class="p.badge">{{ p.mechanism }}</div>
        <p class="text-xs text-zinc-400 mb-4 leading-relaxed">{{ p.how }}</p>

        <div class="space-y-2 mb-4">
          <div v-for="r in p.rows" :key="r[0]"
               class="flex items-baseline gap-3 text-sm">
            <span class="text-[11px] font-mono uppercase tracking-wider text-zinc-500 w-14 shrink-0">{{ r[0] }}</span>
            <span class="text-zinc-200 font-mono text-xs">{{ r[1] }}</span>
          </div>
        </div>

        <div class="mt-auto rounded-lg border border-white/10 bg-black/20 px-3 py-2">
          <span class="text-[10px] font-mono uppercase tracking-wider text-zinc-500">何時用</span>
          <p class="text-xs text-zinc-300 mt-0.5">{{ p.when }}</p>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
