<template>
  <div class="relative h-full w-full overflow-hidden bg-zinc-950 text-zinc-100">
    <div class="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
    <div class="absolute inset-0 opacity-[0.04]"
         style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 40px 40px;" />
    <div class="absolute -top-32 -right-32 size-[400px] rounded-full bg-emerald-500/10 blur-3xl" />
    <div class="absolute -bottom-32 -left-32 size-[400px] rounded-full bg-blue-500/10 blur-3xl" />

    <div class="relative h-full flex flex-col justify-center px-16">
      <div class="flex items-center gap-2 mb-4">
        <div class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <span class="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span class="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
            RD 技術分享 · 2026
          </span>
        </div>
        <ShadBadge variant="outline">MIT · 114k★</ShadBadge>
      </div>

      <div class="flex items-baseline gap-3 mb-2">
        <h1 class="text-6xl font-bold tracking-tight">
          <span class="text-white">shadcn</span><span class="text-zinc-600">/</span><span class="text-white">ui</span>
        </h1>
        <span class="text-xl text-zinc-500 font-mono">v3</span>
      </div>

      <div class="text-xl font-light text-zinc-300 mb-6 max-w-3xl leading-snug">
        The Foundation for your
        <span class="text-emerald-400 font-semibold">Design System</span>
      </div>

      <div class="flex flex-wrap gap-2 mb-8">
        <ShadBadge variant="secondary">Open Source</ShadBadge>
        <ShadBadge variant="secondary">Open Code</ShadBadge>
        <ShadBadge variant="secondary">Radix UI</ShadBadge>
        <ShadBadge variant="secondary">Tailwind v4</ShadBadge>
        <ShadBadge variant="secondary">AI-Ready</ShadBadge>
      </div>

      <div class="flex items-center gap-6 text-[10px] text-zinc-500 font-mono">
        <div class="flex items-center gap-2">
          <div class="size-1 rounded-full bg-zinc-500" />
          ui.shadcn.com
        </div>
        <div class="flex items-center gap-2">
          <div class="size-1 rounded-full bg-zinc-500" />
          github.com/shadcn-ui/ui
        </div>
      </div>
    </div>
  </div>
</template>
