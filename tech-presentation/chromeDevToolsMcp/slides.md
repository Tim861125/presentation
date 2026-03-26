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

---
layout: default
---

# 核心工具箱：27 種強大能力

<ToolsLibrary />

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

