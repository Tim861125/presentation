<script setup lang="ts">
import SourceExample from './SourceExample.vue'
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="BREAKPOINT DEBUGGING"
      title="斷點操作與逐步除錯流程"
      subtitle="F8/F10/F11 步進控制 · 深入變數狀態與執行堆疊"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 items-center">
      <TechCard accent="purple" class="p-4">
        <div class="text-xs font-mono uppercase text-purple-400 font-bold mb-2">四種除錯步進鍵</div>
        <div class="space-y-2 text-xs text-zinc-200">
          <div class="flex items-center gap-2 p-2 rounded bg-black/40 border border-white/5">
            <span class="text-emerald-400 font-bold font-mono">F8 / ▶</span>
            <span>Continue：繼續執行直到下個斷點</span>
          </div>
          <div class="flex items-center gap-2 p-2 rounded bg-black/40 border border-white/5">
            <span class="text-blue-400 font-bold font-mono">F10 / ⏭</span>
            <span>Step Over：逐行執行，不進入函式</span>
          </div>
          <div class="flex items-center gap-2 p-2 rounded bg-black/40 border border-white/5">
            <span class="text-amber-400 font-bold font-mono">F11 / ⏬</span>
            <span>Step Into：進入函式內部深層除錯</span>
          </div>
          <div class="flex items-center gap-2 p-2 rounded bg-black/40 border border-white/5">
            <span class="text-purple-400 font-bold font-mono">Shift+F11 / ⏫</span>
            <span>Step Out：跳出當前函式回上一層</span>
          </div>
        </div>
      </TechCard>

      <div class="flex flex-col justify-center">
        <SourceExample />
      </div>
    </div>
  </SlideShell>
</template>
