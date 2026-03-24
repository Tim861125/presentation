<script setup lang="ts">
import { ref, computed } from 'vue'

const lcpValue = ref(2.5)
const inpValue = ref(200)
const clsValue = ref(0.1)

type Status = 'good' | 'moderate' | 'poor'

function getStatus(value: number, good: number, poor: number): Status {
  if (value <= good) return 'good'
  if (value <= poor) return 'moderate'
  return 'poor'
}

const config: Record<Status, { color: string; label: string; bg: string; border: string }> = {
  good:     { color: '#10b981', label: '優秀 ✓', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.35)' },
  moderate: { color: '#f59e0b', label: '需改善 ⚠', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)' },
  poor:     { color: '#ef4444', label: '差 ✗',   bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.35)' },
}

const metrics = computed(() => [
  {
    key: 'lcp',
    name: 'LCP',
    full: 'Largest Contentful Paint',
    value: lcpValue.value,
    displayValue: lcpValue.value.toFixed(1),
    unit: 's',
    min: 0, max: 6, step: 0.1,
    good: 2.5, poor: 4.0,
    status: getStatus(lcpValue.value, 2.5, 4.0),
    desc: '最大內容繪製時間',
    marks: ['0s', 'Good ≤2.5s', 'Poor >4s', '6s'],
  },
  {
    key: 'inp',
    name: 'INP',
    full: 'Interaction to Next Paint',
    value: inpValue.value,
    displayValue: String(Math.round(inpValue.value)),
    unit: 'ms',
    min: 0, max: 1000, step: 10,
    good: 200, poor: 500,
    status: getStatus(inpValue.value, 200, 500),
    desc: '互動回應時間',
    marks: ['0ms', 'Good ≤200ms', 'Poor >500ms', '1s'],
  },
  {
    key: 'cls',
    name: 'CLS',
    full: 'Cumulative Layout Shift',
    value: clsValue.value,
    displayValue: clsValue.value.toFixed(2),
    unit: '',
    min: 0, max: 1, step: 0.01,
    good: 0.1, poor: 0.25,
    status: getStatus(clsValue.value, 0.1, 0.25),
    desc: '累積版面偏移分數',
    marks: ['0', 'Good ≤0.1', 'Poor >0.25', '1'],
  },
])

function getSliderBg(m: { value: number; min: number; max: number; status: Status }) {
  const pct = ((m.value - m.min) / (m.max - m.min)) * 100
  const c = config[m.status].color
  return `linear-gradient(to right, ${c} 0%, ${c} ${pct}%, rgba(51,65,85,0.5) ${pct}%)`
}

function onInput(key: string, e: Event) {
  const v = parseFloat((e.target as HTMLInputElement).value)
  if (key === 'lcp') lcpValue.value = v
  else if (key === 'inp') inpValue.value = v
  else clsValue.value = v
}
</script>

<template>
  <div class="metrics-vis">
    <div class="vis-header">
      <span class="header-title">⚡ Core Web Vitals 即時模擬器</span>
      <span class="header-hint">拖動滑桿查看指標狀態變化</span>
    </div>

    <div class="metrics-list">
      <div
        v-for="m in metrics" :key="m.key"
        class="metric-row"
        :style="{ background: config[m.status].bg, borderColor: config[m.status].border }"
      >
        <!-- Left: identity -->
        <div class="metric-id">
          <span class="m-name" :style="{ color: config[m.status].color }">{{ m.name }}</span>
          <span class="m-full">{{ m.full }}</span>
          <span class="m-desc">{{ m.desc }}</span>
        </div>

        <!-- Center: slider -->
        <div class="slider-area">
          <input
            type="range"
            class="m-slider"
            :min="m.min"
            :max="m.max"
            :step="m.step"
            :value="m.value"
            :style="{ background: getSliderBg(m) }"
            @input="onInput(m.key, $event)"
          />
          <div class="marks">
            <span class="mark green">{{ m.marks[0] }}</span>
            <span class="mark green">{{ m.marks[1] }}</span>
            <span class="mark red">{{ m.marks[2] }}</span>
            <span class="mark red">{{ m.marks[3] }}</span>
          </div>
        </div>

        <!-- Right: value + status -->
        <div class="metric-val">
          <span class="m-val" :style="{ color: config[m.status].color }">
            {{ m.displayValue }}{{ m.unit }}
          </span>
          <span class="m-status" :style="{ color: config[m.status].color }">
            {{ config[m.status].label }}
          </span>
        </div>
      </div>
    </div>

    <!-- Summary badges -->
    <div class="summary">
      <div
        v-for="m in metrics" :key="m.key"
        class="summary-badge"
        :style="{ background: config[m.status].bg, borderColor: config[m.status].border }"
      >
        <span class="sb-name" :style="{ color: config[m.status].color }">{{ m.name }}</span>
        <span class="sb-status" :style="{ color: config[m.status].color }">{{ config[m.status].label }}</span>
        <span class="sb-val">{{ m.displayValue }}{{ m.unit }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.metrics-vis {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 360px;
  font-size: 12px;
}
.vis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 12px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  flex-shrink: 0;
}
.header-title { font-weight: bold; color: #e2e8f0; font-size: 12px; }
.header-hint { color: #64748b; font-size: 10px; }

.metrics-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
}
.metric-row {
  border: 1px solid;
  border-radius: 10px;
  padding: 10px 14px;
  display: grid;
  grid-template-columns: 160px 1fr 90px;
  align-items: center;
  gap: 14px;
  flex: 1;
}
.metric-id {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.m-name {
  font-size: 22px;
  font-weight: 900;
  line-height: 1;
}
.m-full {
  color: #94a3b8;
  font-size: 9px;
  line-height: 1.3;
}
.m-desc {
  color: #64748b;
  font-size: 9px;
}

.slider-area {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.m-slider {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  outline: none;
  border: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
}
.m-slider::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #f1f5f9;
  cursor: pointer;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
}
.m-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #f1f5f9;
  cursor: pointer;
  border: none;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
}
.marks {
  display: flex;
  justify-content: space-between;
  font-size: 9px;
}
.mark.green { color: #6ee7b7; }
.mark.red { color: #fca5a5; }

.metric-val {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
}
.m-val {
  font-size: 24px;
  font-weight: bold;
  font-family: monospace;
  line-height: 1;
}
.m-status {
  font-size: 11px;
  font-weight: bold;
}

.summary {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}
.summary-badge {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border: 1px solid;
  border-radius: 8px;
  gap: 2px;
}
.sb-name {
  font-weight: 900;
  font-size: 16px;
}
.sb-status {
  font-size: 11px;
  font-weight: bold;
}
.sb-val {
  color: #64748b;
  font-size: 10px;
  font-family: monospace;
}
</style>
