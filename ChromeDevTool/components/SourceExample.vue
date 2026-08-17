<template>
  <div class="rounded-xl border border-white/10 bg-white/[0.03] p-6 flex flex-col items-center justify-center gap-4">
    <button
      id="countBtn"
      class="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all shadow-lg hover:scale-105 active:scale-95"
      @click="handleClick"
    >
      點我測試斷點
    </button>
    <div class="flex items-center gap-2 text-sm font-mono text-zinc-300">
      <span>已點擊次數：</span>
      <span id="result" class="text-xl font-bold text-emerald-400">{{ count }}</span>
      <span>次</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

function handleClick() {
  count.value++
}
</script>
