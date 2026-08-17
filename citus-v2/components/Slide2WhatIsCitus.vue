<script setup lang="ts">
import DiagramNode from './DiagramNode.vue'
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CONCEPT"
      title="Citus 是什麼？"
      subtitle="PostgreSQL 的分散式資料庫擴充套件，讓單機 PG 具備規模化能力"
    />

    <div class="grid grid-cols-3 gap-4 mt-6">
      <DiagramNode tone="cyan" title="Horizontal Scaling" subtitle="水平擴充" compact />
      <DiagramNode tone="cyan" title="Sharding" subtitle="資料分片" compact />
      <DiagramNode tone="cyan" title="Distributed Query" subtitle="分散式查詢" compact />
    </div>

    <div class="mt-6 text-sm text-zinc-300">
      資料由 <span class="text-cyan-300 font-semibold">Coordinator</span> 拆分到多個 <span class="text-blue-300 font-semibold">Worker</span>，對應用端完全透明。
    </div>
  </SlideShell>
</template>
