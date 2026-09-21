---
theme: tech
colorSchema: dark
highlighter: shiki
css: unocss
title: Hybrid Search on OpenSearch
info: |
  Hybrid Search on OpenSearch — 結合 BM25 與向量搜尋

  RD 技術分享 · 2026
transition: fade
mdc: true
layout: full
---

<Slide1Title />

---
layout: full
---

<Slide2WhyHybrid />

---
layout: full
---

<Slide3Concept />

---
layout: full
---

<Slide4Processors />

---
layout: full
---

<Slide5Normalization />

---
layout: full
---

<Slide6ScoreRanker />

---
layout: full
---

<Slide7Setup />

---
layout: full
---

<Slide8BuildPipeline />

---
layout: full
---

<Slide9PipelineConfig />

---
layout: full
---

<Slide10Query />

---
layout: full
---

<Slide11Filtering />

---
layout: full
---

<Slide12Summary />

---
layout: tech-content
eyebrow: References
title: 參考文獻
---

<div class="grid grid-cols-2 gap-x-10 gap-y-4 text-lg text-slate-300">
  <a href="https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/index/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">Hybrid Search 總覽</div>
    <div class="text-sm text-slate-400 break-all">https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/index/</div>
  </a>
  <a href="https://docs.opensearch.org/latest/search-plugins/search-pipelines/normalization-processor/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">Normalization Processor</div>
    <div class="text-sm text-slate-400 break-all">https://docs.opensearch.org/latest/search-plugins/search-pipelines/normalization-processor/</div>
  </a>
  <a href="https://docs.opensearch.org/latest/search-plugins/search-pipelines/score-ranker-processor/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">Score Ranker Processor (RRF)</div>
    <div class="text-sm text-slate-400 break-all">https://docs.opensearch.org/latest/search-plugins/search-pipelines/score-ranker-processor/</div>
  </a>
  <a href="https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/pre-filtering/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">Pre-filtering</div>
    <div class="text-sm text-slate-400 break-all">https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/pre-filtering/</div>
  </a>
  <a href="https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/post-filtering/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">Post-filtering</div>
    <div class="text-sm text-slate-400 break-all">https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/post-filtering/</div>
  </a>
  <a href="https://opensearch.org/docs/latest/search-plugins/search-pipelines/index/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">Search Pipelines</div>
    <div class="text-sm text-slate-400 break-all">https://opensearch.org/docs/latest/search-plugins/search-pipelines/index/</div>
  </a>
  <a href="https://opensearch.org/docs/latest/search-plugins/rrf-ranker/index/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">RRF Ranker</div>
    <div class="text-sm text-slate-400 break-all">https://opensearch.org/docs/latest/search-plugins/rrf-ranker/index/</div>
  </a>
  <a href="https://opensearch.org/docs/latest/search-plugins/normalization-ranker/index/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">Normalization Ranker</div>
    <div class="text-sm text-slate-400 break-all">https://opensearch.org/docs/latest/search-plugins/normalization-ranker/index/</div>
  </a>
</div>
