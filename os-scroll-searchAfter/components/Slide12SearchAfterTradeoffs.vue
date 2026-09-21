<script setup lang="ts">
const pros = [
  ['免 search context，最輕量', '請求之間零依賴，服務端不用記住任何事。'],
  ['無 10,000 上限', '成本 O(shards × size)，深度不影響單頁價格。'],
  ['不綁 query', '每頁請求可改 query／filter，彈性高。'],
  ['冪等重試', '失敗只要重發同一組 sort 值，不會跳過資料。'],
]
const cons = [
  ['不凍結', '頁間有寫入 → 排序可能變，可能重複或漏失（不會報錯，更隱晦）。'],
  ['實務只能往前', '要「上一頁」得反轉 sort 再翻回來，很彆扭。'],
  ['每頁重發完整 query', '游標輕，但請求本身不輕（相對 Scroll 的純 id 續批）。'],
]
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="search_after · Trade-offs"
      title="search_after 特性與限制"
      subtitle="用「即時但可能漂移」換取「免狀態且恆定成本」"
    />

    <div class="grid grid-cols-2 gap-4 mt-1">
      <div class="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
        <div class="text-xs font-mono font-bold text-emerald-400 tracking-wider">✓ 優勢</div>
        <div class="space-y-2.5">
          <div v-for="p in pros" :key="p[0]" class="p-2.5 rounded-lg bg-black/40 border border-white/5">
            <div class="text-[11px] font-bold text-white font-mono">{{ p[0] }}</div>
            <div class="text-[11px] text-zinc-400 mt-0.5">{{ p[1] }}</div>
          </div>
        </div>
      </div>

      <div class="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-3">
        <div class="text-xs font-mono font-bold text-rose-400 tracking-wider">✗ 代價</div>
        <div class="space-y-2.5">
          <div v-for="c in cons" :key="c[0]" class="p-2.5 rounded-lg bg-black/40 border border-white/5">
            <div class="text-[11px] font-bold text-white font-mono">{{ c[0] }}</div>
            <div class="text-[11px] text-zinc-400 mt-0.5">{{ c[1] }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center gap-2 text-xs text-zinc-300">
      <span class="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 font-mono text-[10px]">定位</span>
      適合<strong class="text-white">大量連續翻頁、可容忍微小漂移</strong>的場景（feed 流、無窮滾動、批次消費）；要一致性，就再加一層 PIT。
    </div>
  </SlideShell>
</template>
