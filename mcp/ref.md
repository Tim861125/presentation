在 MCP（Model Context Protocol）裡，**Host、Client、Server 是三個不同角色，組成一個「AI + 工具」的三層架構**。可以先記一個順口溜：**Host 管 AI、Client 管通訊、Server 管工具**。

***

## 三者一句話總整理

- MCP Host：跑 LLM（例如 Claude）並決定「要不要叫工具來幫忙」的那個應用程式。
- MCP Client：Host 裡面的「通訊模組」，專門負責跟某一個 MCP Server 建立與維持連線。
- MCP Server：包裝某個外部能力（資料庫、API、檔案系統、瀏覽器…）的服務，等 Client 來呼叫它做事。

這三個角色常見的說法與職責可見於多篇 MCP 架構介紹與技術文章。 [blog.logto](https://blog.logto.io/zh-HK/what-is-mcp)

***

## MCP Host 是什麼？

Host 可以把它想像成「AI 應用本體」與「指揮中心」：

- 典型例子：Claude Desktop、內建 AI 的程式碼編輯器（例如某些 IDE）、或你自己寫的一個 AI App。 [realnewbie](https://realnewbie.com/posts/mcp-introduction-part-2-host-client-server-three-major-roles-and-architecture-analysis)
- 主要工作：
  - 執行 LLM：接收使用者輸入，產生回應。
  - 決策與編排：判斷何時需要用工具（例如：讀檔案、查資料庫、呼叫 HTTP API）。 [ibest.com](https://www.ibest.com.tw/news-detail/what-is-mcp/)
  - 管理多個 Client：一個 Host 可以同時維護多個 MCP Client 連線，對接不同的 Server。 [realnewbie](https://realnewbie.com/posts/mcp-introduction-part-2-host-client-server-three-major-roles-and-architecture-analysis)

**重點觀念**：Host 自己不直接跟外部服務講話，而是透過「Client → Server」這條管線去操作工具。 [realnewbie](https://realnewbie.com/posts/mcp-introduction-part-2-host-client-server-three-major-roles-and-architecture-analysis)

***

## MCP Client 是什麼？跟 MCP Server 的關係？

Client 是 MCP 世界裡的「協議翻譯官 + 專線通訊模組」。

### Client 的角色

- 位在 Host 裡面，是 Host 的一個元件，而不是獨立給使用者操作的程式。 [blog.logto](https://blog.logto.io/zh-HK/what-is-mcp)
- 功能：
  - 跟特定 MCP Server 建立與維持連線（包含握手、能力宣告等）。 [cnblogs](https://www.cnblogs.com/fnng/p/18744210)
  - 轉換格式：
    - Host → Client：把 Host 的高階請求轉成 MCP 規範的 JSON-RPC 形式。
    - Server → Client：把 Server 的回應轉成 Host 能理解的結構。 [blog.logto](https://blog.logto.io/zh-HK/what-is-mcp)
  - 記錄 Server 能做的事（有哪些 tools、resources 等），方便 Host 之後呼叫。 [realnewbie](https://realnewbie.com/posts/mcp-introduction-part-2-host-client-server-three-major-roles-and-architecture-analysis)

### Client 與 Server 的連線關係

- 常見且重要的一點：**一個 MCP Client 通常只連到一個 MCP Server，是一對一的專線關係**。 [x](https://x.com/MannyNewsletter/status/1902907023685193953)
- 但 Host 可以同時擁有多個 Client，因此整體結構會長成：

  - Host 裡面：Client1、Client2、Client3…
  - 各自連到：Server1、Server2、Server3…
    相關架構圖與說明在多篇 MCP 角色解析文章中反覆提到。 [techblog.lycorp.co](https://techblog.lycorp.co.jp/zh-hant/introduction-to-mcp-and-building-mcp-server-using-line-messaging-api)

***

## MCP Server 是什麼？跟 Host / Client 的關係？

MCP Server 可以粗略想像成「遵守 MCP 規格的工具／API 伺服器」。

### Server 的角色

- 專門負責「實際去碰外部世界」：
  - 查資料庫、讀寫檔案系統、呼叫外部 HTTP API、操作瀏覽器等等。 [techblog.lycorp.co](https://techblog.lycorp.co.jp/zh-hant/introduction-to-mcp-and-building-mcp-server-using-line-messaging-api)
- 對內（面向 Client）：
  - 使用 MCP（基於 JSON-RPC 2.0）的標準格式收發請求/回應。 [cnblogs](https://www.cnblogs.com/fnng/p/18744210)
  - 被動回應：通常只有在 Client 呼叫時才回覆，不會隨便亂丟訊息。 [realnewbie](https://realnewbie.com/posts/mcp-introduction-part-2-host-client-server-three-major-roles-and-architecture-analysis)
- 對外（面向實際資源）：
  - 用各種協定（TCP、HTTPS、檔案系統呼叫等）跟真實系統互動。 [techblog.lycorp.co](https://techblog.lycorp.co.jp/zh-hant/introduction-to-mcp-and-building-mcp-server-using-line-messaging-api)

### Server 與 Host 的間接關係

- Host 不直接對 Server 發送請求，而是透過 Client：
  使用者 → Host (LLM) → Client → Server → 外部系統 → Server → Client → Host → 回覆給使用者。 [blog.logto](https://blog.logto.io/zh-HK/what-is-mcp)
- 同一個 MCP Server 可以被多個 Host 透過各自的 Client 連上，因此擴展性很好。 [cnblogs](https://www.cnblogs.com/fnng/p/18744210)

***

## 三者關係總圖與比喻

可以用一個簡化比喻來記：

- Host = 公司裡的「專案經理 + AI 腦袋」
- Client = 公司對外的「專線窗口、翻譯」
- Server = 外包廠商（資料庫服務商、雲端 API、檔案系統操作程式）

實際資料流大致如下（方向自上而下）： [blog.logto](https://blog.logto.io/zh-HK/what-is-mcp)

1. 使用者輸入需求給 Host。
2. Host 的 LLM 理解後，決定需要用哪些工具（哪些 MCP Server）。
3. Host 指示對應的 MCP Client。
4. MCP Client 跟對應的 MCP Server 交換 MCP 訊息。
5. MCP Server 去操作外部系統，取得結果，再透過 Client 回傳給 Host。
6. Host 把多個工具結果整合，產生最後回應給使用者。

如果你之後想更技術向，例如「要自己寫一個 MCP Client / MCP Server」或「想知道傳輸模式（例如 STDIO、TCP、WebSocket）」等，可以再問更細一點，能用比較貼近實作的角度說明。



是的，**在 MCP 架構中，一個 MCP Client 與一個 MCP Server 之間的連線關係，理論上是「一對一」的專屬連線**。 [skywork](https://skywork.ai/skypage/zh-hant/MCP-Server-%E6%AC%8A%E5%A8%81%E6%8C%87%E5%8D%97%EF%BC%9A%E7%82%BA-AI-%E5%B7%A5%E7%A8%8B%E5%B8%AB%E6%89%93%E9%80%A0%E7%9A%84%E6%B7%B1%E5%BA%A6%E8%A7%A3%E6%9E%90/1972812054954831872)

### 什麼意思？

- **一個 Client 只連一個 Server**：
  - 每個 MCP Client 會選擇一個特定的 MCP Server（例如「本地檔案系統」伺服器或「Notion API」伺服器），並與它建立專屬、持久的連線。 [informalwriting](https://www.informalwriting.cc/p/model-context-protocol)
  - 這條連線只用來與這個 Server 交換 MCP 訊息（JSON‑RPC），不會拿去連別的 Server。

- **一個 Host 可以有很多 Client**：
  - Host（例如 Claude Desktop、VS Code）可以同時啟動多個 MCP Client，每個 Client 各自對應一個 Server。
  - 例如：ClientA 連 GitHub Server，ClientB 連本地檔案 Server，ClientC 連資料庫 Server，這時 Host 內部是「多個 Client 對多個 Server」，但每個 Client‑Server 之間仍是一對一。 [blog.csdn](https://blog.csdn.net/ChinaLiaoTian/article/details/149278074)

- **一個 Server 可以被多個 Client 連接**：
  - 一個 MCP Server 可以同時被多個 Host 的 Client 連上，也就是「一個 Server 對多個 Client」，但每個 Client 仍然只對應一個 Server。 [ikala](https://ikala.ai/zh-tw/blog/ikala-ai-insight/an-in-depth-analysis-of-googles-a2a-protocol-and-its-relationship-with-anthropics-mcp-ch/)

### 一句話總結

- 「**Client 與 Server 之間是『一對一連線』，但 Host 可以開啟多組這種一對一連線；一個 Server 也可以服務多個 Client。**」 [blog.csdn](https://blog.csdn.net/ChinaLiaoTian/article/details/149278074)

如果你會動到實作，例如寫一個 MCP Client 或 Server，這種一對一設計會讓協議、狀態管理與資源追蹤都比較乾淨好控管。