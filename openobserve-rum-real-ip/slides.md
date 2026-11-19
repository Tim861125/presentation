---
title: RUM 使用者 IP 全是 Traefik
info: |
  OpenObserve pi_prod 前端 RUM 的使用者 IP 為何全是 Traefik 的 IP
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

# RUM 使用者 IP 為何全是 Traefik？

OpenObserve pi_prod 的 `_rumdata.ip`：**545 位使用者，只有 1 個 IP**。哪些已確認、哪些還只是猜測。

丁吾心 · RD 技術分享

::brand::

RD Tech Talk

::art::

<TitleSketch />

---
clicks: 3
---

# 問題：545 人，1 個 IP <span class="tag ok">已確認</span>

<FunnelScene />

<div class="scene-caption">pi_prod <code>_rumdata</code> 全期間查詢結果；專案負責人確認 192.168.99.11 是 Traefik。</div>

<!--
[click] 所有 RUM 請求都經過 Traefik 代理 /rum/v1/pi_prod/
[click] _rumdata 的 ip 欄位只有一個值 192.168.99.11，而且沒有任何 geo 欄位
[click] 134,388 筆、545 個 usr_id，全部同一個 IP
-->

---
layout: center
---

<div class="big-quote max-w-3xl">

`_rumdata.ip` 不是前端送的，是 <em>OpenObserve 收到請求時</em> 依 <em>header 或 TCP 對端</em> 自己補上的。

</div>

<div class="grid grid-cols-2 gap-6 mt-10 max-w-3xl">
<div class="callout ok">

**已確認.** 前端只送匿名 `usr_id`，程式碼裡沒有任何 IP。

</div>
<div class="callout">

**所以要查的是.** 請求到 OpenObserve 時，header 裡的 IP 長什麼樣。

</div>
</div>

---

# 怎麼讀這份簡報

<div class="legend-row mt-6">
<div><span class="tag ok">已確認</span></div>
<div>

有證據：程式碼、OpenObserve 查詢結果、專案負責人確認

</div>
<div><span class="tag derived">原始碼推得</span></div>
<div>

讀 OpenObserve **GitHub main** 原始碼推出來的；pi_prod 部署版本**不一定相同**

</div>
<div><span class="tag guess">猜測</span></div>
<div>

尚未確認的推測，一律用「可能／推測」語氣，手繪圖用**虛線框**

</div>
</div>

<div class="callout blue mt-10">

**調查限制：** OpenObserve MCP 沒有讀伺服器設定／版本的工具，pi_prod 的實際設定只能請部署負責人提供。

</div>

---
layout: section
---

<div class="eyebrow">Part 1</div>

# 已確認的證據

前端 · RUM 數據 · traces 對照 · 原始碼

---

# 前端只送匿名 id <span class="tag ok">已確認</span>

<div class="grid grid-cols-[1.2fr_1fr] gap-6 items-start">
<div class="code-sm">

```ts {all|3|4|all}
// pes-ipc app/plugins/openobserve.client.ts（節錄）
const id = browserAnonId();
const name = anonName(id);
openobserveRum.setUser({ id, name, email: name });
openobserveRum.init({
  applicationId: cfg.openobserveAppId,
  clientToken: cfg.openobserveClientToken,
  site: cfg.openobserveSite,
  organizationIdentifier: cfg.openobserveOrg,
  // …沒有任何 IP 相關設定
});
```

</div>
<div>

- `setUser` 只給 `id` / `name` / `email`（匿名）
- `init` 只有 app / token / site / org 等設定
- 前端**拿不到也不送**自己的對外 IP

<div class="callout mt-4" v-click>

**路徑：** 瀏覽器 → Traefik（代理 `/rum/v1/pi_prod/`）→ OpenObserve。依 `.env.example`：「Traefik 必須代理 /rum/v1/{org}/ POST 至 OpenObserve」。

</div>
</div>
</div>

---
clicks: 5
---

# 兩條路，兩種結果 <span class="tag ok">已確認</span>

<TwoPathsScene />

<div class="scene-caption">同一個 org（pi_prod）；Traefik 到 OpenObserve 中間經過什麼，此頁不做假設（以「?」表示）。</div>

<!--
[click] RUM 路：瀏覽器 → Traefik → OpenObserve
[click] _rumdata.ip 全是 192.168.99.11
[click] API 路：瀏覽器 → Nuxt 後端，Nuxt 用 OTel 送 span
[click] traces 的 client_address 是真實外部 IP
[click] 所以真實 IP 在 RUM 這條路上丟了
-->

---

# 數據對照 <span class="tag ok">已確認</span>

| | `_rumdata`（前端 RUM） | `default` traces（Nuxt OTel） |
|---|---|---|
| **資料量** | 134,388 筆 · 545 個 `usr_id` | — |
| **IP 欄位** | `ip` | `client_address` |
| **值** | 只有 `192.168.99.11`（Traefik） | 60.251.214.112、49.218.229.234、220.130.142.210、174.160.113.217… |
| **對端** | — | `network_peer_address` = `10.42.93.150` |
| **geo 欄位** | schema 裡沒有 country / city | — |

<div class="callout ok mt-6" v-click>

**結論：** 到 Nuxt 的那條路有正確帶使用者 IP，問題只在「到 OpenObserve RUM 端點」這條路。

</div>

---
clicks: 4
---

# OpenObserve 怎麼決定 ip <span class="tag derived">原始碼推得</span>

<RealIpScene />

<div class="scene-caption"><code>extract_real_ip</code> 中介層（<code>real_ip.rs</code>）＋ RUM 欄位補值（<code>middleware_data.rs</code>），GitHub main 分支。</div>

<!--
[click] 每個來源依序試，第一個成功者勝
[click] 全部失敗才退回 TCP 對端 ConnectInfo
[click] 結果存成 RealIp，RUM 的 ip 欄位就取這個
[click] 同一個 IP 再拿去查 MaxMind geo，內網 IP 查不到，所以目前沒有 geo 欄位
-->

---

# 原始碼節錄 <span class="tag derived">原始碼推得</span>

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### `config.rs`

```rust
#[env_config(
    name = "ZO_HTTP_REAL_IP_SOURCE",
    default =
    "XEnvoyExternalAddress,XRealIp,RightmostXForwardedFor",
    help = "... tried in order, first match wins. \
            TCP peer (ConnectInfo) is always used as the \
            final fallback. ... XRealIp (nginx, Traefik), \
            RightmostXForwardedFor (nginx/HAProxy/...)"
)]
pub real_ip_source: String,
```

</div>
<div>

### `middleware_data.rs`

```rust
let ip = parts
    .extensions
    .get::<RealIp>()
    .map(|r| r.0)
    .unwrap_or(IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1)));

user_agent_hashmap.insert("ip".into(), ip.to_string().into());
// ... city_reader.lookup(ip) → GeoInfoData
```

</div>
</div>

<div class="callout mt-5" v-click>

**注意：** 這是 GitHub **main**。pi_prod 跑哪一版、`ZO_HTTP_REAL_IP_SOURCE` 設成什麼，**尚未確認**。由原始碼推得：ip 修好後 geo 欄位應會一起出現。

</div>

---
layout: section
---

<div class="eyebrow">Part 2</div>

# 名詞：Ingress 與 X-Real-Ip

真實 IP 怎麼一路傳下去

---

# Ingress 是什麼 <span class="tag ok">已確認 · 通用機制</span>

- **Ingress**：站在服務前面，接外部連線再轉進去的**反向代理**
- 在 K8s，`Ingress` 只是**路由規則**；實際做事的是 **Ingress Controller**（常見 Traefik / nginx）
- 每過一層代理，該層「看到的來源」就變成**上一層**
- 真實 IP 只能靠 `X-Real-Ip` / `X-Forwarded-For` 接力傳下去

<div class="callout mt-8" v-click>

**關鍵：** 任何一層**不信任上一層**而覆寫 header，真實 IP 就斷了，後面每一層都只看得到那一層的 IP。

</div>

---
clicks: 4
---

# Header 接力：信任與覆寫 <span class="tag ok">已確認 · 通用機制</span>

<HopScene />

<!--
[click] 代理 A 的 TCP 來源就是使用者，它寫入 X-Real-Ip
[click] 代理 B 信任 A，保留 header，App 看到使用者 IP
[click] 代理 B 不信任 A，用自己看到的 TCP 來源覆寫，App 只看到 A 的 IP
[click] X-Real-Ip 只代表最後一層代理看到的直接連線者
-->

---
layout: section
---

<div class="eyebrow">Part 3 · 猜測</div>

# 可能發生了什麼

以下內容皆**尚未確認**

---
clicks: 4
---

# 推測的鏈路 <span class="tag guess">猜測</span>

<GuessChainScene />

<!--
推測：Traefik 與 OpenObserve 之間可能還有一層 ingress（openobserve.in.twpat.com）
[click] Traefik 送出時，header 可能還是使用者 IP
[click] 那層 ingress 可能不信任 192.168.99.11，把 X-Real-Ip 覆寫成 99.11，XFF 尾端加上 99.11
[click] OpenObserve 讀 XRealIp 或 RightmostXForwardedFor，都可能得到 99.11
[click] 全部尚未確認
-->

---

# 這個推測有多可靠？ <span class="tag guess">猜測</span>

<div class="grid grid-cols-2 gap-6 mt-2">
<div class="callout guess">

**可能支持的線索**

如果 header 完全沒傳到，OpenObserve 退回 TCP 對端，應該記到「直接連線者」的 IP。記到的**恰好是 Traefik** 而非其他位址，與「中間某層把 header 改成 Traefik IP」**吻合**。

</div>
<div class="callout guess">

**但無法排除**

如果 Traefik **直連** OpenObserve，且 OpenObserve **只用 ConnectInfo**，同樣會得到 192.168.99.11。現有證據**分不出**這兩種情況。

</div>
</div>

<h3 class="mt-6">其他可能原因</h3>


- pi_prod 的 `ZO_HTTP_REAL_IP_SOURCE` **可能**被設成 `ConnectInfo`
- pi_prod **可能**跑的是尚無 `extract_real_ip` 機制的舊版 OpenObserve

---

# 可能修法 <span class="tag guess">未驗證</span>

推測方向：讓 OpenObserve 前那層 ingress **信任 192.168.99.11**，保留它傳來的 header。

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### 若是 Traefik

```yaml
# 範例：entryPoint 名稱／port 依實際設定
entryPoints:
  websecure:
    address: ":443"
    forwardedHeaders:
      trustedIPs:
        - "192.168.99.11"
```

</div>
<div>

### 若是 nginx

```nginx
set_real_ip_from 192.168.99.11;
real_ip_header   X-Real-IP;
```

</div>
</div>

<div class="callout guess mt-5" v-click>

**未驗證：** 要先確認那層 ingress 是否存在、是哪一種，才知道套哪一份。若成因是 `ZO_HTTP_REAL_IP_SOURCE` 或版本，修法會不同。前端**不需改**。

</div>

---

# 待確認事項（給 OpenObserve 部署負責人）

1. pi_prod OpenObserve 的 **`ZO_HTTP_REAL_IP_SOURCE` 與版本**；或啟動 log 中這一行：
   `HTTP client IP sources (in order, implicit ConnectInfo fallback): ...`
2. `/rum/v1/pi_prod/` 從 Traefik 到 OpenObserve **實際經過幾層代理**、各是什麼、`X-Real-Ip` / `X-Forwarded-For` 是否一路保留
3. **調查限制：** OpenObserve MCP 沒有讀伺服器設定／版本的工具，上面兩項無法從 MCP 查

<div class="callout ok mt-6">

**暫時替代** <span class="tag ok">已確認</span>　後端 traces 的 `client_address` 已有真實 IP，可先用來做使用者 IP 統計。

</div>

---
layout: section
---

<div class="eyebrow">Takeaways</div>

# 一句話總結

<div class="text-left max-w-2xl mx-auto mt-8 text-lg leading-relaxed">

1. **已確認：** 前端不送 IP；`_rumdata.ip` 全是 Traefik（192.168.99.11）
2. **已確認：** traces 的 `client_address` 是真實 IP，問題只在 RUM 這條路
3. **猜測：** 可能是中間某層 ingress 不信任 Traefik 而覆寫 header
4. **下一步：** 向部署負責人確認設定、版本與代理層數

</div>

---

# 參考資料

- OpenObserve `config.rs`（`ZO_HTTP_REAL_IP_SOURCE`）：[github.com/openobserve/openobserve/…/config.rs](https://github.com/openobserve/openobserve/blob/main/src/config/src/config.rs)
- OpenObserve `real_ip.rs`（`extract_real_ip`）：[github.com/openobserve/openobserve/…/real_ip.rs](https://github.com/openobserve/openobserve/blob/main/src/config/src/axum/middlewares/real_ip.rs)
- OpenObserve `middleware_data.rs`（RUM ip / geo）：[github.com/openobserve/openobserve/…/middleware_data.rs](https://github.com/openobserve/openobserve/blob/main/src/common/src/meta/middleware_data.rs)
- Traefik Forwarded Headers：[doc.traefik.io/traefik/routing/entrypoints](https://doc.traefik.io/traefik/routing/entrypoints/#forwarded-headers)
- nginx realip module：[nginx.org/en/docs/http/ngx_http_realip_module.html](https://nginx.org/en/docs/http/ngx_http_realip_module.html)
- pes-ipc `app/plugins/openobserve.client.ts`、`.env.example`
