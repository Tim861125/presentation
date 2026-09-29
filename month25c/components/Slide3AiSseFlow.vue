<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ARCHITECTURE · REALTIME STREAMING"
      title="AI 通架構調整 — SSE 串流"
      subtitle="WEBPAT 與 IPTECH（專利檢索與智慧分析平台）的 AI 詢問功能改為端到端 Server-Sent Events 串流"
    />

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      <TechCard accent="emerald" class="p-4 flex flex-col justify-between">
        <div>
          <div class="text-xs font-mono text-emerald-400 mb-1">STEP 01</div>
          <h4 class="text-base font-semibold text-white mb-2">前端發起</h4>
          <p class="text-xs text-zinc-300">前端發送提問請求至平台後端</p>
        </div>
      </TechCard>

      <TechCard accent="sky" class="p-4 flex flex-col justify-between">
        <div>
          <div class="text-xs font-mono text-sky-400 mb-1">STEP 02</div>
          <h4 class="text-base font-semibold text-white mb-2">後端轉發</h4>
          <p class="text-xs text-zinc-300">後端設定 text/event-stream 標頭，轉送至 PatentPilotService（AI 中介微服務）</p>
        </div>
      </TechCard>

      <TechCard accent="purple" class="p-4 flex flex-col justify-between">
        <div>
          <div class="text-xs font-mono text-purple-400 mb-1">STEP 03</div>
          <h4 class="text-base font-semibold text-white mb-2">AI 推理</h4>
          <p class="text-xs text-zinc-300">PatentPilotService 呼叫 AI Agent 生成回應</p>
        </div>
      </TechCard>

      <TechCard accent="amber" class="p-4 flex flex-col justify-between">
        <div>
          <div class="text-xs font-mono text-amber-400 mb-1">STEP 04</div>
          <h4 class="text-base font-semibold text-white mb-2">SSE 串流返回</h4>
          <p class="text-xs text-zinc-300">沿原路以 SSE 逐字串流推送至前端，低延遲打字效果</p>
        </div>
      </TechCard>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
      <div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
        <p class="text-xs text-zinc-300 leading-relaxed">移除前端 JWT 傳遞，改由後端直連 AI 服務</p>
      </div>
      <div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
        <p class="text-xs text-zinc-300 leading-relaxed">AI 呼叫前先建立觸發紀錄、回應後更新，作為扣點依據</p>
      </div>
      <div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
        <p class="text-xs text-zinc-300 leading-relaxed">魚骨圖等舊有速讀通接口統一改採同一 AskQuestion API</p>
      </div>
    </div>
  </SlideShell>
</template>
