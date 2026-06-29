---
theme: seriph
background: https://cover.sli.dev
title: 2026-06
class: text-center
---

# 2026-06 工作報告

丁吾心

---

# 本月重點總覽

- IPTECH：分類頁多分類樹開發與大量問題修正
- IPTECH：魚骨通跑版修正與 prompt 調整
- WEBPAT：速讀通匯出 Excel、閱讀通廣告投放
- TipoMusic：歷史資料封存、傳送使用清單給集管團體
- PatentExporter / PatentPilot-service 架構整併
- 新研究：Patent Embedding 專利向量化 POC
- AI 會議、FTO 調研、基礎建設與工具學習

---

# IPTECH 分類頁多分類樹
核心開發

- 多分類樹 patent list 顯示
- 專利移動、節點移動與合併機制
- 分類通整合、未分類節點機制
- 樹狀選擇多種分類，右側列表同步顯示多組結果
- 節點圖示顯示、下拉選單
- 規格調整與優化分類頁計畫

---

# IPTECH 分類頁問題修正
Bug Fix

- 專利跨域分類後頁面刷新找不到專利
- 新建專案分類頁一直轉圈無法顯示
- 顯示多分類時 API 重複呼叫
- 無法顯示無分類的分類樹
- 需點擊兩次才切換到目標節點 patent list
- 點擊空白處未 highlight root node
- 跨樹移動誤 highlight 相同 node id 節點
- 列表內叉叉刪除專利、未分類節點錯誤修正

---

# IPTECH 魚骨通

- 功效 / 應用魚骨跑版修正
- 設定檢索條件國家欄位跑版
- 主題填入後畫面無魚支、光標問題
- 架構未建立完意外關閉視窗
- 節點數量限制（每節點 10~500）
- 魚骨通 prompt 調整與問題修正

---

# IPTECH AI 通與 Prompt
洞察通 / 速讀通 / 閱讀通

- 洞察通跑版修正、調整 prompt 後關閉
- 多輪 prompt tuning 更新
- 速讀通提供匯出 Excel 功能
- 專利詳細頁「閱讀通」提供複製 Markdown 功能
- 建立 AI Dify 正式站台

---

# IPTECH 其他修正

- 產品公告選「不再提示並關閉」後不應再顯示
- 專案儲存下載專利進度不穩（測試站台）
- 檢視頁首圖模式新增放大顯示
- 修正修改密碼功能

---

# WEBPAT 速讀通匯出與功能

- 速讀通匯出 Excel 規格制定與更新
- 檢索結果頁速讀通匯出 Excel 功能
- 檢索通 / 閱讀通 / 價值通複製完成顯示打勾
- 修正匯出速讀通訊息 UI
- 專利號雷達顯示問題排查

---

# WEBPAT 閱讀通廣告與 FTO

- 閱讀通 / 價值通 FB 投放連結
- 閱讀通廣告會議、規格討論與撰寫
- FTO AI POC 與 FTO survey

---

# TipoMusic

- 測試站台、正式站台僅顯示近三年資料，歷史資料封存
- 弱掃問題排查、登入問題排查
- 日誌紀錄增加使用者身份識別資訊
- 傳送音樂利用人已確認的使用清單給集管團體

---

# PatentExporter / PatentPilot-service

- 修正 patentpilot-service cache 機制
- PatentExporter 測試站台問題排查與修復
- PatentExporter 接 patentpilot-service
- PatentPilot-service 更新正式站台
- 專利匯出 PDF 問題排查

---

# Patent Embedding 專利向量化
新研究 / POC

- 討論專利向量化方向與規格制定
- patent-embedding-analysis 專案與 OpenSearch 學習
- Patent Embedding mapping 規格
- 嘗試 patent embedding，進行 POC（進行中）

---

# AI 會議與調研

- 多場 AI meeting：AI 通討論、新功能討論、會議準備
- prompt injection survey
- FTO survey
- 討論專利向量化

---

# 基礎建設與工具學習

- k8s
- git worktree
- docker compose
- Claude Artifact
- ghostty

---

# 進行中 / 待辦

- Patent Embedding POC（進行中）
- 魚骨通節點專利優化 - 調整 prompt
- 優化分類頁計畫
- 官網試用頁面搬家
- WEBPAT 號碼檢索查無結果比對
- WEBPAT 專利雷達顯示問題
- 魚骨節點優化

---

# 其他
例行事務

- 每日晨會、週會
- 協助處理資轉問題、AI 問題排查
- 規格撰寫與更新、測試 / 正式站台更新

---
---

<div class="h-full w-full flex flex-col items-center justify-center">
  <div class="text-xl font-semibold mb-2">家裡示意圖</div>
  <HomeFloorPlan />
</div>

---
layout: center
class: text-center
---

# End
