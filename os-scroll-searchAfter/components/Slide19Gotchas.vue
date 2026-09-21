<script setup lang="ts">
const items = [
  { lv: 'rose', t: '沒給唯一 tiebreaker', d: '同 sort 值的文件被整批跳過——最後一個 sort 放唯一欄位（line_id、_shard + doc）。' },
  { lv: 'rose', t: 'context 不持久化', d: 'scroll context 與 PIT 都撐不過 node fail，客戶端必須能重建後續掃。' },
  { lv: 'amber', t: 'scroll_id / pit_id 會換', d: '每次都存回應中最新的那個 id，拿舊 id 續批會出錯或拿到過期快照。' },
  { lv: 'amber', t: '忘 close scroll / PIT', d: 'max_open_scrolls（500）、max_open_pit_context（300）耗盡後，新請求全報錯。' },
  { lv: 'amber', t: '批次處理要拉長 keep-alive', d: 'keep-alive 是閒置逾時：單批處理時間可能超過它，主動續期或加大。' },
  { lv: 'blue', t: 'PIT 看不到新資料', d: 'PIT 建立後新 index 的文件搜不到；即時 feed 場景反而是裸 search_after 的領域。' },
]
const box: Record<string, string> = {
  rose: 'border-rose-500/30 bg-rose-500/10',
  amber: 'border-amber-500/30 bg-amber-500/10',
  blue: 'border-sky-500/30 bg-sky-500/10',
}
const txt: Record<string, string> = {
  rose: 'text-rose-300',
  amber: 'text-amber-300',
  blue: 'text-sky-300',
}
const tag: Record<string, string> = { rose: '致命', amber: '常見', blue: '認知' }
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Gotchas · 踩坑速查"
      title="常見坑速查"
      subtitle="production 事故報告裡，這六個名字出現最多次"
    />

    <div class="grid grid-cols-3 gap-3.5 mt-1">
      <div v-for="it in items" :key="it.t" class="p-3.5 rounded-xl border space-y-2" :class="box[it.lv]">
        <div class="flex items-center justify-between gap-2">
          <div class="text-xs font-bold text-white">{{ it.t }}</div>
          <span class="px-1.5 py-0.5 rounded font-mono text-[9px] shrink-0" :class="[box[it.lv], txt[it.lv]]">{{ tag[it.lv] }}</span>
        </div>
        <p class="text-[11px] text-zinc-300 leading-relaxed">{{ it.d }}</p>
      </div>
    </div>

    <div class="mt-4 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center gap-2 text-xs text-zinc-300">
      <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono text-[10px]">心法</span>
      把 id 當易碎品、把 context 當租賃資源——<strong class="text-white">用最新 id、按時歸還、隨時能重建</strong>。
    </div>
  </SlideShell>
</template>
