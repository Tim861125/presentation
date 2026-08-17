<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="EVALUATION"
      title="方案完整維度比較"
      subtitle="安全性、複雜度、維護成本與適用場景全景對比"
    />

    <div class="mt-6">
      <TechCard accent="cyan" class="p-4">
        <table class="w-full text-xs font-mono text-left">
          <thead>
            <tr class="border-b border-white/10 text-zinc-400">
              <th class="pb-2">評估項目</th>
              <th class="pb-2">Script Hash</th>
              <th class="pb-2">Nonce</th>
              <th class="pb-2">外部 Script</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-zinc-300">
            <tr><td class="py-2 text-white font-bold">安全性</td><td class="text-cyan-300">高</td><td class="text-emerald-400 font-bold">最高</td><td class="text-cyan-300">高</td></tr>
            <tr><td class="py-2 text-white font-bold">實作複雜度</td><td>低</td><td>中</td><td>低</td></tr>
            <tr><td class="py-2 text-white font-bold">維護成本</td><td class="text-rose-400">高 (常需重算)</td><td class="text-emerald-400 font-bold">低</td><td class="text-emerald-400 font-bold">最低</td></tr>
            <tr><td class="py-2 text-white font-bold">動態內容</td><td class="text-rose-400">不支援</td><td class="text-emerald-400 font-bold">支援</td><td>需透過 DOM/API</td></tr>
            <tr><td class="py-2 text-white font-bold">快取效能</td><td>一般</td><td>一般</td><td class="text-emerald-400 font-bold">最佳</td></tr>
          </tbody>
        </table>
      </TechCard>
    </div>
  </SlideShell>
</template>
