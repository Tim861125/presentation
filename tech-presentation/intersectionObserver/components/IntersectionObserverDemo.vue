<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { ElCard, ElButton, ElSwitch } from "element-plus";
import "element-plus/dist/index.css";

// Debounce utility
function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (...args: any[]) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Box 数据
interface Box {
  id: string;
  label: string;
  element: HTMLElement | null;
  isVisible: boolean;
  hasCalledAPI: boolean;
}

const boxes = ref<Box[]>([
  {
    id: "box1",
    label: "Box 1",
    element: null,
    isVisible: false,
    hasCalledAPI: false,
  },
  {
    id: "box2",
    label: "Box 2",
    element: null,
    isVisible: false,
    hasCalledAPI: false,
  },
  {
    id: "box3",
    label: "Box 3",
    element: null,
    isVisible: false,
    hasCalledAPI: false,
  },
  {
    id: "box4",
    label: "Box 4",
    element: null,
    isVisible: false,
    hasCalledAPI: false,
  },
  {
    id: "box5",
    label: "Box 5",
    element: null,
    isVisible: false,
    hasCalledAPI: false,
  },
  {
    id: "box6",
    label: "Box 6",
    element: null,
    isVisible: false,
    hasCalledAPI: false,
  },
  {
    id: "box7",
    label: "Box 7",
    element: null,
    isVisible: false,
    hasCalledAPI: false,
  },
  {
    id: "box8",
    label: "Box 8",
    element: null,
    isVisible: false,
    hasCalledAPI: false,
  },
  {
    id: "box9",
    label: "Box 9",
    element: null,
    isVisible: false,
    hasCalledAPI: false,
  },
  {
    id: "box10",
    label: "Box 10",
    element: null,
    isVisible: false,
    hasCalledAPI: false,
  },
]);

// 控制是否使用 debounce
const useDebounce = ref(true);

// 触发次数统计
const triggerCount = ref(0);

// 建立一個 Map 來即時追蹤所有元素的最新可見狀態
const elementStateMap = new Map<HTMLElement, boolean>();

// Observer
let observer: IntersectionObserver | null = null;

// 這個函式會根據 Map 中的最新狀態來更新 UI
const applyStateChange = async () => {
  const mode = useDebounce.value ? "(Debounced)" : "(Normal)";
  console.log(`${mode} 根據最新狀態批次更新 UI...`);

  triggerCount.value++;

  // 遍歷 Map 中的所有元素
  for (const [element, isIntersecting] of elementStateMap.entries()) {
    // 找到對應的 box
    const box = boxes.value.find((b) => b.element === element);
    if (!box) continue;

    if (isIntersecting) {
      // 檢查元素是否已經變色，如果已經變色則不再重複處理
      if (box.hasCalledAPI) {
        console.log(`  -> ${box.id} 已變色，跳過。`);
        continue;
      }

      // 模擬處理
      console.log(`  -> 準備為 ${box.id} 執行處理...`);
      await new Promise((resolve) => setTimeout(resolve, 0));

      // 處理成功後，變色
      console.log(`  -> ${box.id} 處理完成，變色！`);
      box.isVisible = true;
      box.hasCalledAPI = true;
    } else {
      // 元素離開視窗，恢復原狀
      if (box.hasCalledAPI || box.isVisible) {
        console.log(`  -> ${box.id} 離開視窗，恢復原狀`);
        box.isVisible = false;
        box.hasCalledAPI = false;
      }
    }
  }
};

// 使用 debounce 來包裝更新函式
const debouncedUpdater = debounce(applyStateChange, 300);

// 重置計數器
const resetCounter = () => {
  triggerCount.value = 0;
  console.log("已重置觸發次數");
};

// 切換模式時重置所有狀態
const handleModeChange = () => {
  console.log(`切換為 ${useDebounce.value ? "Debounce" : "Normal"} 模式`);
  resetCounter();

  // 重置所有方塊狀態
  boxes.value.forEach((box) => {
    box.isVisible = false;
    box.hasCalledAPI = false;
  });
};

onMounted(() => {
  // 設置 IntersectionObserver
  const options = {
    root: null,
    rootMargin: "100px 0px 100px 0px",
    threshold: 0.5,
  };

  observer = new IntersectionObserver((entries) => {
    // 1. 即時更新 Map 中的狀態
    entries.forEach((entry) => {
      elementStateMap.set(entry.target as HTMLElement, entry.isIntersecting);
    });

    // 2. 根據模式選擇使用 debounced 或 normal 更新器
    if (useDebounce.value) {
      debouncedUpdater();
    } else {
      applyStateChange();
    }
  }, options);

  // 觀察所有方塊，並初始化它們在 Map 中的狀態
  boxes.value.forEach((box) => {
    const element = document.getElementById(box.id);
    if (element) {
      box.element = element;
      elementStateMap.set(element, false);
      observer?.observe(element);
    }
  });
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <div class="demo-container">
    <el-card class="header-card">
      <template #header>
        <div class="card-header">
          <h1>IntersectionObserver Demo</h1>
        </div>
      </template>
      <p class="description-text">
        Scroll down to observe the boxes entering the viewport
      </p>
      <p class="hint-text">Check the browser console for detailed logs</p>

      <div class="controls">
        <div class="mode-switch">
          <span class="switch-label">Normal</span>
          <el-switch
            v-model="useDebounce"
            size="large"
            @change="handleModeChange"
            active-color="#E6A23C"
            inactive-color="#409EFF"
          />
          <span class="switch-label">Debounce (300ms)</span>
        </div>

        <div class="stats">
          <div class="stat-item">
            <span class="stat-label">觸發次數:</span>
            <span class="stat-value">{{ triggerCount }}</span>
          </div>
          <el-button type="info" @click="resetCounter" size="small"
            >重置計數</el-button
          >
        </div>
      </div>

      <div class="mode-indicator">
        <span class="indicator-label">當前模式:</span>
        <el-button
          :type="useDebounce ? 'warning' : 'primary'"
          size="large"
          disabled
        >
          {{ useDebounce ? "Debounce Mode" : "Normal Mode" }}
        </el-button>
      </div>
    </el-card>

    <div class="spacer">Scroll down ↓</div>

    <div class="box-container">
      <el-card
        v-for="box in boxes.slice(0, 5)"
        :key="box.id"
        :id="box.id"
        :class="['box-card', box.isVisible ? 'visible' : '']"
        shadow="hover"
      >
        <div class="box-content">
          <h2>{{ box.label }}</h2>
          <div v-if="box.isVisible" class="status-badge">✓ Visible</div>
        </div>
      </el-card>
    </div>

    <div class="box-container">
      <el-card
        v-for="box in boxes.slice(5, 10)"
        :key="box.id"
        :id="box.id"
        :class="['box-card', box.isVisible ? 'visible' : '']"
        shadow="hover"
      >
        <div class="box-content">
          <h2>{{ box.label }}</h2>
          <div v-if="box.isVisible" class="status-badge">✓ Visible</div>
        </div>
      </el-card>
    </div>

    <div class="spacer">Scroll up ↑</div>
  </div>
</template>

<style scoped>
.demo-container {
  margin: 0 auto;
  padding: 20px;
  background: #f5f5f5;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.header-card {
  text-align: center;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.card-header h1 {
  margin: 0;
  color: white;
  font-size: 2em;
}

.description-text {
  margin: 10px 0 5px 0;
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.1em;
}

.hint-text {
  margin: 0 0 20px 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9em;
  font-style: italic;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.mode-switch {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.switch-label {
  font-size: 1.1em;
  font-weight: 500;
  color: white;
  min-width: 80px;
}

.stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.15);
  padding: 10px 20px;
  border-radius: 20px;
}

.stat-label {
  font-size: 1em;
  color: rgba(255, 255, 255, 0.9);
}

.stat-value {
  font-size: 1.5em;
  font-weight: 700;
  color: white;
  font-family: "Courier New", monospace;
  min-width: 40px;
  text-align: center;
}

.mode-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
}

.indicator-label {
  font-size: 1.1em;
  font-weight: 500;
  color: white;
}

.spacer {
  height: 400px;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8em;
  color: #555;
  font-weight: 500;
  border-radius: 12px;
  margin-bottom: 30px;
}

.box-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
}

.box-card {
  width: 80%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  border: none;
  opacity: 0.4;
  transform: scale(0.95);
}

.box-card:nth-child(even) {
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
}

.box-card.visible {
  background: linear-gradient(135deg, #ffc107 0%, #ffa000 100%);
  opacity: 1;
  transform: scale(1);
  box-shadow: 0 8px 24px rgba(255, 193, 7, 0.4);
}

.box-content {
  text-align: center;
  color: white;
  padding: 20px;
}

.box-content h2 {
  margin: 0 0 10px 0;
  font-size: 2.5em;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.status-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.3);
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 1.2em;
  font-weight: 500;
  margin-top: 10px;
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .card-header h1 {
    font-size: 1.5em;
  }

  .controls {
    padding: 15px;
  }

  .mode-switch {
    flex-direction: column;
    gap: 10px;
  }

  .stats {
    flex-direction: column;
    gap: 10px;
  }

  .spacer {
    height: 200px;
    font-size: 1.3em;
  }

  .box-card {
    width: 95%;
    min-height: 150px;
  }

  .box-content h2 {
    font-size: 1.8em;
  }
}
</style>
