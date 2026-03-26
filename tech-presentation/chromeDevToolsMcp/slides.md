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
