# Webhook 是什麼？— 研究筆記（RD 技術分享用）

> 調查日期：2026-11-20。所有敘述均以官方文件／規格／原作者原文為準，來源以 `[n]` 標註，對照文末〈來源〉。無法由一手來源確認者標為 **未驗證**。
> 建議投影片切分：每個 `##` 約 1 張，共 ~14 張。

---

## 1. 一句話定義

- 原始定義（Jeff Lindsay, 2007-05-03）：**"Web hooks are essentially user defined callbacks made with HTTP POST."** [1]
- 實作方式：**"you allow the user to specify a URL where your application will post to and on what events."** [1]
- GitHub 的說法：webhook 是一種訂閱機制，你提供一個 URL 並選擇事件；事件發生時 GitHub "will send an HTTP request with data about the event to the URL that you specified." [2]
- 換句話說：**別人的系統在事件發生時，主動用 HTTP 呼叫你的 API**——也就是常被稱為「HTTP callback」或「reverse API」的概念。
  - 「reverse API」這個稱呼是業界慣用說法，本次查到的一手來源（GitHub、Stripe、Standard Webhooks 規格）都沒有使用此詞 → **未驗證（非官方用語）**。

## 2. 起源：Jeff Lindsay 與 Unix pipe

- 文章：Jeff Lindsay（progrium），〈Web hooks to revolutionize the web〉，2007-05-03 [1]。原網址 `progrium.com/blog/2007/05/03/...` 已搬遷，現址 `progrium.xyz/articles/2007/...` [1]。
- 出發點是 Tim O'Reilly 在 2000 年提出的問題：**"What is the equivalent of the pipe in the age of the web?"** [1]
- Lindsay 的類比：把事件資料送到使用者指定的 URL，"It's pretty much like re-routing `STDOUT` on the command line." [1]
- 他對 polling 的批評（以 RSS feed 為例）："feeds aren't about data coming to you. They're about you getting that data yourself. A lot. Over and over again. This is polling." [1]
- 有說法指出作者部落格在 2006-08-27 就有一篇題為 "Web hooks" 的更早文章（僅存摘要）→ **未驗證**（來源為第三方 LinkedIn 貼文，非一手）。

## 3. Push vs Polling：為什麼需要 webhook

| | Polling（輪詢） | Webhook（推送） |
|---|---|---|
| 誰發起 | 你定期呼叫對方 API | 對方在事件發生時呼叫你 |
| 即時性 | 取決於輪詢間隔 | near real-time [2] |
| 成本 | 大多數請求是「沒有新東西」 | 只在事件發生時才有流量 |
| 規模化 | 監看大量資源 "may cause you to hit your API rate limit quota quickly" [2] | 一次訂閱多個事件 [2] |

- GitHub：webhooks "require less effort and less resources than polling an API." [2]
- 但 GitHub 也明說：只是偶爾／一次性取資料，或只看少量資源且不打算擴展時，直接呼叫 API 仍然合理 [2]。

## 4. 運作機制（一次 delivery 的生命週期）

1. **註冊**：接收方在提供方（GitHub / Stripe…）設定一個公開的 URL、訂閱的事件，以及（建議）一把 secret [2][4]。
2. **事件發生**：例如 issue 被開啟、付款成功。
3. **提供方送出 HTTP POST**：body 通常是 JSON，header 帶事件類型、delivery ID、簽章 [3][4]。
4. **接收方驗證簽章** → **快速回 2xx** → 之後再非同步處理 [5][4]。
5. **失敗時**：非 2xx 或逾時 → 提供方依各自策略重送（或不重送）[4][6]。

典型 headers（以 GitHub 為例）[3]：

| Header | 用途 |
|---|---|
| `X-GitHub-Event` | 觸發的事件名稱，例如 `issues` |
| `X-GitHub-Delivery` | 此事件唯一的 GUID |
| `X-Hub-Signature-256` | `sha256=` + HMAC-SHA256(secret, body) 的 hex |
| `X-GitHub-Hook-ID` | 該 webhook 的 ID |
| `User-Agent` | 一律以 `GitHub-Hookshot/` 開頭 |

GitHub 官方範例 delivery（節錄）[3]：

```http
POST /payload HTTP/1.1
X-GitHub-Delivery: 72d3162e-cc78-11e3-81ab-4c9367dc0958
X-Hub-Signature-256: sha256=...
User-Agent: GitHub-Hookshot/044aadd
Content-Type: application/json
X-GitHub-Event: issues
X-GitHub-Hook-ID: 292430182

{ "action": "opened", "issue": { ... }, "repository": { ... }, "sender": { ... } }
```

## 5. 實例一：GitHub Webhooks

- **Headers**：見上表 [3]。`X-Hub-Signature`（SHA-1）只為向下相容保留，官方建議改用 `X-Hub-Signature-256` [3][7]。
- **Payload 格式**：`application/json` 或 `application/x-www-form-urlencoded` [3]。
- **Payload 上限 25 MB**：超過就**不會送出**（例如一次 push 大量 branch/tag 的 `create` 事件）[3]。
- **10 秒內回 2xx**：否則 GitHub "terminates the connection and considers the delivery a failure." [5]
- **不會自動重送**："GitHub does not automatically redeliver failed deliveries." [6]
  - 可手動 redeliver **過去 3 天**內的 delivery；repo webhook 需 admin、org webhook 需 owner [6]。
  - 手動 redeliver 會保留原本的 `X-GitHub-Delivery` 值 [5]。
- **先檢查事件類型與 action**：GitHub 會持續新增事件與 action，事件在 `X-GitHub-Event`，action 在 payload 頂層 `action` [5]。
- **只訂閱需要的事件**，降低伺服器負載 [5]。

## 6. 實例二：Stripe Webhooks

- **必須是公開 HTTPS URL**；最多註冊 16 個 event destinations；僅支援 TLS 1.2 / 1.3 [4]。
- **Signing secret** 以 `whsec_` 開頭，每個 endpoint 各自獨立，test / live 也不同 [4]。
- **`Stripe-Signature` header**（實際為單行）[4]：
  ```
  Stripe-Signature: t=1798765432,v1=5257a869...,v0=6ffbb59b...
  ```
  - `t`：Stripe 簽署的 Unix 時間（秒），不是事件建立時間。
  - `v1`：HMAC-SHA256 簽章，可能出現多個（secret rotation 期間）。
  - `v0`：sandbox 才有的假簽章，**必須忽略**。為防 downgrade attack，只用 `t` 與 `v1` [4]。
  - 可能附帶 `secret` / `destination` / `payload` 除錯欄位，它們**不在 HMAC 範圍內**，不可用來驗證 [4]。
- **手動驗證步驟** [4]：
  1. 以 `,` 切開，再以 `=` 切成 key/value，保留 `t` 與所有 `v1`。
  2. `signed_payload = t + "." + 原始 request body`（不可重新格式化）。
  3. 以 endpoint secret 為 key 算 HMAC-SHA256。
  4. 用 **constant-time** 比較與每個 `v1` 比對；任一相符後再檢查時間差是否在容忍範圍內。
- **Replay 防護**：官方 library 預設容忍 **5 分鐘**；不要設 0（等於關閉檢查）；伺服器時鐘用 NTP 同步。每次重送都會產生新的 timestamp 與簽章 [4]。
- **自動重試**：live mode 下 **最多 3 天、exponential backoff**；sandbox 則在幾小時內重試 3 次 [4]。
- **手動重送**：Dashboard 15 天內、CLI `stripe events resend` 30 天內 [4]。
- **順序不保證**："Stripe doesn't guarantee the delivery of events in the order that they're generated." 不要用 `created` 判斷順序或是否處理過，要追蹤 event ID [4]。
- **重複事件**：endpoint "might occasionally receive the same event more than once" → 記錄已處理的 event ID [4]。
- **快速回 2xx**：在任何可能導致逾時的複雜邏輯之前就回 `200`（例：先回 200 再把發票標成已付款）[4]。
- **3xx 視為失敗**（不跟隨 redirect）[4]。
- **框架的 CSRF 保護**要對 webhook route 豁免（Rails / Django 等）[4]。
- **Thin vs Snapshot events**：Stripe 新整合建議用 thin（只帶參照，再 `fetchRelatedObject()` 拿最新資料）[4]。
- Stripe 的確切 timeout 秒數文件未載明 → **未驗證**。

## 7. 實例三：其他平台（簡述）

- **Slack Incoming Webhooks**（方向相反：**你** POST 給 Slack）[8]：
  - "a way to post messages from apps into Slack"；URL 形如 `https://hooks.slack.com/services/T.../B.../XXXX`。
  - 成功回 200 + 純文字 `ok`。
  - "Your webhook URL contains a secret."，且 "Slack actively searches out and revokes leaked secrets." → **URL 本身就是憑證**。
- **LINE Messaging API**（與台灣聽眾相關）[9]：
  - Header `x-line-signature`，HMAC-SHA256（key 為 channel secret），Base64 編碼。
  - 必須用 "the exact string in the received webhook request body" 驗證；`json.loads`、pretty-print、proxy 改寫都會讓驗證失敗。
- **Discord webhooks**：官方文件本次連線失敗無法取得 → **未驗證**，投影片建議不放或僅口頭提及。

> 小結：「webhook」一詞涵蓋兩個方向——**outgoing**（GitHub/Stripe/LINE 打你）與 **incoming**（你打 Slack）。本次分享主角是前者。

## 8. Standard Webhooks 規格

- 目的：產業各家格式不一，提出 "a set of strict webhook guidelines based on the existing industry best practices"，希望 "do for webhooks what JWT did for API authentication" [10]。
- 技術指導委員會來自 Zapier、Twilio、Lob、Mux、ngrok、Supabase、Svix、Kong；官網列出 OpenAI、Anthropic、Google Gemini、Brex、Resend 等相容實作；提供 Python / JS/TS / Java / Rust / Go / Ruby / PHP / C# / Elixir SDK [11]。
- **三個 headers** [10]：

| Header | 內容 |
|---|---|
| `webhook-id` | 訊息唯一 ID，**重試時不變**（可當 idempotency key） |
| `webhook-timestamp` | 本次嘗試的 Unix 秒數 |
| `webhook-signature` | 以空白分隔的簽章列表，如 `v1,<base64>` |

- **簽章內容**：`msg_id.timestamp.payload`（對稱式）[10]。
- **`v1`**：HMAC-SHA256，key 是 `whsec_` 之後的 base64 解碼值，結果 base64；secret 24–64 bytes、每個 endpoint 唯一 [10]。
- **非對稱**：`v1a` 已被標為 deprecated，改用 **`v2a`**（ed25519；signed content 加上 endpoint_id），規格建議 "Prefer asymmetric signature schemes over symmetric ones." [10]
- **Rotation**：期間同時送新舊兩組簽章，接收方逐一驗證直到相符 [10]。
- **Payload 建議**：`{ type: "user.created", timestamp: ISO8601, data: {...} }`，通常 < 20 KB；推薦 thin payload（"you can always make a thin one full, but not the other way around"）[10]。
- **狀態碼語意**：只有 2xx 算成功；3xx 失敗且不跟隨；`410 Gone` → 送方應停用該 endpoint；429/502/504 → 降速；遵守 `retry-after` [10]。
- **Timeout 建議 15–30 秒**；重試應跨多天、exponential backoff + jitter（範例約 75 小時）[10]。

## 9. 安全性

| 威脅 | 對策 | 來源 |
|---|---|---|
| 偽造請求 | **HMAC 簽章驗證**（GitHub `X-Hub-Signature-256`、Stripe `v1`、LINE `x-line-signature`、Standard Webhooks `v1`） | [7][4][9][10] |
| Timing attack | **constant-time 比較**，"Never use a plain `==` operator."；Node 用 `crypto.timingSafeEqual`（長度不同會 throw，需先比長度） | [7][12] |
| Replay attack | 把 timestamp 納入簽章並設容忍視窗（Stripe 預設 5 分鐘）；GitHub 建議用 `X-GitHub-Delivery` 確認唯一性 | [4][5][10] |
| 竊聽／中間人 | HTTPS；GitHub 預設驗證 SSL 憑證，建議保持開啟；Stripe 只支援 TLS 1.2/1.3 | [5][4] |
| Secret 外洩 | 高熵隨機 secret，不要把憑證放進 URL；定期 rotate（Stripe 可延遲舊 secret 失效最多 7 天） | [5][4] |
| 來源偽冒 | **IP allowlist**：GitHub 用 `GET /meta` 取得並定期更新；Stripe 提供 IP 清單 | [5][4] |
| **SSRF（提供方視角）** | 使用者可填任意 URL → 透過過濾 proxy（如 smokescreen）送出，webhook worker 放在無法連到內網的隔離子網 | [10] |

> 重點提醒：**要用 raw body 驗簽**。框架先 parse JSON 再 stringify 回來，位元組就變了——Stripe、LINE、Standard Webhooks 都特別警告這點 [4][9][10]。

## 10. 可靠性 Best Practices

1. **快速回 2xx，非同步處理**：GitHub 10 秒 [5]、Stripe "before any complex logic" [4]；建議放進 queue（GitHub 舉例 Hookdeck、Resque、RQ、RabbitMQ [5]；Stripe 提到月初訂閱大量續約時的流量尖峰 [4]）。
2. **Idempotency**：以 event/delivery ID 去重——Stripe event ID [4]、GitHub `X-GitHub-Delivery` [5]、Standard Webhooks `webhook-id`（例："save the IDs in redis for 5 minutes"）[10]。
3. **At-least-once**：Stripe 明說同一事件可能收到多次 [4]，Standard Webhooks 的 `webhook-id` 重試不變即為此設計 [10]。「at-least-once」一詞本身未見於上述官方文件原文 → 詞彙為業界通稱。
4. **不保證順序**：設計上不依賴事件到達順序 [4]。
5. **重新向 API 取資料，而非完全相信 payload**：Stripe 建議缺漏時用 API 取回物件、thin event 用 `fetchRelatedObject()` 拿最新版本 [4]；Standard Webhooks 推 thin payload [10]。
6. **補送機制**：GitHub 不自動重送，服務恢復後要自己 redeliver [5][6]；Stripe 自動重試 3 天 [4]。
7. **只訂閱需要的事件** [5][4]。

## 11. Webhook vs Polling vs WebSocket vs SSE

| | 方向 | 連線 | 典型場景 |
|---|---|---|---|
| Polling | client → server 反覆詢問 | 每次短連線 | 低頻、一次性查詢 [2] |
| **Webhook** | **server → server**（提供方 POST 到你的公開 URL） | 每事件一次 HTTP request | 系統整合：付款、CI、Git 事件 [2][4] |
| WebSocket | 雙向 | 長連線 | 聊天、協作；"two-way interactive communication session between the user's browser and a server" [13] |
| SSE | 單向 server → client（`EventSource`、`text/event-stream`） | 長連線 HTTP，自動重連 | 通知、進度、LLM streaming；"This is a one-way connection" [14] |

> 判斷口訣：**接收方是後端服務、事件稀疏 → webhook；接收方是瀏覽器、需要持續推送 → SSE/WebSocket。**（此為整理歸納，非引用。）

## 12. 本地開發與測試工具

- **smee.io**（GitHub 文件主推）：開 channel → 拿 Webhook Proxy URL 填進 GitHub → `npm install -g smee-client` → `smee --url WEBHOOK_PROXY_URL --path /webhook --port 3000`。⚠️ channel "not authenticated or secure"，僅限開發 [15]。
- **ngrok / localtunnel / Hookdeck CLI**：GitHub 列為替代方案 [15]；Stripe 也建議用 ngrok 產生臨時 HTTPS URL [4]。
- **Stripe CLI** [4]：
  ```bash
  stripe login
  stripe listen --forward-to localhost:4242/webhook   # 會印出 whsec_ 測試用 secret
  stripe trigger payment_intent.succeeded            # 觸發測試事件
  stripe events resend <event_id> --webhook-endpoint=<endpoint_id>
  ```
- **GitHub**：可透過 REST API 觸發 `ping` 事件；redeliver 過去 3 天的 delivery [15][6]。
- **Stripe Workbench → Event deliveries**：看每次投遞的狀態碼與下次重試時間 [4]。

## 13. 最小接收端範例（Bun + TypeScript，驗 GitHub 簽章）

依據 GitHub 官方驗簽說明 [7] 與 Node `crypto.timingSafeEqual` 文件 [12] 撰寫；已用 GitHub 官方測試向量本機驗證回傳 `true`。

```ts
// server.ts — bun run server.ts
import { createHmac, timingSafeEqual } from "node:crypto";

const SECRET = process.env.WEBHOOK_SECRET!;

function verifySignature(body: string, header: string | null): boolean {
  if (!header?.startsWith("sha256=")) return false;
  const expected = Buffer.from(
    "sha256=" + createHmac("sha256", SECRET).update(body, "utf8").digest("hex"),
  );
  const received = Buffer.from(header);
  // timingSafeEqual 長度不同會 throw，先比長度
  return expected.length === received.length && timingSafeEqual(expected, received);
}

const seen = new Set<string>(); // demo 用；正式環境請用 Redis / DB

Bun.serve({
  port: 3000,
  async fetch(req) {
    if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

    const body = await req.text(); // ⚠️ 用 raw body 驗簽，不要先 JSON.parse
    if (!verifySignature(body, req.headers.get("x-hub-signature-256"))) {
      return new Response("Unauthorized", { status: 401 });
    }

    const deliveryId = req.headers.get("x-github-delivery")!;
    if (seen.has(deliveryId)) return new Response("duplicate", { status: 200 });
    seen.add(deliveryId);

    const event = req.headers.get("x-github-event");
    const payload = JSON.parse(body);
    queueMicrotask(() => handle(event, payload)); // 先回 2xx，再非同步處理（正式環境用 queue）

    return new Response("accepted", { status: 202 });
  },
});

function handle(event: string | null, payload: any) {
  if (event === "issues" && payload.action === "opened") {
    console.log(`New issue #${payload.issue.number}: ${payload.issue.title}`);
  }
}
```

GitHub 官方測試向量 [7]：

| | 值 |
|---|---|
| secret | `It's a Secret to Everybody` |
| payload | `Hello, World!` |
| 預期 header | `sha256=757107ea0eb2509fc211221cce984b8a37570b6d7586c22c46f4379c8b043e17` |

- GitHub 官方 JS 範例改用 Web Crypto `crypto.subtle.verify`（內建安全比較）；TS 範例用 `@octokit/webhooks` 的 `webhooks.verify(body, signature)` [7]。正式專案建議直接用官方 SDK（Stripe 也是同樣建議 [4]）。

## 14. 投影片重點 Checklist（收尾頁）

- [ ] 用 HTTPS endpoint
- [ ] 用 **raw body** + **constant-time** 驗 HMAC 簽章
- [ ] 檢查 timestamp 防 replay
- [ ] 2xx 要快（GitHub 10 秒），重活丟 queue
- [ ] 以 event / delivery ID 做 idempotency
- [ ] 不依賴事件順序；需要時回頭打 API 拿最新狀態
- [ ] 了解提供方的重試策略（GitHub 不重送 vs Stripe 3 天）
- [ ] Secret 定期 rotate，URL 不放憑證
- [ ] 做提供方時：防 SSRF、遵循 Standard Webhooks

---

## 來源

1. Jeff Lindsay, "Web hooks to revolutionize the web" (2007-05-03) — https://progrium.xyz/articles/2007/web-hooks-to-revolutionize-the-web/ （舊址 http://progrium.com/blog/2007/05/03/web-hooks-to-revolutionize-the-web/）
2. GitHub Docs — About webhooks: https://docs.github.com/en/webhooks/about-webhooks
3. GitHub Docs — Webhook events and payloads（delivery headers、25 MB 上限）: https://docs.github.com/en/webhooks/webhook-events-and-payloads
4. Stripe Docs — Receive Stripe events in your webhook endpoint: https://docs.stripe.com/webhooks （IP 清單：https://docs.stripe.com/ips）
5. GitHub Docs — Best practices for using webhooks: https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks
6. GitHub Docs — Redelivering webhooks: https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/redelivering-webhooks
7. GitHub Docs — Validating webhook deliveries: https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
8. Slack Developer Docs — Sending messages using incoming webhooks: https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks
9. LINE Developers — Verify webhook signature: https://developers.line.biz/en/docs/messaging-api/verify-webhook-signature/
10. Standard Webhooks Spec: https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md
11. Standard Webhooks 官網: https://www.standardwebhooks.com/
12. Node.js Docs — `crypto.timingSafeEqual(a, b)`: https://nodejs.org/api/crypto.html#cryptotimingsafeequala-b
13. MDN — WebSockets API: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
14. MDN — Using server-sent events: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
15. GitHub Docs — Testing webhooks（smee.io、ngrok、ping）: https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/testing-webhooks
