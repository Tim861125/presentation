---
theme: seriph
background: https://cover.sli.dev
title: 2026-06
class: text-center
---

# 2026-06 工作報告

丁吾心

---

# IPTECH 分類頁多分類樹
核心開發

- 多分類樹 patent list 顯示
- 專利移動、節點移動與合併機制
- 未分類節點機制
- 規格調整與優化分類通

---

# IPTECH 魚骨通

- 功效 / 應用魚骨跑版修正
- 設定檢索條件國家欄位跑版
- 架構未建立完意外關閉視窗優化

---

# AI
洞察通 / 速讀通 / 閱讀通

- 洞察通跑版修正、調整 prompt
- 速讀通提供匯出 Excel 功能
- 專利詳細頁 閱讀通、價值通 提供複製 Markdown 功能
- AI 通 Dify 更新正式站台

---

# WEBPAT 閱讀通廣告與 FTO

- 新增閱讀通 / 價值通顯示條件 for 無帳號體驗
- FTO AI POC 與 FTO survey
- 專利匯出 PDF 問題排查

---

# Patent Embedding 專利向量化
研究 / POC

- 討論專利向量化方向與規格制定
- patent-embedding-analysis 專案與 OpenSearch 學習
- Patent Embedding mapping 規格
- patent embedding search（進行中）

---

# IPTECH 其他修正
Bug Fix

- 專利跨域分類後頁面刷新找不到專利
- 新建專案分類頁一直轉圈無法顯示
- 無法顯示無分類的分類樹
- 需點擊兩次才切換到目標節點 patent list
- 點擊空白處選取分類未 highlight 該分類樹
- 跨樹移動誤 highlight 相同 node id 節點
- 列表內叉叉刪除專利、未分類節點錯誤修正
- 產品公告選「不再提示並關閉」後不應再顯示
- 專案儲存下載專利進度不穩（測試站台）
- 檢視頁首圖模式新增放大顯示
- 修正修改密碼功能

---

<!-- # 基礎建設與工具學習

- k8s
- git worktree
- docker compose
- Claude Artifact
- ghostty

--- -->

<div class="h-full w-full flex flex-col items-center justify-center">
  <div class="text-xl font-semibold mb-2">家裡示意圖</div>
  <HomeFloorPlan />
</div>

---
layout: center
class: text-center
---

# End
