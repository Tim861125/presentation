---
theme: default
background: https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Model Context Protocol (MCP)
  AI 應用的標準化連接協議
drawings:
  persist: false
transition: slide-left
title: Model Context Protocol (MCP)
mdc: true
---

# Model Context Protocol

## AI 應用的標準化連接協議

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    開始 <carbon:arrow-right class="inline"/>
  </span>
</div>

---
layout: default
---

# 什麼是 MCP？

<v-clicks>

- **Model Context Protocol (MCP)** 是一個開源標準協議
- 用於連接 AI 應用程序到外部系統

<div class="mt-8">

## 類比理解

就像 **USB-C** 為電子設備提供標準化連接

**MCP** 為 AI 應用提供標準化方式連接外部系統

</div>

<div class="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded">

使 AI 應用能夠：
- 📁 連接到**數據源**（本地文件、資料庫）
- 🔧 訪問**工具**（搜尋引擎、計算器）
- ⚡ 執行**工作流**（專業提示）

</div>

</v-clicks>

---
layout: two-cols
---

# 為什麼需要 MCP？

<v-clicks>

## 對開發者
- ✅ 減少開發時間
- ✅ 降低整合複雜性
- ✅ 標準化接口

## 對 AI 應用
- ✅ 豐富的數據源生態系統
- ✅ 強大的工具集成能力
- ✅ 可擴展性

</v-clicks>

::right::

<v-clicks>

<div class="ml-4">

## 對終端用戶
- ✅ 更強大的 AI 應用
- ✅ 訪問個人數據
- ✅ 執行實際操作

<div class="mt-8 p-4 bg-green-50 dark:bg-green-900 rounded text-sm">

**核心價值**

提供一個統一的標準，讓 AI 應用能夠安全、高效地連接到各種外部系統

</div>

</div>

</v-clicks>

---
layout: default
---

# MCP 架構

````md magic-move
```text
┌─────────────────────────────┐
│      AI 應用程序 (客戶端)    │
│    Claude / ChatGPT / ...   │
└──────────────┬──────────────┘
               │
               │
```

```text
┌─────────────────────────────┐
│      AI 應用程序 (客戶端)    │
│    Claude / ChatGPT / ...   │
└──────────────┬──────────────┘
               │
         MCP Protocol
       (標準化通信層)
               │
```

```text
┌─────────────────────────────┐
│      AI 應用程序 (客戶端)    │
│    Claude / ChatGPT / ...   │
└──────────────┬──────────────┘
               │
         MCP Protocol
       (標準化通信層)
               │
┌──────────────▼──────────────┐
│        MCP 服務器           │
│  • 數據源 (Resources)       │
│  • 工具 (Tools)             │
│  • 工作流 (Prompts)         │
└─────────────────────────────┘
```
````

<v-click>

<div class="mt-8 p-4 bg-purple-50 dark:bg-purple-900 rounded">

**客戶端-服務器模型**：清晰的職責分離，AI 應用通過標準協議與各種服務器通信

</div>

</v-click>

---
layout: default
---

# 核心概念

<div class="grid grid-cols-2 gap-4 mt-8">

<v-clicks>

<div class="p-4 border-2 border-blue-400 rounded">

## 📦 Resources (資源)
服務器提供的數據
- 文件
- 資料庫記錄
- API 數據
- ...

</div>

<div class="p-4 border-2 border-green-400 rounded">

## 🔧 Tools (工具)
服務器暴露的可調用函數
- 搜尋功能
- 計算器
- API 調用
- ...

</div>

<div class="p-4 border-2 border-yellow-400 rounded">

## 💬 Prompts (提示)
預定義的對話範本
- 工作流模板
- 專業提示
- 情境預設
- ...

</div>

<div class="p-4 border-2 border-red-400 rounded">

## 🔌 Transports (傳輸)
通信協議支援
- stdio
- HTTP
- WebSocket
- ...

</div>

</v-clicks>

</div>

---
layout: default
---

# 應用場景 (1/2)

<div class="grid grid-cols-2 gap-6 mt-8">

<v-clicks>

<div class="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg">

### 📅 個性化 AI 助手
```
Agent
  → Google Calendar
  → Notion
  → Email
```
充當個人秘書，管理日程和筆記

</div>

<div class="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg">

### 🎨 設計到代碼
```
Claude Code
  → Figma MCP Server
  → 生成完整 Web 應用
```
從設計稿自動生成代碼

</div>

</v-clicks>

</div>

---
layout: default
---

# 應用場景 (2/2)

<div class="grid grid-cols-2 gap-6 mt-8">

<v-clicks>

<div class="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg">

### 🏢 企業數據分析
```
Chatbot
  → Database 1
  → Database 2
  → Database 3
```
通過聊天分析多個資料庫

</div>

<div class="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-lg">

### 🖨️ 3D 設計與製造
```
AI Model
  → Blender
  → 3D Printer
```
創建設計並直接打印

</div>

</v-clicks>

</div>

---
layout: default
---

# 如何開始？

<v-clicks>

<div class="mt-8">

## 1️⃣ 選擇你的角色

<div class="grid grid-cols-3 gap-4 mt-4">
  <div class="p-4 bg-blue-100 dark:bg-blue-900 rounded text-center">
    <div class="text-2xl mb-2">👨‍💻</div>
    構建客戶端
  </div>
  <div class="p-4 bg-green-100 dark:bg-green-900 rounded text-center">
    <div class="text-2xl mb-2">⚙️</div>
    構建服務器
  </div>
  <div class="p-4 bg-purple-100 dark:bg-purple-900 rounded text-center">
    <div class="text-2xl mb-2">🔌</div>
    連接服務器
  </div>
</div>

</div>

<div class="mt-8">

## 2️⃣ 開始步驟
1. 了解概念 → 閱讀 Architecture 文檔
2. 選擇方向 → 客戶端或服務器
3. 使用 SDK → Python、JavaScript、TypeScript 等
4. 開發實現 → 根據用例編碼
5. 測試調試 → 使用 MCP Inspector

</div>

</v-clicks>

---
layout: center
class: text-center
---

# 總結

<v-clicks>

<div class="mt-8 text-left max-w-2xl mx-auto">

## MCP 的核心價值

- 🌐 **標準化協議**：統一 AI 應用與外部系統的連接方式
- 🚀 **提升效率**：減少開發時間，降低整合複雜性
- 🔧 **靈活擴展**：支援多種數據源、工具和工作流
- 🎯 **實際應用**：從個人助手到企業解決方案

<div class="mt-8 p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">

**MCP 正在成為 AI 應用生態系統的基礎設施**

讓 AI 從對話工具進化為真正的行動助手

</div>

</div>

</v-clicks>

---
layout: end
---

# 謝謝聆聽

<div class="mt-8">

## 參考資源

- 📚 官方文檔：https://modelcontextprotocol.io
- 💻 GitHub：https://github.com/modelcontextprotocol
- 📖 入門指南：https://modelcontextprotocol.io/docs/getting-started/intro

</div>
