# Webhook 是什麼？技術深剖

## 注意

- 手寫風格（rough.js 手繪圖、白底藍＋琥珀；見 skill 的「手寫風格」段落）
- 不要使用 icon
- 注意每一頁的高度不要超過螢幕高度
- 用繁體中文（技術名詞保留原文）
- 完整研究（含每條敘述的來源編號）在 `webhook-notes.md`，本檔是整理後的版本

## 來源文件 / 參考連結

- Jeff Lindsay, "Web hooks to revolutionize the web" (2007)：https://progrium.xyz/articles/2007/web-hooks-to-revolutionize-the-web/
- GitHub Docs — About webhooks：https://docs.github.com/en/webhooks/about-webhooks
- GitHub Docs — Webhook events and payloads：https://docs.github.com/en/webhooks/webhook-events-and-payloads
- GitHub Docs — Best practices for using webhooks：https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks
- GitHub Docs — Validating webhook deliveries：https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries
- GitHub Docs — Redelivering webhooks：https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/redelivering-webhooks
- GitHub Docs — Testing webhooks：https://docs.github.com/en/webhooks/testing-and-troubleshooting-webhooks/testing-webhooks
- Stripe Docs — Webhooks：https://docs.stripe.com/webhooks
- Standard Webhooks Spec：https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md
- Slack — Incoming webhooks：https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks
- LINE — Verify webhook signature：https://developers.line.biz/en/docs/messaging-api/verify-webhook-signature/
- Node.js — `crypto.timingSafeEqual`：https://nodejs.org/api/crypto.html#cryptotimingsafeequala-b
- MDN — WebSockets / Server-sent events

## 摘要

Webhook 是「使用者自訂、用 HTTP POST 發出的 callback」（Jeff Lindsay, 2007）：你把一個公開 URL 註冊到別人的系統，事件發生時對方主動 POST 一包 JSON 給你，不用再一直 polling。

接收端要處理三件事：

1. **確認是誰打來的**：用 secret 對 raw body 算 HMAC-SHA256，和 header 裡的簽章做 constant-time 比較；Stripe / Standard Webhooks 另外把 timestamp 簽進去防 replay。
2. **快速回 2xx**：GitHub 10 秒沒回就算失敗，重活要丟 queue 非同步處理。
3. **接受「至少一次、不保證順序」**：重送會帶相同 ID，用 event / delivery ID 去重；必要時回頭打 API 拿最新狀態。

各家策略差很多：GitHub **不自動重送**（只能手動 redeliver 3 天內），Stripe live mode **自動重試 3 天**。Standard Webhooks 規格（`webhook-id` / `webhook-timestamp` / `webhook-signature`）試圖統一格式。

### Running example

GitHub repo 開了一張新 issue → GitHub 發 `issues`（`action: opened`）webhook → 我們的 Bun server 驗簽、去重、丟 queue，再通知團隊。

### 關鍵事實

| 項目 | GitHub | Stripe | Standard Webhooks |
|---|---|---|---|
| 簽章 header | `X-Hub-Signature-256: sha256=<hex>` | `Stripe-Signature: t=…,v1=…` | `webhook-signature: v1,<base64>` |
| 簽什麼 | raw body | `t.rawBody` | `msg_id.timestamp.payload` |
| 防 replay | 用 `X-GitHub-Delivery` 確認唯一 | timestamp 容忍 5 分鐘 | `webhook-timestamp` |
| 逾時 | 10 秒 | 文件未載明 | 建議 15–30 秒 |
| 重送 | 不自動，手動 redeliver 3 天內 | 自動，exponential backoff 最多 3 天 | 跨多天 backoff + jitter |
| 唯一 ID | `X-GitHub-Delivery`（redeliver 不變） | event ID | `webhook-id`（重試不變） |

其他：GitHub payload 上限 25 MB；Stripe 3xx 視為失敗、`v0` 必須忽略；Standard Webhooks 收到 `410 Gone` → 停用 endpoint。Slack incoming webhook 方向相反（你 POST 給 Slack，URL 本身就是 secret）。LINE 用 `x-line-signature`（HMAC-SHA256 + Base64），一樣要 raw body。

### 安全對策

| 威脅 | 對策 |
|---|---|
| 偽造請求 | HMAC 簽章驗證 |
| Timing attack | constant-time 比較（`timingSafeEqual`，長度不同會 throw，先比長度） |
| Replay | timestamp 簽進簽章 + 容忍視窗；delivery ID 去重 |
| 竊聽 | HTTPS（Stripe 只收 TLS 1.2/1.3） |
| Secret 外洩 | 高熵 secret、定期 rotate（Stripe 可讓舊 secret 延後最多 7 天失效） |
| SSRF（做提供方時） | 經過濾 proxy 送出、webhook worker 放隔離子網 |

### 本地測試

- smee.io（GitHub 文件推薦）：`smee --url <proxy-url> --path /webhook --port 3000`，channel 不安全，只限開發
- ngrok / localtunnel / Hookdeck CLI
- `stripe listen --forward-to localhost:4242/webhook`、`stripe trigger payment_intent.succeeded`
- GitHub 可手動送 `ping`、redeliver

## 大綱 (Slide Plan)

1. **Cover** — Webhook 是什麼？ / `TitleSketch`：GitHub → POST → 你的 server → queue
2. **問題** — `PollingScene`：server 一直問 GitHub「有新 issue 嗎？」→ 浪費、延遲、rate limit → 換成 GitHub 主動 POST
3. **定義** — big-quote：user defined callbacks made with HTTP POST；callout：Unix pipe 類比 / 方向反過來
4. **Part 1 運作機制**（section）
5. `DeliveryScene` — 註冊 URL+secret → 事件 → POST → 驗簽 → 回 2xx → queue 非同步處理
6. 一次 delivery 長什麼樣 — HTTP 範例 + GitHub headers 表
7. **Part 2 安全：怎麼知道真的是 GitHub？**（section）
8. `SignatureScene` — 雙方共享 secret、HMAC(body) 比對；攻擊者偽造 → 簽章不符 → 401
9. Bun 接收端程式碼（驗簽 + 去重 + 先回 202）
10. 威脅與對策表 + raw body gotcha
11. **Part 3 可靠性：網路會出錯**（section）
12. `RetryScene` — 逾時重送、重複送達、順序錯亂 → 以 ID 去重、queue
13. 三家比較表（GitHub / Stripe / Standard Webhooks）
14. **Part 4 怎麼選、怎麼測**（section）
15. Webhook vs Polling vs WebSocket vs SSE 表
16. 本地測試工具（smee / stripe CLI）
17. **Takeaways**
18. 參考資料
