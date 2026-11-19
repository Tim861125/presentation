<script setup lang="ts">
// 沒有字幕的頁面（封面、結尾）用它告訴錄影腳本要停多久（毫秒）。
defineProps<{ ms: number }>()
</script>

<template>
  <span class="vhold" :data-hold="ms" style="display: none" />
</template>
