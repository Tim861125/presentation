<script setup lang="ts">
</script>

<template>
  <SlideShell :center="true" px="px-16">
    <div class="flex flex-col justify-center">
      <div class="flex items-center gap-2 mb-6">
        <div class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <span class="size-1.5 rounded-full bg-teal-400 animate-pulse" />
          <span class="text-[10px] font-mono uppercase tracking-widest text-zinc-400">內部 Demo · PatentPilot</span>
        </div>
      </div>
      <h1 class="text-5xl font-bold tracking-tight mb-3">
        <span class="text-white">FTO × AI · </span>
        <span class="text-teal-400">產品專利比對</span>
      </h1>
      <p class="text-lg font-light text-zinc-300 mb-6 max-w-3xl leading-snug">
        讓使用者在投產之前，先用 AI 自動檢查「我的產品會不會踩到這篇專利」
      </p>
      <div class="flex items-center gap-6 text-[10px] text-zinc-500 font-mono">
        <div class="flex items-center gap-2">
          <div class="size-1 rounded-full bg-teal-400" />
          <span>FTO · AI · PatentPilot · IP Strategy · Infringement Risk</span>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
