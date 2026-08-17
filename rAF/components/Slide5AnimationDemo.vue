<script setup lang="ts">
import AnimationDemo from './AnimationDemo.vue'
</script>

<template>
  <SlideShell px="px-10">
    <SlideHeader
      eyebrow="INTERACTIVE DEMO"
      title="rAF vs setInterval 動畫流暢度實機對比"
      subtitle="實際體驗幀率抖動與同步重繪的巨大視覺差距"
    />

    <div class="mt-2 flex justify-center">
      <AnimationDemo />
    </div>
  </SlideShell>
</template>
