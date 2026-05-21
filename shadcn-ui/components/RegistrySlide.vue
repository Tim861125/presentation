<template>
  <div class="h-full w-full bg-zinc-950 text-zinc-100 px-12 py-7 flex flex-col overflow-hidden">
    <SlideHeader
      eyebrow="Registry · 最被低估的功能"
      title="打造你自己的元件散佈協定"
      subtitle="不發 npm、不開 monorepo，照樣讓全公司共用元件。"
    />

    <div v-click class="mb-3">
      <div class="flex items-center justify-between gap-2">
        <div class="flex-1 rounded border border-white/10 bg-white/[0.03] px-2.5 py-2 text-center">
          <div class="text-[9px] font-mono uppercase text-zinc-500">1 · Define</div>
          <code class="text-[11px] font-mono text-emerald-300">registry.json</code>
        </div>
        <div class="text-zinc-600 text-sm">→</div>
        <div class="flex-1 rounded border border-white/10 bg-white/[0.03] px-2.5 py-2 text-center">
          <div class="text-[9px] font-mono uppercase text-zinc-500">2 · Build</div>
          <code class="text-[11px] font-mono text-emerald-300">shadcn build</code>
        </div>
        <div class="text-zinc-600 text-sm">→</div>
        <div class="flex-1 rounded border border-white/10 bg-white/[0.03] px-2.5 py-2 text-center">
          <div class="text-[9px] font-mono uppercase text-zinc-500">3 · Host</div>
          <code class="text-[11px] font-mono text-emerald-300">CDN / S3</code>
        </div>
        <div class="text-zinc-600 text-sm">→</div>
        <div class="flex-1 rounded border border-emerald-500/30 bg-emerald-500/[0.05] px-2.5 py-2 text-center">
          <div class="text-[9px] font-mono uppercase text-emerald-400">4 · Add</div>
          <code class="text-[11px] font-mono text-white">shadcn add</code>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-2.5 flex-1 min-h-0">
      <ShadCard v-click title="公司內部設計系統" dot color="blue" size="md">
        <p class="text-[11px] text-zinc-300 leading-relaxed mb-1.5">
          把品牌按鈕、表單元件做成 registry。
        </p>
        <code class="block text-[10px] font-mono bg-black/40 rounded p-1.5 text-emerald-300">
          shadcn add @my-co/button
        </code>
        <p class="text-[10px] text-zinc-500 mt-1.5">新專案啟動 = 一行指令</p>
      </ShadCard>

      <ShadCard v-click title="私有元件 + Auth" dot color="purple" size="md">
        <p class="text-[11px] text-zinc-300 leading-relaxed mb-1.5">
          透過環境變數做認證，限定團隊使用。
        </p>
        <code class="block text-[10px] font-mono bg-black/40 rounded p-1.5 text-zinc-300">
          REGISTRY_TOKEN=xxx
        </code>
        <p class="text-[10px] text-zinc-500 mt-1.5">不用發 private npm package</p>
      </ShadCard>

      <ShadCard v-click title="跨框架重用" dot color="green" size="md">
        <p class="text-[11px] text-zinc-300 leading-relaxed mb-1.5">
          Registry 不限 React — 任何框架都能建。
        </p>
        <div class="flex flex-wrap gap-1">
          <ShadBadge variant="outline">React</ShadBadge>
          <ShadBadge variant="outline">Vue</ShadBadge>
          <ShadBadge variant="outline">Svelte</ShadBadge>
        </div>
        <p class="text-[10px] text-zinc-500 mt-1.5">CLI 只負責「複製檔案」</p>
      </ShadCard>
    </div>

    <div v-click class="mt-3 rounded border border-white/10 bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-3 py-2">
      <div class="text-xs text-white">
        <span class="font-semibold">「程式碼散佈協定」</span> — 比 npm 還輕、比 monorepo 還簡單、比 git submodule 還好用。
      </div>
    </div>
  </div>
</template>
