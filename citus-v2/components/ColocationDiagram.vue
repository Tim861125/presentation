<script setup>
import DiagramNode from './DiagramNode.vue'

// mode: 'good' (colocation) | 'bad' (cross-node)
defineProps({
  mode: { type: String, default: 'good' },
})
</script>

<template>
  <!-- Colocation：同鍵分片，JOIN 本機完成 -->
  <div v-if="mode === 'good'" class="flex flex-col gap-3">
    <div class="grid grid-cols-3 gap-3">
      <DiagramNode tone="blue" title="Worker1" :items="['Patent  US..01', 'Assignee US..01', 'Inventor US..01']" compact />
      <DiagramNode tone="blue" title="Worker2" :items="['Patent  US..02', 'Assignee US..02', 'Inventor US..02']" compact />
      <DiagramNode tone="blue" title="Worker3" :items="['Patent  US..03', 'Assignee US..03', 'Inventor US..03']" compact />
    </div>
    <div class="text-center text-sm text-green-300">
      ✓ 相同 <code class="text-cyan-300">formatted_pn</code> 的資料落在同一 Worker → JOIN 本機完成
    </div>
  </div>

  <!-- Cross-node：不同鍵，需搬資料 -->
  <div v-else class="flex flex-col gap-3">
    <div class="grid grid-cols-2 gap-4">
      <DiagramNode tone="blue" title="Worker1" subtitle="依 formatted_pn 分片" :items="['Patent  US10000001']" compact />
      <DiagramNode tone="red" title="Worker2" subtitle="依 assignee 分片" :items="['Assignee  Google']" compact />
    </div>
    <div class="flex items-center justify-center gap-2 text-red-300 text-sm">
      <span>JOIN</span><span>→</span><span>跨 Node 搬資料</span>
    </div>
    <div class="text-center text-xs text-red-300/90">
      ✗ 網路傳輸成本高 &nbsp;·&nbsp; ✗ 大資料量時非常慢
    </div>
  </div>
</template>
