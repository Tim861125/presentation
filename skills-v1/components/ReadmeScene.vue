<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// create-readme：左邊是快檢通現況 README（只有指令），右邊是照 skill 規則改寫後的結構。
const svg = ref<SVGSVGElement>()

const before: [string, string, string][] = [
  ['## 快速開始', 'bun install', 'bun run dev'],
  ['### 建置 / 預覽', 'bun run build', 'bun run preview'],
  ['### 測試', 'bun test', 'bun run smoke both'],
]
const after = ['## Features', '## Getting started', '## Scripts', '## Documentation']

useRoughScene(svg, (s) => {
  const g0 = s.layer(0)
  s.rect(g0, 20, 10, 300, 300, { fill: C.white, fillStyle: 'solid', stroke: C.ink, strokeWidth: 1.6 })
  s.text(g0, 40, 32, 'README.md · 28 行', { size: 13, color: C.grey, font: MONO })
  before.forEach(([h, a, b], i) => {
    const y = 66 + i * 80
    s.text(g0, 40, y, h, { size: 15, weight: 700, color: C.blue, font: MONO })
    ;[a, b].forEach((code, j) => {
      s.rect(g0, 40, y + 16 + j * 24, 250, 20, { fill: C.paper, fillStyle: 'solid', stroke: C.greyLight, strokeWidth: 1, roughness: 0.6 })
      s.text(g0, 50, y + 26 + j * 24, code, { size: 12, color: C.ink, font: MONO })
    })
  })

  const g1 = s.layer(1)
  ;['這是什麼專案？', '有哪些功能？', '規格文件在哪？'].forEach((q, i) =>
    s.text(g1, 430, 60 + i * 46, q, { anchor: 'middle', size: 17, weight: 700, color: C.red }),
  )

  const g2 = s.layer(2)
  s.pill(g2, 345, 196, 170, 32, 'create-readme', C.orange, C.navy, 15)
  s.arrow(g2, 335, 248, 525, 248, { stroke: C.orange, strokeWidth: 2.6 }, 12)
  s.rect(g2, 540, 10, 340, 300, { fill: C.white, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 })
  s.rect(g2, 560, 24, 34, 34, { fill: C.blue, fillStyle: 'solid', stroke: C.blue })
  s.text(g2, 606, 34, '快檢通', { size: 18, weight: 800, color: C.navy })
  s.text(g2, 606, 54, '台灣專利語意檢索', { size: 13, color: C.grey })
  after.forEach((h, i) => {
    const y = 92 + i * 38
    s.text(g2, 560, y, h, { size: 15, weight: 700, color: C.blue, font: MONO })
    s.line(g2, 560, y + 16, 820 - i * 30, y + 16, { stroke: C.greyLight, strokeWidth: 3, roughness: 0.6 })
  })

  const g3 = s.layer(3)
  s.rect(g3, 556, 252, 308, 42, { fill: '#fff8e6', fillStyle: 'solid', stroke: C.orange, strokeWidth: 2 })
  s.text(g3, 568, 273, '[!WARNING] 更新站台後必跑 smoke', { size: 13, weight: 700, color: C.orangeDark, font: MONO })
  s.text(g3, 430, 290, '不寫 License / Contributing', { anchor: 'middle', size: 13, color: C.grey, italic: true })
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 320" class="w-full" />
</template>
