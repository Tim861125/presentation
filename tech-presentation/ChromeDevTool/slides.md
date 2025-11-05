---
theme: default
title: Google Chrome DevTools
info: Chrome 內建的開發者工具，前端工程師必備
---

# Google Chrome DevTools
介紹篇

給網頁開發人員除錯與優化工具

---

# 如何開啟 DevTools

- Chrome 主選單 → 更多工具 → 開發人員工具
- 右鍵 → **Inspect**
- 快捷鍵：
  - Mac：`Command + Option + I`
  - Windows/Linux：`F12` 或 `Ctrl + Shift + I`

---

![alt text](/screenshot.png)

---

# DevTools 主要面板

- **Elements**：顯示 DOM 結構，查看與修改 HTML / CSS
- **Console**：顯示錯誤與 log，支援執行 JS 指令
- **Network**：Request / Response，分析 API
- **Performance**：分析效能、渲染與記憶體
- **Application**：查看 Storage、Cookies、Cache
- **Security**：檢查 HTTPS / 混合內容問題

---

# 裝置模擬 (Device Mode)

- 模擬不同裝置螢幕尺寸與方向
- 測試 RWD

---

# 小結

- DevTools 為 Chrome 內建，無需額外安裝
- 幾乎所有前端開發流程都會用到
- 建議熟練四大面板：
  - Elements
  - Console
  - Source
  - Network
- 定期用 DevTools 檢查錯誤與效能 → 專業開發者習慣

---
layout: cover
---

# Google Chrome DevTools
Element 篇

---

# 查看與修改 HTML

- 直接在 Elements 面板點擊 DOM 節點
- 即時編輯 HTML 標籤、屬性與內容
- 拖曳 DOM 節點改變結構
- `Delete` 鍵可刪除節點

---

# 查看與修改 CSS

- **Styles** 窗格：顯示選定元素的 CSS 規則
- 即時新增、修改、停用 CSS 屬性
- 強制設定元素狀態 (e.g. `:hover`)
- `.cls` 按鈕可以新增 class

<br>
<div>
  <button class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-yellow-700">
    按鈕
  </button>
</div>

---

# DOM 中斷點 (DOM Breakpoints)

<div style="display: flex; gap: 50px; align-items: flex-start;">

<!-- 左側文字說明 -->
<div style="flex: 1;">
  <ul>
    <li>在特定 DOM 變動時暫停 JavaScript 執行</li>
    <li>右鍵點擊元素 → <b>Break on...</b>
      <ul>
        <li><b>subtree modifications</b>: 子節點變動</li>
        <li><b>attribute modifications</b>: 屬性變更</li>
        <li><b>node removal</b>: 節點被移除</li>
      </ul>
    </li>
  </ul>
  <p>→ 有效追蹤動態變更 DOM 的程式碼</p>
</div>


<!-- 右側示範按鈕 -->
<div style="flex: 1;">
  <button
    style="padding: 12px 24px; border-radius: 6px; background-color: #60a5fa; color: white; cursor: pointer;"
    onclick="this.innerText='按下去了!'"
  >
    按鈕
  </button>
</div>

</div>

---
layout: cover
---

# Google Chrome DevTools
Console 篇

---

# Console 面板功能

- 顯示網頁執行過程中的錯誤、警告與訊息
- 可輸入並執行 JavaScript 指令
- 支援即時測試 API / DOM 操作
- 與 Elements、Network 等面板整合，快速取值

---

# 常用 Console 指令

- `console.log()`：輸出一般訊息
```bash
console.log("Hello DevTools!");
```

- `console.warn()`：黃色警告
```bash
console.warn("這是警告訊息");
```

- `console.error()`：紅色錯誤訊息
```bash
console.error("這是錯誤訊息");
```

- `console.table()`：以表格方式顯示陣列 / 物件
```bash
console.table([{name:"Alice", age:25}, {name:"Bob", age:30}]);
```

---

# 小技巧

- 使用上下鍵切換輸入歷史
- `clear()`：清空 Console
- 搭配 `console.group()` 與 `console.groupEnd()` 整理輸出
```
console.group()
console.log("hello")
console.log("world")
console.groupEnd()
```
- 使用 `console.time()` 與 `console.timeEnd()` 測量程式耗時
```
console.time()
for(var i = 0; i < 9999; i++ ){}
console.timeEnd()
```

---

# 小技巧

- `$0`：代表 Elements 面板目前選取的元素
- 方便進行 **效能檢測** 與 **資料比對**

<br>
<div>
  <button
    id="demo-btn"
    style="padding: 12px 24px; border-radius: 6px; background-color: #60a5fa; color: white; cursor: pointer;"
  >
    按鈕
  </button>
</div>

---
layout: cover
---

# Google Chrome DevTools
Source 篇

---

# Source 面板功能
- 查看 / 停止 / 執行 JavaScript 原始碼
- **斷點 (Breakpoints)** 偵錯
- 模擬程式執行流程，方便追蹤錯誤

---

# 基本操作
1. 開啟 Source 面板，選取要除錯的檔案
2. 點擊行號 → 新增斷點 (Breakpoint)
3. 重新整理頁面 → 程式會在該行停下
4. 使用上方工具列控制程式流程：
   - ▶️ Continue：繼續執行
   - ⏭ Step over：逐行執行
   - ⏬ Step into：進入函式內部
   - ⏫ Step out：跳出函式
---

# 範例：計算按鈕點擊次數

<SourceExample />

---
layout: cover
---

# Google Chrome DevTools
Network 篇

---

# Network 面板功能

- 監控所有網頁請求 (Request) 與回應 (Response)
- 分析載入資源：HTML、CSS、JS、圖片、API
- 偵測請求狀態、回應時間與錯誤
- 針對效能瓶頸進行優化

---

# 常見應用場景

- **API 除錯**：檢查 Request/Response 是否正確
- **效能分析**：找出載入最慢的資源
- **資源確認**：圖片、CSS、JS 是否載入成功

---

# 過濾與搜尋

- 可依 **檔案類型** 篩選：JS、CSS、Img、XHR、WS 等
- 搜尋特定 Request
- 查看範圍內的請求

---

# 小結

- **Network 面板** = API 與效能除錯必備工具
- 熟悉 Headers / Response / Timing 三大區塊
- 搭配 Console 與 Source → 掌握前端問題