<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

const patent = `【TWI-823456】
一種具溫度顯示之雙層
真空保溫容器

請求項 1（獨立項）
一種保溫容器,包含:
 (a) 雙層金屬杯體,層間
     為真空隔熱;
 (b) 設於杯體外壁之溫度
     感測器;
 (c) 顯示飲品溫度之顯示
     模組;
 (d) 供電予感測與顯示之
     電源模組。`

const product = `「智慧溫感保溫杯 X1」
・316 不鏽鋼雙層真空杯身
・杯底貼附式溫度感測晶片
・杯身環狀 LED 顯示溫度
・內建可充電鋰電池
・藍牙連手機 App 記錄`

// 逐字串流的示範報告(POC:內建範例,正式版改接 PatentPilot)
const report = `🚦 整體風險等級:中風險

產品與本專利請求項 1 有多數技術特徵重疊,
落入字面範圍的可能性偏高,建議調整顯示模組設計。

📋 逐項比對表
 (a) 雙層真空杯體 ……… ⚠ 對應(316 雙層真空)
 (b) 外壁溫度感測器 …… ⚠ 對應(杯底感測晶片)
 (c) 溫度顯示模組 ……… ⚠ 對應(環狀 LED)
 (d) 電源模組 …………… ⚠ 對應(內建鋰電池)

🔍 關鍵差異點
・感測器位置:專利為「外壁」,產品為
  「杯底」—— 位置不同,但功能/手段/結果
  實質相同,仍可能落入均等論。
・產品多了藍牙 App 功能,屬額外特徵,
  不影響侵權判斷(全要件原則)。

💡 建議
・顯示方式可改為非「飲品溫度即時顯示」,
  例如僅顯示冷/熱狀態燈號,以脫離 (c)。
・若維持現設計,建議於量產前委請專利師
  做正式侵權鑑定。`

const displayed = ref('')
const streaming = ref(false)
const done = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const showRisk = computed(() => displayed.value.includes('中風險'))

function start() {
  if (streaming.value) return
  displayed.value = ''
  done.value = false
  streaming.value = true
  let i = 0
  const step = () => {
    if (i >= report.length) {
      streaming.value = false
      done.value = true
      return
    }
    // 每 tick 吐 2~3 個字,模擬 token 串流
    const chunk = report[i] === '\n' ? 1 : 3
    displayed.value += report.slice(i, i + chunk)
    i += chunk
    timer = setTimeout(step, 22)
  }
  step()
}

function reset() {
  if (timer) clearTimeout(timer)
  displayed.value = ''
  streaming.value = false
  done.value = false
}

onUnmounted(() => timer && clearTimeout(timer))
</script>

<template>
  <div class="demo">
    <!-- 左:專利 / 中:產品輸入 -->
    <div class="col col-patent">
      <div class="col-head">📄 這篇專利</div>
      <pre class="box">{{ patent }}</pre>
    </div>

    <div class="col col-product">
      <div class="col-head">🧩 我的產品資訊</div>
      <pre class="box box-input">{{ product }}</pre>
      <div class="btns">
        <button class="btn-go" :disabled="streaming" @click="start">
          {{ streaming ? '比對中…' : '🚀 開始比對' }}
        </button>
        <button v-if="done || streaming" class="btn-reset" @click="reset">重置</button>
      </div>
    </div>

    <!-- 右:AI 串流報告 -->
    <div class="col col-report">
      <div class="col-head">
        🤖 FTO 分析報告
        <span v-if="streaming" class="live">● 串流中</span>
        <RiskLight v-if="showRisk" level="mid" class="risk-inline" />
      </div>
      <div class="box box-report">
        <span v-if="!displayed" class="placeholder">按下「開始比對」,AI 將逐字產出報告…</span>
        <span class="stream">{{ displayed }}<span v-if="streaming" class="cursor">▋</span></span>
      </div>
      <div class="disclaimer">⚠️ 僅供初步參考,不構成正式法律意見。</div>
    </div>
  </div>
</template>

<style scoped>
.demo {
  display: grid;
  grid-template-columns: 0.85fr 0.95fr 1.25fr;
  gap: 0.7rem;
  margin-top: 0.4rem;
}
.col {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.col-head {
  font-size: 0.8rem;
  font-weight: 700;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.box {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 10px;
  padding: 0.6rem 0.7rem;
  font-size: 0.66rem;
  line-height: 1.45;
  color: #cbd5e1;
  white-space: pre-wrap;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  margin: 0;
  overflow: auto;
}
.box-input {
  border-color: rgba(56, 189, 248, 0.3);
}
.box-report {
  flex: 1;
  min-height: 248px;
  max-height: 248px;
  border-color: rgba(45, 212, 191, 0.35);
  background: rgba(8, 47, 47, 0.35);
  color: #d1fae5;
}
.placeholder {
  color: #64748b;
}
.stream {
  white-space: pre-wrap;
}
.cursor {
  color: #2dd4bf;
  animation: blink 0.9s steps(1) infinite;
}
@keyframes blink { 50% { opacity: 0; } }
.btns {
  display: flex;
  gap: 0.5rem;
}
.btn-go {
  flex: 1;
  background: linear-gradient(90deg, #0ea5e9, #2dd4bf);
  color: #042f2e;
  font-weight: 800;
  border: none;
  border-radius: 9px;
  padding: 0.5rem;
  font-size: 0.85rem;
  cursor: pointer;
  transition: transform 0.15s, opacity 0.2s;
}
.btn-go:hover:not(:disabled) { transform: translateY(-1px); }
.btn-go:disabled { opacity: 0.55; cursor: default; }
.btn-reset {
  background: rgba(148, 163, 184, 0.12);
  color: #cbd5e1;
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 9px;
  padding: 0.5rem 0.8rem;
  font-size: 0.8rem;
  cursor: pointer;
}
.live {
  font-size: 0.66rem;
  color: #2dd4bf;
  animation: blink 1s steps(1) infinite;
}
.risk-inline {
  margin-left: auto;
  transform: scale(0.82);
  transform-origin: right center;
}
.disclaimer {
  font-size: 0.68rem;
  color: #fbbf24;
  opacity: 0.85;
}
</style>
