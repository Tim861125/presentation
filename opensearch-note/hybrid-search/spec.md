# Spec — OpenSearch Hybrid Search 簡報

> 這是本 deck 的 source of truth。slides.md / components 皆由此蒸餾。
> 風格：科技感、不花俏，沿用 repo 既有視覺語言（zinc-950 深底 + emerald/blue 點綴）。
> 貫穿範例：專利搜尋（patent），查詢字串 `"smart office"`。

## 原始筆記來源

- Hybrid search 總覽：https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/index/
- Normalization processor：https://docs.opensearch.org/latest/search-plugins/search-pipelines/normalization-processor/
- Score ranker processor：https://docs.opensearch.org/latest/search-plugins/search-pipelines/score-ranker-processor/
- Pre-filtering：https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/pre-filtering/
- Post-filtering：https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/post-filtering/

---

## 決策取向（已與使用者確認）

- **內容深度**：概念 + 實作兼具。
- **範例**：用專利搜尋 `patent / tac / title_embedding / claims_embedding` 貫穿全場。
- **背景知識**：BM25 vs 向量/神經搜尋簡短鋪陳（假設聽眾大致熟悉）。

---

## 研究整理（reference material，供各頁蒸餾）

### 1. 為什麼要 hybrid search

- **BM25 / lexical（關鍵字）**：字面精確匹配強、可解釋、無需模型；但不懂同義詞與語意，換句話說就搜不到。
- **Neural / vector（語意）**：靠 embedding + kNN 找語意相近；但會漏掉需要精確詞（型號、專有名詞）的匹配，且分數尺度與 BM25 完全不同。
- **Hybrid**：同一個查詢同時跑多路子查詢（lexical + 一或多路 neural），再把不同尺度的分數**正規化**後**合併**成單一排名 —— 兩者互補，relevance 更好。Hybrid search 於 **2.11** 引入。

### 2. 核心流程（心智模型）

```
query → hybrid { queries: [ subquery A, subquery B, subquery C ] }
      → 各子查詢在 query phase 各自打分（尺度不同）
      → search pipeline 的 phase_results_processor 介入（query 與 fetch phase 之間）
          → normalize（把各路分數拉到同一尺度）
          → combine（加權合併成單一分數）
      → 統一排名 → fetch phase → 回傳結果
```

關鍵：合併發生在 **search pipeline** 的 `phase_results_processors`，而非查詢本身。

### 3. 兩種 phase results processor

| | normalization-processor | score-ranker-processor |
|---|---|---|
| 版本 | 2.10 | 2.19 |
| 機制 | **分數制**：正規化再合併分數 | **排名制**：Reciprocal Rank Fusion (RRF) |
| 適用 | 想精細控制各路分數尺度/權重 | 各路分數尺度差異大、只信「名次」時更穩健 |

兩者都放在 `phase_results_processors`，二選一。

### 4. normalization-processor 細節

- **normalization.technique**：
  - `min_max`（預設）— 重新縮放到 [0,1]。可搭配 `lower_bounds` / `upper_bounds`（每路一個物件，mode = `apply` / `clip` / `ignore`；`min_score` 預設 0.0、`max_score` 預設 1.0）。
  - `l2` — L2 歐氏距離正規化。
  - `z_score` — 標準分數；**只支援 `arithmetic_mean` 合併**。
- **combination.technique**（預設 `arithmetic_mean`）：`arithmetic_mean` / `geometric_mean` / `harmonic_mean`。
- **combination.parameters.weights**：float 陣列，範圍 [0.0, 1.0]，**長度需等於 query 數、總和需為 1.0**；越接近 1.0 該路影響越大；省略則等權重。
- **調校提醒**：processor 只轉換各子查詢回傳的結果，不額外抽樣；建議 `size` 設 100–200（資料量 ≤ 10M），過大只增延遲不增 relevance。

範例（基礎 min_max + arithmetic_mean，權重 30/70）：
```json
PUT /_search/pipeline/nlp-search-pipeline
{
  "description": "Post processor for hybrid search",
  "phase_results_processors": [
    { "normalization-processor": {
        "normalization": { "technique": "min_max" },
        "combination": {
          "technique": "arithmetic_mean",
          "parameters": { "weights": [0.3, 0.7] }
        }
    } }
  ]
}
```

### 5. score-ranker-processor / RRF 細節

- **RRF**：每份文件在每一路子查詢的「名次」取倒數，再把各路倒數分數相加，形成最終統一排名。不看原始分數，只看名次，對尺度不敏感。
- **combination.technique**：`rrf`（必填）。
- **combination.rank_constant**：整數 ≥ 1，預設 **60**。值越大分數越均勻、越小越偏重前段名次。
- **combination.parameters.weights**：同 normalization，範圍 [0,1]、數量=query 數、總和=1.0。

範例：
```json
PUT /_search/pipeline/rrf-pipeline
{
  "description": "Post processor for hybrid RRF search",
  "phase_results_processors": [
    { "score-ranker-processor": {
        "combination": { "technique": "rrf", "rank_constant": 40 }
    } }
  ]
}
```

### 6. 設定兩條路

- **Automated workflow**：用 flow_framework 模板一鍵建好 ingest pipeline、index、search pipeline，只需給 model_id。
  ```json
  POST /_plugins/_flow_framework/workflow?use_case=hybrid_search&provision=true
  { "create_ingest_pipeline.model_id": "mBGzipQB2gmRjlv_dOoB" }
  ```
  完成後（state = COMPLETED）產生 `nlp-ingest-pipeline`、`my-nlp-index`、`nlp-search-pipeline`。
- **Manual setup（5 步）**：
  1. 建 ingest pipeline（`text_embedding` processor，`field_map` 把文字欄位映射成 embedding 欄位）
  2. 建 index（embedding 欄位為 `knn_vector`，維度需與模型一致）
  3. 設定 search pipeline（normalization-processor）
  4. 灌文件（自動產生 embedding）
  5. 用 hybrid query 搜尋

### 7. 貫穿範例 — 專利搜尋 pipeline（來自筆記）

```json
PUT /_search/pipeline/patent-hybrid
{
  "description": "Patent hybrid search pipeline",
  "phase_results_processors": [
    { "normalization-processor": {
        "normalization": { "technique": "min_max" },
        "combination": {
          "technique": "arithmetic_mean",
          "parameters": { "weights": [0.4, 0.3, 0.3] }
        }
    } }
  ]
}
```

三路權重對應下方查詢的三個子查詢：`tac`(0.4) / `title_embedding`(0.3) / `claims_embedding`(0.3)。

### 8. 貫穿範例 — hybrid query（來自筆記）

```json
POST /patent/_search?search_pipeline=patent-hybrid
{
  "query": {
    "hybrid": {
      "queries": [
        { "match":  { "tac": "smart office" } },
        { "neural": { "title_embedding":  { "query_text": "smart office" } } },
        { "neural": { "claims_embedding": { "query_text": "smart office" } } }
      ]
    }
  }
}
```

`queries` 陣列的順序與 pipeline `weights` 的順序一一對應。

### 9. Filtering

- **Pre-filtering（最常用）**：在 `hybrid` 加 top-level `filter`，打分**前**排除文件，等同對每一路子查詢套同一個 filter。
  ```json
  POST /products/_search?search_pipeline=nlp-search-pipeline
  {
    "query": { "hybrid": {
        "filter": { "term": { "category": "shoes" } },
        "queries": [
          { "match": { "description": "running shoes" } },
          { "knn": { "embedding": { "vector": [1.23, 0.45, 0.67], "k": 10 } } }
        ]
    } }
  }
  ```
- **Post-filtering**：在請求加 `post_filter`，打分**後**排除；**不影響 aggregation 結果**，適合 faceted search（facet 計數反映未過濾的全集，只縮小顯示的 hits）。
  ```json
  POST /products/_search
  {
    "query": { "match": { "category": "running shoes" } },
    "aggs": {
      "brands": { "terms": { "field": "brand.keyword" } },
      "colors": { "terms": { "field": "color.keyword" } }
    },
    "post_filter": { "term": { "brand.keyword": "Nike" } }
  }
  ```

---

## 投影片計畫（約 11 張）

1. **TitleSlide** — 封面。eyebrow「RD 技術分享 · 2026」，主標 Hybrid Search on OpenSearch，副標一句，標籤：BM25 + Neural / min_max / RRF / Patent Search。
2. **WhyHybridSlide** — 為什麼要 hybrid：BM25 vs 向量的優缺點對比（兩欄），帶出互補。用專利場景。
3. **ConceptSlide** — 核心流程圖（query → 多路 subquery 各自打分 → pipeline normalize+combine → 統一排名 → fetch）。
4. **ProcessorsSlide** — normalization-processor vs score-ranker-processor 並排對比卡片。
5. **NormalizationSlide** — normalization 技術 + combination 技術 + weights 規則 + 調校提醒。
6. **ScoreRankerSlide** — RRF 原理圖解 + rank_constant + 何時選 RRF。
7. **SetupSlide** — Automated workflow vs Manual setup 五步驟。
8. **PipelineConfigSlide** — 實作①：建 `patent-hybrid` pipeline，程式碼 + 逐欄說明。
9. **QuerySlide** — 實作②：下 hybrid query，三路 subquery ↔ 三個 weight 對應。
10. **FilteringSlide** — pre-filtering vs post-filtering 對比 + 範例。
11. **SummarySlide** — 重點回顧 + 決策清單。

## 元件與技術約定

- component-heavy：每頁一個 `components/<Topic>Slide.vue`，`slides.md` 為薄殼、`layout: full`。
- 共用 `SlideHeader.vue`（eyebrow / title / subtitle）。
- 不引入 shadcn ui 依賴；自製輕量 badge / card 標記，純 UnoCSS utility class。
- `style.css`：full-bleed 深底、隱藏 Slidev NavControls。
- JSON 以 Shiki 高亮。
