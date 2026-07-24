---
theme: default
colorSchema: dark
background: https://cover.sli.dev
class: text-center
highlighter: shiki
lineNumbers: false
title: Citus create_distributed_table
---

# <span class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Citus</span>

<div class="text-2xl font-mono mt-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent inline-block">create_distributed_table()</div>

<div class="text-sm opacity-60 font-mono mt-4">PostgreSQL 分散式擴充 · 深度解析</div>

---

<SlideTitle title="Citus 是什麼？" kicker="Concept" />

PostgreSQL 的**分散式資料庫擴充套件**，讓單機 PG 具備規模化能力：

<div class="grid grid-cols-3 gap-3 mt-4">
  <DiagramNode tone="cyan" title="Horizontal Scaling" subtitle="水平擴充" compact />
  <DiagramNode tone="cyan" title="Sharding" subtitle="資料分片" compact />
  <DiagramNode tone="cyan" title="Distributed Query" subtitle="分散式查詢" compact />
</div>

<div class="mt-5 text-sm opacity-70">
資料由 <span class="text-cyan-300">Coordinator</span> 拆分到多個 <span class="text-blue-300">Worker</span>，對應用端透明。
</div>

---

<SlideTitle title="架構對比" kicker="Architecture" />

<ArchCompare class="mt-2" />

---

<!-- <SlideTitle title="Multi-tenant 多租戶" kicker="Concept" />

Tenant = 一位客戶 / 一家公司 / 一個組織。SaaS 中大家共用同一套系統，資料彼此隔離。

<div class="grid grid-cols-2 gap-6 mt-4">

<div>
<div class="text-xs font-mono opacity-60 mb-2">傳統做法：每租戶一個 DB</div>
<DiagramNode tone="red" title="Google DB / Microsoft DB / Apple DB ..." compact />
<div class="mt-2 text-xs text-red-300">✗ 客戶增加後難管理 · DB 數量爆炸</div>
</div>

<div>
<div class="text-xs font-mono opacity-60 mb-2">Multi-tenant：共用結構 + tenant_id</div>

```sql
SELECT * FROM Orders
WHERE tenant_id = 'Google';
```

<div class="mt-2 text-xs text-cyan-300">✓ 單一結構，易管理與擴充</div>
</div>

</div> -->

<SlideTitle title="Distributed Table" kicker="DDL" />

一張普通專利表，交給 Citus 管理後即成為分散式表：

```sql
CREATE TABLE l1_kda_biblio (
    pn VARCHAR, formatted_pn VARCHAR NOT NULL,
    formatted_apn VARCHAR NOT NULL, kindcode VARCHAR NOT NULL,
    json_raw TEXT
);

SELECT create_distributed_table('l1_kda_biblio', 'formatted_pn');
```

<div class="mt-3 text-sm">資料開始依 <span class="text-cyan-300">formatted_pn</span> 分布到各 Worker。</div>

---

<SlideTitle title="兩個參數" kicker="API" />

<div class="grid grid-cols-2 gap-4 mt-2">
  <DiagramNode
    tone="cyan"
    title="① Table Name"
    subtitle="'l1_kda_biblio'"
    :items="['哪一張 PostgreSQL Table', '要變成分散式']"
  />
  <DiagramNode
    tone="blue"
    title="② Distribution Column"
    subtitle="'formatted_pn'"
    :items="['用哪個欄位', '決定資料放哪台 Worker']"
  />
</div>

<div class="mt-4 text-sm opacity-70">
第二個參數又稱 <span class="text-cyan-300">Distribution Key</span> / <span class="text-cyan-300">Sharding Key</span>。
</div>

---

<SlideTitle title="Hash 分片原理" kicker="Routing" />

Citus 對 Distribution Column 取 Hash 決定資料位置：

<HashRouting class="mt-3" />

---

<SlideTitle title="建立 Shard 並分配" kicker="Internals" />

<ShardMap class="mt-2" />

<div class="mt-4 text-xs opacity-60">
Citus 不是「一個 Worker 一份」，而是先切成多個 Shard 再分配 → 擴容時可搬移 Shard 達成 rebalance。
</div>

---

<SlideTitle title="INSERT / SELECT Routing" kicker="Routing" />

<div class="text-xs font-mono opacity-60 mb-2">INSERT — 依 Hash 找到目標 Worker</div>
<RoutingFlow :steps="['Client', 'Coordinator', 'Hash(pn)', '找到 Shard', 'Worker2', 'INSERT']" />

<div class="text-xs font-mono opacity-60 mt-6 mb-2">SELECT — 直接定位，不需查所有 Worker</div>
<RoutingFlow tone="blue" :steps="['Coordinator', 'Hash(US..01)', 'Worker2', '只查此節點']" />

<div class="mt-6 text-sm text-cyan-300 text-center">使用者不需知道資料實際在哪台機器。</div>

---

<SlideTitle title="JOIN " kicker="Key Question" />

<div class="flex items-center justify-center h-56">
  <div class="text-2xl">
    分散式資料庫最大的問題：<br/>
    <span class="text-cyan-300 bg-cyan-400/10 px-3 py-1 rounded mt-3 inline-block">
      JOIN 的資料，是否在同一個 Worker？
    </span>
  </div>
</div>

---

<SlideTitle title="正確設計：Colocation 共置" kicker="Best Practice" />

所有相關表使用**同一個** Distribution Key：

```sql
create_distributed_table('l1_kda_biblio',  'formatted_pn');
create_distributed_table('l1_kda_assignee','formatted_pn');
create_distributed_table('l1_kda_inventor','formatted_pn');
```

<ColocationDiagram mode="good" class="mt-3" />

---

<SlideTitle title="錯誤設計：Cross-node Join" kicker="Anti-pattern" />

Patent 依 `formatted_pn`、Assignee 卻依 `assignee` 分片：

<ColocationDiagram mode="bad" class="mt-3" />

---

<SlideTitle title="Patent 範例" kicker="Example" />

專利相關表全部以 `formatted_pn` 分片，同一篇專利資料共置：

<div class="grid grid-cols-2 gap-6 items-center mt-2">

<table class="text-sm">
<thead><tr><th class="text-left">Table</th><th class="text-left">Distribution Key</th></tr></thead>
<tbody>
<tr><td><code>l1_kda_biblio</code></td><td><code class="text-cyan-300">formatted_pn</code></td></tr>
<tr><td><code>l1_kda_assignee</code></td><td><code class="text-cyan-300">formatted_pn</code></td></tr>
<tr><td><code>l1_kda_inventor</code></td><td><code class="text-cyan-300">formatted_pn</code></td></tr>
<tr><td><code>l1_kda_citation</code></td><td><code class="text-cyan-300">formatted_pn</code></td></tr>
</tbody>
</table>

<div>

```sql
SELECT *
FROM l1_kda_biblio b
JOIN l1_kda_assignee a
  ON b.formatted_pn = a.formatted_pn;
```

<div class="mt-2 text-xs text-cyan-300">同一個 Worker 完成 JOIN</div>
</div>

</div>

---
<!--
<SlideTitle title="Distribution vs Index：不同層級" kicker="Layers" />

<div class="grid grid-cols-2 gap-4 mt-2">
  <DiagramNode
    tone="cyan"
    title="Citus Distribution"
    subtitle="資料放哪台 Worker"
    :items="['US10000001 → Worker2']"
  />
  <DiagramNode
    tone="blue"
    title="PostgreSQL Index"
    subtitle="Worker 內如何快速找資料"
    :items="['(period, formatted_pn,', ' formatted_apn, kindcode)']"
  />
</div>

<div class="mt-4 text-sm opacity-70">
Distribution 決定<b>跨機器</b>的定位；Index 決定<b>機器內</b>的搜尋速度，兩者互補。
</div> -->

<SlideTitle title="完整查詢流程" kicker="End-to-end" />

```sql
SELECT * FROM l1_kda_biblio
WHERE formatted_pn = 'US10000001' AND period = '202401';
```

<div class="mt-4 flex flex-col gap-2 text-base max-w-2xl">
  <div><span class="text-cyan-400 font-mono">1.</span> Citus 依 <code>formatted_pn</code> 定位 → <span class="text-cyan-300">Worker2</span></div>
  <div><span class="text-cyan-400 font-mono">2.</span> Worker2 使用複合 Index <code>(period, formatted_pn, ...)</code></div>
  <div><span class="text-cyan-400 font-mono">3.</span> 快速找到資料回傳</div>
</div>

---

<SlideTitle title="總結" kicker="Summary" />

<div class="bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-3 max-w-xl">

```sql
SELECT create_distributed_table('table_name', 'distribution_column');
```

</div>

<div class="mt-3 text-sm">把 PostgreSQL Table 交給 Citus 管理，並指定哪個欄位決定資料分布位置。</div>

<div class="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
  <div><span class="text-cyan-400">▸</span> 同一篇 Patent 資料放在一起</div>
  <div><span class="text-cyan-400">▸</span> JOIN 不需跨 Node</div>
  <div><span class="text-cyan-400">▸</span> 查詢可直接定位 Worker</div>
  <div><span class="text-cyan-400">▸</span> 適合大量資料水平擴充</div>
</div>

---

<SlideTitle title="參考文獻" kicker="References" />

<div class="text-sm font-mono opacity-80 flex flex-col gap-2 mt-2">
  <div>docs.citusdata.com/en/v13.0/develop/reference_ddl.html</div>
  <div>docs.citusdata.com/en/stable/get_started/concepts.html</div>
  <div>citus-doc.readthedocs.io/en/latest/develop/reference_ddl.html</div>
</div>

---
layout: center
class: text-center
---

# <span class="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">End</span>
