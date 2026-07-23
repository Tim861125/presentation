# Citus `create_distributed_table` 技術深剖

## 來源文件 / 參考連結
- spec/citus-spec.md（原始筆記）
- https://docs.citusdata.com/en/v13.0/develop/reference_ddl.html
- https://docs.citusdata.com/en/stable/get_started/concepts.html
- https://citus-doc.readthedocs.io/en/latest/develop/reference_ddl.html

## 摘要
這份簡報詳細解釋 PostgreSQL 擴充套件 Citus 的核心機制。內容涵蓋：Citus 是什麼（分散式資料庫擴充、Sharding、Distributed Query）、Multi-tenant 概念與做法、`create_distributed_table` 兩個參數的意義（Table Name + Distribution Column）、Hash 分片原理、Shard 建立、INSERT/SELECT Routing、Colocation 與 Cross-node Join 問題、以及 Citus Distribution 與 PostgreSQL Index 的區別。

## 大綱 (Slide Plan)
1. 封面：Citus `create_distributed_table` 深度解析
2. Citus 是什麼？Coordinator + Worker 架構
3. Multi-tenant 概念（Tenant、傳統 vs 統一 Table 做法）
4. `create_distributed_table` 兩個參數（Table Name、Distribution Column）
5. Hash 分片：`formatted_pn` 如何決定資料位置
6. 實際做了什麼？Metadata + Shard 建立 + INSERT/SELECT Routing
7. JOIN 問題：Colocation（共置）vs Cross-node Join
8. Patent Table 範例：`formatted_pn` 作為 Distribution Key 的好处
9. Citus Distribution 與 PostgreSQL Index 的差異層級
10. 總結：選 `formatted_pn` 作為分片鍵的原因
11. 參考文獻