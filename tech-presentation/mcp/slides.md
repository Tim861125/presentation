---
theme: default
background: https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832
class: text-center
highlighter: shiki
lineNumbers: false
---

# Model Context Protocol (MCP)


PART 1 概念介紹

---

# 什麼是 MCP？

<br>

- 由 **Anthropic** 開發並開源
- **開放式協定**，讓 AI 應用與外部資源連接
- **標準化**整合方式，不用每個 AI App 都重新造輪子

---

# 為什麼需要 MCP？

## 傳統方式的問題

```
AI App 1 ──> 自定義連接器 ──> Database
AI App 2 ──> 自定義連接器 ──> API
AI App 3 ──> 自定義連接器 ──> Files
```

## MCP 的解決方案

```
AI App 1 ──┐
AI App 2 ──┤──> MCP Protocol ──> MCP Servers ──> Resources
AI App 3 ──┘
```

---

# Host、Client、Server 關係

Host 不直接碰外部系統，都透過 Client → Server


- Host 管 AI
- Client 管通訊
- Server 管工具

---

## 三個角色的職責

**MCP Host** - AI 應用本體
- 執行 LLM（例如 Claude）並決定要不要叫工具來幫忙
- 範例：Claude Desktop、VS Code、IDE

**MCP Client** - 通訊模組
- Host 裡面的元件，負責跟某一個 MCP Server 建立與維持連線
- 轉換格式：Host ↔ Client ↔ Server

**MCP Server** - 工具提供者
- 包裝外部能力（資料庫、API、檔案系統）的服務
- 等 Client 來呼叫它做事

---

# 連線關係：一對一專線

## 重要觀念

- **一個 Client 連一個 Server**
- **一個 Host 可以有多個 Client**
- **一個 Server 可以被多個 Client 連接**

```
┌────────────────────────────────────┐
│  Claude Desktop (Host)             │
│                                    │
│  Client A ──┐                      │
│  Client B ──┤  (Host 內的通訊模組)   │
│  Client C ──┘                      │
└─────┬───────┬────────┬─────────────┘
      │       │        │
      │       │        │
      │       │        │
   ┌──┴──┐ ┌──┴───┐ ┌──┴───┐
   │ FS  │ │ DB   │ │ API  │
   │ Srv │ │ Srv  │ │ Srv  │
   └─────┘ └──────┘ └──────┘
```

---

# 用比喻理解三者關係

**Host** = 公司裡的「專案經理 + AI 腦袋」
- 決策中心，決定要做什麼

**Client** = 公司對外的「專線窗口、翻譯」
- 負責溝通協調，轉換格式

**Server** = 外包廠商
- 資料庫服務商、雲端 API、檔案系統操作程式

---

# 資料流

```
使用者輸入
    ↓
Host (LLM 理解並決定需要哪些工具)
    ↓
MCP Client (轉換成 MCP 協議)
    ↓
MCP Server (操作外部系統)
    ↓
外部系統 (資料庫、檔案、API...)
    ↓
MCP Server (回傳結果)
    ↓
MCP Client (轉換格式)
    ↓
Host (整合結果並產生回應)
    ↓
回覆給使用者
```

---

# 核心概念：Resources

## AI 可以讀取資源

Resources 讓 AI 取得外部資訊

```typescript
{
  uri: "file:///project/readme.md",
  name: "README",
  mimeType: "text/markdown",
  description: "專案說明文件"
}
```

**Ex:**
- 專案文件內容
- 資料庫查詢結果
- API 回應資料

---

# 核心概念：Tools

## 工具 - AI 可以執行的動作

Tools 讓 AI 主動操作外部系統

```typescript
{
  name: "search_database",
  description: "搜尋資料庫",
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string" }
    }
  }
}
```

**Ex:**

- 執行 SQL 查詢
- 創建或修改檔案
- 發送 HTTP 請求

---

# 核心概念：Prompts

## 提示 - 可重複使用的對話模板

Prompts 讓 Server 提供預設的工作流程

```typescript
{
  name: "code_review",
  description: "程式碼審查模板",
  arguments: [
    {
      name: "file_path",
      description: "要審查的檔案路徑",
      required: true
    }
  ]
}
```

**Ex:**
- 程式碼審查流程
- 文件生成模板
- 常用任務腳本

---

# Client 實作範例

Host 內的 Client 負責與 Server 溝通

```typescript
import { Client } from '@modelcontextprotocol/sdk/client';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import appConfig from '../../config';

export const mcpClient = new Client(
  { name: "bun-agent", version: "1.0.7" },
  { capabilities: {} }
);

export async function initMcp() {
  const url = appConfig.upatUrl
  const transport = new StreamableHTTPClientTransport(new URL(url));

  await mcpClient.connect(transport);
}
```

---

# Server 實作範例

Server 包裝外部能力，等待 Client 呼叫

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// 建立 Server
const server = new McpServer({
  name: "LTC",
  version: packageJson.version,
});
```

---

# Server 實作範例

```typescript
// 註冊
server.registerTool(
  "search-query",
  {
    title: "Patent Query search",
    description: "Use query search patent",
    inputSchema: {
      query: z.string().describe(
        "Patent search query, ex: TAC:(LED \"light emitting diode\") AND IPC:(H01L033* G02F001* H05B045*)"
      ),
    },
  },
  async ({ query }) => {
    const result = await searchQuery({ query });

    return {
      content: [{
        type: "text",
        text: "Query syntax is valid, ready to perform search.",
      }],
    };
  },
);
```

---

# 傳輸層

Client 與 Server 建立連線

## Standard I/O
```typescript
const transport = new StdioClientTransport({
  command: "node",
  args: ["server.js"]
});
```

<br>
<br>
<br>

## HTTP with SSE
```typescript
const transport = new StreamableHTTPClientTransport(
  new URL("http://localhost:3000/sse")
);
```

---

# 實際應用場景

MCP 讓 AI 能做的事變多了

- **開發工具整合**
  IDE 讀取專案文件、連接資料庫、執行測試

- **數據分析**
  AI 助手分析公司內部資料、產生報表

- **企業應用**
  整合知識庫、搜尋內部文件

- **自動化工作流程**
  執行特定業務邏輯、串接多個系統

---
layout: end
---

# Thanks

---
layout: end
---

## Ref
<div style="font-size: 0.8em; text-align: center; margin-top: 2em;">

MCP Architecture: https://modelcontextprotocol.io/docs/learn/architecture

Client Concepts: https://modelcontextprotocol.io/docs/learn/client-concepts

Server Concepts: https://modelcontextprotocol.io/docs/learn/server-concepts

MCP 架構解析: https://hackmd.io/@thc1006/mcp-whitepaper-home/%2F%40thc1006%2Fmcp-client-server-architecture
</div>
