# 快檢通後端 Log → OpenObserve（OpenTelemetry Logs SDK × Nuxt 4 / Bun）

## 注意

- 手寫風格（rough.js 手繪圖、白底藍＋琥珀；見 create-tech skill 的 sketch 模板）
- 不要使用 icon（只用 ✓ / ✗ 表示完成 / 未完成）
- 注意每一頁的高度不要超過螢幕高度
- 用繁體中文（技術名詞保留原文）
- 聽眾：RD 同仁。重點是**決策脈絡**（為什麼這樣選、踩了什麼坑），程式碼只擷取關鍵片段
- 不重複 OpenObserve 基礎介紹（另見 `openobserve/` 使用教學、`openobserve-logging/` 前後端 log 教學），本 deck 只一頁帶過 org / stream / OTLP 端點
- Running example：快檢通一次「文字檢索」`POST /api/Search/GetPatentByText`，它會留下兩筆 log：
  - API 存取：`[api] POST /api/Search/GetPatentByText 200 1235ms ip=10.0.0.1 app=IPTech_CC user=alice`
  - 上游呼叫（查詢 embedding 走 patentpilot）：`[patentpilot] ask-question ok 200 842ms prompt=PesEmbeddingSearchPrompt cache=true tokens=120`
  （兩行皆取自 `server/utils/log.test.ts` 的預期值）

## 來源文件 / 參考連結

- patent-embedding-search（未 commit 的工作區改動，`git diff` + 新檔）
  - `server/utils/log.ts`：`writeLog` / `writeApiLog` / `startUpstreamLog`、attributes builder
  - `server/utils/otel-logs.ts`：`openObserveLogsExport`、`openObserveAuthHeader`（純函式）
  - `server/plugins/00.otel-logs.ts`：註冊全域 `LoggerProvider`、關機 flush
  - `server/plugins/api-log.ts`、`server/utils/errors.ts`、`server/utils/handoff.ts`、`server/plugins/ensure-pipeline.ts`：改走 `writeLog`
  - `server/utils/config.ts`、`nuxt.config.ts`、`.env.example`：`openobserve*` 設定
  - `CLAUDE.md`「Logging → OpenObserve」段
- OpenObserve OTLP log ingestion：<https://openobserve.ai/docs/ingestion/logs/otlp/>
- OpenTelemetry JS：<https://opentelemetry.io/docs/languages/js/>
- `@opentelemetry/sdk-logs`：<https://www.npmjs.com/package/@opentelemetry/sdk-logs>
- `@opentelemetry/exporter-logs-otlp-http`：<https://www.npmjs.com/package/@opentelemetry/exporter-logs-otlp-http>
- `@openobserve/pino-openobserve`：<https://www.npmjs.com/package/@openobserve/pino-openobserve>
- pino transports：<https://getpino.io/#/docs/transports>
- evlog：<https://www.npmjs.com/package/evlog>
- Nitro plugins：<https://nitro.build/guide/plugins>
- 本 repo 相關簡報：`openobserve/`（OpenObserve 使用教學）、`openobserve-logging/`（pes-ipc 前端 RUM × 後端 OTel）

## 摘要

### 背景

快檢通（patent-embedding-search）是 Nuxt 4 SPA + Nitro server，build / runtime 都是 Bun（Nitro Bun preset），部署在 Rancher 上的 docker 容器。原本 server log 全是 `console.*` 印到 stdout 的單行字串（`[api] …`、`[patentpilot] …`），要查只能進容器 `docker logs | grep`，容器重建就沒了、也無法統計或告警。目標：**把後端 log 送進 OpenObserve，且不破壞既有 stdout 單行格式**。

### 1. 選型

| 方案 | 優點 | 卡關點 |
| --- | --- | --- |
| pino + `@openobserve/pino-openobserve` | OpenObserve 官方 transport | 停在 1.0.0、預設 5 分鐘才送一批；pino transport 跑 worker thread，在 Bun / Nitro 打包產物下有找不到 transport target、process 不退出、exit code 錯等已知問題 |
| evlog | Nuxt 原生 wide-event | 要改寫整個 log 架構（一請求一事件），改動面太大 |
| consola 自寫 reporter | Nuxt 生態原生 | 批次、重試、背壓都要自己寫 |
| 主機端 collector（Vector / Fluent Bit） | 應用零改動 | 要能動 Rancher 主機 / 加 sidecar，不在我們手上 |
| **官方 OpenTelemetry Logs SDK**（選用） | 官方維護、內建批次 / 重試、純 JS 無 worker、Bun 打包可用；OpenObserve 原生收 OTLP | 需要自己接 `writeLog` 與關機 flush |

套件（`package.json`，皆為 `dependencies`）：

```json
"@opentelemetry/api": "~1.10.0",
"@opentelemetry/exporter-logs-otlp-http": "^0.301.2",
"@opentelemetry/resources": "^3.1.1",
"@opentelemetry/sdk-logs": "^3.1.1",
```

注意：新版 logs API 已併入 `@opentelemetry/api`（1.10 內建 `logs`、`SeverityNumber`），**不再需要 `@opentelemetry/api-logs`**（`openobserve-logging/` 那份 pes-ipc 用的是 `api-logs` + `sdk-node` + `--import`；本專案只送 log、不開 trace，直接在 Nitro plugin 裡建 provider）。

### 2. 架構：一行 log，兩個出口

- 所有 server log 走 `writeLog(level, line, attributes?, err?)`（`server/utils/log.ts`），或其包裝 `writeApiLog` / `startUpstreamLog`。server code 不再直接呼叫 `console.*`。
- `writeLog` 同時：
  1. 寫 stdout 單行字串（info→`console.log`、warn→`console.warn`、error→`console.error`），保留 grep 習慣
  2. `logs.getLogger("patent-embedding-search").emit({ severityNumber, severityText, body: line, attributes })`
- 兩側各自 `try/catch`，記錄失敗絕不影響主流程。
- attributes：`compactAttributes` 去掉 `undefined` / 空字串（OTel 不接受 undefined）。`log.type` 預設 `app`。
- 結構化欄位（OTel semconv 命名；OpenObserve 入庫時 `.` 攤平成 `_`）：

| log.type | 來源 | 主要 attributes |
| --- | --- | --- |
| `api` | `api-log.ts` → `writeApiLog` | `http.request.method`、`url.path`、`url.query`、`http.response.status_code`、`duration_ms`、`client.address`、`app.id`、`enduser.id`、`error.code` |
| `upstream` | `startUpstreamLog(service, action)` | `upstream.service`、`upstream.action`、`upstream.outcome`、`http.response.status_code`、`duration_ms`、`error.message`、`upstream.<extra>` |
| `app` | 其他 `writeLog` | 自訂；帶 `err` 時加 `exception.type` / `exception.message` / `exception.stacktrace`（截 4000 字）、`error.code`、`error.details`（截 300 字） |

- 全域 `LoggerProvider` 只在設了 `NUXT_OPENOBSERVE_URL` 時由 `server/plugins/00.otel-logs.ts` 註冊；沒設 → `logs.getLogger()` 回 no-op logger，dev / 測試完全不送。
- 檔名 `00.`：Nitro plugin 依檔名排序執行，要比 `ensure-pipeline` 等會寫 log 的 plugin 先註冊。
- `BatchLogRecordProcessor`：背景批次送出，不阻塞請求；OpenObserve 掛掉時佇列滿了就丟，不影響 API；送出失敗經 OTel `diag`（`DiagLogLevel.ERROR`）印到 stderr。
- 依然不記 request body（by-text 的 text 上限 8000 字、classify 帶整頁結果）與 SSO token。
- 測試：`log.test.ts` 用 `InMemoryLogRecordExporter` + `SimpleLogRecordProcessor` 掛全域 provider，驗證 emit 出的 record。

### 3. OpenObserve 端點

- OTLP/HTTP logs：`{url}/api/{org}/v1/logs`
- `stream-name` header 指定 stream
- `Authorization: Basic …`（設定值已帶 `Basic ` / `Bearer ` 原樣用，否則視為 base64(email:token) 補 `Basic `）
- HTTP 不需要 `organization` header（org 已在路徑；該 header 只用於 gRPC）
- resource：`service.name=patent-embedding-search`、`service.version=<appVersion>`、`deployment.environment.name=<env>`
- 純函式 `openObserveLogsExport(cfg)` 組出 `{ url, headers, resourceAttributes }`，未設 URL 回 `null`（可單元測試）

設定（`nuxt.config.ts` runtimeConfig ← `NUXT_*` env）：

```bash
# NUXT_OPENOBSERVE_URL=https://openobserve.example.com   # 留空＝不送
NUXT_OPENOBSERVE_ORG=quick_pat
NUXT_OPENOBSERVE_STREAM=backend_dev      # backend_prod / backend_dev
NUXT_OPENOBSERVE_AUTH=                   # "Basic xxx" 或純 base64(email:token)；勿進版控
NUXT_OPENOBSERVE_ENVIRONMENT=dev         # prod / dev
```

`config.ts` 新增 `str(v, def)`：null/undefined 回預設，避免 `String(undefined)` 變成 `"undefined"` 被誤判為已設定。

### 4. 踩坑：關機 flush

- Nitro Bun preset 在正式環境**不會觸發 `close` hook**（只有 dev reload 會）。
- 不處理的話 `docker stop`（SIGTERM）時批次佇列裡的最後一批 log 會掉。
- 解法：非 dev 時自己掛 `SIGTERM` / `SIGINT`：`provider.shutdown()`（會 flush）與 5 秒 timeout 賽跑，之後 `logs.disable()` 並 `process.exit(0)`。
- `close` hook 仍掛著：dev reload 時舊實例 flush 並解除全域註冊，讓新實例能重新註冊。

### 5. 組織規劃

- 一個 org `quick_pat`；stream 區分環境 `backend_prod` / `backend_dev`；resource environment `prod` / `dev`。
- 預設值是 dev（`openobserveStream: "backend_dev"`、`openobserveEnvironment: "dev"`）：正式環境設定漏了只會寫錯到 dev，不會汙染正式。
- 一個 org vs 兩個 org：

| | 一個 org（選用） | 兩個 org（prod / dev 各一） |
| --- | --- | --- |
| Dashboard / 告警 | 共用一套，prod / dev 方便對照 | 每個 org 各做一套 |
| 權限 | OSS 版沒有 stream 級 RBAC，看得到 dev 就看得到 prod | org 即權限邊界，可隔離 |
| 憑證 | 同一組帳號，寫錯 stream 就混進另一環境 | 憑證各自獨立，誤寫機率低 |

### 6. 行為變化

| 情境 | 之前 | 之後 |
| --- | --- | --- |
| API 4xx | `console.log` | warn（`console.warn`） |
| API 5xx | `console.log` | error（`console.error` → stderr） |
| 上游例外（連線 / 逾時，outcome=error） | `console.warn` | `console.error` |
| 未預期錯誤 | `[api] 未預期錯誤:` + err | 行內附錯誤訊息：`[api] 未預期錯誤: patentpilot 呼叫失敗` + err |

### 7. 驗證

- ✓ `bun test` 264 個測試通過；`bun run typecheck` 通過
- ✓ 以正式 build（`.output/`）對假 OTLP 接收端實測：路徑、`stream-name` / `Authorization` header、resource 正確
- ✓ SIGTERM 時佇列中的 log 有 flush 出去，且 exit 0
- ✗ 尚未對真實 OpenObserve 實測

### 8. 下一步

- 前端 RUM（尚未決定，只列為後續議題）

## 大綱 (Slide Plan)

1. 封面 — 快檢通後端 Log → OpenObserve（TitleSketch：writeLog → stdout / OTel SDK → OpenObserve）
2. 問題 scene — FlowScene：stdout 單行 log → 散在容器 → 重建就沒、無法統計 → 結論
3. 定義（center）— big-quote：每一行照舊寫 stdout，同時 emit OTel record，由官方 SDK 批次送 OpenObserve；callouts：範圍 / 前情提要
4. Part 1 選型（section）
5. 選型 scene — `OptionsScene`：四個候選被一一打 ✗，最後圈出 OTel Logs SDK
6. 方案比較表
7. 四個套件 + `api-logs` gotcha（code）
8. Part 2 架構（section）
9. 架構 scene — `DualWriteScene`：呼叫端 → writeLog → stdout / emit → provider? → Batch → OTLP → OpenObserve；沒設 URL → no-op
10. writeLog 程式碼 + running example 一筆 record
11. attributes 欄位表（log.type 三種）
12. 00.otel-logs.ts 註冊程式碼 + `00.` gotcha
13. Part 3 OpenObserve 端點與組織（section）
14. 端點 / 設定 code（openObserveLogsExport + .env）
15. 組織 scene — `OrgStreamScene`：quick_pat org、兩個 stream、預設 dev
16. 一個 org vs 兩個 org 表
17. Part 4 踩坑與行為變化（section）
18. 關機 scene — `ShutdownScene`：docker stop → 沒 close hook → 掉 log；改掛 SIGTERM → flush ≤5s → exit 0
19. 關機 flush 程式碼
20. 行為變化表
21. 驗證與下一步（✓ / ✗ 清單）
22. Takeaways
23. 參考資料
