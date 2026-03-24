<script setup lang="ts">
const traditional = [
  { step: 1, icon: '🖱️', title: '手動打開 Chrome DevTools', time: '1 min' },
  { step: 2, icon: '⏺️', title: '手動錄製 Performance trace', time: '2 min' },
  { step: 3, icon: '🔍', title: '逐一分析 Flame Chart', time: '30 min' },
  { step: 4, icon: '📝', title: '手動記錄問題點與數據', time: '15 min' },
  { step: 5, icon: '📄', title: '撰寫優化分析報告', time: '30 min' },
]

const aiAssisted = [
  { step: 1, icon: '💬', title: '輸入自然語言指令給 Claude', time: '30 sec' },
  { step: 2, icon: '🤖', title: 'Claude 全自動分析並輸出完整報告', time: '2 min' },
]

const totalTraditional = '≈ 78 分鐘'
const totalAI = '≈ 2.5 分鐘'
const speedup = '31x'
</script>

<template>
  <div class="comparison-view">

    <!-- Traditional -->
    <div class="flow-col">
      <div class="col-header traditional-header">
        <span class="col-title">😓 傳統方式</span>
        <span class="col-total trad-total">{{ totalTraditional }}</span>
      </div>
      <div class="steps-list">
        <div v-for="item in traditional" :key="item.step" class="step-item trad-step">
          <div class="step-num trad-num">{{ item.step }}</div>
          <div class="step-icon">{{ item.icon }}</div>
          <div class="step-text">
            <div class="step-title">{{ item.title }}</div>
            <div class="step-time trad-time">⏱ {{ item.time }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- VS divider -->
    <div class="vs-divider">
      <div class="vs-line"></div>
      <div class="vs-badge">VS</div>
      <div class="vs-line"></div>
    </div>

    <!-- AI Assisted -->
    <div class="flow-col">
      <div class="col-header ai-header">
        <span class="col-title">🤖 AI 輔助方式</span>
        <span class="col-total ai-total">{{ totalAI }}</span>
      </div>
      <div class="steps-list">
        <div v-for="item in aiAssisted" :key="item.step" class="step-item ai-step">
          <div class="step-num ai-num">{{ item.step }}</div>
          <div class="step-icon">{{ item.icon }}</div>
          <div class="step-text">
            <div class="step-title">{{ item.title }}</div>
            <div class="step-time ai-time">⚡ {{ item.time }}</div>
          </div>
        </div>

        <!-- Speedup badge -->
        <div class="speedup-card">
          <div class="speedup-number">{{ speedup }}</div>
          <div class="speedup-label">效率提升</div>
          <div class="speedup-desc">從 78 分鐘 → 2.5 分鐘</div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.comparison-view {
  display: grid;
  grid-template-columns: 1fr 48px 1fr;
  gap: 12px;
  height: 360px;
  font-size: 12px;
}
.flow-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.col-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  flex-shrink: 0;
}
.traditional-header {
  background: rgba(127, 29, 29, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.25);
}
.ai-header {
  background: rgba(6, 78, 59, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.25);
}
.col-title {
  font-weight: bold;
  font-size: 13px;
  color: #e2e8f0;
}
.col-total { font-size: 11px; font-weight: bold; }
.trad-total { color: #f87171; }
.ai-total { color: #34d399; }

.steps-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.step-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 8px;
}
.trad-step {
  background: rgba(127, 29, 29, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.2);
}
.ai-step {
  background: rgba(6, 78, 59, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.2);
}
.step-num {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  flex-shrink: 0;
}
.trad-num { background: rgba(239, 68, 68, 0.25); color: #fca5a5; }
.ai-num { background: rgba(16, 185, 129, 0.25); color: #6ee7b7; }
.step-icon { font-size: 18px; flex-shrink: 0; }
.step-text { flex: 1; }
.step-title { color: #e2e8f0; font-size: 12px; line-height: 1.3; }
.step-time { font-size: 10px; margin-top: 2px; }
.trad-time { color: #f87171; }
.ai-time { color: #34d399; }

.vs-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.vs-line {
  flex: 1;
  width: 1px;
  background: rgba(100, 116, 139, 0.4);
}
.vs-badge {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.2);
  border: 2px solid rgba(99, 102, 241, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
  color: #a5b4fc;
  flex-shrink: 0;
}

.speedup-card {
  margin-top: 8px;
  text-align: center;
  padding: 14px 12px;
  background: linear-gradient(135deg, rgba(6, 78, 59, 0.35), rgba(5, 150, 105, 0.2));
  border: 2px solid rgba(16, 185, 129, 0.4);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}
.speedup-number {
  font-size: 42px;
  font-weight: 900;
  color: #34d399;
  line-height: 1;
}
.speedup-label {
  font-size: 13px;
  font-weight: bold;
  color: #6ee7b7;
}
.speedup-desc {
  font-size: 10px;
  color: #94a3b8;
  margin-top: 2px;
}
</style>
