<script setup lang="ts">
import SlideShell from './SlideShell.vue'
import SlideHeader from './SlideHeader.vue'
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Part 3 · Normalization & Combination"
      title="三種分數合併技術 (Combination Techniques)"
      subtitle="將正規化後的多路分數融合為單一最終排名的組合數學機制"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-2">
      <!-- Left Column: 3 Formulas & Descriptions (7 cols) -->
      <div class="lg:col-span-7 space-y-2.5">
        <!-- Arithmetic -->
        <div class="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex items-start gap-3">
          <div class="size-7 rounded-lg bg-emerald-500/20 flex items-center justify-center font-mono font-bold text-emerald-400 text-xs shrink-0 mt-0.5">加</div>
          <div class="space-y-1 flex-1">
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="font-bold text-white">1. arithmetic_mean (Arithmetic Mean, 算術/加權平均, 預設)</span>
              <span class="text-emerald-400">Final = Σ (w_i × s_i) / Σ w_i</span>
            </div>
            <p class="text-[11px] text-zinc-300 leading-relaxed">
              最直觀常見。單路高分可補足其他路的低分，對整體排名容錯度最高。
            </p>
          </div>
        </div>

        <!-- Geometric -->
        <div class="p-3 rounded-xl border border-blue-500/30 bg-blue-500/5 flex items-start gap-3">
          <div class="size-7 rounded-lg bg-blue-500/20 flex items-center justify-center font-mono font-bold text-blue-400 text-xs shrink-0 mt-0.5">幾</div>
          <div class="space-y-1 flex-1">
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="font-bold text-white">2. geometric_mean (Geometric Mean, 幾何平均)</span>
              <span class="text-blue-400">Final = ( Π s_i^w_i )^(1 / Σ w_i)</span>
            </div>
            <p class="text-[11px] text-zinc-300 leading-relaxed">
              對低分較嚴格。只要任何一路子查詢得分為 0，最終總得分直接歸零！
            </p>
          </div>
        </div>

        <!-- Harmonic -->
        <div class="p-3 rounded-xl border border-purple-500/30 bg-purple-500/5 flex items-start gap-3">
          <div class="size-7 rounded-lg bg-purple-500/20 flex items-center justify-center font-mono font-bold text-purple-400 text-xs shrink-0 mt-0.5">調</div>
          <div class="space-y-1 flex-1">
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="font-bold text-white">3. harmonic_mean (Harmonic Mean, 調和平均)</span>
              <span class="text-purple-400">Final = Σ w_i / Σ (w_i / s_i)</span>
            </div>
            <p class="text-[11px] text-zinc-300 leading-relaxed">
              對低分最為敏感與嚴苛。強力懲罰任何一路出現低分的情況。
            </p>
          </div>
        </div>
      </div>

      <!-- Right Column: Attitude Comparison Table (5 cols) -->
      <div class="lg:col-span-5 space-y-2">
        <div class="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
          對低分態度與適用建議
        </div>

        <div class="rounded-xl border border-white/10 overflow-hidden bg-black/40 text-xs">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-white/10 bg-white/[0.04] text-zinc-300 font-mono text-[11px]">
                <th class="p-2">合併方式</th>
                <th class="p-2">對低分態度</th>
                <th class="p-2">專利檢索建議</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5 text-[11px] text-zinc-300">
              <tr>
                <td class="p-2 font-mono font-bold text-emerald-300">arithmetic</td>
                <td class="p-2 text-emerald-400">最寬鬆 (可互補)</td>
                <td class="p-2 font-bold text-white">首選基準線 ⭐</td>
              </tr>
              <tr>
                <td class="p-2 font-mono font-bold text-blue-300">geometric</td>
                <td class="p-2 text-amber-300">嚴格 (一票否決)</td>
                <td class="p-2 text-zinc-400">要求多路均需命中</td>
              </tr>
              <tr>
                <td class="p-2 font-mono font-bold text-purple-300">harmonic</td>
                <td class="p-2 text-rose-400">最嚴格 (懲罰低分)</td>
                <td class="p-2 text-zinc-400">極致精準召回</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-zinc-300 space-y-1">
          <div class="font-mono font-bold text-amber-400">💡 實務調校順序 Recommendations</div>
          <ol class="list-decimal list-inside text-[11px] space-y-1 text-zinc-300">
            <li>先固定使用 <code class="text-emerald-400 font-mono">arithmetic_mean</code> 建立 baseline</li>
            <li>選擇適宜的 normalization (如 min_max 或 l2)</li>
            <li>調整各路 <code class="text-amber-300 font-mono">weights</code> (專利 BM25 (Best Matching 25): 0.4, 向量: 0.6)</li>
          </ol>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
