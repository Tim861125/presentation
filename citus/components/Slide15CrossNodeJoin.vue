<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ANTI-PATTERN"
      title="錯誤設計：Cross-node Join"
      subtitle="不同 Table 使用不一致的分片鍵"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div class="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 font-mono text-xs text-zinc-300 space-y-3">
        <div class="p-3 rounded bg-black/40">Worker 1: Patent (US10000001)</div>
        <div class="p-3 rounded bg-black/40">Worker 2: Assignee (Google)</div>
      </div>

      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">跨節點代價</TechBadge>
        </div>
        <ul class="text-sm text-zinc-300 space-y-3 list-disc list-inside leading-relaxed">
          <li class="text-rose-400 font-semibold">必須跨節點進行大量網路資料傳輸</li>
          <li class="text-rose-400 font-semibold">海量資料下 JOIN 查詢效能極具惡化</li>
          <li>增加 Coordinator 節點記憶體與 CPU 瓶頸</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>
