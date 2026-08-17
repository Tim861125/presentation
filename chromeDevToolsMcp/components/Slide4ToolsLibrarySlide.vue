<script setup lang="ts">
import ToolsLibrary from './ToolsLibrary.vue'
</script>

<template>
  <SlideShell px="px-10">
    <SlideHeader
      eyebrow="CAPABILITIES"
      title="核心工具箱：27 種強大能力"
      subtitle="涵蓋導航、控制、監控、模擬與除錯全方位支援"
    />

    <div class="mt-2">
      <ToolsLibrary />
    </div>
  </SlideShell>
</template>
