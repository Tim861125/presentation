# OpenObserve 接入教學：後端 Log 與前端 RUM

通用版，不綁定特定專案或 logger 套件。範例以 Node.js／Bun（TypeScript）為主；HTTP 端點以 Web 標準 `Request`／`Response` 撰寫，Hono、Next.js、Nitro 等框架皆可對應。

---

## 1. 基本觀念

### 1.1 OpenObserve 收資料的入口

| 入口 | URL | 用途 |
| --- | --- | --- |
| JSON | `POST /api/<org>/<stream>/_json` | 送 JSON 陣列，最簡單，任何語言／logger 都能用；stream 不存在會自動建立 |
| OTLP | `POST /api/<org>/v1/logs`、`/v1/traces` | OpenTelemetry 標準格式；`stream-name` header 指定 stream（預設 `default`） |
| 收集器 | Vector／Fluent Bit／OTel Collector | 程式把 JSON 寫到 stdout 或檔案，由部署層轉送；可一併收容器與第三方套件的 log |
| RUM | `POST /rum/v1/<org>/...` | 前端 Browser SDK 專用，資料進 `_rumdata`、`_rumlog`、`_sessionreplay` |

### 1.2 認證

| 用途 | 憑證 | 取得位置 | 可否放前端 |
| --- | --- | --- | --- |
| 後端（JSON／OTLP） | `Authorization: Basic base64(email:token)` | UI「Data Sources → Custom」 | **不可**，機密 |
| 前端 RUM | RUM client token | UI「Data Sources → RUM」 | 可以，只能寫 RUM |

```bash
printf '%s' 'you@example.com:<token>' | base64 -w0
```

**Organization（org）** 是資料隔離單位，建議依環境拆（`myapp_dev`、`myapp_prod`）。前後端用同一個 org，trace 才串得起來。

### 1.3 兩種架構

```
A. 直連：瀏覽器 ──RUM──▶ OpenObserve        後端 ──OTLP／JSON──▶ OpenObserve
B. 代理：瀏覽器 ──RUM／log──▶ 自家後端 ──▶ OpenObserve
```

- **A 直連**：設定最少；OpenObserve 的 RUM 端點必須對瀏覽器開放（含 CORS）。
- **B 代理**：OpenObserve 可只在內網，瀏覽器看不到其位址；多寫兩個小端點（§3.3、§3.4）。

---

## 2. 後端 Log

任選一種。

### 2.1 做法一：OpenTelemetry SDK（可連 traces）

```bash
npm i @opentelemetry/sdk-node @opentelemetry/sdk-logs @opentelemetry/api-logs \
      @opentelemetry/exporter-logs-otlp-proto @opentelemetry/exporter-trace-otlp-proto
```

環境變數（SDK 自動讀取）：

```bash
OTEL_EXPORTER_OTLP_ENDPOINT=https://openobserve.example.com/api/myapp_dev   # 只寫到 org，SDK 自動補 /v1/logs
OTEL_EXPORTER_OTLP_HEADERS=Authorization=Basic%20<base64字串>              # 空白寫成 %20；要指定 stream 再加 ,stream-name=<名稱>
OTEL_SERVICE_NAME=myapp-api
OTEL_RESOURCE_ATTRIBUTES=deployment.environment=dev
OTEL_METRICS_EXPORTER=none
```

`instrumentation.mjs`，需在應用程式之前載入（`node --import ./instrumentation.mjs server.js`，Bun 同）：

```js
import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-proto";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter(),
  logRecordProcessors: [new BatchLogRecordProcessor({ exporter: new OTLPLogExporter() })],
  // 舊版 sdk-logs 寫法：new BatchLogRecordProcessor(new OTLPLogExporter())
});
sdk.start();
for (const sig of ["SIGTERM", "SIGINT"]) {
  process.once(sig, () => sdk.shutdown().finally(() => process.exit(0)));   // 結束前 flush
}
```

寫 log：

```js
import { logs, SeverityNumber } from "@opentelemetry/api-logs";

logs.getLogger("myapp").emit({
  severityNumber: SeverityNumber.INFO,
  severityText: "INFO",
  body: "order created",
  attributes: { "order.id": "A123", took_ms: 85 },
});
```

在有 active span 的請求內呼叫時會自動帶 `trace_id`，可從 log 跳到 trace。

### 2.2 做法二：任何 logger + JSON 批次送出

不想裝 OTel，或已有慣用 logger 時使用。

```bash
OPENOBSERVE_URL=https://openobserve.example.com
OPENOBSERVE_ORG=myapp_dev
OPENOBSERVE_STREAM=default
OPENOBSERVE_AUTHORIZATION="Basic <base64(email:token)>"
```

```ts
// openobserve-sink.ts
const url = `${process.env.OPENOBSERVE_URL}/api/${process.env.OPENOBSERVE_ORG}/${process.env.OPENOBSERVE_STREAM ?? "default"}/_json`;
const auth = process.env.OPENOBSERVE_AUTHORIZATION;
let buffer: Record<string, unknown>[] = [];

export function send(event: Record<string, unknown>) {
  if (!auth) return;                                     // 未設定就不送，不影響服務
  if (buffer.length >= 1000) buffer.shift();             // 上游故障時限制記憶體
  buffer.push({ _timestamp: Date.now() * 1000, ...event });   // 微秒
  if (buffer.length >= 50) void flush();
}

export async function flush() {
  if (!buffer.length) return;
  const batch = buffer;
  buffer = [];
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: auth!, "Content-Type": "application/json" },
        body: JSON.stringify(batch),
        signal: AbortSignal.timeout(10_000),
      });
      if (res.ok) return;
    } catch { /* 重試 */ }
  }
  console.error(`[openobserve] dropped ${batch.length} events`);
}

setInterval(flush, 5000).unref?.();
for (const sig of ["SIGTERM", "SIGINT"] as const) {
  process.once(sig, () => flush().finally(() => process.exit(0)));
}
```

```ts
send({ level: "info", service: "myapp-api", env: "dev", message: "order created", order_id: "A123" });
```

接到既有 logger：在 logger 的 transport／hook 呼叫 `send` 即可。也有現成套件：

| Logger | 現成接法 |
| --- | --- |
| pino | `pino-opentelemetry-transport`（OTLP） |
| winston | `@opentelemetry/winston-transport`（搭配做法一的 SDK） |
| evlog（Nuxt／Nitro） | 內建 `createOTLPDrain`，掛 `evlog:drain` hook |

### 2.3 欄位建議

- 每筆固定帶 `service`、`env`、`version`、`level`，方便篩選。
- **一個請求記一筆**：請求開始建立物件，過程累加欄位（使用者、結果、錯誤碼），結束時補路徑、狀態碼、耗時再送出。
- 不記密碼、token、完整 query string。

---

## 3. 前端

### 3.1 安裝

```bash
npm i @openobserve/browser-rum @openobserve/browser-logs   # browser-logs 選用
```

### 3.2 初始化

放在應用程式最早執行處（SPA 入口、client-only plugin）：

```ts
import { openobserveRum } from "@openobserve/browser-rum";
import { openobserveLogs } from "@openobserve/browser-logs";

const common = {
  clientToken: "<RUM client token>",
  site: "openobserve.example.com",        // 只寫 host[:port]，不含 https://
  organizationIdentifier: "myapp_dev",
  service: "myapp-web",
  env: "dev",
  version: "1.0.0",
  apiVersion: "v1",
  insecureHTTP: false,                    // RUM 端點走 http 才設 true
  // proxy: "/api/rum",                   // 架構 B：改送自家後端（見 §3.3）
};

try {
  openobserveRum.init({
    ...common,
    applicationId: "myapp-web",
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,          // session replay 抽樣 %
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: "mask-user-input",
    // 呼叫自家 API 時帶 traceparent，與後端 trace 串接（後端需用 §2.1）
    allowedTracingUrls: [{ match: "https://api.example.com", propagatorTypes: ["tracecontext"] }],
    traceSampleRate: 100,
  });
  openobserveLogs.init({ ...common, forwardErrorsToLogs: true });   // console 錯誤 → _rumlog
  openobserveRum.startSessionReplayRecording();
  // 登入：openobserveRum.setUser({ id, name })；登出：openobserveRum.clearUser()
} catch { /* 可觀測性失敗不可擋住頁面 */ }

openobserveRum.addAction("checkout_clicked", { cartSize: 3 });   // 自訂事件
openobserveLogs.logger.info("search done", { took_ms: 120 });    // 自訂 log
```

### 3.3 架構 B：RUM 代理端點

設了 `proxy: "/api/rum"` 後，SDK 改 POST 到 `/api/rum?o2forward=/rum/v1/<org>/...`，目標路徑與 token 都在 `o2forward` 裡：

```ts
// POST /api/rum
const ALLOWED = /^\/rum\/(?:v1|v2)\/[A-Za-z0-9._~-]+\/[A-Za-z0-9._~-]+$/;

export async function POST(req: Request) {
  let target: URL;
  try { target = new URL(new URL(req.url).searchParams.get("o2forward") ?? "", "http://x"); }
  catch { return new Response(null, { status: 400 }); }
  if (!ALLOWED.test(target.pathname)) return new Response(null, { status: 400 });   // 防止成為任意代理

  const headers = new Headers();
  for (const name of ["content-type", "content-encoding"]) {   // 只轉必要 header，不轉 cookie
    const v = req.headers.get(name);
    if (v) headers.set(name, v);
  }
  const res = await fetch(`${process.env.OPENOBSERVE_URL}${target.pathname}${target.search}`, {
    method: "POST",
    headers,
    body: await req.arrayBuffer(),        // 原樣轉送：可能是 NDJSON、multipart 或壓縮資料
  });
  return new Response(await res.arrayBuffer(), {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
  });
}
```

### 3.4 架構 B：前端 log 改送自家後端（選用）

想讓前端 log 與後端 log 進同一個 stream、同一套欄位時，不用 `browser-logs`，改送到自家端點，交給 §2.2 的 `send`：

```ts
// POST /api/logs（後端）
import { send } from "./openobserve-sink";

export async function POST(req: Request) {
  const events = await req.json().catch(() => null);
  if (!Array.isArray(events) || events.length > 100) return new Response(null, { status: 400 });
  for (const e of events) send({ ...e, source: "browser" });
  return new Response(null, { status: 204 });
}
```

```ts
// 前端
const queue: object[] = [];
export const clientLog = (level: "info" | "warn" | "error", data: object) =>
  queue.push({ level, service: "myapp-web", path: location.pathname, ...data });

setInterval(() => {
  if (queue.length) navigator.sendBeacon("/api/logs", JSON.stringify(queue.splice(0)));
}, 5000);
window.addEventListener("error", (e) => clientLog("error", { message: String(e.error ?? e.message) }));
window.addEventListener("unhandledrejection", (e) => clientLog("error", { message: String(e.reason) }));
```

### 3.5 注意事項

- **登入 middleware**：`/api/rum`、`/api/logs` 要列入公開路徑；`/api/logs` 是公開端點，需加大小與速率限制。
- **CORS**：架構 A 由瀏覽器直連 OpenObserve；開了 `allowedTracingUrls` 時，跨網域 API 也要允許 `traceparent` header。
- **mixed content**：網站是 https，RUM 端點也必須是 https。
- **自動化測試**：可用 `if (!navigator.webdriver)` 跳過初始化，避免 E2E 流量汙染資料。

---

## 4. 驗證與除錯

1. 打幾個 API、操作頁面，等 10～30 秒（批次送出）。
2. OpenObserve 介面：
   - `Logs` → 選 stream，以 `service` 篩選。
   - `Traces`（做法一）看請求鏈。
   - `RUM` → Sessions／Errors／Performance。
3. 沒資料時：

| 現象 | 可能原因 |
| --- | --- |
| 後端回 401 | Basic 字串錯 |
| 後端回 404 | org 錯，或 OTLP endpoint 多寫了 `/v1/logs` |
| `/rum/...` 或 `/api/rum` 有 CORS 錯誤 | 架構 A 的 OpenObserve 未允許來源 |
| `/api/rum` 回 400 | 代理白名單擋掉 |
| `/api/rum` 回 401／403 | 被登入 middleware 擋，或 RUM token 錯 |
| 前後端 trace 串不起來 | org 不一致、後端沒用 OTel、或 `allowedTracingUrls` 沒涵蓋 API 網域 |

OTel SDK 可暫設 `OTEL_LOG_LEVEL=debug` 看 exporter 錯誤。

## 5. 限制

- 程式內的批次緩衝都在記憶體，程序被強制終止或重試耗盡會遺失。要保證不掉資料，改寫 stdout／檔案並由收集器轉送。
- 只有 OpenTelemetry（做法一）能把前後端請求串成同一條 trace。
