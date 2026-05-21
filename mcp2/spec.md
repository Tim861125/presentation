# MCP 技術分享報告規格

## 此專案使用 slidev 呈現報告
- 注意版面長度，不要超過螢幕長度

## 首頁格式

```
theme: default
background: https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832
class: text-center
highlighter: shiki
lineNumbers: false
```

## 內容規範
- 簡潔有力
- 不要使用過多 icon 呈現
- 使用簡潔的範例呈現
- 報告內容大約 20 頁
- 內容不用使用 click 功能

## 參考內容
### 比較以下三種 transport
#### StdioClientTransport

- https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools

```
import { createMCPClient } from '@ai-sdk/mcp';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
// Or use the AI SDK's stdio transport:
// import { Experimental_StdioMCPTransport as StdioClientTransport } from '@ai-sdk/mcp/mcp-stdio';

const mcpClient = await createMCPClient({
  transport: new StdioClientTransport({
    command: 'node',
    args: ['src/stdio/dist/server.js'],
  }),
});
```

#### SSEClientTransport
- https://transdocs.org/SDK/modelcontextprotocol-typescript-sdk
```
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
let client: Client|undefined = undefined
const baseUrl = new URL(url);
try {
  client = new Client({
    name: 'streamable-http-client',
    version: '1.0.0'
  });
  const transport = new StreamableHTTPClientTransport(
    new URL(baseUrl)
  );
  await client.connect(transport);
  console.log("使用可流式 HTTP 传输已连接");
} catch (error) {
  // 如果返回 4xx 错误，则尝试使用较旧的 SSE 传输
  console.log("可流式 HTTP 连接失败，回退到 SSE 传输");
  client = new Client({
    name: 'sse-client',
    version: '1.0.0'
  });
  const sseTransport = new SSEClientTransport(baseUrl);
  await client.connect(sseTransport);
  console.log("使用 SSE 传输已连接");
}
```

#### StreamableHTTPClientTransport

- https://connectsafely.ai/docs/integrations/mcp-server/typescript-sdk?utm_source=chatgpt.com

```
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"
import { Client } from "@modelcontextprotocol/sdk/client/index.js"

// Construct server URL with authentication
const url = new URL("https://mcp.connectsafely.ai/")
url.searchParams.set("apiKey", "YOUR_API_KEY")
const serverUrl = url.toString()

const transport = new StreamableHTTPClientTransport(serverUrl)

// Create MCP client
const client = new Client({
  name: "My App",
  version: "1.0.0"
})
await client.connect(transport)

// List available tools
const tools = await client.listTools()
console.log(`Available tools: ${tools.map(t => t.name).join(", ")}`)
```

### 特別比較 SSEClientTransport 與StreamableHTTPClientTransport


##### 一句話先講重點

> **SSEClientTransport 是「舊式的事件推送模型」**
> **StreamableHTTPClientTransport 是「新一代、統一在 HTTP 上的全雙工串流模型」**

官方方向非常明確：
👉 **Streamable HTTP 是未來**，SSE 是 **相容用、legacy**

---

##### 一、設計理念上的差別

###### 🧓 SSEClientTransport

* 基於 **Server-Sent Events**
* 核心想法是：

  * client 用 HTTP **送 request**
  * server 用 **一條長連線單向推事件**
* 本質是「**事件流**」，不是完整的 RPC 通道

###### 🆕 StreamableHTTPClientTransport

* 基於 **HTTP streaming（fetch + ReadableStream）**
* 核心想法是：

  * **所有 MCP JSON-RPC 訊息都走同一套 HTTP 機制**
  * request / response / progress / notification 全部統一
* 本質是「**完整的 RPC over HTTP streaming**」

👉 MCP spec 後期就是圍繞 Streamable HTTP 設計的

---

##### 二、連線模型差異（這段很適合畫圖）

###### SSEClientTransport 的連線結構

```
Client
  |---- POST /message ----> Server
  |
  |==== GET /events (SSE) ======>
       (server 不斷推事件)
```

特點：

* **兩條連線**
* SSE 是 **單向（server → client）**
* client 不能在 SSE 上送東西

---

###### StreamableHTTPClientTransport 的連線結構

```
Client
  |==== POST /rpc (streaming) ====>
  |<=== response / progress / notify (stream) ===
```

特點：

* **一條 HTTP request**
* 雙方都可以在同一條 stream 中「輪流講話」
* 非常像「HTTP 版 WebSocket」

---

##### 三、能力與行為差異（重點表格）

| 面向                           | SSEClientTransport | StreamableHTTPClientTransport |
| ---------------------------- | ------------------ | ----------------------------- |
| 傳輸模型                         | HTTP + SSE         | 純 HTTP streaming              |
| 連線數                          | 至少 2 條             | 1 條                           |
| 傳輸方向                         | SSE 單向             | 雙向                            |
| 支援 progress / partial result | ⚠️ 勉強可做            | ✅ 原生設計                        |
| JSON-RPC 對齊程度                | 不完整                | ✅ 完整對齊 MCP                    |
| 瀏覽器支援                        | ✅ 非常好              | ✅（fetch streaming）            |
| 防火牆 / proxy 友善度              | ⚠️ SSE 偶爾被擋        | ✅ 跟一般 HTTP 一樣                 |
| 官方推薦度                        | ❌ legacy           | ⭐⭐⭐⭐⭐                         |

---

##### 四、為什麼 SSE 會被淘汰？

這點在分享中講，大家會很有感 😄

###### SSE 的結構性問題

1. **不是為 RPC 設計**

   * MCP 是 JSON-RPC
   * SSE 是 event-based
2. **連線管理複雜**

   * message 一條
   * events 一條
3. **錯誤處理很麻煩**

   * 哪一條斷線？
   * reconnect 要不要 replay？
4. **擴展性差**

   * tool call、progress、cancellation 都很卡

👉 結論：
SSE 是「被拿來用」，但不是「為 MCP 而生」

---

##### 五、Streamable HTTP 解決了什麼？

###### StreamableHTTPClientTransport 的優點

* ✅ **單一通道**
* ✅ **原生支援 streaming response**
* ✅ **progress / tool result / notification 都是一等公民**
* ✅ **容易被 infra 接受（LB / proxy / Cloudflare）**
* ✅ **Spec 跟 SDK 都圍繞它設計**

這也是為什麼你現在看 MCP 的新文件、新範例，幾乎只剩它。

---

##### 六、什麼情況還會用 SSEClientTransport？

老實說，只剩這些情境：

* 🔧 **舊版 MCP server**
* 🔁 **向後相容**
* 🧪 **快速 demo / debug**
* 🏗️ 已經有一整套 SSE infra，短期不想改

> 如果是「新系統 / 新分享 / 教學」
> 👉 **直接主推 StreamableHTTPClientTransport**

---

##### 七、技術分享可以怎麼包裝（給你一個講法）

你可以這樣收尾：

> 「SSEClientTransport 解決的是 *『怎麼讓 server 主動講話』*
> StreamableHTTPClientTransport 解決的是 *『怎麼把 MCP 變成真正的 RPC 協議』*」

如果你要，我也可以幫你：

* 做一張 **SSE vs Streamable HTTP 架構圖**
* 幫你寫 **兩段最小 client code 對照**
* 幫你設計 **簡報大綱（10–15 分鐘那種）**

你這場分享是偏 **infra / protocol / frontend / AI toolchain** 哪個方向？我可以再幫你微調講法。

- https://mcp-docs.cn/specification/2025-11-25/basic/transports
- https://mcp-docs.cn/specification/2025-11-25/basic/transports?utm_source=chatgpt.com