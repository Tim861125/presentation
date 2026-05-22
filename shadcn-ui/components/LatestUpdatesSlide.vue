<template>
  <div class="h-full w-full bg-zinc-950 text-zinc-100 px-12 py-7 flex flex-col overflow-hidden">
    <SlideHeader
      eyebrow="What's New · 2025–2026"
      title="最新動態"
      subtitle="shadcn 不只是維護，仍持續推新 — 而且每一個都打到痛點。"
    />

    <div class="relative flex-1 min-h-0">
      <div class="absolute left-[80px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-400/40 via-white/10 to-transparent" />

      <div class="space-y-3">
        <div v-for="(item, i) in timeline" :key="i" v-click class="flex items-start gap-4">
          <div class="text-right shrink-0 w-16 pt-1">
            <div class="text-[10px] font-mono text-zinc-500">{{ item.date }}</div>
          </div>
          <div class="relative">
            <div class="size-2.5 rounded-full border-2 mt-1.5"
                 :class="i === 0 ? 'border-emerald-400 bg-emerald-400/30' : 'border-white/20 bg-zinc-900'" />
          </div>
          <div class="flex-1 rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-xs font-semibold text-white">{{ item.title }}</h3>
              <Badge v-if="item.badge" :variant="item.badgeVariant ?? 'success'">{{ item.badge }}</Badge>
            </div>
            <p class="text-[11px] text-zinc-400 leading-relaxed">{{ item.desc }}</p>
            <div v-if="item.tags" class="flex flex-wrap gap-1 mt-1.5">
              <Badge v-for="t in item.tags" :key="t" variant="outline">{{ t }}</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Badge } from '@/components/ui/badge'

const timeline = [
  {
    date: '2026 / 05',
    title: 'Monorepo 友善 + Target Aliases',
    desc: 'CLI 支援 package.json#imports，多套件專案不再需要相對路徑地獄。Registry 支援 target aliases。',
    badge: 'NEW',
    badgeVariant: 'success' as const,
    tags: ['Monorepo', 'CLI', 'Registry'],
  },
  {
    date: '2026 / 04',
    title: 'Preset Commands + Sera Style',
    desc: '新增 decode / resolve / share preset 子指令。推出 Sera Style — serif 字型風格的新主題。',
    badge: '主題',
    tags: ['Preset', 'Sera Style', 'Theming'],
  },
  {
    date: '2025',
    title: 'MCP Server + CLI v3.0',
    desc: 'AI 時代關鍵更新：MCP Server 讓 LLM 直接裝元件；CLI 重寫到 v3；Tailwind v4 相容；RTL 支援。',
    badge: '里程碑',
    badgeVariant: 'default' as const,
    tags: ['MCP', 'Tailwind v4', 'RTL', 'CLI v3'],
  },
] as const
</script>
