<script setup lang="ts">
import { ref } from 'vue'

interface ToolCall {
  id: number
  tool: string
  status: 'pending' | 'running' | 'done'
  desc: string
  duration?: number
}

const isRunning = ref(false)
const isDone = ref(false)

const toolCalls = ref<ToolCall[]>([
  { id: 1, tool: 'navigate', status: 'pending', desc: 'http://localhost:3000/slow-page' },
  { id: 2, tool: 'start_trace', status: 'pending', desc: '開始錄製 performance trace...' },
  { id: 3, tool: 'screenshot', status: 'pending', desc: '截取頁面初始狀態截圖' },
  { id: 4, tool: 'stop_trace', status: 'pending', desc: '停止追蹤並收集 trace 資料' },
  { id: 5, tool: 'get_trace_data', status: 'pending', desc: '分析 LCP / 長任務 / CLS' },
  { id: 6, tool: 'get_network_requests', status: 'pending', desc: '分析 Network 請求耗時' },
  { id: 7, tool: 'get_console_messages', status: 'pending', desc: '檢查 Console 錯誤訊息' },
])

async function runDemo() {
  if (isRunning.value) return
  isRunning.value = true
  isDone.value = false
  toolCalls.value.forEach(t => {
    t.status = 'pending'
    t.duration = undefined
  })

  for (let i = 0; i < toolCalls.value.length; i++) {
    toolCalls.value[i].status = 'running'
    await sleep(500 + Math.random() * 600)
    toolCalls.value[i].status = 'done'
    toolCalls.value[i].duration = Math.floor(80 + Math.random() * 850)
  }
  await sleep(300)
  isDone.value = true
  isRunning.value = false
}

function reset() {
  isDone.value = false
  isRunning.value = false
  toolCalls.value.forEach(t => { t.status = 'pending'; t.duration = undefined })
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const statusColor: Record<ToolCall['status'], string> = {
  pending: '#475569',
  running: '#fbbf24',
  done: '#10b981',
}
const statusIcon: Record<ToolCall['status'], string> = {
  pending: '○',
  running: '●',
  done: '✓',
}
</script>

<template>
  <div class="demo-controller">
    <!-- Left: Tool log -->
    <div class="panel">
      <div class="panel-header">
        <span class="panel-title">🔧 MCP 工具呼叫日誌</span>
        <div class="flex gap-2">
          <button @click="reset" class="btn-secondary">↺ 重置</button>
          <button @click="runDemo" :disabled="isRunning" class="btn-run">
            <span v-if="isRunning" class="blink">⏳ 執行中...</span>
            <span v-else>▶ 執行 Demo</span>
          </button>
        </div>
      </div>
      <div class="tool-list">
        <div v-for="call in toolCalls" :key="call.id" class="tool-row"
          :style="{ borderLeftColor: statusColor[call.status] }">
          <span class="tool-status-icon" :style="{ color: statusColor[call.status] }">
            {{ statusIcon[call.status] }}
          </span>
          <div class="tool-info">
            <span class="tool-name">{{ call.tool }}</span>
            <span class="tool-desc">{{ call.desc }}</span>
          </div>
          <span v-if="call.duration" class="tool-duration">{{ call.duration }}ms</span>
          <span v-else-if="call.status === 'running'" class="tool-duration blink">...</span>
        </div>
      </div>
    </div>

    <!-- Right: Analysis result -->
    <div class="panel">
      <div class="panel-header">
        <span class="panel-title">🤖 Claude AI 分析結果</span>
        <span v-if="isDone" class="badge-done">分析完成</span>
      </div>
      <div v-if="!isDone" class="empty-state">
        <div class="empty-icon">🔬</div>
        <div class="empty-text">點擊「執行 Demo」開始 AI 分析</div>
      </div>
      <div v-else class="results">
        <div class="result-card red">
          <div class="result-title">⚠️ LCP 超標（4.2s）</div>
          <div class="result-body">主圖片缺少 <code>loading="eager"</code> 且未設定尺寸，導致 CLS 達 0.32（超標）</div>
          <div class="result-fix">建議：加上 width/height 屬性並使用 fetchpriority="high"</div>
        </div>
        <div class="result-card yellow">
          <div class="result-title">⚡ 長任務 680ms</div>
          <div class="result-body"><code>main.chunk.js:2847</code> 同步計算阻塞主執行緒</div>
          <div class="result-fix">建議：改用 <code>requestIdleCallback</code> 延遲非關鍵計算</div>
        </div>
        <div class="result-card orange">
          <div class="result-title">🚫 Render-blocking × 3</div>
          <div class="result-body">3 個 CSS 檔案阻塞初始渲染，增加 350ms 延遲</div>
          <div class="result-fix">建議：加入 <code>&lt;link rel="preload"&gt;</code> hint</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-controller {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  height: 360px;
  font-size: 12px;
}
.panel {
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(59, 130, 246, 0.25);
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(30, 41, 59, 0.5);
  flex-shrink: 0;
}
.panel-title {
  font-size: 11px;
  font-weight: bold;
  color: #94a3b8;
}
.btn-run {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 4px 12px;
  cursor: pointer;
  font-size: 11px;
  font-weight: bold;
  transition: opacity 0.2s;
}
.btn-run:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn-secondary {
  background: rgba(51, 65, 85, 0.8);
  color: #94a3b8;
  border: 1px solid rgba(100, 116, 139, 0.4);
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 11px;
  transition: background 0.2s;
}
.btn-secondary:hover {
  background: rgba(71, 85, 105, 0.8);
}
.badge-done {
  font-size: 10px;
  color: #34d399;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 4px;
  padding: 2px 6px;
}
.tool-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.tool-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 6px;
  border-left: 3px solid;
  background: rgba(30, 41, 59, 0.5);
}
.tool-status-icon {
  font-size: 13px;
  width: 14px;
  text-align: center;
  flex-shrink: 0;
  font-family: monospace;
}
.tool-info {
  flex: 1;
  min-width: 0;
}
.tool-name {
  color: #60a5fa;
  font-family: monospace;
  font-weight: bold;
  font-size: 11px;
  display: block;
}
.tool-desc {
  color: #64748b;
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  margin-top: 1px;
}
.tool-duration {
  color: #475569;
  font-size: 10px;
  flex-shrink: 0;
  font-family: monospace;
}
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.empty-icon { font-size: 36px; opacity: 0.4; }
.empty-text { color: #475569; font-size: 12px; }
.results {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.result-card {
  border-radius: 8px;
  padding: 8px 10px;
}
.result-card.red {
  background: rgba(153, 27, 27, 0.25);
  border: 1px solid rgba(239, 68, 68, 0.35);
}
.result-card.yellow {
  background: rgba(120, 53, 15, 0.25);
  border: 1px solid rgba(245, 158, 11, 0.35);
}
.result-card.orange {
  background: rgba(124, 45, 18, 0.25);
  border: 1px solid rgba(249, 115, 22, 0.35);
}
.result-title {
  font-weight: bold;
  color: #e2e8f0;
  font-size: 11px;
  margin-bottom: 4px;
}
.result-body {
  color: #94a3b8;
  font-size: 10px;
  line-height: 1.4;
  margin-bottom: 3px;
}
.result-fix {
  color: #6ee7b7;
  font-size: 10px;
  line-height: 1.4;
}
code {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  padding: 0 3px;
  font-family: monospace;
  color: #fbbf24;
}
.blink {
  animation: blink 1s infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
</style>
