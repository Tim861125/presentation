<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// 前端 fetch /api 帶 traceparent / baggage → 後端 extract → 後端 log 帶同一個 trace_id 與 session_id。
const svg = ref<SVGSVGElement>()

useRoughScene(svg, (s) => {
  // 0 · 兩個行程
  const g0 = s.layer(0)
  s.rect(g0, 20, 30, 240, 260, { stroke: C.blue, strokeWidth: 2.5 })
  s.rect(g0, 640, 30, 240, 260, { stroke: C.blue, strokeWidth: 2.5 })
  s.text(g0, 140, 278, '瀏覽器（browser-rum）', { anchor: 'middle', size: 15, weight: 700, color: C.blue })
  s.text(g0, 760, 278, 'Nitro /api（OTel）', { anchor: 'middle', size: 15, weight: 700, color: C.blue })
  s.pill(g0, 40, 55, 200, 32, 'POST GetPatentByText', C.blueLight, C.navy, 13)

  // 1 · RUM 開 trace，fetch 時注入 header
  const g1 = s.layer(1)
  s.pill(g1, 40, 105, 200, 30, 'trace_id 4bf92f…', C.orange, C.navy, 13)
  s.pill(g1, 40, 145, 200, 30, 'session.id 7f3a…', C.blueLight, C.navy, 13)
  s.line(g1, 262, 200, 636, 200, { stroke: C.grey, strokeWidth: 1.5, strokeLineDash: [8, 8] })
  s.arrow(g1, 600, 200, 636, 200, { stroke: C.grey, strokeWidth: 1.5 }, 10)
  s.envelope(g1, 405, 165, 90, 60, { stroke: C.ink, strokeWidth: 2 })
  s.text(g1, 450, 250, 'traceparent: 00-4bf92f…-a1b2…-01', { anchor: 'middle', size: 13, font: MONO, weight: 700, color: C.navy })
  s.text(g1, 450, 272, 'baggage: session.id=7f3a…,user.id=…', { anchor: 'middle', size: 13, font: MONO, color: C.navy })
  s.text(g1, 450, 300, 'allowedTracingUrls 只匹配本站 /api', { anchor: 'middle', size: 12, color: C.grey, italic: true })

  // 2 · 後端 extract，span 接續
  const g2 = s.layer(2)
  s.box(g2, 660, 55, 200, 40, 'propagation.extract()', { stroke: C.orangeDark, strokeWidth: 2, fill: '#fff4d6', fillStyle: 'solid' }, { font: MONO, size: 13, color: C.orangeDark })
  s.pill(g2, 660, 108, 200, 30, 'span ← 4bf92f…', C.blueLight, C.navy, 13)

  // 3 · logEvent 寫出的那筆 log
  const g3 = s.layer(3)
  s.rect(g3, 660, 152, 200, 96, { fill: C.white, fillStyle: 'solid', stroke: C.ink, strokeWidth: 1.6 })
  s.text(g3, 672, 176, 'search.completed', { size: 13, font: MONO, weight: 700, color: C.navy })
  s.text(g3, 672, 202, 'trace_id   4bf92f…', { size: 12, font: MONO, color: C.orangeDark, weight: 700 })
  s.text(g3, 672, 226, 'session_id 7f3a…', { size: 12, font: MONO, color: C.navy })
  s.curve(g3, 240, 120, 656, 200, -90, { stroke: C.orange, strokeWidth: 3, strokeLineDash: [10, 6] }, 12)
  s.text(g3, 450, 22, '前端 session → 後端 log，同一條 trace', { anchor: 'middle', size: 15, weight: 700, color: C.orangeDark })
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 310" class="w-full" />
</template>
