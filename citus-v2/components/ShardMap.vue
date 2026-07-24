<script setup>
import DiagramNode from './DiagramNode.vue'
const workers = [
  { name: 'Worker1', shards: ['Shard1', 'Shard5', 'Shard9'] },
  { name: 'Worker2', shards: ['Shard2', 'Shard6', 'Shard10'] },
  { name: 'Worker3', shards: ['Shard3', 'Shard7', 'Shard11'] },
]
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="text-center text-sm opacity-70">
      一張 Distributed Table 切成多個 <span class="text-cyan-300">Shard</span>（例如 32 個），再分配到 Worker
    </div>
    <div class="grid grid-cols-3 gap-3">
      <DiagramNode
        v-for="w in workers"
        :key="w.name"
        tone="blue"
        :title="w.name"
        :items="w.shards"
        compact
      />
    </div>
  </div>
</template>
