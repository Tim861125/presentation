<script setup lang="ts">
</script>

<template>
  <SlideShell :center="true">
    <div class="max-w-3xl mx-auto w-full space-y-6">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono">
        <span class="size-2 rounded-full bg-cyan-400 animate-pulse" />
        Deep Pagination · Wrap-up
      </div>

      <h1 class="text-5xl font-extrabold tracking-tight text-white">
        Q &amp; A
        <span class="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">謝謝聆聽</span>
      </h1>

      <div class="grid grid-cols-3 gap-3 pt-1">
        <div class="p-3 rounded-xl border border-white/10 bg-white/[0.02] space-y-1">
          <div class="text-[10px] font-mono text-zinc-500">小頁面</div>
          <div class="text-xs font-bold text-emerald-400 font-mono">from + size</div>
        </div>
        <div class="p-3 rounded-xl border border-white/10 bg-white/[0.02] space-y-1">
          <div class="text-[10px] font-mono text-zinc-500">深頁面、可漂移</div>
          <div class="text-xs font-bold text-sky-400 font-mono">search_after</div>
        </div>
        <div class="p-3 rounded-xl border border-cyan-400/60 bg-cyan-500/15 space-y-1">
          <div class="text-[10px] font-mono text-cyan-300/80">深頁面、要一致性</div>
          <div class="text-xs font-bold text-cyan-300 font-mono">PIT + search_after</div>
        </div>
      </div>

      <div class="space-y-1.5 pt-2 text-[11px] font-mono text-zinc-500">
        <div>docs.opensearch.org → Paginate search results · Point in Time</div>
        <div>elastic.co → Paginate search results · search_after · Point in time API</div>
      </div>

      <div class="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
        <div>丁吾心 · RD 技術分享 · 2026</div>
        <div>Scroll · search_after · PIT</div>
      </div>
    </div>
  </SlideShell>
</template>
