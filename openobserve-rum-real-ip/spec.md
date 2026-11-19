# OpenObserve pi_prod 前端 RUM 的使用者 IP 為何全是 Traefik 的 IP

## 注意

- 手寫風格（rough.js 手繪圖、白底藍＋琥珀；見 skill 的「手寫風格」段落）
- 不要使用 icon
- 注意每一頁的高度不要超過螢幕高度
- 用繁體中文（技術名詞保留原文）
- **鐵則：每個陳述都要標明「已確認（附證據）」或「猜測」。** 猜測一律用推測語氣（「可能」「推測」「尚未確認」），不准用肯定句。投影片上以 `.tag.ok`（綠，已確認）／`.tag.guess`（橘虛線，猜測）／`.tag.derived`（藍，由原始碼推得）標籤區分；猜測的手繪圖用虛線框。

## 來源文件 / 參考連結

- pes-ipc `app/plugins/openobserve.client.ts`（前端 RUM 初始化）
- pes-ipc `.env.example`（「Traefik 必須代理 /rum/v1/{org}/ POST 至 OpenObserve，保留完整路徑。」）
- OpenObserve pi_prod `_rumdata` stream、`default` traces stream（經 OpenObserve MCP 查詢）
- OpenObserve 原始碼（GitHub `main` 分支，**不一定等於 pi_prod 部署版本**）
  - https://github.com/openobserve/openobserve/blob/main/src/config/src/config.rs （`ZO_HTTP_REAL_IP_SOURCE`）
  - https://github.com/openobserve/openobserve/blob/main/src/config/src/axum/middlewares/real_ip.rs （`extract_real_ip`）
  - https://github.com/openobserve/openobserve/blob/main/src/common/src/meta/middleware_data.rs （RUM `ip` 與 MaxMind geo）
- Traefik forwarded headers：https://doc.traefik.io/traefik/routing/entrypoints/#forwarded-headers
- nginx `ngx_http_realip_module`：https://nginx.org/en/docs/http/ngx_http_realip_module.html

## 摘要

pi_prod 的前端 RUM（`_rumdata`）134,388 筆、545 個 `usr_id`，`ip` 欄位卻只有一個值 `192.168.99.11`——專案負責人確認那是 Traefik。前端程式碼根本不送 IP；`ip` 是 OpenObserve 伺服器收到請求時，由 `extract_real_ip` 中介層依 `ZO_HTTP_REAL_IP_SOURCE`（預設 `XEnvoyExternalAddress,XRealIp,RightmostXForwardedFor`，最後退回 TCP 對端）決定。對照組：同一個 org 的後端 traces `client_address` 是真實外部 IP，代表「到 Nuxt 的那條路」有正確傳遞。問題出在「瀏覽器 → Traefik → OpenObserve」這段，但中間到底經過幾層代理、OpenObserve 的設定與版本為何，目前**尚未確認**。

## 已確認（有證據）

1. **前端不送 IP。** `openobserve.client.ts` 只呼叫 `openobserveRum.setUser({ id, name, email: name })`（`browserAnonId()` 匿名 id）與 `openobserveRum.init({...})`，沒有任何 IP 欄位。`_rumdata.ip` 是 OpenObserve 伺服器端補上的。
2. **RUM 請求路徑。** 瀏覽器 → Traefik（代理 `/rum/v1/pi_prod/`）→ OpenObserve。證據：`.env.example` 註解「Traefik 必須代理 /rum/v1/{org}/ POST 至 OpenObserve，保留完整路徑。」
3. **數據。** pi_prod `_rumdata` 全期間 134,388 筆、545 個 `usr_id`，`ip` 只有一個值 `192.168.99.11`。專案負責人確認 192.168.99.11 是 Traefik。`_rumdata` schema 沒有任何 geo（country / city）欄位。
4. **對照組。** pi_prod `default` traces（Nuxt 後端 OTel span）的 `client_address` 是真實外部 IP（例：60.251.214.112、49.218.229.234、220.130.142.210、174.160.113.217），`network_peer_address` 是 `10.42.93.150`。→ 送到 Nuxt 的那條路有正確帶使用者 IP。
5. **OpenObserve 原始碼（main 分支）。**
   - `config.rs`：

     ```rust
     #[env_config(
         name = "ZO_HTTP_REAL_IP_SOURCE",
         default = "XEnvoyExternalAddress,XRealIp,RightmostXForwardedFor",
         help = "Comma-separated list of sources to resolve the real client IP; tried in \
                 order, first match wins. TCP peer (ConnectInfo) is always used as the final \
                 fallback. Supported entries: XEnvoyExternalAddress (Envoy/Istio), \
                 XRealIp (nginx, Traefik), RightmostXForwardedFor (nginx/HAProxy/AWS ALB/GCP LB), \
                 ..."
     )]
     pub real_ip_source: String,
     ```

   - `real_ip.rs`：`extract_real_ip` 依序嘗試每個 source，第一個成功者勝；都失敗才退回 `ConnectInfo`（TCP 對端），結果存成 `RealIp`。

     ```rust
     for source in sources.0.iter() {
         parts.extensions.insert(source.clone());
         if let Ok(ClientIp(ip)) = ClientIp::from_request_parts(&mut parts, &()).await {
             resolved = Some(ip);
             break;
         }
     }
     // Implicit fallback: TCP peer. ...
     if resolved.is_none() {
         resolved = parts.extensions.get::<ConnectInfo<SocketAddr>>().map(|c| c.0.ip());
     }
     ```

   - `middleware_data.rs`：RUM 的 `ip` 取自 `RealIp`，再拿它去 MaxMind 查 geo。

     ```rust
     let ip = parts.extensions.get::<RealIp>().map(|r| r.0)
         .unwrap_or(IpAddr::V4(std::net::Ipv4Addr::new(127, 0, 0, 1)));
     user_agent_hashmap.insert("ip".into(), ip.to_string().into());
     // ... client.city_reader.lookup(ip) → GeoInfoData { city, country, ... }
     ```

   - **由原始碼推得：** `ip` 修好後 geo 欄位也會一併出現；內網 IP（192.168.x.x）在 MaxMind 查不到，因此目前沒有 geo 欄位。
6. **名詞。**
   - **Ingress**：站在服務前面、接外部連線再轉進去的反向代理。K8s 中 Ingress 是路由規則，實際做事的是 Ingress Controller（常見 Traefik / nginx）。
   - 每過一層代理，該層看到的來源就變成上一層，必須靠 `X-Real-Ip` / `X-Forwarded-For` 傳遞真實 IP；任何一層不信任上一層而覆寫 header，真實 IP 就斷了。
   - `X-Real-Ip` 只代表「最後一層代理看到的直接連線者」，不保證是使用者本人。

## 猜測（尚未確認，一律推測語氣）

- **推測鏈路：** 瀏覽器 → Traefik（192.168.99.11）→ OpenObserve 前面另一層 ingress（`openobserve.in.twpat.com`，可能是 Traefik 或 nginx）→ OpenObserve。
- **推測機制：** 那層 ingress 可能不信任 192.168.99.11，把 `X-Real-Ip` 覆寫成 192.168.99.11，XFF 變成「使用者IP, 192.168.99.11」；OpenObserve 讀 `XRealIp`（或 `RightmostXForwardedFor`）都可能得到 192.168.99.11。
- **支持線索：** 若 header 完全沒傳到，OpenObserve 退回 TCP 對端時應記到「直接連線者」的 IP；記到的恰好是 Traefik 而非其他位址，與「中間某層把 header 改成 Traefik IP」吻合。
- **但無法排除：** 若 Traefik 直連 OpenObserve 且 OpenObserve 只用 ConnectInfo，同樣會得到 99.11。
- **其他可能原因：**
  - pi_prod 的 `ZO_HTTP_REAL_IP_SOURCE` 可能被設成 `ConnectInfo`。
  - pi_prod 可能跑的是尚無此機制的舊版 OpenObserve。
- **可能修法（未驗證）：** 在 OpenObserve 前那層 ingress 信任 192.168.99.11。
  - Traefik：entryPoint `forwardedHeaders.trustedIPs`
  - nginx：`set_real_ip_from 192.168.99.11; real_ip_header X-Real-IP;`
  - 前端不需改。

## 待確認事項（給 OpenObserve 部署負責人）

1. pi_prod OpenObserve 的 `ZO_HTTP_REAL_IP_SOURCE` 與版本；或啟動 log 中 `HTTP client IP sources (in order, implicit ConnectInfo fallback): ...` 這行。
2. `/rum/v1/pi_prod/` 從 Traefik 到 OpenObserve 實際經過幾層代理、各是什麼、`X-Real-Ip` / `X-Forwarded-For` 是否一路保留。
3. 調查限制：OpenObserve MCP 沒有讀伺服器設定 / 版本的工具，上述兩項無法從 MCP 查。
4. 暫時替代：後端 traces 的 `client_address` 已有真實 IP，可先用來做使用者 IP 統計。

## 大綱 (Slide Plan)

Running example：一位使用者（IP 60.251.214.112）開啟快檢通，同時送出 RUM 事件與 API 請求。

1. Cover — `TitleSketch`：瀏覽器 → Traefik → ? → OpenObserve，tagline「545 位使用者，1 個 IP」
2. 問題 scene — `FunnelScene`：545 個 usr_id 全落到 `192.168.99.11`（已確認）
3. 定義（center）— `_rumdata.ip` 不是前端送的，是 OpenObserve 依 header／TCP 對端補上的
4. 標籤圖例 — 已確認／由原始碼推得／猜測 三種標記怎麼讀
5. Part 1 已確認的證據（section）
6. 前端程式碼（code）— `setUser` / `init`，無 IP（已確認）
7. 兩條路 scene — `TwoPathsScene`：RUM 路 ip=99.11 vs API 路 client_address=真實 IP（已確認）
8. 數據表（table）— `_rumdata` vs traces 對照（已確認）
9. OpenObserve 怎麼決定 ip scene — `RealIpScene`：XEnvoyExternalAddress → XRealIp → RightmostXFF → ConnectInfo → RealIp → ip + geo（原始碼）
10. 原始碼（code）— config.rs 預設值 + middleware_data.rs ip/geo；callout：main ≠ pi_prod 版本；geo 推論（由原始碼推得）
11. Part 2 名詞（section）
12. Ingress 與 X-Real-Ip scene — `HopScene`：每過一層，看到的來源變成上一層；header 被覆寫就斷（已確認＝通用知識）
13. Part 3 猜測（section）
14. 猜測鏈路 scene — `GuessChainScene`：虛線框、全頁標「猜測」
15. 證據強度 — 支持線索 vs 無法排除；其他可能原因（猜測）
16. 可能修法（code，未驗證）— Traefik / nginx 設定
17. 待確認事項 — 給部署負責人的 4 點
18. Takeaways
19. 參考資料
