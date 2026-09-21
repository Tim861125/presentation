<script setup lang="ts">
const items = [
  { c: 'emerald', t: '快照一致性', d: '整個 scroll 期間結果集合固定，看到的世界永遠是註冊當下。' },
  { c: 'teal', t: '深度無上限', d: '可掃全量，官方舉例：ML job 要拉 >1 PB 資料時就用它。' },
  { c: 'blue', t: '只能往前', d: '無法回上一頁；某一批請求失敗，那批資料直接跳過。' },
  { c: 'purple', t: '綁定初始 query', d: 'search context 綁定最初查詢，中途不能換 query。' },
  { c: 'amber', t: '資源常駐', d: '每個 open context 佔 segment 記憶體與 heap，直到逾時或 close。' },
  { c: 'rose', t: '不給即時用戶用', d: '官方明言：不要給一般用戶查詢用 scroll，改用 PIT。' },
]
const border: Record<string, string> = {
  emerald: 'border-emerald-500/20 bg-emerald-500/5',
  teal: 'border-teal-500/20 bg-teal-500/5',
  blue: 'border-blue-500/20 bg-blue-500/5',
  purple: 'border-purple-500/20 bg-purple-500/5',
  amber: 'border-amber-500/20 bg-amber-500/5',
  rose: 'border-rose-500/20 bg-rose-500/5',
}
const text: Record<string, string> = {
  emerald: 'text-emerald-400',
  teal: 'text-teal-400',
  blue: 'text-blue-400',
  purple: 'text-purple-400',
  amber: 'text-amber-400',
  rose: 'text-rose-400',
}
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Scroll · Trade-offs"
      title="Scroll 特性與代價"
      subtitle="一致性很好，但每件事都在跟服務端的記憶體收費"
    />

    <div class="grid grid-cols-3 gap-3.5 mt-1">
      <div v-for="(it, i) in items" :key="it.t" class="p-3.5 rounded-xl border space-y-1.5" :class="border[it.c]">
        <div class="flex items-center gap-2 text-sm font-bold" :class="text[it.c]">
          <span class="font-mono text-[10px] opacity-70">0{{ i + 1 }}</span>
          {{ it.t }}
        </div>
        <p class="text-[11px] text-zinc-300 leading-relaxed">{{ it.d }}</p>
      </div>
    </div>

    <div class="mt-4 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between text-xs">
      <div class="flex items-center gap-2 text-zinc-300">
        <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">定位</span>
        Scroll 是<strong class="text-white">一次性全量掃描工具</strong>（ETL／reindex），不是給用戶翻頁用的。
      </div>
      <div class="text-zinc-500 font-mono text-[11px]">→ 即時場景改用 PIT</div>
    </div>
  </SlideShell>
</template>
