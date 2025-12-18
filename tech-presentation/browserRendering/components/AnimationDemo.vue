<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const isAnimating = ref(false)

// rAF 方塊的位置
const rafPosition = ref(0)
// setTimeout 方塊的位置
const timeoutPosition = ref(0)

const fps = ref(0)

let rafAnimationId: number | null = null
let timeoutIntervalId: number | null = null
let lastTimestamp = 0
let frameCount = 0
let lastFpsUpdate = 0

const SPEED = 100 // pixels per second
const MAX_TRANSLATE = 300

// requestAnimationFrame 動畫
function animateWithRAF(timestamp: number) {
  if (!lastTimestamp) {
    lastTimestamp = timestamp
    lastFpsUpdate = timestamp
  }

  const deltaTime = timestamp - lastTimestamp
  lastTimestamp = timestamp

  // 更新 rAF 方塊位置
  rafPosition.value += (SPEED * deltaTime) / 1000

  // 邊界檢查並反彈
  if (rafPosition.value >= MAX_TRANSLATE) {
    rafPosition.value = MAX_TRANSLATE
  }

  // 計算 FPS
  frameCount++
  if (timestamp - lastFpsUpdate >= 1000) {
    fps.value = Math.round((frameCount * 1000) / (timestamp - lastFpsUpdate))
    frameCount = 0
    lastFpsUpdate = timestamp
  }

  if (isAnimating.value) {
    rafAnimationId = requestAnimationFrame(animateWithRAF)
  }
}

// setTimeout/setInterval 動畫
function animateWithTimeout() {
  // 每次固定增加的距離（假設 60fps）
  const increment = SPEED / 60

  timeoutPosition.value += increment

  // 邊界檢查
  if (timeoutPosition.value >= MAX_TRANSLATE) {
    timeoutPosition.value = MAX_TRANSLATE
  }
}

function toggleAnimation() {
  isAnimating.value = !isAnimating.value

  if (isAnimating.value) {
    lastTimestamp = 0
    // 啟動 rAF 動畫
    rafAnimationId = requestAnimationFrame(animateWithRAF)
    // 啟動 setInterval 動畫（嘗試 60fps = 16.67ms）
    timeoutIntervalId = window.setInterval(animateWithTimeout, 16.67)
  } else {
    // 停止 rAF 動畫
    if (rafAnimationId !== null) {
      cancelAnimationFrame(rafAnimationId)
      rafAnimationId = null
    }
    // 停止 setInterval 動畫
    if (timeoutIntervalId !== null) {
      clearInterval(timeoutIntervalId)
      timeoutIntervalId = null
    }
  }
}

function reset() {
  if (isAnimating.value) {
    toggleAnimation()
  }
  rafPosition.value = 0
  timeoutPosition.value = 0
  fps.value = 0
  lastTimestamp = 0
  frameCount = 0
}

// 清理
onUnmounted(() => {
  if (rafAnimationId !== null) {
    cancelAnimationFrame(rafAnimationId)
  }
  if (timeoutIntervalId !== null) {
    clearInterval(timeoutIntervalId)
  }
})
</script>

<template>
  <div class="animation-demo" p="6" bg="gray-50 dark:gray-800" rounded="lg" w="full" max-w="4xl">
    <!-- 控制面板 -->
    <div class="controls" flex="~" gap="4" items="center" justify="center" mb="6">
      <button
        @click="toggleAnimation"
        px="6"
        py="2"
        rounded="md"
        font="semibold"
        bg="blue-500 hover:blue-600"
        text="white"
        transition="all"
        outline="!none"
      >
        {{ isAnimating ? '暫停' : '開始' }}
      </button>
      <button
        @click="reset"
        px="6"
        py="2"
        rounded="md"
        font="semibold"
        bg="gray-500 hover:gray-600"
        text="white"
        transition="all"
        outline="!none"
      >
        重置
      </button>
      <div
        px="4"
        py="2"
        rounded="md"
        bg="green-100 dark:green-900"
        text="green-800 dark:green-100"
        font="mono semibold"
      >
        FPS: {{ fps }}
      </div>
    </div>

    <!-- 動畫區域 -->
    <div class="animation-area" relative h="80" bg="gray-100 dark:gray-900" rounded="lg" overflow="hidden" border="2 gray-300 dark:gray-700">
      <!-- requestAnimationFrame 方塊 -->
      <div
        class="raf-box"
        absolute
        top="10"
        left="10"
        w="16"
        h="16"
        bg="gradient-to-br from-cyan-400 to-blue-500"
        rounded="lg"
        shadow="xl"
        flex="~"
        items="center"
        justify="center"
        text="white text-xs"
        font="bold"
        :style="{
          transform: `translateX(${rafPosition}px)`,
          willChange: 'transform'
        }"
      >
        rAF
      </div>

      <!-- setInterval 方塊 -->
      <div
        class="timeout-box"
        absolute
        bottom="10"
        left="10"
        w="16"
        h="16"
        bg="gradient-to-br from-pink-400 to-rose-500"
        rounded="lg"
        shadow="xl"
        flex="~"
        items="center"
        justify="center"
        text="white text-xs"
        font="bold"
        :style="{
          transform: `translateX(${timeoutPosition}px)`,
          willChange: 'transform'
        }"
      >
        16ms
      </div>
    </div>

    <!-- 說明 -->
    <div class="info" mt="6" text="sm gray-600 dark:gray-300" space-y="2">
      <p flex="~" items="center" gap="2">
        <span w="4" h="4" bg="cyan-400" rounded="sm"></span>
        <strong>青色方塊（rAF）：</strong> 使用 <code bg="gray-200 dark:gray-600" px="1" rounded>requestAnimationFrame</code> 驅動動畫
      </p>
      <p flex="~" items="center" gap="2">
        <span w="4" h="4" bg="pink-400" rounded="sm"></span>
        <strong>粉色方塊（16ms）：</strong> 使用 <code bg="gray-200 dark:gray-600" px="1" rounded>setInterval(16.67ms)</code> 驅動動畫
      </p>
      <p>
        <strong>比較：</strong> 仔細觀察兩個方塊的流暢度差異，rAF 會與瀏覽器重繪同步，傳統方法可能出現掉幀或不流暢
      </p>
    </div>
  </div>
</template>

<style scoped>
.animation-demo {
  font-family: system-ui, -apple-system, sans-serif;
}

code {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9em;
}
</style>
