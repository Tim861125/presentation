# Chrome DevTools MCP 技術分享規格

## 1. 簡報整體架構

### 主題
Chrome DevTools MCP：用 AI 加速前端 Debug 與性能優化

### 目標觀眾
- 前端開發者
- 全棧開發者
- 技術領導者

### 簡報時長
30-40 分鐘（包含 demo）

---

## 2. 簡報內容大綱

### Slide 1: 標題頁
- 標題：Chrome DevTools MCP：用 Claude AI 加速性能調試
- 副標題：全自動追蹤、分析、優化工作流
- 講者名字、日期

### Slide 2: 問題陳述
**痛點：傳統前端 Debug 的三大困擾**
1. 性能瓶頸難找：LCP/INP/CLS 數據多，人工分析慢
2. 重複操作浪費時間：截圖→記錄→手動填表→出報告
3. DevTools 資料孤島：trace 檔、console logs、network 分散，難關聯

**結果：一個簡單的性能問題，可能花 2-3 小時才排查出來**

### Slide 3: Chrome DevTools MCP 是什麼
- 定義：Google 官方發布的 MCP Server，讓 Claude AI 直接存取 Chrome DevTools Protocol (CDP) 資料
- 三個核心功能：
  1. **自動導航 + 操作**：開瀏覽器、點擊、輸入、等待
  2. **即時收集 DevTools 資料**：Trace、Console logs、Network requests、Performance metrics
  3. **AI 分析**：Claude 用真實資料給出優化建議和修補 code
- 優勢：
  - 官方維護，27 個工具函數，相比 Playwright MCP 的 15 個更全面
  - 可連現有 Chrome（保留 session）
  - DevTools 級別的深度資料分析

### Slide 4: 架構圖
```
Your Local Chrome Browser
    ↓ (Chrome DevTools Protocol)
Chrome DevTools MCP Server
    ↓ (MCP Protocol)
Claude CLI / Claude Code
    ↓ (Natural Language)
You
```
- 解釋：三層架構，本機 Chrome → MCP Server → Claude AI → 你的指示

### Slide 5: 核心工具一覽
分為四大類：
1. **導航與操作**：navigate、click、fill、screenshot、evaluate_js
2. **DevTools 追蹤**：start_trace、stop_trace、get_trace_data
3. **DevTools 檢查**：get_console_messages、get_network_requests、get_accessibility_tree
4. **環境模擬**：emulate_network、emulate_device、set_viewport

### Slide 6: 與其他工具的對比
| 工具 | 性能分析 | DevTools 資料 | 登入自動化 | 跨瀏覽器 |
|-----|---------|--------------|----------|---------|
| Chrome DevTools MCP | ✅ 專業 | ✅ 完整 | ✅ 可以 | ❌ Chrome only |
| Playwright MCP | ⚠️ 有限 | ❌ 基本 | ✅✅ 強 | ✅ 多瀏覽器 |
| Claude Chrome Extension | ❌ 無 | ❌ 無 | ⚠️ 共享 session | ❌ 無 |
| 傳統 Puppeteer | ❌ 無 | ❌ 無 | ✅ 強 | ✅ 多瀏覽器 |

**結論：性能 debug → DevTools MCP；自動化測試 → Playwright MCP；可兩者搭配使用**

---

## 3. 實作 Demo 場景

### Demo 1: 性能追蹤 + AI 分析（8-10 分鐘）

**場景**
- 準備一個故意有性能問題的 Vue.js 頁面（本機 http://localhost:3000）
- 問題特徵：某個元件加載慢、有長任務、render-blocking resource

**執行流程**
```
1. 在 Claude CLI 執行命令
2. Claude 使用 DevTools MCP：
   - navigate 到本機網站
   - start_trace 錄 5 秒性能
   - stop_trace 並收集 trace 數據
   - 分析 LCP、INP、長任務、阻塞資源
3. Claude 輸出：
   - 性能問題根因分析（3 點）
   - 具體優化建議（程式碼片段）
   - 預計改善效果
```

**Prompt 範例**
```
請用 Chrome DevTools MCP 開啟 http://localhost:3000/slow-page，
錄一段 8 秒的 performance trace，分析：
1. LCP（Largest Contentful Paint）的瓶頸
2. 最長的 JavaScript 執行任務
3. Render-blocking 的資源
最後提出 3 個優先級最高的優化建議，並給出修改的 code 範例。
```

**預期輸出**
- Trace 資料視覺化（秒數軸、任務、LCP 標記）
- 文字分析說明
- 修改前後的 code 對比

### Demo 2: 登入流程自動化 + Trace（8-10 分鐘）

**場景**
- 準備一個簡單的 login → dashboard 流程
- 用 Playwright MCP 自動操作，同時用 Chrome DevTools MCP 追蹤

**執行流程**
```
1. Playwright MCP：
   - 自動輸入帳號 / 密碼
   - 點擊登入按鈕
   - 等待重定向到 dashboard
2. Chrome DevTools MCP：
   - 在登入時錄 trace（追蹤登入 API 耗時）
   - 提取 network logs（API response 時間）
   - 抓 console 確認無 error
3. 產出：
   - 登入流程自動化腳本
   - 登入性能報告（API 耗時、首頁 LCP）
   - SOP 截圖文件
```

**Prompt 範例**
```
使用 Playwright MCP 和 Chrome DevTools MCP：
1. 打開 http://localhost:3000/login
2. 用帳號 test@example.com、密碼 demo123 登入
3. 在整個登入過程（登入前 → 點擊登入 → 跳轉 dashboard）錄 performance trace
4. 收集：
   - 登入 API 的耗時（network logs）
   - Dashboard 首頁的 LCP
   - 是否有 console error
5. 產出：
   - 登入效能報告
   - 性能時間軸視覺化
   - 1 份自動化登入測試的 Playwright 程式碼
```

**預期輸出**
- 步驟化操作日誌 + 截圖
- Performance trace 時間軸
- Network 耗時柱狀圖
- 自動化測試腳本

---

## 4. 互動展示頁面（Vue 組件）

### 頁面 1: 即時 Demo 控制面板
**功能**
- 輸入框：可複貼 prompt 給 Claude
- 即時日誌窗口：顯示 MCP 工具呼叫（navigate → screenshot → get_trace_data）
- 結果展示區：並排顯示「AI 分析」和「修改建議」

**Vue 組件**
```vue
- DemoController.vue
  - promptInput：編輯 prompt 區域
  - toolCallsLog：工具呼叫日誌（Timeline format）
  - resultPanel：二分割，左側 AI 分析、右側 code 片段
```

### 頁面 2: 對比展示
**功能**
- 左側「傳統方式」：手動 DevTools → 截圖 → 記錄 → 手動填表
- 右側「AI 輔助方式」：自然語言指示 → Claude 一鍵完成

**Vue 組件**
```vue
- ComparisonView.vue
  - traditionalFlow：展示傳統流程（5 個步驟）
  - aiAssistedFlow：展示 AI 流程（2 個步驟）
  - timeComparison：時間對比圖表
```

### 頁面 3: 工具庫展示
**功能**
- 27 個 DevTools MCP 工具的互動列表
- 每個工具卡片：名稱、功能、使用場景、參數說明

**Vue 組件**
```vue
- ToolsLibrary.vue
  - toolCategories：四大分類（導航、追蹤、檢查、模擬）
  - toolCard：單個工具卡片，可點擊展開詳情
  - searchBar：工具搜尋
```

### 頁面 4: 性能指標教育
**功能**
- 可互動的 Core Web Vitals 視覺化
- 滑桿調整模擬數值，實時更新指標狀態（綠 / 黃 / 紅）

**Vue 組件**
```vue
- MetricsVisualizer.vue
  - lcpSlider：LCP 滑桿（0-4s）
  - inpSlider：INP 滑桿（0-1s）
  - clsSlider：CLS 滑桿（0-1）
  - statusIndicator：即時狀態指示
```

---

## 5. 技術架構

### Slidev 設置
- **主題**：dark (推薦) 或 light
- **Layout**：
  - cover（標題）
  - default（內容）
  - two-cols（對比展示）
  - image（圖片全屏）
  - center（居中內容）
- **動畫**：用 `v-click` 漸進展示重點

### Vue 組件結構
```
src/
├── slides/
│   ├── 01-title.md
│   ├── 02-problem.md
│   ├── 03-what-is-mcp.md
│   ├── 04-architecture.md
│   ├── 05-tools-overview.md
│   ├── 06-comparison.md
│   ├── 07-demo-performance.md
│   ├── 08-demo-login.md
│   ├── 09-interactive-demo.md
│   └── 10-conclusion.md
├── components/
│   ├── DemoController.vue
│   ├── ComparisonView.vue
│   ├── ToolsLibrary.vue
│   ├── MetricsVisualizer.vue
│   ├── ToolCallsLog.vue
│   └── CodeHighlight.vue
└── assets/
    ├── architecture-diagram.svg
    ├── comparison-chart.png
    └── core-web-vitals-guide.png
```

### 互動元素
- **工具庫搜尋**：即時篩選 27 個工具
- **指標滑桿**：即時更新 Core Web Vitals 狀態
- **Code 複製按鈕**：一鍵複製 Prompt / 程式碼
- **日誌展開**：工具呼叫詳情 accordion

---

## 6. 展示流程（推薦時間配置）

| 內容 | 時間 | 形式 |
|------|------|------|
| 標題 + 問題陳述 | 3 分 | Slidev |
| MCP 介紹 + 架構 | 5 分 | Slidev + 互動工具庫 |
| 工具對比 | 2 分 | Slidev 表格 |
| **Demo 1: 性能追蹤** | 10 分 | 現場 Claude CLI + Slidev 日誌展示 |
| **Demo 2: 登入自動化** | 10 分 | 現場 CLI + Slidev 步驟日誌 |
| 最佳實踐 | 3 分 | Slidev |
| Q&A | 5 分 | - |

---

## 7. 背景知識（給 AI 的上下文）

### Chrome DevTools Protocol (CDP)
- Google 官方通訊協議，讓外部工具控制 Chrome
- DevTools MCP 基於此，抽象成 MCP 工具函數

### Performance Trace 結構
- 包含事件流：Task → Render → Paint
- 標記重要指標：LCP、INP、CLS、FID
- 可視化為時間軸

### Core Web Vitals (CWV)
- **LCP**（Largest Contentful Paint）：≤ 2.5s 優秀
- **INP**（Interaction to Next Paint）：≤ 200ms 優秀
- **CLS**（Cumulative Layout Shift）：≤ 0.1 優秀

### MCP 協議
- 標準化 AI 工具整合方式
- 支援 stdio / HTTP 傳輸
- Claude、其他 LLM 都能用同一份 MCP Server

---

## 8. 視覺資產需求

### 圖表
1. **架構圖**：Chrome → CDP → MCP Server → Claude（Flow chart）
2. **對比圖**：傳統 vs AI 輔助流程（Swimlane diagram）
3. **性能指標範例**：LCP/INP/CLS 的時間軸視覺化
4. **工具分類**：四大工具類別的樹狀圖

### 程式碼片段
1. Claude CLI 安裝指令
2. 性能分析 Prompt 範例
3. 登入自動化 Prompt 範例
4. 簡單的優化修改程式碼對比

### 截圖
1. Chrome DevTools Trace 面板示例
2. Console Logs 示例
3. Network Requests 示例
4. Claude CLI 輸出示例

---

## 9. 額外互動想法

### 現場投票
- 「你認為這個瓶頸最可能是？」→ 看觀眾選擇，再用 DevTools MCP 驗證

### QR Code
- 分享簡報連結、Chrome DevTools MCP GitHub repo、官方文件

### 留言板
- 問「你最想用它做什麼？」，蒐集回饋

---

## 10. 必備資訊檢查清單

- [ ] Chrome DevTools MCP 官方文件連結
- [ ] GitHub repo：ChromeDevTools/chrome-devtools-mcp
- [ ] npm 包：chrome-devtools-mcp
- [ ] Claude CLI 最新版本要求
- [ ] 本機測試頁面（有性能問題、有登入流程的範例 app）
- [ ] 27 個工具的完整列表
- [ ] 性能指標基準值（什麼算好、什麼算差）
