---
title: OpenObserve 使用教學
info: |
  OpenObserve 使用教學：Logs、Traces、RUM、Dashboards 怎麼操作
  丁吾心
colorSchema: light
layout: cover
transition: slide-left
fonts:
  provider: none
  sans: system-ui, -apple-system, "Segoe UI", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif
  mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
mdc: true
---

# OpenObserve<br>使用教學

使用者說「搜尋好慢」時，**不用再靠猜**，從前端一路追到後端。

丁吾心 · RD 技術分享

::brand::

RD Tech Talk

::art::

<TitleSketch />

---
clicks: 3
---

# 問題：使用者說「搜尋好慢」

<ProblemScene />

<!--
一個請求經過瀏覽器、pi API、vLLM、OpenSearch。
[click] 沒有可觀測性：只能一台一台登進去翻 log，靠經驗猜。
[click] 有了 OpenObserve：RUM 看到 API 等了 32 秒、Traces 看到慢在 kNN、Logs 看到 opensearch 逾時。
[click] 三種訊號靠同一個 trace_id 串起來。今天就用這個例子走過每一頁。
-->

---
layout: center
---

<div class="big-quote max-w-3xl">

OpenObserve 把 <em>logs、traces、RUM</em> 收在同一個地方，全部用 <em>SQL</em> 查。

</div>

<div class="grid grid-cols-2 gap-6 mt-10 max-w-3xl">
<div class="callout blue">

**網址.** `openobserve.in.twpat.com/web/`

</div>
<div class="callout">

**組織.** `pi_dev` 測試站、`pi_prod` 正式站

</div>
</div>

---
layout: section
---

<div class="eyebrow">Part 1</div>

# 基本概念

組織、串流、資料怎麼存

---
clicks: 2
---

# 組織與串流

<OrgStreamScene />

<div class="scene-caption">串流＝存一類資料的桶子（像一張表）。<b>查不到資料，先確認組織選對。</b></div>

<!--
每個組織有自己的一組串流。
[click] logs / traces 的 default、前端 RUM 的 _rumdata、_sessionreplay。
[click] 組織之間完全隔離，測試站做的儀表板正式站看不到。
-->

---

# 本專案的串流

| 串流 | 類型 | 內容 |
|---|---|---|
| `default` | logs | 後端 log：API 請求、搜尋、分類、rerank 事件 |
| `default` | traces | 後端 OpenTelemetry trace |
| `_rumdata` | logs | 前端事件：頁面瀏覽、點擊、資源載入、錯誤 |
| `_sessionreplay` | logs | 前端操作重播 |
| `trace_time_index_default` | metadata | 系統自建索引，不用理它 |

<div class="callout mt-6" v-click>

**Gotcha：** logs 和 traces **都有一個叫 `default` 的串流**，查之前先確認串流類型。

</div>

---
clicks: 4
---

# 資料怎麼存

<FlowScene
  :steps="['送進來\nHTTP / gRPC', 'WAL\n＋記憶體', 'Parquet\n小檔', '合併歸檔\n本機硬碟']"
  :notes="['OTel SDK / RUM SDK', '防當機遺失', '每 ~5 秒', '10 秒～10 分鐘']"
  result="送出後幾秒內就查得到 · 用 SQL 查"
/>

<div class="scene-caption">不用傳統資料庫存 log：本體是欄式壓縮的 <b>Parquet 檔</b>，使用者、儀表板等設定才放 SQLite／PostgreSQL。</div>

<!--
[click] 先寫 WAL 和記憶體，當機也不會遺失。
[click] 每幾秒寫成小 Parquet 檔。
[click] 合併成大檔歸檔，公司目前存在本機硬碟。
[click] 查詢時這幾處一起查，所以剛送進來就查得到。
-->

---

# 首頁：目前組織的總覽

| 卡片 | 意思 |
|---|---|
| **串流數** | 有幾個串流 |
| **事件數** | 累計收了幾筆，一行 log、一個 span 各算一筆 |
| **攝取／壓縮大小** | 原始大小／實際佔用空間，相除就是壓縮率（通常 10 倍以上） |
| **函式** | VRL 小程式，寫入或查詢時加工資料 |
| **儀表板／告警** | 數量。告警是「設了幾條」，不是「幾條在響」 |

---
layout: section
---

<div class="eyebrow">Part 2</div>

# Logs

發生了什麼事？

---
clicks: 5
---

# Logs 頁的五個區塊

<LogsUIScene />

<!--
[click] 左上選串流 default、右上選時間。查不到資料，九成是時間範圍太短。
[click] 下條件，Ctrl+Enter 執行。
[click] 直方圖：柱子突然變高的時間點通常就是出事的時候，可以拖曳框選。
[click] 左側欄位清單：點欄位看最常出現的值。
[click] 結果表：展開看完整 JSON，滑鼠移到值上用 + / − 篩選。
-->

---

# 下條件：三種方式

<div class="grid grid-cols-[1fr_1.3fr] gap-8">
<div>

### 不用打字

1. 展開一筆 log，值旁邊按 **+**（只看）或 **−**（排除）
2. 左側點欄位名稱，在值旁邊按 **+**

</div>
<div>

### 自己寫

| 想做的事 | 寫法 |
|---|---|
| 等於 | `event = 'search.failed'` |
| 數字比較 | `http_status_code >= 500` |
| 多個值 | `event IN ('a', 'b')` |
| 某欄位含某字 | `str_match(error_message, '逾時')` |
| 全欄位搜尋 | `match_all('timeout')` |

</div>
</div>

<div class="callout mt-6" v-click>

**Gotcha：** `match_all` 會掃全部欄位，資料量大時很慢。知道欄位就指定欄位查。

</div>

---

# SQL 模式：做統計

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### 各事件筆數

```sql
SELECT event, severity, count(*) AS n
FROM "default"
GROUP BY event, severity
ORDER BY n DESC
```

</div>
<div>

### 每天搜尋耗時 p95

```sql
SELECT histogram(_timestamp, '1 day') AS d,
       count(*) AS n,
       approx_percentile_cont(search_took_ms, 0.95) AS p95_ms
FROM "default"
WHERE event = 'search.completed'
GROUP BY d ORDER BY d
```

</div>
</div>

<div class="callout mt-6" v-click>

**Gotcha：** 串流名稱用**雙引號** `"default"`，字串值用**單引號** `'ERROR'`。

</div>

---

# Logs 頁的小工具

| 功能 | 用途 |
|---|---|
| **Saved Views** | 把條件和時間範圍存起來，下次一鍵套用 |
| **Share link** | 網址帶著條件，同事打開看到的畫面跟你一樣 |
| **下載** | 匯出 CSV／JSON |
| **自動刷新** | Run query 旁的下拉選單，效果像 `tail -f` |
| **trace_id 連結** | 展開 log 直接跳到這次請求的 trace |

---
layout: section
---

<div class="eyebrow">Part 3</div>

# Traces

時間花在哪一段？

---
clicks: 4
---

# 一次慢的文字檢索

<WaterfallScene />

<!--
Trace = 一個請求的完整過程；span = 其中一個步驟。
[click] search.by_text：檢索流程。
[click] search.embed：算查詢向量，只花 0.3 秒。
[click] search.knn：底下呼叫 OpenSearch。
[click] 橫條最長的就是兇手：時間幾乎全花在 OpenSearch kNN。
-->

---

# 找出慢的請求

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### Traces 頁：列出來

```sql
operation_name = 'POST /api/Search/GetPatentByText'
  AND duration > 10000000
```

或在**散佈圖**上框選最高的那群點。

</div>
<div>

### Logs 頁（類型選 traces）：算筆數

```sql
SELECT count(*) AS n
FROM "default"
WHERE operation_name = 'POST /api/Search/GetPatentByText'
  AND duration > 10000000
```

</div>
</div>

<div class="callout mt-6" v-click>

**Gotcha：** `duration` 單位是**微秒**，`10000000` = 10 秒。

</div>

---

# 打開一個 trace

| 地方 | 看什麼 |
|---|---|
| **瀑布圖** | 每條橫條是一個 span，**越長越花時間**，縮排是子步驟 |
| **Attributes** | `search_text`、`search_indices`、OpenSearch 的 `url_full` |
| **Events** | 例外的錯誤訊息與堆疊 |
| **View Logs** | 帶著 `trace_id` 跳到 Logs 頁 |

<div class="callout blue mt-6" v-click>

**Trace 看時間花在哪，Log 看發生了什麼事。** 兩頁靠 `trace_id` 互相跳轉。

</div>

---
layout: section
---

<div class="eyebrow">Part 4</div>

# RUM

使用者那一端看到什麼？

---

# RUM 記錄的事件

`_rumdata` 的 `type` 欄位：

| type | 意思 |
|---|---|
| `view` | 一次頁面瀏覽，帶 Web Vitals 效能指標 |
| `action` | 使用者操作，例如點擊 |
| `resource` | 瀏覽器載入的資源：API 請求、JS、圖片 |
| `long_task` | 主執行緒被佔超過 50ms，畫面會卡頓 |
| `error` | 前端錯誤 |

---

# RUM 的三個分頁

| 分頁 | 用途 |
|---|---|
| **Performance** | Web Vitals：LCP ≤ 2.5s、INP ≤ 200ms、CLS ≤ 0.1；各 API 在使用者端的耗時 |
| **Sessions** | 每次造訪的清單，按 ▶ 看**操作重播**，點時間軸上的事件可以跳轉 |
| **Error Tracking** | 相同錯誤歸成一組：stack trace、出錯前的操作、連到重播 |

<div class="callout mt-6" v-click>

**隱私：** 重播看得到使用者輸入的檢索文字，只用於除錯，**不要截圖外流**。

</div>

---
layout: section
---

<div class="eyebrow">Part 5</div>

# Dashboards

把查詢變成長期追蹤的圖

---
clicks: 5
---

# 做一個「每日搜尋耗時 p95」面板

<FlowScene
  :steps="['New\nDashboard', 'Add\nPanel', '拖 X / Y', '加 Filter', 'Save']"
  :notes="['命名、選資料夾', '選 logs / default', 'X=_timestamp Y=p95', 'event=search.completed', 'Apply 預覽後儲存']"
  result="每日搜尋耗時 p95 折線圖"
/>

<div class="scene-caption">拖拉做不到的，打開 <b>Custom</b> 直接寫 SQL。想學查詢，就對別人的面板按 <b>Edit</b> 看它怎麼寫。</div>

<!--
[click] Add Panel 進編輯器，選串流。
[click] _timestamp 拖到 X 軸，search_took_ms 拖到 Y 軸、聚合改 p95。
[click] Filters 加 event = search.completed。
[click] 圖表類型選 Line，Apply 預覽後 Save。
[click] 完成。
-->

---

# 儀表板的進階用法

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### Custom SQL ＋ 變數

```sql
SELECT histogram(_timestamp) AS t,
       approx_percentile_cont(search_took_ms, 0.95) AS p95_ms
FROM "default"
WHERE event = 'search.completed'
  AND search_mode = '$mode'
GROUP BY t ORDER BY t
```

</div>
<div>

### 其他功能

- `histogram()` 不給間隔，依時間範圍自動切
- **Variables**：`$mode` 變成上方的下拉選單
- **Tabs**：一個儀表板分多頁
- **Reports**：定時產 PDF 寄 email

</div>
</div>

<div class="callout mt-6" v-click>

**Gotcha：** `pi_dev` 和 `pi_prod` 的儀表板**不共用**，要匯出 JSON 再匯入。

</div>

---

# 什麼問題看哪一頁

| 問題 | 先看 | 接著看 |
|---|---|---|
| 使用者說「很慢」 | **RUM**：找該使用者的 session，看卡在哪個 API | **Traces**：那個 API 慢在哪一段 |
| 某個 API 變慢 | **Traces**：散佈圖找高點，看瀑布圖 | **Logs**：用 `trace_id` 看當下的 log |
| 錯誤變多 | **Logs**：用 SQL 依 `error_code` 分組 | **Traces**：看 span 的 Events |
| 前端出錯 | **RUM** Error Tracking | 操作重播 |
| 長期趨勢 | **Dashboards** | Reports 定期寄送 |

---

# 常見陷阱

| 陷阱 | 怎麼辦 |
|---|---|
| 查不到資料 | 先檢查**組織**和**時間範圍** |
| 時間單位不一致 | log `*_ms` 是毫秒、trace `duration` 是**微秒**、RUM 通常是**奈秒** |
| 引號 | 串流名稱雙引號、字串值單引號 |
| 同名欄位型別不同 | log `http_status_code` 是數字，trace `http_response_status_code` 是字串 |
| `match_all` 很慢 | 改用 `欄位 = '值'` 或 `str_match` |

---
layout: section
---

<div class="eyebrow">Takeaways</div>

# 一句話總結

<div class="text-left max-w-2xl mx-auto mt-8 text-lg leading-relaxed">

1. **先選對組織和時間：** 查不到資料多半是這兩個
2. **RUM → Traces → Logs：** 從使用者端一路追到伺服器
3. **`trace_id` 是線索：** 三種訊號靠它串起來
4. **常看的查詢做成儀表板：** 不用每次重下

</div>

---

# 參考資料

- OpenObserve 官方文件：[openobserve.ai/docs](https://openobserve.ai/docs/)
- 架構（WAL、Parquet、Ingester）：[openobserve.ai/docs/architecture](https://openobserve.ai/docs/architecture/)
- 儲存管理：[openobserve.ai/docs/…/storage](https://openobserve.ai/docs/administration/maintenance/storage-management/storage/)
- 使用者指南：[openobserve.ai/docs/user-guide](https://openobserve.ai/docs/user-guide/)
- RUM：[openobserve.ai/docs/user-guide/rum](https://openobserve.ai/docs/user-guide/rum/)
- 公司站台：[openobserve.in.twpat.com/web](https://openobserve.in.twpat.com/web/)
