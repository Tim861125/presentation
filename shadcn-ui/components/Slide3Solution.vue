<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <div class="h-full w-full bg-zinc-950 text-zinc-100 px-12 py-7 flex flex-col overflow-hidden">
    <SlideHeader
      eyebrow="The Solution"
      title="複製原始碼，不是裝套件"
      subtitle="這頁右下角的卡片就是真的 shadcn-vue 元件 — 它就是這個專案的程式碼。"
    />

    <div class="grid grid-cols-2 gap-4 flex-1 min-h-0">
      <div class="flex flex-col">
        <div class="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
          ✗ Traditional
        </div>
        <div class="rounded-lg border border-red-500/20 bg-red-500/[0.03] p-3 space-y-2 flex-1">
          <div class="flex items-center gap-2">
            <Badge variant="destructive">npm</Badge>
            <code class="text-xs text-zinc-300">npm i some-ui-lib</code>
          </div>
          <div class="rounded bg-black/40 p-2 font-mono text-[10px] leading-relaxed">
            <div class="text-zinc-500">app/page.tsx</div>
            <div><span class="text-purple-300">import</span> <span class="text-blue-300">&#123; Button &#125;</span> <span class="text-purple-300">from</span> <span class="text-emerald-300">'some-ui-lib'</span></div>
            <div class="text-zinc-600">// ↑ 黑盒，看不到、改不了</div>
          </div>
          <div class="text-[11px] text-zinc-400">
            🔒 鎖在 <code class="text-zinc-300">node_modules</code>，受作者 API 約束。
          </div>
        </div>
      </div>

      <div v-click class="flex flex-col">
        <div class="text-[10px] font-mono uppercase tracking-widest text-emerald-400 mb-2">
          ✓ shadcn/ui · LIVE
        </div>
        <div class="rounded-lg border border-emerald-500/30 bg-emerald-500/[0.04] p-3 flex-1 flex flex-col gap-2">
          <div class="rounded bg-black/40 p-2 font-mono text-[10px] leading-relaxed">
            <div class="text-emerald-300">components/ui/button/Button.vue</div>
            <div><span class="text-purple-300">import</span> <span class="text-blue-300">&#123; Button &#125;</span> <span class="text-purple-300">from</span> <span class="text-emerald-300">'@/components/ui/button'</span></div>
            <div class="text-zinc-600">// ↑ 你的程式碼，可以打開來改</div>
          </div>

          <!-- REAL shadcn-vue components rendered live -->
          <Card class="bg-card border-border">
            <CardHeader>
              <CardTitle class="text-sm">Live shadcn-vue</CardTitle>
              <CardDescription class="text-[11px]">
                這張 Card / Button / Badge 都是 reka-ui 驅動。
              </CardDescription>
            </CardHeader>
            <CardContent class="flex items-center gap-2 -mt-2">
              <Button size="sm">Primary</Button>
              <Button variant="secondary" size="sm">Secondary</Button>
              <Button variant="outline" size="sm">Outline</Button>
              <Badge variant="secondary">v3.0</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    <div v-click class="mt-3 rounded-lg border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-2.5">
      <div class="flex items-center gap-2.5">
        <div class="size-6 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm shrink-0">✦</div>
        <div class="text-[11px] text-zinc-300 leading-snug">
          <span class="text-white font-semibold">「Your components, your code.」</span>
          這份簡報就用了 5 個 shadcn-vue 元件 — 它們就躺在 <code class="text-emerald-300 font-mono">components/ui/</code> 等你改。
        </div>
      </div>
    </div>
  </div>
</template>
