<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SHARDING MECHANISM"
      title="Hash 分片原理"
      subtitle="基於一致性 Hash 演算法決定資料節點分布"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-center">
      <div class="space-y-3 font-mono text-xs text-zinc-300">
        <div class="p-3 rounded-lg border border-cyan-500/20 bg-cyan-500/5 flex justify-between">
          <span>US10000001</span>
          <span class="text-cyan-400">➔ Hash ➔ Worker 2</span>
        </div>
        <div class="p-3 rounded-lg border border-cyan-500/20 bg-cyan-500/5 flex justify-between">
          <span>US10000002</span>
          <span class="text-cyan-400">➔ Hash ➔ Worker 1</span>
        </div>
        <div class="p-3 rounded-lg border border-cyan-500/20 bg-cyan-500/5 flex justify-between">
          <span>US10000003</span>
          <span class="text-cyan-400">➔ Hash ➔ Worker 3</span>
        </div>
      </div>

      <TechCard accent="cyan" class="p-5">
        <h3 class="text-lg font-semibold text-white mb-2">確定性路由特性</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          相同的 Distribution Key 經 Hash 運算永遠指向同一個 Worker，確保資料讀寫的可重現性與定位效率。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>
