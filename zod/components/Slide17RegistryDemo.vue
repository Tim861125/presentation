<script setup lang="ts">
import ZodRegistryDemo from './ZodRegistryDemo.vue'
</script>

<template>
  <SlideShell px="px-10">
    <SlideHeader
      eyebrow="INTERACTIVE DEMO"
      title="動態表單與 Metadata 實機互動"
      subtitle="透過 Registry 動態生成 UI 欄位與雙向校驗"
    />

    <div class="mt-2">
      <ZodRegistryDemo />
    </div>
  </SlideShell>
</template>
