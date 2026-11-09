<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// 全貌：前端 RUM 與後端 OTLP 兩條路進同一個 org；中間靠 traceparent / baggage 串成同一條 trace。
const svg = ref<SVGSVGElement>()

useRoughScene(svg, (s) => {
  const blue = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }

  // 0 · 兩端
  const g0 = s.layer(0)
  s.box(g0, 20, 125, 170, 80, '瀏覽器\n快檢通 SPA', blue, { color: C.navy, size: 17 })
  s.rect(g0, 650, 20, 240, 290, { stroke: C.blue, strokeWidth: 2.5 })
  s.text(g0, 770, 46, 'OpenObserve · pi_dev', { anchor: 'middle', size: 16, weight: 700, color: C.blue })

  // 1 · 前端：browser-rum → Traefik → RUM streams
  const g1 = s.layer(1)
  s.box(g1, 320, 35, 210, 60, 'Traefik\n/rum/v1/pi_dev/', blue, { color: C.navy, size: 15 })
  s.arrow(g1, 192, 145, 316, 72, { stroke: C.ink, strokeWidth: 2 })
  s.arrow(g1, 534, 70, 666, 96, { stroke: C.ink, strokeWidth: 2 })
  s.text(g1, 30, 82, 'browser-rum', { size: 14, color: C.blue, weight: 700, font: MONO })
  s.text(g1, 30, 104, 'client token', { size: 12, color: C.grey, italic: true })
  s.pill(g1, 670, 70, 200, 30, '_rumdata', C.blueLight, C.navy, 14)
  s.pill(g1, 670, 108, 200, 30, '_rumlog', C.blueLight, C.navy, 14)
  s.pill(g1, 670, 146, 200, 30, '_sessionreplay', C.blueLight, C.navy, 14)

  // 2 · 後端：fetch /api → Nitro logEvent → OTLP → default
  const g2 = s.layer(2)
  s.box(g2, 320, 225, 210, 70, 'Nitro /api\nlogEvent() → OTel SDK', blue, { color: C.navy, size: 15 })
  s.arrow(g2, 192, 185, 316, 255, { stroke: C.ink, strokeWidth: 2 })
  s.text(g2, 200, 250, 'fetch /api', { size: 13, color: C.grey, italic: true })
  s.arrow(g2, 534, 262, 666, 267, { stroke: C.ink, strokeWidth: 2 })
  s.text(g2, 595, 250, 'OTLP', { anchor: 'middle', size: 14, color: C.blue, weight: 700, font: MONO })
  s.text(g2, 595, 290, 'Basic auth', { anchor: 'middle', size: 12, color: C.grey, italic: true })
  s.pill(g2, 670, 250, 200, 34, 'default', C.blueLight, C.navy, 15)

  // 3 · 串接：traceparent / baggage
  const g3 = s.layer(3)
  s.arrow(g3, 192, 185, 316, 255, { stroke: C.orange, strokeWidth: 4 })
  s.pill(g3, 20, 288, 270, 32, 'traceparent + baggage', C.orange, C.navy, 14)
  s.curve(g3, 770, 182, 770, 246, 40, { stroke: C.orange, strokeWidth: 3, strokeLineDash: [8, 6] }, 10)
  s.text(g3, 636, 200, '同一個 trace_id', { anchor: 'end', size: 15, weight: 700, color: C.orangeDark })
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 330" class="w-full" />
</template>
