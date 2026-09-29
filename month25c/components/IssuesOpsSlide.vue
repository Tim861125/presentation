<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="OPS & INVESTIGATION"
      title="修正、排查與維運"
      subtitle="站點部署、問題排查、規格討論與技術研調"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">部署維運</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DEPLOY</span>
        </div>
        <h3 class="text-base font-semibold text-white mb-2">測試站與正式站更新</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>多次更新測試站與正式站版本</li>
          <li>以 Docker 容器化部署扣點排程服務（定時執行扣點任務）</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">排查與規格</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DEBUG</span>
        </div>
        <h3 class="text-base font-semibold text-white mb-2">問題排查與規格討論</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>AI 分析功能、會員紀錄查詢等站台問題排查</li>
          <li>扣點機制與檢索功能的規格撰寫、討論與修正</li>
        </ul>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">技術研調</TechBadge>
          <span class="text-xs font-mono text-zinc-400">LEARNING</span>
        </div>
        <h3 class="text-base font-semibold text-white mb-2">技術學習與建立</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>C# SSE 串流寫法研習與 MVC 專案建立</li>
          <li>Rancher 容器管理平台、MCP 與 vLLM 概念研調</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
