# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

這是一個使用 Slidev 製作的技術簡報專案,主題為 MCP (Model Context Protocol) Transport 技術分享。Slidev 是一個基於 Vue 和 Vite 的簡報框架,使用 Markdown 編寫投影片內容。

## 常用指令

### 開發
```bash
bun install         # 安裝相依套件
bun dev             # 啟動開發伺服器 (會自動開啟瀏覽器,預設 http://localhost:3030)
```

### 建置與匯出
```bash
bun build           # 建置靜態網站到 dist/ 目錄
bun export          # 匯出簡報為 PDF 或其他格式
```

## 架構說明

### 簡報內容結構
- **slides.md** - 主要簡報內容檔案,使用 Markdown 語法撰寫
- **spec.md** - 簡報規格與需求文件,包含設計理念與參考資料
- **ref.md** - 參考資料文件

### 輔助檔案
- **components/** - Vue 元件目錄 (如 Counter.vue)
- **pages/** - 額外的投影片頁面 (可從主簡報引入)
- **snippets/** - 程式碼片段

### 部署設定
- **netlify.toml** - Netlify 部署設定
- **vercel.json** - Vercel 部署設定
- 建置輸出目錄: `dist/`
- 需要 Node.js 20

## Slidev 簡報編寫規則

### 投影片分隔
- 使用 `---` 分隔不同投影片
- 首頁使用 YAML frontmatter 設定主題、背景等

### 內容規範 (來自 spec.md)
- 簡潔有力,避免過多 icon
- 使用簡潔的範例程式碼
- 每份簡報約 20 頁
- 不使用 click 互動功能
- 注意版面長度,不要超過螢幕範圍

### 程式碼區塊
- 支援語法高亮 (highlighter: shiki)
- TypeScript/JavaScript 範例使用 ```ts 或 ```js
- 可選擇是否顯示行號 (lineNumbers: false)

## 簡報主題

本簡報比較三種 MCP Transport 實作方式:
1. **StdioClientTransport** - 本地程序間通訊
2. **SSEClientTransport** - Server-Sent Events (legacy)
3. **StreamableHTTPClientTransport** - HTTP streaming (官方推薦)

重點在於說明為何 StreamableHTTPClientTransport 是新一代標準,以及它相對於 SSE 的架構優勢。
