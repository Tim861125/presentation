---
theme: seriph
background: https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070
class: text-center
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: slide-left
title: Chrome DevTools MCP - AI 驅動的效能調試革命
---

# Chrome DevTools MCP

<h2 class="text-blue-400 opacity-80">AI 驅動的前端效能調試革命</h2>

<div class="mt-8 text-gray-400 text-lg">
  從「人工排查」轉向「AI 自動化分析」的跨時代方案
</div>

<div class="absolute bottom-10 left-0 right-0 text-sm text-gray-500">
  Presenter: Your Name · 2026 Tech Sharing
</div>

---
layout: default
---

# 傳統前端 Debug 的「黑暗時代」

<div class="grid grid-cols-3 gap-4 mt-10">
  <div v-click class="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
    <div class="text-3xl mb-2">🧩</div>
    <div class="font-bold text-red-400">資料碎片化</div>
    <p class="text-sm text-gray-400 mt-2">Console, Network, Trace 分散各處，難以建立關聯性。</p>
  </div>
  <div v-click class="p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
    <div class="text-3xl mb-2">🔄</div>
    <div class="font-bold text-orange-400">重複勞動</div>
    <p class="text-sm text-gray-400 mt-2">截圖、錄影、手動填寫報告，耗費 70% 的排查時間。</p>
  </div>
  <div v-click class="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
    <div class="text-3xl mb-2">📉</div>
    <div class="font-bold text-purple-400">分析門檻高</div>
    <p class="text-sm text-gray-400 mt-2">CDP 底層數據晦澀難懂，只有資深開發者能精確診斷。</p>
  </div>
</div>

---
layout: center
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
layout: section
---

# 實戰演示 (Live Demo)
### 第一部分：自動化導航與環境模擬

<div class="mt-10 p-4 bg-blue-900/10 border-l-4 border-blue-500">
  <strong>[手動操作說明]</strong><br/>
  1. 打開 Claude CLI<br/>
  2. 執行：<code>navigate 到 Google 並把視窗設定為 iPhone 14 尺寸</code><br/>
  3. 執行：<code>emulate_network 為 3G 模式並截圖</code>
</div>

---
layout: section
---

# 實戰演示 (Live Demo)
### 第二部分：性能追蹤與 AI 分析

<div class="mt-10 p-4 bg-emerald-900/10 border-l-4 border-emerald-500">
  <strong>[手動操作說明]</strong><br/>
  1. 執行：<code>開啟 http://localhost:3000</code><br/>
  2. 執行：<code>start_trace 錄製 5 秒，分析 LCP 指標並找出導致卡頓的 JavaScript 任務</code><br/>
  3. 展示：Claude 輸出的精確分析報告
</div>

---
layout: default
---

# 互動演示：核心指標模擬

<MetricsVisualizer />

---
layout: default
---

# 總結：開發者體驗 (DX) 的躍遷

<div class="grid grid-cols-2 gap-8 mt-10">
  <div>
    <h3 class="text-gray-400 mb-4">Before: 體力勞動</h3>
    <ul class="space-y-2 opacity-60">
      <li>❌ 手動錄製 Trace 並逐格分析</li>
      <li>❌ 在多個面板間拼湊真相</li>
      <li>❌ 撰寫重複的性能報告</li>
    </ul>
  </div>
  <div>
    <h3 class="text-blue-400 mb-4">After: 決策驅動</h3>
    <ul class="space-y-2">
      <li>🚀 AI 自動鎖定「最長任務」與「阻塞資源」</li>
      <li>🚀 自然語言對話式 Debug</li>
      <li>🚀 直接獲取帶有數據背書的優化建議</li>
    </ul>
  </div>
</div>

<ComparisonView class="mt-8" />

---
layout: center
class: text-center
---

# Q & A
### 讓 AI 成為你的 Senior Frontend Engineer

<div class="mt-10 text-sm text-gray-500">
  GitHub: ChromeDevTools/chrome-devtools-mcp
</div>

