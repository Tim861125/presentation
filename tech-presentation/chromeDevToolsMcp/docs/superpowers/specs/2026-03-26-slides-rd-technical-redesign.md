# Slides Redesign: RD Technical Sharing

**Date:** 2026-03-26
**Project:** chromeDevToolsMcp Slidev presentation
**Goal:** 將現有行銷導向簡報改為 RD 部門技術分享，重心在 prompt 寫法與工具實戰應用。

---

## Context

現有 slides.md 共 8 頁，偏向行銷語調（痛點故事、互動滑桿），缺乏技術深度。目標聽眾為混合背景的 RD 工程師，不需要基礎鋪墊，需要可直接帶走複用的技術內容。

---

## New Slide Structure（共 10 頁）

### 頁 1 — Title（保留，副標微調）
- 副標改為：「有效使用 Chrome DevTools MCP 的實戰指南」
- 其餘維持原樣

### 頁 2 — 什麼是 Chrome DevTools MCP（改版）
- 保留現有架構說明
- 新增：MCP config 設定片段（JSON），讓 RD 知道如何接入 Claude
- 新增：連接已開啟的 Chrome 實例的方式（`--remote-debugging-port=9222`）

### 頁 3 — 核心工具箱（保留）
- 保留 `<ToolsLibrary />` 互動元件，作為工具參考頁
- 定位改為「工具參考，隨時查閱」

### 頁 4 — Prompt 解剖：結構模板（新增）
四個構成元素，用色彩標示角色：
1. **動作動詞** — 導航 / 錄製 / 截圖 / 分析 / 執行 JS
2. **環境條件** — 裝置、網路、時區、UA
3. **分析目標** — 要找什麼、門檻值是多少
4. **輸出格式** — 表格 / 條列 / JSON / Markdown report

視覺：一段完整 prompt 用顏色標出各元素 + 四個說明卡

### 頁 5 — Prompt 範例集 (1)：效能與監控（新增）
效能相關工具的完整 prompt 範例：
- **Performance Trace**：錄製 reload、分析 LCP / Long Task / render-blocking
- **Network 檢查**：列出慢請求、標出資源大小與優先順序
- **Console + JS 執行**：抓 JS 錯誤、執行自定義分析腳本（含 `evaluate_js` 注入）
- **Memory Snapshot**：分析 heap 使用量，找出記憶體洩漏節點

每個範例直接呈現可複用的 prompt 文字。

### 頁 6 — Prompt 範例集 (2)：進階工具應用（新增）
較少被使用但實用性高的工具 prompt 範例：
- **Accessibility Tree**：A11y 稽核，找出缺少 aria-label 或 role 的元素
- **Cookie / LocalStorage 檢查**：驗證登入狀態、token 過期、session 資料正確性
- **Geolocation + Timezone 模擬**：測試地區性功能（地圖、在地化日期格式）
- **Page Source（SSR/SEO 檢查）**：確認 SSR 渲染結果，驗證 meta tag / OG tag

每個範例直接呈現可複用的 prompt 文字。

### 頁 7 — 工具串接技巧（新增）
展示在單一對話中串接多個工具完成一個完整任務：
- 範例：「導航 → 模擬環境 → 錄 trace → 檢查 network → 輸出完整報告」
- 重點：如何在 prompt 中描述跨工具的依賴順序
- 補充：如何指定 session 連接到已開啟的頁面

### 頁 8 — Case Study Part 1：LCP 慢排查（新增）
**場景**：用戶回報首頁在手機上載入很慢

步驟：
1. `Step 1` — 重現環境（導航 + 模擬 iPhone 14 + 4G + 截圖）
2. `Step 2` — 錄製 trace（reload 後分析 LCP 與 render-blocking 資源）
3. `Step 3` — 檢查 network（找出超過 500ms 的請求）

每步驟附實際 prompt 文字（code block 風格）。

### 頁 9 — Case Study Part 2：結論與輸出（新增）
- AI 輸出的診斷報告示意（根因 / 受影響指標 / 建議修復方向）
- 強調：從「發現問題」到「拿到報告」全程 prompt-driven，不需要手動開 DevTools

### 頁 10 — 總結（改版）
- 移除 Before/After 痛點對比
- 改為：「三件事帶走」
  1. Prompt 四元素結構
  2. 工具串接模式
  3. MCP config 設定方式（連結/QR code）

---

## Slides to Remove

| 頁面 | 原因 |
|------|------|
| 傳統 Debug 黑暗時代 | 行銷語調，對 RD 無用 |
| Live Demo 手動說明頁（×2）| 太空白，只有說明文字 |
| MetricsVisualizer 互動滑桿 | 與主題脫節，已有更好替代 |

---

## Components

- `ToolsLibrary.vue` — 保留不動
- `MetricsVisualizer.vue` — 保留檔案但不在新 slides 中引用
- `DemoController.vue` — 保留檔案但不在新 slides 中引用
- `ComparisonView.vue` — 保留檔案但不在新 slides 中引用

---

## Constraints

- 所有 prompt 範例使用繁體中文（與現有簡報語言一致）
- 維持 `seriph` 主題、`slide-left` transition
- Slidev code block 使用 `shiki` highlighter
