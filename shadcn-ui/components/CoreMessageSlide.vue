<template>
  <div class="relative h-full w-full bg-zinc-950 text-zinc-100 flex flex-col justify-center px-16 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-zinc-950 to-zinc-900" />
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-emerald-500/[0.05] blur-3xl" />

    <div class="relative">
      <div class="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-4">
        // The core message
      </div>

      <h2 class="text-4xl font-bold leading-tight mb-3">
        <span class="text-zinc-500 line-through decoration-red-500/60 decoration-2">This is a component library.</span>
      </h2>

      <h2 v-click class="text-4xl font-bold leading-tight mb-6">
        This is how you build
        <span class="text-emerald-400">your</span>
        component library.
      </h2>

      <div v-click class="border-l-2 border-emerald-400 pl-4 max-w-3xl">
        <p class="text-sm text-zinc-300 leading-relaxed mb-1">
          shadcn/ui 不是一個你裝進 <span class="font-mono text-zinc-100">node_modules</span> 的套件。
        </p>
        <p class="text-sm text-zinc-300 leading-relaxed">
          它是一份<span class="text-white font-semibold"> 元件原始碼 </span>+ 一個<span class="text-white font-semibold"> CLI 散佈協定</span>。
        </p>
      </div>

      <div v-click class="mt-8 flex items-center gap-3 text-xs font-mono">
        <div class="flex items-center gap-1.5 text-zinc-500">
          <span class="text-red-400">✗</span>
          <code>npm install @shadcn/button</code>
        </div>
        <div class="text-zinc-700">→</div>
        <div class="flex items-center gap-1.5 text-emerald-300">
          <span class="text-emerald-400">✓</span>
          <code>npx shadcn add button</code>
          <span class="text-zinc-500 text-[10px]">// 把原始碼複製到專案</span>
        </div>
      </div>
    </div>
  </div>
</template>
