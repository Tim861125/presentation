<script setup lang="ts">
import ShardMap from './ShardMap.vue'
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="INTERNALS"
      title="建立 Shard 並分配"
      subtitle="切分成多個 Shard 再均勻分配至 Worker 節點"
    />

    <ShardMap class="mt-4" />

    <div class="mt-4 text-xs text-zinc-400">
      Citus 不是「一個 Worker 一份」，而是先切成多個 Shard 再分配 ➔ 擴容時可透過搬移 Shard 達成零停機 Rebalance。
    </div>
  </SlideShell>
</template>
