<script setup lang="ts">
const props = defineProps<{
  level: 'high' | 'mid' | 'low'
}>()

const map = {
  high: { label: '高風險', color: '#f43f5e', dot: 0 },
  mid: { label: '中風險', color: '#f59e0b', dot: 1 },
  low: { label: '低風險', color: '#10b981', dot: 2 },
}
const cur = map[props.level]
const colors = ['#f43f5e', '#f59e0b', '#10b981']
</script>

<template>
  <div class="risk-light" :style="{ borderColor: cur.color + '66' }">
    <div class="lights">
      <span
        v-for="(c, i) in colors"
        :key="i"
        class="dot"
        :style="{
          background: i === cur.dot ? c : 'rgba(148,163,184,0.18)',
          boxShadow: i === cur.dot ? `0 0 14px ${c}` : 'none',
        }"
      />
    </div>
    <div class="label" :style="{ color: cur.color }">{{ cur.label }}</div>
  </div>
</template>

<style scoped>
.risk-light {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1px solid;
  background: rgba(15, 23, 42, 0.6);
}
.lights {
  display: flex;
  gap: 0.35rem;
}
.dot {
  width: 0.85rem;
  height: 0.85rem;
  border-radius: 50%;
  transition: all 0.3s;
}
.label {
  font-weight: 700;
  font-size: 0.95rem;
}
</style>
