<template>
  <div
    class="h-full w-full bg-zinc-950 text-zinc-100 px-12 py-7 flex flex-col overflow-hidden"
  >
    <SlideHeader
      eyebrow="Getting Started · Installation"
      title="在專案中安裝 shadcn/ui"
      subtitle="三個步驟，把元件原始碼接進你的專案。"
    />

    <div class="grid grid-cols-5 gap-3 flex-1 min-h-0">
      <div class="col-span-3">
        <div
          class="rounded-lg border border-white/10 bg-black/60 overflow-hidden h-full flex flex-col"
        >
          <div
            class="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-white/10 bg-white/[0.02]"
          >
            <div class="size-2 rounded-full bg-red-500/70" />
            <div class="size-2 rounded-full bg-yellow-500/70" />
            <div class="size-2 rounded-full bg-green-500/70" />
            <div class="text-[10px] font-mono text-zinc-500 ml-1.5">
              ~/projects — zsh
            </div>
          </div>

          <div
            class="p-3 font-mono text-[11px] leading-relaxed space-y-2 flex-1"
          >
            <div v-click>
              <span class="text-zinc-500"
                ># 1. 建立新專案（或進入既有專案）</span
              ><br />
              <span class="text-emerald-400">$</span>
              <span class="text-zinc-200"
                >bun create vite my-app --template react-ts</span
              ><br />
              <span class="text-emerald-400">$</span>
              <span class="text-zinc-200">cd my-app && bun install</span>
            </div>

            <div v-click>
              <span class="text-zinc-500"
                ># 2. 初始化 shadcn（互動式選擇 style / baseColor / CSS 變數）</span
              ><br />
              <span class="text-emerald-400">$</span>
              <span class="text-zinc-200">bunx --bun shadcn@latest init</span>
              <div class="text-zinc-600 pl-3">✓ 設定 tailwind.config & globals.css</div>
              <div class="text-zinc-600 pl-3">✓ 建立 components.json</div>
              <div class="text-zinc-600 pl-3">✓ 建立 lib/utils.ts（cn helper）</div>
            </div>

            <div v-click>
              <span class="text-zinc-500"
                ># 3. 加入元件（原始碼直接複製到專案）</span
              ><br />
              <span class="text-emerald-400">$</span>
              <span class="text-zinc-200"
                >bunx --bun shadcn@latest add button card dialog</span
              >
              <div class="text-zinc-600 pl-3">✓ Created components/ui/button.tsx</div>
              <div class="text-zinc-600 pl-3">✓ Created components/ui/card.tsx</div>
              <div class="text-zinc-600 pl-3">✓ Created components/ui/dialog.tsx</div>
            </div>

            <div v-click>
              <span class="text-zinc-500"># 4. 直接 import 來用</span><br />
              <span class="text-zinc-400">import &#123; Button &#125; from</span>
              <span class="text-emerald-300">'@/components/ui/button'</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-2 flex flex-col gap-2 min-h-0 overflow-hidden">
        <div
          v-for="(step, i) in steps"
          :key="step.title"
          v-click
          class="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
        >
          <div class="flex items-center gap-2 mb-1">
            <span
              class="text-[10px] font-mono text-emerald-400 shrink-0"
            >0{{ i + 1 }}</span>
            <div class="text-[11px] font-semibold text-zinc-100">
              {{ step.title }}
            </div>
          </div>
          <p class="text-[10px] text-zinc-400 leading-snug">
            {{ step.desc }}
          </p>
        </div>

        <div
          v-click
          class="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.05] px-3 py-2 mt-auto"
        >
          <div class="text-[10px] font-mono uppercase tracking-wider text-emerald-400 mb-0.5">
            Tip
          </div>
          <p class="text-[10px] text-zinc-300 leading-snug">
            支援 Next.js · Vite · Remix · Astro · Laravel · TanStack Start 等框架；
            CLI 會自動偵測並套用對應設定。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const steps = [
  {
    title: "建立 / 進入專案",
    desc: "任何支援 Tailwind 的 React 框架都可以；範例使用 Vite + TS。",
  },
  {
    title: "bunx shadcn init",
    desc: "建立 components.json、寫入 Tailwind 設定與 CSS 變數，並產生 cn() helper。",
  },
  {
    title: "bunx shadcn add <component>",
    desc: "把元件原始碼複製到 components/ui/，之後你直接擁有、可任意修改。",
  },
] as const;
</script>
