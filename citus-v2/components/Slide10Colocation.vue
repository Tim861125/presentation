<script setup lang="ts">
import ColocationDiagram from './ColocationDiagram.vue'
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="BEST PRACTICE"
      title="正確設計：Colocation 共置"
      subtitle="所有相關業務表使用同一個 Distribution Key"
    />

    <div class="mt-2">
      <JsonCard
        filename="colocation.sql"
        :code="`create_distributed_table('l1_kda_biblio',  'formatted_pn');
create_distributed_table('l1_kda_assignee','formatted_pn');
create_distributed_table('l1_kda_inventor','formatted_pn');`"
      />
    </div>

    <ColocationDiagram mode="good" class="mt-3" />
  </SlideShell>
</template>
