# 2026-03 月工作內容

此專案為 slidev 的專案，將內容寫在 slides.md 裡面

# 注意

- 不要使用 icon, 只在必要時用打勾或叉叉讓版面清晰，不需要的話就不用
- 注意每一頁的高度不要超過螢幕高度
- 用繁體中文
- 首頁背景 background: https://cover.sli.dev

# 以下為本月工作內容

## IPTECH, WEBPAT

### 分類通與微分通大幅優化 (AI 分類)
- **相似度篩選機制**:
  - 實作相似度 (Similarity) 分數處理邏輯，支援動態 slide bar 篩選。
  - 新增 `SimilarityRange` 與 `NodeSimilarityDistribution` API，提供門檻範圍與節點分數分佈。
  - 支援批次將低於門檻之專利移回「未分類」狀態。
  - 實作前端快取機制 (`GetAllNodePatentCountsBySimilarity`)，提升 slider 拖動效能。
- **AI 暖場回應 (情緒價值)**:
  - 新增 `AiClassificationComment` 流式 (Streaming) API，根據分類樹與策略提供 AI 評論。
  - 在分類對話框中整合 AI 氣泡訊息 (Bubble) 與打字機效果。
- **微分通流程更新**:
  - 調整第二頁為雙分類樹佈局，優化節點比例顯示 (例如 37/70)。
  - 實作第三頁分類確認流程，支援節點展開/收合與 RWD 佈局。

### 魚骨通穩定性修正
- 修正魚骨通表格偶爾消失的問題。
- 優化 D3.js SVG 渲染防呆機制，提升複雜圖表的顯示穩定性。

### 檢索與認證優化
- **SSO 認證擴充**: 整合 `AuthenticateBySSOTokenAndSearchResultUrl` 等多個搜尋環境的 SSO 驗證設定。
- **時序表修正**: 解決時序表分析圖表在特定條件下無法開啟的問題。

### 系統與 UI 修正
- **版面調整**: 修正專案頁提示 (Hint) 被上方 Header bar 遮擋的問題。
- **使用者設定**: 移除個人頭像功能，簡化個人設定頁面 UI。
- **架構優化**: 整合 `aiAskUtility` 模組化 AI 請求邏輯，提升代碼複用性。
- **Docker 部署**: 更新 Dockerfile 增加 `wget` 等必要工具，優化開發環境配置。

## Dify 建立 prompt 調整 workflow
- 建立七項 prompt 調整 workflow

---

### 備註 (分析來源)
本規格係透過對比 `develop` 分支於 2026 年 3 月份之具體程式碼變動 (diff) 整理而成：
- **起始點**: `0ac2fb08` (2026-03-01 以前之最新狀態)
- **結束點**: `60db2a1f` (2026-03-31 以前之最新狀態)
