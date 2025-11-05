<template>
  <div>
    <button id="countBtn" @click="handleClick">點我</button>
    <p id="result">已點擊 {{ count }} 次</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

function handleClick() {
  count.value++
}
</script>
