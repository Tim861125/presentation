# 2026-08 月工作內容

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

| 項目 | 數量 |
|------|------|
| 工作項目 | ~129 筆（2026/08/03 ~ 09/03） |
| 會議（晨會 / 週會 / 月會 / 討論） | 22 場 |
| 事假 | 4 次 |

本月四大主線：

1. **Patent Embedding Search**：多國家註冊表、全面改接 UPat、API 命名改造
2. **CN 向量轉置**：5,230 萬筆中國專利進入純向量索引 + 效能壓測
3. **各國即期資轉管線**：依 ADR 0008/0009/0010 重整 14 國案別（待更新清單 + 目標檔案路徑線索）
4. **es-to-citus**：legacy ES 回填 Citus，六國 + WOA 全數上線

---

## 一、Patent Embedding Search（patent-embedding-search）

### 1-1 多國家檢索範圍註冊表（169359）

- 問題：by-text 檢索的同案合併寫死 `twa`/`twb`——全域 `apnRaw` 分組、代表偏好寫死 `sourceIndex === "twb"`，加入其他國家後不同國家的 apnRaw 字面相同會被誤併成一筆
- 作法：`shared/types.ts` 新增 `INDEXES` 註冊表，每筆宣告 `id / country / kind / label`
  - 合併鍵由 `apnRaw` 改為 **country + apnRaw**，解掉跨國申請號撞號誤併
  - 代表偏好由 `sourceIndex === "twb"` 改為 **kind === "b"**（公告優先）
  - 新增 `needsMerge()`：任一國家同時含公開(a)+公告(b)才合併，合併僅限國家內、不跨國併同族
  - `ServerConfig` 的 `indexTwb`/`indexTwa` 改為 `indexBase: Record<IndexName, string>`；`parseIndices` 改查註冊表
- 前端：新增 `app/lib/index-label.ts`，標籤由註冊表提供；工程模式資料來源改為「國家可多選 × 種類」
- 中國完整實作但因資料未就緒暫以註解停用五處，誤用 `"cnb"` 會編譯期報錯
- 驗證：`bun test` 121 pass / 0 fail（新增 12 測試）；新增一國的成本 = 註冊表加兩筆 + config 加兩個 key，檢索/驗證/UI 邏輯零改動

### 1-2 全面改接 UPat（純向量索引時代）

新一代純向量索引 `pat_vec_*` 為 `dynamic: strict`、只有 embedding 一個欄位，kNN 只能拿回 `_index/_id/_score`，所有依賴 `_source` 的路徑都要改道 UPat：

- **新增 `/api/search/by-text-upat`（169665）**：text → 查詢向量 → kNN（`_source: false`）→ UPat `patent_search` 以 `ID:(…)` 批次補內容 → 同案合併
  - UPat client：一批上限 200 筆（實測 200 筆 182ms），`upatDatabase` 由 `INDEXES[].upatDatabase` 決定，一次請求可跨國
  - kNN 的 k 一律取 size 兩倍（HNSW 近似搜尋，k 貼近 size 會漏掉真正最近鄰），三個 body builder 全套用
- **魚骨圖與 rerank 改走 UPat（169655）**：向量補撈由 `terms: { docId }` 改為 `ids` 查 `_id`（舊寫法在純向量索引固定回 0 筆，魚骨圖直接爆 `EMBEDDING_EMPTY`）；`fetchDocTac` 與 `hydrateTac` 改由 UPat 取 abstract/claims 與名稱欄位
- **詳情頁與相似專利 docId 修正（169732）**：`GetPatentDetail` 與 `GetPatentByPatentNo` 增加選填 `docId`，前端一律送 docId（`usePatentDetail` 新增 `DetailRef` 保存 pnRaw → { docId, sourceIndex }）
- **IPTECH 專案儲存修正 + 發版 v1.0.20（170316）**：改用 UPat 直連 Elasticsearch，調整搜尋、詳情、重排與分群資料取得流程

### 1-3 API 架構與命名改造

- **兩段式路由（169733）**：所有路由改為 `server/api/{Group}/{ActionName}.{method}.ts`，取消路徑參數（`patents/[patentNo]` → `Patent/GetPatentDetail?patentNo=`），對齊 IPTech PM API 風格；同步 allowlist（exact pathname 比對，大小寫錯就默默要求登入）
- **動詞前置收斂（169734）**：11 支端點統一為 Add／Delete／Set／Get 四個動詞——`GetPatentByText`／`GetPatentByTextUpat`／`GetPatentByHybrid`／`GetPatentRerank`／`GetPatentClassify`／`AddPatentsToProject`…，讀路徑就知道是讀還是寫
- **移除死路（169735）**：查詢嵌入已定案一律經 patentpilot-service，移除工程模式「直連 vLLM」的 `embedSource` 分支與開關 UI
- **k → size 語意分離（169737）**：請求/設定的 `k` 全改為 `size`（專指回傳筆數），kNN 的 k 只留候選數含意；health check 移除已非必要的 rerank 與 hybrid pipeline 檢查
- **新增 `NUXT_MERGE_OVERFETCH`（169736）**：同案合併過撈倍數由寫死常數改為環境可調

### 1-4 前端換場動畫重寫（169383）

右欄專利詳情「切換另一篇」的讀取不順問題，`PatentDetailPane.vue` 重寫為單一快照交棒：

- 標題列說謊問題：pnRaw 立刻換新號但標題仍是舊篇，有 200~500ms 顯示錯誤資訊 → 號碼、標題、內容綁成一份 `shown` 快照，新資料到位才整份換掉
- 只做 opacity 交叉（離場 0.16s / 入場 0.26s），拿掉整塊 translateY；卡片高度以 Web Animations API 補間（260ms）
- 淡化延遲 0.35s 才開始：快的請求全程無淡化，慢了才輕輕壓暗
- `prefers-reduced-motion: reduce` 全部退回瞬切；換篇時右欄捲回頂端

---

## 二、Patent Embedding POC（patent-embedding-poc）

### 2-1 中國專利 TAC 向量轉置（169430）

- 挑戰：中國公開（A）與授權（B/U/S）共用同一來源索引 `pat_cnab_YYYY_v10`，無法像台灣靠 SOURCE_INDEX 區分，需在來源端分流
- 新增 `tac-cn` 變體：核心新增 `SOURCE_FILTER`（config 解析 JSON 查詢片段，非法 JSON 直接報錯不安靜跑全量）；進入點依 `DEST_INDEX` 推導 corpus（cna→published、cnb→issued），推不出直接擋掉
- 修正 `patentDisplayId()`：只在 pnRaw 缺國碼時補 TW，不再把 CN223793849U 加成 TWCN… 假號碼
- 量級：近五年約 **52.3M 筆**（cna 18.4M + cnb 33.9M），為台灣的十幾倍，靠分桶 + checkpoint 續跑分批完成
- 已知限制：來源同一件專利存兩筆（約 64% 近重複），第一版不去重，kNN 可能回傳同案兩個版本

### 2-2 目的索引瘦身：僅存 _id + embedding（169574）

- 新增 `vectorOnlyLayout`：CN 目的索引每筆只保留 `_id` 與 embedding，書目資料由 UPat 以 `_id` 回查；含單元測試，pipeline 與 runCli 零改動
- mapping `dynamic: "strict"`：夾帶非 embedding 欄位的文件逐筆回 400，計入 failed 不中斷整批（已實測）
- 結構變更需 `--recreate` 重建索引重跑 backfill

### 2-3 Backfill 執行紀錄與效能壓測

- **執行紀錄（170666）**：每次回填在 `.backfill-reports` 產生 Markdown 報告——執行設定、來源/目的索引、統計、每 10 萬筆進度、完成/失敗/訊號中斷終態
- **分段效能觀測（171004）**：量測來源 ES 讀取、TAC 清理組字、目的端 mget、批次規劃、embedding 平行牆鐘、bulk 寫入等各階段耗時與端到端占比，輸出 embedding/token 吞吐量（211 行新增）
- **reindex 與驗證（169576、169666）**：測試及 reindex 上線
- **CN embedding 排查（173032）**：超出 embedding model 輸入長度的問題排查

---

## 三、快檢通（WEBPAT / IPTECH）

- **新增美國專利檢索範圍（169409）**：後端 `QuickSearchController` 以 `CountryIndices` 對照表把國家碼展開為上游 index，`countries` 參數驗證未支援國家回 400、未帶預設 TW；前端 TW/US checkbox，勾選結果同步 `countryFilter` 避免結果頁範圍不一致（webpat-core 2ff9c7eb）
- **語意相似度排序（170054）**：QuickSearchController 回傳 OpenSearch KNN scores，前端串接語意相似度排序（sort-selector / pager / search-result），預設國家改 TW，改走 `GetPatentByTextUpat` endpoint
- **登入與權限（173256 / 173258 / 173269 / 173333 / 173335）**：WEBPAT 呼叫快檢通 API 修正、登入流程修正與討論、新增 better-auth、問題排查

---

## 四、WEBPAT / IPTECH 維護

- **PatentListForHierarchy 非同步初始化修正（171505）**：KO ViewModel handlers 與速讀通設定 observable 改於 await 前同步建立，避免初始化期間既有清單操作不可用；API 失敗維持速讀通關閉 → v8.0.159
- **查詢歷程新增/刪除修正（172573）**：`SaveHistory`/`DeleteHistory` 由批次 `SNs.Contains` 改為逐筆查找操作；controller 例外日誌由 `e.Message` 改為記錄完整 e（保留 stack trace）→ v8.0.218
- **協助處理**：IPTECH 匯出檔案為空排查（確認 server 端檔案即空，請中鋼重新匯出）（170317）、webpatX ai 通 patentpilot 串接協助（170607）、帳號權限協助（172596）

---

## 五、data-importer（690）各國即期資轉

依 ADR 0008/0009/0010 建立統一模式：**L2 待更新清單（身分三元組：格式化專利號 + 格式化申請號 + Kind Code）驅動 L3 重建**，RAW 階段保留**目標檔案路徑線索**（volumeDir / publicationDir / caseDir / sourceBuckets）可反推 RAW 原始 XML 位置，不再以卷期重掃全部 L1。

### 5-1 各國案別更新鏈完成清單

| 國家 | 案別 | ID | 重點 |
|------|------|----|------|
| EP | EPA | 170336 | 待更新清單 + drawings / search-report / ep-reference 完整來源 XML；修德文 description parser bug |
| EP | EPB | 170924 | 同模式；OS job 改為頂層 await entrypoint |
| CN | CB（發明授權） | 170337 | CBB → CB 全鏈改名；pat_cb mapping |
| CN | CU（新型） | 170921 | 依公告日 L2 清單 + keyset cursor；預估 4h 實際 2h |
| CN | CD（外觀設計） | 170922 | 書目來源節點具名完整覆蓋 |
| KR | KD / KP / KU | 170612 | 6 job 即期修正，L3 由 L2 清單驅動；工時評估 12h |
| KR | KDA / KDB mapping | 170616 | strict mapping 補宣告 sourceDir / designSeq |
| WO | WA 全文 | 172575 / 172576 | LexisNexis XML 欄位修正；依 ADR 重整待更新清單 + mapping triggerTag |
| JP | JPA / JPB / JPU / JPD | 171228 / 171232 / 171370 / 171372 | sourceBuckets 線索全程保留；路徑推導可重現（十碼補零 bucket） |
| JP | 路徑重構 | 171371 | 抽為共用 `jp-source-path-clues` processor，路徑可反推但不進搜尋文件 |
| CA | CA | 170656 | 三鍵 cursor + AFUL 真實 fixture；25 檔 / ~1,559 行 |

- code review：KR / EP / CN / JP 與 patent embedding search server api（170046、170047、170049）；理解 data-importer 多項文件（170042）

### 5-2 TW embedding 與 L2 name jobs

- **TW L2 embedding jobs（170634）**：TWA/TWB 共用 embedding Input Function，依格式化專利號處理 L1 書目並呼叫 embedding API；六支 L3 job embedding 欄位銜接；工時評估 12h
- **L2 name jobs（申請人/發明人攤平）**：TW（171512，Citus 分散表以 formatted_pn 為分佈鍵）、JP（171662）、CN（171663）、KR（171665）；共用 PostgreSQL 輸出抽至 `factories/output/postgres.ts`（171666）
- **twa 即期 embedding 問題排查（170919）**

---

## 六、es-to-citus：legacy ES 回填 Citus

### 6-1 前置分析（ES mapping 溯源）

- `pat_us_app_2005~2030_v11`：交集 136 欄、並集 141 欄，5 個差異欄（examinationData / isSep / query / size / version）（171714）
- `pat_us_grant_2005~2030_v11`：交集 136、並集 138，僅 2 個差異欄（171843）
- **29 欄溯源**：ES mapping 比現行 L1 `json_raw`（ICE POJO 111 鍵）多的欄位逐一溯源分類——A 類 RAW XML 原始值（10 欄，丟掉即永久缺失）、B 類舊 ES 合併 job 快照（currentCpcs*、currentAssigneesRaw 等）、C/D 類外部 join（familyId、examinationData）；確認 `currentAssigneesVol` = repo `currentVol` 為同一欄位（171844、171845）
- 產出回填欄位策略三選一（normalize / 全留 / 選擇性保留），與資深工程師及主管確認各國 schema 差異規格（173028、173036、173084、173042）

### 6-2 回填 job 六國上線

- **共用框架**：`createElasticsearchScrollRunnerInput`（ES 7.x Scroll API 全量讀取、Basic Auth、_doc 排序、SKIP 續跑、清除 scroll context）（171853，16h / 19 檔 6,147 行）
- 各國 job：US（172147）、CN CA/CB/CD/CU（172143）、EP EPA/EPB（172145）、KR 六案別（172146）、JP 四案別（172510）、WOA 全文 → `l1_wa_fulltext`（172680，WO 號碼規則驗證 + core `getErrorInfo` 同步六國）
- 全部以身分三元組 upsert，完整 `_source` 原樣保存至 `json_raw`
- **批次標記改寫（172746）**：L1 的 vol / period / trigger_tag 由 ES 公報期號改為 **SOURCE_INDEX（ES index 名）** 標記回填批次，消除與即期管線值的語義衝突；JP `priorityRaw.seq` 對齊 legacy 型別
- **觸發變數放寬（172748）**：data-importer 13+13 支 L2/OS job 的 VOL/PERIOD/TRIGGER_TAG 改為選用，省略時掃全表，支援全量回填場景
- **WA fulltext mapping（172749）**：多語 suffix 由 ISO 639-2 對齊為 ISO 639-1、對齊 pat_woa 語系集合、啟用 dynamic strict

### 6-3 驗證 Skills

- 新增 `check-es-to-l1-format` skill：ES 探測 → L1 建表/seed → job 執行 → 查核 SQL 的標準流程（172511）
- 與 `check-mapping` skill 邊界釐清：前者管 PG 結構欄位格式、後者管 json_raw 對 OS mapping（172747）；`create-job` skill 同步更新

---

## 七、sep-tool（SEP 差速工具）

- **ES 對照分析與實作（169454）**：實測 866 筆 diff 對完整快取取樣，PUBL_NUMBER → ES 覆蓋率 99.4%；發現「ES 的 pn 欄位已內建各國號碼變體」、TW 補零 8 位、WO 兩位年補世紀、KR 補 10 前綴等規則；placeholder 過濾採「含不含數字」結構性規則（20 種寫法、24,508 次）
- **職責收斂（169460）**：三層 ES 查詢 + 交叉驗證實測結論為不採用，移除 esClient/esResolve/resolve 共 673 行；工具改為產出「查什麼、去哪查、怎麼驗證」規格，輸出固定三檔

---

## 八、TipoMusic

- **央廣電台 6 月曲目語言分析未顯示 ACMA/TMCA（169657 / 171687 / 172285）**：盤點邏輯——播放次數依使用清單紀錄統計即可顯示；語言分析需先有對應標準歌曲，ACMA/TMCA 紀錄存在但歌曲數量為 0，依「歌曲數量為 0 不顯示欄位」規則隱藏，確認資料庫實際資料一致，非 bug
- **站點網址變更（170035 / 170268 / 170984）**：系統網址變更作業 → 更新 KM 文件 → 恢復原本網址並更新正式機
- **使用清單確認通知寄送失敗排查（172979 / 172980）**：
  - 測試機：部分 Owner 帳號收件地址網域不存在，SMTP RCPT 階段拒絕拋 `SmtpFailedRecipientsException`，整段共用 catch 導致已確認清單誤顯示「儲存失敗」→ 修正錯誤資料並驗證
  - 正式機：SMTP 主機名稱解析至錯誤 IP（DNS A Record 問題）→ 由 DNS 管理者修正後排除
  - 後續建議：資料寫入與通知/寄信分階段處理、NLog 記錄完整例外與 stack trace

---

## 九、技術分享與研究

- **BM25 vs TF-IDF（170980 週會）**：詞頻飽和（防關鍵字堆疊）與長度正規化（防長文佔便宜）
- **Hybrid Search 技術深潛規格（171846 週會）**：BM25 公式（k1/b 參數）、phase_results_processor、正規化處理器完整規格
- **Caddy 入門（172743 週會）**：Reverse proxy、Automatic HTTPS、多服務代理
- **Citus 研究（170691）**：create_distributed_table、分片鍵選 formatted_pn 達成共置（Colocation）、避免 cross-node JOIN
- **qwen3.8 本地模型 code review 試驗（171362）**：評估能否替代訂閱 AI 模型
- **DOCDB 各國拓展（173261 / 173337 / 173338）**：實做與原始資料、程式碼檢視、規格討論

---

## 十、維運與其他

- **50.92 機器排查（171364）**：機房重開機、發現漏水協助拖地
- **mount-init.sh（172574）**：log NFS 掛載區塊暫時停用（保留註解可還原）
- **資轉問題協助（173025 / 173265）**：進資料庫及 server 移除失敗檔案
- **task description skill 更新（173071）**：補充細節與字數，讓 AI 更易理解
- **patent embedding 討論（169564 / 170051）**、晨會/週會/月會進度同步 22 場
