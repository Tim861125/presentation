<template>
  <div class="h-full w-full bg-zinc-950 text-zinc-100 px-12 py-7 flex flex-col overflow-hidden">
    <SlideHeader
      eyebrow="Tech Stack"
      title="底層由四層構成"
      subtitle="每一層各司其職 — 而且每一層都可替換。"
    />

    <div class="grid grid-cols-2 gap-4 flex-1 min-h-0">
      <div class="space-y-1.5">
        <div v-for="(layer, i) in stack" :key="i" v-click
             class="rounded-lg border p-2.5"
             :class="layer.bgClass">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-xs font-semibold" :class="layer.titleClass">{{ layer.title }}</div>
              <div class="text-[10px] text-zinc-400 font-mono mt-0.5">{{ layer.desc }}</div>
            </div>
            <ShadBadge variant="outline">{{ layer.tag }}</ShadBadge>
          </div>
        </div>
      </div>

      <div class="space-y-2">
        <ShadCard v-click title="Headless 基底" dot color="blue" size="md">
          <p class="text-[11px] text-zinc-300 leading-relaxed">
            <span class="text-white font-semibold">Radix UI</span>（預設）或 Base UI 處理行為、無障礙、鍵盤導覽。
          </p>
        </ShadCard>

        <ShadCard v-click title="OKLCH 色彩系統" dot color="purple" size="md">
          <p class="text-[11px] text-zinc-300 leading-relaxed mb-1.5">
            感知均勻色彩空間 — 不同亮度下視覺一致。
          </p>
          <div class="rounded bg-black/40 p-1.5 font-mono text-[10px]">
            <span class="text-zinc-500">--primary:</span>
            <span class="text-orange-300">oklch(0.205 0 0)</span><span class="text-zinc-500">;</span>
          </div>
        </ShadCard>

        <ShadCard v-click title="Tailwind v4 First" dot color="cyan" size="md">
          <p class="text-[11px] text-zinc-300 leading-relaxed">
            v4 開始為主流，原生支援 CSS Variables、@theme 設計 token。
          </p>
        </ShadCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const stack = [
  { title: 'shadcn/ui Components', desc: '你複製到專案的程式碼（components/ui/*）', tag: 'Your code',
    bgClass: 'border-emerald-500/30 bg-emerald-500/[0.05]', titleClass: 'text-emerald-300' },
  { title: 'Radix UI / Base UI', desc: 'Headless — 行為、a11y、鍵盤導覽', tag: 'Headless',
    bgClass: 'border-white/10 bg-white/[0.03]', titleClass: 'text-white' },
  { title: 'Tailwind CSS v4', desc: 'Utility-first 樣式 + @theme tokens', tag: 'Styling',
    bgClass: 'border-white/10 bg-white/[0.03]', titleClass: 'text-white' },
  { title: 'CSS Variables (OKLCH)', desc: '主題系統 — 改 token，全站同步', tag: 'Theming',
    bgClass: 'border-white/10 bg-white/[0.03]', titleClass: 'text-white' },
] as const
</script>
