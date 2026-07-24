# Hybrid Search 技術深潛簡報大綱 (Slide Deck Structure)

來源規格說明文件：[hybrid-search-deep-dive-spec.md](file:///home/tim/githubRepo/presentation/spec/hybrid-search-deep-dive-spec.md)

---

## 📊 簡報簡介 (Deck Executive Summary)
- **主題**：OpenSearch Hybrid Search 技術深潛與台灣專利實戰
- **視覺風格**：Dark Mode (Zinc-950 背景 + Emerald/Blue 點綴)
- **核心內容**：
  1. **BM25 演算法**（IDF、TF 飽和與長度正規化）
  2. **Phase Results Processors**（Score-based Normalization vs Rank-based RRF）
  3. **Normalization & Combination 數學機制**（min_max, l2, z_score 與加權/幾何/調和平均）
  4. **台灣專利多向量儲存架構與評測**（Twofield, Nested, MultiDoc）

---

## 🖼️ 簡報頁數規劃 (Slide Breakdown)

### Slide 1: 封面 — OpenSearch Hybrid Search 技術深潛
- **主標題**：OpenSearch Hybrid Search 技術深潛
- **副標題**：從 BM25 原理、Search Pipeline 到台灣專利多向量實戰
- **標籤**：`BM25` · `normalization-processor` · `score-ranker-processor (RRF)` · `Multi-Vector`

---

### Slide 2: BM25 原理與核心公式
- **重點內容**：
  - **定義**：Best Match 25，現代搜尋預設關鍵字排名演算法 (OpenSearch/ES 5.x+)。
  - **核心公式**：
    $$\text{Score}(d, q) = \sum_{t \in q} \text{IDF}(t) \cdot \frac{\text{tf}(t, d) \cdot (k_1 + 1)}{\text{tf}(t, d) + k_1 \cdot \left(1 - b + b \cdot \frac{\text{dl}}{\text{avgdl}}\right)}$$
  - **符號與直覺**：
    - $\text{IDF}(t)$：詞的稀有度，越少出現的詞權重越高。
    - $k_1$：TF 飽和係數（預設 1.2），避免重複詞無限制加分。
    - $b$：長度正規化係數（預設 0.75），消除長文件天然詞頻偏高優勢。
  - **BM25 限制**：無法理解語意（「智慧辦公室」≠「smart office」），因此需結合向量搜尋。

---

### Slide 3: 兩種 phase_results_processor 比較
- **介入時機**：在 **Query Phase** 結束後、**Fetch Phase** 開始前介入多路打分整合。
- **比較表格**：

| 維度 | Normalization Processor | Score Ranker Processor (RRF) |
| :--- | :--- | :--- |
| **機制** | 分數制 (Score-based) | 排名制 (Rank-based) |
| **核心算法** | Min-Max / L2 / Z-Score + 加權平均 | Reciprocal Rank Fusion ($RRF\_score = \sum \frac{1}{k + r_i}$) |
| **優勢** | 可精細控制各路權重 (如 BM25 40%, KNN 60%) | 天生免疫分數尺度差異，免調複雜正規化參數 |
| **適用場景** | 各路分數有意義、需精細調權重時 | 各路分數尺度差異極大、追求穩健排名時 |

---

### Slide 4: 分數正規化與合併技術 (Normalization & Combination)
- **正規化技術 (Normalization)**：
  - **`min_max`** (預設)：$\frac{x - \text{min}}{\text{max} - \text{min}} \rightarrow [0, 1]$，可加 bounds 截斷。
  - **`l2`**：除以歐氏長度 $\sqrt{\sum x_j^2}$，保持相對比例。
  - **`z_score`**：$\frac{x - \mu}{\sigma}$，適用分布不均或極端值。
- **合併技術 (Combination)**：
  - **Arithmetic Mean**（算術平均）：$Final = \sum w_i s_i$，最常見，高分可補低分。
  - **Geometric Mean**（幾何平均）：任一為 0 即為 0，要求多路兼具。
  - **Harmonic Mean**（調和平均）：對低分最敏感，懲罰單路低分。

---

### Slide 5: 台灣專利「一專利多向量」三種儲存架構與評測
- **背景情境**：台灣專利包含內文 (TAC) 向量與名稱 (Applicants/Assignees/Inventors) 向量。

#### 三種架構比較：
1. **Twofield 模式（雙頂層欄位）**：
   - 1 Doc / 2 Vector 欄位 (`embedding`, `nameEmbedding`)。
   - 查詢：3 臂（BM25 + TAC KNN + Name KNN）。
2. **Nested 模式（Nested 陣列）**：
   - 1 Doc / Nested `vectors: [{kind, vec}]`。
   - 查詢：2 臂（BM25 + Nested KNN `score_mode: "max"`）。
3. **MultiDoc 模式（一向量一文件）**：
   - 1 專利分拆為 2 Doc，搭配 `collapse` 去重。

#### 實測結論 (MRR 評測)：
- 🏆 **Nested Hybrid**：**品質最佳**（MRR 達 `0.907 ~ 0.921`），2 臂設計簡潔。
- 🥈 **Twofield Hybrid**：納入 CJK BM25 後 MRR 從 `0.53` 提升至 `0.860`。
- ❌ **MultiDoc**：儲存空間暴增近 2 倍，且深層召回率受 collapse 影響大幅下降，**不建議採用**。

---

## 🎯 建議簡報呈現方式 (Actionable Next Steps)
- 若要製作可互動的 HTML/Slidev 簡報，建議使用每頁獨立 Component 架構。
- 數學公式使用 monospace 或 LaTeX 渲染呈現清晰對比。
