<script setup lang="ts">
import SlideShell from './SlideShell.vue'
import SlideHeader from './SlideHeader.vue'
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Part 1 · BM25 演算法"
      title="k1 與 b 在公式中的位置"
      subtitle="這兩個參數都在「詞頻加分」這一段：k1 控制加分趨緩，b 控制長文件校正"
    />

    <div class="mt-1 p-3 rounded-xl border border-white/10 bg-black/50 space-y-1.5">
      <div class="flex items-center justify-between text-[11px] font-mono">
        <span class="font-bold text-zinc-200">BM25 的詞頻與文件長度校正</span>
        <span class="text-zinc-500">每個查詢詞各計算一次</span>
      </div>
      <div class="p-2.5 rounded-lg bg-zinc-900/90 border border-white/10 font-mono text-[13px] md:text-sm text-zinc-100 text-center overflow-x-auto">
        <span class="inline-flex flex-col items-center align-middle leading-snug whitespace-nowrap">
          <span class="px-2 pb-1 border-b border-zinc-500">
            <span class="text-zinc-300">tf(t, d) × </span><span class="text-amber-300">(k₁ + 1)</span>
          </span>
          <span class="px-2 pt-1">
            <span class="text-zinc-300">tf(t, d) + </span><span class="text-amber-300">k₁</span><span class="text-zinc-300"> × (1 − </span><span class="text-cyan-300">b</span><span class="text-zinc-300"> + </span><span class="text-cyan-300">b</span><span class="text-zinc-300"> × dl / avgdl)</span>
          </span>
        </span>
      </div>
      <div class="flex items-center justify-center gap-3 text-[10px] font-mono">
        <span class="text-amber-300">■ k₁：詞頻加分</span>
        <span class="text-cyan-300">■ b：文件長度校正</span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
      <div class="p-3 rounded-xl border border-amber-500/25 bg-amber-500/5 space-y-2">
        <div class="flex items-center gap-2">
          <div class="size-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono font-bold text-xs">k₁</div>
          <div>
            <div class="font-bold text-sm text-amber-300">控制重複關鍵字的加分</div>
            <div class="text-[10px] text-zinc-400">公式中出現兩次：分子與分母</div>
          </div>
        </div>
        <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-zinc-300 leading-snug">
          <span class="text-amber-300 font-mono">k₁</span> 決定詞出現更多次時，加分要多快趨緩。值越小，越快認定「已經提得夠多」；值越大，越重視多次提及。
        </div>
        <div class="text-[10px] leading-snug text-amber-200/90">
          例：第 1、2 次提到「量子加密」很有價值；到第 20 次時，額外價值應有限。
        </div>
      </div>

      <div class="p-3 rounded-xl border border-cyan-500/25 bg-cyan-500/5 space-y-2">
        <div class="flex items-center gap-2">
          <div class="size-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono font-bold text-xs">b</div>
          <div>
            <div class="font-bold text-sm text-cyan-300">控制文件長度的校正</div>
            <div class="text-[10px] text-zinc-400">位在分母內的長度校正項</div>
          </div>
        </div>
        <div class="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-zinc-300 leading-snug">
          <span class="text-cyan-300 font-mono">b</span> 決定要多重視 <code class="font-mono">dl / avgdl</code>：目前文件長度相對於索引平均長度的比例。文件較長時，分數會被適度校正。
        </div>
        <div class="text-[10px] leading-snug text-cyan-200/90">
          例：10,000 字文章比 500 字摘要更容易命中詞；校正後，短而聚焦的文件仍可公平競爭。
        </div>
      </div>
    </div>

    <div class="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
      <div class="p-2 rounded-lg border border-white/10 bg-white/[0.02]">
        <span class="font-mono text-zinc-400">tf(t, d)</span><span class="text-zinc-300">：詞 t 在文件 d 的出現次數</span>
      </div>
      <div class="p-2 rounded-lg border border-white/10 bg-white/[0.02]">
        <span class="font-mono text-zinc-400">dl</span><span class="text-zinc-300">：目前文件的長度</span>
      </div>
      <div class="p-2 rounded-lg border border-white/10 bg-white/[0.02]">
        <span class="font-mono text-zinc-400">avgdl</span><span class="text-zinc-300">：索引中所有文件的平均長度</span>
      </div>
    </div>

    <div class="mt-2 p-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-[11px] text-zinc-200 text-center">
      <span class="text-amber-300 font-mono font-bold">k₁ = 1.2</span> 管重複詞加分，
      <span class="text-cyan-300 font-mono font-bold">b = 0.75</span> 管長文校正；兩者都是 OpenSearch BM25 的常見預設值。
    </div>
  </SlideShell>
</template>
