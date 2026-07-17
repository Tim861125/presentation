<script setup lang="ts">
const code = `{
  "description": "Patent hybrid search pipeline",
  "phase_results_processors": [
    {
      "normalization-processor": {
        "normalization": {
          "technique": "min_max"
        },
        "combination": {
          "technique": "arithmetic_mean",
          "parameters": {
            "weights": [0.2, 0.4, 0.4]
          }
        }
      }
    }
  ]
}`;

const notes = [
  ["min_max", "把 BM25 與兩路向量分數都縮放到 [0,1]，尺度才可比"],
  ["arithmetic_mean", "正規化後以算術平均加權合成單一分數"],
  ["weights [0.2, 0.4, 0.4]", "BM25 0.2、  tac / name 向量 各 0.4"],
];
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="實作 ① · Build Pipeline"
      title="建立 patent-hybrid search pipeline"
      subtitle="專利場景：以 tac / name 的語意向量為主（各 0.4），關鍵字 tac 為輔（0.2）。"
    />

    <div class="grid grid-cols-2 gap-5 flex-1">
      <JsonCard
        method="PUT"
        path="/_search/pipeline/patent-hybrid"
        :code="code"
      />

      <div class="flex flex-col gap-3">
        <div
          v-for="n in notes"
          :key="n[0]"
          class="rounded-xl border border-white/10 bg-white/[0.03] p-4"
        >
          <div class="text-xs font-mono text-emerald-400 mb-1">{{ n[0] }}</div>
          <div class="text-sm text-zinc-300">{{ n[1] }}</div>
        </div>

        <div
          class="mt-auto rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3"
        >
          <p class="text-sm text-zinc-200">
            <span class="text-emerald-400 font-semibold">關鍵：</span>
            weights 的順序，會與下一頁 hybrid query 中
            <span class="font-mono text-white">queries</span> 陣列的順序<span
              class="text-white font-semibold"
              >一一對應</span
            >。
          </p>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
