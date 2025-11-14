---
theme: seriph
background: https://cover.sli.dev
title: OAuth 2.0 深入淺出
info: |
  ## OAuth 2.0 技術分享
  認證與授權的現代解決方案
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---

# OAuth 2.0

現代應用程式的認證與授權

---
layout: two-cols
layoutClass: gap-16
---

# 什麼是 OAuth 2.0？

OAuth 2.0 是一個**授權框架**，讓第三方應用程式能夠取得有限的使用者資源存取權限。

<v-clicks>

-  **授權標準** - 不是認證標準
-  **委託授權** - 使用者授權而非共享密碼
-  **廣泛應用** - Google, Facebook, GitHub 等

</v-clicks>


<div v-click class="mt-8">


<div class="mt-4 text-sm opacity-75">
使用者無需將密碼交給第三方，而是透過 Token 來存取資源
</div>

</div>

---

# 為什麼需要 OAuth 2.0？

<div class="grid grid-cols-2 gap-8">

<div>

###  傳統方式的問題

<v-clicks>

- 第三方應用儲存使用者密碼
- 無法撤銷特定應用權限
- 第三方獲得完整權限
- 安全風險高

</v-clicks>

</div>

<div>

###  OAuth 2.0 的優勢

<v-clicks>

- 不需共享密碼
- 權限控制 (Scope)
- 可隨時撤銷授權
- Token 有時效性

</v-clicks>

</div>

</div>

---

# OAuth 2.0 的四個角色

<div class="grid grid-cols-2 gap-6 mt-8">

<div v-click>

### 🧑 Resource Owner
**資源擁有者** - 通常是終端使用者

</div>

<div v-click>

### 📱 Client
**客戶端** - 第三方應用程式

</div>

<div v-click>

### 🔐 Authorization Server
**授權伺服器** - 核發 Access Token

</div>

<div v-click>

### 💾 Resource Server
**資源伺服器** - 託管受保護資源

</div>

</div>

---

# 主要授權類型 (Grant Types)

<div class="mt-6">

| 授權類型 | 使用場景 | 推薦度 |
|---------|---------|--------|
| **Authorization Code** | 後端應用 | ⭐⭐⭐⭐⭐ |
| **Authorization Code + PKCE** | SPA / 行動 App | ⭐⭐⭐⭐⭐ |
| **Client Credentials** | 服務對服務  | ⭐⭐⭐⭐ |
| **Password** ⚠️ | ~~已不推薦~~ | ❌ |

</div>

---

# Authorization Code Flow

常用授權流程

```mermaid {scale: 0.55}
sequenceDiagram
    participant User as  使用者
    participant Client as  第三方應用
    participant Auth as  授權伺服器
    participant API as  資源伺服器

    User->>Client: 1. 啟動應用
    Client->>Auth: 2. 重導向授權頁面
    Auth->>User: 3. 顯示授權頁面
    User->>Auth: 4. 同意授權
    Auth->>Client: 5. 回傳 code
    Client->>Auth: 6. code 換 token
    Auth->>Client: 7. 回傳 Access Token
    Client->>API: 8. 使用 Token 存取
    API->>Client: 9. 回傳資料
```

---

# Authorization Code Flow with PKCE

適用於 SPA 和行動應用的安全增強流程

```mermaid {scale: 0.5}
sequenceDiagram
    participant User as  使用者
    participant Client as  應用
    participant Auth as  授權伺服器
    participant API as  資源伺服器

    Note over Client: 生成 code_verifier<br/>計算 code_challenge
    User->>Client: 1. 啟動應用
    Client->>Auth: 2. 重導向 + code_challenge
    Auth->>User: 3. 顯示授權頁面
    User->>Auth: 4. 同意授權
    Auth->>Client: 5. 回傳 code
    Client->>Auth: 6. code + code_verifier 換 token
    Note over Auth: 驗證 code_verifier<br/>與 code_challenge
    Auth->>Client: 7. 回傳 Access Token
    Client->>API: 8. 使用 Token 存取
    API->>Client: 9. 回傳資料
```

---

# Client Credentials Flow

適用於服務對服務 (Machine-to-Machine) 的授權流程

```mermaid {scale: 0.55}
sequenceDiagram
    participant Client as 🔧 客戶端應用<br/>(服務)
    participant Auth as 🔐 授權伺服器
    participant API as 💾 資源伺服器

    Note over Client: 擁有 client_id<br/>與 client_secret
    Client->>Auth: 1. 請求 Token<br/>(client_id + client_secret)
    Note over Auth: 驗證憑證
    Auth->>Client: 2. 回傳 Access Token
    Client->>API: 3. 使用 Token 存取資源
    Note over API: 驗證 Token
    API->>Client: 4. 回傳資料
```

---
layout: center
class: text-center
---

# Thanks

<div class="mt-8 text-sm opacity-75">

📚 [RFC 6749](https://tools.ietf.org/html/rfc6749) · [OAuth.net](https://oauth.net/2/)

</div>
