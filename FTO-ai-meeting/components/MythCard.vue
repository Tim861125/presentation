<script setup lang="ts">
defineProps<{
  n: number | string
  myth: string
  truth: string
}>()
</script>

<template>
  <div class="myth-card">
    <div class="myth-row">
      <div class="badge badge-x">❌ 誤解 {{ n }}</div>
      <div class="myth-text">{{ myth }}</div>
    </div>
    <div class="truth-row">
      <div class="badge badge-ok">✅ 真相</div>
      <div class="truth-text"><slot>{{ truth }}</slot></div>
    </div>
  </div>
</template>

<style scoped>
.myth-card {
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 14px;
  background: rgba(30, 41, 59, 0.45);
  padding: 0.85rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}
.myth-row, .truth-row {
  display: flex;
  gap: 0.7rem;
  align-items: baseline;
}
.badge {
  flex: none;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  white-space: nowrap;
}
.badge-x {
  color: #fda4af;
  background: rgba(244, 63, 94, 0.14);
  border: 1px solid rgba(244, 63, 94, 0.3);
}
.badge-ok {
  color: #6ee7b7;
  background: rgba(16, 185, 129, 0.14);
  border: 1px solid rgba(16, 185, 129, 0.3);
}
.myth-text {
  font-weight: 600;
  color: #e2e8f0;
  font-size: 0.95rem;
}
.truth-text {
  color: #cbd5e1;
  font-size: 0.86rem;
  line-height: 1.5;
}
.truth-text :deep(strong) {
  color: #5eead4;
}
</style>
