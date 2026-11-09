<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// traceFlow 時間軸：一次文字檢索 = 一個 span + 兩個子 span + 開始／完成兩筆 log。
// 數字取自測試站 search.completed 平均值（embed ≈ 1099 ms、kNN ≈ 168 ms、total ≈ 1267 ms）。
const svg = ref<SVGSVGElement>()

const X0 = 150
const X1 = 860
const ms = (v: number) => X0 + (v / 1267) * (X1 - X0)

useRoughScene(svg, (s) => {
  const label = (g: SVGGElement, y: number, t: string) =>
    s.text(g, 138, y, t, { anchor: 'end', size: 14, font: MONO, color: C.navy, weight: 700 })

  // 0 · 父 span
  const g0 = s.layer(0)
  label(g0, 45, 'search.by_text')
  s.rect(g0, X0, 26, X1 - X0, 30, { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 })
  s.text(g0, (X0 + X1) / 2, 46, 'traceFlow("search", …)  ≈ 1267 ms', { anchor: 'middle', size: 13, color: C.navy })
  s.line(g0, X0, 190, X1, 190, { stroke: C.grey, strokeWidth: 1.2 })
  label(g0, 196, 'logs')

  // 1 · search.started
  const g1 = s.layer(1)
  s.circle(g1, X0, 190, 14, { fill: C.orange, fillStyle: 'solid', stroke: C.orangeDark })
  s.text(g1, X0 + 12, 216, 'search.started', { size: 13, font: MONO, color: C.orangeDark, weight: 700 })

  // 2 · timed("search.embed")
  const g2 = s.layer(2)
  label(g2, 95, 'search.embed')
  s.rect(g2, X0 + 4, 76, ms(1099) - X0 - 8, 30, { fill: C.white, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 })
  s.text(g2, (X0 + ms(1099)) / 2, 96, 'timed(…)  ≈ 1099 ms', { anchor: 'middle', size: 13, color: C.navy })

  // 3 · timed("search.knn")
  const g3 = s.layer(3)
  label(g3, 145, 'search.knn')
  s.rect(g3, ms(1099), 126, ms(1267) - ms(1099) - 4, 30, { fill: C.white, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 })
  s.text(g3, ms(1099) - 8, 146, '≈ 168 ms', { anchor: 'end', size: 13, color: C.navy })

  // 4 · search.completed 帶上所有計時
  const g4 = s.layer(4)
  s.circle(g4, X1, 190, 14, { fill: C.orange, fillStyle: 'solid', stroke: C.orangeDark })
  s.text(g4, X1 - 10, 216, 'search.completed', { anchor: 'end', size: 13, font: MONO, color: C.orangeDark, weight: 700 })
  s.rect(g4, 150, 240, 710, 54, { fill: '#fff4d6', fillStyle: 'solid', stroke: C.orangeDark, strokeWidth: 1.6 })
  s.text(g4, 166, 262, 'search_embed_ms=1099  search_knn_ms=168  search_took_ms=1267', { size: 13, font: MONO, color: C.navy, weight: 700 })
  s.text(g4, 166, 284, 'search_mode=by-text  search_hits=…  trace_id=4bf92f…', { size: 13, font: MONO, color: C.navy })}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 305" class="w-full" />
</template>
