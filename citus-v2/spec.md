# Citus `create_distributed_table` 詳細說明

## 1. Citus 是什麼？

Citus 是 PostgreSQL 的分散式資料庫擴充套件，可以讓 PostgreSQL 支援：

* Horizontal Scaling（水平擴充）
* Sharding（資料分片）
* Distributed Query（分散式查詢）

一般 PostgreSQL：

```
PostgreSQL Server

    Table
       |
       |
   一台機器
```

Citus：

```
              Coordinator

                  |
      --------------------------
      |            |           |

   Worker1     Worker2     Worker3
```

資料會被拆到不同 Worker 上。

---

# 2. Multi-tenant 是什麼？

Tenant 可以理解成：

> 一個客戶、一家公司、一個組織。

例如 SaaS 系統：

```
系統

├── Google
├── Microsoft
├── Apple
└── Amazon
```

大家使用同一套系統，但是資料彼此隔離。

---

## 傳統做法

每個 Tenant 一個 Database：

```
Google DB

Microsoft DB

Apple DB
```

缺點：

* 客戶數量增加後難管理
* Database 數量爆炸

---

## Multi-tenant 做法

所有資料放一起，但是加入 tenant_id：

Users:

| tenant_id | user_id | name |
| --------- | ------- | ---- |
| Google    | 1       | Tim  |
| Apple     | 2       | Amy  |

Orders:

| tenant_id | order_id | amount |
| --------- | -------- | ------ |
| Google    | 100      | 500    |
| Apple     | 200      | 900    |

查詢時：

```sql
SELECT *
FROM Orders
WHERE tenant_id='Google';
```

只取得 Google 的資料。

---

# 3. Citus Distributed Table

假設：

```sql
CREATE TABLE l1_kda_biblio (
    pn VARCHAR,
    formatted_pn VARCHAR NOT NULL,
    formatted_apn VARCHAR NOT NULL,
    kindcode VARCHAR NOT NULL,
    json_raw TEXT
);
```

原本：

```
PostgreSQL

l1_kda_biblio
```

是一張普通 Table。

---

執行：

```sql
SELECT create_distributed_table(
    'l1_kda_biblio',
    'formatted_pn'
);
```

後：

```
Coordinator

知道：

l1_kda_biblio

是一張 Distributed Table
```

資料會開始依照 `formatted_pn` 分布到 Worker。

---

# 4. create_distributed_table 兩個參數

## 第一個參數：Table Name

```sql
'l1_kda_biblio'
```

代表：

> 哪一張 PostgreSQL Table 要變成分散式 Table。

---

## 第二個參數：Distribution Column

```sql
'formatted_pn'
```

代表：

> 使用哪個欄位決定資料放在哪個 Worker。

也叫：

* Distribution Key
* Sharding Key

---

# 5. formatted_pn 如何決定資料位置？

Citus 使用 Hash。

例如：

```
formatted_pn

US10000001
US10000002
US10000003
```

計算：

```
Hash(formatted_pn)
```

得到：

```
US10000001 -> Worker2

US10000002 -> Worker1

US10000003 -> Worker3
```

結果：

```
Worker1

US10000002


Worker2

US10000001


Worker3

US10000003
```

---

# 6. create_distributed_table 實際做了什麼？

## 6.1 記錄 Metadata

Citus 會記錄：

```
Table:

l1_kda_biblio


Distribution Column:

formatted_pn
```

之後：

INSERT / SELECT / UPDATE / DELETE

都會根據這個規則 Routing。

---

## 6.2 建立 Shard

Citus 不會直接把資料切成：

```
Worker1 一份
Worker2 一份
Worker3 一份
```

而是建立很多 Shard。

例如：

```
l1_kda_biblio

Shard1
Shard2
Shard3
...
Shard32
```

再分配：

```
Worker1

Shard1
Shard5
Shard9


Worker2

Shard2
Shard6
Shard10


Worker3

Shard3
Shard7
Shard11
```

---

## 6.3 INSERT Routing

執行：

```sql
INSERT INTO l1_kda_biblio
(
    formatted_pn
)
VALUES
(
    'US10000001'
);
```

流程：

```
Client

 |
 v

Coordinator

 |
 | Hash(formatted_pn)

 |
 v

找到 Shard

 |
 v

Worker2

 |
 v

INSERT
```

使用者不用知道資料在哪台。

---

## 6.4 SELECT Routing

查詢：

```sql
SELECT *
FROM l1_kda_biblio
WHERE formatted_pn='US10000001';
```

流程：

```
Coordinator

Hash(US10000001)

↓

找到 Worker2

↓

只查 Worker2
```

不需要查所有 Worker。

---

# 7. JOIN 為什麼會有問題？

分散式資料庫最大的問題：

> JOIN 的資料是否在同一個 Worker。

---

## 正確設計

例如：

Patent：

```
formatted_pn
```

Assignee：

```
formatted_pn
```

Inventor：

```
formatted_pn
```

全部使用同一個 Distribution Key。

結果：

```
Worker1

Patent

US10000001


Assignee

US10000001


Inventor

US10000001
```

JOIN：

```sql
SELECT *
FROM Patent p
JOIN Assignee a
ON p.formatted_pn=a.formatted_pn;
```

Worker1 自己完成。

這叫：

## Colocation（共置）

---

# 8. 錯誤設計造成 Cross-node JOIN

例如：

Patent：

```
依 formatted_pn 分片
```

Assignee：

```
依 assignee 分片
```

結果：

```
Worker1

Patent

US10000001


Worker2

Assignee

Google
```

現在：

```sql
JOIN
ON formatted_pn
```

問題：

Worker1 找不到 Assignee。

必須：

```
Worker1

拿 Patent


Worker2

拿 Assignee


↓

搬資料


↓

JOIN
```

這叫：

## Cross-node Join

問題：

* 網路傳輸成本高
* 大資料量時非常慢

---

# 9. 你的 Patent Table 範例

你的設定：

```sql
SELECT create_distributed_table(
    'l1_kda_biblio',
    'formatted_pn'
);
```

代表：

每篇 Patent 依：

```
formatted_pn
```

分布。

例如：

```
US10000001
```

相關資料：

```
l1_kda_biblio

l1_kda_assignee

l1_kda_inventor

l1_kda_citation
```

如果全部：

```sql
create_distributed_table(
    table,
    'formatted_pn'
)
```

則：

```
Worker2


Patent

US10000001


Assignee

US10000001


Inventor

US10000001


Citation

US10000001
```

查詢：

```sql
SELECT *
FROM l1_kda_biblio b
JOIN l1_kda_assignee a
ON b.formatted_pn=a.formatted_pn;
```

可以在同一個 Worker 完成。

---

# 10. Citus Distribution 與 Index 的差異

你的 Index：

```sql
CREATE INDEX
ON l1_kda_biblio
(
    period,
    formatted_pn,
    formatted_apn,
    kindcode
);
```

和：

```sql
create_distributed_table(
    'l1_kda_biblio',
    'formatted_pn'
);
```

是不同層級。

---

## Citus Distribution

負責：

```
資料放哪台 Worker
```

例如：

```
US10000001

↓

Worker2
```

---

## PostgreSQL Index

負責：

```
在 Worker2 裡面如何快速找到資料
```

例如：

```
Worker2

Index

(period,
 formatted_pn,
 formatted_apn,
 kindcode)
```

---

完整查詢流程：

```
SELECT *
FROM l1_kda_biblio
WHERE formatted_pn='US10000001'
AND period='202401';
```

步驟：

1. Citus 根據 formatted_pn 找 Worker

```
US10000001

↓

Worker2
```

2. Worker2 使用 Index

```
(period,
 formatted_pn,
 formatted_apn,
 kindcode)
```

3. 找到資料

---

# 11. 總結

`create_distributed_table`：

```sql
SELECT create_distributed_table(
    'table_name',
    'distribution_column'
);
```

意思：

> 把 PostgreSQL Table 交給 Citus 管理，並指定哪個欄位決定資料分布位置。

你的例子：

```sql
SELECT create_distributed_table(
    'l1_kda_biblio',
    'formatted_pn'
);
```

意思：

> 將專利基本資料表分散到多個 Worker，並且使用專利號 formatted_pn 作為分片鍵。

選 `formatted_pn` 的原因：

* 同一篇 Patent 的資料容易放在一起
* JOIN 不需要跨 Node
* 查詢可以直接定位到特定 Worker
* 適合大量 Patent 資料水平擴充


`參考文獻`
https://docs.citusdata.com/en/v13.0/develop/reference_ddl.html
https://docs.citusdata.com/en/stable/get_started/concepts.html?highlight=Distributed+Table
https://citus-doc.readthedocs.io/en/latest/develop/reference_ddl.html