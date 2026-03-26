# Slides RD Technical Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將 chromeDevToolsMcp 簡報從行銷語調改版為 RD 技術分享，聚焦 prompt 寫法與工具實戰應用，共 10 頁。

**Architecture:** 全部改動集中在 `slides.md` 一個檔案。移除 4 個過時 slide，修改 2 個現有 slide，新增 6 個技術導向 slide。Vue 元件不需改動。

**Tech Stack:** Slidev, Vue 3, seriph theme, shiki highlighter, Tailwind CSS utility classes (UnoCSS via Slidev)

---

## File Map

| 檔案 | 動作 |
|------|------|
| `slides.md` | 主要修改：移除/改寫/新增 slide 內容 |
| `components/ToolsLibrary.vue` | 不動 |
| `components/MetricsVisualizer.vue` | 保留檔案，不在 slides 中引用 |
| `components/DemoController.vue` | 保留檔案，不在 slides 中引用 |
| `components/ComparisonView.vue` | 保留檔案，不在 slides 中引用 |

---

## Task 1: 移除過時 Slides，更新 Title

**Files:**
- Modify: `slides.md`

- [ ] **Step 1: 替換 slides.md 為清理後的基礎版本（保留頁 1-3，移除其餘）**

將 `slides.md` 完整內容替換為以下（保留 Title、MCP 介紹、工具箱，刪除傳統 Debug / Live Demo ×2 / MetricsVisualizer / 舊總結）：

```markdown
---
theme: seriph
background: https://cover.sli.dev
class: text-center
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: slide-left
title: Chrome DevTools MCP - 有效使用的實戰指南
---

# Chrome DevTools MCP

<h2 class="text-blue-400 opacity-80">有效使用工具的實戰指南</h2>

<div class="mt-8 text-gray-400 text-lg">
  Prompt 設計 · 工具串接 · 實戰案例
</div>

<div class="absolute bottom-10 left-0 right-0 text-sm text-gray-500">
  Presenter: Your Name · 2026 Tech Sharing
</div>

---
layout: default
---

# 什麼是 Chrome DevTools MCP?

<div class="flex items-center gap-10 mt-8">
  <div class="flex-1 bg-slate-800/50 p-6 rounded-xl border border-blue-500/20">
    <p class="text-blue-300 font-mono italic">"It's the bridge between LLMs and the browser's engine."</p>
    <ul class="mt-4 space-y-3 text-sm">
      <li>✅ <strong>Google 官方維護</strong>：基於 MCP 開放標準</li>
      <li>✅ <strong>深度存取</strong>：直接調用 27+ 個 CDP 核心工具</li>
      <li>✅ <strong>保留 Session</strong>：可連接現有 Chrome 實例</li>
    </ul>
  </div>
  <div class="flex-1">
    <img src="https://mermaid.ink/svg/pako:eNptkE1Lw0AQhv_KMOdStNqDN9vWiyAKpUIPe7Ehu00T7W6S3Y1V6X_3Jmq1B8_DzDPvO8O8Yis7rDAs_L6pYpZlUvS_H9Sreid8L5H0-pS8n87-4Xn9n7L2qHl6O0_fP2D6q9K40xP0V9U37U6O0X9Xfdfu7Ojkp_p37e6OTv6p_t_unfzlS69f9W5n9L063YNoSStS0oo6WtOSFjSrOa1pT-shY7EAsQCxgDHP6D0m9B4Teg-ZkDEDMqW8pZzFPMYCxlI7A7EBsQCxAInEAsQCxALEAsSCTKlvqWCpj7GAsYyxmLEYixjLGEu9By7vAQ_4z98_lA2U0Q" class="w-full opacity-90" />
  </div>
</div>

---
layout: default
---

# 核心工具箱：27 種強大能力

<ToolsLibrary />
```

- [ ] **Step 2: 確認檔案儲存正確，行數合理**

```bash
wc -l slides.md
```

預期輸出：約 55 行

- [ ] **Step 3: Commit**

```bash
git add slides.md
git commit -m "chore: remove obsolete slides, update title for RD tech sharing"
```

---

## Task 2: 新增 Prompt 解剖結構模板 Slide（頁 4）

**Files:**
- Modify: `slides.md`

- [ ] **Step 1: 在 slides.md 末尾加入 Prompt 解剖 slide**

```markdown

---
layout: default
---

# Prompt 解剖：四個構成元素

<div class="flex flex-col gap-4 mt-4">
  <div class="bg-slate-800/60 p-5 rounded-xl border border-slate-600/40 font-mono text-sm leading-loose">
    <span class="text-green-400 font-bold">[動作動詞]</span><span class="text-slate-200"> 導航到 https://example.com/checkout，</span><br>
    <span class="text-yellow-300 font-bold">[環境條件]</span><span class="text-slate-200"> 模擬 iPhone 14 + 4G 網路，</span><br>
    <span class="text-purple-400 font-bold">[分析目標]</span><span class="text-slate-200"> 錄製 reload 的完整 trace，找出 LCP 超過 2.5s 的根因，</span><br>
    <span class="text-blue-400 font-bold">[輸出格式]</span><span class="text-slate-200"> 以條列式列出：指標數值 / 根因元素 / 建議優化方向</span>
  </div>
  <div class="grid grid-cols-4 gap-3 text-sm">
    <div class="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
      <div class="font-bold text-green-400 mb-1">動作動詞</div>
      <p class="text-xs text-gray-400">導航 / 錄製 / 截圖 / 分析 / 執行 JS</p>
    </div>
    <div class="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
      <div class="font-bold text-yellow-300 mb-1">環境條件</div>
      <p class="text-xs text-gray-400">裝置、網路、時區、UA。影響重現的可控變數</p>
    </div>
    <div class="p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
      <div class="font-bold text-purple-400 mb-1">分析目標</div>
      <p class="text-xs text-gray-400">要找什麼、門檻值是多少。避免 AI 自行判斷範圍</p>
    </div>
    <div class="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
      <div class="font-bold text-blue-400 mb-1">輸出格式</div>
      <p class="text-xs text-gray-400">表格 / 條列 / JSON / Markdown report</p>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add slides.md
git commit -m "feat: add prompt anatomy slide (page 4)"
```

---

## Task 3: 新增 Prompt 範例集 (1) — 效能與監控（頁 5）

**Files:**
- Modify: `slides.md`

- [ ] **Step 1: 在 slides.md 末尾加入 Prompt 範例集 (1) slide**

```markdown

---
layout: default
---

# Prompt 範例集 (1)：效能與監控

<div class="grid grid-cols-2 gap-3 mt-4">
  <div class="bg-slate-800/50 border border-green-500/20 rounded-lg p-3">
    <div class="text-green-400 font-bold text-xs mb-2">Performance Trace</div>
    <p class="font-mono text-yellow-200/90 text-xs leading-relaxed">
      導航到 https://example.com，錄製頁面 reload 的完整 performance trace，分析 LCP 時間、找出所有超過 50ms 的 Long Task，列出造成 render-blocking 的資源，以 Markdown 表格輸出：任務名稱 / 耗時 / 根因檔案
    </p>
  </div>
  <div class="bg-slate-800/50 border border-blue-500/20 rounded-lg p-3">
    <div class="text-blue-400 font-bold text-xs mb-2">Network 檢查</div>
    <p class="font-mono text-yellow-200/90 text-xs leading-relaxed">
      列出頁面所有網路請求，篩選出耗時超過 500ms 的項目，標記哪些是 render-blocking CSS/JS，以表格呈現：URL / 狀態碼 / 耗時 / 資源大小 / 是否 blocking
    </p>
  </div>
  <div class="bg-slate-800/50 border border-orange-500/20 rounded-lg p-3">
    <div class="text-orange-400 font-bold text-xs mb-2">Console + JS 執行</div>
    <p class="font-mono text-yellow-200/90 text-xs leading-relaxed">
      擷取頁面所有 console 訊息，過濾出 error 與 warning 層級，再執行 JS：document.querySelectorAll('img:not([loading])').length，回報未加 lazy loading 的圖片數量
    </p>
  </div>
  <div class="bg-slate-800/50 border border-purple-500/20 rounded-lg p-3">
    <div class="text-purple-400 font-bold text-xs mb-2">Memory Snapshot</div>
    <p class="font-mono text-yellow-200/90 text-xs leading-relaxed">
      對目前頁面拍攝 heap memory snapshot，找出 retained size 最大的前 10 個節點，說明是否有疑似 detached DOM 或 event listener 洩漏的跡象
    </p>
  </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add slides.md
git commit -m "feat: add prompt examples (1) - performance & monitoring (page 5)"
```

---

## Task 4: 新增 Prompt 範例集 (2) — 進階工具應用（頁 6）

**Files:**
- Modify: `slides.md`

- [ ] **Step 1: 在 slides.md 末尾加入 Prompt 範例集 (2) slide**

```markdown

---
layout: default
---

# Prompt 範例集 (2)：進階工具應用

<div class="grid grid-cols-2 gap-3 mt-4">
  <div class="bg-slate-800/50 border border-teal-500/20 rounded-lg p-3">
    <div class="text-teal-400 font-bold text-xs mb-2">Accessibility Tree</div>
    <p class="font-mono text-yellow-200/90 text-xs leading-relaxed">
      取得頁面 accessibility tree，找出所有缺少 aria-label 或 role 屬性的互動元素，以條列式列出：元素標籤 / 位置描述 / 建議補上的屬性值
    </p>
  </div>
  <div class="bg-slate-800/50 border border-pink-500/20 rounded-lg p-3">
    <div class="text-pink-400 font-bold text-xs mb-2">Cookie / LocalStorage 檢查</div>
    <p class="font-mono text-yellow-200/90 text-xs leading-relaxed">
      取得目前頁面的所有 cookie 與 localStorage 內容，確認 auth_token 是否存在且未過期，回報 session 狀態是否正常、有無敏感資料明文儲存
    </p>
  </div>
  <div class="bg-slate-800/50 border border-yellow-500/20 rounded-lg p-3">
    <div class="text-yellow-400 font-bold text-xs mb-2">Geolocation + Timezone 模擬</div>
    <p class="font-mono text-yellow-200/90 text-xs leading-relaxed">
      設定地理位置為東京（35.6762° N, 139.6503° E），時區設為 Asia/Tokyo，導航到 /events 頁面，截圖確認日期時間顯示是否正確切換為當地格式
    </p>
  </div>
  <div class="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-3">
    <div class="text-cyan-400 font-bold text-xs mb-2">Page Source（SSR / SEO 檢查）</div>
    <p class="font-mono text-yellow-200/90 text-xs leading-relaxed">
      取得 https://example.com 的 HTML 原始碼，確認 &lt;title&gt;、og:title、og:description、canonical URL 是否存在且內容正確，列出任何缺失或重複的 meta tag
    </p>
  </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add slides.md
git commit -m "feat: add prompt examples (2) - advanced tools (page 6)"
```

---

## Task 5: 新增工具串接技巧 Slide（頁 7）

**Files:**
- Modify: `slides.md`

- [ ] **Step 1: 在 slides.md 末尾加入工具串接 slide**

```markdown

---
layout: default
---

# 工具串接：一個 Prompt 完成完整任務

<div class="mt-4 grid grid-cols-2 gap-5">
  <div>
    <div class="text-xs text-slate-400 mb-3">串接流程</div>
    <div class="flex flex-col gap-2 text-xs">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="bg-blue-500/20 text-blue-300 px-2 py-1 rounded font-mono">navigate</span>
        <span class="text-slate-500">→</span>
        <span class="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded font-mono">emulate_device</span>
        <span class="text-slate-500">→</span>
        <span class="bg-green-500/20 text-green-300 px-2 py-1 rounded font-mono">start_trace</span>
      </div>
      <div class="ml-2 text-slate-500 text-lg leading-none">↓</div>
      <div class="flex items-center gap-2 flex-wrap">
        <span class="bg-purple-500/20 text-purple-300 px-2 py-1 rounded font-mono">get_network</span>
        <span class="text-slate-500">→</span>
        <span class="bg-orange-500/20 text-orange-300 px-2 py-1 rounded font-mono">get_console</span>
        <span class="text-slate-500">→</span>
        <span class="bg-pink-500/20 text-pink-300 px-2 py-1 rounded font-mono">screenshot</span>
      </div>
    </div>
    <div class="mt-4 text-xs text-slate-400 bg-slate-800/40 rounded-lg p-3 border border-slate-600/20">
      💡 連接現有 Chrome：啟動時加上<br>
      <code class="text-slate-300">--remote-debugging-port=9222</code><br>
      MCP config 設定 <code class="text-slate-300">"port": 9222</code>
    </div>
  </div>
  <div>
    <div class="text-xs text-slate-400 mb-3">完整 Prompt</div>
    <div class="bg-slate-800/70 rounded-lg p-4 font-mono text-yellow-200/90 text-xs leading-loose border border-slate-600/30">
      導航到 https://example.com，<br>
      模擬 iPhone 14 + 4G 網路，<br>
      開始 trace 後重新載入頁面，停止 trace，<br>
      同時取得 network 請求與 console 錯誤，<br>
      最後截圖，<br>
      整合所有資料輸出一份 Markdown 效能診斷報告：<br>
      包含 LCP / 慢請求 / JS 錯誤 / 視覺截圖附件
    </div>
  </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add slides.md
git commit -m "feat: add tool chaining techniques slide (page 7)"
```

---

## Task 6: 新增 Case Study Slides（頁 8–9）

**Files:**
- Modify: `slides.md`

- [ ] **Step 1: 在 slides.md 末尾加入 Case Study Part 1**

```markdown

---
layout: default
---

# Case Study：LCP 慢排查

<div class="text-sm text-slate-400 mb-4">場景：用戶回報首頁在手機上載入很慢</div>

<div class="flex flex-col gap-3">
  <div class="flex gap-3 items-start">
    <span class="bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded px-2 py-1 text-xs flex-shrink-0 font-bold">Step 1</span>
    <div class="flex-1">
      <div class="text-sm text-slate-300 mb-1">重現環境</div>
      <div class="bg-slate-800/70 rounded p-3 font-mono text-yellow-200/90 text-xs leading-relaxed border border-slate-600/20">
        導航到 https://example.com，模擬 iPhone 14 尺寸（390×844）與 4G 網路，截圖記錄初始狀態
      </div>
    </div>
  </div>
  <div class="flex gap-3 items-start">
    <span class="bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded px-2 py-1 text-xs flex-shrink-0 font-bold">Step 2</span>
    <div class="flex-1">
      <div class="text-sm text-slate-300 mb-1">錄製 Performance Trace</div>
      <div class="bg-slate-800/70 rounded p-3 font-mono text-yellow-200/90 text-xs leading-relaxed border border-slate-600/20">
        開始 performance trace，重新載入頁面，停止 trace，分析 LCP 時間與所有 render-blocking 資源，找出耗時最長的 Long Task
      </div>
    </div>
  </div>
  <div class="flex gap-3 items-start">
    <span class="bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded px-2 py-1 text-xs flex-shrink-0 font-bold">Step 3</span>
    <div class="flex-1">
      <div class="text-sm text-slate-300 mb-1">交叉比對 Network</div>
      <div class="bg-slate-800/70 rounded p-3 font-mono text-yellow-200/90 text-xs leading-relaxed border border-slate-600/20">
        列出所有資源請求，篩選出超過 500ms 的項目，標記是否為 render-blocking CSS/JS，回報資源大小與優先順序
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 2: 在 slides.md 末尾加入 Case Study Part 2**

```markdown

---
layout: default
---

# Case Study：AI 輸出的診斷報告

<div class="grid grid-cols-2 gap-5 mt-4">
  <div class="bg-slate-800/50 border border-slate-600/30 rounded-xl p-5">
    <div class="text-slate-300 font-bold mb-3 text-sm">Claude 輸出示意</div>
    <div class="flex flex-col gap-2 text-sm text-slate-300 leading-relaxed">
      <div><span class="text-red-400 font-bold">LCP：4.2s</span>（目標 ≤ 2.5s）</div>
      <div><span class="text-yellow-400 font-bold">根因元素：</span>/images/hero.jpg（1.8 MB，未壓縮）</div>
      <div><span class="text-orange-400 font-bold">Blocking 資源：</span>analytics.js（780ms），fonts.css（430ms）</div>
      <div><span class="text-blue-400 font-bold">Long Task：</span>main.bundle.js 第 1823 行，執行 312ms</div>
    </div>
    <div class="mt-4 pt-3 border-t border-slate-600/30">
      <div class="text-green-400 font-bold mb-2 text-sm">建議修復</div>
      <ul class="text-slate-400 text-xs space-y-1">
        <li>• hero.jpg 使用 WebP + 壓縮，加上 fetchpriority="high"</li>
        <li>• analytics.js 改為 async/defer</li>
        <li>• fonts.css 使用 font-display: swap</li>
      </ul>
    </div>
  </div>
  <div class="flex flex-col gap-4">
    <div class="bg-green-900/20 border border-green-500/30 rounded-xl p-4">
      <div class="text-green-400 font-bold mb-1 text-sm">全程 prompt-driven</div>
      <p class="text-slate-400 text-xs">從問題回報到拿到完整診斷報告，不需要手動開 DevTools，不需要逐格看 Flamechart</p>
    </div>
    <div class="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
      <div class="text-blue-400 font-bold mb-1 text-sm">可重複執行</div>
      <p class="text-slate-400 text-xs">修復後重跑同一組 prompt，驗證指標是否改善，形成可追蹤的優化閉環</p>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Commit**

```bash
git add slides.md
git commit -m "feat: add case study slides - LCP debugging (pages 8-9)"
```

---

## Task 7: 新增更新後的總結 Slide（頁 10）

**Files:**
- Modify: `slides.md`

- [ ] **Step 1: 在 slides.md 末尾加入新總結 slide**

```markdown

---
layout: center
class: text-center
---

# 三件事帶走

<div class="grid grid-cols-3 gap-6 mt-8">
  <div class="p-5 bg-slate-800/50 border border-blue-500/30 rounded-xl">
    <div class="text-3xl mb-3">🧩</div>
    <div class="font-bold text-blue-400 mb-2">Prompt 四元素</div>
    <p class="text-gray-400 text-xs">動作動詞 + 環境條件 + 分析目標 + 輸出格式</p>
  </div>
  <div class="p-5 bg-slate-800/50 border border-green-500/30 rounded-xl">
    <div class="text-3xl mb-3">🔗</div>
    <div class="font-bold text-green-400 mb-2">工具串接模式</div>
    <p class="text-gray-400 text-xs">一個 prompt 串多工具，指定依賴順序與輸出格式</p>
  </div>
  <div class="p-5 bg-slate-800/50 border border-purple-500/30 rounded-xl">
    <div class="text-3xl mb-3">⚙️</div>
    <div class="font-bold text-purple-400 mb-2">MCP 設定方式</div>
    <p class="text-gray-400 text-xs">claude_desktop_config.json +<br>--remote-debugging-port=9222</p>
  </div>
</div>
```

- [ ] **Step 2: 驗證最終 slide 數量**

```bash
grep -c "^# " slides.md
```

預期輸出：`10`（每頁各一個 `# ` 標題）

- [ ] **Step 3: 執行 build 確認無錯誤**

```bash
bun run build
```

預期輸出：build 成功，`dist/` 目錄生成，無 error

- [ ] **Step 4: Commit**

```bash
git add slides.md
git commit -m "feat: add summary slide, complete RD technical slides redesign"
```

---

## Task 8: 更新 MCP 介紹 Slide 加入設定說明（頁 2）

**Files:**
- Modify: `slides.md`

- [ ] **Step 1: 找到頁 2（什麼是 Chrome DevTools MCP）並替換為含 config 的版本**

找到以下段落：

```markdown
---
layout: default
---

# 什麼是 Chrome DevTools MCP?
```

將整個 slide（到下一個 `---` 之前）替換為：

```markdown
---
layout: default
---

# 什麼是 Chrome DevTools MCP?

<div class="grid grid-cols-2 gap-6 mt-6">
  <div class="bg-slate-800/50 p-5 rounded-xl border border-blue-500/20">
    <p class="text-blue-300 font-mono italic text-sm">"Bridge between LLMs and the browser's engine."</p>
    <ul class="mt-4 space-y-2 text-sm">
      <li>✅ <strong>Google 官方維護</strong>：基於 MCP 開放標準</li>
      <li>✅ <strong>深度存取</strong>：直接調用 27+ 個 CDP 核心工具</li>
      <li>✅ <strong>保留 Session</strong>：可連接現有 Chrome 實例</li>
    </ul>
  </div>
  <div class="flex flex-col gap-3">
    <div class="text-xs text-slate-400 mb-1">claude_desktop_config.json</div>
    <div class="bg-slate-900/80 rounded-lg p-3 font-mono text-xs text-green-300 border border-slate-600/30 leading-relaxed">
      {<br>
      &nbsp;&nbsp;"mcpServers": {<br>
      &nbsp;&nbsp;&nbsp;&nbsp;"chrome-devtools": {<br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"command": "npx",<br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"args": ["@chrome-devtools/mcp"]<br>
      &nbsp;&nbsp;&nbsp;&nbsp;}<br>
      &nbsp;&nbsp;}<br>
      }
    </div>
    <div class="text-xs text-slate-400 mt-1">
      連接現有 Chrome：啟動時加上
      <code class="text-slate-300 bg-slate-800 px-1 rounded">--remote-debugging-port=9222</code>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add slides.md
git commit -m "feat: add MCP config setup to intro slide (page 2)"
```
