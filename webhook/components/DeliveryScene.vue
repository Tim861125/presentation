<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// 一次 delivery 的生命週期：註冊 → 事件 POST → 驗簽回 2xx → 丟 queue 慢慢做。
const svg = ref<SVGSVGElement>()

useRoughScene(svg, (s) => {
  const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2.2 }

  const g0 = s.layer(0)
  s.box(g0, 20, 120, 170, 90, 'GitHub', box, { color: C.navy })
  s.box(g0, 380, 120, 200, 90, 'POST /webhook', box, { color: C.navy, font: MONO, size: 16 })
  s.text(g0, 480, 228, '你的 endpoint（公開 HTTPS）', { anchor: 'middle', size: 13, color: C.grey })
  s.box(g0, 720, 120, 160, 90, 'worker', box, { color: C.navy, font: MONO })

  // 1 · 註冊
  const g1 = s.layer(1)
  s.curve(g1, 470, 112, 110, 112, 70, { stroke: C.blue, strokeWidth: 2, strokeLineDash: [8, 6] })
  s.text(g1, 290, 48, '① 註冊：URL + secret + 要訂閱的事件', { anchor: 'middle', size: 15, weight: 700, color: C.blue })

  // 2 · 事件發生 → POST
  const g2 = s.layer(2)
  s.pill(g2, 20, 250, 170, 30, 'issue opened', C.orange, C.navy, 13)
  s.arrow(g2, 105, 248, 105, 216, { stroke: C.orangeDark, strokeWidth: 2 }, 8)
  s.arrow(g2, 195, 150, 374, 150, { stroke: C.orange, strokeWidth: 3 }, 12)
  s.text(g2, 285, 136, '② POST', { anchor: 'middle', size: 14, weight: 700, color: C.orangeDark, font: MONO })
  s.text(g2, 285, 165, 'headers + JSON', { anchor: 'middle', size: 12, color: C.navy, font: MONO })

  // 3 · 驗簽、快速回 2xx
  const g3 = s.layer(3)
  s.arrow(g3, 374, 192, 195, 192, { stroke: C.green, strokeWidth: 2, strokeLineDash: [7, 5] }, 10)
  s.text(g3, 285, 206, '③ 202（10 秒內）', { anchor: 'middle', size: 13, weight: 700, color: C.green })
  s.text(g3, 480, 256, '✓ 驗簽  ✓ 去重', { anchor: 'middle', size: 15, weight: 700, color: C.green })

  // 4 · 丟 queue，worker 慢慢做
  const g4 = s.layer(4)
  s.arrow(g4, 586, 165, 714, 165, { stroke: C.orange, strokeWidth: 3 }, 12)
  s.text(g4, 650, 150, '④ 丟 queue', { anchor: 'middle', size: 13, weight: 700, color: C.orangeDark })
  s.text(g4, 800, 228, '通知、寫 DB…', { anchor: 'middle', size: 13, color: C.grey })
  s.pill(g4, 640, 262, 240, 34, '回應要快，事情慢慢做', C.orange, C.navy, 15)
})
</script>

<template>
  <svg ref="svg" viewBox="0 25 900 285" class="w-full" />
</template>
