<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ARCHITECTURE · REALTIME STREAMING"
      title="AI 通架構調整 — SSE 串流"
      subtitle="端到端 Server-Sent Events 低延遲串流通訊鏈路"
    />

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      <TechCard accent="emerald" class="p-4 flex flex-col justify-between">
        <div>
          <div class="text-xs font-mono text-emerald-400 mb-1">STEP 01</div>
          <h4 class="text-base font-semibold text-white mb-2">前端發起</h4>
          <p class="text-xs text-zinc-300">IPTECH 前端發送請求至 IPTECH Server</p>
        </div>
      </TechCard>

      <TechCard accent="sky" class="p-4 flex flex-col justify-between">
        <div>
          <div class="text-xs font-mono text-sky-400 mb-1">STEP 02</div>
          <h4 class="text-base font-semibold text-white mb-2">服務轉發</h4>
          <p class="text-xs text-zinc-300">IPTECH Server 轉送至 PatentPilotService</p>
        </div>
      </TechCard>

      <TechCard accent="purple" class="p-4 flex flex-col justify-between">
        <div>
          <div class="text-xs font-mono text-purple-400 mb-1">STEP 03</div>
          <h4 class="text-base font-semibold text-white mb-2">AI 處理</h4>
          <p class="text-xs text-zinc-300">PatentPilotService 轉送至 AI Agent 推理</p>
        </div>
      </TechCard>

      <TechCard accent="amber" class="p-4 flex flex-col justify-between">
        <div>
          <div class="text-xs font-mono text-amber-400 mb-1">STEP 04</div>
          <h4 class="text-base font-semibold text-white mb-2">SSE 串流</h4>
          <p class="text-xs text-zinc-300">沿原路以 SSE 實時打字串流推送至使用者端</p>
        </div>
      </TechCard>
    </div>
  </SlideShell>
</template>
