<script setup lang="ts">
import { useNav } from '@slidev/client'

// 直式影片：只有頂端一條進度條，不顯示頁碼。
const { currentPage, total } = useNav()
</script>

<template>
  <div class="vprogress">
    <div :style="{ width: `${(currentPage / total) * 100}%` }" />
  </div>
</template>
