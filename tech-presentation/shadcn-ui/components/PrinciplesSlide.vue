<template>
  <div class="h-full w-full bg-zinc-950 text-zinc-100 px-12 py-7 flex flex-col overflow-hidden">
    <SlideHeader
      eyebrow="Philosophy"
      title="Five Core Principles"
      subtitle="shadcn/ui 背後的五個設計信仰，決定了它跟其他 library 不一樣。"
    />

    <div class="grid grid-cols-5 gap-2 flex-1 min-h-0">
      <ShadCard v-for="(p, i) in principles" :key="i" v-click :title="p.title" dot :color="p.color" size="md">
        <div class="text-[10px] font-mono text-zinc-500 mb-1">0{{ i + 1 }}</div>
        <p class="text-[11px] text-zinc-300 leading-relaxed mb-2">{{ p.desc }}</p>
        <div class="border-t border-white/5 pt-1.5">
          <div class="text-[9px] uppercase tracking-wider text-zinc-500 mb-0.5">Value</div>
          <p class="text-[10px] text-zinc-400 leading-snug">{{ p.value }}</p>
        </div>
      </ShadCard>
    </div>

    <div v-click class="mt-3 rounded-lg border border-white/10 bg-white/[0.02] p-2.5">
      <div class="flex items-start gap-2">
        <div class="text-[10px] font-mono text-zinc-500 mt-0.5">TL;DR</div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          <span class="text-white font-semibold">透明 · 可組合 · 可散佈 · 美觀 · AI 友善</span>
          — 不可能用一般 component library 達成的事。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const principles = [
  { title: 'Open Code', color: 'green', desc: '元件原始碼直接在你的專案裡，最頂層即可修改。', value: '完全透明、完全掌控。' },
  { title: 'Composition', color: 'blue', desc: '所有元件共用一致、可預測的 API 介面。', value: '易學易記，能互相組合。' },
  { title: 'Distribution', color: 'purple', desc: '透過 flat-file schema + CLI 散佈元件。', value: '跨專案、跨團隊共享容易。' },
  { title: 'Beautiful Defaults', color: 'orange', desc: '開箱即用就很美，預設值用心調過。', value: '不用設計師也能做出像樣 UI。' },
  { title: 'AI-Ready', color: 'cyan', desc: '原始碼公開，LLM 能讀、能理解、能改。', value: 'AI Coding 時代的最佳搭檔。' },
] as const
</script>
