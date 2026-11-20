<script setup lang="ts">
import { computed } from 'vue'
import { useNav, configs } from '@slidev/client'

// 頁尾文字：headmatter 的 `footer:`，沒填就用 `title`；`footer: false` 關掉整條頁尾
// （Slidev 會同時渲染 theme 與 deck 的 global-bottom，deck 自己做頁尾時要關掉這條）
const { currentLayout, currentPage, total } = useNav()
const dark = computed(() => ['cover', 'section'].includes(currentLayout.value))
const footer = computed(() => (configs as Record<string, any>).footer ?? configs.title)
</script>

<template>
  <footer v-if="footer !== false && currentLayout !== 'cover'" class="sk-footer" :class="{ 'sk-footer--dark': dark }">
    <span class="sk-footer__dot" />
    <span>{{ footer }}</span>
    <span class="ml-auto tabular-nums">{{ currentPage }} / {{ total }}</span>
  </footer>
</template>
