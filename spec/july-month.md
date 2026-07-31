# 2026 年 7 月工作報告

## 任務統計

| 狀態 | 數量 |
|------|------|
| Done | ~118 |
| To Do | ~7 |
| Removed | ~2 |

---

## 一、Patent Embedding Search 語意檢索

| ID | 標題 | 狀態 |
|----|------|------|
| 166092 | [WEBPAT] patent embedding search | Done |
| 166175 | patent embedding search dify 修正 | Done |
| 166300 | sep diff tool | Done |
| 166385 | 協助資轉問題 — App.CARawDataToDBTool 下載錯誤格式資料，ST.36 → ST.96，移除重新下載重轉 | Done |
| 166386 | sep diff tool 規格 | Done |
| 166387 | patent embedding tool 規格 | Done |
| 166388 | patent embedding tool 修正 | Done |
| 166408 | [WEBPAT] embedding research — TAC + AN + IN embedding TAC，AN + IN 分別 embedding，一專利兩向量，撰寫測試方法 | Done |
| 166467 | embedding research 討論 — 需以專利權人/申請人/發明人搜尋，故進行 embedding 研究；台灣全部、美中近10年新增界面從 IPTECH 連過去；新增魚骨分類 UI，設計請美術及 QC；點數計費設計 | Done |
| 166548 | [WEBPAT] Patent embedding search 魚骨 — UI 設計，API 撰寫 | Done |
| 166550 | 協助資轉問題 — JPA123、124 資轉問題，壓縮檔有問題，移除已轉資料重轉 | Done |
| 166722 | [WEBPAT] embedding research — TAC / applicants / assignees / inventors | Done |
| 166870 | [WEBPAT] embedding research 討論 + 文件 | Done |
| 166871 | [WEBPAT] patent embedding search 查詢多向量 | Done |
| 166885 | 協助處理資轉問題 — run.ps1 裡面傳訊息到 mattermost 格式少加一個雙引號，修正後重新執行；協助移除重複資轉資料 | Done |
| 166900 | Patent embedding research | Done |
| 167031 | Patent embedding 討論 | Done |
| 167032 | Patent embedding 文件撰寫 | Done |
| 167055 | Patent embedding UI 修改 | Done |
| 167247 | [IPTECH] 首頁新增 patent embedding search 入口 | Done |
| 167269 | patent embedding 資料搬到 server 上面 | Done |
| 167345 | Patent embedding search 站台 | Done |
| 167386 | Patent embedding search 接 webpat 檢索結果 | Done |
| 167387 | Patent embedding search | Done |
| 167506 | [WEBPAT] Patent embedding search 新增 health check and CI/CD | Done |
| 167641 | [WEBPAT] Patent embedding search UI 按鈕優化 | Done |
| 167642 | [WEBPAT] Patent embedding search 新增按鈕儲存功能 | Done |
| 167690 | SEP 資轉規格 | Done |
| 167693 | [WEBPAT] Patent embedding search 點數機制 | Done |
| 167785 | [WEBPAT] Patent embedding search 討論 | Done |
| 167852 | [WEBPAT] 修正 patent embedding search ui | Done |
| 167955 | [WEBPAT] patent embedding search embedding api 修正 | Done |
| 168095 | 優化 patent embedding search 儲存專案功能 | Done |
| 168096 | patent embedding search 新增相似專利推薦 | Done |
| 168097 | 優化 UI | Done |
| 168111 | Patent embedding search dify 更新正式站台 | Done |
| 168196 | 討論問題，更新文件 | Done |
| 168360 | 週會 | Done |
| 168402 | [WEBPAT] Patent embedding search loading 動畫 — 魚骨節點動畫修正，相似專利出現動畫 | Done |
| 168403 | [WEBPAT] Patent embedding search 儲存專案 dialog 畫面修正 — 將非必填欄位收進"進階" Dialog，新增 resize 功能 | Done |
| 168404 | [WEBPAT] Patent embedding search 登入機制 — 無登入不能使用，串接 IPTECH 及 WEBPAT | Done |
| 168405 | [WEBPAT] 點數機制更新站台 — WEBPAT / IPTECH / PatentPilot-service / Patent embedding search / Dify | Done |
| 168407 | [WEBPAT] Patent embedding search UI 右上角顯示使用者名稱 | Done |
| 168546 | [WEBPAT] Patent embedding search 魚骨 loading 修改 | Done |
| 168630 | [WEBPAT] 串接 patent embedding search api 問題排查 | Done |
| 168944 | patent-service api 修改與串接 dify api — 目標：embedding search 回傳筆數原本固定吃環境變數 DIFY_EMBEDDING_SEARCH_TOP_K，呼叫端無法針對單次查詢調整。同時發現台灣公開案查詢 api/tw/published/:pn 取到的是核准公告資料，索引指向錯誤，一併修正並發版到 v1.0.36。 | Done |
| 168971 | patent-service 更新 swagger 以及 km 文件 — 目標：補齊各 API 與各欄位說明，修正自動產生文件與實際行為不一致之地方 | Done |

---

## 二、快檢通

| ID | 標題 | 狀態 |
|----|------|------|
| 167784 | [WEBPAT] 新增快檢通 | Done |
| 167866 | 快檢通討論 | Done |
| 167895 | [WEBPAT] 修正快檢通 UI | Done |
| 168164 | 快檢通點數機制更新 | Done |
| 168361 | 快檢通點數機制修正 | Done |
| 168642 | [IPTECH]「快檢通」點數設定，一次10點 | Done |

---

## 三、CN 即期外國專利資料

| ID | 標題 | 狀態 | 備註 |
|----|------|------|------|
| 168364 | CN 即期外國專利資料 | Done | 發明公開 / 發明授權 — 分析專利資料結構及撰寫轉置程式設計 |
| 168505 | CN 即期外國專利資料 發明授權 | Done | 分析專利資料結構及撰寫轉置程式設計 |
| 168593 | CN 即期外國專利資料 新型 | Done | 分析專利資料結構及撰寫轉置程式設計 |
| 168643 | CN 即期外國專利資料 設計 | Done | 分析專利結構與程式撰寫 |

---

## 四、EPA/EPB 即期資料

| ID | 標題 | 狀態 | 備註 |
|----|------|------|------|
| 168878 | epa 即期資料規格及實做 | Done | 目標：EPO EPAB 卷期全文 XML 的 A 案（公開案）原本沒有匯入管線，資料無法進入 OpenSearch 檢索。本次新增 epa 四階段完整鏈路（File→RAW→L1→L3→OS），以卷期（VOL，7 碼）為觸發參數。實際完成：新增 raw-epa-biblio-trigger-vol、l1-epa-biblio-trigger-vol、l3-epa-search-trigger-vol、os-epa-search，抽出共用 transform 兩支，新增 opensearch mapping 與三張表 SQL，新增 43 個 transform 單元測試與四份規格文件，ep-biblio-common.transform 與 ep-search-common.transform |
| 168980 | epb 即期資料規格及實做 | Done | 目標：B 案（kindcode B1/B2/B3/B8/B9）完全沒有入庫入索引路徑。本次補上 epb 的 File→RAW→L1→L3→OpenSearch 四段完整鏈。實際完成：新增 raw-epb-biblio-trigger-vol、l1-epb-biblio-trigger-vol、l3-epb-search-trigger-vol、os-epb-search，pat_epb mapping，Citus 分散表 schema 三張，更新共用 transform 註解，補上 specs 文件與測試，EPAB2026024 全卷 1,576 筆已跑完四段全鏈 |

---

## 五、SEP 差速工具

| ID | 標題 | 狀態 | 備註 |
|----|------|------|------|
| 166174 | SEP 資料比對 | Done | |
| 166186 | SEP 比對規格 | Done | |
| 166273 | sep 討論 | Done | |
| 166386 | sep diff tool 規格 | Done | |
| 168652 | 討論 SEP 轉置 | Done | |
| 168972 | SEP 資轉工具 — 目標：原本需跑完整 compare 流程建 160MB hash 快照，對只想拿號碼清單的下游來說成本過高。新增了 publunique 子指令，直接從兩份 CSV/zip 抽 PUBL_NUMBER 欄去重，省掉 snapshot 與 merge scan。比較單位定為「號碼」而非「整格字串」，以 \| 拆 token 後進集合，天生不管順序 | Done | sep-diff-tool 相關 commit 0ec194e |

---

## 六、資料轉置

| ID | 標題 | 狀態 | 備註 |
|----|------|------|------|
| 166094 | 協助處理問題 | Done | |
| 166302 | 協助處理問題 | Done | |
| 166385 | 協助資轉問題 — App.CARawDataToDBTool 錯誤格式，ST.36 → ST.96 | Done | |
| 166550 | 協助資轉問題 — JPA123、124 壓縮檔問題 | Done | |
| 166699 | 協助處理資轉問題 — run.ps1 mattermost 格式錯誤 | Done | |
| 166998 | KR 資料轉置 | Done | |
| 167033 | 協助處理資轉問題 | Done | |
| 167116 | 協助處理資轉 | Done | |
| 167639 | kp 發明 資料轉置 | Done | |
| 167908 | kp 新型 資料轉置 | Done | |
| 167909 | kd design 資料轉置 | Done | |
| 168097 | 優化 UI | Done | |
| 168178 | code review and citus understand | Done | |
| 168630 | 串接 patent embedding search api 問題排查 | Done | |

---

## 七、TIPOMusic

| ID | 標題 | 狀態 |
|----|------|------|
| 166723 | [TipoMusic]【音樂/錄音著作查詢】錄音著作新增「製作公司」、「發行公司」欄位及補充提示文字 | Done |
| 166869 | [TIPOMUSIC] 排查正式站台速度慢問題 | Done |
| 167803 | [TipoMusic] 正式機更新 | Done |
| 167839 | [TipoMusic] 清單比對規格更新 | Done |

---

## 八、WEBPAT / IPTECH 其他

| ID | 標題 | 狀態 | 備註 |
|----|------|------|------|
| 164476 | [WEBPAT] 號碼檢索查無檢索結果比對 | Removed / To Do | |
| 165270 | [WEBPAT] 專利雷達顯示問題 | Removed | |
| 165271 | [IPTECH] 魚骨節點優化 | To Do | |
| 166330 | [評估][WEBPAT]元件符號辨識功能多數專利沒有呈現 | To Do | |
| 166332 | [IPTECH]【分類頁】專案中已有核准專利，若查詢公開號也要查到核准專利 | To Do | |
| 166333 | [WEBPAT] 特定專利雷達顯示問題 | To Do | |
| 166334 | [WEBPAT] 號碼檢索查無檢索結果比對 | To Do | |
| 167338 | [WEBPAT] 匯出信件下載網址問題處理 | Done | |
| 167952 | [IPTECH] 更新站台 | Done | |
| 167953 | [WEBPAT] 更新站台 | Done | |

---

## 九、會議

| 日期 | 類型 |
|------|------|
| 07/06 | 晨會 |
| 07/07 | 晨會、AI Demo 會議 |
| 07/08 | 晨會、月會 |
| 07/10 | 事假 |
| 07/13 | 晨會 |
| 07/14 | 晨會 |
| 07/15 | 晨會、AI 會議 |
| 07/16 | 晨會 |
| 07/17 | 週會、晨會 |
| 07/20 | 晨會 |
| 07/21 | 晨會 |
| 07/22 | 晨會 |
| 07/23 | 晨會 |
| 07/24 | 09:00~10:30 事假 |
| 07/27 | 晨會 |
| 07/28 | 晨會 |
| 07/30 | 病假、晨會 |

> 颱風假、事假、病假共 3 天

---

## 十、假期記錄

| 日期 | 類型 |
|------|------|
| 07/10 | 事假 [2026/07/08] 16:00~ |
| 07/13 | 颱風假 |
| 07/24 | 事假 [2026/07/24] 09:00~10:30 |
| 07/30 | 病假 [2026/07/30] |

---

## 關鍵成果摘要

1. **Patent Embedding Search 上線** — 從 researching → UI → dify 串接 → 登入/點數 → 正式站台完整建置
2. **快檢通新功能** — 新增快檢通功能並完善點數機制（設定10點/次）
3. **CN 即期外國專利** — 完成發明公開/授權、新型、設計各類型轉置
4. **EPA/EPB 雙軌處理** — 新增完整資料管線（File→RAW→L1→L3→OS），EPAB2026024 全卷 3,000+ 筆順利跑通
5. **SEP diff tool 優化** — 新增 publunique 指令，不用建 hash 快照即可快速比較
6. **Patent Service Swagger 完善** — 補齊所有 API 文件說明、tag 分組、JWT 認證說明
7. **TIPOMusic** — 新增欄位、排查效能問題