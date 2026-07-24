<script setup>
import DiagramNode from './DiagramNode.vue'
</script>

<template>
  <div class="grid grid-cols-2 gap-6 items-start">
    <!-- 一般 PostgreSQL -->
    <div class="flex flex-col items-center gap-2 w-full max-w-xs justify-self-center">
      <div class="text-xs font-mono opacity-60 mb-1">一般 PostgreSQL</div>
      <DiagramNode tone="slate" title="PostgreSQL Server" compact class="w-full text-center items-center" />
      <div class="h-3 w-px bg-slate-400/40" />
      <DiagramNode tone="slate" title="Database" compact class="w-full text-center items-center" />
      <div class="h-3 w-px bg-slate-400/40" />
      <DiagramNode tone="slate" title="Tables" compact class="w-full text-center items-center" />
      <div class="text-xs opacity-60 mt-2 text-center">
        單一節點（Scale Up）
      </div>
    </div>

    <!-- Citus 分散式 -->
    <div class="flex flex-col items-center gap-2 w-full">
      <div class="text-xs font-mono opacity-60 mb-1">Citus 分散式</div>
      <DiagramNode
        tone="cyan"
        title="Coordinator"
        subtitle="Metadata / Query Planner"
        compact
        class="w-full max-w-xs text-center items-center"
      />

      <!-- Tree connector -->
      <svg class="w-full h-4 text-cyan-400/40" viewBox="0 0 300 16" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M150 0 V8 M50 8 H250 M50 8 V16 M150 8 V16 M250 8 V16" />
      </svg>

      <div class="grid grid-cols-3 gap-2 w-full">
        <DiagramNode tone="blue" title="Worker 1" subtitle="Shard 1, 2" compact class="text-center items-center" />
        <DiagramNode tone="blue" title="Worker 2" subtitle="Shard 3, 4" compact class="text-center items-center" />
        <DiagramNode tone="blue" title="Worker 3" subtitle="Shard 5, 6" compact class="text-center items-center" />
      </div>

      <div class="text-xs text-cyan-400/90 mt-2 text-center">
        <div>資料分片（Sharding）</div>
        <div class="opacity-80 font-normal">水平擴充（Scale Out）</div>
      </div>
    </div>
  </div>
</template>
