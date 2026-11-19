---
title: 快檢通後端 Log 送進 OpenObserve
info: |
  快檢通（patent-embedding-search，Nuxt 4 + Bun）後端 log 透過 OpenTelemetry Logs SDK 送到 OpenObserve
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

# 快檢通後端 Log<br>送進 OpenObserve

Nuxt 4 + Bun，用 **官方 OpenTelemetry Logs SDK**：stdout 照舊，同時送一份結構化 log。

丁吾心 · RD 技術分享

::brand::

RD Tech Talk

::art::

<TitleSketch />

---
clicks: 3
---

# 問題：log 只活在容器裡

<FlowScene
  :steps="['console.*\n單行 log', '散在 Rancher\n容器 stdout', '只能\ndocker logs | grep']"
  :notes="['[api] POST … 200 1235ms', '容器重建就沒了', '無法統計、無法告警']"
  result="送進 OpenObserve，stdout 格式不變"
/>

<div class="scene-caption">以一次文字檢索 <code>POST /api/Search/GetPatentByText</code> 為例：它留下的 log，出了容器就查不到。</div>

<!--
[click] log 散在各容器的 stdout
[click] 查問題只能進容器 grep，重建就沒了
[click] 目標：送進 OpenObserve，但不破壞大家習慣的單行格式
-->

---
layout: center
---

<div class="big-quote max-w-3xl">

每一行 log <em>照舊寫 stdout</em>，同時 emit 一筆 <em>OTel log record</em>，由官方 SDK <em>批次</em>送進 OpenObserve。

</div>

<div class="grid grid-cols-2 gap-6 mt-10 max-w-3xl">
<div class="callout blue">

**範圍.** 只送後端 server log；不開 trace，前端 RUM 另議。

</div>
<div class="callout">

**前情提要.** OpenObserve 的 org / stream / 查詢介面，見 `openobserve`、`openobserve-logging` 兩份簡報。

</div>
</div>

---
layout: section
---

<div class="eyebrow">Part 1</div>

# 選型

為什麼不是 pino，而是官方 OTel Logs SDK

---
clicks: 5
---

# 四個候選，一個一個卡關

<OptionsScene />

<div class="scene-caption">硬條件是 <strong>Bun 打包產物能跑</strong>：Nitro Bun preset 把 server 打成 <code>.output/</code>，靠 worker thread 動態載入的東西最容易壞。</div>

<!--
[click] pino transport 在 worker thread 跑：Bun / Nitro 打包後找不到 target、process 不退出、exit code 錯
[click] evlog 是 Nuxt 原生 wide-event，但要改寫整個 log 架構
[click] consola reporter：批次、重試、背壓都得自己寫
[click] Vector / Fluent Bit：應用零改動，但要能動 Rancher 主機
[click] 官方 OTel Logs SDK：官方維護、內建批次重試、純 JS
-->

---

# 方案比較

| 方案 | 優點 | 卡關點 |
|---|---|---|
| **pino + `pino-openobserve`** | OpenObserve 官方 transport | 停在 1.0.0、預設 5 分鐘才送一批；worker thread 在 Bun 打包下有已知問題 |
| **evlog** | Nuxt 原生 wide-event | 要把 log 架構改成一請求一事件 |
| **consola 自寫 reporter** | Nuxt 生態原生 | 批次、重試、背壓都要自己寫 |
| **Vector / Fluent Bit** | 應用零改動 | 要能動 Rancher 主機或加 sidecar |
| **OTel Logs SDK** ✓ | 官方維護、內建批次 / 重試、純 JS 無 worker | 要自己接 `writeLog` 與關機 flush |

<div class="callout blue mt-6" v-click>

OpenObserve 原生收 **OTLP**：用標準協定，日後換後端或加 collector 都不用改應用程式。

</div>

---

# 四個套件

<div class="grid grid-cols-[1fr_1.5fr] gap-6 code-sm">
<div>

### package.json

```json
"@opentelemetry/api": "~1.10.0",
"@opentelemetry/exporter-logs-otlp-http": "^0.301.2",
"@opentelemetry/resources": "^3.1.1",
"@opentelemetry/sdk-logs": "^3.1.1",
```

</div>
<div>

### 誰 import 什麼

```ts
// server/utils/log.ts：只依賴純 API（可單獨 bun test）
import { logs, SeverityNumber, type AttributeValue, type Attributes }
  from "@opentelemetry/api";

// server/plugins/00.otel-logs.ts：SDK 只出現在 plugin
import { diag, DiagConsoleLogger, DiagLogLevel, logs }
  from "@opentelemetry/api";
import { OTLPLogExporter }
  from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchLogRecordProcessor, LoggerProvider }
  from "@opentelemetry/sdk-logs";
```

</div>
</div>

<div class="callout mt-6" v-click>

**Gotcha：** logs API 已併進 `@opentelemetry/api`（1.10 內建 `logs`），**不用再裝 `@opentelemetry/api-logs`**；舊範例（含 pes-ipc 那份）還是舊寫法。

</div>

---
layout: section
---

<div class="eyebrow">Part 2</div>

# 一行 log，兩個出口

所有 server log 都經過 <code>writeLog()</code>

---
clicks: 4
---

# writeLog：stdout ＋ OTel record

<DualWriteScene />

<!--
[click] 一份照舊寫 stdout，info / warn / error 對應 console.log / warn / error
[click] 一份 emit OTel log record：body 是同一行字串，attributes 是結構化欄位
[click] 有設 NUXT_OPENOBSERVE_URL：00.otel-logs 註冊的 provider 批次送 OpenObserve
[click] 沒設：全域 logger 是 no-op，dev 與測試什麼都不送
-->

---

# 實作：writeLog

<div class="grid grid-cols-[1.15fr_1fr] gap-6 code-sm">
<div>

### server/utils/log.ts（精簡）

```ts {all|3-6|7-14|11-12|all}
export function writeLog(level: LogLevel, line: string,
    attributes: LogAttributeInput = {}, err?: unknown): void {
  try {
    if (err === undefined) console[CONSOLE[level]](line);
    else console[CONSOLE[level]](line, err);
  } catch {}
  try {
    logs.getLogger(OTEL_LOGGER_NAME).emit({
      severityNumber: SEVERITY[level].num, severityText: SEVERITY[level].text,
      body: line,
      attributes: compactAttributes({ "log.type": "app", ...attributes,
        ...(err === undefined ? {} : exceptionAttributes(err)) }),
    });
  } catch {}
}
```

</div>
<div>

### 一次文字檢索 → 一筆 record

```text
[api] POST /api/Search/GetPatentByText 200 1235ms
      ip=10.0.0.1 app=IPTech_CC user=alice
```

```json
{
  "log.type": "api",
  "http.request.method": "POST",
  "url.path": "/api/Search/GetPatentByText",
  "http.response.status_code": 200,
  "duration_ms": 1235,
  "client.address": "10.0.0.1",
  "app.id": "IPTech_CC",
  "enduser.id": "alice"
}
```

</div>
</div>

<!--
[click] stdout：原本的單行字串，一字不改
[click] OTel：body 放同一行，attributes 放結構化欄位
[click] compactAttributes 去掉 undefined / 空字串；帶 err 時轉成 exception.*
[click] 兩側各自 try/catch：記 log 絕不影響請求
-->

---

# attributes：三種 log.type

| log.type | 來源 | 主要欄位 |
|---|---|---|
| **`api`** | `api-log.ts` → `writeApiLog` | `http.request.method` `url.path` `url.query` `http.response.status_code` `duration_ms` `client.address` `app.id` `enduser.id` `error.code` |
| **`upstream`** | `startUpstreamLog(service, action)` | `upstream.service` `upstream.action` `upstream.outcome` `http.response.status_code` `duration_ms` `error.message` `upstream.<extra>` |
| **`app`** | 其他 `writeLog` | 自訂；帶 `err` 時加 `exception.type` / `.message` / `.stacktrace`（截 4000 字）、`error.code` |

<div class="grid grid-cols-2 gap-6 mt-6">
<div class="callout blue" v-click>

**命名照 OTel semconv**，入庫時點換成底線：`http.response.status_code` → `http_response_status_code`。

</div>
<div class="callout" v-click>

**依然不記** request body（text 可達 8000 字）與 SSO token。

</div>
</div>

---

# 註冊：00.otel-logs.ts

<div class="code-sm">

```ts {all|2-3|4|5-12|13-16|all}
export default defineNitroPlugin((nitroApp) => {
  const target = openObserveLogsExport(getConfig());
  if (!target) return;                           // 沒設 URL → 不註冊，writeLog 的 OTel 端 = no-op
  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR); // 送出失敗印到 stderr
  const provider = new LoggerProvider({
    resource: resourceFromAttributes(target.resourceAttributes),
    processors: [
      new BatchLogRecordProcessor({                // 背景批次送，不阻塞請求；佇列滿就丟
        exporter: new OTLPLogExporter({ url: target.url, headers: target.headers }),
      }),
    ],
  });
  if (!logs.setGlobalLoggerProvider(provider)) {
    console.warn("[otel-logs] 全域 LoggerProvider 已存在，略過註冊");
    return;
  }
  // …關機 flush（Part 4）
});
```

</div>

<div class="callout mt-5" v-click>

**檔名 `00.`：** Nitro plugin 依檔名排序執行，要比 `ensure-pipeline` 這類一啟動就寫 log 的 plugin 先註冊。

</div>

---
layout: section
---

<div class="eyebrow">Part 3</div>

# OpenObserve 端點與組織

一個 org、stream 分環境

---

# 端點：`/api/{org}/v1/logs`

<div class="grid grid-cols-[1.35fr_1fr] gap-6 code-sm">
<div>

### server/utils/otel-logs.ts（精簡）

```ts {all|1-2|3-5|7|all}
const base = cfg.openobserveUrl.trim().replace(/\/+$/, "");
if (!base) return null;                         // 不啟用
const headers = { "stream-name": cfg.openobserveStream };
const authorization = openObserveAuthHeader(cfg.openobserveAuth);
if (authorization) headers.Authorization = authorization;
return {
  url: `${base}/api/${encodeURIComponent(cfg.openobserveOrg)}/v1/logs`,
  headers,
  resourceAttributes: {
    "service.name": "patent-embedding-search",
    "service.version": cfg.appVersion,
    // 有設 environment 才帶
    "deployment.environment.name": cfg.openobserveEnvironment,
  },
};
```

</div>
<div>

### .env.example

```bash
# 留空＝不送，只寫 stdout
# NUXT_OPENOBSERVE_URL=https://o2.example.com
NUXT_OPENOBSERVE_ORG=quick_pat
NUXT_OPENOBSERVE_STREAM=backend_dev
# "Basic xxx" 或純 base64(email:token)
NUXT_OPENOBSERVE_AUTH=
NUXT_OPENOBSERVE_ENVIRONMENT=dev
```

</div>
</div>

<div class="callout mt-5" v-click>

**HTTP 不需要 `organization` header**：org 已在路徑裡，那個 header 只給 gRPC 用。

</div>

---
clicks: 4
---

# 組織：一個 org，stream 分環境

<OrgStreamScene />

<div class="scene-caption">預設值刻意是 dev：<code>openobserveStream: "backend_dev"</code>、<code>openobserveEnvironment: "dev"</code>。</div>

<!--
[click] 正式容器寫 backend_prod，environment=prod
[click] 測試容器寫 backend_dev，environment=dev
[click] 設定漏了只會寫錯到 dev，不會汙染正式
[click] 同一個 org：dashboard 與告警共用，prod / dev 方便對照
-->

---

# 一個 org 還是兩個？

| | 一個 org（採用） | 兩個 org（prod / dev 各一） |
|---|---|---|
| **Dashboard / 告警** | 共用一套，prod / dev 直接對照 | 每個 org 各做一套 |
| **權限** | OSS 沒有 stream 級 RBAC：看得到 dev 就看得到 prod | org 就是權限邊界，可隔離 |
| **憑證** | 同一組帳號，stream 寫錯就混到另一個環境 | 憑證各自獨立，誤寫機率低 |

<div class="callout mt-6" v-click>

**採用一個 org：** 換到共用 dashboard / 告警與對照；代價是權限不隔離，誤寫風險則靠「預設寫 dev」壓低。

</div>

---
layout: section
---

<div class="eyebrow">Part 4</div>

# 踩坑與行為變化

正式 build 才會遇到的事

---
clicks: 3
---

# 坑：docker stop 掉最後一批 log

<ShutdownScene />

<div class="scene-caption">Nitro Bun preset 正式環境<strong>不會觸發 <code>close</code> hook</strong>（只有 dev reload 會），批次佇列裡的 log 沒人 flush。</div>

<!--
[click] close hook 不觸發，process 直接結束，佇列中的 log 遺失
[click] 自己掛 SIGTERM / SIGINT：provider.shutdown() 會 flush
[click] 與 5 秒 timeout 賽跑，不拖住容器停止，最後 exit 0
-->

---

# 實作：關機 flush

<div class="code-sm">

```ts {all|1-6|8-9|11-17|all}
const shutdown = () =>
  (shuttingDown ??= Promise.race([
    provider.shutdown().catch(() => {}),          // flush 佇列 + 關 exporter
    new Promise<void>((resolve) =>
      setTimeout(resolve, SHUTDOWN_TIMEOUT_MS).unref?.()),   // 上限 5000 ms
  ]).finally(() => logs.disable()));

// dev reload：舊 Nitro 實例 flush 並解除全域註冊，新實例才能重新註冊
nitroApp.hooks.hook("close", shutdown);

if (!import.meta.dev) {
  for (const signal of ["SIGTERM", "SIGINT"] as const) {
    process.once(signal, () => {
      void shutdown().finally(() => process.exit(0));
    });
  }
}
```

</div>

<div class="callout mt-5" v-click>

**`??=` 記住同一個 Promise：** `close` 與 signal 都可能觸發，flush 只做一次。

</div>

---

# 行為變化：等級跟著嚴重度走

| 情境 | 之前 | 之後 |
|---|---|---|
| **API 2xx / 3xx** | `console.log` | info → `console.log` |
| **API 4xx** | `console.log` | warn → `console.warn` |
| **API 5xx** | `console.log` | error → `console.error`（stderr） |
| **上游例外**（連線 / 逾時） | `console.warn` | error → `console.error` |
| **未預期錯誤** | `[api] 未預期錯誤:` | `[api] 未預期錯誤: patentpilot 呼叫失敗` |

<div class="callout mt-6" v-click>

**看 stdout 的人也有感：** 5xx 改走 stderr、錯誤行直接帶訊息，不用展開物件才知道錯什麼。

</div>

---

# 驗證與下一步

<div class="grid grid-cols-2 gap-8 mt-2">
<div>

### 已驗證

- ✓ `bun test` 264 個測試通過
- ✓ `bun run typecheck` 通過
- ✓ 正式 build 對假 OTLP 接收端：路徑、header、resource 正確
- ✓ SIGTERM：佇列中的 log 有 flush 出去，exit 0

</div>
<div>

### 還沒做

- ✗ 對真實 OpenObserve 實測
- ✗ 前端 RUM：要不要做、怎麼做都還沒決定，列為後續議題

</div>
</div>

<div class="callout blue mt-8" v-click>

**測試怎麼驗 OTel：** `log.test.ts` 把全域 provider 換成 `InMemoryLogRecordExporter`，直接斷言 emit 出的 body / attributes。

</div>

---
layout: section
---

<div class="eyebrow">Takeaways</div>

# stdout 不變，多一個出口

<div class="text-left max-w-2xl mx-auto mt-8 text-lg leading-relaxed">

1. **選型：** 官方 OTel Logs SDK，純 JS、內建批次，Bun 打包可用
2. **架構：** 全部走 `writeLog`，stdout 不變，attributes 結構化
3. **開關：** 只有設了 `NUXT_OPENOBSERVE_URL` 才註冊，預設寫 dev
4. **關機：** Bun preset 沒有 `close` hook，自己掛 SIGTERM flush

</div>

---

# 參考資料

- 原始碼（patent-embedding-search）：`server/utils/log.ts`、`server/utils/otel-logs.ts`、`server/plugins/00.otel-logs.ts`
- OpenObserve OTLP log ingestion：[openobserve.ai/docs/ingestion/logs/otlp](https://openobserve.ai/docs/ingestion/logs/otlp/)
- OpenTelemetry JS：[opentelemetry.io/docs/languages/js](https://opentelemetry.io/docs/languages/js/)
- `@opentelemetry/sdk-logs`：[npmjs.com/package/@opentelemetry/sdk-logs](https://www.npmjs.com/package/@opentelemetry/sdk-logs)
- `@openobserve/pino-openobserve`：[npmjs.com/package/@openobserve/pino-openobserve](https://www.npmjs.com/package/@openobserve/pino-openobserve)
- pino transports：[getpino.io/#/docs/transports](https://getpino.io/#/docs/transports)
- Nitro plugins：[nitro.build/guide/plugins](https://nitro.build/guide/plugins)
- 本 repo 相關簡報：`openobserve/`（使用教學）、`openobserve-logging/`（前端 RUM × 後端 OTel）
