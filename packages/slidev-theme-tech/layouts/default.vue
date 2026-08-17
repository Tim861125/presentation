<script setup lang="ts">
import SlideShell from '../components/SlideShell.vue'
</script>

<template>
  <SlideShell>
    <div class="slidev-layout default flex-1 flex flex-col justify-start">
      <slot />
    </div>
  </SlideShell>
</template>
