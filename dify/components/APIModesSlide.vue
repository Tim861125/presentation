<template>
  <div class="h-full flex flex-col px-8 py-5">
    <h2 class="text-2xl font-bold text-white mb-3">Workflow API — 呼叫方式</h2>

    <!-- shared input -->
    <div class="flex gap-2 mb-3 items-center">
      <span class="text-xs text-gray-400 font-mono shrink-0">user_question:</span>
      <input
        v-model="question"
        class="flex-1 bg-gray-800/80 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-blue-500/50"
        placeholder="Good morning!"
      />
    </div>

    <div class="grid grid-cols-2 gap-4 flex-1 min-h-0">

      <!-- blocking -->
      <div class="flex flex-col gap-2">
        <InfoCard title="blocking — 同步等待" color="green">
          <div class="text-xs space-y-1">
            <div class="text-gray-300">等 Workflow 完成後一次回傳結果</div>
            <div class="text-gray-500">適合：摘要 · 翻譯 · 改寫 · 單次生成</div>
          </div>
        </InfoCard>
        <button @click="runBlock" :disabled="blockLoading"
          class="px-3 py-1.5 rounded text-xs font-mono transition-colors"
          :class="blockLoading ? 'bg-gray-700 text-gray-500' : 'bg-green-700 hover:bg-green-600 text-white cursor-pointer'">
          {{ blockLoading ? '執行中…' : '▶ Run blocking' }}
        </button>
        <div class="flex-1 bg-gray-900/60 rounded border border-white/10 p-2 overflow-auto min-h-0">
          <div v-if="blockError" class="text-xs text-red-400 font-mono">{{ blockError }}</div>
          <div v-else-if="blockResult" class="text-xs font-mono space-y-0.5">
            <div><span class="text-yellow-400">status:</span> <span class="text-green-300">{{ blockResult.data?.status }}</span></div>
            <div><span class="text-yellow-400">elapsed_time:</span> <span class="text-gray-300">{{ blockResult.data?.elapsed_time }}s</span></div>
            <div><span class="text-yellow-400">outputs:</span></div>
            <div class="text-gray-300 pl-2 whitespace-pre-wrap break-words">{{ outputText(blockResult) }}</div>
          </div>
          <div v-else class="text-xs text-gray-700">—</div>
        </div>
      </div>

      <!-- streaming -->
      <div class="flex flex-col gap-2">
        <InfoCard title="streaming — SSE 串流" color="cyan">
          <div class="text-xs space-y-1">
            <div class="text-gray-300">邊跑邊回傳 Server-Sent Events</div>
            <div class="text-gray-500 font-mono leading-relaxed">workflow_started → text_chunk → workflow_finished</div>
          </div>
        </InfoCard>
        <div class="flex gap-2">
          <button @click="runStream" :disabled="streamLoading"
            class="flex-1 px-3 py-1.5 rounded text-xs font-mono transition-colors"
            :class="streamLoading ? 'bg-gray-700 text-gray-500' : 'bg-cyan-700 hover:bg-cyan-600 text-white cursor-pointer'">
            {{ streamLoading ? '接收中…' : '▶ Run streaming' }}
          </button>
          <button v-if="streamLoading" @click="stopStream"
            class="px-3 py-1.5 rounded text-xs font-mono bg-red-700 hover:bg-red-600 text-white cursor-pointer">■</button>
        </div>
        <div class="flex-1 bg-gray-900/60 rounded border border-white/10 p-2 overflow-auto min-h-0">
          <div v-if="streamError" class="text-xs text-red-400 font-mono">{{ streamError }}</div>
          <div v-else-if="streamEvents.length || streamOutput" class="space-y-1">
            <div class="flex flex-wrap gap-1 mb-1">
              <span v-for="(e,i) in streamEvents" :key="i"
                class="text-xs font-mono px-1 rounded"
                :class="e === 'text_chunk' ? 'text-cyan-400 bg-cyan-900/30' : e === 'workflow_finished' ? 'text-green-400 bg-green-900/30' : 'text-gray-500 bg-white/5'">
                {{ e }}
              </span>
            </div>
            <div class="text-xs text-gray-200 whitespace-pre-wrap break-words">{{ streamOutput }}</div>
          </div>
          <div v-else class="text-xs text-gray-700">—</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { runBlocking, runStreaming } from '../composables/useWorkflowApi'

const question = ref('Good morning!')

const blockLoading = ref(false)
const blockResult = ref<any>(null)
const blockError = ref('')

const streamLoading = ref(false)
const streamOutput = ref('')
const streamEvents = ref<string[]>([])
const streamError = ref('')
let abortCtrl: AbortController | null = null

function outputText(r: any) {
  const outs = r?.data?.outputs
  if (!outs) return ''
  return Object.values(outs).join('\n')
}

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
  streamOutput.value = ''
  streamEvents.value = []
  streamError.value = ''
  abortCtrl = new AbortController()
  try {
    await runStreaming(
      question.value,
      (text) => { streamOutput.value += text },
      (type) => { if (type !== 'ping' && !streamEvents.value.includes(type)) streamEvents.value.push(type) },
      abortCtrl.signal,
    )
  } catch (e: any) {
    if (e?.name !== 'AbortError') streamError.value = e?.message ?? String(e)
  } finally {
    streamLoading.value = false
  }
}

function stopStream() { abortCtrl?.abort() }
</script>
