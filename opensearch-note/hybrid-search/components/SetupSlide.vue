<script setup lang="ts">
const steps = [
  ['建 ingest pipeline', 'text_embedding processor，field_map 把文字映射成 embedding'],
  ['建 index', 'embedding 欄位設 knn_vector，維度需與模型一致'],
  ['設 search pipeline', 'normalization-processor（或 score-ranker）'],
  ['灌文件', '寫入時自動產生 embedding'],
  ['下 hybrid query', '帶 search_pipeline 參數搜尋'],
]

const code = `POST /_plugins/_flow_framework/workflow
     ?use_case=hybrid_search&provision=true
{
  "create_ingest_pipeline.model_id": "mBGzipQB2gmRjlv_dOoB"
}`
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Configuring"
      title="設定兩條路：自動化 vs 手動"
      subtitle="趕時間用 flow_framework 模板一鍵建好；要掌握每個環節就走手動五步驟。"
    />

    <div class="grid grid-cols-2 gap-5 flex-1">
      <!-- Automated -->
      <div class="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.05] p-5 flex flex-col">
        <div class="flex items-center gap-2 mb-3">
          <span class="size-2 rounded-full bg-emerald-400" />
          <span class="text-lg font-bold text-white">Automated Workflow</span>
        </div>
        <p class="text-xs text-zinc-400 mb-4">
          給一個 model_id，模板自動建好 ingest pipeline、index、search pipeline。
        </p>
        <JsonCard :code="code" />
        <div class="mt-auto pt-4 text-xs text-zinc-400">
          state = <span class="font-mono text-emerald-400">COMPLETED</span> 後產出
          <span class="font-mono text-zinc-200">nlp-ingest-pipeline</span> /
          <span class="font-mono text-zinc-200">my-nlp-index</span> /
          <span class="font-mono text-zinc-200">nlp-search-pipeline</span>
        </div>
      </div>

      <!-- Manual -->
      <div class="rounded-xl border border-white/10 bg-white/[0.03] p-5 flex flex-col">
        <div class="flex items-center gap-2 mb-4">
          <span class="size-2 rounded-full bg-blue-400" />
          <span class="text-lg font-bold text-white">Manual Setup</span>
          <span class="text-[10px] font-mono text-zinc-500 ml-auto">5 步驟</span>
        </div>
        <div class="space-y-2.5">
          <div v-for="(s, i) in steps" :key="s[0]" class="flex gap-3 items-start">
            <span class="shrink-0 size-6 rounded-full border border-white/15 bg-black/30 flex items-center justify-center text-xs font-mono text-blue-400">
              {{ i + 1 }}
            </span>
            <div>
              <div class="text-sm font-semibold text-white leading-tight">{{ s[0] }}</div>
              <div class="text-xs text-zinc-400">{{ s[1] }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
