<template>
  <div class="h-full flex flex-col justify-center px-8">
    <h2 class="text-2xl font-bold text-white mb-4">API 對照表與實務建議</h2>
    <div class="grid grid-cols-2 gap-6">

      <div>
        <div class="text-xs text-gray-400 mb-3">各端點對照</div>
        <table class="w-full text-xs">
          <thead>
            <tr class="text-gray-500 border-b border-white/10">
              <th class="text-left pb-1 font-normal">場景</th>
              <th class="text-left pb-1 font-normal">回應型態</th>
              <th class="text-left pb-1 font-normal">適合用途</th>
            </tr>
          </thead>
          <tbody class="font-mono space-y-1">
            <tr class="border-b border-white/5">
              <td class="py-1 text-green-400">blocking</td>
              <td class="py-1 text-gray-300">JSON</td>
              <td class="py-1 text-gray-500 font-sans">摘要 · 翻譯 · 單次生成</td>
            </tr>
            <tr class="border-b border-white/5">
              <td class="py-1 text-cyan-400">streaming</td>
              <td class="py-1 text-gray-300">SSE stream</td>
              <td class="py-1 text-gray-500 font-sans">即時輸出 · 長文生成</td>
            </tr>
            <tr class="border-b border-white/5">
              <td class="py-1 text-blue-400">文件輸入</td>
              <td class="py-1 text-gray-300">JSON</td>
              <td class="py-1 text-gray-500 font-sans">PDF · 文件摘要 · 問答</td>
            </tr>
            <tr class="border-b border-white/5">
              <td class="py-1 text-gray-300">GET run</td>
              <td class="py-1 text-gray-300">JSON</td>
              <td class="py-1 text-gray-500 font-sans">查狀態 · 查結果</td>
            </tr>
            <tr class="border-b border-white/5">
              <td class="py-1 text-orange-400">POST stop</td>
              <td class="py-1 text-gray-300">JSON</td>
              <td class="py-1 text-gray-500 font-sans">中止串流任務</td>
            </tr>
            <tr class="border-b border-white/5">
              <td class="py-1 text-gray-300">GET logs</td>
              <td class="py-1 text-gray-300">JSON</td>
              <td class="py-1 text-gray-500 font-sans">除錯 · 監控</td>
            </tr>
            <tr>
              <td class="py-1 text-gray-300">info / params</td>
              <td class="py-1 text-gray-300">JSON</td>
              <td class="py-1 text-gray-500 font-sans">初始化 · 動態表單</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <div class="text-xs text-gray-400 mb-3">實務建議</div>
        <div class="space-y-2">
          <InfoCard color="green">
            <div class="text-xs text-gray-300">一般任務用 <span class="font-mono text-green-300">blocking</span>，需要即時效果用 <span class="font-mono text-cyan-300">streaming</span></div>
          </InfoCard>
          <InfoCard color="blue">
            <div class="text-xs text-gray-300">有文件先呼叫 <span class="font-mono text-blue-300">/files/upload</span>，再傳 <span class="font-mono text-yellow-300">upload_file_id</span></div>
          </InfoCard>
          <InfoCard color="yellow">
            <div class="text-xs text-gray-300">執行後把 <span class="font-mono text-yellow-300">workflow_run_id</span> 存起來，方便查詢追蹤</div>
          </InfoCard>
          <InfoCard color="orange">
            <div class="text-xs text-gray-300">串流任務保留 <span class="font-mono text-orange-300">task_id</span>，前端「停止生成」按鈕需要它</div>
          </InfoCard>
          <Callout type="tip" class="mt-1">
            所有 response 都先看：<span class="font-mono">status · outputs · error · workflow_run_id</span>
          </Callout>
        </div>
      </div>

    </div>
  </div>
</template>
