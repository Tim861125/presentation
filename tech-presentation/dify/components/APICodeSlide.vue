<template>
  <div class="h-full flex flex-col px-8 py-5">
    <h2 class="text-2xl font-bold text-white mb-3">API 範例</h2>

    <div class="flex gap-2 mb-3 items-center">
      <span class="text-xs text-gray-400 font-mono shrink-0">user_question:</span>
      <input
        v-model="question"
        class="flex-1 bg-gray-800/80 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-blue-500/50"
        placeholder="Good morning!"
      />
    </div>

    <div class="grid grid-cols-2 gap-5 flex-1 min-h-0">

      <!-- blocking -->
      <div class="flex flex-col gap-2 min-h-0">
        <div class="text-xs font-mono text-green-400">blocking</div>
        <pre class="bg-gray-800/60 rounded border border-white/10 p-3 text-xs text-gray-200 font-mono leading-relaxed shrink-0">POST /v1/workflows/run

{
  "inputs": { "user_question": "..." },
  "response_mode": "blocking",
  "user": "Tim"
}</pre>
        <button @click="runBlock" :disabled="blockLoading"
          class="px-3 py-1.5 rounded text-xs font-mono transition-colors"
          :class="blockLoading ? 'bg-gray-700 text-gray-500' : 'bg-green-700 hover:bg-green-600 text-white cursor-pointer'">
          {{ blockLoading ? '執行中…' : '▶ Run' }}
        </button>
        <div class="flex-1 bg-gray-900/60 rounded border border-white/10 p-2 overflow-auto min-h-0 text-xs font-mono">
          <div v-if="blockError" class="text-red-400">{{ blockError }}</div>
          <pre v-else-if="blockResult" class="text-gray-200 whitespace-pre-wrap break-words">{{ JSON.stringify(blockResult, null, 2) }}</pre>
          <div v-else class="text-gray-700">回應會顯示在這裡</div>
        </div>
      </div>

      <!-- streaming -->
      <div class="flex flex-col gap-2 min-h-0">
        <div class="text-xs font-mono text-cyan-400">streaming</div>
        <pre class="bg-gray-800/60 rounded border border-white/10 p-3 text-xs text-gray-200 font-mono leading-relaxed shrink-0">POST /v1/workflows/run

{
  "inputs": { "user_question": "..." },
  "response_mode": "streaming",
  "user": "Tim"
}</pre>
        <div class="flex gap-2">
          <button @click="runStream" :disabled="streamLoading"
            class="flex-1 px-3 py-1.5 rounded text-xs font-mono transition-colors"
            :class="streamLoading ? 'bg-gray-700 text-gray-500' : 'bg-cyan-700 hover:bg-cyan-600 text-white cursor-pointer'">
            {{ streamLoading ? '接收中…' : '▶ Run' }}
          </button>
          <button v-if="streamLoading" @click="stopStream"
            class="px-3 py-1.5 rounded text-xs font-mono bg-red-700 hover:bg-red-600 text-white cursor-pointer">■ Stop</button>
        </div>
        <div class="flex-1 bg-gray-900/60 rounded border border-white/10 p-2 overflow-auto min-h-0 text-xs font-mono">
          <div v-if="streamError" class="text-red-400">{{ streamError }}</div>
          <div v-else-if="streamLines.length">
            <div v-for="(line, i) in streamLines" :key="i"
              :class="line.startsWith('event:') ? 'text-cyan-400' : line.startsWith('data:') ? 'text-gray-300' : 'text-gray-700'">
              {{ line }}
            </div>
          </div>
          <div v-else class="text-gray-700">SSE 事件流會顯示在這裡</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { runBlocking } from '../composables/useWorkflowApi'

const BASE = 'http://localhost/v1'
const KEY = 'app-rkKYlZ4HyQmnN5Bj0EaYp9Cd'

const question = ref('Good morning!')

const blockLoading = ref(false)
const blockResult = ref<any>(null)
const blockError = ref('')

const streamLoading = ref(false)
const streamLines = ref<string[]>([])
const streamError = ref('')
let abortCtrl: AbortController | null = null

async function runBlock() {
  blockLoading.value = true
  blockResult.value = null
  blockError.value = ''
  try {
    blockResult.value = await runBlocking(question.value)
  } catch (e: any) {
    blockError.value = e?.message ?? String(e)
  } finally {
    blockLoading.value = false
  }
}

async function runStream() {
  streamLoading.value = true
  streamLines.value = []
  streamError.value = ''
  abortCtrl = new AbortController()
  try {
    const res = await fetch(`${BASE}/workflows/run`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: { user_question: question.value }, response_mode: 'streaming', user: 'Tim' }),
      signal: abortCtrl.signal,
    })
    const reader = res.body!.getReader()
    const decoder = new TextDecoder()
    let buf = ''
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buf += decoder.decode(value, { stream: true })
      const lines = buf.split('\n')
      buf = lines.pop() ?? ''
      let skipNext = false
      for (const line of lines) {
        if (line.startsWith('event:') && line.includes('ping')) { skipNext = true; continue }
        if (skipNext && line.startsWith('data:')) { skipNext = false; continue }
        skipNext = false
        if (line.trim()) streamLines.value.push(line)
      }
    }
  } catch (e: any) {
    if (e?.name !== 'AbortError') streamError.value = e?.message ?? String(e)
  } finally {
    streamLoading.value = false
  }
}

function stopStream() { abortCtrl?.abort() }
</script>
