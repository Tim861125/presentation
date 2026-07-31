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

- <span class="text-cyan-400">Patent Embedding Search</span> — 研究到正式站台上線，本月主線
- <span class="text-cyan-400">快檢通</span> — 新功能上線與點數機制
- <span class="text-cyan-400">EPA / EPB</span> — 新增完整資料管線 File → RAW → L1 → L3 → OS
- <span class="text-cyan-400">CN 即期外國專利</span> — 四種類型轉置全數完成
- <span class="text-cyan-400">SEP diff tool</span> — 新增 publunique 快速比較
- <span class="text-cyan-400">TIPOMusic</span> — 欄位擴充與效能排查

---

# Patent Embedding Search
<div class="text-sm opacity-60 font-mono">WEBPAT / IPTECH · Embedding 研究與規格</div>

- 一專利<span class="text-cyan-400">兩向量</span>策略：TAC 一組，AN + IN 分別 embedding
- 研究動機：需以專利權人／申請人／發明人搜尋
- 多向量欄位切分 `TAC` / `applicants` / `assignees` / `inventors`
- 查詢端支援多向量查詢
- patent embedding tool 規格制定與修正
- 研究討論與文件產出（多次迭代）

---

# Patent Embedding Search
<div class="text-sm opacity-60 font-mono">WEBPAT · UI 與魚骨</div>

- 魚骨 UI 設計 + API 撰寫，設計交由美術及 QC
- loading 動畫：魚骨節點動畫修正、相似專利出現動畫
- 儲存專案 dialog：非必填欄位收進「進階」，新增 resize
- 新增按鈕儲存功能，並優化儲存專案流程
- 新增<span class="text-cyan-400">相似專利推薦</span>
- 右上角顯示使用者名稱

---

# Patent Embedding Search
<div class="text-sm opacity-60 font-mono">站台建置、串接與維運</div>

- 獨立站台建置，接 WEBPAT 檢索結果
- IPTECH 首頁新增 patent embedding search 入口
- embedding 資料搬到 server，新增 <span class="text-cyan-400">health check 與 CI/CD</span>
- dify 修正並更新正式站台
- 登入機制：無登入不可使用，串接 IPTECH 及 WEBPAT
- 點數機制：WEBPAT / IPTECH / PatentPilot-service / Dify 全站更新

---

# patent-service
<div class="text-sm opacity-60 font-mono">API 修正與文件 · v1.0.36</div>

<div class="h-px w-16 bg-cyan-400/50 my-3" />

**串接 dify api 調整**

- `DIFY_EMBEDDING_SEARCH_TOP_K` 原為固定環境變數，呼叫端無法單次調整 → 開放參數化
- 發現 `api/tw/published/:pn` 取到核准公告資料，<span class="text-cyan-400">索引指向錯誤</span>，一併修正

**文件**

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

# EPA 即期資料
<div class="text-sm opacity-60 font-mono">EPO EPAB 公開案（A 案）· 新增四階段管線</div>

- 問題：A 案原本<span class="text-cyan-400">沒有匯入管線</span>，資料無法進入 OpenSearch 檢索
- 新增完整鏈路 `File → RAW → L1 → L3 → OS`，以卷期（VOL，7 碼）觸發
- 新增四支 trigger：`raw-epa-biblio` / `l1-epa-biblio` / `l3-epa-search` / `os-epa-search`
- 抽出共用 transform：`ep-biblio-common` / `ep-search-common`
- 新增 OpenSearch mapping 與三張表 SQL
- <span class="text-cyan-400">43 個</span> transform 單元測試 + 四份規格文件

---

# EPB 即期資料
<div class="text-sm opacity-60 font-mono">EPO EPAB 授權案（B1/B2/B3/B8/B9）</div>

- 問題：B 案完全沒有入庫、入索引路徑
- 補上 epb 的 `File → RAW → L1 → L3 → OpenSearch` 四段完整鏈
- 新增四支 trigger 與 `pat_epb` mapping
- 新增 <span class="text-cyan-400">Citus 分散表</span> schema 三張
- 更新共用 transform 註解，補上 specs 文件與測試
- 驗證：EPAB2026024 全卷 <span class="text-cyan-400">1,576 筆</span>跑完四段全鏈

---

# CN 即期外國專利資料
<div class="text-sm opacity-60 font-mono">資料結構分析 + 轉置程式撰寫</div>

<div class="h-px w-16 bg-cyan-400/50 my-4" />

| 類型 | 狀態 |
|------|------|
| 發明公開 | ✓ |
| 發明授權 | ✓ |
| 新型 | ✓ |
| 設計 | ✓ |

---

# SEP 差速工具
<div class="text-sm opacity-60 font-mono">sep-diff-tool · publunique 子指令</div>

- 比對規格制定、SEP 轉置討論與資轉規格
- 問題：原本需跑完整 compare 流程建 <span class="text-cyan-400">160MB hash 快照</span>，對只想拿號碼清單的下游成本過高
- 做法：新增 `publunique`，直接從兩份 CSV/zip 抽 `PUBL_NUMBER` 去重
- 省掉 snapshot 與 merge scan
- 比較單位定為<span class="text-cyan-400">「號碼」</span>而非整格字串，以 `|` 拆 token 進集合，天生不管順序

---

# 資料轉置與資轉支援

<div class="grid grid-cols-2 gap-6 mt-4">
<div>

**新增轉置**

- KR 資料轉置
- kp 發明 / kp 新型
- kd design
- code review 與 Citus 理解

</div>
<div>

**問題協助**

- CARawDataToDBTool 格式錯誤，ST.36 → ST.96 重轉
- JPA123 / 124 壓縮檔問題，移除重轉
- `run.ps1` mattermost 訊息缺雙引號
- 移除重複資轉資料

</div>
</div>

---

# TIPOMusic

- 【音樂/錄音著作查詢】錄音著作新增「<span class="text-cyan-400">製作公司</span>」、「<span class="text-cyan-400">發行公司</span>」欄位及提示文字
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
<div>

**待處理**

- IPTECH 魚骨節點優化
- 元件符號辨識多數專利未呈現（評估）
- 分類頁查公開號需查到核准專利
- 特定專利雷達顯示問題
- 號碼檢索查無結果比對

</div>
</div>

---
layout: center
class: text-center
---

# End
