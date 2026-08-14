<script setup lang="ts">
import SlideShell from "./SlideShell.vue";
import SlideHeader from "./SlideHeader.vue";
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Part 1 · 關鍵字排名基礎"
      title="TF-IDF：BM25 改良前的起點"
      subtitle="用「出現次數」與「詞的稀有度」衡量一個關鍵字對文件的重要性"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 mt-1">
      <div class="lg:col-span-7 grid grid-cols-2 gap-3 content-start">
        <div
          class="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-1.5"
        >
          <div class="text-xs font-mono text-emerald-400 font-bold">
            TF（詞頻）
          </div>
          <div
            class="p-2 rounded-lg bg-black/60 border border-white/10 font-mono text-[13px] text-emerald-300 text-center"
          >
            TF(t, d) = count(t, d)
          </div>
          <p class="text-[10.5px] text-zinc-400 leading-snug">
            詞 <code class="text-emerald-300 font-mono">t</code> 在文件
            <code class="text-emerald-300 font-mono">d</code>
            出現愈多次，通常愈相關。
          </p>
        </div>

        <div
          class="p-3 rounded-xl border border-blue-500/30 bg-blue-500/5 space-y-1.5"
        >
          <div class="text-xs font-mono text-blue-400 font-bold">
            IDF（逆文件頻率）
          </div>
          <div
            class="p-2 rounded-lg bg-black/60 border border-white/10 font-mono text-[13px] text-blue-300 text-center"
          >
            IDF(t) = log( N / df(t) )
          </div>
          <p class="text-[10.5px] text-zinc-400 leading-snug">
            詞愈罕見，IDF 愈高；「量子加密」比「系統」更有辨識力。
          </p>
        </div>

        <div
          class="col-span-2 p-3 rounded-xl border border-purple-500/30 bg-purple-500/5 flex items-center justify-between gap-3"
        >
          <div>
            <div class="text-xs font-mono text-purple-400 font-bold">
              合併後的 TF-IDF 分數
            </div>
            <div class="text-[10.5px] text-zinc-400 mt-1">
              出現得多 × 夠稀有
            </div>
          </div>
          <div
            class="px-3 py-2 rounded-lg bg-black/60 border border-white/10 font-mono text-[13px] text-purple-300 text-center shrink-0"
          >
            TF-IDF(t, d) = TF(t, d) × IDF(t)
          </div>
        </div>

        <div
          class="col-span-2 p-3 rounded-xl border border-amber-500/25 bg-amber-500/5 text-[11px] text-zinc-300 flex items-center gap-3"
        >
          <span
            class="px-2 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] shrink-0"
            >TF-IDF 的限制</span
          >
          詞重複出現時仍近似線性加分，文件篇幅影響；<strong class="text-white"
            >BM25 因此出現。</strong
          >
        </div>
      </div>

      <div
        class="lg:col-span-5 p-3 rounded-xl border border-white/10 bg-white/[0.02] space-y-2"
      >
        <div
          class="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2"
        >
          <span class="size-2 rounded-full bg-emerald-400" />
          公式參數說明
        </div>

        <div class="grid grid-cols-2 gap-1.5 text-[10.5px]">
          <div
            class="p-1.5 rounded bg-black/40 border border-white/5 flex items-start gap-2"
          >
            <span class="font-mono text-emerald-400 font-bold shrink-0">t</span>
            <span class="text-zinc-300">正在計分的詞，例如「量子加密」。</span>
          </div>
          <div
            class="p-1.5 rounded bg-black/40 border border-white/5 flex items-start gap-2"
          >
            <span class="font-mono text-emerald-400 font-bold shrink-0">d</span>
            <span class="text-zinc-300">目前比較的一份文件，例如專利。</span>
          </div>
          <div
            class="p-1.5 rounded bg-black/40 border border-white/5 flex items-start gap-2"
          >
            <span class="font-mono text-amber-400 font-bold shrink-0"
              >count</span
            >
            <span class="text-zinc-300">詞在該文件中的出現次數。</span>
          </div>
          <div
            class="p-1.5 rounded bg-black/40 border border-white/5 flex items-start gap-2"
          >
            <span class="font-mono text-blue-400 font-bold shrink-0">N</span>
            <span class="text-zinc-300">索引中所有文件的總數。</span>
          </div>
          <div
            class="p-1.5 rounded bg-black/40 border border-white/5 flex items-start gap-2"
          >
            <span class="font-mono text-blue-400 font-bold shrink-0"
              >df(t)</span
            >
            <span class="text-zinc-300"
              >包含詞
              <code class="font-mono">t</code> 的文件數，不是總詞數。</span
            >
          </div>
          <div
            class="p-1.5 rounded bg-black/40 border border-white/5 flex items-start gap-2"
          >
            <span class="font-mono text-purple-400 font-bold shrink-0"
              >log</span
            >
            <span class="text-zinc-300">壓縮差距，避免罕見詞權重過大。</span>
          </div>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
