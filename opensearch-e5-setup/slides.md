---
theme: tech
colorSchema: dark
highlighter: shiki
css: unocss
mdc: true
layout: tech-cover
title: OpenSearch 向量搜尋
highlight: 參數深剖
version: OpenSearch 3.3.2
subtitle: 從 pat_e5_tw_v1 專利向量索引的三段 JSON 出發
tag: RD 技術分享 · 2026
footer: 丁吾心
date: 2026
tags: [向量搜尋, k-NN, 參數調校]
---

---
layout: tech-content
eyebrow: Overview
title: 三段 JSON、一條參數主線
subtitle: 每個參數只問三件事：是什麼、為什麼這樣設、代價是什麼
---

<div class="grid grid-cols-3 gap-4 mt-2">
  <TechCard tag="STEP A" title="產生向量" variant="emerald">
    <div class="text-xs leading-relaxed text-zinc-300">
      vLLM 部署 <code class="text-emerald-300">.93:8003</code><br/>
      每批 32 篇 → 1024 維向量<br/>
      <span class="text-zinc-500">4 個請求參數</span>
    </div>
  </TechCard>
  <TechCard tag="STEP C" title="建立索引" variant="blue">
    <div class="text-xs leading-relaxed text-zinc-300">
      <code class="text-blue-300">PUT pat_e5_tw_v1</code><br/>
      settings 3 參數 + mapping 8 參數<br/>
      <span class="text-zinc-500">faiss · HNSW · on_disk</span>
    </div>
  </TechCard>
  <TechCard tag="STEP D" title="查詢" variant="amber">
    <div class="text-xs leading-relaxed text-zinc-300">
      <code class="text-amber-300">POST _search</code><br/>
      size · k · rescore<br/>
      <span class="text-zinc-500">候補倍率全押在 k</span>
    </div>
  </TechCard>
</div>

<Callout type="info" title="閱讀視角" class="mt-4">
  本專案不談概念起源，逐參數解析實際生產設定 —— 參數之間不是開開關關而已，
  而是一整組互相補償的設計（第 10 頁總整理）。
</Callout>

---
layout: tech-two-cols
eyebrow: A · Embeddings
title: /v1/embeddings 請求參數
---

```json
POST http://192.168.50.93:8003/v1/embeddings
{
  "model": "multilingual-e5-large",
  "input": [
    "passage: <標題>\n\n<摘要>\n\n<權利範圍 1>\n\n<權利範圍 2>…",
    "passage: …"
  ],
  "truncate_prompt_tokens": 512
}
```

::right::

- `model`：multilingual-e5-large，輸出 **1024 維**
- `input`：陣列；本專案**每批送 32 篇**湊吞吐量
- `truncate_prompt_tokens: 512`：超過 512 token 由**伺服器端**自動截斷
- 內文先按 **Unicode 碼點**截到字數上限，**再加前綴**
- 查詢時同一支 API：`input: ["query: <查詢文字>"]`

---
layout: tech-two-cols
eyebrow: A · Embeddings
title: 截斷規則與前綴慣例
---

### truncate_prompt_tokens

- 沒送截斷參數時，**任一篇**超過 512 token → 整個請求回 **400**
- ✓ 一定要送 `truncate_prompt_tokens: 512`
- ✗ 不送 `truncation_side`，採伺服器預設截斷行為
- 安全版 **500 字**：保證不超過 512 token
- 填滿版 **3,100 字**：吃滿 512，多的由伺服器截掉

::right::

### passage: vs query:

- e5 是**非對稱模型**：語料與查詢走不同前綴
- 語料：`passage: <標題>\n\n<摘要>\n\n<權利範圍>…`
- 查詢：`query: <查詢文字>`
- 前綴加在**截斷之後**，不佔字數預算
- 訓練時就成對出現，推論時沒加前綴 → recall 明顯掉

---
layout: tech-content
eyebrow: C · Index Settings
title: settings 三個開關
subtitle: PUT pat_e5_tw_v1 —— 全部是 static，建索引時一次決定
---

<div class="grid grid-cols-3 gap-4 mt-1">
  <TechCard title="index.knn" variant="blue">
    <div class="text-xs leading-relaxed">
      <span class="text-zinc-500">是什麼</span> 索引層 k-NN 功能開關<br/><br/>
      <span class="text-zinc-500">為什麼</span> 所有向量設定生效的前提，其餘 knn.* 參數都掛在它下面
    </div>
  </TechCard>
  <TechCard title="memory_optimized_search" variant="emerald">
    <div class="text-xs leading-relaxed">
      <span class="text-zinc-500">是什麼</span> 搜尋時不把向量載進記憶體，直接從磁碟走圖<br/><br/>
      <span class="text-zinc-500">代價</span> <code>ef_search</code> 失效，候選數只能靠 <code>k</code> 控制
    </div>
  </TechCard>
  <TechCard title="derived_source.enabled" variant="amber">
    <div class="text-xs leading-relaxed">
      <span class="text-zinc-500">是什麼</span> 向量不再複製進 <code>_source</code>，需要時從 k-NN 索引重組<br/><br/>
      <span class="text-zinc-500">代價</span> 重組比直讀慢 → 查詢只點名必要欄位
    </div>
  </TechCard>
</div>

<Callout type="tip" title="省在哪" class="mt-3">
  同一份 1024 維向量，原本「k-NN 索引 + _source」各存一份；
  derived_source 直接砍掉 _source 裡的那份複本，磁碟需求近乎減半。
</Callout>

---
layout: tech-two-cols
eyebrow: C · Mapping
title: on_disk 與 32x 量化
subtitle: embeddingE5 欄位 —— 把向量留在磁碟、壓到 1/32
---

### mode: on_disk

- 對照組 `in_memory`：向量全數載入 RAM，快但吃記憶體
- `on_disk`：向量以**磁碟為主**，記憶體需求大幅下降
- on_disk 的預設組合就是 **faiss + hnsw + 32x**
- `dimension: 1024` 必須與模型輸出**完全一致**
- `docId: keyword` 為精確匹配欄，不參與向量搜尋

::right::

### compression_level: 32x

- 量化倍率 ↔ 每維位元：**32x = 1-bit**、16x = 2-bit、8x = 4-bit
- 1024 維 float32 = 4 KB/篇 → 32x 後 **128 B/篇**
- 設了 `compression_level` 就**不能再自訂 encoder**
- 倍率換到 4x 會改用 **lucene** 引擎（本專案走 faiss）

<Callout type="warning" title="代價" class="mt-3">
  1-bit 量化必然損失 recall —— 補回的手段是查詢端的 rescore，見第 9 頁。
</Callout>

---
layout: tech-two-cols
eyebrow: C · Mapping
title: method —— HNSW 圖參數
---

### 演算法與引擎

- `name: hnsw`：分層可導航小世界圖，逐層貪婪走圖找近鄰
- `engine: faiss`：Meta FAISS 函式庫（另一主要選項 lucene）
- `space_type: cosinesimil`：cosine 相似度，
  適用 e5 這類方向語意向量

::right::

### 建圖參數（只影響寫入端）

- `m: 16`：每層每節點最大連結數 ——
  圖越密 recall 越好、圖越大越吃記憶體
- `ef_construction: 256`：建圖時每節點的候選清單長度 ——
  圖品質越好、建置越慢
- 兩個都是**寫入期**參數：調的是離峰建索引的成本，
  查詢時的旋鈕是 `k` 與 rescore

---
layout: tech-two-cols
eyebrow: D · Query
title: size、k，與失靈的 ef_search
---

```json
POST pat_e5_tw/_search
{
  "size": 100,
  "_source": ["docId", "pubDate", "apnRaw"],
  "query": {
    "knn": {
      "embeddingE5": {
        "vector": ["…query: <查詢文字> 產生的 1024 維…"],
        "k": 500,
        "rescore": { "oversample_factor": 1.0 }
      }
    }
  }
}
```

::right::

- `size`：**最終回傳**筆數（100）
- `k`：HNSW 第一趟走圖取**前 k 名** = 候選數
- 尋常模式下可用 `ef_search` 放大候選池，
  但 memory-optimized 搜尋**不支援 ef_search**
- → 候選數只能靠 k：要 5 倍候補就寫 `k: 500`
- `_source` 只點名 3 個欄位：
  derived_source 重組有成本，少要就是快

---
layout: tech-content
eyebrow: D · Query
title: rescore —— 先搜快、再排準
subtitle: 量化索引的兩階段搜尋
---

<div class="grid grid-cols-2 gap-4 mt-1">
  <InfoCard title="第一階段 · 量化搜尋" color="blue">
    用 <b>1-bit 量化向量</b>走 HNSW 圖，<br/>
    搜 <code>oversample_factor × k</code> 筆候選 —— 快、省記憶體，但分數不準
  </InfoCard>
  <InfoCard title="第二階段 · 全精度重排" color="emerald">
    從磁碟撈這批候選的<b>全精度向量</b>重算分數，<br/>
    重新排序後才取 <code>size</code> 筆回傳 —— 準，但只對候選做
  </InfoCard>
</div>

<Callout type="info" title="oversample_factor 計算式" class="mt-3">
  第一趟筆數 = <code>factor × k</code>，並被 clamp 到 <b>100 – 10,000</b>。
  本專案 <code>oversample_factor: 1.0</code> + <code>k: 500</code>
  → 第一趟搜 500、500 筆全進重排、最後回傳 top 100。
</Callout>

<div class="text-xs text-zinc-400 mt-3">
  調大 factor = 更深重排、更好 recall、更高延遲；
  32x 量化省下來的記憶體，就是為了買回這一階段的準確度。
</div>

---
layout: tech-content
eyebrow: Synthesis
title: 一條線看懂參數聯動
subtitle: 省 → 補 → 控
---

<div class="grid grid-cols-3 gap-4 mt-1">
  <InfoCard title="省 · 記憶體/磁碟" color="cyan">
    <code>compression_level: 32x</code><br/>
    <code>mode: on_disk</code><br/>
    <code>derived_source.enabled</code><br/>
    <code>memory_optimized_search</code>
  </InfoCard>
  <InfoCard title="補 · recall" color="emerald">
    <code>rescore.oversample_factor</code><br/>
    第二階段讀磁碟全精度向量重排，<br/>
    把 1-bit 量化掉的分數準度贖回來
  </InfoCard>
  <InfoCard title="控 · 候補大小" color="amber">
    ef_search 已失靈 →<br/>
    <code>k = 結果數 × 候補倍率</code><br/>
    100 筆 × 5 倍 = <code>k: 500</code>
  </InfoCard>
</div>

<div class="mt-4 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs font-mono text-zinc-300">
  查詢路徑：query: 前綴 → 1024 維向量 → 量化圖搜 500 筆 → 全精度重排 500 筆 → 回傳 top 100
</div>

---
layout: tech-content
eyebrow: Summary
title: 上線檢查清單
---

- ✓ 每次 embedding 請求必送 `truncate_prompt_tokens: 512`，**不送** `truncation_side`
- ✓ 語料加 `passage: `、查詢加 `query: `，前綴在截斷之後才加
- ✓ 字數上限二選一：安全版 500 字／填滿版 3,100 字
- ✓ `on_disk` + `32x` 是預設組合，recall 靠 rescore 補，不是靠拆量化
- ✓ memory-optimized 下忘記 ef_search 這件事，候補倍率全部寫進 `k`
- ✓ `_source` 只點名必要欄位，derived_source 重組才不拖慢查詢

---
layout: tech-content
eyebrow: References
title: 參考文獻
---

<div class="grid grid-cols-2 gap-3">
  <ReferenceCard index="1" title="k-NN Index Settings" href="https://docs.opensearch.org/3.3/search-plugins/knn/settings" />
  <ReferenceCard index="2" title="knn_vector Field Type" href="https://docs.opensearch.org/3.3/field-types/supported-field-types/knn-vector" />
  <ReferenceCard index="3" title="Memory-Optimized Search" href="https://docs.opensearch.org/3.3/vector-search/optimizing-storage/memory-optimized-search" />
  <ReferenceCard index="4" title="Derived Source (_source)" href="https://docs.opensearch.org/3.3/field-types/metadata-fields/source" />
  <ReferenceCard index="5" title="Disk-based Vector Search" href="https://docs.opensearch.org/3.3/vector-search/optimizing-storage/disk-based-vector-search" />
  <ReferenceCard index="6" title="Binary Quantization" href="https://docs.opensearch.org/3.3/vector-search/optimizing-storage/binary-quantization" />
  <ReferenceCard index="7" title="k-NN Rescoring (Memory-Optimized Vectors)" href="https://docs.opensearch.org/3.3/mappings/supported-field-types/knn-memory-optimized" />
  <ReferenceCard index="8" title="k-NN Query DSL" href="https://docs.opensearch.org/3.3/query-dsl/specialized/k-nn" />
</div>

---
layout: center
class: text-center
---

# End
