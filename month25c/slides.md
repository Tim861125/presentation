---
theme: default
background: https://cover.sli.dev
class: text-center
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: slide-left
title: 2025-12 月工作內容報告
mdc: true
---

# 2025-12 月會

---
layout: two-cols
---

# data-importer

## 新知識接觸

<br>

### Docker Compose
- 容器編排

<br>

### OpenSearch
- 分散式搜尋與分析引擎

---
layout: default
---

# IPTECH / WEBPAT AI 通架構調整
SSE 串流


# 流程


1. IPTECH 前端送出請求到 IPTECH Server

2. IPTECH Server 將資料轉送至 PatentPilotService

3. PatentPilotService 轉送至 AIagent 進行處理

4. 沿原路透過 SSE 串流返回資料

<br>

---

# IPTECH / WEBPAT


### 翻譯及 UI 調整

- 檢索頁 檢索結果頁 詳細頁 魚骨 檢視頁 分類頁 管理頁 技術頁 報告頁

<br>

### 點數功能優化

<br>

### 速讀通 / 閱讀通
- 新增自動 / 手動執行功能

---
layout: default
---

# TipoMusic 弱點掃描處理

### Content Security Policy (CSP) 相關問題修復

- CSP: Failure to Define Directive with No Fallback
- CSP: script-src unsafe-eval
- CSP: script-src unsafe-inline
- CSP: style-src unsafe-inline
- Content Security Policy (CSP) Header Not Set

透過設定完善的 CSP 標頭，提升網站安全性

<br>

# 資料轉置問題處理

---
layout: center
class: text-center
---

# Thanks
