# CSP 遇到問題之知識分享

# 用繁體中文完成由 slidev 展示的報告
# 不要使用任何 icon
# 報告長度大約 15 分鐘
# 可以補充不移除 'unsafe-inline' 的危害
# 以下是為我遇到的問題
## 我移除 'unsafe-inline' 之後 瀏覽器 console 出現："Executing inline script violates the following Content Security Policy directive 'script-src 'self' 'unsafe-eval' https://www.google-analytics.com https://www.googletagmanager.com'. Either the 'unsafe-inline' keyword, a hash ('sha256｀-rv2ceEjgVgUF3WrXXp9dIVnznWv+/L9ybKd8ksvZSWQ='), or a nonce ('nonce-...') is required to enable inline execution. The action has been blocked.",
- 

---

## **1️⃣ 使用 Script Hash**

瀏覽器的錯誤訊息中已經提供了 hash 示例：

```
'sha256-rv2ceEjgVgUF3WrXXp9dIVnznWv+/L9ybKd8ksvZSWQ='
```

**做法：**

1. 保留 CSP，但在 `script-src` 中加入這個 hash：

```http
Content-Security-Policy: script-src 'self' 'unsafe-eval' https://www.google-analytics.com https://www.googletagmanager.com 'sha256-rv2ceEjgVgUF3WrXXp9dIVnznWv+/L9ybKd8ksvZSWQ=';
```

2. 瀏覽器會允許對應內容的 inline script 執行，而不用打開 `'unsafe-inline'`。

⚠️ 注意：

* 每個 inline script 的內容改變，hash 就要更新。
* 適合少量固定內容的 inline script。

---

## **2️⃣ 使用 Nonce (推薦)**

Nonce 是 CSP 的推薦做法，比 hash 靈活。

**做法：**

1. 在 HTML `<script>` 上加 `nonce`：

```html
<script nonce="random123">console.log('hello');</script>
```

2. CSP 中加入對應的 nonce：

```http
Content-Security-Policy: script-src 'self' 'unsafe-eval' https://www.google-analytics.com https://www.googletagmanager.com 'nonce-random123';
```

3. nonce 每次頁面請求應隨機生成，這樣攻擊者無法猜到。

✅ 優點：

* 適合大量 inline script。
* 安全性高。
* 無需 hash 每段 script。

---

## **3️⃣ 外部 script**

將 inline script 移到單獨檔案：

1. 建立 `main.js`：

```js
console.log('hello');
```

2. HTML 引用：

```html
<script src="/js/main.js"></script>
```

3. CSP 無需 `'unsafe-inline'`：

```http
Content-Security-Policy: script-src 'self' 'unsafe-eval' https://www.google-analytics.com https://www.googletagmanager.com';
```

✅ 優點：

* 最安全、簡單維護。
* 不需要 hash 或 nonce。

⚠️ 注意：

* 如果你的 inline script 中有動態變量（如模板直接插入），要改成在 JS 裡透過 DOM 操作。

---

## **4️⃣ 特殊情況**

* Google Analytics / Google Tag Manager 的 inline script 如果是官方提供的，通常會建議用 nonce 或 hash。
* 避免用 `'unsafe-inline'`，因為會降低 CSP 的效果。

---

💡 **總結建議：**

| 方法        | 安全性 | 維護難度 | 適用情況                    |
| --------- | --- | ---- | ----------------------- |
| Hash      | 高   | 中    | 少量固定 inline script      |
| Nonce     | 高   | 低    | 多個 inline script / 每頁生成 |
| 外部 script | 高   | 低    | 可將所有 JS 外掛文件化           |

---


