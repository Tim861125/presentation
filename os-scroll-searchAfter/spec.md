# Spec — OpenSearch / ES 深度分頁：Scroll vs search_after

> 這是本 deck 的 source of truth。slides.md / components 皆由此蒸餾。
> 主題：分頁（pagination / deep pagination）的四种方法，重點比較 **Scroll** 與 **search_after**，並帶出當代推薦解 **PIT + search_after**。
> 適用版本：OpenSearch 2.x / 3.x、Elasticsearch 7.x / 8.x，兩者 REST 語義幾乎相同，差異處會單獨標注。

## 原始筆記來源

- OpenSearch — Paginate search results：https://docs.opensearch.org/latest/search-plugins/searching-data/paginate/
- OpenSearch — Point in Time：https://docs.opensearch.org/latest/search-plugins/searching-data/point-in-time/
- OpenSearch — Scroll API：https://docs.opensearch.org/latest/api-reference/search/scroll/
- Elasticsearch — Paginate search results：https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html
- Elasticsearch — search_after：https://www.elastic.co/guide/en/elasticsearch/reference/current/search-after.html
- Elasticsearch — Point in time API：https://www.elastic.co/guide/en/elasticsearch/reference/current/point-in-time-api.html

---

## 0. 問題背景：為什麼深度分頁是個問題

OpenSearch / ES 的索引是**分散式**的：結果分散在多個 shard 上，每個 shard 各自維持一個大小為 `from + size` 的優先隊列（priority queue）， coordinating node 再合併所有 shard 的候选。

- **成本是 O(shards × (from + size))**：翻到第 10,000 筆時，每個 shard 都要產生 10,000 筆候选再丟掉 9,990 筆 —— 越翻越貴，而且大部分工作被報廢。
- 因此 `from` + `size` 預設被 **`index.max_result_window`（預設 10,000）** 擋掉：`from + size > 10000` 直接回 `search_phase_execution_exception`。
- **狀態問題**：`from` + `size` 是 stateless 的，每次都打「当下最新」的索引。兩頁之間若有文件新增/刪除/改分數，會造成**重複**或**漏失**（例：新文件插進第 1 頁，把原本第 1 頁最後一筆挤到第 2 頁 → 用戶看到兩份）。

一句話總結三種需求的分裂：
- 要**快照一致性** → Scroll（或 PIT）
- 要**省資源的游標** → search_after
- 兩者都要 → **PIT + search_after**

---

## 1. from + size（對照組）

```json
GET shakespeare/_search
{
  "from": 10,
  "size": 10,
  "query": { "match": { "play_name": "Hamlet" } }
}
```

- 頁面換算：`from = size × (page_number − 1)`。
- 上限 10,000（`index.max_result_window`）、深頁成本高、結果不凍結。
- 適用：前端「前幾頁」的傳統分頁。不適用：全量匯出、深度翻頁。

---

## 2. Scroll：凍結的快照游標

### 2.1 機制（心智模型）

1. 第一次請求帶 `scroll=10m`：OpenSearch 在**每個 shard** 上建立一個 **search context** —— 記住「這次查詢對應哪些 Lucene segment、每個 segment 掃到哪裡」。
2. 回應附 `"_scroll_id"`；後續只跟 `_search/scroll` 要下一批，**不帶 query**。
3. 每次 scroll 請求會**重置 keep-alive 倒數**（`scroll=10m` 指「距下次請求最多閒置 10 分鐘」，不是總時限）。
4. 結果被凍結在建立當下：之後的新增/更新/刪除**不會**反映；已刪除的文件仍會被回傳（fetch 階段標記為 deleted）。

### 2.2 REST 範例

首批：
```json
GET shakespeare/_search?scroll=10m
{ "size": 10000 }
```

續批（scroll_id 可能會換，**永远用回應裡最新的那個**）：
```json
GET _search/scroll
{
  "scroll": "10m",
  "scroll_id": "DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAAAAUWdmpUZDhnRFBUcWFtV21nMmFwUGJEQQ=="
}
```

用完**務必手動釋放**（否則 context 佔著記憶體直到逾時）：
```json
DELETE _search/scroll/{scroll_id}
DELETE _search/scroll/_all
```
回應：`{ "succeeded": true, "num_freed": 1 }`

### 2.3 特性與代價

| 面向 | 說明 |
|---|---|
| 一致性 | 快照：整個 scroll 期間結果集合固定 |
| 深度上限 | 無上限，可掃全量（官方文件舉例：ML job 要拉 >1 PB 資料時用 scroll） |
| 翻頁方向 | **只能往前**；某一頁請求失敗 = 那批資料直接跳過 |
| 綁 query | search context 綁定最初那個查詢，中途不能換 query |
| 資源 | 每個 open context 佔 segment 記憶體與 heap；節點有 `search.max_open_scrolls` 上限（預設 500） |
| 即時用戶查詢 | 官方明言：**不要**給一般用戶查詢用 scroll，改用它 ↓ |

### 2.4 Sliced scroll：並行加速

單线程 sequential 掃 1,000,000 筆 × 每批 50,000 = 20 次串行請求。把 scroll 切成 N 個 slice，每個 slice 一條线程平行掃：

```json
GET shakespeare/_search?scroll=10m
{
  "slice": { "id": 0, "max": 10 },
  "query": { "match_all": {} }
}
```

每個 slice 各開一個 scroll context（記憶體 ×N）；`id` 逐 1 遞增。適合 ETL／全量重索引。

---

## 3. search_after：即時、免状态的游標

### 3.1 機制

- 概念：**「給我排在這一筆之後的 N 筆」**。上一頁最後一筆文件的 `sort` 值陣列，就是下一頁的入場券。
- 每個請求都是**全新、獨立**的查詢 —— 節點端**不保留任何 context**，所以每個 shard 只需維持 `size` 大小的隊列（而非 `from + size`），成本 O(shards × size)，與深度無關。
- **必須有 sort**；且 sort 組合必須全序（total order）—— 最後要補一個**唯一 tiebreaker**（如 `line_id`、`_id` 不建议、慣用 `_shard` + `doc`／ES 7.12+ 的 `_shard_doc`），否則同分值文件會漏。

### 3.2 REST 範例

第一頁（排序要含唯一欄位）：
```json
GET shakespeare/_search
{
  "size": 3,
  "query": { "match": { "play_name": "Hamlet" } },
  "sort": [
    { "speech_number": "asc" },
    { "line_id": "asc" }
  ]
}
```

回應中每筆 hit 帶 `"sort": [1, 32436]`。取最後一筆的 sort 值換下一頁：
```json
GET shakespeare/_search
{
  "size": 10,
  "query": { "match": { "play_name": "Hamlet" } },
  "search_after": [1, 32436],
  "sort": [
    { "speech_number": "asc" },
    { "line_id": "asc" }
  ]
}
```

### 3.3 特性與限制

| 面向 | 說明 |
|---|---|
| 資源 | 免 search context，最輕；無 10,000 上限 |
| 一致性 | **不凍結**：兩頁之間索引/刪除文件，排序可能變 → 可能重複或漏（與 from/size 同類問題，只是不會報錯） |
| 翻頁方向 | 順著 sort 值走，實務上等於只能往前（要「上一頁」得反轉 sort 再翻回，麻煩） |
| 綁 query | 不綁。每頁請求可改 query/filter（但 **sort 必須保持一致**） |
| 引入版本 | ES 5.3 起；OpenSearch 繼承自 ES 7.x 分支，1.x 即有 |

---

## 4. Scroll vs search_after 逐項比較（deck 主頁素材）

| | **Scroll** | **search_after** |
|---|---|---|
| 資料視野 | 建立時的快照（凍結） | 當下最新（不凍結） |
| 服務端狀態 | 有：每 shard 一個 search context | 無：免状态游標 |
| 記憶體成本 | 高（context 常駐直到逾時/關閉） | 低（每請求 O(shards × size)） |
| 單次請求深度成本 | O(size)，批次很便宜 | O(shards × size)，與深度無關 |
| 10,000 上限 | 無 | 無 |
| 中途改 query | 不可（綁初始 query） | 可（sort 不可變） |
| 可回上一頁 | 不可（只能往前） | 實質不可（需反轉 sort） |
| 失敗重試 | 失敗的那批會跳過 | 冪等：重發同一個 sort 值即可 |
| 並行 | sliced scroll（N 個 context） | 天然可並行多個独立游標 |
| 推薦場景 | 一次性全量匯出／reindex（舊做法） | 大量連續翻頁、可容忍微小漂移 |
| 官方態度 | 「不建議用於一般用戶查詢」 | 官方明確用它取代 scroll 的翻頁場景 |

**一句話**：scroll 用「服務端記住你掃到哪」換取一致性，search_after 用「客戶端帶著座標回來」換取輕量 —— 而 PIT 把兩者的好處湊齊。

---

## 5. PIT（Point in Time）+ search_after：現代推薦

### 5.1 機制

- `POST /<index>/_search/point_in_time?keep_alive=1h` → 回 `pit_id`。
- PIT 把索引当下的 **Lucene segment 集合鎖定**（segment merge 時保留舊 segment 副本直到 `keep_alive` 到期）＝ 快照語義，但：
  - **不綁 query**：同一 PIT 上可以跑不同 query；
  - **前後皆可翻**：同一 PIT + 同一 sort，第 1 → 2 → 1 頁結果完全可重複（可「回上一頁」）。
- 分頁靠 PIT + search_after 組合：`search` 請求裡帶 `"pit": { "id": "...", "keep_alive": "100m" }` + `sort`，下一頁再帶上最後一筆的 `search_after`，`pit_id` 不變（注意：pit_id 每次回應可能被刷新，用最新的）。
- PIT 不含 live 段：PIT 建立後新 index 的文件搜不到（要看到新資料需重開 PIT）；文件刪除同理不可見。

### 5.2 REST 範例

```json
POST shakespeare/_search/point_in_time?keep_alive=15m
```

第一頁：
```json
GET _search
{
  "size": 10000,
  "query": { "match": { "play_name": "Hamlet" } },
  "pit": { "id": "<pit_id>", "keep_alive": "100m" },
  "sort": [{ "line_id": "asc" }]
}
```

下一頁（同 query、同 pit.id、同 sort + search_after）：
```json
GET _search
{
  "size": 10000,
  "query": { "match": { "play_name": "Hamlet" } },
  "pit": { "id": "<pit_id>", "keep_alive": "100m" },
  "sort": [{ "line_id": "asc" }],
  "search_after": [14186]
}
```

收尾：
```json
DELETE _search/point_in_time            // 或 /_all
```

### 5.3 Search slicing（PIT 版並行）

新版 OpenSearch 的 PIT search 也支援 `slice: { id, max }`：1,000,000 筆 × 50,000/批，用 5 個 slice × 5 条线程並行消費，取代單一長串串行呼叫。

### 5.4 版本與官方態度

| 事件 | 版本 |
|---|---|
| search_after | ES 5.3；OpenSearch 各版本皆可 |
| PIT | ES 7.10（beta）→ 7.12（GA，pit 放 search body）；OpenSearch 2022 年底引入（2.4/2.5 週期文件即收錄） |
| SQL plugin 預設分頁改用 PIT、Scroll API 棄用 | OpenSearch 3.0（breaking change） |
| 官方表態 | OpenSearch PIT 文件：**「PIT + search_after 是首選分頁法，尤其深度分頁」**；scroll 文件：不建議用於一般用戶查詢 |

### 5.5 四方法決策矩陣

| 需求 | 選什麼 |
|---|---|
| 前端前幾頁、可容忍漂移 | from + size（≤10,000） |
| 深度翻頁、允許輕微不一致 | search_after |
| 深度翻頁、要快照一致 + 可回上一頁 + 可換 query | **PIT + search_after（推薦預設）** |
| 一次性全量匯出／reindex，懶得管 PIT 續期 | scroll（或 PIT + slicing） |

---

## 6. 常見坑（distill 時可當 Callout）

1. **search_after 沒給唯一 tiebreaker** → 同 sort 值的文件被整批跳過。最後一個 sort 放 `_shard`+`_doc` 排序或唯一業務欄。
2. **scroll keep-alive 誤解** → 它是「閒置逾時」，每批請求都會續期；批次處理時間可能超過 keep-alive 時要拉長，而非擔心「總時限」。
3. **scroll_id 會變** → 每次都存回應中最新的 scroll_id。
4. **忘 close scroll / PIT** → context 常駐吃記憶體，`search.max_open_scrolls` / `search.max_open_pit_context`（預設 300）耗尽後新請求報錯。
5. **跨集群/節點故障** → scroll context 與 PIT 都不是持久化的，node fail 全丟，客户端要能重建。
6. **PIT 看不到 PIT 後的新資料** → 需要「跟到新數據」的場景（如即時 feed）反而是裸 search_after 的領域。
