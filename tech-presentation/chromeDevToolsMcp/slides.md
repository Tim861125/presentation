---
theme: seriph
background: https://cover.sli.dev
class: text-center
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: slide-left
title: Chrome DevTools MCP - 工具介紹與實戰展示
---

# Chrome DevTools MCP

<h2 class="text-blue-400 opacity-80">工具介紹與實戰展示</h2>

<div class="mt-8 text-gray-400 text-lg">
  27 個工具 · 初階到進階 · 直接可用的 Prompt
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

# 基礎工具：導航 + 截圖

<div class="grid grid-cols-2 gap-5 mt-4">
  <div class="flex flex-col gap-3">
    <div class="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
      <div class="flex items-center gap-2 mb-3">
        <code class="text-blue-300 font-bold text-sm">navigate_page</code>
        <span class="text-xs text-slate-500">導航操作</span>
      </div>
      <p class="text-xs text-slate-400 mb-3">將瀏覽器導航到指定 URL，支援等待頁面載入完成後再繼續操作。</p>
      <div class="bg-slate-900/60 rounded-lg p-3 font-mono text-yellow-200/90 text-xs leading-relaxed">
        導航到 https://example.com/login
      </div>
    </div>
    <div class="bg-slate-800/50 border border-green-500/20 rounded-xl p-4">
      <div class="flex items-center gap-2 mb-3">
        <code class="text-green-300 font-bold text-sm">take_screenshot</code>
        <span class="text-xs text-slate-500">截圖記錄</span>
      </div>
      <p class="text-xs text-slate-400 mb-3">截取目前頁面的完整畫面，可指定視窗尺寸或特定元素範圍。</p>
      <div class="bg-slate-900/60 rounded-lg p-3 font-mono text-yellow-200/90 text-xs leading-relaxed">
        截圖目前頁面，解析度設為 1440×900
      </div>
    </div>
  </div>
  <div class="bg-slate-800/40 border border-slate-600/20 rounded-xl p-4 flex flex-col gap-3">
    <div class="text-xs text-slate-400 font-bold">組合使用範例</div>
    <div class="bg-slate-900/60 rounded-lg p-4 font-mono text-yellow-200/90 text-xs leading-loose flex-1">
      導航到 https://example.com，<br>
      等待頁面完全載入，<br>
      截圖並回傳圖片
    </div>
    <div class="text-xs text-slate-500">
      💡 截圖會直接在對話中顯示，可立即確認頁面狀態
    </div>
  </div>
</div>

---
layout: default
---

# 基礎工具：Console + Network

<div class="grid grid-cols-2 gap-5 mt-4">
  <div class="bg-slate-800/50 border border-orange-500/20 rounded-xl p-4">
    <div class="flex items-center gap-2 mb-3">
      <code class="text-orange-300 font-bold text-sm">list_console_messages</code>
      <span class="text-xs text-slate-500">DevTools 檢查</span>
    </div>
    <p class="text-xs text-slate-400 mb-3">取得瀏覽器 Console 中的所有訊息，可依 error / warning / log 層級過濾。</p>
    <div class="bg-slate-900/60 rounded-lg p-3 font-mono text-yellow-200/90 text-xs leading-relaxed mb-3">
      列出頁面所有 console error 與 warning
    </div>
    <div class="bg-slate-900/40 rounded-lg p-3 text-xs text-slate-300 border border-slate-600/20">
      <div class="text-slate-500 mb-1">輸出示意</div>
      <div class="text-red-400">❌ TypeError: Cannot read 'id' of undefined</div>
      <div class="text-yellow-400">⚠ [Deprecation] getDisplayMedia requires...</div>
    </div>
  </div>
  <div class="bg-slate-800/50 border border-purple-500/20 rounded-xl p-4">
    <div class="flex items-center gap-2 mb-3">
      <code class="text-purple-300 font-bold text-sm">list_network_requests</code>
      <span class="text-xs text-slate-500">DevTools 檢查</span>
    </div>
    <p class="text-xs text-slate-400 mb-3">列出頁面所有網路請求，包含狀態碼、耗時、資源大小，可用於排查 API 異常。</p>
    <div class="bg-slate-900/60 rounded-lg p-3 font-mono text-yellow-200/90 text-xs leading-relaxed mb-3">
      列出所有網路請求，找出狀態碼非 200 的項目，以表格呈現 URL / 狀態碼 / 耗時
    </div>
    <div class="bg-slate-900/40 rounded-lg p-3 text-xs text-slate-300 border border-slate-600/20">
      <div class="text-slate-500 mb-1">輸出示意</div>
      <div class="text-red-400">❌ /api/user 500 · 1.2s</div>
      <div class="text-green-400">✓ /api/products 200 · 230ms</div>
    </div>
  </div>
</div>

---
layout: default
---

# 基礎工具：頁面互動

<div class="grid grid-cols-3 gap-4 mt-4">
  <div class="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-4">
    <code class="text-cyan-300 font-bold text-sm">click</code>
    <p class="text-xs text-slate-400 mt-2 mb-3">點擊頁面上的指定元素，可用 CSS selector 或描述定位。</p>
    <div class="bg-slate-900/60 rounded-lg p-3 font-mono text-yellow-200/90 text-xs leading-relaxed">
      點擊「登入」按鈕
    </div>
  </div>
  <div class="bg-slate-800/50 border border-pink-500/20 rounded-xl p-4">
    <code class="text-pink-300 font-bold text-sm">fill</code>
    <p class="text-xs text-slate-400 mt-2 mb-3">在輸入框中填入指定文字，常用於表單自動化測試。</p>
    <div class="bg-slate-900/60 rounded-lg p-3 font-mono text-yellow-200/90 text-xs leading-relaxed">
      在 email 欄位填入 test@example.com
    </div>
  </div>
  <div class="bg-slate-800/50 border border-yellow-500/20 rounded-xl p-4">
    <code class="text-yellow-300 font-bold text-sm">evaluate_script</code>
    <p class="text-xs text-slate-400 mt-2 mb-3">在頁面上下文執行任意 JavaScript，提取數據或操控 DOM。</p>
    <div class="bg-slate-900/60 rounded-lg p-3 font-mono text-yellow-200/90 text-xs leading-relaxed">
      執行 JS 取得目前登入的 user id
    </div>
  </div>
</div>

<div class="mt-4 bg-slate-800/40 border border-slate-600/20 rounded-xl p-4">
  <div class="text-xs text-slate-400 mb-2 font-bold">串接範例：完整登入流程測試</div>
  <div class="font-mono text-yellow-200/90 text-xs leading-loose">
    導航到 /login，在 email 填入 test@example.com，在 password 填入 Test1234，點擊「登入」按鈕，截圖確認是否成功跳轉到 /dashboard
  </div>
</div>

---
layout: default
---

# 進階工具：Memory Snapshot

<div class="grid grid-cols-2 gap-5 mt-4">
  <div class="flex flex-col gap-3">
    <div class="bg-slate-800/50 border border-red-500/20 rounded-xl p-4">
      <div class="flex items-center gap-2 mb-3">
        <code class="text-red-300 font-bold text-sm">take_memory_snapshot</code>
        <span class="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded">進階</span>
      </div>
      <p class="text-xs text-slate-400 mb-3">
        對當前頁面拍攝 JavaScript heap memory snapshot，分析物件保留大小（retained size），找出記憶體洩漏的根源節點。
      </p>
      <div class="text-xs text-slate-500 space-y-1">
        <div>📌 適用場景：SPA 頁面切換後記憶體持續增長</div>
        <div>📌 常見根因：未移除的 event listener、detached DOM</div>
      </div>
    </div>
    <div class="bg-slate-900/60 rounded-lg p-4 font-mono text-yellow-200/90 text-xs leading-loose border border-slate-600/20">
      對目前頁面拍攝 heap memory snapshot，<br>
      列出 retained size 最大的前 10 個節點，<br>
      說明是否有 detached DOM 或<br>
      未清除的 event listener 跡象
    </div>
  </div>
  <div class="flex flex-col gap-3">
    <div class="text-xs text-slate-400 font-bold">輸出示意</div>
    <div class="bg-slate-900/60 rounded-xl p-4 border border-slate-600/20 text-xs flex flex-col gap-2">
      <div class="text-slate-500 mb-1">Top retained nodes</div>
      <div class="flex justify-between">
        <span class="text-red-400 font-mono">Detached HTMLDivElement</span>
        <span class="text-slate-300">42.3 MB</span>
      </div>
      <div class="flex justify-between">
        <span class="text-orange-400 font-mono">EventListener (scroll)</span>
        <span class="text-slate-300">18.1 MB</span>
      </div>
      <div class="flex justify-between">
        <span class="text-yellow-400 font-mono">Array (closure)</span>
        <span class="text-slate-300">9.6 MB</span>
      </div>
      <div class="mt-3 pt-3 border-t border-slate-600/30 text-slate-300">
        ⚠ 發現 <span class="text-red-400 font-bold">23 個 detached DOM</span> 節點，<br>
        推測來源：<code class="text-slate-300">ComponentA</code> unmount 時未呼叫 <code class="text-slate-300">removeEventListener</code>
      </div>
    </div>
    <div class="text-xs text-slate-500">
      💡 建議在使用者操作幾輪後再拍 snapshot，對比前後差異更能找出洩漏點
    </div>
  </div>
</div>

---
layout: center
class: text-center
---

# 今天介紹的工具

<div class="grid grid-cols-4 gap-4 mt-8">
  <div class="p-4 bg-slate-800/50 border border-blue-500/30 rounded-xl">
    <div class="font-bold text-blue-400 mb-3 text-sm">導航 + 截圖</div>
    <div class="flex flex-col gap-1 text-xs font-mono text-slate-400">
      <span>navigate_page</span>
      <span>take_screenshot</span>
    </div>
  </div>
  <div class="p-4 bg-slate-800/50 border border-orange-500/30 rounded-xl">
    <div class="font-bold text-orange-400 mb-3 text-sm">Console + Network</div>
    <div class="flex flex-col gap-1 text-xs font-mono text-slate-400">
      <span>list_console_messages</span>
      <span>list_network_requests</span>
    </div>
  </div>
  <div class="p-4 bg-slate-800/50 border border-cyan-500/30 rounded-xl">
    <div class="font-bold text-cyan-400 mb-3 text-sm">頁面互動</div>
    <div class="flex flex-col gap-1 text-xs font-mono text-slate-400">
      <span>click</span>
      <span>fill</span>
      <span>evaluate_script</span>
    </div>
  </div>
  <div class="p-4 bg-slate-800/50 border border-red-500/30 rounded-xl">
    <div class="font-bold text-red-400 mb-3 text-sm">進階</div>
    <div class="flex flex-col gap-1 text-xs font-mono text-slate-400">
      <span>take_memory_snapshot</span>
    </div>
  </div>
</div>

<div class="mt-6 text-slate-500 text-sm">還有 20+ 個工具等你探索 → 完整清單見工具箱頁</div>
