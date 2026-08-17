<script setup lang="ts">
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Part 1 · BM25 演算法"
      title="BM25 如何判斷哪份文件更相關？"
      subtitle="把它想成一位依序檢查三件事的關鍵字裁判"
    />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
      <div class="relative p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-4">
        <div class="flex items-center gap-3">
          <div class="size-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold">1</div>
          <div>
            <div class="font-bold text-emerald-400">這個詞稀不稀有？</div>
            <div class="text-[11px] text-zinc-500">少見的詞更能區分結果</div>
          </div>
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          「系統」、「方法」幾乎每份專利都有，參考價值低；「量子加密」只出現在少數專利，命中時更值得被重視。
        </p>
        <div class="p-3 rounded-lg bg-black/40 border border-white/5 text-[11px] text-emerald-300">
          罕見技術詞 → 排名影響較大
        </div>
      </div>

      <div class="relative p-5 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-4">
        <div class="flex items-center gap-3">
          <div class="size-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold">2</div>
          <div>
            <div class="font-bold text-amber-400">提到幾次？</div>
            <div class="text-[11px] text-zinc-500">重複提及會加分，但不會無限加分</div>
          </div>
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          一份專利在摘要、請求項與說明中都提到「智慧辦公室」，通常比只提到一次更相關；但重複堆疊同一個詞不會一直取得等比例優勢。
        </p>
        <div class="p-3 rounded-lg bg-black/40 border border-white/5 text-[11px] text-amber-300">
          多次提及 → 加分逐漸趨緩
        </div>
      </div>

      <div class="relative p-5 rounded-xl border border-cyan-500/30 bg-cyan-500/5 space-y-4">
        <div class="flex items-center gap-3">
          <div class="size-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold">3</div>
          <div>
            <div class="font-bold text-cyan-400">文件是不是特別長？</div>
            <div class="text-[11px] text-zinc-500">避免長文只因篇幅而占便宜</div>
          </div>
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          長篇專利有更多字，也更容易剛好命中關鍵字。BM25 會把篇幅納入考量，讓內容聚焦的短文件仍有公平的競爭機會。
        </p>
        <div class="p-3 rounded-lg bg-black/40 border border-white/5 text-[11px] text-cyan-300">
          文件較長 → 適度校正分數
        </div>
      </div>
    </div>

    <div class="mt-5 p-4 rounded-xl border border-white/10 bg-white/[0.02] flex items-center gap-3">
      <span class="px-2 py-1 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px]">排名結果</span>
      <p class="text-sm text-zinc-200">
        <strong class="text-white">最有辨識度、最聚焦回答查詢、又不是靠文件長度取勝</strong>的文件，會得到較好的排名。
      </p>
    </div>
  </SlideShell>
</template>
