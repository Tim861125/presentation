<script setup lang="ts">
import ZodDemo from './ZodDemo.vue'
</script>

<template>
  <SlideShell px="px-10">
    <SlideHeader
      eyebrow="INTERACTIVE DEMO"
      title="parse() vs safeParse() 實機演練"
      subtitle="即時輸入資料驗證與錯誤格式解析"
    />

    <div class="mt-2">
      <ZodDemo />
    </div>
  </SlideShell>
</template>
