# Dify 詳細文件整理

> 來源：https://docs.dify.ai/en/use-dify/getting-started/introduction

---

## 1. 什麼是 Dify？

**Dify** 是一個**開源的 Agentic Workflow 建置平台**。

- 名稱來自縮寫：**D**o **I**t **F**or **Y**ou
- 允許使用者以**視覺化方式**定義流程，串接現有工具與資料來源，並部署能解決真實問題的 AI 應用
- 支援雲端版（Dify Cloud）與自架版（Self-Hosted）

### 核心入口

| 功能 | 說明 |
|------|------|
| Quick Start | 幾分鐘內完成第一個 AI 應用 |
| Concepts | Dify 核心建構概念說明 |
| Self Host | 本地或私人伺服器部署 |
| Forum | 社群討論（forum.dify.ai） |
| Changelog | 版本更新紀錄（GitHub） |
| Tutorials | 實際應用案例教學 |

---

## 2. 應用類型（App Types）

Dify 提供兩種主要的 Agentic Workflow 應用類型：

### Workflow（工作流程）
- 從輸入到輸出**執行一次**的流程
- 適合：自動化報告產生、資料處理 pipeline、批次處理
- 特性：有明確起點與終點，不含對話記憶

### Chatflow（對話式工作流程）
- 在 Workflow 基礎上加入**對話層**
- 每次使用者訊息都會觸發設計好的流程，再產生回應
- 適合：互動式助理、導引式 Q&A、任何對話情境
- 額外功能：透過 App Toolkit 支援內容審查（Content Moderation）與語音合成（Text-to-Speech）

兩者都使用**視覺化畫布**，以相互連接的節點代表不同操作：模型呼叫、知識庫查詢、條件判斷、程式碼執行。

---

## 3. Workflow 核心節點

在 Quick Start 教學（多平台內容產生器）中，使用了以下 9 個核心節點：

| 節點 | 功能 |
|------|------|
| **User Input Node** | 收集草稿文字、檔案、語氣偏好、目標平台、語言選擇 |
| **Parameter Extractor** | 將自然語言平台名稱標準化（如 "x" → "Twitter"） |
| **IF/ELSE Node** | 驗證平台提取結果，無效輸入時停止流程 |
| **List Operator** | 將上傳圖片與文件分離，走不同處理路徑 |
| **Doc Extractor** | 將文件轉成文字，讓 LLM 能夠處理 |
| **LLM Node** | 整合所有參考資料，產生平台專屬內容 |
| **Iteration Node** | 對每個平台循環產生內容（支援最多 10 個平台並行） |
| **Template Node** | 用 Jinja2 將輸出陣列格式化為可讀文字 |
| **Output Node** | 將最終結果回傳給使用者 |

### 設計原則
- **用對工具**：格式化輸出用 Template Node（規則型），不用 LLM，節省成本並提升穩定性
- **Iteration Node** 支援並行處理，效率更高

---

## 4. 知識庫（Knowledge Base）

### 什麼是知識庫？
Dify 的 Knowledge 功能讓使用者能將**自訂資料**整合進 AI 應用。採用 **RAG（Retrieval-Augmented Generation）** 技術，讓 LLM 的回答基於你自己的資料，而非僅依賴預訓練資料。

### 運作原理
1. 從知識庫取回相關資訊
2. 與使用者查詢結合
3. 將豐富化的上下文送給 LLM 產生更精確的回答

### 常見應用
- 使用產品文件的支援聊天機器人
- 員工查詢政策的內部 Q&A 系統
- 智慧內容產生工具
- 摘要特定領域資料的研究應用

### 主要功能
- 透過快速匯入、自訂 Pipeline 或外部 API 連接建立知識庫
- 管理文件、測試檢索效果
- 新增 Metadata 進行過濾
- 調整 Embedding 模型與檢索策略

---

## 5. 模型設定（Model Configuration）

### 模型提供者類型

| 類型 | 說明 | 適合場景 |
|------|------|---------|
| **System Providers** | Dify 管理，立即可用，透過訂閱計費 | 原型開發 |
| **Custom Providers** | 帶入自己的 API 金鑰（OpenAI、Anthropic、Google 等） | 生產環境 |

### 設定方式
- 僅工作區 Owner 和 Admin 可設定
- 路徑：Settings → Model Providers → 輸入憑證
- Dify 會在啟用前驗證憑證

### 支援的服務
- **LLM**：GPT-4、Claude、Gemini
- **Embedding 模型**：多種選擇
- **圖片生成**：DALL-E
- **語音服務**：Whisper（語音轉文字）
- **本地模型**：透過 Ollama 完全保護資料隱私

### 進階功能
- **多組憑證**：區分開發/生產環境、優化成本、同時測試不同模型版本
- **負載平衡**（付費功能）：以 Round-Robin 分散請求到多組憑證，避免速率限制問題；被限流的憑證暫停一分鐘後恢復輪換

### 存取控制
- Editor 角色可使用已設定的提供者
- Admin 控管提供者存取權與計費責任

---

## 6. 應用發佈（Application Publishing）

### 四種發佈方式

| 方式 | 說明 | 適用場景 |
|------|------|---------|
| **Web Apps** | 自動生成，點擊 Publish 後分享連結，適配各裝置螢幕 | 快速收集回饋 |
| **API Integration** | 嵌入現有產品，完整控制使用者體驗 | 產品整合 |
| **Website Embeds** | 在任何網站加入對話小工具 | 現有網站 |
| **MCP Servers** | 連接 Claude Desktop 等工具，用於開發工作流程 | AI 開發工具擴充 |

### 重要特性
- 所有發佈方式**共用同一份應用設定**，設定一次即可多處部署
- 發佈後**立即生效**，所有使用者同步看到最新版本

### 發佈前注意事項
- 應用描述與品牌設定
- 存取控制（公開 vs 需驗證）
- 速率限制設定（防護）

---

## 7. 監控與分析（Monitoring & Analytics）

### 內建 Dashboard 指標

| 指標 | 說明 |
|------|------|
| **Total Messages** | 對話量統計 |
| **Active Users** | 有意義互動的使用者數（超過一次交換） |
| **Average User Interactions** | 每個 Session 的互動深度 |
| **Token Usage** | 資源消耗與成本追蹤 |

### 功能
- 時間序列趨勢圖，識別使用模式
- 時間選擇器，查看不同時間區間
- 支援整合外部可觀測性工具：**Langfuse** 或 **LangSmith**，進行更深入的分析（效能追蹤）

---

## 8. 自架部署（Self-Hosting with Docker Compose）

### 系統需求
- **硬體**：2+ CPU 核心、4GB RAM（最低）
- **軟體**：
  - macOS/Windows：Docker Desktop
  - Linux：Docker 19.03+、Compose 1.28+

### 快速部署步驟

```bash
# 1. Clone 最新版本
git clone --branch "$(curl -s https://api.github.com/repos/langgenius/dify/releases/latest | jq -r .tag_name)" https://github.com/langgenius/dify.git

# 2. 進入 docker 目錄
cd dify/docker

# 3. 複製環境設定檔
cp .env.example .env

# 4. 啟動所有服務
docker compose up -d
```

### 啟動的 11 個服務
API Server、Web 前端、PostgreSQL、Redis、Weaviate（向量資料庫）、Nginx、Sandbox 等

### 存取方式
- 初始化管理員帳號：`http://localhost/install`
- 登入：`http://localhost`

### 重要設定
- 若前後端使用不同子網域，需設定 `COOKIE_DOMAIN` 為頂層網域，並設 `NEXT_PUBLIC_COOKIE_DOMAIN=1`，確保認證 Cookie 正確共享

---

## 9. 外掛與工具（Plugins & Tools）

Dify 支援外掛生態系統，擴充平台功能：

### 外掛類型
- **Agent Strategy** - 自訂 Agent 推理策略
- **Model Provider** - 新增模型提供者
- **Data Source** - 連接外部資料來源
- **Tool** - 新增可呼叫工具
- **Trigger** - 事件觸發機制

### 開發與發佈
- 提供開發 Cheatsheet 與快速入門教學
- 支援逆向呼叫（Reverse Invocation）與自訂模型
- 發佈選項：Marketplace（市場）、GitHub、本地檔案

---

## 10. 快速開始教學（Quick Start）

### 30 分鐘建置「多平台內容產生器」

**目標**：將草稿文字轉換為針對不同社群媒體平台優化的貼文

**前置需求**：
1. 註冊 Dify Cloud（新帳號獲得 200 免費 AI Credits）
2. 安裝 OpenAI 外掛
3. 設定 `gpt-5.2` 為預設模型

**測試輸入範例**：
- 草稿：AI 寫作助理的公告
- 目標平台：Twitter、LinkedIn
- 輸出語言：英文
- 語氣：友善且專業

**重要技巧**：
- 使用 **Cached Variables** 進行隔離測試，不需重跑整個工作流程
- 完成後點擊 Publish 即可分享給他人使用

---

## 總結：Dify 的核心價值

1. **視覺化** - 無需寫程式即可建置複雜 AI 工作流程
2. **模組化** - 豐富的節點類型，組合出任意業務邏輯
3. **RAG 支援** - 內建知識庫整合，讓 AI 回答更精準
4. **多模型支援** - 整合主流 LLM、Embedding、語音、圖片生成模型
5. **靈活部署** - 雲端或自架，多種發佈方式
6. **可觀測性** - 內建監控 Dashboard，支援外部分析工具整合
7. **開源** - 社群驅動，持續迭代
