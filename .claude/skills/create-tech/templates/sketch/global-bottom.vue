<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentLayout, currentPage, total } = useNav()
const dark = computed(() => ['cover', 'section'].includes(currentLayout.value))
</script>

<template>
  <footer v-if="currentLayout !== 'cover'" class="sk-footer" :class="{ 'sk-footer--dark': dark }">
    <span class="sk-footer__dot" />
    <span>TOPIC · RD 技術分享</span>
    <span class="ml-auto tabular-nums">{{ currentPage }} / {{ total }}</span>
  </footer>
</template>
