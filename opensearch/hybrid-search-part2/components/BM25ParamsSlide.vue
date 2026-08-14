<script setup lang="ts">
import SlideShell from "./SlideShell.vue";
import SlideHeader from "./SlideHeader.vue";
import JsonCard from "./JsonCard.vue";

const mappingConfig = `{
  "settings": {
    "index.similarity.custom_patent_bm25": {
      "type": "BM25", "k1": 1.2, "b": 0.75
    }
  }
}`;
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Part 1 · BM25 演算法"
      title="只要記住兩個參數"
      subtitle="預設值通常已足夠；需要時，再依資料特性調整關鍵字重複與長文件的影響力"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 mt-1">
      <div class="lg:col-span-7 space-y-2">
        <div
          class="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-2"
        >
          <div class="flex items-center gap-2">
            <div
              class="size-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-xs"
            >
              k1
            </div>
            <div>
              <div class="text-amber-400 font-bold text-xs">
                重複關鍵字的加分力度
              </div>
              <div class="text-[10px] text-zinc-400">
                同一個詞出現更多次時，額外加分有多明顯
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-2 text-[10px] leading-snug">
            <div class="p-2 rounded bg-black/40 border border-white/5">
              <span class="text-zinc-300 font-bold">低</span>
              <p class="mt-0.5 text-zinc-400">只在意是否命中。</p>
            </div>
            <div class="p-2 rounded bg-amber-500/10 border border-amber-500/20">
              <span class="text-amber-300 font-bold">1.2 · 預設</span>
              <p class="mt-0.5 text-zinc-300">加分但不鼓勵堆字。</p>
            </div>
            <div class="p-2 rounded bg-black/40 border border-white/5">
              <span class="text-zinc-300 font-bold">高</span>
              <p class="mt-0.5 text-zinc-400">更重視多次提及。</p>
            </div>
          </div>
        </div>

        <div
          class="p-3 rounded-xl border border-cyan-500/20 bg-cyan-500/5 space-y-2"
        >
          <div class="flex items-center gap-2">
            <div
              class="size-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs"
            >
              b
            </div>
            <div>
              <div class="text-cyan-400 font-bold text-xs">
                長文件的校正力度
              </div>
              <div class="text-[10px] text-zinc-400">
                文件篇幅是否應影響關鍵字命中的可信度
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-2 text-[10px] leading-snug">
            <div class="p-2 rounded bg-black/40 border border-white/5">
              <span class="text-zinc-300 font-bold">低</span>
              <p class="mt-0.5 text-zinc-400">長文較容易占優勢。</p>
            </div>
            <div class="p-2 rounded bg-cyan-500/10 border border-cyan-500/20">
              <span class="text-cyan-300 font-bold">0.75 · 預設</span>
              <p class="mt-0.5 text-zinc-300">平衡長文與短文。</p>
            </div>
            <div class="p-2 rounded bg-black/40 border border-white/5">
              <span class="text-zinc-300 font-bold">高</span>
              <p class="mt-0.5 text-zinc-400">短而聚焦的文件較有利。</p>
            </div>
          </div>
        </div>

        <div
          class="p-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-[11px] text-zinc-300"
        >
          <span class="text-emerald-400 font-bold">實務起手式：</span>
          先用 <code class="text-amber-300 font-mono">k1: 1.2</code>、<code
            class="text-cyan-300 font-mono"
            >b: 0.75</code
          >，再依實際搜尋評測微調。
        </div>
      </div>

      <div class="lg:col-span-5 space-y-1.5">
        <div
          class="text-[11px] font-mono font-bold text-white flex items-center justify-between"
        >
          <span>OpenSearch Similarity 設定</span>
          <span class="text-emerald-400 text-[10px]">custom_bm25</span>
        </div>
        <JsonCard method="PUT" path="/patent" :code="mappingConfig" />
      </div>
    </div>
  </SlideShell>
</template>
