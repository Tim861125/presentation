<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ROADMAP"
      title="實際遷移標準五步驟"
      subtitle="從 unsafe-inline 零停機安全遷移至現代 CSP"
    />

    <div class="grid grid-cols-1 md:grid-cols-5 gap-3 mt-6">
      <TechCard accent="cyan" class="p-3">
        <div class="text-xs font-mono text-cyan-400 mb-1">STEP 01</div>
        <h4 class="text-xs font-bold text-white mb-1">盤點腳本</h4>
        <p class="text-[11px] text-zinc-300">grep 全專案內嵌 script 標籤與 inline 事件</p>
      </TechCard>

      <TechCard accent="sky" class="p-3">
        <div class="text-xs font-mono text-sky-400 mb-1">STEP 02</div>
        <h4 class="text-xs font-bold text-white mb-1">策略分流</h4>
        <p class="text-[11px] text-zinc-300">區分靜態可外部化、動態需 Nonce 與固定 Hash</p>
      </TechCard>

      <TechCard accent="purple" class="p-3">
        <div class="text-xs font-mono text-purple-400 mb-1">STEP 03</div>
        <h4 class="text-xs font-bold text-white mb-1">逐步重構</h4>
        <p class="text-[11px] text-zinc-300">外掛 JS、注入 Nonce 中介層並處理 GA 程式碼</p>
      </TechCard>

      <TechCard accent="amber" class="p-3">
        <div class="text-xs font-mono text-amber-400 mb-1">STEP 04</div>
        <h4 class="text-xs font-bold text-white mb-1">灰度測試</h4>
        <p class="text-[11px] text-zinc-300">使用 Report-Only 模式在 Staging 觀察 1~2 週</p>
      </TechCard>

      <TechCard accent="emerald" class="p-3">
        <div class="text-xs font-mono text-emerald-400 mb-1">STEP 05</div>
        <h4 class="text-xs font-bold text-white mb-1">正式強制</h4>
        <p class="text-[11px] text-zinc-300">正式切換為強制阻擋，移除 unsafe-inline 標誌</p>
      </TechCard>
    </div>
  </SlideShell>
</template>
