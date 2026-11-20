<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// 架構：所有 server log 匯進 writeLog，一份 stdout、一份 OTel record。
// layer 0 呼叫端→writeLog；1 stdout；2 emit；3 有設 URL → Batch → OpenObserve；4 沒設 → no-op → clicks: 4
const svg = ref<SVGSVGElement>()

useRoughScene(svg, (s) => {
  const blue = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }
  const ink = { stroke: C.ink, strokeWidth: 2 }

  // 0 · 呼叫端 → writeLog
  const g0 = s.layer(0)
  s.rect(g0, 10, 90, 200, 150, { stroke: C.blueLight, strokeWidth: 2 })
  s.text(g0, 110, 110, '呼叫端', { anchor: 'middle', size: 15, weight: 700, color: C.blue })
  ;['api-log.ts', 'startUpstreamLog', 'handleApi', 'ensure-pipeline'].forEach((t, i) =>
    s.text(g0, 110, 140 + i * 25, t, { anchor: 'middle', size: 13, font: MONO, color: C.navy }))
  s.arrow(g0, 214, 165, 266, 165, ink, 10)
  s.box(g0, 270, 125, 180, 80, 'writeLog()', { ...blue, stroke: C.navy, strokeWidth: 2.6 }, { color: C.navy, size: 19, font: MONO })
  s.text(g0, 360, 224, 'level · line · attrs · err', { anchor: 'middle', size: 13, color: C.grey, italic: true, font: MONO })

  // 1 · stdout
  const g1 = s.layer(1)
  s.arrow(g1, 452, 145, 516, 72, ink, 10)
  s.box(g1, 520, 25, 200, 64, 'stdout 單行字串', blue, { color: C.navy, size: 16 })
  s.text(g1, 735, 45, 'console.log', { size: 13, font: MONO, color: C.grey })
  s.text(g1, 735, 67, 'console.warn / error', { size: 13, font: MONO, color: C.grey })
  s.text(g1, 620, 110, 'docker logs | grep 照舊', { anchor: 'middle', size: 13, color: C.grey, italic: true })

  // 2 · OTel emit
  const g2 = s.layer(2)
  s.arrow(g2, 452, 185, 516, 228, ink, 10)
  s.box(g2, 520, 200, 200, 70, 'logger.emit()\nbody + attributes', blue, { color: C.navy, size: 16 })

  // 3 · 有設 URL → 00.otel-logs 註冊的 provider → OpenObserve
  const g3 = s.layer(3)
  s.pill(g3, 735, 140, 155, 30, 'URL 有設', C.orange, C.navy, 13)
  s.arrow(g3, 722, 235, 761, 235, { stroke: C.orange, strokeWidth: 3 }, 10)
  s.box(g3, 765, 200, 125, 70, 'Open\nObserve', { fill: '#fff8e6', fillStyle: 'solid', stroke: C.orange, strokeWidth: 2.6 }, { color: C.navy, size: 16 })
  s.text(g3, 827, 292, 'Batch · OTLP/HTTP', { anchor: 'middle', size: 12, font: MONO, color: C.blue, weight: 700 })

  // 4 · 沒設 → no-op
  const g4 = s.layer(4)
  s.arrow(g4, 560, 274, 480, 300, { stroke: C.grey, strokeWidth: 2, strokeLineDash: [6, 5] }, 9)
  s.text(g4, 470, 306, 'URL 沒設 → no-op（dev / 測試不送）', { anchor: 'end', size: 14, color: C.red, weight: 600 })
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 330" class="w-full" />
</template>
