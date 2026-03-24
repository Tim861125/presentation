---
theme: default
colorSchema: dark
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: slide-left
title: Chrome DevTools MCP：用 Claude AI 加速性能調試
---

# Chrome DevTools MCP

<h2 class="text-blue-400">用 Claude AI 加速性能調試</h2>

<div class="mt-3 text-gray-400 text-xl">全自動追蹤、分析、優化工作流</div>

<div class="absolute bottom-10 left-14 text-sm text-gray-500">
  技術分享 · 2025
</div>

<div class="absolute bottom-10 right-14 text-sm text-gray-500">
  Chrome DevTools Protocol × Model Context Protocol
</div>

---
layout: default
---

# 傳統前端 Debug 的三大困擾

<div class="flex flex-col gap-5 mt-6">

<v-click>
<div class="flex items-start gap-4 bg-red-950/40 border border-red-700/50 rounded-xl p-5">
  <span class="text-3xl mt-1">🔍</span>
  <div>
    <div class="text-red-400 font-bold text-lg">1. 性能瓶頸難找</div>
    <div class="text-gray-300 mt-1">LCP / INP / CLS 數據多，指標分散各處，人工逐一比對要花大量時間</div>
  </div>
</div>
</v-click>

<v-click>
<div class="flex items-start gap-4 bg-yellow-950/40 border border-yellow-700/50 rounded-xl p-5">
  <span class="text-3xl mt-1">⏱️</span>
  <div>
    <div class="text-yellow-400 font-bold text-lg">2. 重複操作浪費時間</div>
    <div class="text-gray-300 mt-1">截圖 → 記錄 → 手動填表 → 撰寫報告，每次 Debug 都重複同樣流程</div>
  </div>
</div>
</v-click>

<v-click>
<div class="flex items-start gap-4 bg-purple-950/40 border border-purple-700/50 rounded-xl p-5">
  <span class="text-3xl mt-1">🗃️</span>
  <div>
    <div class="text-purple-400 font-bold text-lg">3. DevTools 資料孤島</div>
    <div class="text-gray-300 mt-1">Trace 檔、Console logs、Network requests 分散各處，難以交叉關聯分析</div>
  </div>
</div>
</v-click>

</div>

<v-click>
<div class="mt-4 py-3 text-center bg-orange-950/50 border border-orange-700/40 rounded-xl">
  <span class="text-orange-400 font-bold text-xl">💥 一個簡單的性能問題，可能花 2–3 小時才排查出來</span>
</div>
</v-click>

---
layout: default
---

# Chrome DevTools MCP 是什麼？

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="flex flex-col gap-4">

<v-click>
<div class="bg-blue-950/40 border border-blue-700/50 rounded-xl p-4">
  <div class="text-blue-400 font-bold text-base mb-2">📋 定義</div>
  <p class="text-sm text-gray-300">Google 官方發布的 <strong class="text-white">MCP Server</strong>，讓 Claude AI 直接存取 <strong class="text-blue-300">Chrome DevTools Protocol (CDP)</strong> 的完整資料</p>
</div>
</v-click>

<v-click>
<div class="bg-emerald-950/40 border border-emerald-700/50 rounded-xl p-4">
  <div class="text-emerald-400 font-bold text-base mb-2">✨ 核心優勢</div>
  <ul class="text-sm text-gray-300 space-y-1.5">
    <li>🏢 Google 官方維護，<strong class="text-white">27 個工具函數</strong></li>
    <li>🔗 可連現有 Chrome（<strong class="text-white">保留 session</strong>）</li>
    <li>🔬 DevTools 級別深度數據，比 Playwright MCP 更全面</li>
    <li>🤝 支援 stdio / HTTP 傳輸，Claude Code 直接調用</li>
  </ul>
</div>
</v-click>

</div>

<div>
<v-click>

**三大核心能力**

<div class="space-y-3 mt-3">
  <div class="flex items-center gap-3 bg-slate-800/70 rounded-lg p-3">
    <span class="text-2xl">🚀</span>
    <div>
      <div class="font-bold text-blue-300 text-sm">自動導航 + 操作</div>
      <div class="text-xs text-gray-400">開瀏覽器、點擊、輸入、等待元素</div>
    </div>
  </div>
  <div class="flex items-center gap-3 bg-slate-800/70 rounded-lg p-3">
    <span class="text-2xl">📊</span>
    <div>
      <div class="font-bold text-green-300 text-sm">即時收集 DevTools 資料</div>
      <div class="text-xs text-gray-400">Trace、Console、Network、Performance Metrics</div>
    </div>
  </div>
  <div class="flex items-center gap-3 bg-slate-800/70 rounded-lg p-3">
    <span class="text-2xl">🤖</span>
    <div>
      <div class="font-bold text-purple-300 text-sm">AI 分析 + 修補 Code</div>
      <div class="text-xs text-gray-400">Claude 用真實資料直接給出優化建議與程式碼</div>
    </div>
  </div>
</div>

</v-click>
</div>

</div>

---
layout: center
---

# 架構圖

<div class="flex flex-col items-center gap-0 mt-4">

<v-click>
<div class="bg-blue-900/40 border-2 border-blue-500/70 rounded-xl px-10 py-3 text-blue-200 text-base font-bold">
  👤 你（自然語言指示）
</div>
</v-click>

<v-click>
<div class="flex flex-col items-center my-1">
  <div class="w-0.5 h-6 bg-gray-600"></div>
  <div class="text-gray-400 text-xs px-3 py-1 bg-slate-800/60 rounded border border-gray-700/40">自然語言 / MCP Protocol</div>
  <div class="w-0.5 h-6 bg-gray-600"></div>
</div>
<div class="bg-purple-900/40 border-2 border-purple-500/70 rounded-xl px-10 py-3 text-purple-200 text-base font-bold">
  🤖 Claude CLI / Claude Code
</div>
</v-click>

<v-click>
<div class="flex flex-col items-center my-1">
  <div class="w-0.5 h-6 bg-gray-600"></div>
  <div class="text-gray-400 text-xs px-3 py-1 bg-slate-800/60 rounded border border-gray-700/40">MCP Protocol (stdio / HTTP)</div>
  <div class="w-0.5 h-6 bg-gray-600"></div>
</div>
<div class="bg-emerald-900/40 border-2 border-emerald-500/70 rounded-xl px-10 py-3 text-emerald-200 text-base font-bold">
  ⚙️ Chrome DevTools MCP Server
</div>
</v-click>

<v-click>
<div class="flex flex-col items-center my-1">
  <div class="w-0.5 h-6 bg-gray-600"></div>
  <div class="text-gray-400 text-xs px-3 py-1 bg-slate-800/60 rounded border border-gray-700/40">Chrome DevTools Protocol (CDP)</div>
  <div class="w-0.5 h-6 bg-gray-600"></div>
</div>
<div class="bg-orange-900/40 border-2 border-orange-500/70 rounded-xl px-10 py-3 text-orange-200 text-base font-bold">
  🌐 Your Local Chrome Browser
</div>
</v-click>

</div>

---
layout: default
---

# 核心工具一覽（27 個）

<div class="grid grid-cols-2 gap-4 mt-4">

<v-click>
<div class="bg-blue-950/40 border border-blue-700/50 rounded-xl p-4">
  <div class="text-blue-400 font-bold mb-2">🚀 導航與操作</div>
  <div class="flex flex-wrap gap-1.5">
    <span v-for="t in ['navigate', 'click', 'fill', 'select', 'screenshot', 'evaluate_js', 'wait_for_element']" :key="t"
      class="text-xs bg-blue-900/60 text-blue-300 rounded px-2 py-0.5 font-mono">{{ t }}</span>
  </div>
</div>
</v-click>

<v-click>
<div class="bg-emerald-950/40 border border-emerald-700/50 rounded-xl p-4">
  <div class="text-emerald-400 font-bold mb-2">📊 DevTools 追蹤</div>
  <div class="flex flex-wrap gap-1.5">
    <span v-for="t in ['start_trace', 'stop_trace', 'get_trace_data', 'get_performance_metrics', 'get_layout_metrics']" :key="t"
      class="text-xs bg-emerald-900/60 text-emerald-300 rounded px-2 py-0.5 font-mono">{{ t }}</span>
  </div>
</div>
</v-click>

<v-click>
<div class="bg-purple-950/40 border border-purple-700/50 rounded-xl p-4">
  <div class="text-purple-400 font-bold mb-2">🔬 DevTools 檢查</div>
  <div class="flex flex-wrap gap-1.5">
    <span v-for="t in ['get_console_messages', 'get_network_requests', 'get_accessibility_tree', 'get_dom_snapshot', 'get_resource_content', 'get_cookies', 'get_local_storage', 'get_page_source', 'inspect_element']" :key="t"
      class="text-xs bg-purple-900/60 text-purple-300 rounded px-2 py-0.5 font-mono">{{ t }}</span>
  </div>
</div>
</v-click>

<v-click>
<div class="bg-orange-950/40 border border-orange-700/50 rounded-xl p-4">
  <div class="text-orange-400 font-bold mb-2">🎭 環境模擬</div>
  <div class="flex flex-wrap gap-1.5">
    <span v-for="t in ['emulate_network', 'emulate_device', 'set_viewport', 'set_geolocation', 'set_timezone', 'set_user_agent']" :key="t"
      class="text-xs bg-orange-900/60 text-orange-300 rounded px-2 py-0.5 font-mono">{{ t }}</span>
  </div>
</div>
</v-click>

</div>

---
layout: default
---

# 與其他工具的對比

<div class="mt-4">

| 工具 | 性能分析 | DevTools 資料 | 登入自動化 | 跨瀏覽器 |
|---|:---:|:---:|:---:|:---:|
| **Chrome DevTools MCP** | ✅ 專業 | ✅ 完整 | ✅ 可以 | ❌ Chrome only |
| Playwright MCP | ⚠️ 有限 | ❌ 基本 | ✅✅ 強 | ✅ 多瀏覽器 |
| Claude Chrome Extension | ❌ 無 | ❌ 無 | ⚠️ 共享 session | ❌ 無 |
| 傳統 Puppeteer | ❌ 無 | ❌ 無 | ✅ 強 | ✅ 多瀏覽器 |

</div>

<v-click>
<div class="mt-6 bg-emerald-950/50 border border-emerald-700/50 rounded-xl p-4 text-center">
  <div class="text-sm text-gray-300">
    💡 <strong class="text-emerald-400">最佳實踐：</strong>
    性能 Debug → <strong class="text-white">DevTools MCP</strong>；自動化測試 → <strong class="text-white">Playwright MCP</strong>
    <br/>兩者搭配使用，覆蓋完整前端 QA 工作流
  </div>
</div>
</v-click>

---
layout: default
---

# Demo 1：性能追蹤 + AI 分析

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

**執行流程**

<div class="space-y-2 mt-3">
  <div v-click class="flex items-center gap-2 bg-slate-800/60 rounded-lg p-2.5">
    <span class="text-blue-400 font-mono text-sm w-5 text-center font-bold">1</span>
    <span class="text-sm">Claude CLI 輸入自然語言指令</span>
  </div>
  <div v-click class="flex items-center gap-2 bg-slate-800/60 rounded-lg p-2.5">
    <span class="text-blue-400 font-mono text-sm w-5 text-center font-bold">2</span>
    <code class="text-sm text-blue-300">navigate</code><span class="text-sm ml-1">→ 目標頁面</span>
  </div>
  <div v-click class="flex items-center gap-2 bg-slate-800/60 rounded-lg p-2.5">
    <span class="text-blue-400 font-mono text-sm w-5 text-center font-bold">3</span>
    <code class="text-sm text-emerald-300">start_trace</code><span class="text-sm ml-1">錄 8 秒性能</span>
  </div>
  <div v-click class="flex items-center gap-2 bg-slate-800/60 rounded-lg p-2.5">
    <span class="text-blue-400 font-mono text-sm w-5 text-center font-bold">4</span>
    <code class="text-sm text-yellow-300">stop_trace</code><span class="text-sm text-gray-400 ml-1">+ get_trace_data</span>
  </div>
  <div v-click class="flex items-center gap-2 bg-emerald-900/40 border border-emerald-700/40 rounded-lg p-2.5">
    <span class="text-emerald-400 font-mono text-sm w-5 text-center font-bold">5</span>
    <span class="text-sm text-emerald-300">Claude 輸出分析報告 + Code 建議</span>
  </div>
</div>

</div>

<div>

<v-click>

**Prompt 範例**

```
請用 Chrome DevTools MCP 開啟
http://localhost:3000/slow-page，
錄一段 8 秒的 performance trace，分析：

1. LCP（Largest Contentful Paint）的瓶頸
2. 最長的 JavaScript 執行任務
3. Render-blocking 的資源

最後提出 3 個優化建議並給出 code 範例。
```

</v-click>

<v-click>
<div class="mt-3 bg-blue-950/40 border border-blue-700/40 rounded-lg p-3">
  <div class="text-xs text-blue-300 font-bold mb-1.5">預期輸出</div>
  <ul class="text-xs text-gray-300 space-y-1">
    <li>📈 Trace 資料時間軸視覺化</li>
    <li>📝 LCP / 長任務 / Render-blocking 分析</li>
    <li>💻 修改前後 code 對比</li>
    <li>🎯 優先級排序的優化清單</li>
  </ul>
</div>
</v-click>

</div>
</div>

---
layout: default
---

# Demo 2：登入流程自動化 + Trace

<div class="grid grid-cols-2 gap-6 mt-2">
<div>

**雙 MCP 協作流程**

<div class="mt-3">
  <div class="text-xs text-blue-400 font-bold mb-2 pl-1">Playwright MCP</div>
  <div class="space-y-1.5 mb-3">
    <div v-click class="flex items-center gap-2 bg-blue-900/25 border border-blue-700/35 rounded-lg p-2.5">
      <span class="text-blue-300 text-base">🤖</span>
      <span class="text-xs">自動輸入帳號 / 密碼並點擊登入</span>
    </div>
    <div v-click class="flex items-center gap-2 bg-blue-900/25 border border-blue-700/35 rounded-lg p-2.5">
      <span class="text-blue-300 text-base">🤖</span>
      <span class="text-xs">等待重定向到 Dashboard</span>
    </div>
  </div>
  <div class="text-xs text-emerald-400 font-bold mb-2 pl-1">Chrome DevTools MCP</div>
  <div class="space-y-1.5">
    <div v-click class="flex items-center gap-2 bg-emerald-900/25 border border-emerald-700/35 rounded-lg p-2.5">
      <span class="text-emerald-300 text-base">📊</span>
      <span class="text-xs">錄 trace（追蹤登入 API 耗時）</span>
    </div>
    <div v-click class="flex items-center gap-2 bg-emerald-900/25 border border-emerald-700/35 rounded-lg p-2.5">
      <span class="text-emerald-300 text-base">🌐</span>
      <span class="text-xs">提取 network logs（API response 時間）</span>
    </div>
    <div v-click class="flex items-center gap-2 bg-emerald-900/25 border border-emerald-700/35 rounded-lg p-2.5">
      <span class="text-emerald-300 text-base">🔍</span>
      <span class="text-xs">抓 console 確認無 error</span>
    </div>
  </div>
</div>

</div>

<div>

<v-click>

**Prompt 範例**

```
使用 Playwright MCP 和 Chrome DevTools MCP：

1. 打開 http://localhost:3000/login
2. 用帳號 test@example.com、密碼 demo123 登入
3. 在整個登入過程錄 performance trace
4. 收集：
   - 登入 API 的耗時（network logs）
   - Dashboard 首頁的 LCP
   - 是否有 console error
5. 產出登入效能報告 + Playwright 測試腳本
```

</v-click>

<v-click>
<div class="mt-2 bg-purple-950/40 border border-purple-700/40 rounded-lg p-3">
  <div class="text-xs text-purple-300 font-bold mb-1.5">產出物</div>
  <ul class="text-xs text-gray-300 space-y-1">
    <li>📸 步驟化操作日誌 + 截圖</li>
    <li>⏱️ Performance trace 時間軸</li>
    <li>📊 Network 耗時柱狀報告</li>
    <li>🧪 自動化 Playwright 測試腳本</li>
  </ul>
</div>
</v-click>

</div>
</div>

---
layout: default
---

# 互動展示：27 個工具庫

<ToolsLibrary />

---
layout: default
---

# 互動展示：Core Web Vitals 指標模擬器

<MetricsVisualizer />

---
layout: default
---

# 互動展示：AI Demo 控制台

<DemoController />

---
layout: default
---

# 互動展示：傳統 vs AI 流程對比

<ComparisonView />

---
layout: default
---

# 總結與最佳實踐

<div class="grid grid-cols-2 gap-6 mt-4">

<div>

**🎯 關鍵收穫**

<v-click>
<div class="space-y-3 mt-2">
  <div class="flex items-start gap-3 bg-blue-950/40 border border-blue-700/40 rounded-xl p-3">
    <span class="text-xl">🚀</span>
    <div>
      <div class="text-sm font-bold text-blue-300">Debug 效率提升 10x+</div>
      <div class="text-xs text-gray-400 mt-0.5">AI 自動分析取代人工逐步查找</div>
    </div>
  </div>
  <div class="flex items-start gap-3 bg-emerald-950/40 border border-emerald-700/40 rounded-xl p-3">
    <span class="text-xl">🤝</span>
    <div>
      <div class="text-sm font-bold text-emerald-300">雙 MCP 組合最強大</div>
      <div class="text-xs text-gray-400 mt-0.5">Playwright + DevTools MCP = 完整解決方案</div>
    </div>
  </div>
  <div class="flex items-start gap-3 bg-purple-950/40 border border-purple-700/40 rounded-xl p-3">
    <span class="text-xl">📊</span>
    <div>
      <div class="text-sm font-bold text-purple-300">真實數據驅動優化</div>
      <div class="text-xs text-gray-400 mt-0.5">CDP 原始數據，分析更精準可靠</div>
    </div>
  </div>
</div>
</v-click>

</div>

<div>

**📚 資源連結**

<v-click>
<div class="space-y-2 mt-2">
  <div class="bg-slate-800/60 rounded-lg p-3">
    <div class="text-xs text-gray-400 mb-1">GitHub</div>
    <code class="text-sm text-blue-300">ChromeDevTools/chrome-devtools-mcp</code>
  </div>
  <div class="bg-slate-800/60 rounded-lg p-3">
    <div class="text-xs text-gray-400 mb-1">npm 安裝</div>
    <code class="text-sm text-emerald-300">npm i -g chrome-devtools-mcp</code>
  </div>
  <div class="bg-slate-800/60 rounded-lg p-3">
    <div class="text-xs text-gray-400 mb-1">Claude Code CLI</div>
    <code class="text-sm text-purple-300">npm i -g @anthropic-ai/claude-code</code>
  </div>
</div>
</v-click>

<v-click>
<div class="mt-5 text-center py-4 bg-gradient-to-r from-blue-950/50 to-purple-950/50 border border-blue-700/30 rounded-xl">
  <div class="text-2xl font-bold text-white">Q & A</div>
  <div class="text-gray-400 text-sm mt-1">你最想用 DevTools MCP 做什麼？</div>
</div>
</v-click>

</div>
</div>
