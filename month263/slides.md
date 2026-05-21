---
theme: seriph
background: https://cover.sli.dev
title: 2026-03
class: text-center
---

# 2026-03 工作報告

---

# 分類通＆微分通
IPTECH / WEBPAT — AI 分類

**相似度篩選機制**
- 實作相似度分數處理邏輯，支援動態 slide bar 篩選
- 新增 `SimilarityRange` 與 `NodeSimilarityDistribution` API
- 支援批次將低於門檻之專利移回「未分類」狀態

**AI 暖場回應 (情緒價值)**
- 新增 `AiClassificationComment` API，根據分類樹與策略提供 AI 評論
- 在分類對話框中整合 AI 訊息與打字效果

---

# 新增微分通
IPTECH / WEBPAT

功能概念
「微分通」是用來調整分類品質。

使用者可以選擇一些分類節點，設定一個「相似度門檻」，
把不夠相似的專利移到「未分類」。

---

# 系統與 UI 修正

- **版面調整**: 修正專案頁提示被 Header bar 遮擋的問題
- **使用者設定**: 移除個人頭像功能，簡化個人設定頁面

---

# Dify — Prompt 調整 Workflow

- 建立 prompt 調整 workflow

---
layout: center
class: text-center
---

# End
