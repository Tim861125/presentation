<script setup lang="ts">
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Scroll · Mechanism"
      title="Scroll 機制：心智模型"
      subtitle="一次註冊、反覆續約，資料視野永遠停留在註冊當下"
    />

    <div class="grid grid-cols-2 gap-3.5 mt-1">
      <div class="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
        <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <div class="size-6 rounded-lg bg-emerald-500/20 flex items-center justify-center font-mono text-xs">1</div>
          首批請求註冊 search context
        </div>
        <p class="text-[11px] text-zinc-300 leading-relaxed">
          帶 <code class="text-emerald-300 font-mono">scroll=10m</code>：每個 shard 記住這次查詢對應哪些 Lucene segment、掃到哪裡。
        </p>
      </div>

      <div class="p-3.5 rounded-xl border border-teal-500/20 bg-teal-500/5 space-y-2">
        <div class="flex items-center gap-2 text-teal-400 font-bold text-sm">
          <div class="size-6 rounded-lg bg-teal-500/20 flex items-center justify-center font-mono text-xs">2</div>
          後續只要 _scroll_id
        </div>
        <p class="text-[11px] text-zinc-300 leading-relaxed">
          回應附 <code class="text-emerald-300 font-mono">_scroll_id</code>；續批只跟 <code class="text-emerald-300 font-mono">_search/scroll</code> 要下一批，<strong class="text-white">不帶 query</strong>。
        </p>
      </div>

      <div class="p-3.5 rounded-xl border border-blue-500/20 bg-blue-500/5 space-y-2">
        <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">
          <div class="size-6 rounded-lg bg-blue-500/20 flex items-center justify-center font-mono text-xs">3</div>
          keep-alive 每次請求續約
        </div>
        <p class="text-[11px] text-zinc-300 leading-relaxed">
          <code class="text-emerald-300 font-mono">scroll=10m</code> 是「距下次請求最多閒置 10 分鐘」——是<strong class="text-white">閒置逾時</strong>，不是總時限。
        </p>
      </div>

      <div class="p-3.5 rounded-xl border border-purple-500/20 bg-purple-500/5 space-y-2">
        <div class="flex items-center gap-2 text-purple-400 font-bold text-sm">
          <div class="size-6 rounded-lg bg-purple-500/20 flex items-center justify-center font-mono text-xs">4</div>
          結果凍結在建立當下
        </div>
        <p class="text-[11px] text-zinc-300 leading-relaxed">
          之後的新增／更新／刪除都不反映；已刪除的文件仍會被回傳，到 fetch 階段才標記為 deleted。
        </p>
      </div>
    </div>

    <div class="mt-4 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center gap-2 text-xs text-zinc-300">
      <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono text-[10px]">常見誤解</span>
      批次處理慢時，keep-alive 會被每次請求不斷續期——要拉長的是「單批不閒置」，不是擔心總時限不夠。
    </div>
  </SlideShell>
</template>
