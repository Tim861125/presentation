<template>
  <div class="h-full flex flex-col px-8 py-6">
    <h2 class="text-2xl font-bold text-white mb-4">Live Demo — Streaming API</h2>

    <div class="grid grid-cols-2 gap-5 flex-1 min-h-0">

      <!-- Left: request form -->
      <div class="flex flex-col gap-3">
        <div class="text-xs text-gray-400 font-mono mb-1">POST /v1/workflows/run</div>

        <div class="bg-gray-800/60 rounded border border-white/10 p-3 text-xs font-mono text-gray-400 leading-relaxed">
          <div><span class="text-blue-400">Authorization:</span> Bearer <span class="text-yellow-300">app-rkKYlZ···</span></div>
          <div><span class="text-blue-400">response_mode:</span> <span class="text-cyan-300">streaming</span></div>
          <div class="mt-1"><span class="text-blue-400">user_question:</span></div>
        </div>

        <textarea
          v-model="question"
          :disabled="loading"
          rows="3"
          placeholder="輸入問題，例如：Good morning!"
          class="w-full bg-gray-800/80 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-600 resize-none focus:outline-none focus:border-blue-500/50"
        />

        <button
          @click="send"
          :disabled="loading || !question.trim()"
          class="px-4 py-2 rounded text-sm font-mono transition-colors"
          :class="loading
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer'"
        >
          {{ loading ? '接收中…' : '▶  Send Request' }}
        </button>

        <button
          v-if="loading"
          @click="stop"
          class="px-4 py-2 rounded text-sm font-mono bg-red-700 hover:bg-red-600 text-white cursor-pointer transition-colors"
        >
          ■  Stop
        </button>

        <!-- event log -->
        <div class="mt-auto">
          <div class="text-xs text-gray-500 mb-1">Events</div>
          <div class="bg-gray-900/60 rounded border border-white/10 p-2 h-20 overflow-y-auto text-xs font-mono space-y-0.5">
            <div v-for="(e, i) in events" :key="i" :class="eventColor(e.type)">
              <span class="text-gray-600">{{ e.type }}</span>
              <span v-if="e.node" class="ml-1 text-gray-500">{{ e.node }}</span>
            </div>
            <div v-if="events.length === 0" class="text-gray-700">—</div>
          </div>
        </div>
      </div>

      <!-- Right: output -->
      <div class="flex flex-col min-h-0">
        <div class="text-xs text-gray-400 mb-1">Output</div>
        <div
          ref="outputEl"
          class="flex-1 bg-gray-900/60 rounded border border-white/10 p-3 text-sm text-gray-200 leading-relaxed overflow-y-auto whitespace-pre-wrap break-words"
        >{{ output || '…' }}</div>

        <div v-if="runId" class="mt-2 text-xs font-mono text-gray-600">
          workflow_run_id: <span class="text-gray-400">{{ runId }}</span>
        </div>
        <div v-if="elapsed" class="text-xs font-mono text-gray-600">
          elapsed: <span class="text-green-400">{{ elapsed }}s</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { runStreaming } from '../composables/useWorkflowApi'

const question = ref('Good morning!')
const output = ref('')
const events = ref<{ type: string; node?: string }[]>([])
const runId = ref('')
const elapsed = ref('')
const loading = ref(false)
const outputEl = ref<HTMLElement>()

let abortController: AbortController | null = null

function eventColor(type: string) {
  if (type === 'workflow_finished') return 'text-green-400'
  if (type === 'text_chunk') return 'text-cyan-400'
  if (type === 'workflow_started') return 'text-blue-400'
  if (type.includes('error')) return 'text-red-400'
  return 'text-gray-500'
}

async function send() {
  output.value = ''
  events.value = []
  runId.value = ''
  elapsed.value = ''
  loading.value = true
  abortController = new AbortController()

  try {
    await runStreaming(
      question.value,
      async (text) => {
        output.value += text
        await nextTick()
        if (outputEl.value) outputEl.value.scrollTop = outputEl.value.scrollHeight
      },
      (type, data) => {
        events.value.push({ type, node: data?.data?.node_id })
        if (type === 'workflow_finished') {
          runId.value = data?.workflow_run_id ?? ''
          elapsed.value = data?.data?.elapsed_time ?? ''
        }
      },
      abortController.signal,
    )
  } catch (e: any) {
    if (e?.name !== 'AbortError') {
      output.value = `Error: ${e?.message ?? e}`
      events.value.push({ type: 'error' })
    }
  } finally {
    loading.value = false
    abortController = null
  }
}

function stop() {
  abortController?.abort()
  loading.value = false
}
</script>
