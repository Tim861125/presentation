# Spec — Hybrid Search 技術深潛 簡報

> 這是本 deck 的 source of truth。
> 本 deck 是 `opensearch-note/hybrid-search` 的**技術深潛版**，聚焦三大主題：
> 1. BM25 詳細說明
> 2. 兩種 `phase_results_processor` 詳細說明
> 3. 正規化（normalization）詳細說明
>
> 風格：延續既有視覺語言（zinc-950 深底 + emerald/blue 點綴）。
> 貫穿範例：專利搜尋（patent），查詢字串 `"smart office"`。

---

## 參考來源

- OpenSearch Hybrid Search 總覽：https://docs.opensearch.org/latest/vector-search/ai-search/hybrid-search/index/
- Normalization processor：https://docs.opensearch.org/latest/search-plugins/search-pipelines/normalization-processor/
- Score ranker processor：https://docs.opensearch.org/latest/search-plugins/search-pipelines/score-ranker-processor/
- BM25 原理（Okapi BM25）：https://en.wikipedia.org/wiki/Okapi_BM25
- Lucene BM25Similarity：https://lucene.apache.org/core/9_0_0/core/org/apache/lucene/search/similarities/BM25Similarity.html

---

## 一、BM25 詳細說明

### 1.1 什麼是 BM25？

BM25（Best Match 25）是現代搜尋引擎最主流的關鍵字排名演算法，由 Robertson & Zaragoza 等人發展，
OpenSearch / Elasticsearch 自 5.x 起預設使用。「25」代表它是 BM 系列的第 25 個版本迭代。

### 1.2 BM25 公式

```
Score(d, q) = Σ_t [ IDF(t) × ( tf(t,d) × (k1 + 1) ) / ( tf(t,d) + k1 × (1 - b + b × dl/avgdl) ) ]
```

各符號說明：

| 符號       | 說明                                      |
| ---------- | ----------------------------------------- |
| `t`        | 查詢中每個 term（單詞）                   |
| `IDF(t)`   | Inverse Document Frequency，詞的稀有度    |
| `tf(t, d)` | term frequency，t 在文件 d 中出現次數     |
| `dl`       | document length，目標文件長度             |
| `avgdl`    | 所有文件的平均長度                        |
| `k1`       | term frequency 飽和係數，預設 `1.2`       |
| `b`        | 長度正規化係數，預設 `0.75`               |

### 1.3 IDF — 詞的稀有度

```
IDF(t) = log( 1 + (N - df(t) + 0.5) / (df(t) + 0.5) )
```

| 符號     | 說明                    |
| -------- | ----------------------- |
| `N`      | 索引中的文件總數        |
| `df(t)`  | 含有 term t 的文件數    |

**直覺**：越少文件包含這個詞 → IDF 越高 → 這個詞越稀有 → 命中權重越大。
例如「的、是、在」等停用詞幾乎每份文件都有，IDF ≈ 0；「智慧辦公室」只出現在少數文件，IDF 高。

### 1.4 TF 飽和 — k1 參數

**問題**：如果 tf 純線性成長，一份文件出現 100 次「辦公室」vs 出現 1 次的差距是 100 倍，太誇張。

BM25 用 k1 控制飽和：

```
tf_saturated = tf(t, d) × (k1 + 1) / ( tf(t, d) + k1 )
```

- `k1 = 0`：tf 完全不看，只看 IDF（binary）
- `k1 = 1.2`（預設）：適度飽和
- `k1 → ∞`：退化回線性 TF

**視覺直覺**：分數隨 tf 增加，但增速越來越慢（雙曲線飽和）。

### 1.5 文件長度正規化 — b 參數

**問題**：長文件天然有更多詞，tf 自然偏高，不公平。

b 參數把 tf 對文件長度做正規化：

```
length_norm = 1 - b + b × (dl / avgdl)
```

- `b = 0`：完全不考慮文件長度
- `b = 0.75`（預設）：適度正規化
- `b = 1.0`：完全正規化（按比例折算）

長文件 dl > avgdl → length_norm > 1 → tf 有效值降低 → 分數降低。

### 1.6 BM25 在 OpenSearch 的設定

```json
PUT /patent
{
  "settings": {
    "similarity": {
      "custom_bm25": {
        "type": "BM25",
        "k1": 1.2,
        "b": 0.75
      }
    }
  },
  "mappings": {
    "properties": {
      "tac": {
        "type": "text",
        "similarity": "custom_bm25"
      }
    }
  }
}
```

### 1.7 BM25 vs TF-IDF

| 比較點         | TF-IDF       | BM25                     |
| -------------- | ------------ | ------------------------ |
| TF 飽和        | 無，線性成長 | 有，k1 控制上限          |
| 文件長度正規化 | 無           | 有，b 控制程度           |
| 可調參數       | 無           | k1, b                    |
| 現代搜尋預設   | 較舊         | OpenSearch / ES 5.x 以後 |

### 1.8 BM25 的限制（為何需要 Hybrid）

- **字面匹配**：「智慧辦公室」不等於「smart office」，必須完全有相同詞才能命中。
- **無語意理解**：「辦公空間效率提升」的專利不會被「smart office」查到。
- **同義詞問題**：除非手動設定 synonym filter，否則同義詞無法互換。
- 這正是為什麼需要加入 **Neural（向量）搜尋**互補。

---

## 二、兩種 phase_results_processor 詳細說明

### 2.1 它們在哪裡？

```
hybrid query
  ↓ query phase（多路子查詢各自打分）
  ↓ ← phase_results_processor 介入（在 query phase 和 fetch phase 之間）
  ↓ fetch phase（抓取文件內容）
  ↓ 回傳排名結果
```

`phase_results_processor` 是 search pipeline 的核心。它介入在 **query phase 結束後、fetch phase 開始前**，
把多路不同尺度的分數整合成單一排名。

### 2.2 normalization-processor（分數制）

**引入版本**：OpenSearch 2.10

**核心概念**：

1. **Normalize**：把每一路子查詢的分數，各自拉到相同尺度（例如 [0, 1]）
2. **Combine**：把各路正規化後的分數，用加權平均合成一個最終分數
3. 最終按合成分數排名

**何時使用**：
- 各路分數尺度雖然不同，但你相信分數本身是有意義的（不只是名次）
- 想精細控制各路搜尋的權重（例如 BM25 30%、向量 70%）

**完整配置範例**：

```json
PUT /_search/pipeline/patent-hybrid
{
  "description": "Patent hybrid search pipeline",
  "phase_results_processors": [
    {
      "normalization-processor": {
        "normalization": {
          "technique": "min_max"
        },
        "combination": {
          "technique": "arithmetic_mean",
          "parameters": {
            "weights": [0.4, 0.3, 0.3]
          }
        }
      }
    }
  ]
}
```

**注意事項**：

- `weights` 陣列長度 = 子查詢數量
- `weights` 總和必須等於 1.0
- 省略 weights 則各路等權重
- 建議 `size` 設 100–200（資料量 ≤ 10M），過大只增延遲

### 2.3 score-ranker-processor（排名制，RRF）

**引入版本**：OpenSearch 2.19

**核心概念**：

- 完全不看原始分數，只看每份文件在各路子查詢中的「名次（rank）」
- 用 **Reciprocal Rank Fusion（RRF）** 把各路名次合成一個分數

**RRF 公式**：

```
RRF_score(d) = Σ_i [ 1 / (k + rank_i(d)) ]
```

- `k` = rank_constant（預設 60）
- `rank_i(d)` = 文件 d 在第 i 路子查詢的排名

**直覺範例**（k=60）：

```
文件 A：BM25 排名 #2，向量排名 #1
RRF_score(A) = 1/(60+2) + 1/(60+1) = 0.01613 + 0.01639 = 0.03252

文件 B：BM25 排名 #1，向量排名 #5
RRF_score(B) = 1/(60+1) + 1/(60+5) = 0.01639 + 0.01538 = 0.03177
```

→ 文件 A 勝出，因為它在多路搜尋中排名都很前面。

**何時使用**：
- 各路分數尺度差異極大，難以正規化
- 不想花時間調 min/max 參數
- 想要更穩健、不受異常分數影響的排名

**完整配置範例**：

```json
PUT /_search/pipeline/rrf-pipeline
{
  "description": "Patent hybrid RRF pipeline",
  "phase_results_processors": [
    {
      "score-ranker-processor": {
        "combination": {
          "technique": "rrf",
          "rank_constant": 40,
          "parameters": {
            "weights": [0.6, 0.4]
          }
        }
      }
    }
  ]
}
```

**rank_constant 調校**：

| rank_constant | 效果                                        |
| ------------- | ------------------------------------------- |
| 小（10–30）   | 第 1 名優勢明顯，前段排名影響力大           |
| 預設（60）    | 均勻分布，適合大多數情況                    |
| 大（100+）    | 各名次差異縮小，接近全部平等                |

### 2.4 兩者並排比較

| 比較維度     | normalization-processor            | score-ranker-processor（RRF）         |
| ------------ | ---------------------------------- | ------------------------------------- |
| 引入版本     | 2.10                               | 2.19                                  |
| 機制         | 分數制（score-based）              | 排名制（rank-based）                  |
| 看什麼       | 正規化後的原始分數                 | 各路的排名名次                        |
| 對尺度差異   | 需要先正規化才能比較               | 天生免疫，不看分數                    |
| 調參難度     | 需要調 technique + weights         | 只需調 rank_constant（簡單）          |
| 可解釋性     | 高（分數 × 權重 = 結果）           | 中（名次倒數加總，不直觀）            |
| 適合場景     | 分數有意義、想精細控制各路影響力時 | 各路分數尺度差異大、想要穩健排名時    |

---

## 三、正規化（Normalization）詳細說明

### 3.1 為什麼需要正規化？

**問題**：BM25 和 Neural 的分數尺度完全不同。

```
BM25 分數：0.5 ~ 15.0（依 TF、IDF、文件長度而異）
Neural 分數：0.0 ~ 1.0（cosine similarity 或 dot product）
```

直接相加或平均毫無意義，必須先把各路分數拉到同一尺度。

### 3.2 三種正規化技術

#### 3.2.1 min_max（預設）

```
normalized(x) = (x - min) / (max - min)
```

結果範圍：**[0, 1]**

- 每一路子查詢的分數，各自找到最小值（min）和最大值（max）
- 把每份文件的分數按比例縮放到 [0, 1]
- 分數最高的文件得 1.0，最低的得 0.0

**進階：bounds 控制**

可加 `lower_bounds` / `upper_bounds`（每路一個物件）：

```json
"normalization": {
  "technique": "min_max",
  "parameters": {
    "lower_bounds": [
      { "mode": "apply", "min_score": 0.2 }
    ],
    "upper_bounds": [
      { "mode": "clip",  "max_score": 0.9 }
    ]
  }
}
```

| mode     | 說明                                 |
| -------- | ------------------------------------ |
| `apply`  | 用指定值取代自動計算的 min/max       |
| `clip`   | 超過 max / 低於 min 的分數截斷       |
| `ignore` | 忽略此設定，回退到自動計算           |

**缺點**：如果有異常高分文件，會壓縮其他文件的分數範圍。

#### 3.2.2 l2（L2 歐氏距離正規化）

```
normalized(x_i) = x_i / sqrt( Σ x_j² )
```

- 把分數向量視為一個多維向量，除以其 L2 norm（歐氏長度）
- 結果：整個分數向量的 L2 norm = 1
- 保持分數之間的相對比例關係

**適用**：各路分數的比例關係比絕對值更重要時。

#### 3.2.3 z_score（標準分數）

```
normalized(x) = (x - μ) / σ
```

- μ = 平均分數，σ = 標準差
- 結果：以 0 為中心，1 個標準差 = 1 單位

**注意**：z_score **只支援 `arithmetic_mean` 合併**，不能搭配 geometric_mean 或 harmonic_mean。

**適用**：分數分布不均勻、有極端值時，能更穩健地反映相對差距。

### 3.3 三種合併技術（combination.technique）

正規化完成後，把各路 [0, 1] 的分數合成一個最終分數。

#### 3.3.1 arithmetic_mean（算術平均，預設）

```
final = Σ (weight_i × score_i) / Σ weight_i
```

即加權平均。最直觀、最常用。

**設定範例（專利三路）**：

```json
"combination": {
  "technique": "arithmetic_mean",
  "parameters": {
    "weights": [0.4, 0.3, 0.3]
  }
}
```

對應 `queries[0]`（BM25 match tac）權重 40%，`queries[1]`（title_embedding）30%，`queries[2]`（claims_embedding）30%。

#### 3.3.2 geometric_mean（幾何平均）

```
final = ( Π score_i^weight_i )^(1 / Σ weight_i)
```

- 任何一路分數為 0，最終分數就為 0
- 比算術平均更「嚴格」，要求每路都有一定分數
- **適用**：希望文件必須在多路都有表現才能排高的場景

#### 3.3.3 harmonic_mean（調和平均）

```
final = Σ weight_i / Σ (weight_i / score_i)
```

- 對低分更敏感，懲罰某一路分數很低的情況
- 比 geometric_mean 更嚴格

**三種合併比較**：

| 合併方式       | 特性                            | 對低分的態度   |
| -------------- | ------------------------------- | -------------- |
| arithmetic     | 加權平均，最寬鬆                | 高分可以補低分 |
| geometric      | 任一為 0 則結果為 0             | 嚴格           |
| harmonic       | 對低分最敏感                    | 最嚴格         |

### 3.4 weights 規則

- 陣列長度 **必須等於** `hybrid.queries` 的子查詢數量
- 總和 **必須等於 1.0**（否則 pipeline 報錯）
- 省略則各路**等權重**
- 值越接近 1.0，該路影響越大

**專利場景建議**：

```
BM25（精確詞匹配）：0.4      ← 專利號、IPC 分類號等精確詞多
title_embedding：   0.3      ← 標題語意
claims_embedding：  0.3      ← 申請範圍語意
```

### 3.5 調校建議

| 建議項目            | 說明                                                        |
| ------------------- | ----------------------------------------------------------- |
| `size` 建議 100–200 | 資料量 ≤ 10M 時，過大只增延遲、不增 relevance              |
| 先用 arithmetic     | 最直觀，調 weights 最方便，作為基準線                       |
| 分數差異大時換 l2   | 若 BM25 分數比 Neural 高 10 倍，l2 比 min_max 更穩          |
| 調參順序            | 先 normalization technique → 再調 combination → 最後調 weights |
| z_score 限制        | 只搭配 arithmetic_mean，記得不要選 geometric/harmonic       |

---

## 投影片計畫（約 10–12 張）

### Deck 結構

1. **TitleSlide** — 封面。主標「Hybrid Search 技術深潛」，副標三大主題，標籤：BM25 · normalization-processor · score-ranker-processor · RRF。

2. **BM25OverviewSlide** — BM25 是什麼：一句話定義 + 歷史（Best Match 25）+ 在 OpenSearch 的地位（5.x 以後預設）。

3. **BM25FormulaSlide** — BM25 公式拆解：完整公式 + 符號對照表 + 直覺說明。左欄公式，右欄各符號 highlight 說明。

4. **BM25ParamsSlide** — k1 與 b 兩個參數的視覺化說明：k1 飽和曲線 + b 長度正規化對比，加上 OpenSearch mapping 設定範例。

5. **BM25LimitsSlide** — BM25 的限制 + 為何需要 Hybrid：字面匹配盲點 + 專利場景舉例（為何 "smart office" 找不到語意相近的專利）。

6. **ProcessorsOverviewSlide** — 兩種 processor 並排對比（延伸既有 ProcessorsSlide，加更多細節）：表格比較 + 何時選哪個決策樹。

7. **NormalizationProcessorSlide** — normalization-processor 深潛：三種 normalization technique + 三種 combination technique + weights 規則。

8. **ScoreRankerSlide** — RRF 深潛：公式 + 計算範例 + rank_constant 調校 + 何時優於 normalization-processor。

9. **NormalizationTechniqueSlide** — 三種正規化技術詳細比較：min_max / l2 / z_score 各自公式 + 圖示 + 適用情境。

10. **CombinationTechniqueSlide** — 三種合併技術比較：arithmetic / geometric / harmonic mean 公式 + 特性差異 + 專利場景建議。

11. **WeightsAndTuningSlide** — 調參實戰：weights 規則 + 專利三路權重設定 + size 建議 + 調校順序。

12. **SummarySlide** — 重點回顧 + 決策清單（選 normalization 還是 RRF？選哪種 technique？weights 怎麼調？）。

---

## 元件與技術約定

- 延續既有 hybrid-search deck 的視覺語言：zinc-950 深底、emerald/blue 點綴
- component-heavy：每頁一個 `components/<Topic>Slide.vue`，`slides.md` 為薄殼、`layout: full`
- 共用 `SlideHeader.vue`（eyebrow / title / subtitle）
- 數學公式用 monospace 字體呈現（避免引入 KaTeX 依賴）
- 比較表格大量使用，方便一眼看出差異
- JSON 以 Shiki 高亮
- 新增：`FormulaCard.vue`（公式 + 符號說明專用卡片）
- 新增：`ComparisonTable.vue`（三欄以上比較表格）

---

## 關鍵術語對照

| 英文                          | 中文說明                    |
| ----------------------------- | --------------------------- |
| BM25 (Best Match 25)          | 最佳匹配第 25 版排名演算法  |
| IDF (Inverse Document Freq.)  | 逆文件頻率，詞的稀有度      |
| TF (Term Frequency)           | 詞頻，詞在文件中出現次數    |
| k1                            | TF 飽和係數                 |
| b                             | 文件長度正規化係數          |
| phase_results_processor       | 在 query/fetch phase 間介入 |
| normalization-processor       | 分數制合併 processor        |
| score-ranker-processor        | 排名制合併 processor（RRF） |
| RRF (Reciprocal Rank Fusion)  | 倒數排名融合                |
| rank_constant                 | RRF 的 k 參數，預設 60      |
| min_max                       | 最小最大值正規化            |
| l2                            | L2 歐氏距離正規化           |
| z_score                       | 標準分數正規化              |
| arithmetic_mean               | 算術（加權）平均合併        |
| geometric_mean                | 幾何平均合併                |
| harmonic_mean                 | 調和平均合併                |

---

## 四、台灣專利多向量（TAC + 三種名稱）實作與三種儲存架構

在實務中處理台灣專利時，專利包含 **TAC（標題 Title + 摘要 Abstract + 請求項 Claims）** 內文與 **三種名稱欄位（申請人 Applicants、專利權人 Assignees、發明人 Inventors）**。

這衍生出兩種向量：
1. **TAC 向量 (`embedding`)**：專利內文產生的 512 維向量。
2. **名稱向量 (`nameEmbedding`)**：人名/公司名串接後產生的 512 維向量。

以及三種 BM25 檢索文字欄位。為了達到最高檢索品質，`applicants` / `assignees` / `inventors` 需配置 `cjk_html` 分詞器（`.text` 主欄位）供 BM25 比對。

主管與團隊研究了三種「一專利多向量」的 OpenSearch 儲存與 Hybrid Search 實作模式：

---

### 4.1 模式 1: Twofield (一 Doc 雙頂層向量欄位)

**結構特點**：每一筆專利對應 1 筆 Document，`embedding`（TAC 向量）與 `nameEmbedding`（名稱向量）分別獨立存放在 Document 頂層。

#### Index Mapping
```json
PUT /pat_vector_twofield
{
  "settings": {
    "index": { "knn": true },
    "analysis": {
      "analyzer": {
        "cjk_html": {
          "type": "custom",
          "char_filter": ["html_strip"],
          "tokenizer": "standard",
          "filter": ["cjk_width", "lowercase", "cjk_bigram"]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "docId": { "type": "keyword" },
      "title": { "type": "text", "analyzer": "cjk_html" },
      "abstract": { "type": "text", "analyzer": "cjk_html" },
      "claims": { "type": "text", "analyzer": "cjk_html" },
      "applicants": { "type": "text", "analyzer": "cjk_html", "fields": { "raw": { "type": "keyword" } } },
      "assignees": { "type": "text", "analyzer": "cjk_html", "fields": { "raw": { "type": "keyword" } } },
      "inventors": { "type": "text", "analyzer": "cjk_html", "fields": { "raw": { "type": "keyword" } } },
      "embedding": {
        "type": "knn_vector",
        "dimension": 512,
        "space_type": "cosinesimil",
        "method": {
          "name": "hnsw",
          "engine": "faiss",
          "parameters": { "m": 16, "ef_construction": 256, "encoder": { "name": "sq", "parameters": { "type": "fp16", "bits": 16 } } }
        }
      },
      "nameEmbedding": {
        "type": "knn_vector",
        "dimension": 512,
        "space_type": "cosinesimil",
        "method": {
          "name": "hnsw",
          "engine": "faiss",
          "parameters": { "m": 16, "ef_construction": 256, "encoder": { "name": "sq", "parameters": { "type": "fp16", "bits": 16 } } }
        }
      }
    }
  }
}
```

#### Hybrid Search API 查詢 (3 臂: BM25 + TAC向量 + 名稱向量)
```http
POST /pat_vector_twofield/_search?search_pipeline=hybrid-search-pipeline
Content-Type: application/json

{
  "size": 10,
  "_source": ["docId", "title", "applicants", "assignees"],
  "query": {
    "hybrid": {
      "queries": [
        {
          "multi_match": {
            "query": "台灣積體電路 半導體封裝",
            "fields": [
              "title^2",
              "abstract",
              "claims",
              "applicants^2",
              "assignees^2",
              "inventors"
            ]
          }
        },
        {
          "knn": {
            "embedding": {
              "vector": [/* 512維度向量 (Query Text / TAC 算出的向量) */],
              "k": 10
            }
          }
        },
        {
          "knn": {
            "nameEmbedding": {
              "vector": [/* 512維度向量 (Query Text 算出的向量) */],
              "k": 10
            }
          }
        }
      ]
    }
  }
}
```

---

### 4.2 模式 2: Nested (Nested 陣列儲存多向量)

**結構特點**：每一筆專利對應 1 筆 Document，內部包含一個 nested 陣列 `vectors:[{ "kind": "tac", "vec": [...] }, { "kind": "name", "vec": [...] }]`。

#### Index Mapping
```json
PUT /pat_vector_nested
{
  "settings": {
    "index": { "knn": true },
    "analysis": {
      "analyzer": {
        "cjk_html": {
          "type": "custom",
          "char_filter": ["html_strip"],
          "tokenizer": "standard",
          "filter": ["cjk_width", "lowercase", "cjk_bigram"]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "docId": { "type": "keyword" },
      "title": { "type": "text", "analyzer": "cjk_html" },
      "abstract": { "type": "text", "analyzer": "cjk_html" },
      "claims": { "type": "text", "analyzer": "cjk_html" },
      "applicants": { "type": "text", "analyzer": "cjk_html", "fields": { "raw": { "type": "keyword" } } },
      "assignees": { "type": "text", "analyzer": "cjk_html", "fields": { "raw": { "type": "keyword" } } },
      "inventors": { "type": "text", "analyzer": "cjk_html", "fields": { "raw": { "type": "keyword" } } },
      "vectors": {
        "type": "nested",
        "properties": {
          "kind": { "type": "keyword" },
          "vec": {
            "type": "knn_vector",
            "dimension": 512,
            "space_type": "cosinesimil",
            "method": {
              "name": "hnsw",
              "engine": "faiss",
              "parameters": { "m": 16, "ef_construction": 256, "encoder": { "name": "sq", "parameters": { "type": "fp16", "bits": 16 } } }
            }
          }
        }
      }
    }
  }
}
```

#### Hybrid Search API 查詢 (2 臂: BM25 + Nested KNN max)
> 說明：Nested 模式在向量臂利用 `score_mode: "max"` 原生取得 TAC 與名稱兩向量中較高相似度者，因此只需要 2 個查詢臂（BM25 + Nested KNN）。

```http
POST /pat_vector_nested/_search?search_pipeline=hybrid-search-pipeline
Content-Type: application/json

{
  "size": 10,
  "_source": ["docId", "title", "applicants"],
  "query": {
    "hybrid": {
      "queries": [
        {
          "multi_match": {
            "query": "台灣積體電路 半導體封裝",
            "fields": [
              "title^2",
              "abstract",
              "claims",
              "applicants^2",
              "assignees^2",
              "inventors"
            ]
          }
        },
        {
          "nested": {
            "path": "vectors",
            "score_mode": "max",
            "query": {
              "knn": {
                "vectors.vec": {
                  "vector": [/* 512維度向量 */],
                  "k": 20
                }
              }
            }
          }
        }
      ]
    }
  }
}
```

---

### 4.3 模式 3: Multi Doc (一向量一文件 + Collapse 去重)

**結構特點**：每個向量獨立存成 1 筆 Document（即 1 專利生成 2 筆 Doc：1 筆 `vectorKind="tac"`，1 筆 `vectorKind="name"`），內文 metadata 複製，查詢時使用 OpenSearch 的 `collapse: { "field": "patentId" }` 將同一專利折疊收斂。

#### Index Mapping
```json
PUT /pat_vector_multidoc
{
  "settings": {
    "index": { "knn": true },
    "analysis": {
      "analyzer": {
        "cjk_html": {
          "type": "custom",
          "char_filter": ["html_strip"],
          "tokenizer": "standard",
          "filter": ["cjk_width", "lowercase", "cjk_bigram"]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "patentId": { "type": "keyword" },
      "vectorKind": { "type": "keyword" },
      "title": { "type": "text", "analyzer": "cjk_html" },
      "abstract": { "type": "text", "analyzer": "cjk_html" },
      "claims": { "type": "text", "analyzer": "cjk_html" },
      "applicants": { "type": "text", "analyzer": "cjk_html", "fields": { "raw": { "type": "keyword" } } },
      "assignees": { "type": "text", "analyzer": "cjk_html", "fields": { "raw": { "type": "keyword" } } },
      "inventors": { "type": "text", "analyzer": "cjk_html", "fields": { "raw": { "type": "keyword" } } },
      "embedding": {
        "type": "knn_vector",
        "dimension": 512,
        "space_type": "cosinesimil",
        "method": {
          "name": "hnsw",
          "engine": "faiss",
          "parameters": { "m": 16, "ef_construction": 256, "encoder": { "name": "sq", "parameters": { "type": "fp16", "bits": 16 } } }
        }
      }
    }
  }
}
```

#### Hybrid Search API 查詢 (2 臂: BM25 + KNN + Collapse)
```http
POST /pat_vector_multidoc/_search?search_pipeline=hybrid-search-pipeline
Content-Type: application/json

{
  "size": 20,
  "_source": ["patentId", "title", "applicants", "vectorKind"],
  "collapse": {
    "field": "patentId"
  },
  "query": {
    "hybrid": {
      "queries": [
        {
          "multi_match": {
            "query": "台灣積體電路 半導體封裝",
            "fields": [
              "title^2",
              "abstract",
              "claims",
              "applicants^2",
              "assignees^2",
              "inventors"
            ]
          }
        },
        {
          "knn": {
            "embedding": {
              "vector": [/* 512維度向量 */],
              "k": 20
            }
          }
        }
      ]
    }
  }
}
```

---

### 4.4 三種儲存模式評測小結

1. **Nested Hybrid (TAC+名稱)**：實測為**最佳整體品質**組合（MRR 達 0.907 ~ 0.921），2 臂查詢設計優雅。
2. **Twofield Hybrid (TAC+名稱)**：在把公司名/人名納入 BM25 分詞比對後，MRR 從 0.53 跳升至 0.860。
3. **Multidoc**：儲存空間增加近 2 倍，且深層召回受 Collapse 去重影響顯著下降，不建議採用。

