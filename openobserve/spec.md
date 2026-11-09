# OpenObserve 使用教學

## 注意

- 手寫風格（rough.js 手繪圖、白底藍＋琥珀；見 create-tech skill 的 sketch 模板）
- 不要使用 icon
- 注意每一頁的高度不要超過螢幕高度
- 用繁體中文（技術名詞保留原文）
- 聽眾：公司同仁（會用瀏覽器、不一定寫過 SQL），目的是教會「每一頁怎麼操作」

## 來源文件 / 參考連結

- OpenObserve 官方文件：<https://openobserve.ai/docs/>
- 架構（Ingester／WAL／Parquet）：<https://openobserve.ai/docs/architecture/>
- 儲存（Parquet、SQLite／PostgreSQL metadata）：<https://openobserve.ai/docs/administration/maintenance/storage-management/storage/>
- 使用者指南：<https://openobserve.ai/docs/user-guide/>
- RUM：<https://openobserve.ai/docs/user-guide/rum/>
- 範例欄位與數字：2026-11 實際查詢 `pi_prod` 組織（`default` logs／traces、`_rumdata`）

## 摘要

OpenObserve 把 logs、traces、RUM（以及 metrics）收在同一個平台，資料以 Parquet 存放，用 SQL 查詢。
同仁要會的是四個頁面：Logs（發生什麼事）、Traces（時間花在哪）、RUM（使用者端看到什麼）、Dashboards（長期趨勢）。

## 大綱 (Slide Plan)

Running example：**使用者回報「搜尋好慢」** —— 從 RUM 找到慢的 API、在 Traces 看慢在哪一段、用 trace_id 到 Logs 看當下發生什麼事，最後做成儀表板長期追蹤。

1. Cover —— `TitleSketch`：Logs／Traces／RUM／Dashboards 四個節點
2. 問題 —— `ProblemScene`：沒有可觀測性時只能猜；有了之後 RUM → Traces → Logs 一路追到 OpenSearch
3. 定義 —— big-quote + 網址／組織 callout
4. Part 1 基本概念
   - `OrgStreamScene`：組織 → 串流（logs／traces／RUM），組織互相隔離
   - 本專案串流表
   - `FlowScene` 資料怎麼存：送進來 → WAL＋記憶體 → Parquet 小檔 → 合併歸檔
   - 首頁卡片表
5. Part 2 Logs
   - `LogsUIScene`：畫面五個區塊逐一標出
   - 三種篩選方式 + 條件語法表
   - SQL 模式範例 + 引號 gotcha
6. Part 3 Traces
   - `WaterfallScene`：GetPatentByText 的 span 樹，最後標出 kNN → OpenSearch 最慢
   - 找慢請求的條件 + `duration` 微秒 gotcha + 統計筆數
   - 瀑布圖／span 面板／跳到 Logs
7. Part 4 RUM
   - 事件類型表
   - Performance／Sessions／Error Tracking + 隱私 gotcha
8. Part 5 Dashboards
   - `FlowScene` 做一個面板：New Dashboard → Add Panel → 拖 X／Y → Filter → Save
   - Custom SQL + 變數
9. 什麼問題看哪一頁（收回 running example）
10. 常見陷阱
11. Takeaways
12. 參考資料

---

## 詳細內容

給公司同仁的 OpenObserve 入門。照章節順序讀，每章的「練習」可以直接在正式站上操作。

- 網址：<https://openobserve.in.twpat.com/web/>
- 組織：`pi_dev`（測試站）、`pi_prod`（正式站）
- 範例欄位以本專案（快檢通，服務名稱 `pi`）送進來的資料為準

> 介面按鈕名稱依 OpenObserve 近期版本撰寫，中文介面用字或位置可能略有差異。

---

## 1. 基本概念

### 1.1 OpenObserve 是什麼

一套可觀測性（observability）平台，把三種資料收在同一個地方查：

| 資料 | 回答的問題 | 對應頁面 |
|---|---|---|
| **Logs（日誌）** | 發生了什麼事？ | Logs |
| **Traces（追蹤）** | 一個請求的時間花在哪一段？ | Traces |
| **Metrics（指標）** | 某個數字隨時間怎麼變化？ | Metrics |

另外還有 **RUM**（前端真實使用者監測），記錄使用者瀏覽器裡發生的事。

### 1.2 組織（Organization）

右上角的下拉選單用來切換組織。組織之間完全隔離，串流、儀表板、告警、權限都各自獨立。

- `pi_dev`：測試站送來的資料
- `pi_prod`：正式站送來的資料

**查不到資料時，第一件事先確認組織有沒有選對。**

### 1.3 串流（Stream）

串流就是「存一類資料的桶子」，相當於資料庫的一張表。查詢時要先選串流，再下條件。

本專案目前的串流：

| 串流 | 類型 | 內容 |
|---|---|---|
| `default` | logs | 後端應用程式的 log（API 請求、搜尋、分類、rerank 事件） |
| `default` | traces | 後端 OpenTelemetry trace |
| `_rumdata` | logs | 前端 RUM 事件：頁面瀏覽、點擊、資源載入、前端錯誤 |
| `_sessionreplay` | logs | 前端操作重播的錄影資料 |
| `_rumlog` | logs | 瀏覽器端的 console log（只有部分組織有） |
| `trace_time_index_default` | metadata | 系統為 traces 自動建立的時間索引，不用理它 |

底線開頭的串流由 OpenObserve 自動建立。目前沒有 metrics 串流。

### 1.4 資料怎麼存

OpenObserve **不用傳統資料庫存 log 本體**：

| 存什麼 | 存在哪裡 |
|---|---|
| 資料本體（log、trace、RUM） | **Parquet 檔案**（欄式壓縮格式），放本機硬碟或物件儲存（S3、MinIO 等）。公司目前存在**本機硬碟** |
| 後設資料（使用者、儀表板、告警、欄位結構、檔案清單） | 單機版用 SQLite，叢集版用 PostgreSQL／MySQL |

資料進來後先寫入 WAL（預寫日誌，防當機遺失）和記憶體緩衝區，每隔幾秒寫成小 Parquet 檔，再合併成大檔歸檔。查詢時這幾處的資料會一起查，所以**資料送出後幾秒內就查得到**。

查詢引擎是 Apache DataFusion，所以**查詢語言是 SQL**。

---

## 2. 首頁

首頁是目前組織的總覽，所有數字都只計算**目前選取的組織**。

### 串流摘要

| 欄位 | 意思 |
|---|---|
| 串流數（Streams） | 有幾個串流 |
| 事件數（Events） | 累計收了幾筆資料，一行 log、一個 span 各算一筆 |
| 攝取大小（Ingested size） | 送進來時的原始大小 |
| 壓縮大小（Compressed size） | 實際佔用的儲存空間 |
| 索引大小（Index size） | 加速搜尋用的索引佔用的空間 |

攝取大小 ÷ 壓縮大小就是壓縮率，通常在 10 倍以上。

### 功能數量

| 卡片 | 意思 |
|---|---|
| 函式（Functions） | 用 VRL 語言寫的資料加工程式，可在資料寫入時或查詢時套用 |
| 儀表板（Dashboards） | 儀表板數量 |
| 告警（Alerts） | 告警規則數量，分「排程」與「即時」兩種。這是**設了幾條**，不是現在有幾條在響 |
| 管線（Pipelines） | 資料進來後的處理流程（新版才有） |

部分版本還有每日資料量趨勢圖，可以看資料量有沒有暴增，或某天完全沒進資料（通常代表送資料的服務掛了）。

---

## 3. Logs 頁

### 3.1 畫面區塊

| 區塊 | 用途 |
|---|---|
| 串流選擇器（左上） | 選要查的串流，可以複選 |
| 時間範圍（右上） | 預設過去 15 分鐘。**查不到資料時，九成是時間範圍太短** |
| SQL Mode 開關 | 關閉時只寫條件，打開時寫完整 SQL |
| Run query 按鈕 | 執行查詢（快捷鍵 Ctrl+Enter）。旁邊的下拉選單可以設定自動刷新 |
| 直方圖 | 每段時間的筆數，突然暴增的時間點通常就是出事的時候 |
| 欄位清單（左側） | 串流的所有欄位，點開可以看每個值出現的次數 |
| 結果表（中間） | 每列一筆 log，點開以 JSON 顯示完整內容 |

### 3.2 練習：叫出資料

1. 右上角組織選 `pi_prod`。
2. 左側選單點 **Logs**。
3. 串流選 `default`。
4. 時間範圍改成 **Past 7 days**。
5. 按 **Run query**。

### 3.3 練習：展開一筆 log 並用它篩選

1. 點結果表任一列最左邊的 **▸**，展開完整 JSON。
2. 滑鼠移到某個欄位的值上，會出現 **+ / −**：
   - **+**：只看等於這個值的 log
   - **−**：排除這個值
3. 條件會自動加進查詢框，按 Run query 生效。

試試看：對 `event = api.request` 按 **−**，把大量的請求紀錄排除掉。

### 3.4 練習：用欄位清單篩選

1. 左側欄位清單上方的搜尋框輸入 `event`。
2. 點 `event`，會展開它最常出現的值和次數。
3. 在 `search.failed` 旁按 **+**，再按 Run query。
4. 滑鼠移到 `error_message` 欄位，按眼睛圖示（或 Add to table），結果表就會多出這一欄。

### 3.5 練習：自己寫條件

非 SQL 模式只要寫 WHERE 後面的條件：

```sql
event = 'search.completed' AND search_took_ms > 10000
```

| 想做的事 | 寫法 |
|---|---|
| 等於／不等於 | `severity = 'ERROR'`／`event != 'api.request'` |
| 數字比較 | `http_status_code >= 500` |
| 多個值 | `event IN ('search.failed', 'classify.label_degraded')` |
| 某欄位包含某字 | `str_match(error_message, '逾時')` |
| 不知道在哪個欄位，全部搜尋 | `match_all('timeout')` |

`match_all` 會掃全部欄位，資料量大時比較慢。知道欄位的話，盡量指定欄位查。

### 3.6 練習：用直方圖縮小時間範圍

在直方圖上**按住滑鼠左右拖曳**框選一段，時間範圍會縮小到那一段並重新查詢。

### 3.7 練習：SQL 模式做統計

打開 **SQL Mode**，寫完整 SQL：

```sql
SELECT event, severity, count(*) AS n
FROM "default"
GROUP BY event, severity
ORDER BY n DESC
```

> 串流名稱用**雙引號**，字串值用**單引號**。

按時間切分用 `histogram()`：

```sql
SELECT histogram(_timestamp, '1 day') AS d,
       count(*) AS n,
       approx_percentile_cont(search_took_ms, 0.95) AS p95_ms
FROM "default"
WHERE event = 'search.completed'
GROUP BY d ORDER BY d
```

常用聚合函式：`count(*)`、`avg()`、`min()`、`max()`、`approx_percentile_cont(欄位, 0.95)`（p95）、`count(DISTINCT 欄位)`。

### 3.8 其他功能

| 功能 | 操作 |
|---|---|
| 儲存檢視（Saved Views） | 把查詢條件和時間範圍存起來，下次一鍵套用 |
| 分享連結（Share link） | 複製網址給同事，對方打開就是同樣的條件和時間 |
| 下載 | 匯出 CSV／JSON |
| 即時跟看 | Run query 旁的下拉選單選自動刷新間隔，效果類似 `tail -f` |
| 跳到 trace | 展開有 `trace_id` 的 log，點連結跳到該請求的 trace |

### 3.9 本專案 log 常用欄位

| 欄位 | 說明 |
|---|---|
| `event` | 事件名稱：`api.request`、`search.started`／`completed`／`failed`、`classify.*`、`rerank.*` |
| `severity` | `INFO`／`WARN`／`ERROR` |
| `http_route`、`http_status_code`、`http_duration_ms` | API 請求資訊 |
| `error_code`、`error_message` | 錯誤代碼與訊息（如 `UPSTREAM_TIMEOUT`、`PATENT_NOT_FOUND`） |
| `search_mode` | `by-text`（文字檢索）／`by-patent`（找相似） |
| `search_took_ms`、`search_embed_ms`、`search_knn_ms` | 搜尋總耗時與各階段耗時（毫秒） |
| `search_text`、`search_indices`、`search_size` | 查詢內容與參數 |
| `trace_id` | 對應的 trace，可跳到 Traces 頁 |

---

## 4. Traces 頁

### 4.1 Trace 與 Span

- **Trace**：一個請求從進來到回應的完整過程。
- **Span**：過程中的一個步驟，記錄開始時間與耗時。Span 之間有父子關係，排起來像一棵樹。

一次文字檢索的 trace 範例：

```
POST /api/Search/GetPatentByText          ← 整個 API 請求
└─ search.by_text                          ← 檢索流程
   ├─ search.embed                         ← 算查詢向量
   │  └─ POST http://…/embeddings          ← 呼叫 vLLM
   └─ search.knn                           ← 向量檢索
      └─ POST http://…:9200/pat_vec_…/_search  ← 呼叫 OpenSearch
```

### 4.2 練習：叫出 trace 清單

1. 組織選 `pi_prod`，左側選單點 **Traces**。
2. 串流選 `default`，時間範圍選 Past 7 days，按 **Run query**。

畫面會出現：

- **散佈圖**：每個點是一個 trace，橫軸是時間，縱軸是耗時。**越高越慢，紅點代表有錯誤。**
- **trace 清單**：服務、操作名稱、總耗時、span 數、有無錯誤。

### 4.3 練習：找出慢的請求

```sql
operation_name = 'POST /api/Search/GetPatentByText' AND duration > 10000000
```

> ⚠️ **`duration` 單位是微秒（µs）**：1 秒 = 1,000,000，所以上面的條件代表超過 10 秒。

也可以直接在散佈圖上框選最高的那群點。

| 想找 | 寫法 |
|---|---|
| 有錯誤的 | `span_status = 'ERROR'` |
| 特定 HTTP 狀態 | `http_response_status_code = '504'`（trace 裡這個欄位是**字串**，要加引號） |
| 查詢文字含某字 | `str_match(search_text, '半導體')` |
| 只看分類 | `operation_name = 'POST /api/Search/GetPatentClassify'` |

### 4.4 統計筆數

Traces 頁通常只接受條件，不接受完整 SQL。要統計時，到 **Logs 頁**，串流類型選 **traces**、串流選 `default`，打開 SQL Mode：

```sql
SELECT count(*) AS n
FROM "default"
WHERE operation_name = 'POST /api/Search/GetPatentByText'
  AND duration > 10000000
```

### 4.5 練習：看瀑布圖

點清單任一列，進入 trace 詳細頁：

- **瀑布圖**：每條橫條是一個 span，**橫條越長越花時間**，往下縮排的是子 span。
- 一眼就能看出整個請求被哪一段拖長：是 `search.embed`，還是 `search.knn` 底下的 OpenSearch 呼叫。

試試看：分別打開一個快的和一個慢的 trace，比較哪一段變長了。

### 4.6 練習：看 span 詳細資料

點瀑布圖中的任一 span，右側面板會顯示：

| 分頁 | 內容 |
|---|---|
| Attributes | span 帶的資料，如 `search_text`、`search_indices`、`http_route`、`url_full` |
| Events | 執行過程記錄的事件，例外的錯誤訊息與堆疊在這裡 |
| Process／Resource | 哪台主機、哪個行程送出的 |

### 4.7 Trace 與 Log 互相跳轉

- Trace 詳細頁的 **View Logs** 會帶著 `trace_id` 跳到 Logs 頁，列出這次請求的所有 log。
- Logs 頁展開有 `trace_id` 的 log，可以跳回 trace。

**Trace 看時間花在哪，Log 看發生了什麼事。**

---

## 5. RUM 頁

### 5.1 RUM 是什麼

RUM（Real User Monitoring）記錄**使用者瀏覽器端**發生的事，用來回答：

- 使用者實際打開頁面要等多久？
- 使用者點了什麼？
- 前端有沒有 JavaScript 錯誤？
- 使用者說「畫面卡住」時，到底做了什麼？（看操作重播）

`_rumdata` 的事件類型（`type` 欄位）：

| type | 意思 |
|---|---|
| `view` | 一次頁面瀏覽，帶 Web Vitals 效能指標 |
| `action` | 使用者操作（點擊等） |
| `resource` | 瀏覽器載入的資源（API 請求、JS、圖片） |
| `long_task` | 主執行緒被佔用超過 50ms，會造成畫面卡頓 |
| `error` | 前端錯誤 |
| `telemetry` | SDK 自身紀錄，可忽略 |

### 5.2 練習：效能總覽（Performance）

1. 左側選單點 **RUM**，進 **Performance** 分頁。
2. 時間範圍選 Past 7 days。

**Web Vitals**（Google 定義的核心體驗指標）：

| 指標 | 意思 | 好的標準 |
|---|---|---|
| LCP | 主要內容多久出現 | ≤ 2.5 秒 |
| INP | 點擊後畫面多久有反應 | ≤ 200 毫秒 |
| CLS | 畫面有沒有亂跳 | ≤ 0.1 |

**API** 分頁的耗時是**使用者端量到的**，包含網路傳輸，會比 Traces 頁看到的伺服器端耗時長。

### 5.3 練習：工作階段與操作重播（Sessions）

1. 進 **Sessions** 分頁，會列出每次造訪的開始時間、持續時間、瀏覽器、作業系統、錯誤數。
2. 點某一列的 **▶**，進入**操作重播**：
   - 中間重現使用者看到的畫面和滑鼠動作。
   - 右側是事件時間軸（頁面切換、點擊、API 請求、錯誤），點事件會跳到那個時間點。
   - 可以調整播放速度，也可以跳過閒置時段。

> ⚠️ **隱私**：操作重播看得到使用者在畫面上輸入的內容（例如檢索文字）。重播只用於除錯，**不要截圖外流**。

### 5.4 練習：錯誤追蹤（Error Tracking）

1. 進 **Error Tracking** 分頁，相同的錯誤會歸成一組，並顯示次數、影響人數、首次與最近一次發生時間。
2. 點進一組錯誤，可以看到：
   - 錯誤訊息與 stack trace
   - 發生當下的瀏覽器、網址、使用者
   - **錯誤前的操作軌跡**，以及跳到該 session 重播的連結

### 5.5 用 Logs 頁查 RUM 原始資料

RUM 頁沒提供的統計，可以到 Logs 頁選 `_rumdata` 自己寫 SQL：

```sql
SELECT view_url, count(*) AS n,
       approx_percentile_cont(view_largest_contentful_paint, 0.75) AS lcp_p75
FROM "_rumdata"
WHERE type = 'view'
GROUP BY view_url
ORDER BY n DESC
```

> RUM 的時間欄位（`view_loading_time`、`view_largest_contentful_paint` 等）單位通常是**奈秒**，除以 1,000,000 才是毫秒。使用前先拿一筆資料對照畫面上的數字確認。

---

## 6. 儀表板（Dashboards）

### 6.1 練習：打開現有的儀表板

1. 左側選單點 **Dashboards**。
2. 清單依資料夾分組，點名稱打開（例如 `pi_prod` 的「TIS Terrain Usage Analytics」）。
3. 每一格叫做 **Panel（面板）**，一個面板就是一張圖或一個數字，背後是一段查詢。

| 右上角按鈕 | 用途 |
|---|---|
| 時間範圍 | 整個儀表板的所有面板一起變 |
| 重新整理 ⟳ | 手動刷新，或設定自動刷新（適合掛在大螢幕上） |
| 變數 | 上方的下拉選單，所有面板一起篩選 |
| 分享 | 連結會帶著目前的時間範圍和變數值 |
| 全螢幕／列印 | 投影或匯出成 PDF |

### 6.2 練習：操作單一面板

滑鼠移到面板，右上角會出現 **⋮** 選單：

| 選項 | 用途 |
|---|---|
| View | 放大檢視 |
| Edit | 看或修改背後的查詢。**學寫查詢最快的方法就是看別人的面板怎麼寫** |
| Explore／Go to Logs | 帶著查詢跳到 Logs 頁看原始資料 |
| Download | 匯出 CSV／JSON |
| Duplicate／Delete | 複製或刪除 |

在折線圖上拖曳框選可以縮小時間範圍；點圖例可以隱藏或顯示某條線。

### 6.3 練習：做一個「每日搜尋耗時 p95」面板

1. Dashboards 頁按 **New Dashboard**，命名後儲存。
2. 按 **Add Panel**。

**拖拉模式（預設）：**

1. 串流類型選 `logs`，串流選 `default`。
2. 把 `_timestamp` 拖到 **X 軸**（會自動套用 histogram）。
3. 把 `search_took_ms` 拖到 **Y 軸**，聚合方式改成 `p95`。
4. **Filters** 加上 `event` = `search.completed`。
5. 圖表類型選 **Line**，按 **Apply** 預覽，再按 **Save**。

**自訂 SQL 模式（Custom）：**

```sql
SELECT histogram(_timestamp) AS t,
       approx_percentile_cont(search_took_ms, 0.95) AS p95_ms,
       count(*) AS n
FROM "default"
WHERE event = 'search.completed'
GROUP BY t ORDER BY t
```

`histogram(_timestamp)` 不指定間隔時，會依儀表板的時間範圍自動決定時間區段。

| 圖表類型 | 適合 |
|---|---|
| Line／Area | 趨勢 |
| Bar | 分類比較 |
| Pie／Donut | 佔比 |
| Metric | 單一 KPI 數字 |
| Table | 排行榜 |
| Heatmap | 分布 |

右側設定欄可以調整單位、小數位數、圖例位置，以及顏色門檻（例如超過 3000ms 變紅）。

### 6.4 練習：加變數

1. 儀表板 **⚙ Settings → Variables → Add Variable**。
2. 類型選 **Query Values**，串流選 `default`，欄位選 `search_mode`，名稱填 `mode`。
3. 面板 SQL 加上條件 `AND search_mode = '$mode'`。

儀表板上方會出現下拉選單，可以切換 `by-text`／`by-patent`。

### 6.5 其他功能

| 功能 | 用途 |
|---|---|
| 分頁（Tabs） | 一個儀表板分成多頁 |
| 資料夾 | 依團隊或專案整理 |
| 匯出／匯入 JSON | 備份，或在組織之間搬移儀表板 |
| 報表（Reports） | 定時把儀表板產成 PDF 寄 email |

> `pi_dev` 和 `pi_prod` 的儀表板**不共用**，要跨組織使用請匯出 JSON 再匯入。

---

## 7. 什麼問題看哪一頁

| 問題 | 先看 | 接著看 |
|---|---|---|
| 使用者說「很慢」 | RUM：找該使用者的 session，看卡在哪個 API | Traces：那個 API 慢在哪一段 |
| 某個 API 變慢 | Traces：散佈圖找高點，看瀑布圖 | Logs：用 `trace_id` 找當下的 log |
| 錯誤變多 | Logs：`severity = 'ERROR'`，用 SQL 依 `error_code` 分組 | Traces：打開一筆看 span 的 Events |
| 前端出錯 | RUM Error Tracking | 操作重播，看出錯前的操作 |
| 長期趨勢、給主管看 | Dashboards | Reports 定期寄送 |

---

## 8. 常見陷阱

| 陷阱 | 說明 |
|---|---|
| 查不到資料 | 先檢查**組織**和**時間範圍** |
| 時間單位不一致 | log 的 `*_ms` 是毫秒；trace 的 `duration` 是**微秒**；RUM 的時間欄位通常是**奈秒** |
| 引號 | 串流名稱用雙引號 `"default"`，字串值用單引號 `'ERROR'` |
| 同名欄位型別不同 | log 的 `http_status_code` 是數字，trace 的 `http_response_status_code` 是字串 |
| 同名串流 | logs 和 traces 都叫 `default`，查詢前確認選對串流類型 |
| `match_all` 很慢 | 全欄位掃描，知道欄位時改用 `欄位 = '值'` 或 `str_match` |
