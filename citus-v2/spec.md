# Citus `create_distributed_table` 實作詳細說明

> 這是本 deck 的 source of truth。
> 本 spec 涵蓋 `create_distributed_table` 的實作原理與應用，作為技術深潛簡報的基礎。
> 風格：延續既有技術 deck 的視覺語言（zinc-950 深底 + cyan/blue 點綴）。
> 貫穿範例：專利資料（l1_kda_biblio）。

---

## 參考來源

- Citus Distributed Table DDL：https://docs.citusdata.com/en/v13.0/develop/reference_ddl.html
- Citus Concepts（Distributed Table, Shard, Colocation）：https://docs.citusdata.com/en/stable/get_started/concepts.html
- Citus DDL Reference：https://citus-doc.readthedocs.io/en/latest/develop/reference_ddl.html

---

## 一、Citus 是什麼？

### 1.1 一句話定義

Citus 是 **PostgreSQL 的分散式擴充套件（extension）**，讓單機 PostgreSQL 具備水平擴充能力。

### 1.2 能力

| 能力 | 說明 |
|------|------|
| Horizontal Scaling | 從一台機器擴充到多台機器，線性提升處理能力 |
| Sharding | 資料依 Distribution Key 自動拆分到多台節點 |
| Distributed Query | 應用端不需知道資料分布，查詢語法與一般 PostgreSQL 相同 |

### 1.3 架構

```
一般 PostgreSQL（單一節點）

PostgreSQL Server
    Table1
    Table2
    Table3
    (所有資料在一台機器)

```

```
Citus（多節點）

         Coordinator
         (接見入口、查詢整合)
              |
      ┌───────┼───────┐
      |       |       |
  Worker1  Worker2  Worker3
  (資料分片) (資料分片) (資料分片)

```

- **Coordinator**：扮演 PostgreSQL 入口，接收客戶端連線，負責查詢最佳化與結果合併
- **Worker**：實際存放資料的 PostgreSQL 節點，執行真正的 INSERT / SELECT / UPDATE

---

## 二、Multi-tenant 多租戶模型

### 2.1 什麼是 Tenant？

> Tenant = 一位客戶、一家公司、一個組織。

SaaS 場景：

```
系統
├── Google    (租戶)
├── Microsoft (租戶)
├── Apple     (租戶)
└── Amazon    (租戶)
```

大家共用同一套系統，但資料彼此隔離。

### 2.2 傳統做法：每租戶一個 DB

```
Google DB ── 獨立的資料庫
Microsoft DB ── 獨立的資料庫
Apple DB ── 獨立的資料庫
```

缺點：
- 客戶增加時 DB 數量爆炸
- 管理、備份、升級成本高
- 無法有效利用硬體資源

### 2.3 Multi-tenant 做法：共用結構 + tenant_id

```
單一 DB

Table: Orders
┌─────────────┬──────────┬────────┐
│ tenant_id   │ order_id │ amount │
├─────────────┼──────────┼────────┤
│ Google      │ 100      │ 500    │
│ Apple       │ 200      │ 900    │
│ Microsoft   │ 300      │ 300    │
└─────────────┴──────────┴────────┘

查詢：
SELECT * FROM Orders WHERE tenant_id = 'Google';
```

優點：
- 單一結構，易管理
- 易擴充，只需加條件
- 節省 DB 資源

### 2.4 Citus 在 Multi-tenant 的角色

Citus 在 Multi-tenant 之上再加一層：
- 同一個 DB 可以跨多台機器（Worker）
- 不同租戶的資料可能分布在不同的 Worker
- Citus 自動路由查詢到正確節點

---

## 三、create_distributed_table — 核心 DDL

### 3.1 從普通 Table 到 Distributed Table

假設有一張專利基本資料表：

```sql
CREATE TABLE l1_kda_biblio (
    pn VARCHAR,
    formatted_pn VARCHAR NOT NULL,
    formatted_apn VARCHAR NOT NULL,
    kindcode VARCHAR NOT NULL,
    json_raw TEXT
);
```

這原本是一張標準的 PostgreSQL Table，所有資料存在一台機器。

執行以下指令後：

```sql
SELECT create_distributed_table(
    'l1_kda_biblio',
    'formatted_pn'
);
```

這張表變成 **Distributed Table（分散式表）**：
- 資料會開始依 `formatted_pn` 分佈到多個 Worker
- 查詢、插入等操作由 Coordinator 自動路由

### 3.2 兩個參數的詳細說明

| # | 參數 | 範例 | 說明 |
|---|------|------|------|
| ① | Table Name | `'l1_kda_biblio'` | 哪一張 PostgreSQL Table 要變成分散式 |
| ② | Distribution Column | `'formatted_pn'` | 用哪個欄位決定資料放哪台 Worker |

第二個參數也稱：
- **Distribution Key**
- **Sharding Key**

選擇標準：
- 應選最常作為查詢條件的欄位
- 最好具有較高基數（大量不同的值）
- 確保資料分布均勻

---

## 四、Hash 分片原理

### 4.1 核心機制

Citus 對 Distribution Column 的值取 Hash，決定資料位置：

```
輸入值          Hash 運算         目標 Worker
─────────────────────────────────────────────
US10000001    → hash()  →  42   → Worker2
US10000002    → hash()  →  7    → Worker1
US10000003    → hash()  →  91  → Worker3
US10000004    → hash()  →  7   → Worker1
```

### 4.2 Hash 的特性

- **相同值 → 相同 Worker**：同一篇專利的相關資料若用相同 Distribution Key，一定在同一個 Worker
- **均勻分布**：Hash 演算法確保資料大致平均分配到各 Worker
- **不需查詢所有 Worker**：知道 Distribution Key 的值，直接定位到單一 Worker

### 4.3 實際效果

```
Worker1：
  US10000002
  US10000004
  ...

Worker2：
  US10000001
  ...

Worker3：
  US10000003
  ...
```

---

## 五、Shard 的建立與分配

### 5.1 Citus 的分片策略

Citus **不是「一個 Worker 一份」**，而是：

```
create_distributed_table('l1_kda_biblio', 'formatted_pn')

↓

先建立多個 Shard（例如 32 個）

l1_kda_biblio 的資料被切分成 Shard1, Shard2, Shard3, ..., Shard32

↓

再將這些 Shard 分配到不同 Worker

Worker1：Shard1, Shard5, Shard9, ...
Worker2：Shard2, Shard6, Shard10, ...
Worker3：Shard3, Shard7, Shard11, ...
```

### 5.2 為什麼要先切 Shard？

- **擴容（Scale-out）**：增加 Worker 時，可以將現有 Shard 搬移到新 Worker
- **重平衡（Rebalance）**：各 Worker 容量不均時，搬移 Shard 達成均衡
- **靈活性**：Shard 數量（預設 32）與 Worker 數量可以不同

### 5.3 內部記錄

Citus 維護一張 Shard 的映射表（shard map）：

```
Table: l1_kda_biblio
Distribution Key: formatted_pn

Shard1 (start: US..., end: UF...) → Worker1
Shard2 (start: UG..., end: UH...) → Worker2
...
```

---

## 六、INSERT 流程

### 6.1 完整路由流程

```sql
INSERT INTO l1_kda_biblio (formatted_pn, pn, kindcode)
VALUES ('US10000002', '10000002', 'B2');
```

流程：

```
Client（應用程式）
    │
    ▼
Coordinator（接收 INSERT 請求）
    │
    │  Hash('US10000002')
    │
    ▼
找到對應 Shard（例如 Shard5）
    │
    ▼
定位到 Worker2
    │
    ▼
Worker2 執行真正的 INSERT
```

### 6.2 使用者體驗

- 使用者只需要寫一般的 `INSERT` 語法
- 不知道也不需要關心資料實際上在哪台 Worker
- Coordinator 自動完成所有路由

---

## 七、SELECT 流程

### 7.1 帶 Distribution Key 的查詢

```sql
SELECT * FROM l1_kda_biblio
WHERE formatted_pn = 'US10000001' AND period = '202401';
```

流程：

```
Coordinator
    │
    │ Hash('US10000001')
    │
    ▼
直接定位到 Worker2
    │
    │ 查詢: WHERE formatted_pn = 'US10000001' AND period = '202401'
    │
    ▼
Worker2 只查自己的資料
    │
    ▼
回傳結果
```

### 7.2 不需要查所有 Worker

因為知道了 `formatted_pn` 的值，可以直接定位到單一台 Worker，不需要掃描所有 Worker。

---

## 八、JOIN 問題與 Colocation

### 8.1 分散式資料庫最大的挑戰

> JOIN 的兩張表，資料是否在同一個 Worker？

### 8.2 正確設計：Colocation（共置）

所有相關表使用**同一個** Distribution Key：

```sql
create_distributed_table('l1_kda_biblio',       'formatted_pn');
create_distributed_table('l1_kda_assignee',     'formatted_pn');
create_distributed_table('l1_kda_inventor',     'formatted_pn');
create_distributed_table('l1_kda_citation',     'formatted_pn');
```

**結果**：同一篇專利的資料全部在同一個 Worker。

```
Worker2：
  l1_kda_biblio:    US10000001
  l1_kda_assignee:  US10000001
  l1_kda_inventor:  US10000001
  l1_kda_citation:  US10000001

所有資料都在同一台機器！
```

### 8.3 Colocation 的優勢

```sql
SELECT * FROM l1_kda_biblio b
JOIN l1_kda_assignee a ON b.formatted_pn = a.formatted_pn;
```

- 在同一個 Worker 內完成 JOIN
- 不需跨節點傳輸資料
- 速度等同於單機 PostgreSQL

### 8.4 錯誤設計：Cross-node Join

如果 Distribution Key 不同：

```sql
create_distributed_table('l1_kda_biblio',    'formatted_pn');  -- 依專利號
create_distributed_table('l1_kda_assignee',  'assignee');      -- 依申請人名稱
```

**結果**：

```
Worker1：
  l1_kda_biblio: US10000001
  l1_kda_assignee: Apple（假設 Apple 排在 Worker1）

Worker2：
  l1_kda_biblio: US10000002
  l1_kda_assignee：（Apple 的資料在 Worker1，不在這裡）
```

JOIN 時：
- Worker1 找不到對應的 assignee 資料
- 必須跨節點傳輸資料
- 網路開銷大
- 大資料量時極慢

---

## 九、Distribution vs Index：不同層級

### 9.1 Citus Distribution

**責任**：決定資料放在哪台 Worker（跨機器層級）

```
US10000001 → 定位到 Worker2
US10000002 → 定位到 Worker1
```

### 9.2 PostgreSQL Index

**責任**：決定 Worker 內部如何快速找到資料（單機層級）

```sql
CREATE INDEX ON l1_kda_biblio (period, formatted_pn, formatted_apn, kindcode);
```

### 9.3 兩者互補

```
完整查詢：

SELECT * FROM l1_kda_biblio
WHERE formatted_pn = 'US10000001' AND period = '202401';

步驟 1：Citus Distribution 定位
  US10000001 → Worker2

步驟 2：PostgreSQL Index 快速查找
  Worker2 使用複合索引 (period, formatted_pn, ...)
  → 快速找到 (202401, US10000001) 這筆資料

步驟 3：回傳結果
```

- Distribution 解決「跨機器」的問題
- Index 解決「機器內」的問題

---

## 十、Patent 完整範例

### 10.1 完整的 DDL 設定

```sql
-- 建立表結構
CREATE TABLE l1_kda_biblio (
    pn VARCHAR,
    formatted_pn VARCHAR NOT NULL,
    formatted_apn VARCHAR NOT NULL,
    kindcode VARCHAR NOT NULL,
    json_raw TEXT
);

CREATE TABLE l1_kda_assignee (
    formatted_pn VARCHAR,
    assignee VARCHAR NOT NULL,
    sequence_num INTEGER
);

CREATE TABLE l1_kda_inventor (
    formatted_pn VARCHAR,
    inventor_name VARCHAR NOT NULL,
    sequence_num INTEGER
);

CREATE TABLE l1_kda_citation (
    formatted_pn VARCHAR,
    cited_pn VARCHAR NOT NULL
);

-- 建立索引（Worker 內部快速查找）
CREATE INDEX idx_biblio_period_pn
    ON l1_kda_biblio (period, formatted_pn, formatted_apn, kindcode);

-- 轉換成分散式表（所有表用同一個 Distribution Key → Colocation）
SELECT create_distributed_table('l1_kda_biblio',    'formatted_pn');
SELECT create_distributed_table('l1_kda_assignee',  'formatted_pn');
SELECT create_distributed_table('l1_kda_inventor',  'formatted_pn');
SELECT create_distributed_table('l1_kda_citation',  'formatted_pn');
```

### 10.2 資料分布示意

```
Worker2：

l1_kda_biblio:        US10000001
l1_kda_assignee:      US10000001（Apple）
l1_kda_inventor:      US10000001（John Doe）
l1_kda_citation:      US10000001（引用 US9999999）

→ 同一篇專利的所有資料集中在同一台 Worker
```

### 10.3 典型查詢

```sql
-- 專利基本資料 + 申請人
SELECT b.formatted_pn, b.pn, a.assignee
FROM l1_kda_biblio b
JOIN l1_kda_assignee a ON b.formatted_pn = a.formatted_pn
WHERE b.formatted_pn = 'US10000001';

-- 按時間範圍查詢（利用複合索引）
SELECT * FROM l1_kda_biblio
WHERE period = '202401'
  AND formatted_pn LIKE 'US%';
```

---

## 十一、總結

### 11.1 核心公式

```sql
SELECT create_distributed_table('table_name', 'distribution_column');
```

> 把 PostgreSQL Table 交給 Citus 管理，並指定哪個欄位決定資料分布位置。

### 11.2 你的例子

```sql
SELECT create_distributed_table('l1_kda_biblio', 'formatted_pn');
```

> 將專利基本資料表分散到多個 Worker，並且使用專利號 `formatted_pn` 作為分片鍵。

### 11.3 設計要點

| 要點 | 說明 |
|------|------|
| Colocation | 相關表使用同一個 Distribution Key，讓 JOIN 在同一 Worker 完成 |
| Distribution Key 選擇 | 選最常查詢、基數高的欄位 |
| Index 搭配 | Distribution 定「在哪台」，Index 定「怎麼找」，兩者互補 |
| 直接定位 | 知道 Distribution Key 值 → 直接定位 Worker，不需查所有節點 |
| 水平擴充 | 適合大量資料場景，可透過增加 Worker 擴展容量 |

### 11.4 完整查詢流程回顧

```
查詢：
SELECT * FROM l1_kda_biblio
WHERE formatted_pn = 'US10000001' AND period = '202401';

1. Citus 依 formatted_pn 定位 → Worker2
2. Worker2 使用複合 Index (period, formatted_pn, ...)
3. 快速找到資料回傳
```

---

## 關鍵術語對照

| 英文 | 中文說明 |
|------|----------|
| Citus | PostgreSQL 分散式擴充套件 |
| Coordinator | 接收客戶端請求的 PostgreSQL 節點 |
| Worker | 實際存放資料的 PostgreSQL 節點 |
| Distributed Table | 由 Citus 管理的分散式表 |
| Distribution Key / Sharding Key | 決定資料分布的欄位 |
| Shard | 分散式表的資料分片 |
| Colocation | 相關表共置在同一 Worker |
| Cross-node Join | 跨節點 JOIN，性能差 |
| Hash 分片 | 依 Distribution Key 的 Hash 值分配資料 |

---

## 參考文獻

- https://docs.citusdata.com/en/v13.0/develop/reference_ddl.html
- https://docs.citusdata.com/en/stable/get_started/concepts.html
- https://citus-doc.readthedocs.io/en/latest/develop/reference_ddl.html