<script setup lang="ts">
const code = `{
  "query": {
    "hybrid": {
      "queries": [
        { "match":  { "tac": "smart office" } },
        { "neural": { "tac_embedding":
            { "query_text": "smart office" } } },
        { "neural": { "name_embedding":
            { "query_text": "smart office" } } }
      ]
    }
  }
}`;

const mapping = [
  { idx: 0, q: "match · tac", kind: "BM25", w: "0.2", dot: "bg-emerald-400" },
  {
    idx: 1,
    q: "neural · tac_embedding",
    kind: "Vector",
    w: "0.4",
    dot: "bg-blue-400",
  },
  {
    idx: 2,
    q: "neural · name_embedding",
    kind: "Vector",
    w: "0.4",
    dot: "bg-blue-400",
  },
];
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="實作 ② · Run Query"
      title="下 hybrid query：三路子查詢"
      subtitle="帶上 ?search_pipeline=patent-hybrid，queries 陣列順序對齊 pipeline 的 weights。"
    />

    <div class="grid grid-cols-2 gap-5 flex-1">
      <JsonCard
        method="POST"
        path="/patent/_search?search_pipeline=patent-hybrid"
        :code="code"
      />

      <div class="flex flex-col justify-center gap-3">
        <div
          class="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-1"
        >
          queries[i] ↔ weights[i]
        </div>
        <div
          v-for="m in mapping"
          :key="m.idx"
          class="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 flex items-center gap-3"
        >
          <span class="text-xs font-mono text-zinc-500">[{{ m.idx }}]</span>
          <span class="size-2 rounded-full" :class="m.dot" />
          <div class="flex-1">
            <div class="text-sm font-mono text-zinc-200">{{ m.q }}</div>
            <div
              class="text-[10px] font-mono uppercase tracking-wider text-zinc-500"
            >
              {{ m.kind }}
            </div>
          </div>
          <span class="text-zinc-600">→</span>
          <span class="text-lg font-mono font-bold text-emerald-400">{{
            m.w
          }}</span>
        </div>
        <div class="text-xs text-zinc-500 mt-1">
          三路各自打分 → pipeline 正規化 + 加權平均 → 統一排名回傳。
        </div>
      </div>
    </div>
  </SlideShell>
</template>
