---
theme: seriph
background: https://cover.sli.dev
title: 2026-03
class: text-center
---

# 2026-03 工作報告

---

# 分類通與微分通優化
IPTECH / WEBPAT — AI 分類

**相似度篩選機制**
- 實作相似度分數處理邏輯，支援動態 slide bar 篩選
- 新增 `SimilarityRange` 與 `NodeSimilarityDistribution` API
- 支援批次將低於門檻之專利移回「未分類」狀態

**AI 暖場回應 (情緒價值)**
- 新增 `AiClassificationComment` 流式 API，根據分類樹與策略提供 AI 評論
- 在分類對話框中整合 AI 訊息與打字效果

---

# 微分通流程更新
IPTECH / WEBPAT

- 調整第二頁為雙分類樹佈局，優化節點比例顯示 (例如 37/70)
- 實作第三頁分類確認流程，支援節點展開/收合與 RWD 佈局

<br>

# 魚骨通穩定性修正

- 修正魚骨通表格偶爾消失的問題
- 優化 D3.js SVG 渲染防呆機制，提升複雜圖表的顯示穩定性

---

# 檢索與認證優化
IPTECH / WEBPAT

**時序表修正**

<br>

# 系統與 UI 修正

- **版面調整**: 修正專案頁提示被 Header bar 遮擋的問題
- **使用者設定**: 移除個人頭像功能，簡化個人設定頁面

---

# Dify — Prompt 調整 Workflow

- 建立七項 prompt 調整 workflow

---
layout: center
class: text-center
---

# End
