<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

// 字幕：第 n 個 click 顯示 lines[n]（可用 <em> 標重點）。lines 長度 = frontmatter clicks + 1。
// 錄影腳本 scripts/record.mjs 讀 .vsub__text 的字數決定每一步停多久。
const props = defineProps<{ lines: string[] }>()
const { $clicks } = useSlideContext()
const idx = computed(() => Math.min($clicks.value, props.lines.length - 1))
</script>

<template>
  <div class="vsub">
    <Transition name="vsub" mode="out-in">
      <p :key="idx" class="vsub__text" v-html="lines[idx]" />
    </Transition>
  </div>
</template>
