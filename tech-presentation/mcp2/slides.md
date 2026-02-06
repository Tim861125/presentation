---
theme: default
background: https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832
class: text-center
highlighter: shiki
lineNumbers: false
---

# MCP Transport 技術分享

Model Context Protocol 傳輸層深度解析

---

# 什麼是 MCP？

**Model Context Protocol** - AI 應用與資料源之間的標準協議

- 基於 **JSON-RPC** 的通訊協議
- 讓 AI 模型可以安全地存取外部資源
- 統一的 tools、prompts、resources 介面

<br>

### 三種主要 Transport 方式

- **StdioClientTransport** - 本地程序通訊
- **SSEClientTransport** - 舊式事件推送模型
- **StreamableHTTPClientTransport** - 新一代 HTTP 串流模型

---

# StdioClientTransport

本地程序間通訊，適合桌面應用整合

```ts
import { createMCPClient } from '@ai-sdk/mcp';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const mcpClient = await createMCPClient({
  transport: new StdioClientTransport({
    command: 'node',
    args: ['src/stdio/dist/server.js'],
  }),
});
```

**特點**
- 使用 stdin/stdout 通訊
- 低延遲、高效能
- 適合 Claude Desktop、VS Code 等桌面應用

---

# SSEClientTransport

基於 Server-Sent Events 的傳輸方式

```ts
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const client = new Client({
  name: 'sse-client',
  version: '1.0.0'
});

const transport = new SSEClientTransport(new URL(baseUrl));
await client.connect(transport);
```

**設計理念**
- Client 用 HTTP **送 request**
- Server 用 **長連線單向推事件**
- 本質是「事件流」，不是傳統的 RPC 通道

---

# StreamableHTTPClientTransport

新一代 HTTP streaming 傳輸方式

```ts
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

const url = new URL("https://mcp.example.com/");
url.searchParams.set("apiKey", "YOUR_API_KEY");

const transport = new StreamableHTTPClientTransport(url.toString());
const client = new Client({ name: "My App", version: "1.0.0" });
await client.connect(transport);
```

**設計理念**
- **所有 MCP JSON-RPC 訊息都走同一套 HTTP 機制**
- Request / Response / Progress / Notification 全部統一
- 本質是「完整的 RPC over HTTP streaming」

---

# 連線模型對比

### SSEClientTransport - 雙連線架構

```
Client
  |---- POST /message ----> Server
  |
  |==== GET /events (SSE) ======>
       (server 不斷推事件)
```

- **兩條連線**：一條送訊息，一條收事件
- SSE 是 **單向（server → client）**

### StreamableHTTPClientTransport - 單連線架構

```
Client
  |==== POST /rpc (streaming) ====>
  |<=== response / progress (stream) ===
```

- **一條 HTTP request** 搞定所有通訊
- 雙方可在同一 stream 中「輪流講話」

---

# 能力對比表

| 面向 | SSEClientTransport | StreamableHTTPClientTransport |
|------|-------------------|------------------------------|
| 傳輸模型 | HTTP + SSE | HTTP streaming |
| 連線數 | 至少 2 條 | 1 條 |
| 傳輸方向 | SSE 單向 | 雙向 |
| Progress 支援 | ⚠️ 勉強可做 | ✅ 原生設計 |
| JSON-RPC 對齊 | 不完整 | ✅ 完整對齊 MCP |
| 瀏覽器支援 | ✅ 非常好 | ✅ fetch streaming |
| 防火牆友善度 | ⚠️ SSE 偶爾被擋 | ✅ 跟一般 HTTP 一樣 |
| 官方推薦度 | ❌ legacy | ⭐⭐⭐⭐⭐ |

---

# 為什麼 SSE 會被淘汰？

### SSE 的結構性問題

**1. 不是為 RPC 設計**
- MCP 是 JSON-RPC，SSE 是 event-based
- 語意不匹配

**2. 連線管理複雜**
- Message 一條、Events 一條
- 需要同步兩條連線的狀態

**3. 錯誤處理麻煩**
- 哪一條斷線？重連要不要 replay？

**4. 擴展性差**
- Tool call、Progress、Cancellation 都很卡

---

# Streamable HTTP 解決了什麼？

### 核心優勢

✅ **單一通道** - 減少連線管理複雜度

✅ **原生支援 streaming response** - Progress 是一等公民

✅ **完整的 RPC 語意** - Request/Response/Notification 統一

✅ **基礎設施友善** - LB / Proxy / Cloudflare 都支援

✅ **MCP Spec 原生設計** - SDK 完全圍繞它打造

---

# 應用情境選擇

### StdioClientTransport

- ✅ 桌面應用（Claude Desktop、VS Code）
- ✅ 本地工具整合
- ✅ 需要極低延遲的場景

### SSEClientTransport

- ⚠️ 舊版 MCP server 向後相容
- ⚠️ 已有 SSE 基礎設施的系統
- ❌ **不建議用於新專案**

### StreamableHTTPClientTransport

- ✅ **所有新專案的首選**
- ✅ 雲端服務、Web 應用
- ✅ 需要 progress tracking 的長時間操作
- ✅ 跨網域、企業環境部署

---

# 程式碼對比：初始化

### SSEClientTransport（舊式）

```ts
const client = new Client({ name: 'sse-client', version: '1.0.0' });
const transport = new SSEClientTransport(new URL(url));
await client.connect(transport);
// 需要處理兩條連線的生命週期
```

### StreamableHTTPClientTransport（新式）

```ts
const client = new Client({ name: 'My App', version: '1.0.0' });
const transport = new StreamableHTTPClientTransport(url);
await client.connect(transport);
// 單一連線，簡單明瞭
```

---

# 程式碼對比：錯誤處理

### SSEClientTransport - 需要處理多個連線點

```ts
try {
  await client.connect(transport);
} catch (error) {
  // POST 連線失敗？
  // SSE 連線失敗？
  // 重連策略需要分別處理
}
```

### StreamableHTTPClientTransport - 統一錯誤處理

```ts
try {
  await client.connect(transport);
} catch (error) {
  // 單一連線點，錯誤處理清晰
  // 標準 HTTP 錯誤碼
}
```

---

# 演化歷程

### 第一代：SSE

- 解決「如何讓 server 主動推送」的問題
- 利用現有 Web 技術快速實現
- 但不是為 RPC 設計

### 第二代：Streamable HTTP

- 解決「如何把 MCP 變成真正的 RPC 協議」
- 重新設計傳輸層語意
- 完整支援 MCP 的所有特性

**官方方向明確：Streamable HTTP 是未來，SSE 是相容用途**

---

# 總結

### 一句話記住差異

**SSEClientTransport** 是「舊式的事件推送模型」

**StreamableHTTPClientTransport** 是「新一代、統一在 HTTP 上的全雙工串流模型」

<br>

### 建議

- 新專案直接使用 **StreamableHTTPClientTransport**
- 本地桌面應用使用 **StdioClientTransport**
- 只在必須向後相容時才使用 **SSEClientTransport**

---
layout: center
class: text-center
---

# Thanks

MCP Transport 技術分享
