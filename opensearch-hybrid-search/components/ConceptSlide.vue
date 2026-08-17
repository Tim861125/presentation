<script setup lang="ts">
const subqueries = [
  { label: "match", field: "tac", kind: "BM25" },
  { label: "neural", field: "tac_embedding", kind: "Vector" },
  { label: "neural", field: "name_embedding", kind: "Vector" },
];
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Mental Model"
      title="核心流程：分數在 Search Pipeline 合併"
      subtitle="合併不是發生在查詢裡，而是在 query phase 與 fetch phase 之間的 phase_results_processor。"
    />

    <div class="flex-1 flex items-center">
      <div class="w-full flex items-stretch gap-3">
        <!-- 1. hybrid query fan-out -->
        <div class="flex flex-col justify-center gap-2 flex-1">
          <div
            class="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1"
          >
            ① hybrid query
          </div>
          <div
            v-for="s in subqueries"
            :key="s.field"
            class="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
          >
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono text-emerald-400">{{
                s.label
              }}</span>
              <span class="text-[10px] font-mono text-zinc-500 ml-auto">{{
                s.kind
              }}</span>
            </div>
            <div class="text-xs text-zinc-300 font-mono">{{ s.field }}</div>
          </div>
          <div class="text-[10px] text-zinc-500 mt-1">
            各路在 query phase 各自打分（尺度不同）
          </div>
        </div>

        <div class="flex items-center text-zinc-600 text-2xl">→</div>

        <!-- 2. pipeline -->
        <div class="flex flex-col justify-center flex-[1.2]">
          <div
            class="text-[10px] font-mono uppercase tracking-widest text-blue-400/80 mb-1"
          >
            ② search pipeline
          </div>
          <div
            class="rounded-xl border border-blue-500/30 bg-blue-500/[0.06] p-4 space-y-3"
          >
            <div
              class="text-[10px] font-mono uppercase tracking-wider text-zinc-500"
            >
              phase_results_processor
            </div>
            <div
              class="rounded-lg border border-white/10 bg-zinc-900/60 px-3 py-2"
            >
              <div class="text-sm font-semibold text-white">normalize</div>
              <div class="text-xs text-zinc-400">把各路分數拉到同一尺度</div>
            </div>
            <div class="flex justify-center text-zinc-600 text-lg">↓</div>
            <div
              class="rounded-lg border border-white/10 bg-zinc-900/60 px-3 py-2"
            >
              <div class="text-sm font-semibold text-white">combine</div>
              <div class="text-xs text-zinc-400">加權合併成單一分數</div>
            </div>
          </div>
        </div>

        <div class="flex items-center text-zinc-600 text-2xl">→</div>

        <!-- 3. result -->
        <div class="flex flex-col justify-center gap-2 flex-1">
          <div
            class="text-[10px] font-mono uppercase tracking-widest text-emerald-400/80 mb-1"
          >
            ③ 統一排名
          </div>
          <div
            v-for="(n, i) in [1, 2, 3]"
            :key="n"
            class="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2 flex items-center gap-3"
          >
            <span class="text-sm font-mono text-emerald-400">#{{ n }}</span>
            <div
              class="h-1.5 rounded-full bg-emerald-400/60"
              :style="{ width: `${70 - i * 18}%` }"
            />
          </div>
          <div class="text-[10px] text-zinc-500 mt-1">
            fetch phase 取回並回傳
          </div>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
