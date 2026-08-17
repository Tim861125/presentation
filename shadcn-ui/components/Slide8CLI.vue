<template>
  <div
    class="h-full w-full bg-zinc-950 text-zinc-100 px-12 py-7 flex flex-col overflow-hidden"
  >
    <SlideHeader
      eyebrow="Tooling · CLI"
      title="一個 CLI 走天下"
      subtitle="init / add / view / search / migrate — 涵蓋元件生命週期。"
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
              ~/my-app — zsh
            </div>
          </div>
          <div
            class="p-3 font-mono text-[11px] leading-relaxed space-y-1.5 flex-1"
          >
            <div v-click>
              <span class="text-zinc-500"
                ># 初始化專案（視覺化建立 preset）</span
              ><br />
              <span class="text-emerald-400">$</span>
              <span class="text-zinc-200">bunx --bun shadcn@latest create</span>
            </div>
            <div v-click>
              <span class="text-zinc-500"># 加入元件 — 單個 / 多個 / 全部</span
              ><br />
              <span class="text-emerald-400">$</span>
              <span class="text-zinc-200"
                >bunx --bun shadcn add button card dialog</span
              >
              <div class="text-zinc-600 pl-3">
                ✓ Created components/ui/button.tsx
              </div>
              <div class="text-zinc-600 pl-3">
                ✓ Created components/ui/card.tsx
              </div>
              <div class="text-zinc-600 pl-3">
                ✓ Created components/ui/dialog.tsx
              </div>
            </div>
            <div v-click>
              <span class="text-zinc-500"># 先看原始碼再決定要不要裝</span
              ><br />
              <span class="text-emerald-400">$</span>
              <span class="text-zinc-200">bunx --bun shadcn view button</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-2 flex flex-col gap-1.5 min-h-0 overflow-hidden">
        <div
          v-for="cmd in commands"
          :key="cmd.name"
          class="rounded border border-white/10 bg-white/[0.02] px-2 py-1.5 flex items-start gap-2"
        >
          <code class="text-[10px] font-mono text-emerald-300 shrink-0 w-20">{{
            cmd.name
          }}</code>
          <div class="text-[10px] text-zinc-400 leading-snug">
            {{ cmd.desc }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const commands = [
  { name: "init", desc: "初始化 components.json + 預設 token" },
  { name: "add", desc: "加入元件到專案（核心）" },
  { name: "view", desc: "先看元件原始碼" },
  { name: "search", desc: "在 registry 中搜尋元件" },
  { name: "apply", desc: "套用 preset（主題、字型）" },
  { name: "build", desc: "從 registry.json 產出檔案" },
  { name: "docs", desc: "取得元件文件給 AI 讀" },
  { name: "migrate", desc: "RTL、Radix 套件統一" },
] as const;
</script>
