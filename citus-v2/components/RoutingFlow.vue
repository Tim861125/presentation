<script setup>
defineProps({
  steps: { type: Array, required: true }, // array of strings
  tone: { type: String, default: 'cyan' },
})
const tones = {
  cyan: 'border-cyan-400/40 bg-cyan-400/5 text-cyan-200',
  blue: 'border-blue-400/40 bg-blue-400/5 text-blue-200',
}
</script>

<template>
  <div class="flex items-center flex-wrap gap-2 justify-center">
    <template v-for="(s, i) in steps" :key="i">
      <div
        class="rounded-md border px-3 py-1.5 font-mono text-sm"
        :class="tones[tone] || tones.cyan"
      >
        {{ s }}
      </div>
      <span v-if="i < steps.length - 1" class="text-cyan-400/60">→</span>
    </template>
  </div>
</template>
