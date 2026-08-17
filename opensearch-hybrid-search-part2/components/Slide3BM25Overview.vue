<script setup lang="ts">
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Part 1 · BM25 演算法"
      title="什麼是 BM25？關鍵字排名的裁判"
      subtitle="它不只找得到關鍵字，還會判斷哪一份文件更值得排在前面"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
      <div class="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
        <div class="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <div class="size-6 rounded-lg bg-emerald-500/20 flex items-center justify-center font-mono text-xs">01</div>
          延續 TF-IDF 的核心觀念
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          BM25 保留 TF-IDF 的優點：真正命中關鍵字的文件才有機會排前面，而<strong class="text-white">較少見的技術詞</strong>更能分辨結果。
        </p>
        <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-emerald-300/90">
          「量子加密」比「系統」更有辨識力；適合產品名稱、技術名詞、專利編號與法規條文。
        </div>
      </div>

      <div class="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 space-y-3">
        <div class="flex items-center gap-2 text-blue-400 font-bold text-sm">
          <div class="size-6 rounded-lg bg-blue-500/20 flex items-center justify-center font-mono text-xs">02</div>
          第一項改良：加分不會失控
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          BM25 延續 TF-IDF「少見技術詞更重要」的概念，但改善了它的弱點：同一個詞重複很多次時，加分會逐漸趨緩，而不是一直等比例增加。
        </p>
        <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-blue-300/90">
          「量子加密」比「系統」更有辨識力；但不能只靠反覆堆疊「量子加密」就霸佔第一名。
        </div>
      </div>

      <div class="p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 space-y-3">
        <div class="flex items-center gap-2 text-purple-400 font-bold text-sm">
          <div class="size-6 rounded-lg bg-purple-500/20 flex items-center justify-center font-mono text-xs">03</div>
          不讓篇幅決定勝負
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          長篇專利自然較容易重複出現某個詞。BM25 會適度校正篇幅，避免文件只是因為長，就壓過內容更聚焦的結果。
        </p>
        <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-purple-300/90">
          同一個詞重複很多次會加分，但加分效果會愈來愈小。
        </div>
      </div>
    </div>

    <div class="mt-4 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between text-xs">
      <div class="flex items-center gap-2 text-zinc-300">
        <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">一句話</span>
        BM25 讓<strong class="text-white">罕見、明確出現、且不是靠篇幅灌水</strong>的關鍵字結果排得更前面。
      </div>
      <div class="text-zinc-500 font-mono text-[11px]">OpenSearch 預設文字排名</div>
    </div>
  </SlideShell>
</template>
