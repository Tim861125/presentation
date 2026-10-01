# 2026-09 月工作內容

此專案為 slidev 的專案，將內容寫在 slides.md 裡面

# 注意

- 不要使用 icon, 只在必要時用打勾或叉叉讓版面清晰，不需要的話就不用
- 注意每一頁的高度不要超過螢幕高度
- 科技感（使用 slidev-theme-tech 或深色漸層）
- 完成後要確認畫面，確認沒有頁面下方被切掉
- 用繁體中文

# 以下為本月工作內容

## 域見通（IPC 快檢通）專利語意搜尋 POC

### 核心功能整合

- 完成 IPC 快檢通專利語意搜尋 POC 主要功能整合：Nuxt 純 client-side SPA，前端統一由 `app/lib/api-client.ts` 呼叫 API，請求／回應契約集中於 `shared/types.ts`
- 後端依邏輯索引判定資料集（台灣／美國公開／公告專利），透過 OpenSearch h01l 索引取得專利欄位與近鄰搜尋結果
- 串接 Dify workflow：結果重排序與魚骨圖分群節點命名；魚骨分群先重算 embedding，再以可重現的階層式 k-means（farthest-first 初始化、餘弦距離）建立分類樹，AI 標籤取不到時降級為標題型標籤
- 結果頁 lazy per-tab 載入：切換分頁才觸發分析並快取
- 完成 webpat SSO POST handoff，從檢索結果無縫跳轉專利作業流程

### Embedding 檢索串接與修正

- 透過 patentpilot-service 取得語意向量，對 OpenSearch h01l 索引執行 kNN；`_source` 同存 embedding 與顯示欄位，不需外部補查
- 國別與種類由共用索引登錄資料決定，不依索引名稱字串推論
- kNN 候選倍率高於請求筆數，降低 HNSW 近似搜尋遺漏；同國別公開＋公告以 apnRaw 合併去重；相似專利查詢以 `_id` 排除來源專利
- 整合修正：空輸入、找不到專利、向量為空、OpenSearch／Dify 上游失敗統一以 AppError 與規格錯誤碼回應
- Dify 串接修正：各功能獨立 API Key、runtimeConfig 集中讀取；補強 Dify 回傳 JSON 字串的解析與型別防禦
- 魚骨 head 命名修正、prompt 調整並更新測試／正式站台
- 簡體語系查詢結果頁顯示修正、Dify prompt 更新、魚骨 head label name 排查

### 多圖檢視與圖式瀏覽

- 完成結果列表「多圖」模式：收斂摘要保留專利號／名稱／相似度／圖面縮圖，高密度比對；偏好存 localStorage
- 圖面依 docId 延遲載入（接近可視區才請求）；TiffImage 處理 TIFF／JPEG／PNG，含快取、並行限制、骨架與重試
- 大圖檢視：寬螢幕併排、窄螢幕對話框，支援前後切換、縮放、旋轉、關閉；切換版面 FLIP 動畫
- 清單縮圖也可旋轉：角度依專利文件＋圖號記錄並存瀏覽器，縮圖與大圖共用 composable 狀態；全螢幕支援
- 結果工作區優化：固定殼層滾輪事件處理（游標在清單外也可捲動）、多專利圖式檢視面板整併、過場效果與響應式細節

### UI／UX 優化與修正

- 結果頁 UI 動畫修正：transition 觸發時機、持續時間與狀態清理，避免重複播放、殘留樣式、閃爍
- 前端介面修正：搜尋輸入、篩選、結果列表、卡片、分頁狀態銜接；沿用 shadcn-vue 與 Tailwind v4；狀態由 useSearch 集中管理
- 搜尋框收合／展開：依實際高度與捲動距離推算殼層位移，膠囊接手展開，CSS 自訂長度屬性平滑過渡，位移期間暫停背景模糊
- 專利號顯示改「國別碼＋專利號＋種類碼」；人名共用格式整理；首頁資料範圍統計依國家分列、公告／公開分開
- claim 數字重複顯示修正：偵測原文已有項次標號（半形／全形數字、句點括號）時隱藏清單自動編號
- 修正結果卡點擊死區（只在載入骨架與錯誤占位攔截事件）；PostHog 國家／種類維度改陣列傳送
- 日期篩選：新增年份月份下拉選單，依語系呈現、保留選取日、区间共用元件
- 工程模式改為點擊版本資訊多次啟用；統計資訊改依專利公開日計算；中英文案更新、窄螢幕可讀性
- 清單列表小圖跟著旋轉圖片（見圖式瀏覽）；程式碼整理：重複邏輯收斂至共用元件／composable／工具函式，清理過時元件與測試

### 站台建立與維運

- Rancher 建立域見通站台、正式站台建立與部署前置（建置產物、runtimeConfig、外部 API 與索引連線設定、健康檢查）
- 建立 CI/CD 設定並更新到測試及正式站台
- 搜尋索引設定切換為 OpenSearch alias（12 個邏輯索引指向 `pat_vec_{country}{kind}_h01l_512_all`），重灌索引可在 alias 層原子切換（v1.0.10）
- `logicalIndexOf` 支援 alias 實際索引名還原：新增 `aliasStem()`／`sameIndex()`，補 12 國 `_512`／`_512_ext`／`_512_all` 還原測試（v1.0.12）
- 導入 PostHog 行為分析：追蹤搜尋發起、檢視模式切換、詳情／圖面開啟、重排序／魚骨啟動與 handoff，不蒐集查詢全文與敏感資訊
- IPTECH／域見通 code coverage 盤點：Bun test，涵蓋 k-means 演算法確定性、API 契約邊界、 lazy 快取與錯誤顯示
- Demo 展示流程整理與驗證；規格與技術邊界討論；協助業務推廣錄影

## 資料轉置（data-importer / es-to-citus）

### 逐年轉置工具

- US job 依年份轉置：新增 `PD_YEARS` 環境變數（zod 驗證四位年清單），`resolveYearRuns` 由新到舊逐年執行，SKIP 只套第一年（續跑）；冪等 upsert 可單年重灌補洞
- ES input 新增 `pubDateYears` 過濾（pubDate range），套用到 getCount、search_after 分頁、SKIP 邊界與計數；無年份過濾時維持原 match_all 形狀；補 fake ES 可求值 bool／range 測試（commit 8a8179d）
- 各國 ES to Citus job 轉置也能按年份篩選
- 美國歷史 ES to Citus：ES→L1 轉一年（中國等各國）、2025／2030 index、2020 index 轉置與規格文件記錄
- embedding 工具新增 log：啟動、來源讀取、批次筆數、成功／失敗、重試與摘要，辨識停滯、輸入異常、向量為空、上游失敗

### DOCDB 世界各國拓展

- 與學長討論 docdb 拓展各國規格
- 完成 DOCDB 世界各國專利資料 schema 盤點與整合設計：專利號、申請案號、國別、文獻種類、日期、標題摘要等共同欄位規格；國別特有欄位採明確 mapping 與可追溯正規化
- 各國合併欄位修正：名稱、資料型態、優先來源與空值處理，避免合併覆蓋正確內容或遺失識別資訊
- 寫入 OpenSearch 的 mapping 修正：文字／日期／數值／識別碼欄位型別正確寫入；格式化專利號與申請案號支援關聯、查詢與去重
- 產生測試 fixture：涵蓋不同國別、公開／公告種類、正常缺漏與格式特殊情境
- 確認各國 OS mapping：移除無使用的 analyzer、修正欄位 type

### 即期與 L3 資料

- 即期轉 2~3 期：各國專利即期資料轉置（欄位正規化、識別碼格式化、國別與文獻種類判定、筆數與必填欄位檢查）
- l3 onto 系統號合併：整理世界各國 onto 資料系統號碼合併至即期 L3 job；後續修正
- 補即期資料一期至 OpenSearch；補上 WA／EUIPO OS index 測試資料
- 各國 ES 資料至 L3（進行中）
- 更新資料轉置 KM 紀錄（各國逐年筆數）；整理 ES to Citus 預估時間資料文件

## IPTECH

- 系統更新：IPTECH v8.0.159 正式站台上線
- 分類頁修正（多分類樹改版後）：新增自訂分類左側不即時顯示、重新整理跳出「節點名稱重複」警示
  - `addClassification` 改為 push 新 ClassificationSN 至 selectedClassificationSNs（多樹由 per-sn widget 渲染）並補寫 localStorage
  - `syncClassificationTrees` 完成後若為 active 分類補呼叫 `initPatentList`
  - `refreshUnAssignCount` 加 in-flight 鎖與刪除後殘留檢查，避免兩輪「刪除→重建」交錯誤判重複
  - `switchClassification` 去重補「該 SN 已在勾選清單」，防止重複渲染兩份 jstree（commit c6e5f010、6aeb94a9、9e3e5b77）
- 更新 IPTECH 測試站台並修復分類頁自訂分類顯示異常
- 頁面新增快檢通入口（魚骨、檢視、分類、管理面／技術面分析、專案頁）：共用導覽列加外部連結，token 以 URL fragment 傳遞；依帳號 patent-embedding-search 功能啟用與否顯示
- IPTECH code coverage 盤點：辨識資料處理、API 轉換、欄位 mapping、異常資料過濾等未受測試保護分支
- 更新 IPTECH WEBPAT AI 通 model 為 gpt-6-luna，調整 prompt 同步正式站台
- 協助確認下載 Excel 連結失效問題：排查為登入狀態問題，登入後正常

## TipoMusic

- 曲目語言分析集管團體欄位消失修正：統計程序只取 `UseListSong.SongSN`，部分資料該欄位為 NULL（實際編號在 `UseListSongDetail.SongSN`），導致 ACMA、TMCA 欄位消失、ARCO、MUST、RPAT 歌曲數低於明細、台語歌歸入其他；調整 `PRC_UseListSongLanguage` 主表 NULL 時改用明細表 SongSN
- 與主管／同事討論確認曲目語言分析應改用 UseListSongDetail 資料，確認實際 SQL
- 詞曲比對 MÜST 作詞權利人補值錯誤：歌曲有作詞人但作詞權利人空白時誤將 MÜST 加到作曲權利人；確認每日排程已套用補值修正並更新至正確版本
- 信箱收件者調整：移除離職人信箱、新增接手同仁信箱
- 小穎客服異常排查：與上級討論後暫時停用

## 快檢通（WEBPAT）

- 英文版：新增 i18n 英文翻譯
- 簡體語系：查詢結果頁簡體顯示修正
- 登入登出（待辦）
- 專利 embedding USB 問題排查：向量 id 對不上，來源 index 有誤，修正並重新轉置

## 其他

- PQAI：與上級討論參照 PQAI 新增頁面、新增站台、新增領域向量資料庫、新增多圖、先 filter 再 KNN 搜尋；確認所需欄位並撰寫規格
- IPC 快檢通規格與修正規格：與主管討論
- crm better auth 文件（待辦）
- 每週晨會／週會進度同步
