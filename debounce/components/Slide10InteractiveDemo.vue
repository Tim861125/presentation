<script setup lang="ts">
import DebounceThrottleDemo from './DebounceThrottleDemo.vue'
</script>

<template>
  <SlideShell px="px-10">
    <SlideHeader
      eyebrow="INTERACTIVE DEMO"
      title="Debounce 與 Throttle 視覺化互動演練"
      subtitle="連續按鈕點擊與計數器即時響應對比"
    />

    <div class="mt-2">
      <DebounceThrottleDemo />
    </div>
  </SlideShell>
</template>
