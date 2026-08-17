<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="COMPARISON"
      title="Debounce vs Throttle 全方位對比"
      subtitle="執行時機、次數、延遲感與應用本質分析"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 items-center">
      <TechCard accent="cyan" class="p-4">
        <table class="w-full text-xs font-mono text-left">
          <thead>
            <tr class="border-b border-white/10 text-zinc-400">
              <th class="pb-2">特性</th>
              <th class="pb-2">Debounce (防抖)</th>
              <th class="pb-2">Throttle (節流)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-zinc-300">
            <tr><td class="py-2 text-white font-bold">執行時機</td><td>停止觸發後延遲執行</td><td>固定時間間隔週期執行</td></tr>
            <tr><td class="py-2 text-white font-bold">執行次數</td><td>僅執行最後一次</td><td>多次週期性觸發</td></tr>
            <tr><td class="py-2 text-white font-bold">即時響應</td><td>有延遲感 (Delay)</td><td>第一次立即執行</td></tr>
            <tr><td class="py-2 text-white font-bold">適用核心</td><td>等待使用者完成動作</td><td>持續性狀態監控</td></tr>
          </tbody>
        </table>
      </TechCard>

      <div class="space-y-3 font-mono text-xs text-zinc-300">
        <div class="p-3 rounded-lg border border-sky-500/20 bg-sky-500/5">
          <div class="text-sky-300 font-bold mb-1">Debounce 記憶訣竅</div>
          <div>Delay to the End ➔ 「抖動停止才做」</div>
        </div>
        <div class="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
          <div class="text-emerald-300 font-bold mb-1">Throttle 記憶訣竅</div>
          <div>Rate Limit ➔ 「固定節奏滴水」</div>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
