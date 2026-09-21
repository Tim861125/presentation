<script setup lang="ts">
const rows = [
  ['資料視野', '建立時的快照（凍結）', '當下最新（不凍結）'],
  ['服務端狀態', '有：每 shard 一個 search context', '無：免狀態游標'],
  ['記憶體成本', '高：context 常駐直到逾時／關閉', '低：每請求 O(shards × size)'],
  ['中途改 query', '不可（綁初始 query）', '可（但 sort 不可變）'],
  ['失敗重試', '失敗的那批會被跳過', '冪等：重發同一 sort 值即可'],
  ['並行', 'sliced scroll（N 個 context）', '天然可並行多個獨立游標'],
  ['官方態度', '不建議用於一般用戶查詢', '明確用它取代 scroll 的翻頁場景'],
]
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Head-to-Head · 逐項對決"
      title="Scroll vs search_after"
      subtitle="一個把狀態留在服務端，一個把狀態交給客戶端"
    />

    <div class="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
      <table class="w-full border-collapse text-[11px]">
        <thead>
          <tr class="bg-white/[0.04] border-b border-white/10">
            <th class="text-left px-3 py-2 w-32 text-zinc-500 font-mono font-bold text-[10px] uppercase tracking-wider"></th>
            <th class="text-left px-3 py-2 text-emerald-400 font-mono font-bold">Scroll（快照）</th>
            <th class="text-left px-3 py-2 text-sky-400 font-mono font-bold">search_after（游標）</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in rows" :key="r[0]" class="border-b border-white/5 last:border-0">
            <td class="px-3 py-1.5 text-zinc-500 font-mono text-[10px]">{{ r[0] }}</td>
            <td class="px-3 py-1.5 text-zinc-300">{{ r[1] }}</td>
            <td class="px-3 py-1.5 text-zinc-300">{{ r[2] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-4 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between text-xs">
      <div class="flex items-center gap-2 text-zinc-300">
        <span class="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono text-[10px]">一句話</span>
        Scroll 用「服務端記住你掃到哪」換一致性，search_after 用「客戶端帶著座標回來」換輕量
      </div>
      <div class="text-cyan-300 font-mono text-[11px] whitespace-nowrap">而 PIT，把兩者的好處湊齊 →</div>
    </div>
  </SlideShell>
</template>
