<script setup lang="ts">
import SlideShell from "./SlideShell.vue";
</script>

<template>
  <SlideShell :center="true">
    <div class="max-w-4xl mx-auto text-left space-y-6">
      <!-- Tag / Badge -->
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono"
      >
        <span class="size-2 rounded-full bg-emerald-400 animate-pulse" />
        OpenSearch 2.10+ & 2.19+ Deep Dive
      </div>

      <!-- Main Titles -->
      <div class="space-y-3">
        <h1
          class="text-5xl font-extrabold tracking-tight text-white leading-tight"
        >
          OpenSearch Hybrid Search
          <span
            class="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent"
            >Deep Dive</span
          >
        </h1>
        <p class="text-lg text-zinc-300 font-normal leading-relaxed">
          從 BM25 演算法原理、Search Pipeline 機制到架構實戰
        </p>
      </div>

      <!-- Feature Pill Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
        <div
          class="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm space-y-1"
        >
          <div class="text-xs font-mono text-emerald-400 font-bold">
            01. BM25 (Best Matching 25) 核心
          </div>
          <div class="text-xs text-zinc-300">
            IDF (Inverse Document Frequency) · TF (Term Frequency) 飽和 ·
            長度正規化
          </div>
        </div>

        <div
          class="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm space-y-1"
        >
          <div class="text-xs font-mono text-blue-400 font-bold">
            02. Processors
          </div>
          <div class="text-xs text-zinc-300">
            Normalization vs RRF (Reciprocal Rank Fusion) Ranker
          </div>
        </div>

        <div
          class="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm space-y-1"
        >
          <div class="text-xs font-mono text-teal-400 font-bold">
            03. 融合與正規化
          </div>
          <div class="text-xs text-zinc-300">
            Min-Max / L2 (Euclidean Norm) / Z-Score (Standard Score) + 平均
          </div>
        </div>

        <div
          class="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm space-y-1"
        >
          <div class="text-xs font-mono text-indigo-400 font-bold">
            04. 台灣專利實戰
          </div>
          <div class="text-xs text-zinc-300">
            Twofield vs Nested vs MultiDoc
          </div>
        </div>
      </div>

      <!-- Footer Metadata -->
      <div
        class="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono"
      >
        <div>RD (Research & Development, 研發) 技術分享 ·</div>
        <div>OpenSearch Architecture</div>
      </div>
    </div>
  </SlideShell>
</template>
