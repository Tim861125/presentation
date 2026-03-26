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
