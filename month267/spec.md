# 2026-07 月工作內容

此專案為 slidev 的專案，將內容寫在 slides.md 裡面

# 注意

- 不要使用 icon, 只在必要時用打勾或叉叉讓版面清晰，不需要的話就不用
- 注意每一頁的高度不要超過螢幕高度
- 科技感（見 skill 的「科技感」段落）
- 完成後要確認畫面，確認沒有頁面下方被切掉
- 用繁體中文
- 首頁背景 background: https://cover.sli.dev

# 以下為本月工作內容

## 任務統計

| 狀態 | 數量 |
|------|------|
| Done | ~118 |
| To Do | ~7 |
| Removed | ~2 |

---

## 一、Patent Embedding Search 語意檢索（本月主線）

從研究 → UI → API → 站台上線的完整建置。

### 1-1 Embedding 研究與規格

- TAC + AN + IN embedding 策略研究：TAC 一組向量，AN + IN 分別 embedding，一專利兩向量，並撰寫測試方法（166408）
- 研究動機：需以專利權人／申請人／發明人搜尋（166467）
- 多向量欄位切分：TAC / applicants / assignees / inventors（166722）
- embedding research 討論 + 文件（166870、166900、167031、167032、168196）
- patent embedding tool 規格與修正（166387、166388）
- 查詢端支援多向量（166871）

### 1-2 UI 與魚骨

- 魚骨 UI 設計 + API 撰寫，UI 設計交由美術及 QC（166548）
- UI 修改與優化（167055、167641、167852、168097）
- loading 動畫：魚骨節點動畫修正、相似專利出現動畫（168402）
- 儲存專案 dialog 修正：非必填欄位收進「進階」Dialog，新增 resize（168403）
- 右上角顯示使用者名稱（168407）
- 魚骨 loading 修改（168546）
- 新增按鈕儲存功能 / 優化儲存專案功能（167642、168095）
- 新增相似專利推薦（168096）

### 1-3 站台、串接與維運

- Patent embedding search 站台建置（167345、167387）
- 接 WEBPAT 檢索結果（167386）
- IPTECH 首頁新增 patent embedding search 入口（167247）
- embedding 資料搬到 server（167269）
- 新增 health check 與 CI/CD（167506）
- dify 修正與更新正式站台（166175、168111）
- embedding api 修正（167955）、api 串接問題排查（168630）
- 登入機制：無登入不能使用，串接 IPTECH 及 WEBPAT（168404）
- 點數機制（167693）；點數機制更新站台：WEBPAT / IPTECH / PatentPilot-service / Patent embedding search / Dify（168405）

### 1-4 patent-service

- api 修改與串接 dify api（168944）
  - 目標：embedding search 回傳筆數原本固定吃環境變數 `DIFY_EMBEDDING_SEARCH_TOP_K`，呼叫端無法針對單次查詢調整
  - 同時發現台灣公開案查詢 `api/tw/published/:pn` 取到的是核准公告資料，索引指向錯誤
  - 一併修正並發版到 v1.0.36
- 更新 swagger 及 KM 文件（168971）：補齊各 API 與各欄位說明，修正自動產生文件與實際行為不一致之處

---

## 二、快檢通

- WEBPAT 新增快檢通（167784）
- 快檢通討論（167866）
- 修正快檢通 UI（167895）
- 點數機制更新與修正（168164、168361）
- IPTECH「快檢通」點數設定：一次 10 點（168642）

---

## 三、CN 即期外國專利資料

分析專利資料結構並撰寫轉置程式，四種類型全數完成：

| 類型 | ID |
|------|----|
| 發明公開 / 發明授權 | 168364 |
| 發明授權 | 168505 |
| 新型 | 168593 |
| 設計 | 168643 |

---

## 四、EPA / EPB 即期資料（新增完整資料管線）

### EPA（公開案）— 168878

- 目標：EPO EPAB 卷期全文 XML 的 A 案原本沒有匯入管線，資料無法進入 OpenSearch 檢索
- 新增 epa 四階段完整鏈路 File → RAW → L1 → L3 → OS，以卷期（VOL，7 碼）為觸發參數
- 實際完成：
  - `raw-epa-biblio-trigger-vol`、`l1-epa-biblio-trigger-vol`、`l3-epa-search-trigger-vol`、`os-epa-search`
  - 抽出共用 transform 兩支：`ep-biblio-common.transform`、`ep-search-common.transform`
  - 新增 OpenSearch mapping 與三張表 SQL
  - 43 個 transform 單元測試 + 四份規格文件

### EPB（授權案）— 168980

- 目標：B 案（kindcode B1/B2/B3/B8/B9）完全沒有入庫入索引路徑
- 補上 epb 的 File → RAW → L1 → L3 → OpenSearch 四段完整鏈
- 實際完成：
  - `raw-epb-biblio-trigger-vol`、`l1-epb-biblio-trigger-vol`、`l3-epb-search-trigger-vol`、`os-epb-search`
  - `pat_epb` mapping、Citus 分散表 schema 三張
  - 更新共用 transform 註解，補上 specs 文件與測試
  - EPAB2026024 全卷 1,576 筆已跑完四段全鏈

---

## 五、SEP 差速工具

- SEP 資料比對與比對規格（166174、166186）
- sep 討論、sep diff tool 規格（166273、166386）
- 討論 SEP 轉置（168652）、SEP 資轉規格（167690）
- SEP 資轉工具 — publunique 子指令（168972，commit 0ec194e）
  - 問題：原本需跑完整 compare 流程建 160MB hash 快照，對只想拿號碼清單的下游成本過高
  - 做法：新增 `publunique` 子指令，直接從兩份 CSV/zip 抽 `PUBL_NUMBER` 欄去重，省掉 snapshot 與 merge scan
  - 比較單位定為「號碼」而非「整格字串」，以 `|` 拆 token 後進集合，天生不管順序

---

## 六、資料轉置與資轉支援

### 新增轉置

- KR 資料轉置（166998）
- kp 發明 / kp 新型 / kd design 資料轉置（167639、167908、167909）
- code review and citus understand（168178）

### 資轉問題協助

- App.CARawDataToDBTool 下載錯誤格式資料，ST.36 → ST.96，移除重新下載重轉（166385）
- JPA123、124 資轉問題，壓縮檔有問題，移除已轉資料重轉（166550）
- `run.ps1` 傳訊息到 mattermost 格式少一個雙引號，修正後重新執行；協助移除重複資轉資料（166699、166885）
- 其他協助處理問題（166094、166302、167033、167116）

---

## 七、TIPOMusic

- 【音樂/錄音著作查詢】錄音著作新增「製作公司」、「發行公司」欄位及補充提示文字（166723）
- 排查正式站台速度慢問題（166869）
- 正式機更新（167803）
- 清單比對規格更新（167839）

---

## 八、WEBPAT / IPTECH 其他

### 已完成

- 匯出信件下載網址問題處理（167338）
- IPTECH / WEBPAT 更新站台（167952、167953）

### 待處理（To Do）

- IPTECH 魚骨節點優化（165271）
- 【評估】WEBPAT 元件符號辨識功能多數專利沒有呈現（166330）
- IPTECH【分類頁】專案中已有核准專利，若查詢公開號也要查到核准專利（166332）
- WEBPAT 特定專利雷達顯示問題（166333）
- WEBPAT 號碼檢索查無檢索結果比對（166334、164476）

### 已移除

- WEBPAT 專利雷達顯示問題（165270）

---

## 九、會議與假期

### 會議

每日晨會為常態，另有：AI Demo 會議（07/07）、月會（07/08）、AI 會議（07/15）、週會（07/17）。

### 假期（共 3 天）

| 日期 | 類型 |
|------|------|
| 07/10 | 事假（16:00~） |
| 07/13 | 颱風假 |
| 07/24 | 事假（09:00~10:30） |
| 07/30 | 病假 |

---

## 關鍵成果摘要

1. **Patent Embedding Search 上線** — 從 research → UI → dify 串接 → 登入/點數 → 正式站台完整建置
2. **快檢通新功能** — 新增快檢通並完善點數機制（10 點／次）
3. **CN 即期外國專利** — 發明公開/授權、新型、設計四類型轉置全數完成
4. **EPA/EPB 雙軌管線** — 新增完整資料管線（File→RAW→L1→L3→OS），EPAB2026024 全卷跑通
5. **SEP diff tool 優化** — 新增 publunique 指令，不用建 hash 快照即可快速比較
6. **patent-service 文件完善** — 補齊 API 與欄位說明、swagger 與 KM 文件同步
7. **TIPOMusic** — 新增欄位、排查效能問題
