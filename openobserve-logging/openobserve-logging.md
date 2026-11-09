# 將 log 送到 OpenObserve 教學

本文以「快檢通」（本專案）的實際做法為藍本，分**前端**與**後端**兩部分，說明各自用什麼 SDK／logger 把資料送進 OpenObserve，並附可直接照抄的程式碼。

| | 前端（瀏覽器） | 後端（Bun / Nitro） |
| --- | --- | --- |
| 套件 | `@openobserve/browser-rum` | OpenTelemetry：`@opentelemetry/api-logs` 的 Logger + `@opentelemetry/sdk-node` |
| 送什麼 | 頁面瀏覽、資源載入、JS 錯誤、使用者動作、自訂事件、session replay | 結構化事件 log、API 存取 log、traces |
| 協定 | RUM 專用端點 `/rum/v1/<org>/...` | OTLP/HTTP protobuf `/api/<org>/v1/logs`、`/v1/traces` |
| 認證 | RUM client token（可公開） | HTTP Basic（帳號 + token，**機密**） |
| 落在哪個 stream | `_rumdata`、`_rumlog`、`_sessionreplay` | `default` |
| 本專案檔案 | `app/plugins/openobserve.client.ts`、`app/lib/capture-event.ts` | `otel/instrumentation.mjs`、`server/utils/telemetry.ts`、`server/plugins/api-log.ts` |

兩端用 W3C Trace Context 串起來：瀏覽器呼叫 `/api` 時帶 `traceparent`／`baggage` header，後端接著同一條 trace，所以後端每筆 log 都帶得到前端的 `session_id`，也有共用的 `trace_id`。

---

## 0. 共同前置

| 項目 | 說明 |
| --- | --- |
| Host | OpenObserve 位址，例如 `https://openobserve.example.com` |
| Organization（org） | 資料隔離單位。本專案依環境分：`pi_dev`（測試站）、`pi_prod`（正式站）。**前端 RUM 與後端 OTLP 要用同一個 org**，trace 才串得起來 |
| 後端認證 | `Authorization: Basic base64(<email>:<token>)`，token 在 UI「Data Sources → Custom」頁取得 |
| 前端認證 | UI「Data Sources → RUM」頁的 client token（只能寫 RUM，可以放進前端） |

產生後端用的 Basic 字串：

```bash
printf '%s' 'you@example.com:<token>' | base64 -w0
```

> ⚠️ Basic 字串只是 base64，等同明文帳密。只放在部署平台（Rancher／compose）的環境變數或 secret，不要寫進 `.env.example`、文件或程式碼。

---

## 1. 前端：`@openobserve/browser-rum`

### 1.1 安裝與設定

```bash
bun add @openobserve/browser-rum@0.4.3
```

設定放 Nuxt **public** runtimeConfig（會送到瀏覽器，所以只放可公開的值），`nuxt.config.ts`：

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      appVersion: "",
      apiBase: "/api",
      openobserveClientToken: "",        // 空字串 = 不啟用 RUM
      openobserveSite: "",               // RUM 接收端 host[:port]，不含 https://
      openobserveOrg: "default",
      openobserveAppId: "pi",            // 會成為 OpenObserve 上的 service 名稱
      openobserveInsecureHttp: "false",  // RUM 端點走 http 時才設 "true"
      openobserveEnv: "",                // dev / prod
      openobserveReplaySampleRate: "20", // session replay 抽樣百分比
    },
  },
});
```

部署時用環境變數覆寫：

```bash
NUXT_PUBLIC_OPENOBSERVE_CLIENT_TOKEN=<RUM client token>
NUXT_PUBLIC_OPENOBSERVE_SITE=openobserve.example.com
NUXT_PUBLIC_OPENOBSERVE_ORG=pi_dev
NUXT_PUBLIC_OPENOBSERVE_ENV=dev
```

### 1.2 初始化（`app/plugins/openobserve.client.ts`）

`.client.ts` 結尾代表只在瀏覽器執行。原則是**沒設定就不啟用、初始化失敗也不能擋住頁面**：

```ts
import { openobserveRum } from "@openobserve/browser-rum";

export default defineNuxtPlugin({
  name: "openobserve",
  setup() {
    const cfg = useRuntimeConfig().public;
    let client: typeof openobserveRum | undefined;

    if (cfg.openobserveClientToken && cfg.openobserveSite) {
      try {
        const api = new URL(cfg.apiBase, location.origin);
        const apiPath = api.pathname.replace(/\/$/, "");

        // 匿名使用者識別（本專案用 localStorage 產生的隨機 id，見 app/lib/anon-id.ts）
        openobserveRum.setUser({ id: "<匿名 id>", name: "<顯示名稱>" });

        openobserveRum.init({
          applicationId: cfg.openobserveAppId,
          service: cfg.openobserveAppId,
          clientToken: cfg.openobserveClientToken,
          site: cfg.openobserveSite,
          organizationIdentifier: cfg.openobserveOrg,
          insecureHTTP: String(cfg.openobserveInsecureHttp) === "true",
          env: cfg.openobserveEnv,
          version: cfg.appVersion,
          apiVersion: "v1",

          sessionSampleRate: 100,
          sessionReplaySampleRate: Math.min(100, Math.max(0, Number(cfg.openobserveReplaySampleRate) || 0)),
          defaultPrivacyLevel: "mask-user-input", // replay 中遮蔽使用者輸入

          trackUserInteractions: true, // 自動記點擊
          trackResources: true,        // 自動記 fetch / 圖片 / JS 載入
          trackLongTasks: true,

          // 只對本站 /api 加 traceparent header（不要加到第三方網域，會觸發 CORS preflight）
          allowedTracingUrls: [{
            match: (value: string) => {
              try {
                const url = new URL(value, location.origin);
                return url.origin === api.origin && (url.pathname === apiPath || url.pathname.startsWith(`${apiPath}/`));
              } catch { return false; }
            },
            propagatorTypes: ["tracecontext"],
          }],
          traceSampleRate: 100,
          propagateTraceBaggage: true, // 用 baggage header 把 session.id / user.id 帶給後端
        });

        openobserveRum.startSessionReplayRecording();
        client = openobserveRum;
      } catch { /* 可觀測性不可阻斷頁面 */ }
    }

    // 之後可用 useNuxtApp().$openobserve 取得；未啟用時是 undefined
    return { provide: { openobserve: client } };
  },
});
```

初始化完，**頁面瀏覽、資源載入、未攔截的 JS 錯誤、點擊**都會自動送出，不用再寫程式。

### 1.3 送自訂事件（`addAction`）

業務上想追蹤的事件（切換搜尋模式、開設定面板……）用 `addAction`。本專案把 PostHog 與 OpenObserve 包成同一個出口，任一邊壞掉都不影響另一邊（`app/lib/capture-event.ts`）：

```ts
export type EventProperties = Record<string, boolean | number | string | readonly string[] | undefined>;
type EventClients = {
  $posthog?: { capture: (event: string, props: Record<string, unknown>) => unknown };
  $openobserve?: { addAction: (event: string, props: Record<string, unknown>) => unknown };
};

export function captureEvent(clients: EventClients | null | undefined, event: string, properties: EventProperties = {}): void {
  const defined = Object.fromEntries(Object.entries(properties).filter(([, v]) => v !== undefined));
  try { clients?.$posthog?.capture(event, defined); } catch { /* best effort */ }
  try { clients?.$openobserve?.addAction(event, defined); } catch { /* best effort */ }
}
```

元件裡透過 composable 使用（`app/composables/usePostHog.ts`）：

```ts
export function usePostHog() {
  const clients = useNuxtApp();
  return { capture: (event: string, props: EventProperties = {}) => captureEvent(clients, event, props) };
}
```

```vue
<script setup lang="ts">
const { capture } = usePostHog();

function onModeChange(choice: "text" | "patent") {
  capture("search_mode_changed", { mode: choice });
}
</script>
```

API 呼叫也統一記錄：`app/lib/api-client.ts` 每個請求結束後送一個 `api_called` 事件（`endpoint`、`method`、`took_ms`、`success`，失敗時加 `status`、`error_code`；使用者主動取消的 `AbortError` 不記，request body 與 query 的值不送）。

### 1.4 反向代理

本專案的 `openobserveSite` 指向自己的網域，由 Traefik 轉給 OpenObserve，避免瀏覽器直連內網服務：

- Traefik 要把 `/rum/v1/<org>/` 的 POST 原樣轉給 OpenObserve，**保留完整路徑**。
- 網站是 https 時 RUM 端點也必須是 https（`insecureHTTP` 保持 `false`），否則會被擋成 mixed content。

---

## 2. 後端：OpenTelemetry Logger

後端不用 pino／winston 之類的 logger，而是用 **OpenTelemetry Logs API**：程式碼呼叫 `logs.getLogger().emit()`，由 OTel SDK 以 OTLP 批次送到 OpenObserve。這樣 log 會自動帶上目前 span 的 `trace_id`／`span_id`，所有設定也都走標準的 `OTEL_*` 環境變數。

分成兩層：

```
業務程式碼（server/utils/*.ts）
  └─ logEvent() / traceFlow() / timed()       ← server/utils/telemetry.ts，只依賴 @opentelemetry/api(-logs)
        │                                        SDK 沒啟動時全部是 no-op
SDK 層（otel/instrumentation.mjs，--import 預載）
  └─ NodeSDK + BatchLogRecordProcessor + OTLPLogExporter
        │  POST {OTEL_EXPORTER_OTLP_ENDPOINT}/v1/logs（protobuf）
        ▼
OpenObserve /api/<org>/v1/logs → stream
```

### 2.1 安裝

SDK 套件放在獨立的 `otel/package.json`，不進 Nitro bundle：

```json
{
  "name": "pi-telemetry",
  "private": true,
  "type": "module",
  "dependencies": {
    "@opentelemetry/api": "1.9.1",
    "@opentelemetry/api-logs": "0.223.0",
    "@opentelemetry/core": "2.12.0",
    "@opentelemetry/exporter-logs-otlp-proto": "0.223.0",
    "@opentelemetry/exporter-trace-otlp-proto": "0.223.0",
    "@opentelemetry/sdk-logs": "0.223.0",
    "@opentelemetry/sdk-node": "0.223.0"
  }
}
```

應用程式本身（根目錄 `package.json`）只裝 API 套件：

```bash
bun add @opentelemetry/api@1.9.1 @opentelemetry/api-logs@0.223.0
bun install --cwd otel --frozen-lockfile --ignore-scripts
```

> SDK 套件版本要成組（`sdk-*`、`exporter-*`、`api-logs` 同為 0.223.0）。版本混用時常見的症狀是 log 不出現，而且沒有任何錯誤訊息。

### 2.2 環境變數

```bash
# 寫到 org 為止，不含 /v1/logs，結尾不加斜線（exporter 會自己補 /v1/logs、/v1/traces）
OTEL_EXPORTER_OTLP_ENDPOINT=https://openobserve.example.com/api/pi_dev
# header 值中的空白要寫成 %20
OTEL_EXPORTER_OTLP_HEADERS=Authorization=Basic%20<base64(email:token)>
OTEL_SERVICE_NAME=pi
OTEL_RESOURCE_ATTRIBUTES=deployment.environment=dev
```

`OTEL_*` 由 SDK 直接讀 `process.env`，不經過 Nuxt runtimeConfig。部署時由 Rancher 容器環境變數或 compose `env_file` 注入。

### 2.3 SDK 啟動檔（`otel/instrumentation.mjs`）

這個檔案必須在應用程式載入**之前**執行。以下是精簡版，只留下送 log 必要的部分（本專案完整版另外包了 `fetch` 與 `Bun.serve` 來產生 HTTP span）：

```js
const env = process.env;

if (env.OTEL_SDK_DISABLED !== "true" && env.OTEL_EXPORTER_OTLP_ENDPOINT) {
  env.OTEL_METRICS_EXPORTER ??= "none";

  // 動態 import：沒設定 endpoint 時完全不載入 SDK
  const [{ NodeSDK }, { OTLPTraceExporter }, { OTLPLogExporter }, { BatchLogRecordProcessor }] = await Promise.all([
    import("@opentelemetry/sdk-node"),
    import("@opentelemetry/exporter-trace-otlp-proto"),
    import("@opentelemetry/exporter-logs-otlp-proto"),
    import("@opentelemetry/sdk-logs"),
  ]);

  const sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter(),
    // Batch：先緩衝再批次送；不要用 SimpleLogRecordProcessor（每筆 log 一個 HTTP 請求）
    logRecordProcessors: [new BatchLogRecordProcessor({ exporter: new OTLPLogExporter() })],
    instrumentations: [],
  });
  sdk.start();

  // （完整版在這裡包裝 Bun.serve，把建立的 server 收進 servers）
  const servers = new Set();

  // Nitro 的 Bun preset 不處理 signal：先排空連線，再 shutdown 把緩衝中最後一批 log 送出
  let stopping;
  const shutdown = () => stopping ??= (async () => {
    try {
      await Promise.all([...servers].map(server => server.stop()));
      await sdk.shutdown();
    } catch (err) { console.error("[otel] shutdown failed", err); }
  })();
  const onSignal = () => {
    // 上游失聯時 flush 會卡住，設上限避免容器停不下來
    const deadline = setTimeout(() => process.exit(1), 25000);
    void shutdown().finally(() => { clearTimeout(deadline); process.exit(0); });
  };
  process.once("SIGTERM", onSignal);
  process.once("SIGINT", onSignal);
}
```

啟動方式（`Dockerfile`、`package.json` 的 `preview`）：

```dockerfile
COPY --from=builder /app/otel ./otel
CMD ["bun", "--import", "./otel/instrumentation.mjs", ".output/server/index.mjs"]
```

開發時 `bun run dev` 不會載入這個檔案，所以本機開發預設不送 telemetry。

### 2.4 Logger 封裝（`server/utils/telemetry.ts`）

業務程式碼不要直接呼叫 `logger.emit()`，統一透過以下幾個函式：

```ts
import { context, propagation, trace, SpanStatusCode, type Attributes, type Span } from "@opentelemetry/api";
import { logs, SeverityNumber } from "@opentelemetry/api-logs";

const tracer = trace.getTracer("pi");
const logger = logs.getLogger("pi");
export const ATTR_MAX_CHARS = 8000;
export type Timings = Record<string, number>;

/** OTel attribute 只接受純量與同型別陣列：濾掉 null/undefined、長字串截斷並標記。 */
export function cleanAttrs(attrs: Record<string, unknown>): Attributes {
  const out: Attributes = {};
  for (const [key, value] of Object.entries(attrs)) {
    if (value == null) continue;
    let truncated = false;
    const clean = (v: string | number | boolean) => {
      if (typeof v === "string" && v.length > ATTR_MAX_CHARS) { truncated = true; return v.slice(0, ATTR_MAX_CHARS); }
      return v;
    };
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") out[key] = clean(value);
    else if (Array.isArray(value) && value.every(v => ["string", "number", "boolean"].includes(typeof v))
      && value.every(v => typeof v === typeof value[0])) out[key] = value.map(clean) as string[] | number[] | boolean[];
    if (truncated) out[`${key}_truncated`] = true;
  }
  return out;
}

/** 從 baggage 取出前端帶來的 session.id / user.id（見 §1.2 propagateTraceBaggage）。 */
export function identityAttrs(): Attributes {
  const baggage = propagation.getBaggage(context.active());
  return cleanAttrs({
    "session.id": baggage?.getEntry("session.id")?.value,
    "enduser.id": baggage?.getEntry("user.id")?.value,
  });
}

/** 送一筆結構化 log：body 放事件名，細節放 attributes。 */
export function logEvent(event: string, attrs: Record<string, unknown> = {}, level: "info" | "warn" | "error" = "info"): void {
  try {
    logger.emit({
      body: event,
      severityText: level.toUpperCase(),
      severityNumber: { info: SeverityNumber.INFO, warn: SeverityNumber.WARN, error: SeverityNumber.ERROR }[level],
      attributes: cleanAttrs({ ...attrs, ...identityAttrs(), event }),
      context: context.active(), // 帶入目前 span → log 自動有 trace_id / span_id
    });
  } catch { /* 記錄失敗不影響請求 */ }
}

/** 開一個 span 執行 fn；拋錯時把 span 標成 ERROR。 */
export async function withSpan<T>(name: string, attrs: Record<string, unknown>, fn: (span: Span) => Promise<T>): Promise<T> {
  return tracer.startActiveSpan(name, { attributes: { ...cleanAttrs(attrs), ...identityAttrs() } }, async span => {
    try { return await fn(span); }
    catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      span.recordException(err instanceof Error ? err : message);
      span.setStatus({ code: SpanStatusCode.ERROR, message });
      throw err;
    } finally { span.end(); }
  });
}

/** 子步驟：開子 span，並把耗時記到 timings[`${key}_ms`]。 */
export async function timed<T>(timings: Timings, key: string, attrs: Record<string, unknown>, fn: () => Promise<T>): Promise<T> {
  const started = performance.now();
  try { return await withSpan(key, attrs, fn); }
  finally { timings[`${key}_ms`] = performance.now() - started; }
}

/** 一整段流程：開 span，並記 `${prefix}.started` / `.completed` / `.failed` 三種 log。 */
export async function traceFlow<T>(prefix: string, spanName: string, conditions: Record<string, unknown>,
  fn: (timings: Timings) => Promise<T>, summarize: (result: T) => Record<string, unknown>): Promise<T> {
  return withSpan(spanName, conditions, async () => {
    const timings: Timings = {};
    const started = performance.now();
    logEvent(`${prefix}.started`, conditions);
    try {
      const result = await fn(timings);
      logEvent(`${prefix}.completed`, { ...conditions, ...summarize(result), ...timings, [`${prefix}.took_ms`]: performance.now() - started });
      return result;
    } catch (err) {
      logEvent(`${prefix}.failed`, {
        ...conditions, ...timings, [`${prefix}.took_ms`]: performance.now() - started,
        "error.code": err && typeof err === "object" && "code" in err ? err.code : "INTERNAL",
        "error.message": err instanceof Error ? err.message : String(err),
      }, "warn");
      throw err;
    }
  });
}
```

### 2.5 在業務程式碼中使用

以下片段為說明用的精簡版，實際寫法見對應檔案。

**整段流程用 `traceFlow`，子步驟用 `timed`**（`server/utils/search.ts`）：

```ts
export function runByText(cfg: ServerConfig, params: ByTextParams) {
  return traceFlow(
    "search",                        // log 事件前綴 → search.started / search.completed / search.failed
    "search.by_text",                // span 名稱
    searchConditionAttrs(params),    // 每筆 log 都會帶的查詢條件
    t => byText(cfg, params, t),
    r => ({ "search.hits": r.results.length, "search.total": r.total }), // completed 時附加的結果摘要
  );
}

async function byText(cfg: ServerConfig, params: ByTextParams, timings: Timings) {
  const vector = await timed(timings, "search.embed", {}, () => embedQuery(cfg, params.text));
  const res = await timed(timings, "search.knn", {}, () => os.search(indices, knnBody(vector, params.size)));
  return shape(res);
  // search.completed log 會帶上 search.embed_ms、search.knn_ms、search.took_ms
}
```

**降級或特殊狀況用 `logEvent` 直接記**（`server/utils/classify.ts`）：

```ts
try {
  labels = await timed(timings, "classify.ai_label", {}, () => difyFishboneLabel(cfg, input));
} catch (err) {
  // AI 命名失敗不擋請求，退回標題命名，但要留紀錄
  logEvent("classify.label_degraded", { "error.message": err instanceof Error ? err.message : String(err) }, "warn");
  labels = titleLabels(input);
}
```

**每個 API 請求一筆存取 log**（`server/plugins/api-log.ts`，Nitro plugin，新增 route 會自動涵蓋）：

```ts
export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook("request", event => {
    event.context.__apiLogStart = Date.now();
  });

  nitroApp.hooks.hook("afterResponse", (event, response) => {
    try {
      const url = getRequestURL(event);
      const status = getResponseStatus(event);
      logEvent("api.request", {
        "http.method": event.method,
        "http.route": url.pathname,
        "http.query": url.search,
        "http.status_code": status,
        "http.duration_ms": Date.now() - event.context.__apiLogStart,
        "client.ip": getRequestIP(event, { xForwardedFor: true }),
        "error.code": (response as { body?: { error?: { code?: string } } })?.body?.error?.code,
      }, status >= 500 ? "error" : status >= 400 ? "warn" : "info");
    } catch { /* 記錄失敗絕不影響回應 */ }
  });
});
```

### 2.6 寫 log 的守則

- **body 放事件名，資料放 attributes。** OpenObserve 會把每個 attribute 拆成獨立欄位，可以直接用 `WHERE`／`GROUP BY`；塞在 body 字串裡的內容只能全文搜尋。
- **事件名用 `領域.動作`**：`search.completed`、`classify.label_degraded`、`api.request`。
- **attribute 名用點分層**：`search.took_ms`。OpenObserve 入庫時會轉成底線（`search_took_ms`），查詢要用底線版本。
- **同一個 key 型別要固定。** 欄位型別由第一次寫入決定，之後送了不同型別的值會被拒或被轉型。
- **只能放純量或同型別陣列。** 物件請先 `JSON.stringify`，`cleanAttrs` 會濾掉 `null`／`undefined`。
- **不記敏感資料**：URL 只記 `origin + pathname`（query 可能帶簽名或 token），request body 不記。
- **記 log 不能讓請求失敗**：所有 emit 都包在 `try/catch` 裡。

---

## 3. 在 OpenObserve 查詢

### 前端（Logs → stream `_rumdata`）

用 UI 的 **RUM** 頁看最方便（Sessions、Error Tracking、Performance、Session Replay），也可以在 Logs 頁選 `_rumdata` 寫 SQL。

### 後端（Logs → stream `default`）

以下查詢都已在本專案測試站的 `default` stream 實際跑過：

```sql
-- 各 API 路由的 P95 延遲與 5xx 數
SELECT http_route, approx_percentile_cont(http_duration_ms, 0.95) AS p95_ms,
       count(*) AS total, sum(CASE WHEN http_status_code >= 500 THEN 1 ELSE 0 END) AS errors
FROM "default" WHERE event = 'api.request' GROUP BY http_route ORDER BY p95_ms DESC

-- 搜尋耗時拆解：embedding vs kNN
SELECT avg(search_embed_ms) AS embed, avg(search_knn_ms) AS knn, avg(search_took_ms) AS total
FROM "default" WHERE event = 'search.completed' AND search_mode = 'by-text'

-- 最近失敗的搜尋
SELECT _timestamp, error_code, error_message, search_mode, search_text
FROM "default" WHERE event = 'search.failed' ORDER BY _timestamp DESC

-- 同一使用者 session 的所有後端事件（session_id 來自前端 baggage）
SELECT _timestamp, event, http_route, trace_id FROM "default" WHERE session_id = '<session id>'
```

點任一筆 log 的 `trace_id` 可以跳到 Traces 頁，看到從瀏覽器 fetch 到後端 embedding／kNN 的完整時間軸。

---

## 4. 驗證

**後端，不連 OpenObserve**：`scripts/observability/verify.ts` 會起一個本機 OTLP 收集器，以 production build 加 preload 啟動伺服器並打幾個 API，再斷言 log／span 數量、`trace_id` 有接續、`session.id` 有帶到後端、失敗時有 `error.code`。資料不會送出本機：

```bash
bun install --cwd otel --frozen-lockfile --ignore-scripts
bun run build
bun scripts/observability/verify.ts
```

**前端**：`.env` 設好 `NUXT_PUBLIC_OPENOBSERVE_*`，開 DevTools Network 篩選 `rum`，應該看到送往 `/rum/v1/<org>/...` 的 POST 回 200；呼叫 `/api` 的請求 header 裡有 `traceparent`。

---

## 5. 排錯

| 症狀 | 可能原因 |
| --- | --- |
| 後端完全沒資料、也沒有錯誤 | 沒設 `OTEL_EXPORTER_OTLP_ENDPOINT`（SDK 沒啟動）；沒用 `--import ./otel/instrumentation.mjs` 啟動；endpoint 多寫了 `/v1/logs` 或結尾斜線 |
| 後端 401 | Basic 字串錯；header 中的空白沒寫成 `%20`；帳號沒有該 org 的權限 |
| 只少最後幾筆 | 沒呼叫 `sdk.shutdown()`；容器終止寬限期太短 |
| log 沒有 `trace_id` | `emit()` 沒傳 `context: context.active()`；或呼叫點不在任何 span 內 |
| 後端 log 沒有 `session_id` | 前端沒開 `propagateTraceBaggage`；`allowedTracingUrls` 沒匹配到 `/api`；前後端 org 不同 |
| 某欄位突然變空 | 同一 key 前後寫了不同型別 |
| 前端 RUM 404／CORS／mixed content | 反向代理沒轉 `/rum/v1/<org>/` 或改寫了路徑；https 頁面卻設了 `insecureHTTP: true` |
| 前端完全沒送 | `openobserveClientToken` 或 `openobserveSite` 是空的（plugin 會直接跳過） |

## 參考

- 本專案：`app/plugins/openobserve.client.ts`、`app/lib/capture-event.ts`、`app/lib/api-client.ts`、`otel/instrumentation.mjs`、`server/utils/telemetry.ts`、`server/plugins/api-log.ts`、`.env.example`、`Dockerfile`、`scripts/observability/verify.ts`
- OpenObserve：[RUM](https://openobserve.ai/docs/user-guide/rum/)、[OTLP log ingestion](https://openobserve.ai/docs/ingestion/logs/otlp/)
