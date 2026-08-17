<script setup lang="ts">
import { ref } from "vue";

// debounce
function debounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timerID: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (timerID) clearTimeout(timerID);
    timerID = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

// Throttle
function throttle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timerID: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (timerID) return;
    timerID = setTimeout(() => {
      callback.apply(this, args);
      timerID = null;
    }, delay);
  };
}

// Counter states
const clickCount = ref(0);
const debounceCount = ref(0);
const throttleCount = ref(0);

// Callback functions
const debouncedCallback = debounce(() => {
  debounceCount.value++;
}, 500);

const throttledCallback = throttle(() => {
  throttleCount.value++;
}, 500);

// Handle button click
const handleClick = () => {
  clickCount.value++;
  debouncedCallback();
  throttledCallback();
};

// Reset function
const reset = () => {
  clickCount.value = 0;
  debounceCount.value = 0;
  throttleCount.value = 0;
};
</script>

<template>
  <div class="demo-container">
    <!-- Click Counter Display -->
    <div class="click-counter-card">
      <div class="click-counter">
        <div class="statistic">
          <div class="statistic-title">Total Button Clicks</div>
          <div class="statistic-value">{{ clickCount }}</div>
        </div>
      </div>
    </div>

    <!-- Main Button -->
    <div class="button-area">
      <button @click="handleClick" class="main-button">
        Click Me Rapidly!
      </button>
      <button @click="reset" class="reset-button">Reset</button>
    </div>

    <p class="instruction">
      Click the button rapidly to see the difference between debounce and
      throttle
    </p>

    <!-- Results Grid -->
    <div class="demo-grid">
      <!-- Debounce Version -->
      <div class="demo-card debounce-card">
        <div class="card-header">
          <span>Debounce (500ms)</span>
        </div>

        <div class="result-display">
          <div class="statistic">
            <div class="statistic-title">Executed</div>
            <div class="statistic-value">{{ debounceCount }}</div>
          </div>
        </div>

        <div class="card-footer">
          Executes only after you stop clicking for 500ms
        </div>
      </div>

      <!-- Throttle Version -->
      <div class="demo-card throttle-card">
        <div class="card-header">
          <span>Throttle (500ms)</span>
        </div>

        <div class="result-display">
          <div class="statistic">
            <div class="statistic-title">Executed</div>
            <div class="statistic-value">{{ throttleCount }}</div>
          </div>
        </div>

        <div class="card-footer">Executes at most once every 500ms</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  width: 100%;
  padding: 0.5rem;
  max-width: 100%;
  margin: 0 auto;
}

.click-counter-card {
  margin-bottom: 0.5rem;
  background: linear-gradient(
    135deg,
    rgba(103, 194, 58, 0.1),
    rgba(64, 158, 255, 0.1)
  );
  border: 2px solid #409eff;
  border-radius: 6px;
  padding: 0.5rem;
}

.click-counter {
  text-align: center;
}

.statistic {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statistic-title {
  font-size: 11px;
  color: #606266;
  margin-bottom: 4px;
  font-weight: 500;
}

.statistic-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #409eff;
}

.button-area {
  text-align: center;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
}

.main-button {
  font-size: 0.9rem;
  padding: 0.7rem 1.5rem;
  font-weight: 600;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.main-button:hover {
  background: #66b1ff;
}

.main-button:active {
  background: #3a8ee6;
  transform: scale(0.98);
}

.reset-button {
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  background: #909399;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.reset-button:hover {
  background: #a6a9ad;
}

.instruction {
  text-align: center;
  margin-bottom: 0.5rem;
  color: #909399;
  font-size: 0.75rem;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.demo-card {
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.75rem;
  transition: all 0.3s;
}

.demo-card:hover {
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
}

.debounce-card {
  border: 2px solid #409eff;
}

.throttle-card {
  border: 2px solid #67c23a;
}

.card-header {
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 0.5rem;
}

.result-display {
  text-align: center;
  padding: 1rem 0.25rem;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.result-display .statistic-value {
  font-size: 2rem;
}

.card-footer {
  text-align: center;
  color: #909399;
  font-size: 0.7rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 0.5rem;
}
</style>
