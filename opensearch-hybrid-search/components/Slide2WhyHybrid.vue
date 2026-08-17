<script setup lang="ts">
const cols = [
  {
    key: "BM25",
    tag: "Lexical · 關鍵字",
    dot: "bg-emerald-400",
    desc: "字面精確匹配",
    good: [
      "精確詞、型號、專有名詞命中強",
      "可解釋、可調權重",
      "不需模型、成本低",
    ],
    bad: ["不懂同義詞與語意", "換句話說就搜不到"],
  },
  {
    key: "Neural",
    tag: "Semantic · 向量",
    dot: "bg-blue-400",
    desc: "embedding + kNN 找語意相近",
    good: ["懂語意、跨語言、抓概念", "對模糊查詢友善"],
    bad: ["漏掉需要精確詞的匹配"],
  },
];
</script>

<template>
  <SlideShell>
    <SlideHeader
      eyebrow="Why Hybrid"
      title="為什麼需要 Hybrid Search"
      subtitle='專利場景：查 "smart office" — 只靠關鍵字會漏掉語意相近的專利；只靠向量又可能漏掉精確技術詞。兩種檢索各有盲點。'
    />

    <div class="grid grid-cols-2 gap-5 flex-1">
      <div
        v-for="c in cols"
        :key="c.key"
        class="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col"
      >
        <div class="flex items-center gap-2 mb-3">
          <span class="size-2 rounded-full" :class="c.dot" />
          <span class="text-lg font-bold text-white">{{ c.key }}</span>
          <span class="text-xs text-zinc-500">{{ c.desc }}</span>
          <span
            class="text-[10px] font-mono uppercase tracking-widest text-zinc-500 ml-auto"
            >{{ c.tag }}</span
          >
        </div>

        <div
          class="text-[11px] font-mono uppercase tracking-wider text-emerald-400/80 mb-1.5"
        >
          優勢
        </div>
        <ul class="space-y-1 mb-3">
          <li
            v-for="g in c.good"
            :key="g"
            class="flex gap-2 text-[13px] text-zinc-200"
          >
            <span class="text-emerald-400">＋</span>{{ g }}
          </li>
        </ul>

        <div
          class="text-[11px] font-mono uppercase tracking-wider text-rose-400/80 mb-1.5"
        >
          盲點
        </div>
        <ul class="space-y-1">
          <li
            v-for="b in c.bad"
            :key="b"
            class="flex gap-2 text-[13px] text-zinc-400"
          >
            <span class="text-rose-400">－</span>{{ b }}
          </li>
        </ul>
      </div>
    </div>

    <div
      class="mt-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-5 py-3"
    >
      <div class="flex items-center gap-3">
        <span
          class="text-[10px] font-mono uppercase tracking-widest text-emerald-400"
          >Hybrid</span
        >
        <p class="text-sm text-zinc-200">
          同一查詢<span class="text-white font-semibold">同時跑多路子查詢</span
          >，把不同尺度的分數
          <span class="text-emerald-400 font-semibold">正規化 → 加權合併</span
          >成單一排名 —— 互補兩者盲點。
        </p>
      </div>
    </div>
  </SlideShell>
</template>
