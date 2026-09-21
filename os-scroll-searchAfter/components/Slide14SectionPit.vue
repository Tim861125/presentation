<script setup lang="ts">
</script>

<template>
  <SlideShell :center="true">
    <div class="max-w-3xl space-y-5">
      <div class="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-indigo-400">
        <span class="size-2 rounded-full bg-indigo-400 animate-pulse" />
        Section 03
      </div>
      <h1 class="text-5xl font-extrabold tracking-tight text-white leading-tight">
        PIT + search_after
        <span class="bg-gradient-to-r from-indigo-400 via-violet-300 to-purple-400 bg-clip-text text-transparent">現代推薦解</span>
      </h1>
      <p class="text-lg text-zinc-400 leading-relaxed max-w-2xl">
        快照一致性 + 免綁 query + 前後皆可翻 —— 官方首選的深度分頁組合
      </p>
      <div class="flex items-center gap-2 pt-2">
        <span class="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-zinc-300">pit_id</span>
        <span class="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-zinc-300">keep_alive</span>
        <span class="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-zinc-300">segment 快照</span>
        <span class="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-zinc-300">OpenSearch 3.0：Scroll 棄用</span>
      </div>
    </div>
  </SlideShell>
</template>
