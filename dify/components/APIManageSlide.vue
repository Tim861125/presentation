<template>
  <div class="h-full flex flex-col px-8 py-5">
    <h2 class="text-2xl font-bold text-white mb-3">File Input &amp; Management API</h2>
    <div class="grid grid-cols-2 gap-6 flex-1 min-h-0">

      <!-- left: file input -->
      <div class="flex flex-col gap-3">
        <div class="text-xs text-gray-400 mb-1">File Input — 在 inputs 中傳入</div>
        <InfoCard title="local_file — 先上傳再引用" color="blue">
          <pre class="text-xs font-mono text-gray-300 leading-relaxed">"file": {
  "type": "document",
  "transfer_method": "local_file",
  "upload_file_id": "file-123456"
}</pre>
        </InfoCard>
        <InfoCard title="remote_url — 直接給網址" color="purple">
          <pre class="text-xs font-mono text-gray-300 leading-relaxed">"file": {
  "type": "document",
  "transfer_method": "remote_url",
  "url": "https://example.com/doc.pdf"
}</pre>
        </InfoCard>
        <Callout type="caution">remote_url 需公開可存取，下載失敗會中斷 workflow</Callout>
      </div>

      <!-- right: management endpoints with run buttons -->
      <div class="flex flex-col min-h-0">
        <div class="text-xs text-gray-400 mb-2">Management Endpoints</div>
        <div class="space-y-1.5 text-xs font-mono mb-3">
          <div v-for="ep in endpoints" :key="ep.id" class="flex items-center gap-2">
            <span :class="ep.method === 'GET' ? 'text-green-400' : 'text-orange-400'" class="w-10 shrink-0">{{ ep.method }}</span>
            <span class="text-gray-300 flex-1">{{ ep.path }}</span>
            <button @click="runEndpoint(ep)" :disabled="ep.loading"
              class="px-2 py-0.5 rounded text-xs font-mono transition-colors shrink-0"
              :class="ep.loading ? 'bg-gray-700 text-gray-500' : 'bg-white/10 hover:bg-white/20 text-gray-300 cursor-pointer'">
              {{ ep.loading ? '…' : '▶' }}
            </button>
          </div>
        </div>

        <!-- result panel -->
        <div class="flex-1 bg-gray-900/60 rounded border border-white/10 p-2 overflow-auto min-h-0">
          <div v-if="activeLabel" class="text-xs text-gray-500 font-mono mb-1">{{ activeLabel }}</div>
          <div v-if="resultError" class="text-xs text-red-400 font-mono">{{ resultError }}</div>
          <pre v-else-if="result" class="text-xs text-gray-200 whitespace-pre-wrap break-words font-mono">{{ JSON.stringify(result, null, 2) }}</pre>
          <div v-else class="text-xs text-gray-700">點擊 ▶ 執行並查看回應</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getInfo, getParameters, getLogs } from '../composables/useWorkflowApi'

const result = ref<any>(null)
const resultError = ref('')
const activeLabel = ref('')

const endpoints = reactive([
  { id: 'info',   method: 'GET', path: '/v1/info',              label: 'GET /v1/info',              fn: getInfo,       loading: false },
  { id: 'params', method: 'GET', path: '/v1/parameters',        label: 'GET /v1/parameters',        fn: getParameters, loading: false },
  { id: 'logs',   method: 'GET', path: '/v1/workflows/logs',    label: 'GET /v1/workflows/logs',    fn: getLogs,       loading: false },
])

async function runEndpoint(ep: typeof endpoints[0]) {
  ep.loading = true
  result.value = null
  resultError.value = ''
  activeLabel.value = ep.label
  try {
    result.value = await ep.fn()
  } catch (e: any) {
    resultError.value = e?.message ?? String(e)
  } finally {
    ep.loading = false
  }
}
</script>
