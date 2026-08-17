<script setup lang="ts">
import ArchCompare from './ArchCompare.vue'
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ARCHITECTURE"
      title="架構對比"
      subtitle="單機 PostgreSQL vs Citus 分散式叢集"
    />

    <ArchCompare class="mt-4" />
  </SlideShell>
</template>
