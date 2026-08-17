<script setup lang="ts">
import IntersectionObserverDemo from './IntersectionObserverDemo.vue'
</script>

<template>
  <SlideShell px="px-10">
    <SlideHeader
      eyebrow="INTERACTIVE DEMO"
      title="IntersectionObserver 實機互動體驗"
      subtitle="可視度閾值、重疊面積比例與進入/離開即時監測"
    />

    <div class="mt-2">
      <IntersectionObserverDemo />
    </div>
  </SlideShell>
</template>
