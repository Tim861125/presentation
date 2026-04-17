<template>
  <div class="h-full flex flex-col px-8 py-5">
    <h2 class="text-2xl font-bold text-white mb-3">API Response 格式</h2>

    <div class="flex gap-2 mb-3 items-center">
      <span class="text-xs text-gray-400 font-mono shrink-0">user_question:</span>
      <input
        v-model="question"
        class="flex-1 bg-gray-800/80 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-blue-500/50"
        placeholder="Good morning!"
      />
      <button @click="runBlock" :disabled="loading"
        class="px-3 py-1.5 rounded text-xs font-mono transition-colors shrink-0"
        :class="loading ? 'bg-gray-700 text-gray-500' : 'bg-green-700 hover:bg-green-600 text-white cursor-pointer'">
        {{ loading ? '執行中…' : '▶ Run blocking' }}
      </button>
    </div>

    <div class="grid grid-cols-2 gap-5 flex-1 min-h-0">

      <!-- left: annotated schema -->
      <div class="flex flex-col gap-2">
        <div class="text-xs font-mono text-green-400 mb-1">blocking — 欄位說明</div>
        <pre class="bg-gray-800/60 rounded border border-white/10 p-3 text-xs font-mono leading-relaxed flex-1 overflow-auto">{
  <span class="text-yellow-400">"task_id"</span>:          <span class="text-gray-500">// 停止串流用</span>
  <span class="text-yellow-400">"workflow_run_id"</span>:   <span class="text-gray-500">// 查詢 / 追蹤</span>
  <span class="text-yellow-400">"data"</span>: {
    <span class="text-yellow-400">"status"</span>:         <span class="text-green-300">"succeeded"</span>
    <span class="text-yellow-400">"outputs"</span>:        <span class="text-gray-500">// 最終結果</span>
    <span class="text-yellow-400">"error"</span>:          <span class="text-gray-500">// 失敗時非 null</span>
    <span class="text-yellow-400">"elapsed_time"</span>:   <span class="text-gray-500">// 執行秒數</span>
    <span class="text-yellow-400">"total_steps"</span>:    <span class="text-gray-500">// 節點總數</span>
    <span class="text-yellow-400">"created_at"</span>:     <span class="text-gray-500">// Unix timestamp</span>
    <span class="text-yellow-400">"finished_at"</span>:    <span class="text-gray-500">// Unix timestamp</span>
  }
}</pre>
      </div>

      <!-- right: live response -->
      <div class="flex flex-col gap-2">
        <div class="text-xs font-mono text-green-400 mb-1">實際回應</div>
        <div class="flex-1 bg-gray-900/60 rounded border border-white/10 p-3 overflow-auto min-h-0">
          <div v-if="error" class="text-xs text-red-400 font-mono">{{ error }}</div>
          <div v-else-if="res" class="text-xs font-mono space-y-1">
            <div><span class="text-yellow-400">task_id:</span> <span class="text-gray-300">{{ res.task_id }}</span></div>
            <div><span class="text-yellow-400">workflow_run_id:</span> <span class="text-gray-300">{{ res.workflow_run_id }}</span></div>
            <div class="mt-1"><span class="text-yellow-400">status:</span>
              <span :class="res.data?.status === 'succeeded' ? 'text-green-400' : 'text-red-400'" class="ml-1">{{ res.data?.status }}</span>
            </div>
            <div><span class="text-yellow-400">elapsed_time:</span> <span class="text-gray-300">{{ res.data?.elapsed_time }}s</span></div>
            <div><span class="text-yellow-400">total_steps:</span> <span class="text-gray-300">{{ res.data?.total_steps }}</span></div>
            <div v-if="res.data?.error"><span class="text-red-400">error:</span> <span class="text-red-300">{{ res.data.error }}</span></div>
            <div class="mt-2"><span class="text-yellow-400">outputs:</span></div>
            <pre class="text-gray-200 pl-2 whitespace-pre-wrap break-words">{{ JSON.stringify(res.data?.outputs, null, 2) }}</pre>
          </div>
          <div v-else class="text-xs text-gray-700">執行後顯示實際欄位</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { runBlocking } from '../composables/useWorkflowApi'

const question = ref('Good morning!')
const loading = ref(false)
const res = ref<any>(null)
const error = ref('')

async function runBlock() {
  loading.value = true
  res.value = null
  error.value = ''
  try {
    res.value = await runBlocking(question.value)
  } catch (e: any) {
    error.value = e?.message ?? String(e)
  } finally {
    loading.value = false
  }
}
</script>
