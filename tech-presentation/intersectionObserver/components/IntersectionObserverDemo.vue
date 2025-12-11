<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ElCard, ElButton, ElTable, ElTableColumn, ElProgress } from 'element-plus'
import 'element-plus/dist/index.css'

// Debounce utility
function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return function(...args: any[]) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle utility
function throttle(func: Function, wait: number) {
  let lastTime = 0
  return function(...args: any[]) {
    const now = Date.now()
    if (now - lastTime >= wait) {
      lastTime = now
      func(...args)
    }
  }
}

// State for normal observer
const normalCount = ref(0)
const normalVisible = ref(false)
const normalRatio = ref(0)
const normalElement = ref<HTMLElement | null>(null)

// State for debounced observer
const debounceCount = ref(0)
const debounceVisible = ref(false)
const debounceRatio = ref(0)
const debounceElement = ref<HTMLElement | null>(null)

// State for throttled observer
const throttleCount = ref(0)
const throttleVisible = ref(false)
const throttleRatio = ref(0)
const throttleElement = ref<HTMLElement | null>(null)

// Observers
let normalObserver: IntersectionObserver | null = null
let debounceObserver: IntersectionObserver | null = null
let throttleObserver: IntersectionObserver | null = null

onMounted(() => {
  // Normal IntersectionObserver
  normalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      normalCount.value++
      normalVisible.value = entry.isIntersecting
      normalRatio.value = entry.intersectionRatio
    })
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] })

  // Debounced IntersectionObserver (300ms delay)
  const debouncedCallback = debounce((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      debounceCount.value++
      debounceVisible.value = entry.isIntersecting
      debounceRatio.value = entry.intersectionRatio
    })
  }, 300)

  debounceObserver = new IntersectionObserver((entries) => {
    debouncedCallback(entries)
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] })

  // Throttled IntersectionObserver (500ms interval)
  const throttledCallback = throttle((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      throttleCount.value++
      throttleVisible.value = entry.isIntersecting
      throttleRatio.value = entry.intersectionRatio
    })
  }, 500)

  throttleObserver = new IntersectionObserver((entries) => {
    throttledCallback(entries)
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] })

  // Start observing
  if (normalElement.value) normalObserver.observe(normalElement.value)
  if (debounceElement.value) debounceObserver.observe(debounceElement.value)
  if (throttleElement.value) throttleObserver.observe(throttleElement.value)
})

onUnmounted(() => {
  normalObserver?.disconnect()
  debounceObserver?.disconnect()
  throttleObserver?.disconnect()
})

const resetCounters = () => {
  normalCount.value = 0
  debounceCount.value = 0
  throttleCount.value = 0
}

// Table data for summary
const tableData = ref([
  {
    type: 'Normal',
    triggers: normalCount,
    useCase: 'Real-time tracking, immediate feedback'
  },
  {
    type: 'Debounce',
    triggers: debounceCount,
    useCase: 'API calls, expensive operations'
  },
  {
    type: 'Throttle',
    triggers: throttleCount,
    useCase: 'Analytics, consistent updates'
  }
])
</script>

<template>
  <div class="demo-container">
    <el-card class="header-card">
      <template #header>
        <div class="card-header">
          <h1>IntersectionObserver Demo</h1>
        </div>
      </template>
      <p class="description-text">Scroll down to see the boxes enter and leave the viewport</p>
      <el-button type="primary" @click="resetCounters" size="large">Reset Counters</el-button>
    </el-card>

    <div class="spacer">Scroll down</div>

    <!-- Normal IntersectionObserver -->
    <div class="demo-section">
      <el-card class="stats-card" shadow="hover">
        <template #header>
          <h2>Normal Observer</h2>
        </template>
        <div class="stats">
          <div class="stat-item">
            <span class="label">Trigger Count:</span>
            <el-button type="info" size="small" circle>{{ normalCount }}</el-button>
          </div>
          <div class="stat-item">
            <span class="label">Visible:</span>
            <el-button :type="normalVisible ? 'success' : 'info'" size="small">
              {{ normalVisible ? 'Yes' : 'No' }}
            </el-button>
          </div>
          <div class="stat-item">
            <span class="label">Intersection Ratio:</span>
            <span class="value">{{ (normalRatio * 100).toFixed(0) }}%</span>
          </div>
        </div>
        <el-progress
          :percentage="normalRatio * 100"
          :color="'#409EFF'"
          :show-text="false"
        />
        <p class="description">
          Fires on every threshold change (0%, 25%, 50%, 75%, 100%)
        </p>
      </el-card>
      <div
        ref="normalElement"
        :class="['observed-box', normalVisible ? 'visible' : '']"
      >
        <span class="box-label">Normal</span>
        <div class="ratio-display">{{ (normalRatio * 100).toFixed(0) }}%</div>
      </div>
    </div>

    <div class="spacer"></div>

    <!-- Debounced IntersectionObserver -->
    <div class="demo-section">
      <el-card class="stats-card debounce" shadow="hover">
        <template #header>
          <h2>Debounced Observer (300ms)</h2>
        </template>
        <div class="stats">
          <div class="stat-item">
            <span class="label">Trigger Count:</span>
            <el-button type="warning" size="small" circle>{{ debounceCount }}</el-button>
          </div>
          <div class="stat-item">
            <span class="label">Visible:</span>
            <el-button :type="debounceVisible ? 'success' : 'info'" size="small">
              {{ debounceVisible ? 'Yes' : 'No' }}
            </el-button>
          </div>
          <div class="stat-item">
            <span class="label">Intersection Ratio:</span>
            <span class="value">{{ (debounceRatio * 100).toFixed(0) }}%</span>
          </div>
        </div>
        <el-progress
          :percentage="debounceRatio * 100"
          :color="'#E6A23C'"
          :show-text="false"
        />
        <p class="description">
          Waits 300ms after last intersection change before updating
        </p>
      </el-card>
      <div
        ref="debounceElement"
        :class="['observed-box debounce', debounceVisible ? 'visible' : '']"
      >
        <span class="box-label">Debounce</span>
        <div class="ratio-display">{{ (debounceRatio * 100).toFixed(0) }}%</div>
      </div>
    </div>

    <div class="spacer"></div>

    <!-- Throttled IntersectionObserver -->
    <div class="demo-section">
      <el-card class="stats-card throttle" shadow="hover">
        <template #header>
          <h2>Throttled Observer (500ms)</h2>
        </template>
        <div class="stats">
          <div class="stat-item">
            <span class="label">Trigger Count:</span>
            <el-button type="danger" size="small" circle>{{ throttleCount }}</el-button>
          </div>
          <div class="stat-item">
            <span class="label">Visible:</span>
            <el-button :type="throttleVisible ? 'success' : 'info'" size="small">
              {{ throttleVisible ? 'Yes' : 'No' }}
            </el-button>
          </div>
          <div class="stat-item">
            <span class="label">Intersection Ratio:</span>
            <span class="value">{{ (throttleRatio * 100).toFixed(0) }}%</span>
          </div>
        </div>
        <el-progress
          :percentage="throttleRatio * 100"
          :color="'#F56C6C'"
          :show-text="false"
        />
        <p class="description">
          Updates at most once every 500ms during continuous intersection changes
        </p>
      </el-card>
      <div
        ref="throttleElement"
        :class="['observed-box throttle', throttleVisible ? 'visible' : '']"
      >
        <span class="box-label">Throttle</span>
        <div class="ratio-display">{{ (throttleRatio * 100).toFixed(0) }}%</div>
      </div>
    </div>

    <div class="spacer">Scroll up</div>

    <el-card class="summary-card">
      <template #header>
        <h3>Comparison Summary</h3>
      </template>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="type" label="Type" width="150">
          <template #default="scope">
            <el-button
              :type="scope.row.type === 'Normal' ? 'primary' : scope.row.type === 'Debounce' ? 'warning' : 'danger'"
              size="small"
            >
              {{ scope.row.type }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="triggers" label="Triggers" width="120">
          <template #default="scope">
            <strong>{{ scope.row.triggers }}</strong>
          </template>
        </el-table-column>
        <el-table-column prop="useCase" label="Use Case" />
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
}

.header-card {
  text-align: center;
  margin-bottom: 40px;
}

.card-header h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 2.5em;
}

.description-text {
  margin: 0 0 20px 0;
  color: #666;
  font-size: 1.1em;
}

.spacer {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #999;
  font-weight: 500;
}

.demo-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
}

.stats-card {
  border-left: 4px solid #409EFF;
}

.stats-card.debounce {
  border-left-color: #E6A23C;
}

.stats-card.throttle {
  border-left-color: #F56C6C;
}

.stats-card h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.3em;
}

.stats {
  margin-bottom: 20px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.stat-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: 500;
  color: #555;
}

.value {
  font-weight: 600;
  color: #2c3e50;
  font-family: 'Courier New', monospace;
  font-size: 16px;
}

.description {
  color: #666;
  font-size: 0.9em;
  margin: 15px 0 0 0;
  font-style: italic;
}

.observed-box {
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  opacity: 0.3;
  transform: scale(0.95);
  transition: all 0.5s ease;
}

.observed-box.debounce {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.observed-box.throttle {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.observed-box.visible {
  opacity: 1;
  transform: scale(1);
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
}

.box-label {
  font-size: 28px;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.ratio-display {
  font-size: 48px;
  font-weight: 700;
  font-family: 'Courier New', monospace;
}

.summary-card {
  margin-top: 40px;
}

.summary-card h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.8em;
  text-align: center;
}

@media (max-width: 768px) {
  .demo-section {
    grid-template-columns: 1fr;
  }

  .card-header h1 {
    font-size: 1.8em;
  }

  .spacer {
    height: 200px;
  }
}
</style>
