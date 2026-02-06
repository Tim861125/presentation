# 檢索通 MCP 紀錄
## Part 1

**參數**
- baseURL: `http://192.168.50.91:8000`
- model: `qwen3`
- tool-call-parser: `qwen-tool-call`
- stream: `false`
- temperature: `0.7`
- top_p: `0.9`
- top_k: `20`
- repeat_last_n: `64`
- repeat_penalty: `1.2`

**情況**
- Response 的 tool_calls 未解析，且放在 content 裡面

**User question: SQL**

**Request 1**

<details>
<summary>
  Expand request 1
</summary>

```
{
  "model": "qwen3",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant. If a tool is relevant, you MUST call it using <tool_call> XML format and do not answer directly."
    },
    {
      "role": "user",
      "content": 您好，我需要您的協助來建立一個專業的檢索條件...
    }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get-patents-count",
        "description": "Get the total number of patents that match a specific keyword or query. Use this tool when you want to find how many patents exist for a given topic or term.",
        "parameters": {
          "type": "object",
          "properties": {
            "query": {
              "type": "string",
              "description": "Keyword or query string must follow Lucene syntax for patent searching (e.g., TAC:('electric vehicle') AND IPC:(B60L* B60K006* B60W010* H02J007* H02M* B60R016* B60R011*)). This field is required."
            }
          },
          "required": [
            "query"
          ]
        }
      }
    }
  ],
  "temperature": 0.7,
  "max_tokens": 1000
}

```

</details>

**Response 1**

<details>
<summary>
  Expand response 1
</summary>

```
{
  "id": "chatcmpl-9046cb3c6542c961",
  "object": "chat.completion",
  "created": 1768204659,
  "model": "qwen3",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "<tool_call>\n{\"name\": \"get-patents-count\", \"arguments\": {\"query\": \"TAC:(SQL)\"}}\n</tool_call>",
        "refusal": null,
        "annotations": null,
        "audio": null,
        "function_call": null,
        "tool_calls": [],
        "reasoning": null,
        "reasoning_content": null
      },
      "logprobs": null,
      "finish_reason": "stop",
      "stop_reason": null,
      "token_ids": null
    }
  ],
  "service_tier": null,
  "system_fingerprint": null,
  "usage": {
    "prompt_tokens": 3801,
    "total_tokens": 3828,
    "completion_tokens": 27,
    "prompt_tokens_details": {
      "cached_tokens": 3792
    }
  },
  "prompt_logprobs": null,
  "prompt_token_ids": null,
  "kv_transfer_params": null
}
```

</details>

**Log**

<details>
<summary>
  Expand log
</summary>

```
[VLLM Client] Calling MCP tool: get-patents-count({"query":"TAC:(SQL)"})
[VLLM Client] MCP tool result: Total patents count: 266
 (Query: TAC:(SQL))
[VLLM Client] Tool results: [
  {
    "role": "tool",
    "content": "Total patents count: 266 \n (Query: TAC:(SQL))"
  }
]
[VLLM Client] Returning results to model...
[VLLM Client] Replacing user message with prompt2 (patent count: 266)
```

</details>

**Request 2**

<details>
<summary>
  Expand request 2
</summary>

```
{
  "model": "qwen3",
  "messages": [
    {
      "role": "system",
      "content": "You are a helpful assistant. If a tool is relevant, you MUST call it using <tool_call> XML format and do not answer directly."
    },
    {
      "role": "user",
      "content": # 專家級專利檢索條件句優化代理人\n## 角色與任務\n你是一位頂尖的專利檢...
    },
    {
      "role": "assistant",
      "content": null,
      "tool_calls": [
        {
          "id": "call_1768204660150",
          "type": "function",
          "function": {
            "name": "get-patents-count",
            "arguments": "{\"query\":\"TAC:(SQL)\"}"
          }
        }
      ]
    },
    {
      "role": "tool",
      "content": "Total patents count: 266 \n (Query: TAC:(SQL))"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 1000
}
```

</details>

**Response 2**

<details>
<summary>
  Expand response 2
</summary>

```
{
  "id": "chatcmpl-979021bcca17eaa4",
  "object": "chat.completion",
  "created": 1768204660,
  "model": "qwen3",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "檢索結果筆數為266，屬適中範圍，符合「情況B：....
        "refusal": null,
        "annotations": null,
        "audio": null,
        "function_call": null,
        "tool_calls": [],
        "reasoning": null,
        "reasoning_content": null
      },
      "logprobs": null,
      "finish_reason": "stop",
      "stop_reason": null,
      "token_ids": null
    }
  ],
  "service_tier": null,
  "system_fingerprint": null,
  "usage": {
    "prompt_tokens": 3020,
    "total_tokens": 3110,
    "completion_tokens": 90,
    "prompt_tokens_details": {
      "cached_tokens": 3008
    }
  },
  "prompt_logprobs": null,
  "prompt_token_ids": null,
  "kv_transfer_params": null
}
```

</details>

**Final content**

```
Assistant: 檢索結果筆數為266，屬適中範圍，符合「情況B：結果適中 (10 ~ 20,000筆)」之條件，因此直接採納原始檢索條件句，不進行任何精煉或擴增。最終輸出與原始條件完全一致。

<br>
<query>TAC:(SQL)</query>
專利筆數: 266
```

## Part 2

**參數**
- baseURL: `http://192.168.50.91:8000`
- model: `qwen3`
- tool-call-parser: `hermes`
- stream: `false`
- temperature: `0.7`
- top_p: `0.9`
- top_k: `20`
- repeat_last_n: `64`
- repeat_penalty: `1.2`

**情況**
- vllm 回傳預期的 tool_calls


**Request**

<details>
<summary>
  Expand request
</summary>

```
### 測試 AI 會不會呼叫 mcp tool
POST {{apiUrl}}/v1/chat/completions
Content-Type: application/json

{
  "model": "qwen3",
  "stream": false,
  "temperature": 0.7,
  "top_p": 0.9,
  "top_k": 20,
  "repeat_last_n": 64,
  "repeat_penalty": 1.2,
  "messages": [
    {
      "role": "system",
      "content": "{{systemPrompt}}"
    },
    {
      "role": "user",
      "content": "{{userPrompt1}}"
    },
    {
      "role": "assistant",
      "content": "根據輸入「LED」，判斷為「技術描述」，屬成熟技術。核心關鍵字為「LED」，需擴展中英文同義詞與技術應用詞彙，並鎖定相關IPC分類。因未提及時間限制，故不設日期條件。依策略建構檢索條件句，確保關鍵字、IPC與邏輯結構正確。\n\n<query>\nTAC:(\"LED\" \"light emitting diode\" \"發光二極體\") AND IPC:(H01L33*) AND TAC:(\"semiconductor\" \"chip\" \"light source\" \"solid state lighting\")\n</query>"
    },
    {
      "role": "user",
      "content": "請根據上述內容決定是否需要呼叫工具來查詢專利數量。"
    }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "query-upat-patent-count",
        "description": "Provide the input query to obtain the patent count from UPAT. This is optional and will be skipped if a patent count is already present.",
        "parameters": {
          "type": "object",
          "properties": {
            "query": {
              "type": "string",
              "description": "Patent query，ex: TAC:(LED \"light emitting diode\" 發光二極體) AND IPC:(H01L033* G02F001* H05B045*)"
            },
            "countries": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "TW, TWA, TWB, CN, CNAB, KR, KRAB, JP, JPA, JPB, JPU, JPD, PAJ, US, USA, USB, EP, EPA, EPB, WO, DOCDB. Default value: ['TW']"
            },
            "source": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "搜尋結果 (hits) 所包含的欄位，使用 upat 欄位將自動被轉換為 elasticsearch 的欄位 Default value: ISN, PN, APN, TTL, ISD, PD, APD, DOCKIND"
            },
            "aggs": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "聚合類型"
            },
            "docdbCountries": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "針對 DOCDB 做國別篩選"
            },
            "docKind": {
              "type": "string",
              "description": "文件類型, Default value: all"
            },
            "patentType": {
              "type": "string",
              "description": "Patent type, Default value: all"
            },
            "aplType": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Patent apply type"
            },
            "legalStatus": {
              "anyOf": [
                {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "enum": ["valid", "overdue", "public"]
                  }
                },
                {
                  "type": "null"
                }
              ],
              "description": "Patent legal status, Default value: ['valid', 'overdue', 'public']"
            }
          },
          "required": [
            "query",
            "countries",
            "source",
            "aggs",
            "docdbCountries",
            "docKind",
            "patentType",
            "aplType",
            "legalStatus"
          ],
          "$schema": "http://json-schema.org/draft-07/schema#"
        }
      }
    }
  ],
  "toolChoice": {
    "type": "function",
    "function": {
      "name": "query-upat-patent-count"
    }
  }
}
```

</details>


**Response**

<details>
<summary>
  Expand response
</summary>

```


{
  "id": "chatcmpl-8ed5cc495477c27b",
  "object": "chat.completion",
  "created": 1770099532,
  "model": "qwen3",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": null,
        "refusal": null,
        "annotations": null,
        "audio": null,
        "function_call": null,
        "tool_calls": [
          {
            "id": "chatcmpl-tool-93c7d9e48d193169",
            "type": "function",
            "function": {
              "name": "query-upat-patent-count",
              "arguments": "{\"query\": \"TAC:(\\\"LED\\\" \\\"light emitting diode\\\" \\\"發光二極體\\\") AND IPC:(H01L33*) AND TAC:(\\\"semiconductor\\\" \\\"chip\\\" \\\"light source\\\" \\\"solid state lighting\\\")\", \"countries\": [\"TW\", \"US\", \"CN\", \"JP\", \"KR\", \"EP\", \"WO\"], \"source\": [\"ISN\", \"PN\", \"APN\", \"TTL\", \"ISD\", \"PD\", \"APD\", \"DOCKIND\"], \"aggs\": [\"po_agg\", \"deducedOwner_agg\", \"deducedApplicant_agg\", \"mainIpc_level3_agg\", \"mainIpc_level4_agg\", \"publishedYear_agg\", \"appliedYear_agg\", \"legal_agg\"], \"docdbCountries\": [], \"docKind\": \"all\", \"patentType\": \"all\", \"aplType\": [\"invention\", \"model\", \"design\", \"reissue\", \"TVAPP\", \"defensive\", \"plant\", \"sir\"], \"legalStatus\": [\"valid\", \"overdue\", \"public\"]}"
            }
          }
        ],
        "reasoning": null,
        "reasoning_content": null
      },
      "logprobs": null,
      "finish_reason": "tool_calls",
      "stop_reason": null,
      "token_ids": null
    }
  ],
  "service_tier": null,
  "system_fingerprint": null,
  "usage": {
    "prompt_tokens": 4469,
    "total_tokens": 4721,
    "completion_tokens": 252,
    "prompt_tokens_details": {
      "cached_tokens": 144
    }
  },
  "prompt_logprobs": null,
  "prompt_token_ids": null,
  "kv_transfer_params": null
}

```

</details>

## Part 3

**參數**
- baseURL: `http://192.168.50.91:8000`
- model: `qwen3`
- tool-call-parser: `hermes`
- stream: `true`
- temperature: `0.7`
- top_p: `0.9`
- top_k: `20`
- repeat_last_n: `64`
- repeat_penalty: `1.2`


**情況1**
- 使用 sse: 將 `stream` 設為 `true` (回傳: tool_call)

**Request**

<details>
<summary>
  Expand request
</summary>

```
{
  "model": "qwen3",
  "stream": true,
  "temperature": 0.7,
  "top_p": 0.9,
  "top_k": 20,
  "repeat_last_n": 64,
  "repeat_penalty": 1.2,
  "messages": [
    {
      "role": "system",
      "content": "若使用工具,請參考以下參數內容:{\"countries\":[\"TW\..."
    },
    {
      "role": "user",
      "content": "您好，我需要您的協助來建立一個專業的檢索條件。請扮演..."
    },
    {
      "role": "assistant",
      "content": "根據輸入「LED」，判斷為「技術描述」，屬成熟技術。核心關鍵字為「LED」，需擴展中英文同義詞與技術應用詞彙，並鎖定相關IPC分類。因未提及時間限制，故不設日期條件。依策略建構檢索條件句，確保關鍵字、IPC與邏輯結構正確。\n\n<query>\nTAC:(\"LED\" \"light emitting diode\" \"發光二極體\") AND IPC:(H01L33*) AND TAC:(\"semiconductor\" \"chip\" \"light source\" \"solid state lighting\")\n</query>"
    },
    {
      "role": "user",
      "content": "請根據上述內容決定是否需要呼叫工具來查詢專利數量。"
    }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "query-upat-patent-count",
        "description": "Provide the input query to obtain the patent count from UPAT. This is optional and will be skipped if a patent count is already present.",
        "parameters": {
          "type": "object",
          "properties": {
            "query": {
              "type": "string",
              "description": "Patent query，ex: TAC:(LED \"light emitting diode\" 發光二極體) AND IPC:(H01L033* G02F001* H05B045*)"
            },
            "countries": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "TW, TWA, TWB, CN, CNAB, KR, KRAB, JP, JPA, JPB, JPU, JPD, PAJ, US, USA, USB, EP, EPA, EPB, WO, DOCDB. Default value: ['TW']"
            },
            "source": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "搜尋結果 (hits) 所包含的欄位，使用 upat 欄位將自動被轉換為 elasticsearch 的欄位 Default value: ISN, PN, APN, TTL, ISD, PD, APD, DOCKIND"
            },
            "aggs": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "聚合類型"
            },
            "docdbCountries": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "針對 DOCDB 做國別篩選"
            },
            "docKind": {
              "type": "string",
              "description": "文件類型, Default value: all"
            },
            "patentType": {
              "type": "string",
              "description": "Patent type, Default value: all"
            },
            "aplType": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "Patent apply type"
            },
            "legalStatus": {
              "anyOf": [
                {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "enum": ["valid", "overdue", "public"]
                  }
                },
                {
                  "type": "null"
                }
              ],
              "description": "Patent legal status, Default value: ['valid', 'overdue', 'public']"
            }
          },
          "required": [
            "query",
            "countries",
            "source",
            "aggs",
            "docdbCountries",
            "docKind",
            "patentType",
            "aplType",
            "legalStatus"
          ],
          "$schema": "http://json-schema.org/draft-07/schema#"
        }
      }
    }
  ],
  "toolChoice": {
    "type": "function",
    "function": {
      "name": "query-upat-patent-count"
    }
  }
}


```

</details>

**Response**

<details>
<summary>
  Expand response
</summary>

```

data: {"id":"chatcmpl-8e85664bb5ade59a","object":"chat.completion.chunk","created":1770100719,"model":"qwen3","choices":[{"index":0,"delta":{"role":"assistant","content":"","reasoning_content":null},"logprobs":null,"finish_reason":null}],"prompt_token_ids":null}

data: {"id":"chatcmpl-8e85664bb5ade59a","object":"chat.completion.chunk","created":1770100719,"model":"qwen3","choices":[{"index":0,"delta":{"reasoning_content":null,"tool_calls":[{"id":"chatcmpl-tool-ae0551b375a5cf47","type":"function","index":0,"function":{"name":"query-upat-patent-count"}}]},"logprobs":null,"finish_reason":null,"token_ids":null}]}

data: {"id":"chatcmpl-8e85664bb5ade59a","object":"chat.completion.chunk","created":1770100719,"model":"qwen3","choices":[{"index":0,"delta":{"reasoning_content":null,"tool_calls":[{"index":0,"function":{"arguments":"{\"query\": \""}}]},"logprobs":null,"finish_reason":null,"token_ids":null}]}

data: {"id":"chatcmpl-8e85664bb5ade59a","object":"chat.completion.chunk","created":1770100719,"model":"qwen3","choices":[{"index":0,"delta":{"reasoning_content":null,"tool_calls":[{"index":0,"function":{"arguments":"T"}}]},"logprobs":null,"finish_reason":null,"token_ids":null}]}

...

data: [DONE]

```

</details>

> 內容在 `choices.delta.content` 裡面
---

**情況2**
- 使用 sse: 將 `stream` 設為 `true` (回傳: 一般內容)

**Request**

<details>
<summary>
  Expand request
</summary>

```
{
  "model": "qwen3",
  "stream": true,
  "temperature": 0.7,
  "top_p": 0.9,
  "top_k": 20,
  "repeat_last_n": 64,
  "repeat_penalty": 1.2,
  "messages": [
    {
      "role": "system",
      "content": "若使用工具,請參考以下參數內容:{\"countries\":[\"T..."
    },
    {
      "role": "user",
      "content": "您好，我需要您的協助來建立一個專業的檢索條件。請扮演一位..."
    }
  ]
}

```

</details>

**Response**

<details>
<summary>
  Expand response
</summary>

```


data: {"id":"chatcmpl-99afb4dd68de7d82","object":"chat.completion.chunk","created":1770100911,"model":"qwen3","choices":[{"index":0,"delta":{"role":"assistant","content":"","reasoning_content":null},"logprobs":null,"finish_reason":null}],"prompt_token_ids":null}

data: {"id":"chatcmpl-99afb4dd68de7d82","object":"chat.completion.chunk","created":1770100911,"model":"qwen3","choices":[{"index":0,"delta":{"content":"針對","reasoning_content":null},"logprobs":null,"finish_reason":null,"token_ids":null}]}

data: {"id":"chatcmpl-99afb4dd68de7d82","object":"chat.completion.chunk","created":1770100911,"model":"qwen3","choices":[{"index":0,"delta":{"content":"「","reasoning_content":null},"logprobs":null,"finish_reason":null,"token_ids":null}]}

data: {"id":"chatcmpl-99afb4dd68de7d82","object":"chat.completion.chunk","created":1770100911,"model":"qwen3","choices":[{"index":0,"delta":{"content":"LED","reasoning_content":null},"logprobs":null,"finish_reason":null,"token_ids":null}]}

...

data: [DONE]

```

</details>

> tool name 在 `choices.delta.tool_calls.function.name` 裡面
  內容在 `choices.delta.tool_calls.arguments` 裡面