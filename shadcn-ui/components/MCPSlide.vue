<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <div class="h-full w-full bg-zinc-950 text-zinc-100 px-12 py-7 flex flex-col overflow-hidden">
    <SlideHeader
      eyebrow="AI · MCP Server"
      title="讓 AI 直接幫你裝元件"
      subtitle="自然語言 → AI 搜尋 registry → 直接寫到專案裡。"
    />

    <div class="grid grid-cols-5 gap-3 flex-1 min-h-0">
      <div class="col-span-3 rounded-lg border border-white/10 bg-black/40 overflow-hidden flex flex-col">
        <div class="px-2.5 py-1.5 border-b border-white/10 bg-white/[0.02] flex items-center gap-2">
          <div class="size-1.5 rounded-full bg-emerald-400" />
          <div class="text-[10px] font-mono text-zinc-400">Claude Code</div>
          <Badge variant="outline">MCP connected</Badge>
        </div>
        <div class="p-3 space-y-2 flex-1">
          <div v-click class="flex gap-2">
            <div class="size-5 rounded-full bg-blue-500/30 flex items-center justify-center text-[9px] text-blue-300 shrink-0">U</div>
            <div class="text-[11px] text-zinc-200 leading-relaxed">
              幫我加一個帶 <span class="text-emerald-300">OTP 驗證</span>的登入表單，再加一個帶<span class="text-emerald-300">圖表的 dashboard</span>。
            </div>
          </div>

          <div v-click class="flex gap-2">
            <div class="size-5 rounded-full bg-emerald-500/30 flex items-center justify-center text-[9px] text-emerald-300 shrink-0">AI</div>
            <div class="text-[10px] text-zinc-300 leading-relaxed space-y-1">
              <div>🔍 在 registry 搜尋元件...</div>
              <div class="font-mono text-zinc-400">
                ✓ Found: <span class="text-emerald-300">input-otp</span>, <span class="text-emerald-300">login-04</span>, <span class="text-emerald-300">dashboard-01</span>
              </div>
              <div>📦 安裝中...</div>
              <div class="font-mono text-zinc-500 pl-2">
                $ pnpm dlx shadcn add input-otp login-04 dashboard-01<br/>
                ✓ Created 12 files
              </div>
              <div class="text-emerald-300">✦ 都裝好了，可以開 dev server 看了。</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-2 flex flex-col gap-2 min-h-0">
        <Card v-click class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
          <CardHeader class="px-3 gap-0.5">
            <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
              <span class="size-1.5 rounded-full bg-blue-400" />
              一鍵設定
            </CardTitle>
          </CardHeader>
          <CardContent class="px-3">
            <code class="block text-[10px] font-mono bg-black/40 rounded p-1.5 text-emerald-300 leading-relaxed">
              pnpm dlx shadcn@latest<br/>
              &nbsp;&nbsp;mcp init --client claude
            </code>
          </CardContent>
        </Card>

        <Card v-click class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
          <CardHeader class="px-3 gap-0.5">
            <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
              <span class="size-1.5 rounded-full bg-purple-400" />
              支援的 client
            </CardTitle>
          </CardHeader>
          <CardContent class="px-3">
            <div class="space-y-1 text-[10px]">
              <div class="flex justify-between font-mono">
                <span class="text-zinc-300">Claude Code</span>
                <span class="text-zinc-500">.mcp.json</span>
              </div>
              <div class="flex justify-between font-mono">
                <span class="text-zinc-300">Cursor</span>
                <span class="text-zinc-500">.cursor/mcp.json</span>
              </div>
              <div class="flex justify-between font-mono">
                <span class="text-zinc-300">VS Code</span>
                <span class="text-zinc-500">.vscode/mcp.json</span>
              </div>
              <div class="flex justify-between font-mono">
                <span class="text-zinc-300">Codex</span>
                <span class="text-zinc-500">~/.codex/config.toml</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card v-click class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
          <CardHeader class="px-3 gap-0.5">
            <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
              <span class="size-1.5 rounded-full bg-emerald-400" />
              多 registry 串接
            </CardTitle>
          </CardHeader>
          <CardContent class="px-3">
            <p class="text-[10px] text-zinc-300 leading-relaxed">
              一次接 <span class="text-white">官方</span> + <span class="text-white">公司私有</span> registry。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
