# 2026-10 月工作內容

此專案為 slidev 的專案，將內容寫在 slides.md 裡面

# 注意

- 不要使用 icon，只在必要時用打勾或叉叉讓版面清晰
- 注意每一頁的高度不要超過螢幕高度
- 科技感（使用 slidev-theme-tech）
- 完成後要確認畫面，確認沒有頁面下方被切掉
- 用繁體中文，技術名詞保留原文

## 簡報編排重點

- TIS 與域見通為同一產品，僅第二頁寫「TIS（域見通）」，後續一律使用 TIS。
- 保留現有深色科技風格與 Vue 元件結構。
- 主要篇幅說明 TIS：英文版與領域擴充、搜尋條件與分享、圖式與無障礙操作、搜尋品質與監控、版本交付。
- Embedding job 濃縮為一頁，舊資料轉置併入摘要；以下完整工作內容保留供查考，不逐項搬入投影片。
- 快檢通與 TipoMusic 等其他工作維持一頁簡述。

# 以下為本月工作內容

## 一、TIS／域見通：產品能力與英文版上線

### 英文工作區與跨領域搜尋

- 以 Terrain 風格重整 PI-VuePat，工作區固定 `en-US`，移除語系切換與多層初始語言判定，統一頁首、首頁、設定面板、title、favicon 與 footer 品牌呈現。
- 完成 G06（Information & Communication Technology）完整流程串接：API、runtime config、OpenSearch index、前端領域切換、詳情與魚骨分類均攜帶 `domain`；保留 H01L 相容預設與非法值驗證。
- 開放美國、中國、台灣的全領域搜尋，新增 `all` domain、來源範圍切換與依領域分桶的資料覆蓋統計；中國全領域顯示 `CN (2016~)`。
- 新增搜尋歷史與 URL 分享：以模式、查詢與領域產生 16 碼 `searchId`，保存 90 天，支援重新整理、瀏覽器前後頁及指定專利還原。
- 新增專利號搜尋與 Find similar：支援公開號／公告號、跨國來源候選、來源向量 kNN、詳情還原與錯誤狀態；claims 重嵌方案經實驗後退回到儲存向量。

### 圖式、互動與無障礙操作

- 以 `nuxt-tiff-provider` 與 Service Worker 統一 TIFF 轉 WebP，處理 Safari 差異、子路徑 scope、載入快取與失敗重試；圖式改用共用 `DrawingLightbox`，支援縮放、旋轉、拖曳、觸控、鍵盤與循環翻頁。
- 修正圖式載入空白、重複下載與放大閃爍；加入 skeleton、失敗訊息、單張／多張 retry，縮圖改為視窗附近才載入。
- 結果頁加入桌面自動開啟第一篇、固定詳情 footer、捲動後的專利號與標題摘要、搜尋中 aria-live 回饋、24px hit target、鍵盤快捷鍵與跳到主要內容。
- 統一 focus-visible、標題階層、國別與種類 chip 勾選、領域卡片選取效果及主題切換；整理字級 token、IPC 分類號、國碼、人名、權利人與卡片資訊呈現。
- PostHog 補齊搜尋來源 facet、領域／模式／Find similar／圖式操作／重試事件，並避免自動換場與高頻手勢產生錯誤紀錄。

### 搜尋品質、限制與可觀測性

- 新增可選 rerank：文字搜尋先取 raw 400 筆、合併至 200 筆後送自架 reranker；失敗靜默退回 kNN，Find similar 不套用。
- 搜尋文字上限統一為 5,000 字，日期篩選支援完整日期、年份展開、半開放區間與非法／反序阻擋；優先權缺值時才以申請日補判。
- 統一結果分數語意：Find similar 顯示 `Nearness`，來源專利標示 `This patent`；移除不符合格式的複製引文按鈕。
- 接上 OpenObserve RUM、OTLP trace／log、API request log 與 dev dashboard，並將 TIS v1.0.32～v1.0.34 更新至測試站，v1.0.34-release 更新正式站。

## 二、data-importer：Embedding pipeline 收斂與大批量轉置

### 多來源向量流程

- 將 TW、US、JP、KR、EP、WO、CN、DOCDB 等來源收斂至 `os-patent-embedding` 共用入口，透過 SOURCE 與 Trigger 設定保留各來源的文字結構、文件身分與日期條件。
- 完成 JP 四案別（JPA／JPB／JPD／JPU）、US、CN、EP、KR、WA 與 DOCDB 的來源串接；日本保留含 `jpcode` 的四段身分，DOCDB 保留國別鍵與 delivery week。
- 依 ADR-0013 移除補充專利向量的 L2 中間表，直接從全文呼叫 embedding service、正規化後寫入 OpenSearch；全空文字略過，不刪除既有向量。
- 明確支援 vLLM／Ollama 協定，固定 provider、請求與回應格式、向量順序驗證與全域並行上限；連線／逾時／指定暫時性 HTTP 錯誤最多重試五次，資料錯誤立即失敗。

### 索引、觀測與效能

- 統一向量 index 命名為 `pat_vector_{source}_{year}_v{version}`，onto index 依公告年份分流；native／onto 的環境變數責任分明，不自動建立 index。
- CA onto 改用來源原值組合 `_id`，TAC 按欄位取第一個可用值；多端點 round-robin、固定端點重試、全域 concurrency 上限與安全續跑提示已完成。
- embedding job 新增來源預取佇列，深度為 `concurrency × 2`，讓 PostgreSQL 讀取與 embedding API 重疊；補上中斷、錯誤、亂序、尾批與吞吐測試。
- 補齊 I/O 計時、批次彙總、indexed／failed 統計、安全錯誤訊息、TAC hash 基準、22 個來源的 fixture 證據與索引 mapping；明確區分離線證據與尚未完成的全量驗收。
- 完成 embedding 相關分支合併 main，並持續執行 CA onto 約 2,204 萬筆資料的轉置與穩定化。

## 三、es-to-citus：舊資料轉置可靠性

- EP、KR、JP、WA 支援 `PD_YEARS` 逐年處理；每年獨立 runner、query date range、log 與續跑 offset，避免只依 index 名推測公告年份。
- EP／KR 來源設定收斂為單一 `SOURCE_INDEX`，案別由 index 名推導；JP 移除容易不一致的 `SOURCE`，並限制 `TARGET_TABLE_NAME` 只能寫入對應案別表。
- 新增六國 usage runbook，統一 ES→L1→L2→L3→OS 操作步驟與環境變數說明。
- 修正各國 `pn`／`apn` raw 與 formatted 欄位規則，依 data-importer formatter 對齊 JP、KR、EP、WO、CN；非法資料單筆隔離，不寫入錯誤 key。

## 四、快檢通與 patent-embedding-search

- 修正點數不足錯誤契約：辨識 patentpilot-service 的 403／`Insufficient points`，回傳 `INSUFFICIENT_POINTS`，前端顯示不可由 Escape 或背景關閉的補點提示，並停止後續檢索。
- 完成 claims 編號清洗，避免 `ol` 自動編號造成「1. 1.」；補上 16 個邊界案例。
- 快檢通 v1.0.29 上線，包含點數不足提示、rerank 殘留清理、未使用 API 與死程式碼移除；型別檢查與 production build 通過，253 個測試通過。

## 五、TipoMusic 與跨團隊支援

- 修正 MÜST 歌曲作詞權利人誤記作曲欄，更新 database PRC。
- 修正 ARCO／RPAT 曲目語言分析重複計數：每筆播放選定單一代表 SongSN，同時維持歌曲明細計數粒度。
- 教育訓練影片改用 YouTube embed；正式站修正利用人看不到管理者代匯入使用清單的權限條件，並同步正式機資料庫修正。
- 透過晨會、週會、規格確認與問題釐清，持續協調 TIS、data-importer、IPTECH、WEBPAT 與 AI model 工作；建立 `itsaplan` skills 與唯讀 `itsaplan-week` Mod，改善工作項目登記與負荷觀察。
- 月底盤點 Y26\\M10 的 81 張空白 Description，依實際 commit 證據補登 64 張，另 17 張保留跳過原因，避免無證據臆測。

## 六、本月成果摘要

- 產品面：TIS 從英文版、G06、全領域一路推進到可觀測、可分享、無障礙操作與搜尋品質強化。
- 平台面：Embedding 從各國分散 job 收斂為可設定共用 pipeline，並具備 retry、prefetch、續跑與觀測能力。
- 資料面：舊資料轉置規格、formatter、runbook 與分年處理方式收斂，降低跨來源誤寫與續跑風險。
- 品質面：新增大量單測、整合測試、煙霧測試與離線基準；文件同步標註尚未由測試證據支持的範圍。
- 交付面：TIS v1.0.34 更新正式站，快檢通 v1.0.29 發布，TipoMusic 多項修正完成測試／正式機部署。
