<template>
  <div class="relative h-full w-full bg-zinc-950 text-zinc-100 px-12 py-7 flex flex-col overflow-hidden">
    <div class="absolute -top-32 -right-32 size-[300px] rounded-full bg-emerald-500/10 blur-3xl" />
    <div class="absolute -bottom-32 -left-32 size-[300px] rounded-full bg-blue-500/10 blur-3xl" />

    <div class="relative flex flex-col flex-1 min-h-0">
      <SlideHeader
        eyebrow="Wrap up"
        title="Key Takeaways"
        subtitle="如果今天只能記三件事..."
      />

      <div class="grid grid-cols-3 gap-2.5 mb-4">
        <Card v-click class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
          <CardHeader class="px-3 gap-0.5">
            <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
              <span class="size-1.5 rounded-full bg-emerald-400" />
              1 · Own your components
            </CardTitle>
          </CardHeader>
          <CardContent class="px-3">
            <p class="text-[11px] text-zinc-300 leading-relaxed">
              元件 = 你的程式碼。沒有 vendor lock-in。
            </p>
          </CardContent>
        </Card>
        <Card v-click class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
          <CardHeader class="px-3 gap-0.5">
            <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
              <span class="size-1.5 rounded-full bg-blue-400" />
              2 · Tokens > Components
            </CardTitle>
          </CardHeader>
          <CardContent class="px-3">
            <p class="text-[11px] text-zinc-300 leading-relaxed">
              CSS Variables 是真正的 design system 載體。
            </p>
          </CardContent>
        </Card>
        <Card v-click class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
          <CardHeader class="px-3 gap-0.5">
            <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
              <span class="size-1.5 rounded-full bg-purple-400" />
              3 · Registry > NPM
            </CardTitle>
          </CardHeader>
          <CardContent class="px-3">
            <p class="text-[11px] text-zinc-300 leading-relaxed">
              被低估的散佈協定 — 公司設計系統的最佳載體。
            </p>
          </CardContent>
        </Card>
      </div>

      <div v-click class="flex-1 min-h-0">
        <div class="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
          // Resources
        </div>
        <div class="grid grid-cols-2 gap-1.5">
          <div v-for="link in links" :key="link.url"
               class="flex items-center justify-between rounded border border-white/10 bg-white/[0.02] px-2.5 py-1">
            <div class="flex items-center gap-1.5">
              <span class="text-emerald-400 text-[10px]">↗</span>
              <span class="text-[11px] text-zinc-200">{{ link.title }}</span>
            </div>
            <code class="text-[9px] font-mono text-zinc-500">{{ link.url }}</code>
          </div>
        </div>
      </div>

      <div v-click class="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5">
        <div class="text-[10px] text-zinc-500 font-mono">
          // shadcn/ui — The Foundation for your Design System
        </div>
        <div class="text-lg font-bold tracking-tight">
          <span class="text-zinc-600">Thank you.</span>
          <span class="text-emerald-400 ml-2">Q &amp; A ✦</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const links = [
  { title: '官網',         url: 'ui.shadcn.com' },
  { title: '元件總覽',     url: 'ui.shadcn.com/docs/components' },
  { title: 'Blocks',       url: 'ui.shadcn.com/blocks' },
  { title: 'Themes',       url: 'ui.shadcn.com/themes' },
  { title: 'Registry 文件', url: 'ui.shadcn.com/docs/registry' },
  { title: 'MCP 文件',     url: 'ui.shadcn.com/docs/mcp' },
  { title: 'GitHub',       url: 'github.com/shadcn-ui/ui' },
  { title: '作者 @shadcn', url: 'x.com/shadcn' },
]
</script>
