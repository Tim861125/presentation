<script setup lang="ts">
import HashRouting from './HashRouting.vue'
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ROUTING"
      title="Hash 分片原理"
      subtitle="Citus 對 Distribution Column 取 Hash 決定資料存放節點"
    />

    <HashRouting class="mt-4" />
  </SlideShell>
</template>
