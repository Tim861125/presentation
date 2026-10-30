# OpenSearch 3.3.2 k-NN 參數解析 技術深剖

主題：pat_e5_tw_v1 專利向量索引的三段 JSON（產生向量 / 建立索引 / 查詢）中，
每個參數是什麼、為什麼這樣設、代價是什麼。

## 來源文件 / 參考連結

- 來源：使用者提供之專案規格文字（e5 向量 + OpenSearch 3.3.2 實戰設定）
- k-NN Index Settings（memory_optimized_search / derived_source）
  https://docs.opensearch.org/3.3/search-plugins/knn/settings
- knn_vector Field Type（mode / compression_level / method parameters）
  https://docs.opensearch.org/3.3/field-types/supported-field-types/knn-vector
- Memory-Optimized Search
  https://docs.opensearch.org/3.3/vector-search/optimizing-storage/memory-optimized-search
- Derived Source（_source 元資料欄位）
  https://docs.opensearch.org/3.3/field-types/metadata-fields/source
- Disk-based Vector Search（on_disk 預設 faiss+hnsw+32x、自動 rescore）
  https://docs.opensearch.org/3.3/vector-search/optimizing-storage/disk-based-vector-search
- Binary Quantization（32x=1-bit / 16x=2-bit / 8x=4-bit）
  https://docs.opensearch.org/3.3/vector-search/optimizing-storage/binary-quantization
- k-NN Rescoring（oversample_factor 計算式與 clamp）
  https://docs.opensearch.org/3.3/mappings/supported-field-types/knn-memory-optimized
- k-NN Query DSL（ef_search）
  https://docs.opensearch.org/3.3/query-dsl/specialized/k-nn

## 摘要

### A. Embedding API 參數（vLLM 部署 @ 192.168.50.93:8003）

| 參數 | 是什麼 |
|---|---|
| `model` | multilingual-e5-large，輸出 1024 維 |
| `input` | 陣列，每批 32 篇；語料加 `passage: ` 前綴、查詢加 `query: ` 前綴（e5 非對稱搜尋慣例）|
| `truncate_prompt_tokens: 512` | 超過 512 token 由伺服器自動截斷；**不送截斷參數時，任一篇超過 512 token 整個請求回 400** |
| （禁送）`truncation_side` | 本專案不送，採伺服器預設截斷行為 |
| 字數上限 | 加前綴前按 Unicode 碼點截內文：安全版 500 字（必 ≤512 token）／填滿版 3,100 字（吃滿 512，多的由伺服器截掉）|

語料格式：`passage: <標題>\n\n<摘要>\n\n<權利範圍 1>\n\n<權利範圍 2>…`
查詢格式：`query: <查詢文字>`

### C. Index settings 參數（PUT pat_e5_tw_v1）

| 參數 | 是什麼 |
|---|---|
| `index.knn: true` | 啟用索引的 k-NN 功能，所有向量設定的開關前提 |
| `knn.memory_optimized_search: true` | 搜尋時不把向量全載進記憶體，直接從磁碟搜；static 設定，建索引時決定；代價：`ef_search` 不可用，候選數只能靠 `k` |
| `knn.derived_source.enabled: true` | 向量不再複製進 `_source`，查詢需要時從 k-NN 索引重組；大幅省磁碟；代價：重組較慢，不必要的 `_source` 不要要 |

### C. Mapping 參數（embeddingE5 欄位）

| 參數 | 是什麼 |
|---|---|
| `type: knn_vector` / `dimension: 1024` | 向量欄位型別；維度須與模型輸出一致 |
| `mode: on_disk` | 向量以磁碟為主（對照 `in_memory` 全載記憶體）；on_disk 預設組合即 faiss + hnsw + 32x |
| `compression_level: 32x` | 量化壓縮 32 倍 = 1-bit quantization（16x=2-bit、8x=4-bit）；設了就不能再在 method 裡自訂 encoder；4x 會改用 lucene 引擎 |
| `method.name: hnsw` | HNSW 圖索引演算法（分層可導航小世界圖）|
| `method.engine: faiss` | Meta FAISS 函式庫（另一主要選項：lucene）|
| `method.space_type: cosinesimil` | 距離函數用 cosine 相似度，適用 e5 這類正規化語意向量 |
| `parameters.m: 16` | HNSW 每層每節點最大連結數；圖越密 recall 越好、記憶體越多（建圖參數）|
| `parameters.ef_construction: 256` | 建圖時每節點候選清單長度；圖品質越好、建置越慢（只影響寫入）|

`docId: { type: keyword }` — 專利文件 ID，精確匹配欄，不参与向量搜尋。

### D. Query 參數（POST pat_e5_tw/_search）

| 參數 | 是什麼 |
|---|---|
| `size` | 最終回傳筆數（100）|
| `k` | HNSW 第一趟走圖取前 k 名 = 候選數；memory-optimized 下 `ef_search` 不可用，`k` 是唯一候選數旋鈕 → 要 5 倍候補就 `k: 500` |
| `rescore.oversample_factor` | 兩階段搜尋：第一趟用壓縮向量搜 `factor × k` 筆（結果被 clamp 到 100–10,000），第二趟由磁碟取全精度向量重排；`1.0` = 只有 k 筆進重排 |
| `_source` 白名單 | derived_source 重組有成本，只取 `docId`、`pubDate`、`apnRaw` |

### 參數聯動（重點整合）

32x 量化省 32 倍記憶體 → recall 損失靠 rescore 第二階段補回 →
memory-optimized 模式關閉 ef_search，候補大小全押在 k 上 →
k = 結果數 × 候補倍率（100 × 5 = 500）；
derived_source 再省掉 _source 裡的向量複本。
整條查詢路徑：量化圖搜 500 筆 → 全精度重排 500 筆 → 回傳 top 100。

## 大綱 (Slide Plan)

1. Cover
2. 流程總覽：產生向量 → 建索引 → 查詢（本次聚焦參數）
3. Embedding 請求參數：model / input(32 批) / truncate_prompt_tokens
4. 截斷與前綴規則：400 陷阱、500 vs 3,100 字、passage: vs query:
5. Index settings 三參數：knn / memory_optimized_search / derived_source.enabled
6. Mapping：on_disk mode 與 32x 量化（1-bit，含 8x/16x/32x 對照）
7. HNSW 參數：hnsw / faiss / cosinesimil / m / ef_construction
8. 查詢參數：size vs k、ef_search 失靈、k:500 = 5 倍候補
9. rescore 兩階段搜尋：oversample_factor 計算式與 clamp 100–10000
10. 參數聯動圖：省記憶體 → 補 recall → k 控候補
11. 總結檢查清單
12. References
13. End
