<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="YYYY-MM · AGENDA"
      title="本月異動項目"
      subtitle="主線工作與維護、排查項目"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mt-5">
      <div class="flex items-baseline gap-3 border-b border-white/5 pb-2">
        <span class="text-[10px] font-mono text-cyan-400 shrink-0">01</span>
        <div>
          <p class="text-sm font-semibold text-white">條目標題一</p>
          <p class="text-xs font-mono text-zinc-400">一行 mono 摘要，說明本項核心變更</p>
        </div>
      </div>
      <div class="flex items-baseline gap-3 border-b border-white/5 pb-2">
        <span class="text-[10px] font-mono text-cyan-400 shrink-0">02</span>
        <div>
          <p class="text-sm font-semibold text-white">條目標題二</p>
          <p class="text-xs font-mono text-zinc-400">一行 mono 摘要，說明本項核心變更</p>
        </div>
      </div>
      <div class="flex items-baseline gap-3 border-b border-white/5 pb-2">
        <span class="text-[10px] font-mono text-cyan-400 shrink-0">03</span>
        <div>
          <p class="text-sm font-semibold text-white">條目標題三</p>
          <p class="text-xs font-mono text-zinc-400">一行 mono 摘要，說明本項核心變更</p>
        </div>
      </div>
      <div class="flex items-baseline gap-3 border-b border-white/5 pb-2">
        <span class="text-[10px] font-mono text-cyan-400 shrink-0">04</span>
        <div>
          <p class="text-sm font-semibold text-white">條目標題四</p>
          <p class="text-xs font-mono text-zinc-400">一行 mono 摘要，說明本項核心變更</p>
        </div>
      </div>
      <div class="flex items-baseline gap-3 border-b border-white/5 pb-2 md:col-span-2">
        <span class="text-[10px] font-mono text-cyan-400 shrink-0">05</span>
        <div>
          <p class="text-sm font-semibold text-white">維護、排查與其他工作</p>
          <p class="text-xs font-mono text-zinc-400">收尾項可跨雙欄（md:col-span-2）</p>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
