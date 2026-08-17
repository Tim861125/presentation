<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SUMMARY"
      title="核心總結與架構建議"
      subtitle="一句話記住本質差異與專案落地準則"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">核心認知</TechBadge>
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          <span class="text-amber-300 font-bold">SSEClientTransport</span> 是「舊式的雙通道事件推播拼湊模型」。<br/><br/>
          <span class="text-emerald-300 font-bold">StreamableHTTPClientTransport</span> 則是「新一代、統一在 HTTP 上的全雙工串流 RPC 模型」。
        </p>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">架構選型準則</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>所有全新雲端 / Web 專案：<span class="text-emerald-400 font-bold">一律採用 StreamableHTTP</span></li>
          <li>本地桌面整合（IDE / CLI）：<span class="text-cyan-400 font-bold">一律採用 Stdio</span></li>
          <li>SSE 僅保留給歷史舊服務的向後相容維護</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
