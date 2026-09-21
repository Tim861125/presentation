---
theme: tech
colorSchema: dark
highlighter: shiki
css: unocss
title: 深度分頁實戰 — Scroll vs search_after
info: |
  OpenSearch / Elasticsearch 深度分頁技術分享
  Scroll、search_after 與現代推薦解 PIT + search_after
  RD 技術分享 · 2026
transition: fade
mdc: true
layout: full
---

<Slide1Title />

<!--
講者備忘錄:
1. 適用 OpenSearch 2.x/3.x 與 Elasticsearch 7.x/8.x，兩者 REST 語義幾乎相同。
2. 全場主軸：scroll 與 search_after 的取捨，以及為何官方最終推薦 PIT + search_after。
-->

---
layout: full
---

<Slide2Problem />

<!--
講者備忘錄: 先講成本模型（shard 優先隊列），再講 10k 上限是「報錯不是變慢」，最後用挤頁例子帶出漂移問題。
-->

---
layout: full
---

<Slide3FromSize />

<!--
講者備忘錄: from+size 不是反派，前幾頁就是它的主場；瓶頸在深頁成本與不凍結。
-->

---
layout: full
---

<Slide4SectionScroll />

---
layout: full
---

<Slide5ScrollMechanism />

<!--
講者備忘錄: 強調 search context = 「記住掃到哪裡」；keep-alive 誤解是最常踩的坑，先在這裡打破。
-->

---
layout: full
---

<Slide6ScrollRest />

<!--
講者備忘錄: demo 時示範首批 → 續批 → DELETE；特別展示回應中 scroll_id 換掉。
-->

---
layout: full
---

<Slide7ScrollTradeoffs />

---
layout: full
---

<Slide8SlicedScroll />

<!--
講者備忘錄: 20 串行 vs 10 slice 的視覺對比是重點；提醒記憶體 ×N 的代價。
-->

---
layout: full
---

<Slide9SectionSearchAfter />

---
layout: full
---

<Slide10SearchAfterMechanism />

<!--
講者備忘錄: 「入場券」比喻：sort 值陣列就是座標；O(shards × size) 與 from+size 形成對比。tiebreaker 沒給 = 整批漏。
-->

---
layout: full
---

<Slide11SearchAfterRest />

---
layout: full
---

<Slide12SearchAfterTradeoffs />

---
layout: full
---

<Slide13Comparison />

<!--
講者備忘錄: 逐行掃過，最後停在「官方態度」列，為 PIT 鋪梗。
-->

---
layout: full
---

<Slide14SectionPit />

---
layout: full
---

<Slide15PitMechanism />

<!--
講者備忘錄: 重點是「拆分」：PIT 只管快照、search_after 只管游標；OpenSearch 3.0 SQL plugin 已預設 PIT、Scroll 棄用。
-->

---
layout: full
---

<Slide16PitRest />

---
layout: full
---

<Slide17PitSlicing />

---
layout: full
---

<Slide18DecisionMatrix />

<!--
講者備忘錄: 讓聽眾對照自己的場景選列；多數人答案應該是第三列 PIT + search_after。
-->

---
layout: full
---

<Slide19Gotchas />

---
layout: tech-content
eyebrow: References
title: 參考文獻
---

<div class="grid grid-cols-2 gap-x-10 gap-y-4 text-lg text-slate-300">
  <a href="https://docs.opensearch.org/latest/search-plugins/searching-data/paginate/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">OpenSearch — Paginate search results</div>
    <div class="text-sm text-slate-400 break-all">https://docs.opensearch.org/latest/search-plugins/searching-data/paginate/</div>
  </a>
  <a href="https://docs.opensearch.org/latest/search-plugins/searching-data/point-in-time/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">OpenSearch — Point in Time</div>
    <div class="text-sm text-slate-400 break-all">https://docs.opensearch.org/latest/search-plugins/searching-data/point-in-time/</div>
  </a>
  <a href="https://docs.opensearch.org/latest/api-reference/search/scroll/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">OpenSearch — Scroll API</div>
    <div class="text-sm text-slate-400 break-all">https://docs.opensearch.org/latest/api-reference/search/scroll/</div>
  </a>
  <a href="https://opensearch.org/docs/latest/api-reference/search-apis/search/" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">OpenSearch — Search API</div>
    <div class="text-sm text-slate-400 break-all">https://opensearch.org/docs/latest/api-reference/search-apis/search/</div>
  </a>
  <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">Elasticsearch — Paginate search results</div>
    <div class="text-sm text-slate-400 break-all">https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html</div>
  </a>
  <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/search-after.html" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">Elasticsearch — search_after</div>
    <div class="text-sm text-slate-400 break-all">https://www.elastic.co/guide/en/elasticsearch/reference/current/search-after.html</div>
  </a>
  <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/point-in-time-api.html" target="_blank" class="block hover:text-cyan-300">
    <div class="text-cyan-300 font-semibold">Elasticsearch — Point in time API</div>
    <div class="text-sm text-slate-400 break-all">https://www.elastic.co/guide/en/elasticsearch/reference/current/point-in-time-api.html</div>
  </a>
</div>

---
layout: full
---

<Slide20End />
