<script setup lang="ts">
// Each command line: { m: method, t: path, tag? }
const steps = [
  {
    n: 1,
    title: '建立 pipeline',
    plain: '把「多路分數怎麼正規化、怎麼加權合併」的規則存進叢集，取名 patent-hybrid。（規則長怎樣見下一頁）',
    cmds: [
      { m: 'PUT', t: '/_search/pipeline/patent-hybrid' },
    ],
  },
  {
    n: 2,
    title: '掛上查詢（二選一）',
    plain: '查詢時要告訴 OpenSearch「這次用哪條 pipeline」。單次＝只有這次查用；設預設＝這個 index 之後每次查都自動套用。',
    cmds: [
      { m: 'POST', t: '/patent/_search?search_pipeline=patent-hybrid', tag: '單次' },
      { m: 'PUT', t: '/patent/_settings  {"index.search.default_pipeline":"patent-hybrid"}', tag: '設預設' },
    ],
  },
  {
    n: 3,
    title: '驗證 / 查看',
    plain: '確認 pipeline 建好了、內容正確。',
    cmds: [
      { m: 'GET', t: '/_search/pipeline/patent-hybrid' },
    ],
  },
]

const mColor: Record<string, string> = {
  GET: 'text-sky-400',
  POST: 'text-emerald-400',
  PUT: 'text-amber-400',
}
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Build · Search Pipeline"
      title="建立 Search Pipeline：三步驟"
      subtitle="search pipeline = 一套「合併分數的規則」：建一次規則 → 查詢時掛上 → 驗證。"
    />

    <div class="flex-1 flex flex-col justify-start gap-1.5">
      <div v-for="s in steps" :key="s.n"
           class="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-1.5">
        <span class="shrink-0 size-6 rounded-full border border-emerald-400/40 bg-emerald-500/10 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
          {{ s.n }}
        </span>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold text-white">{{ s.title }}</div>
          <p class="text-xs text-zinc-400 leading-snug mb-1 mt-0.5">{{ s.plain }}</p>
          <div class="space-y-1">
            <div v-for="c in s.cmds" :key="c.t"
                 class="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-0.5">
              <span v-if="c.tag" class="shrink-0 text-[10px] font-mono rounded border border-white/10 px-1.5 py-0.5 text-zinc-400">{{ c.tag }}</span>
              <span class="shrink-0 text-xs font-mono font-bold" :class="mColor[c.m]">{{ c.m }}</span>
              <span class="text-xs font-mono text-zinc-300 truncate">{{ c.t }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SlideShell>
</template>
