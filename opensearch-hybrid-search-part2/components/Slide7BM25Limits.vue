<script setup lang="ts">
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Part 1 · BM25 演算法"
      title="BM25 很會找字，但不懂字的意思"
      subtitle="它改善了早期關鍵字排名的公平性，卻仍需要向量搜尋補足語意理解"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-2">
      <div class="lg:col-span-6 space-y-3">
        <div class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
          為何 BM25 取代傳統 TF-IDF？
        </div>
        <div class="rounded-xl border border-white/10 overflow-hidden bg-black/40 text-xs">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-white/10 bg-white/[0.04] text-zinc-300 font-mono">
                <th class="p-2.5">比較問題</th>
                <th class="p-2.5 text-zinc-400">TF-IDF（舊方式）</th>
                <th class="p-2.5 text-emerald-400">BM25（現代預設）</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5 text-zinc-300">
              <tr>
                <td class="p-2.5 font-medium text-white">同一詞重複出現</td>
                <td class="p-2.5 text-rose-400/90">出現愈多，加分愈多</td>
                <td class="p-2.5 text-emerald-300">會加分，但效果逐漸變小</td>
              </tr>
              <tr>
                <td class="p-2.5 font-medium text-white">文件很長</td>
                <td class="p-2.5 text-rose-400/90">較容易因詞多而占優勢</td>
                <td class="p-2.5 text-emerald-300">會適度校正篇幅差異</td>
              </tr>
              <tr>
                <td class="p-2.5 font-medium text-white">調整排名行為</td>
                <td class="p-2.5 text-zinc-400">彈性有限</td>
                <td class="p-2.5 text-emerald-300">可調整重複與篇幅的影響</td>
              </tr>
              <tr>
                <td class="p-2.5 font-medium text-white">目前定位</td>
                <td class="p-2.5 text-zinc-400">較早期的基礎做法</td>
                <td class="p-2.5 text-emerald-300 font-semibold">OpenSearch 的常用預設</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="lg:col-span-6 space-y-3">
        <div class="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
          BM25 的盲點：只看字面，不理解語意
        </div>

        <div class="space-y-2 text-xs">
          <div class="p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-1">
            <div class="font-bold text-rose-400 flex items-center gap-1.5">
              <span>❌ 同義說法可能完全錯過</span>
            </div>
            <p class="text-zinc-300 leading-relaxed text-[11px]">
              搜尋 <code class="text-amber-300 font-mono">「智慧辦公室」</code>，未必找得到描述「智能工作空間」的專利，因為兩者沒有相同的字。
            </p>
          </div>

          <div class="p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-1">
            <div class="font-bold text-rose-400 flex items-center gap-1.5">
              <span>❌ 無法判斷概念是否相近</span>
            </div>
            <p class="text-zinc-300 leading-relaxed text-[11px]">
              它不知道「半導體封裝技術」與「晶片立體整合」在技術概念上可能高度相關。
            </p>
          </div>

          <div class="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-1">
            <div class="font-bold text-amber-400 flex items-center gap-1.5">
              <span>💡 因此需要 Hybrid Search（混合搜尋）</span>
            </div>
            <p class="text-zinc-300 leading-relaxed text-[11px]">
              <strong class="text-emerald-400">BM25</strong> 負責精準關鍵字，<strong class="text-blue-400">向量搜尋</strong> 補上同義詞與語意關聯；兩者融合後兼顧精確度與召回率。
            </p>
          </div>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
