<template>
  <div class="h-full w-full bg-zinc-950 text-zinc-100 px-12 py-7 flex flex-col overflow-hidden">
    <SlideHeader
      eyebrow="Theming"
      title="改一個 token，整站變色"
      subtitle="CSS Variables + 語義配對 + Dark Mode = 改一行，全部跟著動。"
    />

    <div class="grid grid-cols-2 gap-4 flex-1 min-h-0">
      <div class="flex flex-col">
        <div class="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
          // app/globals.css
        </div>
        <div class="rounded-lg border border-white/10 bg-black/60 p-3 font-mono text-[10px] leading-relaxed flex-1">
          <div class="text-purple-300">:root {</div>
          <div class="pl-3 text-zinc-300">
            <span class="text-zinc-500">--background:</span> <span class="text-orange-300">oklch(1 0 0)</span>;
          </div>
          <div class="pl-3 text-zinc-300">
            <span class="text-zinc-500">--foreground:</span> <span class="text-orange-300">oklch(0.145 0 0)</span>;
          </div>
          <div v-click="1" class="pl-3 text-zinc-300">
            <span class="text-emerald-300">--primary:</span>  <span class="text-orange-300">oklch(0.205 0 0)</span>;
          </div>
          <div class="pl-3 text-zinc-300">
            <span class="text-zinc-500">--primary-foreground:</span> <span class="text-orange-300">oklch(0.985 0 0)</span>;
          </div>
          <div class="pl-3 text-zinc-300">
            <span class="text-zinc-500">--radius:</span> <span class="text-orange-300">0.625rem</span>;
          </div>
          <div class="text-purple-300">}</div>
          <div v-click="2" class="text-purple-300 mt-1">.dark {</div>
          <div v-click="2" class="pl-3 text-zinc-300">
            <span class="text-emerald-300">--primary:</span>  <span class="text-orange-300">oklch(0.985 0 0)</span>;
            <span class="text-zinc-600"> // 翻轉</span>
          </div>
          <div v-click="2" class="text-purple-300">}</div>
        </div>

        <div v-click="1" class="mt-2 rounded bg-emerald-500/[0.08] border border-emerald-500/20 px-2.5 py-1.5 text-[10px] text-emerald-200">
          ✦ 改一行 <code class="font-mono">--primary</code>，所有 <code class="font-mono">bg-primary</code> 元件即時變色。
        </div>
      </div>

      <div class="flex flex-col">
        <div class="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">
          // Semantic pairing
        </div>
        <div class="rounded-lg border border-white/10 bg-white/[0.02] p-2 space-y-1.5 flex-1">
          <div v-for="pair in pairs" :key="pair.bg" v-click="3"
               class="flex items-center gap-2 rounded border border-white/5 px-2 py-1.5"
               :style="`background: ${pair.bgColor}`">
            <div class="font-mono text-[10px] flex-1" :style="`color: ${pair.fgColor}`">
              bg-{{ pair.bg }}
            </div>
            <div class="font-mono text-[10px]" :style="`color: ${pair.fgColor}`">
              text-{{ pair.bg }}-fg
            </div>
          </div>
        </div>

        <div v-click="4" class="mt-2 rounded bg-white/[0.03] border border-white/10 px-2.5 py-1.5">
          <div class="text-[10px] text-zinc-300 leading-snug">
            <span class="text-white font-semibold">每個表面色 ↔ 一個 -foreground 文字色</span>
            — 寫 <code class="text-zinc-200 font-mono">bg-primary text-primary-foreground</code> 永遠對比正確。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const pairs = [
  { bg: 'primary',     bgColor: 'oklch(0.205 0 0)',     fgColor: 'oklch(0.985 0 0)' },
  { bg: 'secondary',   bgColor: 'oklch(0.27 0 0)',      fgColor: 'oklch(0.985 0 0)' },
  { bg: 'muted',       bgColor: 'oklch(0.32 0 0)',      fgColor: 'oklch(0.72 0 0)' },
  { bg: 'accent',      bgColor: 'oklch(0.42 0.13 264)', fgColor: 'oklch(0.98 0 0)' },
  { bg: 'destructive', bgColor: 'oklch(0.55 0.22 25)',  fgColor: 'oklch(0.98 0 0)' },
]
</script>
