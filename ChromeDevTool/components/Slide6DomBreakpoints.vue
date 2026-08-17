<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="BREAKPOINTS"
      title="DOM 中斷點 (DOM Breakpoints)"
      subtitle="精準追蹤動態竄改 DOM 結構的 JavaScript 來源"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 items-center">
      <div class="space-y-2.5">
        <TechCard accent="emerald" class="p-3">
          <div class="text-emerald-300 font-mono font-bold text-xs mb-0.5">subtree modifications</div>
          <p class="text-[11px] text-zinc-300">當前節點底下的任何子節點被新增、移動或刪除時暫停。</p>
        </TechCard>
        <TechCard accent="blue" class="p-3">
          <div class="text-blue-300 font-mono font-bold text-xs mb-0.5">attribute modifications</div>
          <p class="text-[11px] text-zinc-300">節點上的 class、style 或 custom attribute 變動時暫停。</p>
        </TechCard>
        <TechCard accent="rose" class="p-3">
          <div class="text-rose-300 font-mono font-bold text-xs mb-0.5">node removal</div>
          <p class="text-[11px] text-zinc-300">目標節點自身被 removeChild 或移除時暫停。</p>
        </TechCard>
      </div>

      <TechCard accent="emerald" class="p-5 flex flex-col justify-center items-center gap-4 text-center">
        <div class="text-xs font-mono text-zinc-400">右鍵點選此按鈕 → Break on → attribute modifications</div>
        <button
          class="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all shadow-lg active:scale-95 text-xs"
          onclick="this.innerText='屬性與文字已被修改!'"
        >
          點擊測試 DOM 修改
        </button>
      </TechCard>
    </div>
  </SlideShell>
</template>
