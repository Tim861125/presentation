---
title: 把 Log 送進 OpenObserve
info: |
  前端 browser-rum × 後端 OpenTelemetry Logger，以快檢通為例
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

# 把 Log 送進 OpenObserve

前端用 **browser-rum**、後端用 **OTel Logger**，一個 `trace_id` 串起整條請求。

丁吾心 · RD 技術分享

::brand::

RD Tech Talk

::art::

<TitleSketch />

---
clicks: 3
---

# 問題：「搜尋好慢」，慢在哪？

<FlowScene
  :steps="['使用者回報\n搜尋好慢', '前端 console\n只看得到自己', '後端 log\n散在各個容器']"
  :notes="['沒有時間、沒有條件', '不知道打了哪支 API', '對不回是哪個使用者']"
  result="一個 trace_id 從瀏覽器串到後端"
/>

<div class="scene-caption">以快檢通一次「文字檢索」為例：前後端各記各的，就對不起來。</div>

<!--
[click] 前端只看得到瀏覽器裡發生的事
[click] 後端 log 散在容器 stdout
[click] 解法：兩邊都送 OpenObserve，並共用同一個 trace_id
-->

---
layout: center
---

<div class="big-quote max-w-3xl">

前端用 <em>RUM SDK</em> 自動收、後端用 <em>OTel Logger</em> 送結構化 log，兩邊靠 <em>traceparent</em> 串成同一條 trace。

</div>

<div class="grid grid-cols-2 gap-6 mt-10 max-w-3xl">
<div class="callout blue">

**前端.** `@openobserve/browser-rum`：頁面、錯誤、點擊、自訂事件、replay。

</div>
<div class="callout">

**後端.** `@opentelemetry/api-logs`：事件 log、API 存取 log、traces。

</div>
</div>

---
clicks: 3
---

# 全貌：兩條路，進同一個 org

<ArchScene />

<!--
[click] 前端：browser-rum 經 Traefik 送到 RUM 端點，落在三個系統 stream
[click] 後端：Nitro 的 logEvent 經 OTel SDK 以 OTLP 送到 default stream
[click] 前端打 /api 時帶 traceparent / baggage，後端接續同一條 trace
-->

---

# 前後端對照

| | 前端（瀏覽器） | 後端（Bun / Nitro） |
|---|---|---|
| **套件** | `@openobserve/browser-rum` | `@opentelemetry/api-logs` + `sdk-node` |
| **送什麼** | 頁面、資源、JS 錯誤、點擊、自訂事件 | 事件 log、API 存取 log、traces |
| **協定** | `/rum/v1/<org>/…` | OTLP/HTTP `/api/<org>/v1/logs` |
| **認證** | RUM client token（可公開） | HTTP Basic（**機密**） |
| **Stream** | `_rumdata` `_rumlog` `_sessionreplay` | `default` |

<div class="callout mt-6" v-click>

**前端 RUM 與後端 OTLP 要用同一個 org**（`pi_dev`／`pi_prod`），trace 才串得起來。

</div>

---
layout: section
---

<div class="eyebrow">Part 1</div>

# 前端：browser-rum

裝好、初始化，大部分就自動收了

---

# 設定：放進 public runtimeConfig

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### nuxt.config.ts

```ts
runtimeConfig: {
  public: {
    openobserveClientToken: "", // 空 = 不啟用
    openobserveSite: "",        // host[:port]
    openobserveOrg: "default",
    openobserveAppId: "pi",     // service 名稱
    openobserveInsecureHttp: "false",
    openobserveEnv: "",
    openobserveReplaySampleRate: "20",
  },
},
```

</div>
<div>

### 部署環境變數

```bash
bun add @openobserve/browser-rum@0.4.3

NUXT_PUBLIC_OPENOBSERVE_CLIENT_TOKEN=<RUM token>
NUXT_PUBLIC_OPENOBSERVE_SITE=openobserve.example.com
NUXT_PUBLIC_OPENOBSERVE_ORG=pi_dev
NUXT_PUBLIC_OPENOBSERVE_ENV=dev
```

</div>
</div>

<div class="callout mt-6" v-click>

**public 會送進瀏覽器**：只能放 RUM client token，後端的 Basic 帳密絕對不能放這裡。

</div>

---

# 初始化：openobserve.client.ts

<div class="code-sm">

```ts {all|3|5-9|10-14|all}
export default defineNuxtPlugin({ name: "openobserve", setup() {
  const cfg = useRuntimeConfig().public;
  if (!cfg.openobserveClientToken || !cfg.openobserveSite) return { provide: { openobserve: undefined } };
  try {
    openobserveRum.init({
      applicationId: cfg.openobserveAppId, clientToken: cfg.openobserveClientToken,
      site: cfg.openobserveSite, organizationIdentifier: cfg.openobserveOrg, env: cfg.openobserveEnv,
      trackUserInteractions: true, trackResources: true, defaultPrivacyLevel: "mask-user-input",
      sessionReplaySampleRate: Number(cfg.openobserveReplaySampleRate) || 0,
      allowedTracingUrls: [{                       // 只對本站 /api 加 traceparent
        match: url => new URL(url, location.origin).pathname.startsWith(apiPath),
        propagatorTypes: ["tracecontext"],
      }],
      propagateTraceBaggage: true,                 // session.id / user.id 帶給後端
    });
    openobserveRum.startSessionReplayRecording();
    return { provide: { openobserve: openobserveRum } };
  } catch { return { provide: { openobserve: undefined } }; } // 不可阻斷頁面
} });
```

</div>

<!--
[click] 沒設定就不啟用
[click] 基本設定；初始化後頁面、資源、錯誤、點擊自動收
[click] 跟後端串接的兩個關鍵設定
-->

---
clicks: 3
---

# 串到後端：traceparent ＋ baggage

<PropagationScene />

<!--
[click] RUM 開了 trace；fetch /api 時注入 traceparent 與 baggage
[click] 後端 extract，server span 接續同一個 trace_id
[click] 後端 logEvent 寫出的 log，同時帶 trace_id 與前端的 session_id
-->

---

# 自訂事件：addAction

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### app/lib/capture-event.ts

```ts
// PostHog 與 OpenObserve 共用一個出口
export function captureEvent(clients, event, props = {}) {
  const defined = Object.fromEntries(
    Object.entries(props).filter(([, v]) => v !== undefined));
  try { clients?.$posthog?.capture(event, defined); } catch {}
  try { clients?.$openobserve?.addAction(event, defined); } catch {}
}
```

</div>
<div>

### 元件裡

```vue
<script setup lang="ts">
const { capture } = usePostHog();

function onModeChange(choice: "text" | "patent") {
  capture("search_mode_changed", { mode: choice });
}
</script>
```

</div>
</div>

<div class="callout blue mt-6" v-click>

**API 呼叫自動記**：`api-client.ts` 每個請求送 `api_called`（endpoint、took_ms、success；失敗加 status、error_code），不送 body 與 query 值。

</div>

---
layout: section
---

<div class="eyebrow">Part 2</div>

# 後端：OTel Logger

不用 pino、winston，log 自帶 trace_id

---
clicks: 5
---

# 兩層架構：業務程式只碰 API

<FlowScene
  :steps="['logEvent()\ntraceFlow()', 'api-logs\nLogger', 'Batch\nProcessor', 'OTLP\nExporter', 'OpenObserve\n/v1/logs']"
  :notes="['server/utils/telemetry.ts', '@opentelemetry/api-logs', 'otel/instrumentation.mjs', 'protobuf + Basic', 'stream: default']"
  result="SDK 沒啟動時整條是 no-op"
/>

<div class="scene-caption">前兩格在應用程式 bundle 裡；後三格是 SDK，放獨立的 <code>otel/package.json</code>，用 <code>--import</code> 預載。</div>

---

# 設定與啟動

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### 環境變數（標準 OTEL_*）

```bash
# 到 org 為止，不含 /v1/logs、不加結尾斜線
OTEL_EXPORTER_OTLP_ENDPOINT=https://openobserve.example.com/api/pi_dev
# 空白寫成 %20
OTEL_EXPORTER_OTLP_HEADERS=Authorization=Basic%20<base64>
OTEL_SERVICE_NAME=pi
OTEL_RESOURCE_ATTRIBUTES=deployment.environment=dev
```

</div>
<div>

### Dockerfile

```dockerfile
RUN bun install --cwd otel --frozen-lockfile --production
COPY --from=builder /app/otel ./otel
CMD ["bun", "--import", "./otel/instrumentation.mjs",
     ".output/server/index.mjs"]
```

</div>
</div>

<div class="callout mt-6" v-click>

**Gotcha：** `bun run dev` 不會 `--import`，所以本機開發預設不送；SDK 套件版本要成組（0.223.0），混版本會靜默不出 log。

</div>

---

# SDK 啟動檔：otel/instrumentation.mjs

<div class="code-sm">

```js {all|1|2-6|7-11|12-20|all}
if (env.OTEL_SDK_DISABLED !== "true" && env.OTEL_EXPORTER_OTLP_ENDPOINT) {
  const [{ NodeSDK }, { OTLPTraceExporter }, { OTLPLogExporter }, { BatchLogRecordProcessor }] =
    await Promise.all([import("@opentelemetry/sdk-node"),
      import("@opentelemetry/exporter-trace-otlp-proto"),
      import("@opentelemetry/exporter-logs-otlp-proto"),
      import("@opentelemetry/sdk-logs")]);
  const sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter(),
    logRecordProcessors: [new BatchLogRecordProcessor({ exporter: new OTLPLogExporter() })],
  });
  sdk.start();
  // Bun preset 不處理 signal：先排空連線，再 flush
  const shutdown = () => stopping ??= (async () => {
    await Promise.all([...servers].map(server => server.stop()));
    await sdk.shutdown();
  })();
  process.once("SIGTERM", () => {
    const deadline = setTimeout(() => process.exit(1), 25000);
    void shutdown().finally(() => { clearTimeout(deadline); process.exit(0); });
  });
}
```

</div>

<!--
[click] 沒設定 endpoint 就整個不載入
[click] 動態 import，不進 Nitro bundle
[click] Batch：先緩衝再批次送
[click] 不 shutdown，最後一批 log 會遺失；25 秒上限避免卡住容器終止
-->

---

# logEvent：送一筆結構化 log

<div class="code-sm">

```ts {all|6|7|8|9|all}
const logger = logs.getLogger("pi");

export function logEvent(event: string, attrs = {}, level: "info" | "warn" | "error" = "info") {
  try {
    logger.emit({
      body: event,                                     // 事件名：search.completed
      severityText: level.toUpperCase(), severityNumber: SEVERITY[level],
      attributes: cleanAttrs({ ...attrs, ...identityAttrs(), event }), // 細節 + session.id
      context: context.active(),                       // → trace_id / span_id
    });
  } catch { /* 記錄失敗不影響請求 */ }
}
```

</div>

<div class="grid grid-cols-2 gap-6 mt-6">
<div class="callout blue" v-click>

**identityAttrs()** 從 baggage 讀前端帶來的 `session.id`、`user.id`。

</div>
<div class="callout" v-click>

**cleanAttrs()** 濾掉 null、只留純量／同型別陣列、長字串截 8000 字。

</div>
</div>

---
clicks: 4
---

# traceFlow：一次搜尋留下什麼

<TraceFlowScene />

<!--
[click] traceFlow 一開始記 search.started
[click] timed 包 embedding，子 span ＋ 計時
[click] timed 包 kNN
[click] 完成時 search.completed 帶上所有計時與 trace_id（數字為測試站平均）
-->

---

# 業務程式碼怎麼用

<div class="code-sm">

```ts
// server/utils/search.ts：整段流程 → span + search.started / completed / failed
return traceFlow("search", "search.by_text", searchConditionAttrs(params),
  t => byText(cfg, params, t),
  r => ({ "search.hits": r.results.length, "search.total": r.total }));

// 子步驟 → 子 span，耗時寫進 timings.search_embed_ms
const vector = await timed(timings, "search.embed", {}, () => embedQuery(cfg, params.text));

// server/utils/classify.ts：降級但不擋請求
logEvent("classify.label_degraded", { "error.message": err.message }, "warn");

// server/plugins/api-log.ts：每個 /api 請求一筆，依狀態碼決定等級
logEvent("api.request", { "http.route": path, "http.status_code": status, "http.duration_ms": ms },
  status >= 500 ? "error" : status >= 400 ? "warn" : "info");
```

</div>

---

# 寫 log 的守則

| 守則 | 為什麼 |
|---|---|
| **body 放事件名，資料放 attributes** | attribute 會變成獨立欄位，能 `WHERE`／`GROUP BY` |
| **事件名 `領域.動作`** | `search.completed`、`classify.label_degraded` 一眼看懂 |
| **attribute 用點分層** | 入庫變底線：`search.took_ms` → `search_took_ms` |
| **同一個 key 型別固定** | 型別由第一次寫入決定，之後不同型別會被拒 |
| **不記 query 與 request body** | 可能有 token，也可能極大 |
| **記 log 不能讓請求失敗** | 所有 `emit` 都包 `try/catch` |

---
layout: section
---

<div class="eyebrow">Part 3</div>

# 查詢與排錯

送進去之後怎麼用

---

# 用 SQL 查：測試站實測

<div class="grid grid-cols-[1.4fr_1fr] gap-6 code-sm">
<div>

```sql
-- 各 API 路由的 P95 延遲
SELECT http_route,
  approx_percentile_cont(http_duration_ms, 0.95) AS p95_ms
FROM "default" WHERE event = 'api.request'
GROUP BY http_route ORDER BY p95_ms DESC

-- 文字檢索耗時拆解
SELECT avg(search_embed_ms), avg(search_knn_ms), avg(search_took_ms)
FROM "default"
WHERE event = 'search.completed' AND search_mode = 'by-text'
```

</div>
<div>

| 路由 | P95 |
|---|---|
| GetPatentByText | 2968 ms |
| GetPatentByPatentNo | 2665 ms |
| GetPatentClassify | 709 ms |

<div class="callout mt-4" v-click>

文字檢索平均 1267 ms 裡，**embedding 佔 1099 ms**，kNN 只有 168 ms。

</div>
</div>
</div>

---

# 排錯

| 症狀 | 先查 |
|---|---|
| **後端完全沒資料** | 沒設 endpoint、沒 `--import`、endpoint 多寫 `/v1/logs` |
| **401** | Basic 字串錯、空白沒寫 `%20`、帳號沒有該 org 權限 |
| **少最後幾筆** | 沒呼叫 `sdk.shutdown()` |
| **log 沒有 trace_id** | `emit()` 沒傳 `context.active()` |
| **後端 log 沒有 session_id** | 前端沒開 baggage、`allowedTracingUrls` 沒匹配、org 不同 |
| **前端 RUM 404／CORS** | Traefik 沒轉 `/rum/v1/<org>/` 或改寫了路徑 |

<div class="callout blue mt-4" v-click>

改了 telemetry 先跑 `bun scripts/observability/verify.ts`：本機收集器，不連 OpenObserve 也能驗。

</div>

---
layout: section
---

<div class="eyebrow">Takeaways</div>

# 一個 trace_id，從瀏覽器到 log

<div class="text-left max-w-2xl mx-auto mt-8 text-lg leading-relaxed">

1. **前端：** browser-rum 初始化後自動收，自訂事件用 `addAction`
2. **後端：** OTel Logger，業務程式只碰 `logEvent`／`traceFlow`
3. **串接：** `traceparent` ＋ `baggage`，前後端同一個 org
4. **寫法：** 事件名進 body、資料進 attributes，記 log 永不擋請求

</div>

---

# 參考資料

- 完整教學文件：`openobserve-logging/openobserve-logging.md`
- pes-ipc 原始碼：`app/plugins/openobserve.client.ts`、`otel/instrumentation.mjs`、`server/utils/telemetry.ts`
- OpenObserve RUM：[openobserve.ai/docs/user-guide/rum](https://openobserve.ai/docs/user-guide/rum/)
- OpenObserve OTLP log ingestion：[openobserve.ai/docs/ingestion/logs/otlp](https://openobserve.ai/docs/ingestion/logs/otlp/)
- OpenTelemetry JS：[opentelemetry.io/docs/languages/js](https://opentelemetry.io/docs/languages/js/)
