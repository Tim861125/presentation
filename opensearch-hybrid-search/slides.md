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

<div class="grid grid-cols-2 gap-3">
  <ReferenceCard index="1" title="Hybrid Search 總覽" href="https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/index/" />
  <ReferenceCard index="2" title="Normalization Processor" href="https://docs.opensearch.org/latest/search-plugins/search-pipelines/normalization-processor/" />
  <ReferenceCard index="3" title="Score Ranker Processor (RRF)" href="https://docs.opensearch.org/latest/search-plugins/search-pipelines/score-ranker-processor/" />
  <ReferenceCard index="4" title="Pre-filtering" href="https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/pre-filtering/" />
  <ReferenceCard index="5" title="Post-filtering" href="https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/post-filtering/" />
  <ReferenceCard index="6" title="Search Pipelines" href="https://opensearch.org/docs/latest/search-plugins/search-pipelines/index/" />
  <ReferenceCard index="7" title="RRF Ranker" href="https://opensearch.org/docs/latest/search-plugins/rrf-ranker/index/" />
  <ReferenceCard index="8" title="Normalization Ranker" href="https://opensearch.org/docs/latest/search-plugins/normalization-ranker/index/" />
</div>
