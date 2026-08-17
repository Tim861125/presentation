<script setup lang="ts">
import RoutingFlow from './RoutingFlow.vue'
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ROUTING"
      title="INSERT / SELECT Routing"
      subtitle="寫入與查詢流程精準路由"
    />

    <div class="text-xs font-mono text-zinc-400 mb-2">INSERT — 依 Hash 找到目標 Worker</div>
    <RoutingFlow :steps="['Client', 'Coordinator', 'Hash(pn)', '找到 Shard', 'Worker2', 'INSERT']" />

    <div class="text-xs font-mono text-zinc-400 mt-6 mb-2">SELECT — 直接定位，不需廣播查詢所有 Worker</div>
    <RoutingFlow tone="blue" :steps="['Coordinator', 'Hash(US..01)', 'Worker2', '只查此節點']" />

    <div class="mt-6 text-sm text-cyan-300 text-center">使用者不需知道資料實際在哪台機器。</div>
  </SlideShell>
</template>
