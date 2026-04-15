---
theme: default
title: Dify 技術深潛 — RD 分享
highlighter: shiki
drawings:
  persist: false
transition: fade
mdc: true
colorSchema: dark
css: unocss
---

<div class="h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
  <div class="text-xs tracking-widest text-blue-400 uppercase mb-4 font-mono">RD 技術分享</div>
  <h1 class="text-6xl font-bold text-white mb-2">Dify</h1>
  <div class="text-2xl font-light text-blue-300 mb-6">技術深潛</div>
  <div class="flex gap-3 text-sm text-gray-400 mb-10">
    <span class="px-3 py-1 rounded-full border border-white/10 bg-white/5">架構設計</span>
    <span class="px-3 py-1 rounded-full border border-white/10 bg-white/5">節點剖析</span>
    <span class="px-3 py-1 rounded-full border border-white/10 bg-white/5">踩坑案例</span>
    <span class="px-3 py-1 rounded-full border border-white/10 bg-white/5">最佳實踐</span>
  </div>
  <div class="text-xs text-gray-600">資料來源：官方文件 + GitHub Issues / Discussions</div>
</div>

---

<div class="h-full flex flex-col justify-center px-2">
  <div class="text-xs tracking-widest text-blue-400 uppercase font-mono mb-4">Agenda</div>
  <h2 class="text-3xl font-bold text-white mb-8">今天的議程</h2>
  <div class="grid grid-cols-3 gap-4">
    <div v-click class="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
      <div class="text-2xl font-bold text-blue-400 mb-1">01</div>
      <div class="font-semibold text-white text-sm">Dify 是什麼 & 架構概覽</div>
      <div class="text-xs text-gray-400 mt-1">定位 · App 類型 · 技術堆疊</div>
    </div>
    <div v-click class="rounded-xl border border-green-500/30 bg-green-500/10 p-4">
      <div class="text-2xl font-bold text-green-400 mb-1">02</div>
      <div class="font-semibold text-white text-sm">核心節點深度剖析</div>
      <div class="text-xs text-gray-400 mt-1">LLM · Agent · Code · HTTP · Iteration</div>
    </div>
    <div v-click class="rounded-xl border border-purple-500/30 bg-purple-500/10 p-4">
      <div class="text-2xl font-bold text-purple-400 mb-1">03</div>
      <div class="font-semibold text-white text-sm">RAG 知識庫技術細節</div>
      <div class="text-xs text-gray-400 mt-1">Chunking · Embedding · Retrieval</div>
    </div>
    <div v-click class="rounded-xl border border-orange-500/30 bg-orange-500/10 p-4">
      <div class="text-2xl font-bold text-orange-400 mb-1">04</div>
      <div class="font-semibold text-white text-sm">社群踩坑案例</div>
      <div class="text-xs text-gray-400 mt-1">GitHub Issues & Discussions 精選</div>
    </div>
    <div v-click class="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
      <div class="text-2xl font-bold text-red-400 mb-1">05</div>
      <div class="font-semibold text-white text-sm">自架部署注意事項</div>
      <div class="text-xs text-gray-400 mt-1">Docker Compose · 升版風險 · 設定坑</div>
    </div>
    <div v-click class="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4">
      <div class="text-2xl font-bold text-cyan-400 mb-1">06</div>
      <div class="font-semibold text-white text-sm">最佳實踐建議</div>
      <div class="text-xs text-gray-400 mt-1">Debug · 成本控制 · 架構選型</div>
    </div>
  </div>
</div>

---

<SectionSlide number="01" title="Dify 是什麼" subtitle="架構概覽" color="blue" />

---

<div class="h-full flex flex-col justify-center px-2">
  <h2 class="text-2xl font-bold text-white mb-1">Dify 定位</h2>
  <p class="text-gray-400 text-sm mb-4">開源 Agentic Workflow 平台 — <span class="text-blue-300 font-mono">Do It For You</span></p>
  <div class="grid grid-cols-2 gap-6">
    <div>
      <div class="space-y-2 mb-4">
        <div v-click class="flex items-center gap-2 text-sm"><span class="text-green-400 font-bold shrink-0">✓</span><span class="text-gray-200">視覺化設計工作流，快速 prototype</span></div>
        <div v-click class="flex items-center gap-2 text-sm"><span class="text-green-400 font-bold shrink-0">✓</span><span class="text-gray-200">支援 GPT / Claude / Gemini / Ollama 本地模型</span></div>
        <div v-click class="flex items-center gap-2 text-sm"><span class="text-green-400 font-bold shrink-0">✓</span><span class="text-gray-200">內建 RAG 知識庫（Weaviate 向量 DB）</span></div>
        <div v-click class="flex items-center gap-2 text-sm"><span class="text-green-400 font-bold shrink-0">✓</span><span class="text-gray-200">多種發佈：Web App / API / MCP Server</span></div>
        <div v-click class="flex items-center gap-2 text-sm"><span class="text-yellow-400 font-bold shrink-0">△</span><span class="text-gray-400">複雜流程調試比純程式碼麻煩</span></div>
        <div v-click class="flex items-center gap-2 text-sm"><span class="text-yellow-400 font-bold shrink-0">△</span><span class="text-gray-400">Code Node 有 Sandbox 限制</span></div>
      </div>
    </div>
    <div v-click class="space-y-3">
      <InfoCard title="Workflow" color="blue">
        <div class="text-xs text-gray-300 space-y-0.5">
          <div>一次性執行：輸入 → 節點鏈 → 輸出</div>
          <div class="text-gray-500">無對話記憶，適合批次/報告/Pipeline</div>
        </div>
      </InfoCard>
      <InfoCard title="Chatflow" color="purple">
        <div class="text-xs text-gray-300 space-y-0.5">
          <div>對話層 + Workflow，每輪訊息觸發一次</div>
          <div class="text-gray-500">有 Conversation Variables，適合 Q&A 助理</div>
        </div>
      </InfoCard>
      <InfoCard title="技術堆疊" color="green">
        <div class="text-xs text-gray-400 font-mono leading-relaxed">
          FastAPI · Next.js · PostgreSQL<br>
          Redis · Weaviate · Celery · Sandbox
        </div>
      </InfoCard>
    </div>
  </div>
</div>

---

<SectionSlide number="02" title="核心節點" subtitle="深度剖析" color="green" />

---

<div class="h-full flex flex-col justify-center px-2">
  <h2 class="text-2xl font-bold text-white mb-4">LLM Node — 參數與輸出控制</h2>
  <div class="grid grid-cols-2 gap-5">
    <div class="space-y-3">
      <InfoCard title="生成參數" color="blue">
        <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
          <div class="text-gray-400">Temperature 0–1</div><div class="text-gray-200">創意度 vs 穩定</div>
          <div class="text-gray-400">Top P</div><div class="text-gray-200">詞彙多樣性</div>
          <div class="text-gray-400">Frequency Penalty</div><div class="text-gray-200">降低重複詞彙</div>
          <div class="text-gray-400">Presence Penalty</div><div class="text-gray-200">鼓勵新主題</div>
        </div>
      </InfoCard>
      <InfoCard title="結構化輸出（JSON）" color="purple">
        <div class="text-xs text-gray-300 mb-2">① Visual Editor &nbsp;② JSON Schema &nbsp;③ AI 產生</div>
        <Callout type="warning">⚠️ 只有原生支援 JSON mode 的模型才穩定，其他可能輸出 markdown code block</Callout>
      </InfoCard>
    </div>
    <div class="space-y-3">
      <InfoCard title="Memory / Context" color="green">
        <div class="text-xs text-gray-300 space-y-1">
          <div>• 記憶範圍：同一 Chatflow 的對話輪次</div>
          <div>• 不跨 Conversation（開新對話即清空）</div>
          <div>• <span class="font-mono text-gray-400">TokenBufferMemory</span> 控制 token 用量</div>
          <div>• Top K + Score Threshold 過濾低相關結果</div>
        </div>
      </InfoCard>
      <InfoCard title="多模態支援" color="cyan">
        <div class="text-xs text-gray-300 space-y-1">
          <div>• Vision 模型支援圖片輸入（上限 2 MB）</div>
          <div>• 文件需先過 Doc Extractor 轉文字</div>
          <div>• Detail Level：High / Low 可選</div>
        </div>
      </InfoCard>
      <InfoCard title="變數語法" color="orange">
        <div class="font-mono text-xs text-gray-300">
          <span class="text-blue-300">{"{{variable}}"}</span>　<span class="text-green-300">{"{{node.output.field}}"}</span>
        </div>
      </InfoCard>
    </div>
  </div>
</div>

---

<div class="h-full flex flex-col justify-center px-2">
  <h2 class="text-2xl font-bold text-white mb-4">Agent Node vs 固定 Workflow</h2>
  <div class="grid grid-cols-2 gap-5">
    <div class="space-y-3">
      <InfoCard title="Function Calling" color="purple">
        <div class="text-xs text-gray-300 space-y-1">
          <div>使用模型原生工具呼叫能力</div>
          <div class="text-gray-500">適合 GPT-4 / Claude 3.5，輸出格式穩定</div>
        </div>
      </InfoCard>
      <InfoCard title="ReAct" color="blue">
        <div class="text-xs text-gray-300 space-y-1">
          <div>Thought → Action → Observation 循環</div>
          <div class="text-gray-500">適合不支援 Function Call 的模型，較耗 token</div>
        </div>
      </InfoCard>
      <InfoCard title="Iteration Limit 建議" color="yellow">
        <div class="text-xs text-gray-300">簡單任務：3–5　　複雜研究：10–15</div>
      </InfoCard>
    </div>
    <div class="space-y-3">
      <InfoCard title="選型對照" color="green">
        <div class="text-xs space-y-1.5">
          <div class="flex gap-2"><span class="text-gray-500 shrink-0">流程固定可預測</span><span class="text-green-300">→ 固定 Workflow</span></div>
          <div class="flex gap-2"><span class="text-gray-500 shrink-0">動態工具選擇</span><span class="text-purple-300">→ Agent Node</span></div>
          <div class="flex gap-2"><span class="text-gray-500 shrink-0">精確控制成本</span><span class="text-green-300">→ 固定 Workflow</span></div>
          <div class="flex gap-2"><span class="text-gray-500 shrink-0">複雜研究任務</span><span class="text-purple-300">→ Agent Node</span></div>
        </div>
      </InfoCard>
      <InfoCard title="Agent 輸出欄位" color="cyan">
        <div class="font-mono text-xs text-gray-300 leading-relaxed">
          <span class="text-blue-300">final_response</span>　最終回答<br>
          <span class="text-green-300">reasoning_traces</span>　推理過程（除錯用）<br>
          <span class="text-orange-300">iteration_count</span>　呼叫輪次<br>
          <span class="text-red-300">__reason</span>　失敗原因
        </div>
      </InfoCard>
      <Callout type="info">🔑 工具的 description 寫得好不好，直接決定 Agent 會不會選對工具</Callout>
    </div>
  </div>
</div>

---

<div class="h-full flex flex-col justify-center px-2">
  <h2 class="text-2xl font-bold text-white mb-4">Code Node — 能做 & 不能做</h2>
  <div class="grid grid-cols-2 gap-5">
    <div class="space-y-3">
      <InfoCard title="可用套件（Python）" color="green">
        <div class="font-mono text-xs text-gray-300 leading-relaxed">
          numpy, pandas　數值 / 資料處理<br>
          json, re　　　 格式解析<br>
          datetime　　　 時間處理<br>
          <span class="text-gray-500">// JS: lodash 可用</span>
        </div>
      </InfoCard>
      <InfoCard title="輸出上限" color="yellow">
        <div class="text-xs space-y-1">
          <div class="flex justify-between"><span class="text-gray-400">字串</span><span class="text-gray-200">80,000 字元</span></div>
          <div class="flex justify-between"><span class="text-gray-400">數字</span><span class="text-gray-200">±999,999,999</span></div>
          <div class="flex justify-between"><span class="text-gray-400">巢狀結構</span><span class="text-gray-200">最深 5 層</span></div>
        </div>
      </InfoCard>
    </div>
    <div class="space-y-3">
      <InfoCard title="Sandbox 安全限制 🚫" color="red">
        <div class="font-mono text-xs space-y-1">
          <div><span class="text-red-400">✗</span> <span class="text-gray-300">import requests</span><span class="text-gray-600"> # 無網路</span></div>
          <div><span class="text-red-400">✗</span> <span class="text-gray-300">open('/etc/...')</span><span class="text-gray-600"> # 無檔案系統</span></div>
          <div><span class="text-red-400">✗</span> <span class="text-gray-300">import subprocess</span><span class="text-gray-600"> # 無系統指令</span></div>
        </div>
        <div class="mt-2 text-xs text-gray-400">
          需要 HTTP？→ <span class="text-blue-300">HTTP Request Node</span><br>
          需要讀檔？→ <span class="text-blue-300">Doc Extractor Node</span>
        </div>
      </InfoCard>
      <Callout type="caution">⚠️ 社群案例：PDF 轉換需要 Chrome engine，Sandbox 無法執行。改用 unstructured 服務或外部 API</Callout>
      <Callout type="warning">⚠️ 自架注意：<span class="font-mono">sandbox</span> 服務未啟動 → Code Node 全部失敗</Callout>
    </div>
  </div>
</div>

---

<div class="h-full flex flex-col justify-center px-2">
  <h2 class="text-2xl font-bold text-white mb-4">HTTP Request Node — SSRF 是最常踩的坑</h2>
  <div class="grid grid-cols-2 gap-5">
    <div class="space-y-3">
      <InfoCard title="基本功能" color="blue">
        <div class="text-xs text-gray-300 space-y-1">
          <div>支援 GET / POST / PUT / PATCH / DELETE</div>
          <div>動態變數：<span class="font-mono text-green-300">{"{{node.output.field}}"}</span></div>
          <div>巢狀路徑：<span class="font-mono text-green-300">{"{{resp.data.items[0].id}}"}</span></div>
        </div>
      </InfoCard>
      <InfoCard title="認證方式" color="purple">
        <div class="text-xs text-gray-300 space-y-0.5">
          <div>No Auth　/　API Key（Basic / Bearer / Custom）</div>
          <div class="text-gray-500">SSL 驗證可關閉（自簽憑證適用）</div>
        </div>
      </InfoCard>
      <InfoCard title="錯誤處理" color="green">
        <div class="text-xs text-gray-300">最多重試 <strong>10 次</strong>，間隔最長 <strong>5 秒</strong>，失敗可走 fallback</div>
      </InfoCard>
    </div>
    <div class="space-y-3">
      <InfoCard title="SSRF Proxy 擋掉的請求" color="red">
        <div class="font-mono text-xs text-gray-400 space-y-0.5">
          <div><span class="text-red-400">✗</span> http://localhost:xxxx</div>
          <div><span class="text-red-400">✗</span> http://10.x.x.x</div>
          <div><span class="text-red-400">✗</span> http://192.168.x.x</div>
          <div><span class="text-red-400">✗</span> http://172.16.x.x</div>
        </div>
      </InfoCard>
      <InfoCard title="三種解法" color="yellow">
        <div class="text-xs space-y-1.5">
          <div><span class="text-green-400">A.</span> <span class="text-gray-300">自架版 .env 設定 </span><span class="font-mono text-cyan-300">SSRF_PROXY_HTTP_URL</span></div>
          <div><span class="text-green-400">B.</span> <span class="text-gray-300">改用 Plugin 機制（不受 SSRF 限制）</span></div>
          <div><span class="text-green-400">C.</span> <span class="text-gray-300">改用公開可存取的 URL</span></div>
        </div>
      </InfoCard>
    </div>
  </div>
</div>

---

<div class="h-full flex flex-col justify-center px-2">
  <h2 class="text-2xl font-bold text-white mb-4">Iteration Node — 批次處理</h2>
  <div class="grid grid-cols-2 gap-5">
    <div class="space-y-3">
      <InfoCard title="Sequential（循序）" color="blue">
        <div class="text-xs text-gray-300 space-y-1">
          <div>一個一個處理，保留順序，支援 Streaming</div>
          <div class="text-gray-500">適合：有順序依賴的場景</div>
        </div>
      </InfoCard>
      <InfoCard title="Parallel（並行）" color="purple">
        <div class="text-xs text-gray-300 space-y-1">
          <div>同時最多 10 個，速度快</div>
          <div class="text-red-300">❌ 不支援 Streaming Output</div>
          <div class="text-gray-500">適合：項目互相獨立的場景</div>
        </div>
      </InfoCard>
      <InfoCard title="輸出轉換（Array → String）" color="green">
        <div class="font-mono text-xs text-gray-300">
          <span class="text-gray-500"># Code Node</span><br>
          <span class="text-blue-300">"\n"</span>.join(iteration_output)<br>
          <span class="text-gray-500"># Jinja2</span><br>
          {"{{ items | join(\"\\n\") }}"}
        </div>
      </InfoCard>
    </div>
    <div class="space-y-3">
      <InfoCard title="Error Handling" color="orange">
        <div class="text-xs space-y-1.5">
          <div class="flex gap-2"><span class="text-red-400 shrink-0">Terminate</span><span class="text-gray-400">遇錯即停全部</span></div>
          <div class="flex gap-2"><span class="text-yellow-400 shrink-0">Continue on Error</span><span class="text-gray-400">錯誤填 null 繼續</span></div>
          <div class="flex gap-2"><span class="text-green-400 shrink-0">Remove Failed</span><span class="text-gray-400">只回傳成功項目</span></div>
        </div>
      </InfoCard>
      <Callout type="caution">
        <div class="font-bold mb-1">Issue #32555 / #32453（高票）</div>
        <div>Loop 內部無法放 Human Input Node（人工審核）</div>
        <div class="text-gray-300 mt-1">→ 改用多個串接的 Workflow，每段各自等待輸入</div>
      </Callout>
      <Callout type="danger">⚠️ 長 Iteration 鏈路容易觸發 SSE timeout，並行模式尤其明顯。解法：調整 nginx <span class="font-mono">proxy_read_timeout</span></Callout>
    </div>
  </div>
</div>

---

<SectionSlide number="03" title="RAG 知識庫" subtitle="技術細節" color="purple" />

---

<div class="h-full flex flex-col justify-center px-2">
  <h2 class="text-2xl font-bold text-white mb-5">RAG Pipeline 完整流程</h2>
  <div class="space-y-3">
    <div v-click class="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4 flex items-center gap-4">
      <div class="text-3xl shrink-0">📄</div>
      <div class="flex-1">
        <div class="text-sm font-bold text-blue-300 mb-1">Indexing Phase</div>
        <div class="flex items-center gap-2 text-xs text-gray-300 flex-wrap">
          <span class="px-2 py-0.5 rounded bg-white/10">文件上傳</span>
          <span class="text-gray-600">→</span>
          <span class="px-2 py-0.5 rounded bg-white/10">Chunking</span>
          <span class="text-gray-600">→</span>
          <span class="px-2 py-0.5 rounded bg-white/10">Embedding</span>
          <span class="text-gray-600">→</span>
          <span class="px-2 py-0.5 rounded bg-white/10">存入 Weaviate</span>
        </div>
      </div>
    </div>
    <div v-click class="rounded-xl border border-green-500/30 bg-green-500/5 p-4 flex items-center gap-4">
      <div class="text-3xl shrink-0">🔍</div>
      <div class="flex-1">
        <div class="text-sm font-bold text-green-300 mb-1">Retrieval Phase</div>
        <div class="flex items-center gap-2 text-xs text-gray-300 flex-wrap">
          <span class="px-2 py-0.5 rounded bg-white/10">使用者查詢</span>
          <span class="text-gray-600">→</span>
          <span class="px-2 py-0.5 rounded bg-white/10">Query Embedding</span>
          <span class="text-gray-600">→</span>
          <span class="px-2 py-0.5 rounded bg-white/10">向量搜尋</span>
          <span class="text-gray-600">→</span>
          <span class="px-2 py-0.5 rounded bg-white/10">Top K</span>
          <span class="text-gray-600">→</span>
          <span class="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300">Reranking（可選）</span>
        </div>
      </div>
    </div>
    <div v-click class="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4 flex items-center gap-4">
      <div class="text-3xl shrink-0">🤖</div>
      <div class="flex-1">
        <div class="text-sm font-bold text-purple-300 mb-1">Generation Phase</div>
        <div class="flex items-center gap-2 text-xs text-gray-300 flex-wrap">
          <span class="px-2 py-0.5 rounded bg-white/10">User Query</span>
          <span class="text-gray-600">+</span>
          <span class="px-2 py-0.5 rounded bg-white/10">Retrieved Chunks</span>
          <span class="text-gray-600">→</span>
          <span class="px-2 py-0.5 rounded bg-white/10">LLM</span>
          <span class="text-gray-600">→</span>
          <span class="px-2 py-0.5 rounded bg-green-500/20 text-green-300">精確回答</span>
        </div>
      </div>
    </div>
  </div>
  <div v-click class="mt-4">
    <Callout type="warning">⚠️ RAG 的品質 80% 取決於 Chunking 策略和 Embedding 模型的選擇</Callout>
  </div>
</div>

---

<div class="h-full flex flex-col justify-center px-2">
  <h2 class="text-2xl font-bold text-white mb-4">Retrieval 策略選擇</h2>
  <div class="grid grid-cols-3 gap-4 mb-4">
    <div class="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
      <div class="text-xs text-blue-400 font-mono mb-2">Semantic Search</div>
      <div class="text-xs text-gray-300 space-y-1 mb-3">
        <div>Embedding 向量 → Cosine Similarity</div>
        <div class="text-green-400">✓ 理解同義詞、近似表達</div>
        <div class="text-red-400">✗ 精確關鍵字可能被稀釋</div>
      </div>
      <div class="text-xs text-gray-500">概念性問答 · 自然語言查詢</div>
    </div>
    <div class="rounded-xl border border-orange-500/30 bg-orange-500/5 p-4">
      <div class="text-xs text-orange-400 font-mono mb-2">Full-text Search</div>
      <div class="text-xs text-gray-300 space-y-1 mb-3">
        <div>BM25 關鍵字匹配</div>
        <div class="text-green-400">✓ 精確詞彙不遺漏</div>
        <div class="text-red-400">✗ 無法理解語義</div>
      </div>
      <div class="text-xs text-gray-500">專有名詞 · 代碼 / ID 搜尋</div>
    </div>
    <div class="rounded-xl border border-green-500/30 bg-green-500/5 p-4 relative">
      <div class="absolute top-2 right-2 text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">推薦</div>
      <div class="text-xs text-green-400 font-mono mb-2">Hybrid Search ⭐</div>
      <div class="text-xs text-gray-300 space-y-1 mb-3">
        <div>語義 + 全文，Weighted Score 可調</div>
        <div>可接 Reranker 模型二次排序</div>
        <div class="text-green-400">✓ 兼顧語義與精確度</div>
      </div>
      <div class="text-xs text-gray-500">生產環境首選</div>
    </div>
  </div>
  <Callout type="warning">⚠️ 社群踩坑：Metadata Filtering 開啟後反而讓<strong>檢索變慢</strong>，知識庫大時尤其明顯。建議先壓測再決定是否啟用</Callout>
</div>

---

<div class="h-full flex flex-col justify-center px-2">
  <h2 class="text-2xl font-bold text-white mb-4">Chunking 策略 & Embedding 選擇</h2>
  <div class="grid grid-cols-2 gap-5">
    <div class="space-y-3">
      <InfoCard title="三種切割方式" color="blue">
        <div class="text-xs space-y-2">
          <div><span class="text-gray-300 font-bold">Fixed-size</span><span class="text-gray-500">　固定字元數，簡單但可能切斷語意</span></div>
          <div><span class="text-gray-300 font-bold">Paragraph-based</span><span class="text-gray-500">　按段落切，保留語意完整</span></div>
          <div><span class="text-green-300 font-bold">Hierarchical</span><span class="text-gray-500">　大段落 + 細分 chunk，長文件首選</span></div>
        </div>
      </InfoCard>
      <InfoCard title="調參建議" color="purple">
        <div class="text-xs space-y-1">
          <div class="flex gap-3"><span class="text-gray-500 w-20 shrink-0">短問答</span><span class="text-gray-200">Chunk 256–512 / Overlap 50–100</span></div>
          <div class="flex gap-3"><span class="text-gray-500 w-20 shrink-0">長文件</span><span class="text-gray-200">Chunk 512–1024 / Overlap 100–200</span></div>
          <div class="flex gap-3"><span class="text-gray-500 w-20 shrink-0">代碼文件</span><span class="text-gray-200">Chunk 512 / Overlap 0</span></div>
        </div>
      </InfoCard>
    </div>
    <div class="space-y-3">
      <InfoCard title="Embedding 模型選擇" color="orange">
        <div class="text-xs space-y-1.5">
          <div class="flex justify-between"><span class="text-gray-300">text-embedding-3-small</span><span class="text-gray-500">便宜快速</span></div>
          <div class="flex justify-between"><span class="text-gray-300">text-embedding-3-large</span><span class="text-gray-500">生產環境</span></div>
          <div class="flex justify-between"><span class="text-green-300">bge-m3（本地）</span><span class="text-gray-500">中文場景首選</span></div>
          <div class="flex justify-between"><span class="text-gray-300">nomic-embed</span><span class="text-gray-500">完全離線</span></div>
        </div>
        <Callout type="danger" class="mt-2">⚠️ 一旦建立不能換！換模型需重新 embed 全部文件</Callout>
      </InfoCard>
      <InfoCard title="Reranker 二次排序" color="green">
        <div class="text-xs text-gray-300">向量搜尋 Top 20 → Reranker → 取最高分 Top 3–5 給 LLM</div>
        <div class="text-xs text-gray-500 mt-1">明顯提升準確度，但增加延遲與成本</div>
      </InfoCard>
      <Callout type="warning">⚠️ 社群高票（32票）：目前無知識庫匯出功能，跨環境遷移只能重傳</Callout>
    </div>
  </div>
</div>

---

<SectionSlide number="04" title="社群踩坑" subtitle="GitHub Issues & Discussions 精選" color="orange" />

---

<div class="h-full flex flex-col justify-center px-2">
  <h2 class="text-2xl font-bold text-white mb-4">GitHub Issues 精選 — 已知限制</h2>
  <div class="space-y-3">
    <IssueCard v-click
      badge="BUG #32565" color="red"
      title="新 Agent Node 無法呼叫工具 → command not found"
      description="1.14.0-rc1 問題，呼叫 Tool 時拋出 command not found"
      solution="→ 暫時降回穩定版，等官方修復再升版"
    />
    <IssueCard v-click
      badge="ISSUE #32555" color="orange"
      title="Loop / Iteration 內部無法使用 Human-in-the-loop Node"
      description="人工審核/確認場景在 Loop 內無法實現"
      solution="→ 改用多個串接的 Workflow，每段各自等待輸入"
    />
    <IssueCard v-click
      badge="ISSUE #32310" color="yellow"
      title="Workflow as Code — 不支援 DSL 版本控制"
      description="Workflow 存在 DB，無法 git diff / code review / CI 整合"
      solution="→ 社群 workaround：用 Claude Code 從自然語言產生 Workflow DSL"
    />
    <IssueCard v-click
      badge="DISCUSSION" color="blue"
      title="Variable Aggregator 只處理單一變數，不支援多變數聚合"
      description="多個分支輸出合併成列表時，行為不符預期"
      solution="→ 用 Code Node 手動合併"
    />
  </div>
</div>

---

<div class="h-full flex flex-col justify-center px-2">
  <h2 class="text-2xl font-bold text-white mb-4">高票需求 & 實戰踩坑</h2>
  <div class="grid grid-cols-2 gap-5">
    <div>
      <div class="text-xs text-orange-400 font-mono mb-3">高票 Feature Requests</div>
      <div class="space-y-2">
        <div v-click class="rounded-lg border border-white/10 bg-white/5 p-2.5 text-xs">
          <div class="flex items-center gap-2"><span class="text-blue-300 font-bold">32票</span><span class="text-white">知識庫匯出/匯入</span></div>
          <div class="text-gray-500 mt-0.5">無此功能，跨環境遷移、備份都很痛</div>
        </div>
        <div v-click class="rounded-lg border border-white/10 bg-white/5 p-2.5 text-xs">
          <div class="flex items-center gap-2"><span class="text-green-300 font-bold">23票</span><span class="text-white">Scheduled Tasks / Cron Job</span></div>
          <div class="text-gray-500 mt-0.5">只能透過外部 API 觸發，定期報告需另外架</div>
        </div>
        <div v-click class="rounded-lg border border-white/10 bg-white/5 p-2.5 text-xs">
          <div class="flex items-center gap-2"><span class="text-yellow-300 font-bold">17票</span><span class="text-white">Async Workflow Execution</span></div>
          <div class="text-gray-500 mt-0.5">同步執行，長任務容易 timeout</div>
        </div>
      </div>
    </div>
    <div class="space-y-3">
      <div v-click>
        <InfoCard title="升版踩坑案例" color="red">
          <div class="text-xs text-gray-300 space-y-1">
            <div><span class="text-gray-500">案例：</span>1.8.1 升到 1.13.3，複製目錄後多項功能壞掉</div>
            <div><span class="text-gray-500">根因：</span>DB Migration 問題或 .env breaking change</div>
            <div class="mt-1 text-gray-400 space-y-0.5">
              <div>① 升版前備份 PostgreSQL</div>
              <div>② diff .env .env.example 補新參數</div>
              <div>③ 先在 staging 環境驗證</div>
            </div>
          </div>
        </InfoCard>
      </div>
      <div v-click>
        <InfoCard title="SSE Streaming Timeout" color="yellow">
          <div class="text-xs text-gray-300">長流程前端卡住：Nginx 預設 timeout 太短</div>
          <div class="font-mono text-xs text-gray-400 mt-1">proxy_read_timeout 300;<br>proxy_send_timeout 300;</div>
        </InfoCard>
      </div>
    </div>
  </div>
</div>

---

<div class="h-full flex flex-col justify-center px-2">
  <h2 class="text-2xl font-bold text-white mb-4">MCP 整合踩坑</h2>
  <div class="grid grid-cols-2 gap-5">
    <div class="space-y-3">
      <InfoCard title="什麼是 MCP？" color="blue">
        <div class="text-xs text-gray-300 space-y-1">
          <div>Anthropic 提出的開放標準，讓 AI 工具與外部服務標準化溝通</div>
          <div class="mt-1 text-gray-400">Dify 支援：</div>
          <div>• 將應用發佈為 MCP Server</div>
          <div>• 在 Agent 中呼叫 MCP Tool</div>
        </div>
      </InfoCard>
      <InfoCard title="SSRF 擋掉本機 MCP" color="red">
        <div class="text-xs text-gray-300 space-y-1">
          <div>情境：本機跑 MCP Service（localhost:3000）</div>
          <div>結果：<span class="text-red-300 font-mono">403 Error — SSRF Proxy blocked</span></div>
        </div>
      </InfoCard>
    </div>
    <div class="space-y-3">
      <InfoCard title="三種解法" color="green">
        <div class="text-xs space-y-2">
          <div><span class="text-green-300">A. 自架版調整 .env</span><br><span class="font-mono text-gray-400">SSRF_PROXY_HTTP_URL=http://ssrf_proxy:3128</span></div>
          <div><span class="text-green-300">B. 用 Plugin 機制</span><span class="text-gray-400">（不受 SSRF 限制）</span></div>
          <div><span class="text-green-300">C. 改用公開 URL</span></div>
        </div>
      </InfoCard>
      <InfoCard title="MCP Streaming 失敗" color="orange">
        <div class="text-xs text-gray-300">MCP Tool 的 streaming 結果無法正確回傳</div>
        <div class="text-xs text-gray-400 mt-1">已知問題，官方 tracking 中。暫解：改用非 streaming 工具</div>
      </InfoCard>
      <Callout type="warning">🔑 MCP 整合目前是 early stage，生產環境使用要謹慎評估</Callout>
    </div>
  </div>
</div>

---

<SectionSlide number="05" title="自架部署" subtitle="注意事項" color="red" />

---

<div class="h-full flex flex-col justify-center px-2">
  <h2 class="text-2xl font-bold text-white mb-4">Docker Compose 部署架構</h2>
  <div class="grid grid-cols-2 gap-5">
    <div class="space-y-3">
      <InfoCard title="11 個服務" color="blue">
        <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono">
          <div><span class="text-green-300">api</span><span class="text-gray-500">  FastAPI 後端</span></div>
          <div><span class="text-green-300">web</span><span class="text-gray-500">  Next.js 前端</span></div>
          <div><span class="text-blue-300">worker</span><span class="text-gray-500">  Celery</span></div>
          <div><span class="text-blue-300">db</span><span class="text-gray-500">  PostgreSQL</span></div>
          <div><span class="text-purple-300">redis</span><span class="text-gray-500">  快取佇列</span></div>
          <div><span class="text-purple-300">weaviate</span><span class="text-gray-500">  向量 DB</span></div>
          <div><span class="text-orange-300">sandbox</span><span class="text-gray-500">  程式碼執行</span></div>
          <div><span class="text-orange-300">nginx</span><span class="text-gray-500">  反向代理</span></div>
          <div><span class="text-red-300">ssrf_proxy</span><span class="text-gray-500">  防護</span></div>
          <div><span class="text-yellow-300">plugin_daemon</span></div>
          <div><span class="text-yellow-300">unstructured</span></div>
        </div>
      </InfoCard>
      <InfoCard title="硬體需求" color="green">
        <div class="text-xs space-y-1">
          <div class="flex gap-4"><span class="text-gray-500 w-12">CPU</span><span class="text-gray-300">2 核心</span><span class="text-gray-500">→ 建議 4+</span></div>
          <div class="flex gap-4"><span class="text-gray-500 w-12">RAM</span><span class="text-gray-300">4 GB</span><span class="text-gray-500">→ 建議 8–16 GB</span></div>
          <div class="flex gap-4"><span class="text-gray-500 w-12">Disk</span><span class="text-gray-300">20 GB</span><span class="text-gray-500">→ 建議 50+ GB</span></div>
        </div>
      </InfoCard>
    </div>
    <div class="space-y-3">
      <InfoCard title="關鍵 .env 設定" color="yellow">
        <div class="font-mono text-xs text-gray-300 leading-relaxed">
          <span class="text-gray-500"># 跨子網域部署（必設）</span><br>
          <span class="text-cyan-300">COOKIE_DOMAIN</span>=.yourdomain.com<br>
          <span class="text-cyan-300">NEXT_PUBLIC_COOKIE_DOMAIN</span>=1<br>
          <span class="text-gray-500"># 向量 DB（可換 pgvector）</span><br>
          <span class="text-cyan-300">VECTOR_STORE</span>=weaviate<br>
          <span class="text-gray-500"># Celery 並發</span><br>
          <span class="text-cyan-300">CELERY_WORKER_AMOUNT</span>=1
        </div>
      </InfoCard>
      <Callout type="warning">⚠️ <strong>Celery Worker 調優</strong>：<span class="font-mono">CELERY_WORKER_AMOUNT</span> 對效能影響極大，但官方文件缺乏指導。建議從 <span class="font-mono">2</span> 開始依負載調整</Callout>
    </div>
  </div>
</div>

---

<div class="h-full flex flex-col justify-center px-2">
  <h2 class="text-2xl font-bold text-white mb-4">升版 SOP</h2>
  <div class="grid grid-cols-2 gap-5">
    <div class="space-y-3">
      <InfoCard title="升版前必做" color="blue">
        <div class="font-mono text-xs text-gray-300 leading-relaxed">
          <span class="text-gray-500"># 1. 備份 DB</span><br>
          docker compose exec db pg_dump \<br>
          &nbsp;&nbsp;-U postgres dify > backup.sql<br>
          <span class="text-gray-500"># 2. 備份 .env</span><br>
          cp .env .env.backup<br>
          <span class="text-gray-500"># 3. 比較新版參數</span><br>
          diff .env .env.example
        </div>
      </InfoCard>
      <InfoCard title="升版步驟" color="green">
        <div class="font-mono text-xs text-gray-300 leading-relaxed">
          git checkout v1.x.x<br>
          docker compose down<br>
          docker compose pull<br>
          docker compose up -d<br>
          docker compose ps
        </div>
      </InfoCard>
    </div>
    <div class="space-y-2">
      <div class="text-xs text-red-400 font-mono mb-2">常見升版失敗</div>
      <div class="rounded border border-red-500/20 bg-red-500/5 p-2.5 text-xs">
        <div class="text-red-300 font-bold">DB Migration 失敗</div>
        <div class="font-mono text-gray-400 mt-0.5">docker compose logs api<br>docker compose exec api flask db upgrade</div>
      </div>
      <div class="rounded border border-orange-500/20 bg-orange-500/5 p-2.5 text-xs">
        <div class="text-orange-300 font-bold">.env 新參數沒填</div>
        <div class="text-gray-400 mt-0.5">diff .env .env.example 後補上再重啟</div>
      </div>
      <div class="rounded border border-yellow-500/20 bg-yellow-500/5 p-2.5 text-xs">
        <div class="text-yellow-300 font-bold">Weaviate Schema 不相容</div>
        <div class="text-gray-400 mt-0.5">需重建向量索引 → 知識庫文件要重新 embedding！</div>
      </div>
      <Callout type="danger">⚠️ 黃金守則：每次只升 1–2 個 minor version</Callout>
    </div>
  </div>
</div>

---

<SectionSlide number="06" title="最佳實踐" subtitle="Debug · 成本控制 · 架構選型" color="cyan" />

---

<div class="h-full flex flex-col justify-center px-2">
  <h2 class="text-2xl font-bold text-white mb-4">Debug 技巧 & 成本控制</h2>
  <div class="grid grid-cols-2 gap-5">
    <div>
      <InfoCard title="三大 Debug 工具" color="blue">
        <div class="text-xs space-y-2.5">
          <div>
            <div class="text-white font-semibold">單節點測試</div>
            <div class="text-gray-400">選取節點 → 輸入資料 → Run（Answer/End 除外）</div>
          </div>
          <div>
            <div class="text-white font-semibold">Variable Inspector（快取變數）</div>
            <div class="text-gray-400">跑完前段後直接編輯快取值，測試後段不用重跑整個 Workflow → 效率大幅提升</div>
          </div>
          <div>
            <div class="text-white font-semibold">Last Run</div>
            <div class="text-gray-400">每個節點可看輸入值、輸出值、執行時間 → 找效能瓶頸</div>
          </div>
        </div>
      </InfoCard>
    </div>
    <div class="space-y-2">
      <div class="text-xs text-green-400 font-mono mb-1">成本控制：能不呼叫 LLM 就不呼叫</div>
      <div class="rounded border border-green-500/20 bg-green-500/5 p-2.5 text-xs">
        <div class="flex gap-2"><span class="text-green-300 shrink-0">格式化輸出</span><span class="text-gray-400">→ Template Node（Jinja2），省 token 且輸出穩定</span></div>
      </div>
      <div class="rounded border border-blue-500/20 bg-blue-500/5 p-2.5 text-xs">
        <div class="flex gap-2"><span class="text-blue-300 shrink-0">條件判斷</span><span class="text-gray-400">→ IF/ELSE Node，速度快不會有幻覺</span></div>
      </div>
      <div class="rounded border border-purple-500/20 bg-purple-500/5 p-2.5 text-xs">
        <div class="flex gap-2"><span class="text-purple-300 shrink-0">結構化轉換</span><span class="text-gray-400">→ Parameter Extractor + Function Calling</span></div>
      </div>
      <InfoCard title="模型選型" color="orange">
        <div class="text-xs space-y-1">
          <div class="flex gap-3"><span class="text-gray-500 w-20 shrink-0">簡單任務</span><span class="text-gray-300">GPT-3.5 / Claude Haiku</span></div>
          <div class="flex gap-3"><span class="text-gray-500 w-20 shrink-0">複雜推理</span><span class="text-gray-300">GPT-4 / Claude Sonnet</span></div>
          <div class="flex gap-3"><span class="text-gray-500 w-20 shrink-0">隱私/高量</span><span class="text-green-300">Ollama 本地模型</span></div>
        </div>
      </InfoCard>
    </div>
  </div>
</div>

---

<div class="h-full flex flex-col justify-center px-2">
  <h2 class="text-2xl font-bold text-white mb-4">架構選型</h2>
  <div class="grid grid-cols-2 gap-5">
    <div class="space-y-3">
      <InfoCard title="✅ 適合用 Dify" color="green">
        <div class="text-xs text-gray-300 space-y-1">
          <div>• 快速 prototype 驗證 AI 可行性</div>
          <div>• 非工程師也需要調整 prompt / 流程</div>
          <div>• 標準 RAG + LLM 呼叫組合</div>
          <div>• 需要多種 LLM provider 快速切換</div>
          <div>• 希望內建 Dashboard 監控 token 用量</div>
        </div>
      </InfoCard>
      <InfoCard title="❌ 不適合用 Dify" color="red">
        <div class="text-xs text-gray-300 space-y-1">
          <div>• Workflow 邏輯需要 git 版控</div>
          <div>• 高並發生產流量（> 1000 req/min）</div>
          <div>• Loop 中需要 Human Input（#32555）</div>
          <div>• 複雜狀態管理或長時間非同步任務</div>
        </div>
      </InfoCard>
    </div>
    <div class="space-y-3">
      <InfoCard title="方案比較" color="purple">
        <div class="text-xs">
          <div class="grid grid-cols-4 gap-1 text-center mb-1">
            <div class="text-gray-500"></div>
            <div class="text-blue-300">Dify</div>
            <div class="text-orange-300">LangChain</div>
            <div class="text-green-300">LlamaIndex</div>
          </div>
          <div class="grid grid-cols-4 gap-1 text-center py-0.5 border-t border-white/5"><div class="text-gray-500 text-left">視覺化</div><div>✅</div><div>❌</div><div>❌</div></div>
          <div class="grid grid-cols-4 gap-1 text-center py-0.5 border-t border-white/5"><div class="text-gray-500 text-left">程式碼控制</div><div class="text-yellow-300">部分</div><div>✅</div><div>✅</div></div>
          <div class="grid grid-cols-4 gap-1 text-center py-0.5 border-t border-white/5"><div class="text-gray-500 text-left">RAG 內建</div><div>✅</div><div class="text-gray-500">需組裝</div><div>✅</div></div>
          <div class="grid grid-cols-4 gap-1 text-center py-0.5 border-t border-white/5"><div class="text-gray-500 text-left">版本控制</div><div>❌</div><div>✅</div><div>✅</div></div>
          <div class="grid grid-cols-4 gap-1 text-center py-0.5 border-t border-white/5"><div class="text-gray-500 text-left">部署簡易</div><div>✅</div><div class="text-gray-500">需自建</div><div class="text-gray-500">需自建</div></div>
        </div>
      </InfoCard>
      <Callout type="info">🔑 <strong>混合策略</strong>：Dify 做 Orchestration Layer，透過 HTTP Node / Plugin 呼叫自己的微服務 → 視覺化好處 + 程式碼控制</Callout>
    </div>
  </div>
</div>

---

<div class="h-full flex flex-col justify-center px-2">
  <h2 class="text-2xl font-bold text-white mb-6 text-center">重點總結</h2>
  <div class="grid grid-cols-3 gap-4">
    <div v-click class="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
      <div class="text-sm font-bold text-red-300 mb-2">必知限制</div>
      <div class="text-xs text-gray-400 space-y-1">
        <div>• Code Node 無網路/檔案存取</div>
        <div>• HTTP Node 有 SSRF 防護</div>
        <div>• Loop 內不支援 Human Input</div>
        <div>• 無知識庫匯出功能</div>
      </div>
    </div>
    <div v-click class="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4">
      <div class="text-sm font-bold text-yellow-300 mb-2">升版要謹慎</div>
      <div class="text-xs text-gray-400 space-y-1">
        <div>• 升版前備份 PostgreSQL</div>
        <div>• 對比 .env.example 補新參數</div>
        <div>• 先在 staging 驗證</div>
        <div>• 每次只升 1–2 個版本</div>
      </div>
    </div>
    <div v-click class="rounded-xl border border-orange-500/30 bg-orange-500/5 p-4">
      <div class="text-sm font-bold text-orange-300 mb-2">常見坑</div>
      <div class="text-xs text-gray-400 space-y-1">
        <div>• SSRF 擋內網呼叫</div>
        <div>• SSE timeout 需調 nginx</div>
        <div>• Metadata Filter 讓查詢變慢</div>
        <div>• Celery Worker 調優缺文件</div>
      </div>
    </div>
    <div v-click class="rounded-xl border border-green-500/30 bg-green-500/5 p-4">
      <div class="text-sm font-bold text-green-300 mb-2">省錢技巧</div>
      <div class="text-xs text-gray-400 space-y-1">
        <div>• 格式化用 Template Node</div>
        <div>• 條件判斷用 IF/ELSE</div>
        <div>• 簡單任務用輕量模型</div>
        <div>• Parameter Extractor 取代 prompt</div>
      </div>
    </div>
    <div v-click class="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
      <div class="text-sm font-bold text-blue-300 mb-2">RAG 調優</div>
      <div class="text-xs text-gray-400 space-y-1">
        <div>• Hybrid Search + Reranker 最佳</div>
        <div>• Chunk Size 依文件類型調整</div>
        <div>• Score Threshold 過濾低相關</div>
        <div>• Embedding 選定後不能換</div>
      </div>
    </div>
    <div v-click class="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-4">
      <div class="text-sm font-bold text-cyan-300 mb-2">選型建議</div>
      <div class="text-xs text-gray-400 space-y-1">
        <div>• Prototype 首選 Dify</div>
        <div>• 需 git 版控考慮純程式碼</div>
        <div>• 混合架構取兩者優點</div>
        <div>• MCP 整合仍是 early stage</div>
      </div>
    </div>
  </div>
  <div class="mt-5 text-center text-xs text-gray-600">
    官方文件：https://docs.dify.ai　·　GitHub：github.com/langgenius/dify
  </div>
</div>
