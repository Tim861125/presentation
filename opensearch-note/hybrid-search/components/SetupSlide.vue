<script setup lang="ts">
const steps = [
  ['建 ingest pipeline', '掛 text_embedding 處理器並指定 model_id，寫入時自動把文字欄位轉成向量'],
  ['建 index', 'embedding 欄位型別設 knn_vector，維度要與模型一致'],
  ['設 search pipeline', '放 normalization-processor 合併分數（← 本簡報重點，見後頁）'],
  ['灌文件', '寫入時 ingest pipeline 自動產生向量'],
  ['下 hybrid query', '查詢帶 search_pipeline 參數即可'],
]

const code = `POST /_plugins/_flow_framework/workflow
     ?use_case=hybrid_search&provision=true
{
  "create_ingest_pipeline.model_id": "<model_id>"
}`

// 這支 API 跑完（state = COMPLETED）自動建好的三樣東西，
// 恰好對應手動的第 1～3 步。
const outputs = [
  ['ingest pipeline', '寫入時自動把文字欄位轉成向量', '＝手動①'],
  ['knn_vector index', '存放向量、供 kNN 檢索', '＝手動②'],
  ['search pipeline', '查詢時正規化＋加權合併分數', '＝手動③'],
]
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Configuring"
      title="設定兩條路：自動化 vs 手動"
      subtitle="兩條路產出的東西一樣：ingest pipeline（產向量）＋ 向量 index ＋ search pipeline（合併分數）。差別只在要不要自己一步步做。"
    />

    <div class="grid grid-cols-2 gap-5 flex-1">
      <!-- Automated -->
      <div class="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.05] px-4 py-3 flex flex-col">
        <div class="flex items-center gap-2 mb-2">
          <span class="size-2 rounded-full bg-emerald-400" />
          <span class="text-lg font-bold text-white">Automated Workflow</span>
          <span class="text-[10px] font-mono text-emerald-400/80 ml-auto">一支 API 搞定</span>
        </div>
        <p class="text-xs text-zinc-400 mb-2 leading-relaxed">
          只需一個 <span class="font-mono text-emerald-300">model_id</span>（＝事先在 <span class="text-zinc-200">ML Commons</span> 註冊、部署好的 embedding 模型 ID，負責文字→向量），套內建 <span class="font-mono text-zinc-200">hybrid_search</span> 樣板，一支 API 就把下面三樣自動建好。
        </p>
        <JsonCard :code="code" />

        <div class="mt-2.5 pt-2.5 border-t border-white/10">
          <div class="text-[10px] font-mono uppercase tracking-wider text-emerald-400/70 mb-1.5">
            provision=true 後自動產出
          </div>
          <div class="space-y-1">
            <div v-for="o in outputs" :key="o[0]" class="flex items-baseline gap-2">
              <span class="text-emerald-400 text-xs">✓</span>
              <span class="font-mono text-xs text-white shrink-0">{{ o[0] }}</span>
              <span class="text-xs text-zinc-400 leading-snug">{{ o[1] }}</span>
              <span class="ml-auto shrink-0 text-[10px] font-mono text-emerald-400/70">{{ o[2] }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Manual -->
      <div class="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 flex flex-col">
        <div class="flex items-center gap-2 mb-3">
          <span class="size-2 rounded-full bg-blue-400" />
          <span class="text-lg font-bold text-white">Manual Setup</span>
          <span class="text-[10px] font-mono text-zinc-500 ml-auto">自己做 · 5 步驟</span>
        </div>
        <div class="space-y-2">
          <div v-for="(s, i) in steps" :key="s[0]" class="flex gap-3 items-start">
            <span class="shrink-0 size-6 rounded-full border border-white/15 bg-black/30 flex items-center justify-center text-xs font-mono text-blue-400">
              {{ i + 1 }}
            </span>
            <div class="flex-1">
              <div class="text-sm font-semibold text-white leading-tight">{{ s[0] }}</div>
              <div class="text-xs text-zinc-400 leading-snug mt-0.5">{{ s[1] }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
