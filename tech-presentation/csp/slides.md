---
theme: seriph
background: https://cover.sli.dev
class: text-center
highlighter: shiki
lineNumbers: true
info: |
  CSP 遇到問題之知識分享
drawings:
  persist: false
transition: slide-left
title: CSP 遇到問題之知識分享
mdc: true
---

# CSP 遇到問題之知識分享

Content Security Policy 實戰經驗分享

<div class="pt-12">
  <span class="px-2 py-1">
    移除 'unsafe-inline' 後的解決方案
  </span>
</div>

---

# 什麼是 CSP？

Content Security Policy（內容安全政策）

**定義與目的**
- 一種瀏覽器安全機制，透過 HTTP Header 設定
- 控制網頁可載入的資源來源
- 主要用於防止 XSS 攻擊和資料注入攻擊

**常見指令範例**

```http
Content-Security-Policy:
  script-src 'self' 'unsafe-inline';
  style-src 'self';
  img-src *;
```

- `script-src`: 控制 JavaScript 來源
- `style-src`: 控制 CSS 來源
- `img-src`: 控制圖片來源

---

# 我遇到的問題

移除 'unsafe-inline' 後發生錯誤

**瀏覽器 Console 錯誤訊息：**

```text
Executing inline script violates the following Content Security Policy
directive 'script-src 'self' 'unsafe-eval'
https://www.google-analytics.com'.

Either the 'unsafe-inline' keyword, a hash
('sha256-rv2ceEjgVgUF3WrXXp9dIVnznWv+/L9ybKd8ksvZSWQ='),
or a nonce ('nonce-...') is required to enable inline execution.

The action has been blocked.
```

**問題核心**
- 移除了 `'unsafe-inline'` 後，所有 inline script 都被阻擋
- 需要找到更安全的替代方案

---

# 為什麼要移除 'unsafe-inline'？

保留 'unsafe-inline' 的危害

<div class="grid grid-cols-2 gap-4 mt-6">

<div class="bg-gray-900 text-white p-3 rounded border-2 border-white">

**1. XSS 攻擊風險**

- 攻擊者可注入任意 inline script
- CSP 形同虛設、無法有效防護

```html
<img src=x onerror="alert('XSS')">
```

</div>

<div class="bg-gray-900 text-white p-3 rounded border-2 border-white">

**2. 安全性大幅降低**

- 失去 CSP 最重要的防護
- 任何 inline 程式碼都能執行

```html
<script>steal_data();</script>
```

</div>

<div class="bg-gray-900 text-white p-3 rounded border-2 border-white">

**3. 合規問題**

- 不符合安全性最佳實踐
- 可能無法通過安全稽核

</div>

<div class="bg-gray-900 text-white p-3 rounded border-2 border-white">

**4. 維護困難**

- 無法確認哪些腳本是合法的
- 增加資安漏洞風險

</div>

</div>

---

# 解決方案總覽

三種安全的替代方案

| 方法 | 安全性 | 維護難度 | 適用情況 |
|------|--------|----------|----------|
| Script Hash | 高 | 中 | 少量固定 inline script |
| Nonce（推薦） | 高 | 低 | 多個 inline script / 每頁生成 |
| 外部 Script | 高 | 低 | 可將所有 JS 外掛文件化 |

<div class="mt-12 text-center text-gray-500">
接下來將逐一介紹每種方案的實作方式
</div>

---

# 方案一：使用 Script Hash

透過內容雜湊值授權特定腳本

**原理**
- 計算 inline script 的 SHA-256 hash
- 將 hash 值加入 CSP
- 瀏覽器驗證內容是否匹配

**實作步驟**

1. 從錯誤訊息取得 hash：
```
'sha256-rv2ceEjgVgUF3WrXXp9dIVnznWv+/L9ybKd8ksvZSWQ='
```

2. 加入 CSP header：
```http
Content-Security-Policy:
  script-src 'self' 'unsafe-eval'
  https://www.google-analytics.com
  'sha256-rv2ceEjgVgUF3WrXXp9dIVnznWv+/L9ybKd8ksvZSWQ=';
```

---

# Script Hash - 注意事項

使用 Hash 方案的限制

**重要限制**

**1. 內容改變 = Hash 改變**
- 任何空格、換行的變動都會改變 hash
- 需要重新計算並更新 CSP
- 適合完全固定的腳本

**2. 多個腳本 = 多個 Hash**
```http
script-src 'self'
  'sha256-hash1...' 'sha256-hash2...' 'sha256-hash3...';
```

**3. 動態內容不適用**
- 無法用於包含變數的腳本
- 不適合模板引擎產生的腳本

---

# 方案二：使用 Nonce（推薦）

每次請求產生唯一隨機值

**原理**
- 伺服器產生隨機 nonce 值
- 同時加入 CSP 和 script 標籤
- 每次頁面請求都不同

**優點：** 安全性最高、適合大量 inline script、動態內容也可使用

**實作步驟**

1. HTML 加入 nonce：
```html
<script nonce="random123">console.log('hello');</script>
```

2. CSP 加入對應的 nonce：
```http
Content-Security-Policy:
  script-src 'self' 'nonce-random123';
```

---

# Nonce - 實作細節

**伺服器端產生 Nonce**

```js
const crypto = require('crypto');
const nonce = crypto.randomBytes(16).toString('base64');

// 設定 CSP Header
res.setHeader('Content-Security-Policy',
  `script-src 'self' 'nonce-${nonce}'`);
```

**模板中使用**

```html
<script nonce="<%= nonce %>">console.log('安全');</script>
```

**重點：** 每次請求都要產生新的隨機 nonce

---

# 方案三：外部 Script

將所有腳本移到外部檔案

**原理**
- 將 inline script 移到 .js 檔案
- 透過 src 屬性引用
- CSP 只需允許 'self'

**優點：** 最簡單、最安全、容易維護和快取、符合最佳實踐

**實作步驟**

1. 建立 `main.js`：
```js
console.log('hello');
initApp();
```

2. HTML 引用：
```html
<script src="/js/main.js"></script>
```

3. CSP 設定：
```http
Content-Security-Policy: script-src 'self';
```

---

# 外部 Script - 處理動態變數

從模板傳遞資料到外部 JS

**問題：原本的做法（inline）**
```html
<script>
  const userId = <%= user.id %>;
  initUser(userId, '<%= user.name %>');
</script>
```

**解決方案：使用 data 屬性**
```html
<div id="app" data-user-id="<%= user.id %>"
              data-user-name="<%= user.name %>"></div>
<script src="/js/app.js"></script>
```

**外部 JS 讀取資料**
```js
const app = document.getElementById('app');
const userId = app.dataset.userId;
initUser(userId, app.dataset.userName);
```

---

# 特殊情況：第三方服務

Google Analytics / Tag Manager

**問題**
- GA 和 GTM 通常使用 inline script
- 官方安裝碼包含 inline 程式碼

**建議做法**

| 方案 | 適用情況 | 安全性 |
|------|---------|--------|
| 使用 Nonce | 動態頁面 | 高 |
| 使用 Hash | 靜態網站（GA 碼不變） | 高 |

**Nonce 範例**
```html
<script nonce="<%= nonce %>">
  (function(i,s,o,g,r,a,m){/* GA code */})(window,document,...);
</script>
```

<div class="bg-gray-900 text-white p-3 rounded border-2 border-white mt-4">

**重要：絕對避免使用 'unsafe-inline'**
- 即使為了第三方服務也不建議，會讓整個 CSP 防護失效

</div>

---

# 方案比較與選擇

如何選擇最適合的方案

| 評估項目 | Script Hash | Nonce | 外部 Script |
|---------|------------|-------|-------------|
| 安全性 | 高 | 最高 | 高 |
| 實作複雜度 | 低 | 中 | 低 |
| 維護成本 | 高 | 低 | 最低 |
| 動態內容 | 不支援 | 支援 | 需透過 DOM |
| 效能 | 一般 | 一般 | 最佳 |
| 適用場景 | 少量固定腳本 | 動態頁面 | 所有情況 |

**建議選擇順序**

1. 優先考慮：外部 Script（最佳實踐）
2. 動態內容多：使用 Nonce
3. 簡單固定腳本：可用 Hash
4. 絕對避免：'unsafe-inline'

---

# 最佳實踐建議

實作 CSP 的注意事項

**開發階段**

1. 使用 Report-Only 模式測試
```http
Content-Security-Policy-Report-Only: script-src 'self';
```

2. 逐步收緊政策：先寬鬆設定 → 觀察報告 → 移除不安全選項

3. 監控錯誤報告：設定端點、分析違規模式

**生產環境**

1. 定期審查：移除不需要的來源、保持最小權限

2. 文件化決策：記錄為何允許特定來源

3. 自動化測試：CI/CD 中檢查政策、防止意外放寬

---

# 實際遷移步驟

從 'unsafe-inline' 遷移的建議流程

**Step 1: 盤點現有 inline script**
```bash
grep -r "<script>" ./src
```

**Step 2: 選擇遷移策略**
- 評估每個腳本特性，決定使用 Hash、Nonce 或外部化

**Step 3: 逐步實作**
1. 將可外部化的腳本移到 .js 檔案
2. 為動態腳本實作 nonce 機制
3. 為少量固定腳本使用 hash
4. 處理第三方服務

**Step 4: 測試**
```http
Content-Security-Policy-Report-Only: script-src 'self' ...
```

**Step 5: 正式部署**

---
layout: center
class: text-center
---

# 總結

## 核心重點

<div class="text-left mt-12 mx-auto" style="max-width: 650px;">

**1. 'unsafe-inline' 會讓 CSP 形同虛設，務必移除**

**2. 三種安全替代方案各有適用場景**
- 外部 Script：最佳實踐，優先選擇
- Nonce：適合動態內容
- Hash：適合少量固定腳本

**3. 實作時採用漸進式遷移策略**

**4. 持續監控與優化 CSP 政策**

</div>

<div class="mt-16 text-gray-500">
感謝聆聽，歡迎提問與討論
</div>

---
layout: center
class: text-center
---

# Q & A

歡迎提問與討論

<div class="mt-12 text-gray-400">
Content Security Policy 知識分享
</div>
