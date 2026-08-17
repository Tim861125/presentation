<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ALTERNATIVES"
      title="解決方案總覽：三種安全替代方案"
      subtitle="Script Hash、Nonce 與外部 Script 之安全性與適用情境"
    />

    <div class="mt-6">
      <TechCard accent="cyan" class="p-4">
        <table class="w-full text-xs font-mono text-left">
          <thead>
            <tr class="border-b border-white/10 text-zinc-400">
              <th class="pb-2">方法</th>
              <th class="pb-2">安全性</th>
              <th class="pb-2">維護難度</th>
              <th class="pb-2">適用情況</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-zinc-300">
            <tr>
              <td class="py-2.5 font-bold text-white">Script Hash</td>
              <td class="text-cyan-400 font-bold">高</td>
              <td>中 (內容變更需重算)</td>
              <td>少量完全固定的 inline script</td>
            </tr>
            <tr>
              <td class="py-2.5 font-bold text-white">Nonce (推薦)</td>
              <td class="text-emerald-400 font-bold">最高</td>
              <td>低 (伺服器動態生成)</td>
              <td>動態頁面 / 多個 inline 腳本</td>
            </tr>
            <tr>
              <td class="py-2.5 font-bold text-white">外部 Script</td>
              <td class="text-emerald-400 font-bold">高</td>
              <td>最低 (最佳實踐)</td>
              <td>可全部外掛文件化的 JavaScript</td>
            </tr>
          </tbody>
        </table>
      </TechCard>
    </div>
  </SlideShell>
</template>
