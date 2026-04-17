<template>
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
</template>
