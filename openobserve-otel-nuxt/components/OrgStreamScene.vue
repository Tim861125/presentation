<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// 組織規劃：一個 org quick_pat，stream 區分環境；設定漏了會落到 dev。
// layer 0 org + 兩個 stream；1 prod；2 dev；3 漏設 → 預設 dev；4 共用 dashboard → clicks: 4
const svg = ref<SVGSVGElement>()

useRoughScene(svg, (s) => {
  const blue = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }
  const ink = { stroke: C.ink, strokeWidth: 2 }

  // 0 · org + streams
  const g0 = s.layer(0)
  s.rect(g0, 500, 15, 390, 300, { stroke: C.blue, strokeWidth: 2.5 })
  s.text(g0, 695, 42, 'org: quick_pat', { anchor: 'middle', size: 17, weight: 700, color: C.blue, font: MONO })
  s.pill(g0, 560, 80, 270, 40, 'backend_prod', C.blueLight, C.navy, 16)
  s.pill(g0, 560, 190, 270, 40, 'backend_dev', C.blueLight, C.navy, 16)

  // 1 · 正式
  const g1 = s.layer(1)
  s.box(g1, 20, 20, 250, 70, '正式容器\nSTREAM=backend_prod', blue, { color: C.navy, size: 14, font: MONO })
  s.arrow(g1, 274, 55, 554, 98, ink, 10)
  s.text(g1, 415, 62, 'env=prod', { anchor: 'middle', size: 13, color: C.grey, italic: true, font: MONO })

  // 2 · 測試
  const g2 = s.layer(2)
  s.box(g2, 20, 125, 250, 70, '測試容器\nSTREAM=backend_dev', blue, { color: C.navy, size: 14, font: MONO })
  s.arrow(g2, 274, 160, 554, 206, ink, 10)
  s.text(g2, 415, 168, 'env=dev', { anchor: 'middle', size: 13, color: C.grey, italic: true, font: MONO })

  // 3 · 漏設 → 預設 dev
  const g3 = s.layer(3)
  s.box(g3, 20, 235, 250, 70, '新環境\nSTREAM 忘了設', { fill: C.white, fillStyle: 'solid', stroke: C.red, strokeWidth: 2, strokeLineDash: [7, 5] }, { color: C.red, size: 14 })
  s.arrow(g3, 274, 268, 554, 218, { stroke: C.orange, strokeWidth: 3 }, 10)
  s.text(g3, 400, 290, '預設值就是 dev', { anchor: 'middle', size: 14, color: C.orangeDark, weight: 700 })

  // 4 · 同 org 共用 dashboard / 告警
  const g4 = s.layer(4)
  s.rect(g4, 540, 66, 310, 180, { stroke: C.orange, strokeWidth: 2.4, strokeLineDash: [8, 6] })
  s.text(g4, 695, 278, '共用 dashboard / 告警', { anchor: 'middle', size: 15, color: C.orangeDark, weight: 700 })
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 330" class="w-full" />
</template>
