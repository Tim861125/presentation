<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// Logs 頁的線框圖：先畫出整個畫面，再每 click 標出一個區塊的用途。
const svg = ref<SVGSVGElement>()

const frame = { stroke: C.grey, strokeWidth: 1.4, roughness: 0.9 }
const hi = { stroke: C.orange, strokeWidth: 3 }
const mono = (size = 13) => ({ font: MONO, size, color: C.grey })

const bars = [6, 8, 5, 7, 9, 6, 8, 7, 10, 12, 30, 52, 44, 26, 14, 9, 8, 7, 6, 9, 8, 7, 6, 5]
const fields = ['_timestamp', 'event', 'severity', 'http_route', 'error_code', 'search_took_ms', 'trace_id']
const rows = [
  '11-03 14:02  WARN  search.failed  UPSTREAM_TIMEOUT',
  '11-03 14:01  INFO  search.completed  took=1234',
  '11-03 14:01  INFO  api.request  200',
  '11-03 14:00  WARN  search.failed  UPSTREAM_TIMEOUT',
]

useRoughScene(svg, (s) => {
  const g0 = s.layer(0)
  s.rect(g0, 10, 10, 880, 300, frame)
  // 1 toolbar
  s.rect(g0, 20, 20, 860, 36, frame)
  s.text(g0, 34, 38, '串流：default', mono(14))
  s.text(g0, 230, 38, 'Past 7 days', mono(14))
  s.text(g0, 400, 38, '[ Run query ]', mono(14))
  // 2 query
  s.rect(g0, 20, 64, 860, 34, frame)
  s.text(g0, 34, 81, "event = 'search.failed'", mono(14))
  // 3 histogram
  s.rect(g0, 220, 106, 660, 70, frame)
  bars.forEach((h, i) => s.rect(g0, 232 + i * 16, 168 - h, 10, h, { stroke: C.blue, strokeWidth: 1, fill: C.blueLight, fillStyle: 'solid', roughness: 0.6 }))
  // 4 field list
  s.rect(g0, 20, 106, 190, 194, frame)
  fields.forEach((f, i) => s.text(g0, 34, 124 + i * 21, f, mono(13)))
  // 5 results
  s.rect(g0, 220, 184, 660, 116, frame)
  rows.forEach((r, i) => s.text(g0, 232, 202 + i * 26, `▸ ${r}`, mono(12)))

  const g1 = s.layer(1)
  s.rect(g1, 16, 16, 868, 44, hi)
  s.pill(g1, 640, 24, 230, 28, '1 選串流、時間範圍', C.orange, C.navy, 13)

  const g2 = s.layer(2)
  s.rect(g2, 16, 60, 868, 42, hi)
  s.pill(g2, 640, 67, 230, 28, '2 下條件 Ctrl+Enter', C.orange, C.navy, 13)

  const g3 = s.layer(3)
  s.rect(g3, 216, 102, 668, 78, hi)
  s.pill(g3, 660, 112, 210, 28, '3 拖曳框選時間', C.orange, C.navy, 13)

  const g4 = s.layer(4)
  s.rect(g4, 16, 102, 198, 202, hi)
  s.pill(g4, 26, 268, 178, 28, '4 點欄位看分布', C.orange, C.navy, 13)

  const g5 = s.layer(5)
  s.rect(g5, 216, 180, 668, 124, hi)
  s.pill(g5, 620, 268, 250, 28, '5 展開 JSON、+ / − 篩選', C.orange, C.navy, 13)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 315" class="w-full" />
</template>
