---
theme: default
background: https://images.unsplash.com/photo-1557683316-973673baf926?w=1920
class: text-center
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: slide-left
title: 2025-12 月工作內容報告
mdc: true
---

# 2025-12 月工作內容報告

<div class="pt-12">
  <span class="text-xl opacity-75">
    月度工作總結與技術分享
  </span>
</div>

---
layout: default
---

# 本月工作概覽

<div class="grid grid-cols-2 gap-4 mt-8">
<div>

### 專案項目

- data-importer
- IPTECH / WEBPAT
- TipoMusic
- 資料轉置問題處理

</div>
<div>

### 技術重點

- Docker Compose
- OpenSearch
- SSE 串流技術
- 資安弱點掃描處理

</div>
</div>

---
layout: two-cols
---

# data-importer

<div class="mt-8">

### 學習內容

本月在 data-importer 專案中深入學習了兩項核心技術

</div>

::right::

<div class="mt-16 ml-4">

### Docker Compose
容器編排與服務管理

<div class="mt-4"></div>

### OpenSearch
分散式搜尋與分析引擎

</div>

---
layout: default
---

# IPTECH / WEBPAT

## AI 通架構調整

<div class="mt-8">

### 採用 SSE (Server-Sent Events) 串流技術

實現即時資料傳輸與回應

</div>

---
layout: default
---

# IPTECH AI 通架構流程

<div class="mt-8">

### 資料流向說明

<div class="mt-6 space-y-4">

1. **前端層** → IPTECH 前端送出請求到 IPTECH Server

2. **應用層** → IPTECH Server 將資料轉送至 PatentPilotService

3. **AI 層** → PatentPilotService 轉送至 AIagent 進行處理

4. **回傳** → 沿原路透過 SSE 串流返回資料

</div>

<div class="mt-8 text-sm opacity-75">
前端 ← SSE → IPTECH Server ← SSE → PatentPilotService ← SSE → AIagent
</div>

---
layout: default
---

# IPTECH / WEBPAT

## 其他開發工作

<div class="mt-12">

### 翻譯及 UI 調整

- 介面國際化處理
- 使用者體驗優化

</div>

---
layout: default
---

# TipoMusic 弱點掃描處理

<div class="mt-8">

### Content Security Policy (CSP) 相關問題修復

<div class="mt-6 space-y-3">

- CSP: Failure to Define Directive with No Fallback
- CSP: script-src unsafe-eval
- CSP: script-src unsafe-inline
- CSP: style-src unsafe-inline
- Content Security Policy (CSP) Header Not Set

</div>

<div class="mt-8 text-sm opacity-75">
透過設定完善的 CSP 標頭，提升網站安全性
</div>

---
layout: center
class: text-center
---

# 資料轉置問題處理

<div class="mt-8 text-lg">
解決資料結構轉換與處理相關議題
</div>

---
layout: center
class: text-center
---

# 謝謝聆聽

<div class="mt-8 text-xl opacity-75">
Questions & Discussion
</div>
