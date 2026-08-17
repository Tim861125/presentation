<script setup lang="ts">
import FtoCompareDemo from './FtoCompareDemo.vue'
</script>

<template>
  <SlideShell px="px-8">
    <SlideHeader
      eyebrow="LIVE DEMO"
      title="FTO × AI 產品比對功能實機展示"
      subtitle="① 點開面板 ➔ ② 貼上產品技術特徵 ➔ ③ 按「開始比對」即時串流產出侵權分析"
    />

    <div class="mt-2">
      <FtoCompareDemo />
    </div>
  </SlideShell>
</template>
