<script setup lang="ts">
import ColocationDiagram from './ColocationDiagram.vue'
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ANTI-PATTERN"
      title="錯誤設計：Cross-node Join"
      subtitle="Patent 依 formatted_pn、Assignee 卻依 assignee 分片"
    />

    <ColocationDiagram mode="bad" class="mt-4" />

    <div class="mt-4 text-xs text-rose-400">
      跨節點查詢時必須透過網路傳輸大量資料，產生極高的延遲與頻寬消耗。
    </div>
  </SlideShell>
</template>
