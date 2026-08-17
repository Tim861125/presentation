---
theme: tech
colorSchema: dark
highlighter: shiki
css: unocss
title: OpenSearch Hybrid Search 技術深 (Part 2)
info: |
  OpenSearch Hybrid Search (混合搜尋) 技術 — BM25 (Best Matching 25) 原理、Search Pipeline (搜尋流程管道) 與台灣專利多向量實戰
  RD (Research & Development, 研發) 技術分享 · 2026
transition: fade
mdc: true
layout: full
---

<Slide1Title />

<!--
講者備忘錄 (Presenter Notes):
1. 本場分享重點包含三大區塊：BM25 (Best Matching 25) 演算法原理、OpenSearch 2.10+ / 2.19+ Phase Results Processors 機制、以及台灣專利「一專利多向量」架構實戰。
2. RD (Research & Development, 研發) 團隊在處理繁體中文與專利法律文本時，常見關鍵字精確度與向量語意泛化能力的拉鋸，Hybrid Search (混合搜尋) 為最佳解答。
-->

---
layout: full
---

<Slide2TFIDF />

<!--
講者備忘錄 (Presenter Notes):
1. TF-IDF 是 BM25 的概念起點：TF 看詞在一份文件出現幾次；IDF 看這個詞在整個資料庫有多稀有。
2. 公式中的 t 是正在計分的詞、d 是文件、N 是文件總數、df(t) 是包含該詞的文件數。特別提醒 df 不是詞的總出現次數。
3. 「量子加密」比「系統」罕見，IDF 較高，因此更能幫助搜尋結果排序。
4. 最後指出 TF-IDF 的兩個限制：重複詞仍近似線性加分，且沒有直接處理文件長度；下一張接 BM25 的改良。
-->

---
layout: full
---

<Slide3BM25Overview />

<!--
講者備忘錄 (Presenter Notes):
1. BM25 延續 TF-IDF 的優點：精準命中關鍵字與稀有技術詞更有辨識力。
2. 接著說明 BM25 的兩項實務改良：避免同一個詞重複出現就一直等比例加分，以及避免長文件天然占優勢。
3. 用「智慧辦公室」專利搜尋說明：它先找完全命中的字，再比較每份結果是否真的更聚焦。
4. 讓觀眾記住三個原則：少見技術詞較重要、重複提及會加分但不會無限加分、長文件不能只靠篇幅取勝。
-->

---
layout: full
---

<Slide4BM25Formula />

<!--
講者備忘錄 (Presenter Notes):
1. 這張不展示公式；請把 BM25 說成依序檢查三件事的裁判。
2. 詞愈罕見，愈能辨識真正相關的結果，例如「量子加密」比「系統」更有價值。
3. 同一詞被多次提到代表相關性較高，但重複堆字的效果會逐漸變小。
4. 最後會校正文件篇幅，避免長篇專利僅因字多就取得不公平優勢。
-->

---
layout: full
---

<Slide5BM25ParameterFormula />

<!--
講者備忘錄 (Presenter Notes):
1. 這張只聚焦 BM25 公式中處理詞頻與文件長度的子公式，毋須推導完整 BM25 總分。
2. 指出 k1 以琥珀色出現兩次，控制同一個詞重複出現時，加分有多快趨緩；預設 1.2 是實務折衷。
3. 指出 b 以青色出現在長度校正項，結合 dl（目前文件長度）與 avgdl（平均文件長度），避免長文天然占優勢；預設 0.75。
4. 一句話收斂：k1 管重複詞加分，b 管長文校正；下一頁再看實際調校行為與 OpenSearch 設定。
-->

---
layout: full
---

<Slide6BM25Params />

<!--
講者備忘錄 (Presenter Notes):
1. k1 只要理解為「重複關鍵字的加分力度」：預設 1.2 是讓多次提及有意義、卻不鼓勵堆字的折衷。
2. b 只要理解為「長文件的校正力度」：預設 0.75 讓長篇專利與短而聚焦的文件能公平競爭。
3. 不需推導或討論曲線；若被問到調校，建議先用預設值，再用真實查詢與標註結果評測。
4. 右側 JSON 是實作者可直接採用的 OpenSearch 設定。
-->

---
layout: full
---

<Slide7BM25Limits />

<!--
講者備忘錄 (Presenter Notes):
1. 對比重點不是演算法史，而是 BM25 解決了「重複詞無限加分」及「長文天然占優勢」兩個問題。
2. 但 BM25 仍只看字面；以「智慧辦公室」與「智能工作空間」為例，它無法自行知道兩者意思相近。
3. 因此 Hybrid Search 結合 BM25 的精準關鍵字能力與向量搜尋的語意理解能力。
-->

---
layout: full
---

<Slide8ProcessorsOverview />

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

<Slide9NormalizationProcessor />

<!--
講者備忘錄 (Presenter Notes):
1. Normalization Processor 兩階段處理：First-Stage Normalization (分數縮放) ➔ Second-Stage Combination (分數融合)。
2. 展示 Search Pipeline 的 REST (Representational State Transfer) API (Application Programming Interface) 定義 JSON。
3. 強調 weights 權重配置三大金律：長度匹配、總和等於 1.0、省略時為全路均分。
-->

---
layout: full
---

<Slide10ScoreRanker />

<!--
講者備忘錄 (Presenter Notes):
1. RRF (Reciprocal Rank Fusion, 倒數排名融合) 公式：RRF_score(d) = Σ [ 1 / ( k + rank_i(d) ) ]。
2. rank_constant (k) 參數調校：k=60 為最常見預設值，能平滑兼顧首頁與前 20 名結果。
3. 實例試算：展示排名與最終 RRF 得分計算邏輯。
-->

---
layout: full
---

<Slide11NormalizationTechnique />

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

<Slide12CombinationTechnique />

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

<Slide13PatentMultiVector />

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

<Slide14Summary />

<!--
講者備忘錄 (Presenter Notes):
1. 生產環境落地四大決策清單：
   - BM25 扎根：k1=1.2, b=0.75 + CJK (Chinese, Japanese, Korean) 分詞。
   - Processor 選型：精確權重選 Normalization Processor，異質尺度選 Score Ranker (RRF)。
   - 正規化組合：min_max + arithmetic_mean 為最佳起手式。
   - 台灣專利最佳解：Nested 2 臂架構 (MRR > 0.90)。
-->
