---
theme: sketch
title: Webhook 是什麼？
footer: Webhook 是什麼？ · RD 技術分享
info: |
  Webhook 是什麼？技術分享
  丁吾心
layout: cover
---

# Webhook 是什麼？

別再一直問「好了沒」，**讓對方在事件發生時打給你**。

丁吾心 · RD 技術分享

::brand::

RD Tech Talk

::art::

<TitleSketch />

---
clicks: 3
---

# 問題：怎麼知道 repo 開了新 issue？

<PollingScene />

<div class="scene-caption">想在 issue 開出來時通知團隊；一直去問 GitHub，大部分時間都在空轉。</div>

<!--
開場：我們想在 GitHub repo 有新 issue 時通知團隊，這個例子會貫穿全場。
[click] 直覺做法：polling，每 30 秒打一次 API。多數回應是空的，還有延遲，監看的 repo 一多就撞 rate limit（GitHub 文件原話）。
[click] Webhook：issue 一開，GitHub 主動 POST 一包 JSON 到我們的 URL。
[click] 結論：有事才通知，只打一次。
-->

---
layout: center
---

<div class="big-quote max-w-3xl">

Webhook 就是 <em>使用者自訂</em>、用 <em>HTTP POST</em> 發出的 callback。

</div>

<div class="grid grid-cols-2 gap-6 mt-10 max-w-3xl">
<div class="callout blue">

**像 Unix pipe。** Jeff Lindsay 2007 年提出時的比喻：把事件輸出「導向」到你指定的 URL。

</div>
<div class="callout">

**方向反過來。** 平常是你呼叫對方的 API；webhook 是對方在事件發生時呼叫你的 API。

</div>
</div>

<!--
原文："Web hooks are essentially user defined callbacks made with HTTP POST."
他從 Tim O'Reilly 的問題出發：web 時代的 pipe 是什麼？答案是：讓使用者填一個 URL，你在事件發生時 POST 過去。
-->

---
layout: section
---

<div class="eyebrow">Part 1</div>

# 運作機制

一次 delivery 從註冊到處理完

---
clicks: 4
---

# 一次 delivery 的生命週期

<DeliveryScene />

<div class="scene-caption">先在 GitHub 設定好 URL 與 secret；之後每個事件都是一次 HTTP POST。</div>

<!--
[click] 註冊：在 repo 設定填 Payload URL、secret、選要訂閱的事件（例如 Issues）。
[click] 事件發生：GitHub 發 POST，header 帶事件名稱、delivery ID、簽章。
[click] 驗簽、去重後立刻回 2xx。GitHub 10 秒沒收到回應就斷線，算這次失敗。
[click] 真正的工作丟 queue 給 worker 非同步處理。
-->

---

# 一次 delivery 長什麼樣

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### GitHub 送來的 request

```http
POST /webhook HTTP/1.1
X-GitHub-Event: issues
X-GitHub-Delivery: 72d3162e-cc78-11e3-…
X-GitHub-Hook-ID: 292430182
X-Hub-Signature-256: sha256=…
User-Agent: GitHub-Hookshot/044aadd
Content-Type: application/json

{ "action": "opened",
  "issue": { "number": 42, … },
  "repository": { … },
  "sender": { … } }
```

</div>
<div>

### 每個 header 的用途

| Header | 用途 |
|---|---|
| `X-GitHub-Event` | 事件種類 |
| `X-GitHub-Delivery` | 唯一 ID，拿來去重 |
| `X-Hub-Signature-256` | HMAC 簽章 |
| `action`（body） | 同事件的細分動作 |

</div>
</div>

<div class="callout mt-4" v-click>

**Gotcha：** 先檢查 event **和** `action` 再處理；GitHub 會持續新增事件種類。payload 超過 25 MB 時，GitHub 會直接不送。

</div>

---
layout: section
---

<div class="eyebrow">Part 2</div>

# 怎麼知道真的是 GitHub？

URL 是公開的，誰都能 POST

---
clicks: 3
---

# HMAC 簽章：只有拿到 secret 的人簽得出來

<SignatureScene />

<div class="scene-caption">簽章算的是 secret 加上 body；body 被改過一個字，或對方沒有 secret，算出來就對不上。</div>

<!--
[click] GitHub 用 secret 對 raw body 算 HMAC-SHA256，放進 X-Hub-Signature-256。
[click] 我們用同一把 secret 重算一次，比對結果。
[click] 攻擊者可以 POST 到同一個 URL，但沒有 secret 就簽不出正確的值 → 回 401。
-->

---

# 實作：Bun 接收端

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### 驗簽

```ts {all|5-7|9-10|all}
import { createHmac, timingSafeEqual } from "node:crypto"

function verify(body: string, header: string | null) {
  if (!header?.startsWith("sha256=")) return false
  const expected = Buffer.from("sha256=" +
    createHmac("sha256", process.env.WEBHOOK_SECRET!)
      .update(body).digest("hex"))
  const got = Buffer.from(header)
  return expected.length === got.length
    && timingSafeEqual(expected, got)   // constant-time
}
```

</div>
<div>

### 接收

```ts {all|2-4|5-6|7-8|all}
async fetch(req) {
  const body = await req.text()   // raw body
  if (!verify(body, req.headers.get("x-hub-signature-256")))
    return new Response("Unauthorized", { status: 401 })
  const id = req.headers.get("x-github-delivery")!
  if (await seen(id)) return new Response("dup")
  await queue.push(JSON.parse(body))
  return new Response("accepted", { status: 202 })
}
```

</div>
</div>

<div class="callout mt-4" v-click>

**Gotcha：** 一定要拿 **raw body** 驗簽。框架先 `JSON.parse` 再轉回字串，bytes 就變了，驗簽會失敗。Stripe、LINE 和 Standard Webhooks 的文件都特別提醒這點。

</div>

---

# 威脅與對策

| 威脅 | 對策 |
|---|---|
| **偽造請求** | HMAC 簽章驗證（GitHub / Stripe / LINE 都有） |
| **Timing attack** | constant-time 比較，不要用 `==`（`timingSafeEqual` 長度不同會 throw） |
| **Replay** | timestamp 簽進簽章（Stripe 預設容忍 5 分鐘）、delivery ID 去重 |
| **竊聽** | 只用 HTTPS（Stripe 只接受 TLS 1.2 / 1.3） |
| **Secret 外洩** | 高熵 secret、定期 rotate；URL 裡不放憑證 |

<div class="callout blue mt-6" v-click>

**換你當提供方時：** 使用者能填任意 URL，等於幫人打內網（SSRF）。外送要經過濾 proxy，webhook worker 放在隔離的子網。

</div>

---
layout: section
---

<div class="eyebrow">Part 3</div>

# 網路一定會出錯

至少送一次，順序不保證

---
clicks: 3
---

# 重送、重複、亂序

<RetryScene />

<div class="scene-caption">Stripe 文件寫明：同一事件可能收到不只一次，也不保證照發生的順序送達。</div>

<!--
[click] 我們處理完了，但回應太慢，Stripe 判定失敗 → 重送，同一事件來第二次。
[click] paid 比 created 先到。不要用 created 時間戳判斷順序。
[click] 對策：用 event ID 去重；邏輯不依賴順序；需要時回頭打 API 拿物件的最新狀態。
-->

---

# 各家策略差很多

| | GitHub | Stripe | Standard Webhooks |
|---|---|---|---|
| **簽章 header** | `X-Hub-Signature-256` | `Stripe-Signature` | `webhook-signature` |
| **簽什麼** | body | `t.body` | `id.timestamp.body` |
| **逾時** | 10 秒 | 文件未寫 | 建議 15–30 秒 |
| **自動重送** | ✗ 不重送，手動 3 天內 | ✓ backoff 最多 3 天 | ✓ 跨多天 + jitter |
| **唯一 ID** | `X-GitHub-Delivery` | event ID | `webhook-id` |

<div class="callout mt-6" v-click>

**Gotcha：** GitHub 失敗了**不會自己重送**。服務掛掉恢復後，要自己去 redeliver，否則那段時間的事件就丟了。

</div>

<!--
Standard Webhooks 是 Svix、Zapier、Twilio、ngrok、Kong 等推的規格，目標是讓 webhook 像 JWT 一樣有統一格式；OpenAI、Anthropic 等列為相容實作。
收到 410 Gone 時，提供方應停用該 endpoint。
-->

---
layout: section
---

<div class="eyebrow">Part 4</div>

# 怎麼選、怎麼測

webhook 不是唯一的推送方式

---

# Webhook vs Polling vs WebSocket vs SSE

| | 方向 | 連線 | 適合 |
|---|---|---|---|
| **Polling** | 你一直問對方 | 每次短連線 | 低頻、一次性查詢 |
| **Webhook** | **server → server** | 每個事件一次 POST | 系統整合：付款、CI、Git 事件 |
| **WebSocket** | 雙向 | 長連線 | 聊天、即時協作 |
| **SSE** | server → 瀏覽器 | 長連線，自動重連 | 通知、進度、LLM streaming |

<div class="callout blue mt-6" v-click>

**判斷方式：** 收事件的是後端服務、事件又不頻繁，就用 webhook；收事件的是瀏覽器、要一直推資料，就用 SSE 或 WebSocket。

</div>

---

# 本地開發：讓外網打得到 localhost

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### GitHub + smee.io

```bash
npm install -g smee-client
smee --url https://smee.io/<channel> \
     --path /webhook --port 3000
```

GitHub 文件推薦的方式。另外也可以在 GitHub 上送 `ping`，或手動 redeliver 過去的 delivery。

</div>
<div>

### Stripe CLI

```bash
stripe listen --forward-to localhost:4242/webhook
# 會印出測試用的 whsec_ secret
stripe trigger payment_intent.succeeded
```

ngrok、localtunnel 也能做到，產生一個臨時的 HTTPS URL。

</div>
</div>

<div class="callout mt-6" v-click>

**Gotcha：** smee channel 沒有認證，只能在開發環境用。正式環境用固定的 HTTPS endpoint。

</div>

---
layout: section
---

<div class="eyebrow">Takeaways</div>

# 有事打給你，但要先確認是誰打的

<div class="text-left max-w-2xl mx-auto mt-8 text-lg leading-relaxed">

1. **Webhook = HTTP callback：** 註冊 URL，事件發生時對方 POST 給你
2. **先驗證：** raw body + HMAC + constant-time 比較，有 timestamp 就檢查
3. **回應要快：** 先回 2xx，重活丟 queue
4. **假設會重複、會亂序：** 用 ID 去重，搞清楚對方會不會重送

</div>

---

# 參考資料

- Jeff Lindsay, Web hooks to revolutionize the web (2007)：[progrium.xyz](https://progrium.xyz/articles/2007/web-hooks-to-revolutionize-the-web/)
- GitHub Docs — About webhooks：[docs.github.com/en/webhooks](https://docs.github.com/en/webhooks/about-webhooks)
- GitHub Docs — Best practices：[docs.github.com/…/best-practices](https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks)
- GitHub Docs — Validating deliveries：[docs.github.com/…/validating](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries)
- Stripe Docs — Webhooks：[docs.stripe.com/webhooks](https://docs.stripe.com/webhooks)
- Standard Webhooks Spec：[github.com/standard-webhooks](https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md)
- LINE — Verify webhook signature：[developers.line.biz](https://developers.line.biz/en/docs/messaging-api/verify-webhook-signature/)
