<script setup lang="ts">
defineProps<{
  n: number | string
  title: string
  combo: string
  infringe: boolean
}>()
</script>

<template>
  <div class="case-card" :class="infringe ? 'is-bad' : 'is-good'">
    <div class="case-head">
      <span class="case-n">案例 {{ n }}</span>
      <span class="case-title">{{ title }}</span>
      <span class="case-combo">{{ combo }}</span>
      <span class="case-verdict">{{ infringe ? '❌ 侵權' : '✅ 不侵權' }}</span>
    </div>
    <div class="case-body"><slot /></div>
  </div>
</template>

<style scoped>
.case-card {
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-left-width: 4px;
  border-radius: 12px;
  background: rgba(30, 41, 59, 0.45);
  padding: 0.65rem 1rem;
}
.is-bad { border-left-color: #f43f5e; }
.is-good { border-left-color: #10b981; }
.case-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 0.35rem;
}
.case-n {
  flex: none;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.12rem 0.5rem;
  border-radius: 999px;
  color: #cbd5e1;
  background: rgba(148, 163, 184, 0.15);
}
.case-title {
  font-weight: 700;
  color: #e2e8f0;
  font-size: 0.95rem;
}
.case-combo {
  font-family: ui-monospace, monospace;
  font-size: 0.8rem;
  color: #5eead4;
  background: rgba(45, 212, 191, 0.1);
  padding: 0.05rem 0.45rem;
  border-radius: 6px;
}
.case-verdict {
  margin-left: auto;
  font-weight: 800;
  font-size: 0.85rem;
}
.is-bad .case-verdict { color: #fda4af; }
.is-good .case-verdict { color: #6ee7b7; }
.case-body {
  font-size: 0.82rem;
  line-height: 1.5;
  color: #cbd5e1;
}
.case-body :deep(strong) { color: #fcd34d; }
</style>
