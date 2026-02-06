---
theme: default
background: https://cover.sli.dev
class: text-center
highlighter: shiki
lineNumbers: false
---

# 檢索通 MCP 測試紀錄

---

# 測試環境設定

**共同參數**
- baseURL: `http://192.168.50.91:8000`
- model: `qwen3`
- temperature: `0.7`
- top_p: `0.9`
- top_k: `20`
- repeat_last_n: `64`
- repeat_penalty: `1.2`

**變數**
- Tool Call Parser 行為差異
- Stream vs Non-Stream 模式

---

# Part 1: qwen-tool-call Parser

### 測試參數
- tool-call-parser: `qwen-tool-call`
- stream: `false`

### 問題現象
Response 的 `tool_calls` 陣列為空，實際內容在 `content` 中

```json
{
  "message": {
    ...
    "role": "assistant",
    "content": "<tool_call>\n{\"name\": \"get-patents-count\", \"arguments\": {\"query\": \"TAC:(SQL)\"}}\n</tool_call>",
    "tool_calls": []
    ...
  }
}
```

> Tool call 需處理 XML 格式

---

# Part 2: Hermes Parser (Non-Stream)

### 測試參數
- tool-call-parser: `hermes`
- stream: `false`

### 行為改善
VLLM 正確回傳預期的 `tool_calls` 結構

```json
{
  "message": {
    "role": "assistant",
    "content": null,
    "tool_calls": [{
      "id": "chatcmpl-tool-93c7d9e48d193169",
      "type": "function",
      "function": {
        "name": "query-upat-patent-count",
        "arguments": "{\"query\": \"TAC:(...)\"}"
      }
    }]
  },
  "finish_reason": "tool_calls"
}
```

---

# Part 2: Tool Call 範例

### 完整的 Tool Call Arguments
```json
{
  "query": "TAC:(\"LED\" \"light emitting diode\" \"發光二極體\") AND IPC:(H01L33*)",
  "countries": ["TW", "US", "CN", "JP", "KR", "EP", "WO"],
  "source": ["ISN", "PN", "APN", "TTL", "ISD", "PD", "APD", "DOCKIND"],
  "aggs": ["po_agg", "deducedOwner_agg", "publishedYear_agg"],
  "docdbCountries": [],
  "docKind": "all",
  "patentType": "all",
  "aplType": ["invention", "model", "design"],
  "legalStatus": ["valid", "overdue", "public"]
}
```

**優點**: 標準 OpenAI-compatible 格式，無需手動解析

---

# Part 3: Hermes Parser (Stream Mode)

### 測試參數
- tool-call-parser: `hermes`
- stream: `true`

### 兩種回應模式

**情況 1: Tool Call (Stream)**
- Tool name 在 `choices.delta.tool_calls.function.name`
- Arguments 逐字串流在 `choices.delta.tool_calls.arguments`

**情況 2: 一般內容 (Stream)**
- 文字內容在 `choices.delta.content`
- 逐字輸出

---

# Stream Mode: Tool Call 範例

### SSE Stream Output
```
data: {..."choices":[{"delta":{"role":"assistant","content":""}}]...}

data: {..."choices":[{"delta":{"tool_calls":[{"id":"...","type":"function","function":{"name":"query-upat-patent-count"}}]}}]...}

data: {..."choices":[{"delta":{"tool_calls":[{"function":{"arguments":"{\"query\": \""}}]}}]...}

data: {..."choices":[{"delta":{"tool_calls":[{"function":{"arguments":"T"}}]}}]}...

data: {..."choices":[{"delta":{"tool_calls":[{"function":{"arguments":"AC"}}]}}]...}

...

data: [DONE]
```

**特性**: Arguments 以逐字元方式串流傳輸

---

# Stream Mode: 一般內容範例

### SSE Stream Output
```
data: {..."choices":[{"delta":{"role":"assistant","content":""}}]...}

data: {..."choices":[{"delta":{"content":"針對"}}]...}

data: {..."choices":[{"delta":{"content":"「"}}]...}

data: {..."choices":[{"delta":{"content":"LED"}}]...}

data: {..."choices":[{"delta":{"content":"」"}}]...}

...

data: [DONE]
```

**特性**: 內容在 `delta.content` 中逐字傳輸
