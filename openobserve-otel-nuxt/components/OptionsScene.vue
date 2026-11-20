<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// 選型：四個候選逐一被打叉（每 click 一個），最後圈出官方 OTel Logs SDK。
// layer 0 = 需求 + 四個候選；1–4 = 各候選卡關點；5 = 選定方案 → clicks: 5
const svg = ref<SVGSVGElement>()

const candidates: [string, string, string][] = [
  ['pino +\npino-openobserve', '停在 1.0.0、預設 5 分鐘一批', 'worker thread 在 Bun 打包下出包'],
  ['evlog', 'Nuxt 原生 wide-event', '但要改寫整個 log 架構'],
  ['consola\n自寫 reporter', '批次、重試、背壓', '全部要自己寫'],
  ['主機端 collector\nVector / Fluent Bit', '應用零改動', '但要能動 Rancher 主機'],
]

useRoughScene(svg, (s) => {
  const W = 200
  const GAP = 26
  const grey = { fill: C.paper, fillStyle: 'solid', stroke: C.blueLight, strokeWidth: 2 }

  const g0 = s.layer(0)
  s.text(g0, 450, 18, '需求：Bun 打包可用 · 不改 log 架構 · 不用動主機 · 有人維護', { anchor: 'middle', size: 15, color: C.grey, italic: true })
  candidates.forEach(([label], i) => {
    const x = 11 + i * (W + GAP)
    s.box(g0, x, 45, W, 80, label, grey, { color: C.navy, size: 16, font: label.startsWith('pino') ? MONO : undefined })
  })

  candidates.forEach(([, a, b], i) => {
    const x = 11 + i * (W + GAP)
    const g = s.layer(i + 1)
    // 右上角紅叉
    s.line(g, x + W - 30, 34, x + W - 6, 58, { stroke: C.red, strokeWidth: 3.2 })
    s.line(g, x + W - 6, 34, x + W - 30, 58, { stroke: C.red, strokeWidth: 3.2 })
    s.text(g, x + W / 2, 148, a, { anchor: 'middle', size: 13, color: C.grey, italic: true })
    s.text(g, x + W / 2, 170, b, { anchor: 'middle', size: 13, color: C.red, weight: 600 })
  })

  const g5 = s.layer(5)
  s.box(g5, 215, 210, 470, 76, 'OpenTelemetry Logs SDK', { fill: '#fff8e6', fillStyle: 'solid', stroke: C.orange, strokeWidth: 3 }, { color: C.navy, size: 20 })
  // 綠勾
  s.path(g5, 'M228 222 L240 236 L262 206', { stroke: C.green, strokeWidth: 3.4 })
  s.text(g5, 450, 312, '官方維護 · 內建批次 / 重試 · 純 JS 無 worker · OpenObserve 原生收 OTLP', { anchor: 'middle', size: 14, color: C.orangeDark, weight: 700 })
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 330" class="w-full" />
</template>
