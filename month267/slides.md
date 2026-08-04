---
theme: seriph
colorSchema: dark
background: https://cover.sli.dev
highlighter: shiki
title: 2026-07
class: text-center
---

# <span class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">2026-07 工作報告</span>

丁吾心

---

# 本月概覽
<div class="text-sm opacity-60 font-mono">2026-07 · Done 118 / To Do 7</div>

<div class="h-px w-16 bg-cyan-400/50 my-4" />

- <span class="text-cyan-400">Patent Embedding Search</span> — 研究到正式站台上線
- <span class="text-cyan-400">快檢通</span> — WEBPAT 上線與點數機制
- <span class="text-cyan-400">EP / KR / CN</span> — 新增完整資料管線 File → RAW → L1 → L3 → OS
- <span class="text-cyan-400">SEP diff tool</span> — 新增 publunique 快速比較
- <span class="text-cyan-400">TipoMusic</span> — 比對欄位擴充

---

# Patent Embedding Search
<div class="text-sm opacity-60 font-mono">WEBPAT / IPTECH · Embedding 研究與規格</div>

- 一專利<span class="text-cyan-400">兩向量</span>策略：TAC 一組，AN + IN 分別 embedding
- 研究動機：需以專利權人／申請人／發明人搜尋
- 多向量欄位切分 `TAC` / `applicants` / `assignees` / `inventors`
- 查詢端支援多向量查詢
- patent embedding tool 規格制定與修正

---

# Patent Embedding Search
<div class="text-sm opacity-60 font-mono">WEBPAT · UI 與魚骨</div>

- 魚骨 UI 設計 + API 撰寫
- loading 動畫：魚骨節點動畫修正
- 新增按鈕儲存功能，並優化儲存專案流程
- 新增<span class="text-cyan-400">相似專利推薦</span>
- 右上角顯示使用者名稱

---

# Patent Embedding Search
<div class="text-sm opacity-60 font-mono">站台建置、串接</div>

- 學習站台建置，接 WEBPAT 檢索結果
- IPTECH 首頁新增 patent embedding search 入口
- embedding 資料搬到 server
- 學習 <span class="text-cyan-400">health check 與 CI/CD</span>
- dify 修正並更新正式站台
- 登入機制：無登入不可使用，只能從 IPTECH 登入
- 點數機制：WEBPAT / IPTECH / PatentPilot-service / Dify 全站更新

---

# patent-service
<div class="text-sm opacity-60 font-mono">API 修正與文件 · v1.0.36</div>

<div class="h-px w-16 bg-cyan-400/50 my-3" />

**串接 dify api 調整**

**更新文件**

- 更新 swagger 與 KM 文件，補齊各 API 與欄位說明
- 修正自動產生文件與實際行為不一致之處

---

# 快檢通
<div class="text-sm opacity-60 font-mono">WEBPAT / IPTECH</div>

- WEBPAT 新增<span class="text-cyan-400">快檢通</span>功能
- 快檢通 UI 修正
- 點數機制更新與修正
- IPTECH 點數設定：一次 <span class="text-cyan-400">10 點</span>

---

# TIPOMusic

- 【音樂/錄音著作查詢】錄音著作新增「<span class="text-cyan-400">製作公司</span>」、「<span class="text-cyan-400">發行公司</span>」欄位比對
- 排查正式站台速度慢問題
- 正式機更新
- 清單比對規格更新

---

# WEBPAT / IPTECH 其他

<div class="grid grid-cols-2 gap-6 mt-4">
<div>

**已完成**

- 匯出信件下載網址問題處理
- IPTECH 更新站台
- WEBPAT 更新站台

</div>
</div>

---
layout: center
class: text-center
---

# End
