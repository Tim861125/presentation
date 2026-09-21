<script setup lang="ts">
</script>

<template>
  <SlideShell :center="true">
    <div class="max-w-3xl space-y-5">
      <div class="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400">
        <span class="size-2 rounded-full bg-emerald-400 animate-pulse" />
        Section 01
      </div>
      <h1 class="text-5xl font-extrabold tracking-tight text-white leading-tight">
        Scroll
        <span class="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">凍結的快照游標</span>
      </h1>
      <p class="text-lg text-zinc-400 leading-relaxed max-w-2xl">
        用服務端的 search context，換取整個掃描期間固定的資料視野
      </p>
      <div class="flex items-center gap-2 pt-2">
        <span class="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-zinc-300">search context</span>
        <span class="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-zinc-300">_scroll_id</span>
        <span class="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-zinc-300">keep-alive</span>
        <span class="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-zinc-300">sliced scroll</span>
      </div>
    </div>
  </SlideShell>
</template>
