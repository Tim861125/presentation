<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
</script>

<template>
  <div class="h-full w-full bg-zinc-950 text-zinc-100 px-12 py-7 flex flex-col overflow-hidden">
    <SlideHeader
      eyebrow="Blocks"
      title="不只元件，還有整塊組好的 UI"
      subtitle="Login、Dashboard、Sidebar — 一個指令就生出完整頁面。"
    />

    <div class="grid grid-cols-4 gap-2.5 flex-1 min-h-0">
      <Card v-click class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
        <CardHeader class="px-3 gap-0.5">
          <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
            <span class="size-1.5 rounded-full bg-blue-400" />
            Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent class="px-3">
          <div class="aspect-[4/3] rounded bg-black/40 p-1.5 border border-white/5">
            <div class="flex gap-1 h-full">
              <div class="w-1/4 space-y-1">
                <div class="h-1.5 rounded bg-white/20" />
                <div class="h-1 rounded bg-white/10" />
                <div class="h-1 rounded bg-emerald-400/40" />
                <div class="h-1 rounded bg-white/10" />
              </div>
              <div class="flex-1 space-y-1">
                <div class="grid grid-cols-3 gap-0.5">
                  <div class="aspect-square rounded bg-white/10" />
                  <div class="aspect-square rounded bg-white/10" />
                  <div class="aspect-square rounded bg-white/10" />
                </div>
                <div class="h-4 rounded bg-gradient-to-r from-emerald-500/20 to-blue-500/20" />
                <div class="h-2 rounded bg-white/5" />
              </div>
            </div>
          </div>
          <p class="text-[10px] text-zinc-400 mt-1.5 leading-snug">含 sidebar、charts、data table。</p>
        </CardContent>
      </Card>

      <Card v-click class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
        <CardHeader class="px-3 gap-0.5">
          <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
            <span class="size-1.5 rounded-full bg-purple-400" />
            Sidebar
          </CardTitle>
        </CardHeader>
        <CardContent class="px-3">
          <div class="aspect-[4/3] rounded bg-black/40 p-1.5 border border-white/5">
            <div class="flex h-full gap-1">
              <div class="w-1/3 space-y-1 border-r border-white/10 pr-1">
                <div class="h-1.5 rounded bg-emerald-400/40" />
                <div class="h-1 rounded bg-white/15" />
                <div class="h-1 rounded bg-white/15" />
                <div class="ml-1 h-1 rounded bg-white/10" />
                <div class="h-1 rounded bg-white/15" />
              </div>
              <div class="flex-1 bg-white/[0.02] rounded" />
            </div>
          </div>
          <p class="text-[10px] text-zinc-400 mt-1.5 leading-snug">可收合 icon 模式、子選單。</p>
        </CardContent>
      </Card>

      <Card v-click class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
        <CardHeader class="px-3 gap-0.5">
          <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
            <span class="size-1.5 rounded-full bg-emerald-400" />
            Login
          </CardTitle>
        </CardHeader>
        <CardContent class="px-3">
          <div class="aspect-[4/3] rounded bg-black/40 border border-white/5 flex items-center justify-center p-2">
            <div class="w-full space-y-1">
              <div class="h-1.5 rounded bg-white/30 w-1/2 mx-auto" />
              <div class="h-2 rounded bg-white/10 mt-1" />
              <div class="h-2 rounded bg-white/10" />
              <div class="h-2 rounded bg-emerald-400/40 mt-1" />
            </div>
          </div>
          <p class="text-[10px] text-zinc-400 mt-1.5 leading-snug">純色、背景圖、社群登入。</p>
        </CardContent>
      </Card>

      <Card v-click class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
        <CardHeader class="px-3 gap-0.5">
          <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
            <span class="size-1.5 rounded-full bg-orange-400" />
            Calendar
          </CardTitle>
        </CardHeader>
        <CardContent class="px-3">
          <div class="aspect-[4/3] rounded bg-black/40 p-1.5 border border-white/5">
            <div class="grid grid-cols-7 gap-0.5 h-full">
              <div v-for="i in 21" :key="i"
                   class="rounded-sm"
                   :class="i === 11 ? 'bg-emerald-400/60' : i % 3 === 0 ? 'bg-white/10' : 'bg-white/5'" />
            </div>
          </div>
          <p class="text-[10px] text-zinc-400 mt-1.5 leading-snug">日期區間選取、排程。</p>
        </CardContent>
      </Card>
    </div>

    <div v-click class="mt-3 grid grid-cols-3 gap-2">
      <div class="rounded border border-white/10 bg-white/[0.02] px-2.5 py-1.5">
        <div class="text-[9px] font-mono uppercase text-zinc-500">Step 1</div>
        <div class="text-[11px] text-zinc-200">挑一個 block</div>
      </div>
      <div class="rounded border border-white/10 bg-white/[0.02] px-2.5 py-1.5">
        <div class="text-[9px] font-mono uppercase text-zinc-500">Step 2</div>
        <code class="text-[11px] text-emerald-300">shadcn add login-01</code>
      </div>
      <div class="rounded border border-emerald-500/30 bg-emerald-500/[0.05] px-2.5 py-1.5">
        <div class="text-[9px] font-mono uppercase text-emerald-400">Step 3</div>
        <div class="text-[11px] text-white">頁面就生出來了 ✨</div>
      </div>
    </div>
  </div>
</template>
