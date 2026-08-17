<script setup lang="ts">
import DiagramNode from './DiagramNode.vue'
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="API PARAMETERS"
      title="兩個核心參數"
      subtitle="指定目標資料表與分片依據欄位"
    />

    <div class="grid grid-cols-2 gap-6 mt-4">
      <DiagramNode
        tone="cyan"
        title="① Table Name"
        subtitle="'l1_kda_biblio'"
        :items="['哪一張 PostgreSQL Table', '要變成分散式資料表']"
      />
      <DiagramNode
        tone="blue"
        title="② Distribution Column"
        subtitle="'formatted_pn'"
        :items="['用哪個欄位的值', '決定資料分配到哪台 Worker']"
      />
    </div>

    <div class="mt-6 text-sm text-zinc-400">
      第二個參數又稱 <span class="text-cyan-300 font-mono">Distribution Key</span> 或 <span class="text-cyan-300 font-mono">Sharding Key</span>。
    </div>
  </SlideShell>
</template>
