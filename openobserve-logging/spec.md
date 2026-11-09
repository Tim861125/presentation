# 把 Log 送進 OpenObserve（前端 RUM × 後端 OTel Logger）

## 注意

- 手寫風格（rough.js 手繪圖、白底藍＋琥珀；見 create-tech skill 的 sketch 模板）
- 不要使用 icon
- 注意每一頁的高度不要超過螢幕高度
- 用繁體中文（技術名詞保留原文）
- 聽眾：RD 同仁，目的是看完能在自己的專案照做（前端怎麼裝 SDK、後端用什麼 logger）
- Running example：快檢通（pes-ipc）一次「文字檢索」請求 `POST /api/Search/GetPatentByText`，從瀏覽器一路到 OpenObserve

## 來源文件 / 參考連結

- 完整教學文件（本 deck 的原文）：`openobserve-logging/openobserve-logging.md`（複製自 pes-ipc `docs/openobserve/README.md`）
- pes-ipc 原始碼：`app/plugins/openobserve.client.ts`、`app/lib/capture-event.ts`、`app/lib/api-client.ts`、`otel/instrumentation.mjs`、`server/utils/telemetry.ts`、`server/plugins/api-log.ts`、`scripts/observability/verify.ts`
- OpenObserve RUM：<https://openobserve.ai/docs/user-guide/rum/>
- OpenObserve OTLP log ingestion：<https://openobserve.ai/docs/ingestion/logs/otlp/>
- OpenTelemetry JS Logs：<https://opentelemetry.io/docs/languages/js/>

## 摘要

### 前後端分工

| | 前端（瀏覽器） | 後端（Bun / Nitro） |
| --- | --- | --- |
| 套件 | `@openobserve/browser-rum` | OTel：`@opentelemetry/api-logs` Logger + `@opentelemetry/sdk-node` |
| 送什麼 | 頁面瀏覽、資源、JS 錯誤、點擊、自訂事件、session replay | 結構化事件 log、API 存取 log、traces |
| 協定 | `/rum/v1/<org>/...` | OTLP/HTTP protobuf `/api/<org>/v1/logs`、`/v1/traces` |
| 認證 | RUM client token（可公開） | HTTP Basic（機密） |
| Stream | `_rumdata`、`_rumlog`、`_sessionreplay` | `default` |

兩端以 W3C Trace Context 串接：瀏覽器打 `/api` 帶 `traceparent`／`baggage`，後端接續同一條 trace，後端 log 帶 `trace_id` 與前端 `session_id`。前端 RUM 與後端 OTLP 必須用同一個 org（`pi_dev`／`pi_prod`）。

### 前端：browser-rum

- 設定放 Nuxt public runtimeConfig（`openobserveClientToken`、`openobserveSite`、`openobserveOrg`、`openobserveAppId`、`openobserveEnv`、`openobserveReplaySampleRate`），部署以 `NUXT_PUBLIC_OPENOBSERVE_*` 覆寫。
- `openobserve.client.ts`：沒設定就不啟用、init 失敗不擋頁面；`setUser` 匿名 id；`allowedTracingUrls` 只匹配本站 `/api`（`propagatorTypes: ["tracecontext"]`）；`propagateTraceBaggage: true`；`defaultPrivacyLevel: "mask-user-input"`；最後 `provide: { openobserve }`。
- init 後自動收：頁面瀏覽、資源、未攔截 JS 錯誤、點擊。
- 自訂事件：`captureEvent()` 同時送 PostHog `capture` 與 OpenObserve `addAction`，各自 try/catch；元件用 `const { capture } = usePostHog(); capture("search_mode_changed", { mode })`。`api-client.ts` 每個請求送 `api_called`（endpoint／method／took_ms／success；失敗加 status／error_code；AbortError 不送）。
- 反向代理：Traefik 轉 `/rum/v1/<org>/` 保留完整路徑；https 站台 `insecureHTTP` 保持 false。

### 後端：OTel Logger

- 不用 pino／winston，用 OTel Logs API → log 自動帶 `trace_id`，設定走標準 `OTEL_*`。
- 兩層：業務程式 → `telemetry.ts`（只依賴 `@opentelemetry/api(-logs)`，SDK 未啟動時 no-op）；SDK 層 `otel/instrumentation.mjs`（獨立 `otel/package.json`，以 `bun --import` 預載）→ `BatchLogRecordProcessor` → `OTLPLogExporter` → OpenObserve。
- 環境變數：

  ```bash
  OTEL_EXPORTER_OTLP_ENDPOINT=https://openobserve.example.com/api/pi_dev
  OTEL_EXPORTER_OTLP_HEADERS=Authorization=Basic%20<base64(email:token)>
  OTEL_SERVICE_NAME=pi
  OTEL_RESOURCE_ATTRIBUTES=deployment.environment=dev
  ```

  endpoint 到 org 為止、不含 `/v1/logs`、不加結尾斜線；header 空白寫 `%20`。
- 啟動：`CMD ["bun", "--import", "./otel/instrumentation.mjs", ".output/server/index.mjs"]`；`bun run dev` 不載入 → 本機開發不送。
- Shutdown：Bun preset 不處理 signal → `SIGTERM` 時先 `server.stop()` 排空、再 `sdk.shutdown()` flush，25 秒上限。
- `logEvent(event, attrs, level)`：`logger.emit({ body: event, severityText, severityNumber, attributes: cleanAttrs({...attrs, ...identityAttrs(), event}), context: context.active() })`，try/catch。
- `traceFlow(prefix, spanName, conditions, fn, summarize)`：開 span，記 `.started`／`.completed`（含 timings 與 took_ms）／`.failed`（含 error.code、error.message，warn）。
- `timed(timings, key, attrs, fn)`：子 span，耗時寫入 `timings[key_ms]`。
- 使用：`search.by_text` → `search.embed`、`search.knn`；`classify.label_degraded`（warn）；Nitro plugin `api.request`（5xx error／4xx warn／其他 info）。
- 守則：body 放事件名、資料放 attributes；事件名 `領域.動作`；attribute 用點分層、入庫變底線；同 key 型別固定；只放純量或同型別陣列、長字串截 8000；不記 query 與 request body；記 log 不能讓請求失敗。

### 查詢與驗證

- SQL（測試站實測）：
  - 各路由 P95：GetPatentByText ≈ 2968 ms、GetPatentByPatentNo ≈ 2665 ms、GetPatentClassify ≈ 709 ms。
  - 文字檢索耗時拆解：embed ≈ 1099 ms、kNN ≈ 168 ms、total ≈ 1267 ms。
- 點 log 的 `trace_id` 可跳 Traces 看完整時間軸。
- `scripts/observability/verify.ts`：本機 OTLP 收集器，不連 OpenObserve，斷言 trace_id 接續、session.id 帶入、error.code。

### 排錯

| 症狀 | 原因 |
| --- | --- |
| 後端完全沒資料 | 沒設 endpoint／沒 `--import`／endpoint 多寫 `/v1/logs` |
| 401 | Basic 錯、空白沒寫 `%20`、無 org 權限 |
| 少最後幾筆 | 沒 `sdk.shutdown()` |
| 沒 trace_id | `emit()` 沒傳 `context.active()` |
| 沒 session_id | 前端沒開 baggage、`allowedTracingUrls` 沒匹配、org 不同 |
| 前端 RUM 404／CORS | 代理沒轉 `/rum/v1/<org>/` |

## 大綱 (Slide Plan)

1. Cover — 把 Log 送進 OpenObserve；`TitleSketch`：browser → api → OTel SDK → OpenObserve
2. 問題 — `FlowScene`：使用者說搜尋慢 → 前端只看得到自己 → 後端 log 散在容器 → 一個 trace_id 串起來
3. 定義 — big-quote + 前端／後端 callout
4. 全貌 — `ArchScene`：兩條送資料的路 + 中間 traceparent 串接（clicks 3）
5. 前後端對照表
6. Part 1 section：前端 browser-rum
7. 設定：runtimeConfig + env（code 兩欄）
8. 初始化：init 程式碼（行高亮步進）
9. 串到後端：`PropagationScene`（fetch 帶 traceparent／baggage → 後端 extract → log 有 trace_id／session_id）
10. 自訂事件：captureEvent + 元件用法
11. Part 2 section：後端 OTel Logger
12. 兩層架構：`FlowScene`（logEvent → Logger → Batch → OTLP → OpenObserve，結論：沒 SDK 就 no-op）
13. 設定與啟動：env + Dockerfile CMD + gotcha
14. SDK 啟動檔：init + shutdown
15. logEvent 程式碼
16. traceFlow 實例：`TraceFlowScene`（search.by_text span 與子 span、三筆 log 落點）
17. 寫 log 守則表
18. Part 3 section：查詢與排錯
19. SQL + 實測數字
20. 排錯表
21. Takeaways
22. 參考資料
