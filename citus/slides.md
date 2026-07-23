---
theme: default
colorSchema: dark
background: https://cover.sli.dev
class: text-center
highlighter: shiki
title: Citus `create_distributed_table`
---

# <span class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Citus `create_distributed_table`</span>

深度解析 PostgreSQL 分散式擴充

---

# Citus 是什麼？

PostgreSQL 的分散式擴充套件

<div class="h-px w-16 bg-cyan-400/50 my-3" />

- Horizontal Scaling 水平擴充
- Sharding 資料分片
- Distributed Query 分散式查詢

<div class="mt-6 text-sm opacity-60 font-mono text-center">一般 PG vs Citus 架構對比</div>

---

# 架構對比

<div class="mt-6 text-sm opacity-60 font-mono text-center">一般 PostgreSQL：單機，單 Table</div>

```
PostgreSQL Server
      Table
        |
    一台機器
```

<div class="mt-8 text-sm opacity-60 font-mono text-center">Citus：Coordinator 分發到多個 Worker</div>

```
              Coordinator
                  |
          -----------------------
          |            |        |
       Worker1     Worker2   Worker3
```

---

# Multi-tenant 多租戶

<div class="h-px w-16 bg-cyan-400/50 my-3" />

Tenant = 一位客戶、一家公司、一個組織

SaaS 系統中每家客戶使用同一套系統，資料隔離：

```
系統
├── Google
├── Microsoft
├── Apple
└── Amazon
```

---

# 傳統做法：每租户一個 Database

```
Google DB
Microsoft DB
Apple DB
```

<div class="mt-4 text-lg text-red-400">

❌ 客戶增加後難管理
❌ Database 數量爆炸

</div>

---

# Multi-tenant 做法：所有資料放一起

導入 `tenant_id` 欄位，查詢時加上过滤：

```sql
SELECT *
FROM Orders
WHERE tenant_id = 'Google';
```

<div class="mt-4 text-cyan-400 text-sm">✅ 單一結構，易管理</div>

---

# Distributed Table 分散式資料表

假設有一張專利表：

```sql
CREATE TABLE l1_kda_biblio (
    pn VARCHAR,
    formatted_pn VARCHAR NOT NULL,
    formatted_apn VARCHAR NOT NULL,
    kindcode VARCHAR NOT NULL,
    json_raw TEXT
);
```

執行：

```sql
SELECT create_distributed_table('l1_kda_biblio', 'formatted_pn');
```

<div class="h-px w-16 bg-cyan-400/50 my-2" />

資料開始依照 `formatted_pn` 分布到各 Worker。

---

# 兩個參數

<div class="h-px w-16 bg-cyan-400/50 my-3" />

- 第一個參數：Table Name — 哪一張 PostgreSQL Table 要變成分散式
- 第二個參數：Distribution Column — 用哪個欄位決定資料放哪台 Worker

也稱為：

- Distribution Key
- Sharding Key

---

# Hash 分片原理

`formatted_pn` 透過 Hash 決定資料位置：

```
US10000001 → Hash → Worker2
US10000002 → Hash → Worker1
US10000003 → Hash → Worker3
```

資料分布：

```
Worker1       Worker2       Worker3
US10000002    US10000001    US10000003
```

<div class="mt-4 text-cyan-400 text-sm">同一個 Hash 永遠指向同一個 Worker → 資料可重現</div>

---

# `create_distributed_table` 實際做了什麼？

<div class="mt-6">

**6.1 記錄 Metadata**

Citus 記錄 Table 名稱與 Distribution Column，後續所有 INSERT / SELECT / UPDATE / DELETE 都根據此規則 Routing。

</div>

<div class="mt-6">

**6.2 建立 Shard**

Citus 建立很多 Shard（例如 32 個），再分配：

```
Worker1: Shard1 Shard5 Shard9
Worker2: Shard2 Shard6 Shard10
Worker3: Shard3 Shard7 Shard11
```

</div>

---

# INSERT Routing 插入流程

```
Client → Coordinator → Hash(formatted_pn)
                  → 找到 Shard → Worker2 → INSERT
```

使用者不用知道資料在哪台 Worker。

---

# SELECT Routing 查詢流程

```sql
SELECT *
FROM l1_kda_biblio
WHERE formatted_pn = 'US10000002';
```

```
Coordinator → Hash(US10000002) → 找到 Worker2 → 只查 Worker2
```

<span class="text-cyan-400">不需要查所有 Worker → 直接定位</span>

---

# JOIN 為什麼會有問題？

分散式資料庫最大的問題：

<div class="text-lg mt-4"><span class="text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">JOIN 的資料是否在同一個 Worker？</span></div>

---

# 正確設計：Colocation 共置

所有相關 Table 使用同一個 Distribution Key：

```sql
-- Patent
create_distributed_table('Patent', 'formatted_pn');
-- Assignee
create_distributed_table('Assignee', 'formatted_pn');
-- Inventor
create_distributed_table('Inventor', 'formatted_pn');
```

<span class="text-cyan-400 text-sm">同一篇 Patent 的所有資料在同一個 Worker，JOIN 在本機完成</span>

---

# 錯誤設計：Cross-node Join

如果 Patent 和 Assignee 使用不同分片鍵：

```
Worker1: Patent (US10000001)
Worker2: Assignee (Google)
```

查詢 JOIN 時：

<div class="mt-4 text-red-400">
  ❌ 必須跨 Node 搬資料 → 網路傳輸成本高
  ❌ 大資料量時非常慢
</div>

這叫：<span class="text-cyan-400">Cross-node Join</span>

---

# Patent 範例：Colocation 的實務應用

專利相關 Table 都用 `formatted_pn` 分片：

| Table | Distribution Key |
|-------|---------|
| `l1_kda_biblio` | `formatted_pn` |
| `l1_kda_assignee` | `formatted_pn` |
| `l1_kda_inventor` | `formatted_pn` |
| `l1_kda_citation` | `formatted_pn` |

<div class="h-px w-16 bg-cyan-400/50 my-2" />

```sql
SELECT *
FROM l1_kda_biblio b
JOIN l1_kda_assignee a
  ON b.formatted_pn = a.formatted_pn;
```

同一個 Worker 完成 JOIN

---

# Distribution vs Index：不同層級

<div class="h-px w-16 bg-cyan-400/50 my-3" />

**Citus Distribution — 資料放哪台 Worker**

`US10000001 → Worker2`

**PostgreSQL Index — Worker2 內如何快速找資料**

建立複合索引：

```sql
CREATE INDEX ON l1_kda_biblio
(period, formatted_pn, formatted_apn, kindcode);
```

---

# 完整查詢流程

```sql
SELECT *
FROM l1_kda_biblio
WHERE formatted_pn = 'US10000001'
  AND period = '202401';
```

<div class="mt-6 text-left max-w-2xl mx-auto text-base">

1. Citus 根據 `formatted_pn` → 定位到 <span class="text-cyan-400">Worker2</span>
2. Worker2 使用 Index `(period, formatted_pn, ...)`
3. 快速找到資料

</div>

---

# 總結

`create_distributed_table`：

<div class="bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-4 mt-4 max-w-lg mx-auto text-left">

```sql
SELECT create_distributed_table(
    'table_name',
    'distribution_column'
);
```

> 把 PostgreSQL Table 交給 Citus 管理，並指定哪個欄位決定資料分布位置。

</div>

---

# 總結：`formatted_pn` 作為 Distribution Key

<div class="h-px w-16 bg-cyan-400/50 my-3" />

<span class="text-cyan-400">▸</span> 同一篇 Patent 的資料容易放在一起  
<span class="text-cyan-400">▸</span> JOIN 不需要跨 Node  
<span class="text-cyan-400">▸</span> 查詢可以直接定位到特定 Worker  
<span class="text-cyan-400">▸</span> 適合大量 Patent 資料水平擴充

---

# 參考文獻

<div class="h-px w-16 bg-cyan-400/50 my-3" />

- https://docs.citusdata.com/en/v13.0/develop/reference_ddl.html
- https://docs.citusdata.com/en/stable/get_started/concepts.html
- https://citus-doc.readthedocs.io/en/latest/develop/reference_ddl.html

---
layout: center
class: text-center
---

# End