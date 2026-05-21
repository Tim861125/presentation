# Dify Workflow API：請求與對應 Response 範例

以下整理 Dify Workflow API 常見請求與對應的回傳格式，方便你直接理解每個範例會拿到什麼結果。
實際回應欄位會依工作流設計、輸入內容、是否串流而有差異；官方文件指出，`blocking` 會回傳 `application/json`，`streaming` 會回傳 `text/event-stream` [web:28][web:30]。

---

## 1. blocking 模式：一般工作流執行

### Request

```json
{
  "inputs": {
    "topic": "AI workflow",
    "language": "zh-TW"
  },
  "response_mode": "blocking",
  "user": "tim"
}
```

### Response 範例

```json
{
  "task_id": "2f7d0b3f-8c1a-4c5f-9d4e-0a3e2c5d7f11",
  "workflow_run_id": "7c2b1f6d-9e8a-4f0a-91b3-6d8a9c2b4e55",
  "data": {
    "id": "7c2b1f6d-9e8a-4f0a-91b3-6d8a9c2b4e55",
    "workflow_id": "wf_123456",
    "status": "succeeded",
    "outputs": {
      "text": "這是一段關於 AI workflow 的中文摘要。"
    },
    "error": null,
    "elapsed_time": 3.24,
    "total_steps": 5,
    "created_at": 1713320000,
    "finished_at": 1713320003
  }
}
```

### 逐段解讀

- `task_id`：這次執行任務的識別碼，常用於串流或停止任務。
- `workflow_run_id`：這次 workflow 執行紀錄的 ID，可用來查詢執行結果。
- `data`：真正的工作流執行資訊。
- `status`: `"succeeded"`：代表工作流成功完成。
- `outputs`：最終輸出內容，通常是你在工作流最後節點產出的結果。
- `error`：失敗時會有錯誤訊息，成功時通常是 `null`。
- `elapsed_time`：執行耗時，單位通常是秒。
- `total_steps`：工作流總步數。
- `created_at` / `finished_at`：建立與完成時間戳。

---

## 2. streaming 模式：串流輸出

### Request

```json
{
  "inputs": {
    "topic": "Kubernetes",
    "style": "simple"
  },
  "response_mode": "streaming",
  "user": "tim"
}
```

### Response 範例

```text
event: workflow_started
data: {"task_id":"task_001","workflow_run_id":"run_001"}

event: node_started
data: {"node_id":"start","node_type":"start"}

event: text_chunk
data: {"text":"Kubernetes 是一套容器編排系統。"}

event: text_chunk
data: {"text":"它可以幫助你管理部署、擴縮與更新。"}

event: node_finished
data: {"node_id":"llm","status":"succeeded"}

event: workflow_finished
data: {
  "task_id":"task_001",
  "workflow_run_id":"run_001",
  "status":"succeeded",
  "outputs":{
    "text":"Kubernetes 是一套容器編排系統。它可以幫助你管理部署、擴縮與更新。"
  }
}
```

### 逐段解讀

- `workflow_started`：表示流程開始執行。
- `node_started`：某個節點開始跑。
- `text_chunk`：即時輸出的文字片段。
- `node_finished`：某個節點完成。
- `workflow_finished`：整個工作流結束。
- 最後的 `outputs.text`：代表完整結果。

### 重點

串流模式不是一次拿完整 JSON，而是持續收到事件流。
官方文件明確說明，`streaming` 會回傳 `text/event-stream` 與 `ChunkWorkflowEvent` 事件流 [web:28][web:30]。

---

## 3. 文件輸入：local_file

### Request

```json
{
  "inputs": {
    "file": {
      "type": "document",
      "transfer_method": "local_file",
      "upload_file_id": "file-123456"
    }
  },
  "response_mode": "blocking",
  "user": "tim"
}
```

### Response 範例

```json
{
  "task_id": "8f2a4a5d-2e99-4e41-9f8d-2c7e3d7f2c10",
  "workflow_run_id": "run_002",
  "data": {
    "id": "run_002",
    "status": "succeeded",
    "outputs": {
      "summary": "文件內容主要在說明 Dify Workflow API 的使用方式。"
    },
    "error": null,
    "elapsed_time": 6.81
  }
}
```

### 逐段解讀

- `file`：工作流接收的文件欄位。
- `type`: `"document"`：文件類型輸入。
- `transfer_method`: `"local_file"`：先上傳文件，再在 workflow 中使用。
- `upload_file_id`：上傳後的文件 ID。
- `outputs.summary`：工作流根據文件產生的摘要結果。

### 重點

這種回應的結構通常和一般 blocking 類似，差別只在 `inputs` 多了文件資訊。
官方文件有獨立說明 Workflow 檔案上傳與執行搭配使用的流程 [web:31][web:28]。

---

## 4. 文件輸入：remote_url

### Request

```json
{
  "inputs": {
    "file": {
      "type": "document",
      "transfer_method": "remote_url",
      "url": "https://example.com/report.pdf"
    }
  },
  "response_mode": "blocking",
  "user": "tim"
}
```

### Response 範例

```json
{
  "task_id": "b2db3f84-1d9a-4f43-a5bb-3c83f7c9f8c1",
  "workflow_run_id": "run_003",
  "data": {
    "id": "run_003",
    "status": "succeeded",
    "outputs": {
      "answer": "這份報告的重點是市場成長與產品策略。"
    },
    "error": null
  }
}
```

### 逐段解讀

- `transfer_method`: `"remote_url"`：直接讓 Dify 去抓網址上的文件。
- `url`：文件網址。
- `outputs.answer`：工作流的最終回答。

### 重點

這種方式適合公開可存取的文件，不需要你先透過 `/files/upload` 上傳。
只要工作流能成功讀取該 URL，就會得到類似 blocking 的 JSON 結果 [web:31][web:28]。

---

## 5. 查詢 workflow run

### Request

```http
GET /v1/workflows/run/run_002
```

### Response 範例

```json
{
  "id": "run_002",
  "workflow_id": "wf_123456",
  "status": "succeeded",
  "inputs": {
    "file": {
      "type": "document",
      "transfer_method": "local_file",
      "upload_file_id": "file-123456"
    }
  },
  "outputs": {
    "summary": "文件內容主要在說明 Dify Workflow API 的使用方式。"
  },
  "error": null,
  "elapsed_time": 6.81,
  "total_steps": 7,
  "created_at": 1713321000,
  "finished_at": 1713321007
}
```

### 逐段解讀

- `status`：這次執行是否成功。
- `inputs`：當時送進去的資料。
- `outputs`：工作流最後輸出。
- `elapsed_time`：耗時。
- `total_steps`：經過幾個節點。
- `created_at` / `finished_at`：時間資訊。

### 重點

這個 API 主要用來追蹤某次 workflow 執行情況，適合做後台查詢或除錯 [web:28][web:30]。

---

## 6. 停止串流任務

### Request

```http
POST /v1/workflows/tasks/task_001/stop
```

### Response 範例

```json
{
  "result": "success"
}
```

### 逐段解讀

- `task_001`：要停止的任務 ID。
- `result`: `"success"`：表示停止成功。

### 重點

這個 API 只適用於串流任務。
如果你是前端有「停止生成」按鈕，通常就會用這個接口 [web:28][web:30]。

---

## 7. 查詢 logs

### Request

```http
GET /v1/workflows/logs?keyword=summary&status=succeeded&page=1&limit=20
```

### Response 範例

```json
{
  "page": 1,
  "limit": 20,
  "total": 1,
  "data": [
    {
      "id": "run_002",
      "workflow_id": "wf_123456",
      "status": "succeeded",
      "created_at": 1713321000,
      "elapsed_time": 6.81
    }
  ]
}
```

### 逐段解讀

- `page`：目前頁數。
- `limit`：每頁筆數。
- `total`：總筆數。
- `data`：符合條件的 workflow 記錄列表。
- 每筆記錄包含執行 ID、workflow ID、狀態與時間。

### 重點

這個回應適合監控、除錯與日誌查詢 [web:28][web:30]。

---

## 8. 查詢 info 與 parameters

### Request

```http
GET /v1/info
GET /v1/parameters
```

### Response 範例：info

```json
{
  "name": "Workflow Demo",
  "description": "這是一個工作流示範應用",
  "tags": ["summary", "ai", "workflow"]
}
```

### Response 範例：parameters

```json
{
  "inputs": [
    {
      "name": "topic",
      "type": "string",
      "required": true
    },
    {
      "name": "language",
      "type": "string",
      "required": false
    }
  ]
}
```

### 逐段解讀

- `info`：提供應用基本資訊。
- `parameters`：提供工作流需要哪些輸入欄位。
- `inputs`：欄位清單。
- `required`：是否必填。

### 重點

這兩個 API 很適合拿來做動態表單或前端初始化 [web:28][web:30]。

---

## 9. 這些 response 的共通規則

不管是哪種範例，通常都可以先看這幾個重點：

- `status`：成功、失敗、執行中。
- `outputs`：最後結果。
- `error`：失敗原因。
- `workflow_run_id` 或 `task_id`：後續追蹤用。
- `response_mode` 決定回應型態：`blocking` 是 JSON，`streaming` 是事件流 [web:28][web:30]。

---

## 10. 簡單對照表

| 範例 | 回應型態 | 適合用途 |
|---|---|---|
| blocking 執行 | JSON | 單次生成、摘要、翻譯 |
| streaming 執行 | SSE event stream | 即時輸出、長文生成 |
| 文件輸入 | JSON | PDF、文件摘要、文件問答 |
| 查詢 run | JSON | 查狀態、查結果 |
| 停止任務 | JSON | 中止串流任務 |
| 查 logs | JSON | 除錯、監控 |
| info / parameters | JSON | 初始化、動態表單 |

---

## 11. 實務建議

如果你要寫前端或後端整合，最常見的做法是：

- 一般任務用 `blocking`。
- 需要即時效果用 `streaming`。
- 有文件就先上傳再傳 `upload_file_id`。
- 執行後把 `workflow_run_id` 存起來，方便追查。
- 串流任務保留 `task_id`，方便停止或取消。

---


```shell
curl -X POST 'http://localhost/v1/workflows/run' \
--header 'Authorization: Bearer app-rkKYlZ4HyQmnN5Bj0EaYp9Cd' \
--header 'Content-Type: application/json' \
--data-raw '{
  "inputs": {
    "user_question": "Good morning!"
  },
  "response_mode": "streaming",
  "user": "Tim"
}'
```
