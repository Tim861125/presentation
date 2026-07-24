---
theme: default
colorSchema: dark
highlighter: shiki
css: unocss
title: OpenSearch Hybrid Search 技術深潛 (Part 2)
info: |
  OpenSearch Hybrid Search (混合搜尋) 技術深潛 — BM25 (Best Matching 25) 原理、Search Pipeline (搜尋流程管道) 與台灣專利多向量實戰
  RD (Research & Development, 研發) 技術分享 · 2026
transition: fade
mdc: true
layout: full
---

<TitleSlide />

<!--
講者備忘錄 (Presenter Notes):
1. 本場分享重點包含三大區塊：BM25 (Best Matching 25) 演算法原理、OpenSearch 2.10+ / 2.19+ Phase Results Processors 機制、以及台灣專利「一專利多向量」架構實戰。
2. RD (Research & Development, 研發) 團隊在處理繁體中文與專利法律文本時，常見關鍵字精確度與向量語意泛化能力的拉鋸，Hybrid Search (混合搜尋) 為最佳解答。
-->

---
layout: full
---

<BM25OverviewSlide />

<!--
講者備忘錄 (Presenter Notes):
1. BM25 (Best Matching 25) 為 Okapi BM (Best Match) 概率檢索模型第 25 次迭代版本。
2. 說明傳統 TF-IDF (Term Frequency - Inverse Document Frequency, 詞頻-逆文件頻率) 的兩大痛點：詞頻無上限爆炸與長文件 (Doc / Document) 天生高詞頻優勢。
3. 著重介紹 BM25 的三大支柱：IDF (Inverse Document Frequency, 逆文件頻率)、TF Saturated (詞頻雙曲線飽和)、與 Length Norm (Document Length Normalization, 文件長度正規化)。
-->

---
layout: full
---

<BM25FormulaSlide />

<!--
講者備忘錄 (Presenter Notes):
1. 拆解 BM25 得分公式 Score(d, q) 與 Lucene Smoothed IDF (Inverse Document Frequency) 公式。
2. 符號說明：
   - q: 查詢句 (Query)
   - t: 查詢詞 (Term)
   - d: 目標文件 (Document)
   - tf(t, d): TF (Term Frequency, 詞頻)
   - df(t): DF (Document Frequency, 包含詞 t 的文件數量)
   - N: 全庫文件總數 (Total Documents Count)
   - dl: dl (Document Length, 目標文件長度)
   - avgdl: avgdl (Average Document Length, 全庫平均文件長度)
   - k1: TF 飽和度控制參數 (預設 1.2)
   - b: 長度正規化懲罰參數 (預設 0.75)
-->

---
layout: full
---

<BM25ParamsSlide />

<!--
講者備忘錄 (Presenter Notes):
1. k1 飽和曲線：當 k1=0 時退化為 Binary Match (一票否決/命中即有分)；k1=1.2 時為預設雙曲線飽和；k1 趨近無限大時退化為傳統線性 TF (Term Frequency)。
2. b 長度正規化：b=0 時完全不對文件長度做懲罰；b=0.75 為預設適度懲罰；b=1.0 為完全按長度反比縮放。
3. OpenSearch Mapping 展示：如何在 custom similarity 中設定 custom_patent_bm25。
-->

---
layout: full
---

<BM25LimitsSlide />

<!--
講者備忘錄 (Presenter Notes):
1. BM25 vs TF-IDF (Term Frequency - Inverse Document Frequency) 歷史演進：Lucene 5 / ES (Elasticsearch) 5.x 起預設更換為 BM25。
2. BM25 四大盲點：字面鴻溝 (Lexical Gap)、缺乏語意理解 (Lack of Semantic Understanding)、同義詞與異體字處理限制。
3. 為何需要 Hybrid Search (混合搜尋)：結合 BM25 的字面精確度 (Precision) 與 Neural (神經網路向量) 的語意召回 (Recall)。
-->

---
layout: full
---

<ProcessorsOverviewSlide />

<!--
講者備忘錄 (Presenter Notes):
1. Search Pipeline (搜尋管道) 執行時機：介入於 Query Phase (查詢階段) 各路獨立打分結束後，與 Fetch Phase (抓取 Document 內文) 開始之前。
2. 比較兩大 Phase Results Processors (階段結果處理器)：
   - Normalization Processor (OpenSearch 2.10+): 基於分數 (Score-Based)，進行 Min-Max / L2 / Z-Score 正規化 + 加權平均。
   - Score Ranker Processor (OpenSearch 2.19+): 基於排名 (Rank-Based)，採用 RRF (Reciprocal Rank Fusion, 倒數排名融合)。
-->

---
layout: full
---

<NormalizationProcessorSlide />

<!--
講者備忘錄 (Presenter Notes):
1. Normalization Processor 兩階段處理：First-Stage Normalization (分數縮放) ➔ Second-Stage Combination (分數融合)。
2. 展示 Search Pipeline 的 REST (Representational State Transfer) API (Application Programming Interface) 定義 JSON。
3. 強調 weights 權重配置三大金律：長度匹配、總和等於 1.0、省略時為全路均分。
-->

---
layout: full
---

<ScoreRankerSlide />

<!--
講者備忘錄 (Presenter Notes):
1. RRF (Reciprocal Rank Fusion, 倒數排名融合) 公式：RRF_score(d) = Σ [ 1 / ( k + rank_i(d) ) ]。
2. rank_constant (k) 參數調校：k=60 為最常見預設值，能平滑兼顧首頁與前 20 名結果。
3. 實例試算：展示排名與最終 RRF 得分計算邏輯。
-->

---
layout: full
---

<NormalizationTechniqueSlide />

<!--
講者備忘錄 (Presenter Notes):
1. 三種分數正規化技術 (Normalization Techniques) 數學比較：
   - min_max: Min-Max (最小最大值縮放)，將分數映射至 [0, 1] 區間，支援 bounds 截斷。
   - l2: L2 Norm (Euclidean Norm, 歐幾里得範數/歐氏長度)，保持得分相對比例。
   - z_score: Z-Score (Standard Score, 標準分數)，以 μ (平均數 Mean) 為中心、σ (標準差 Standard Deviation) 為單位轉換，極度抗離群值。
2. 注意事項：z_score 硬性約束僅能搭配 arithmetic_mean (算術平均)。
-->

---
layout: full
---

<CombinationTechniqueSlide />

<!--
講者備忘錄 (Presenter Notes):
1. 三種分數合併技術 (Combination Techniques)：
   - arithmetic_mean (Arithmetic Mean, 算術/加權平均)：對低分寬鬆，單路高分可補足其他路，首選 Baseline。
   - geometric_mean (Geometric Mean, 幾何平均)：一票否決，單路得分為 0 則總分歸零。
   - harmonic_mean (Harmonic Mean, 調和平均)：對低分最敏感，極度懲罰單路低分。
2. 實務調校順序建議：先固定 arithmetic_mean 建立 Baseline ➔ 選取 normalization ➔ 微調 weights。
-->

---
layout: full
---

<PatentMultiVectorSlide />

<!--
講者備忘錄 (Presenter Notes):
1. 台灣專利貫穿實測：結合 TAC (Title, Abstract, Claims, 專利名稱/摘要/請求項) 向量、人名/申請人向量與 CJK (Chinese, Japanese, Korean, 中日韓) BM25 檢索。
2. 三種架構比較與 MRR (Mean Reciprocal Rank, 平均倒數排名) 評測：
   - Twofield 模式：3 臂查詢，MRR 約 0.860。
   - Nested 模式 (最佳解)：2 臂查詢 (Nested k-NN 搭配 score_mode: "max")，MRR 突破 0.907~0.921，架構最簡潔。
   - MultiDoc 模式：多文件拆分搭配 OpenSearch collapse (結果折疊)，空間膨脹且損害召回，不推薦。
3. k-NN (k-Nearest Neighbors, k-近鄰演算法) 向量檢索在 Nested 結構中的優勢。
-->

---
layout: full
---

<SummarySlide />

<!--
講者備忘錄 (Presenter Notes):
1. 生產環境落地四大決策清單：
   - BM25 扎根：k1=1.2, b=0.75 + CJK (Chinese, Japanese, Korean) 分詞。
   - Processor 選型：精確權重選 Normalization Processor，異質尺度選 Score Ranker (RRF)。
   - 正規化組合：min_max + arithmetic_mean 為最佳起手式。
   - 台灣專利最佳解：Nested 2 臂架構 (MRR > 0.90)。
-->

