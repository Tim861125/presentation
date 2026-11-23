<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// 網路會出錯：逾時重送 → 重複送達；事件可能亂序到達 → 以 ID 去重、不靠順序。
const svg = ref<SVGSVGElement>()

useRoughScene(svg, (s) => {
  const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2.2 }

  const g0 = s.layer(0)
  s.rect(g0, 20, 30, 170, 260, box)
  s.text(g0, 105, 160, 'Stripe', { anchor: 'middle', size: 18, weight: 700, color: C.navy })
  s.rect(g0, 690, 30, 190, 260, box)
  s.text(g0, 785, 55, '你的 server', { anchor: 'middle', size: 18, weight: 700, color: C.navy })

  // 1 · 逾時 → 重送 → 收到兩次
  const g1 = s.layer(1)
  s.arrow(g1, 196, 80, 684, 80, { stroke: C.grey, strokeWidth: 1.8 }, 10)
  s.pill(g1, 230, 64, 110, 28, 'evt_1', C.blueLight, C.navy, 13)
  s.text(g1, 520, 64, '處理了，但回應逾時…', { anchor: 'middle', size: 13, color: C.red })
  s.arrow(g1, 196, 125, 684, 125, { stroke: C.grey, strokeWidth: 1.8 }, 10)
  s.pill(g1, 230, 109, 110, 28, 'evt_1', C.blueLight, C.navy, 13)
  s.text(g1, 520, 109, '重送：同一事件第二次', { anchor: 'middle', size: 13, weight: 700, color: C.red })

  // 2 · 亂序到達
  const g2 = s.layer(2)
  s.arrow(g2, 196, 190, 684, 190, { stroke: C.grey, strokeWidth: 1.8 }, 10)
  s.pill(g2, 230, 174, 150, 28, 'evt_3 paid', C.blueLight, C.navy, 13)
  s.arrow(g2, 196, 240, 684, 240, { stroke: C.grey, strokeWidth: 1.8 }, 10)
  s.pill(g2, 230, 224, 150, 28, 'evt_2 created', C.blueLight, C.navy, 13)
  s.text(g2, 540, 215, '先到的不一定先發生', { anchor: 'middle', size: 14, weight: 700, color: C.orangeDark })

  // 3 · 接收端的對策
  const g3 = s.layer(3)
  s.text(g3, 785, 110, '✓ 以 ID 去重', { anchor: 'middle', size: 15, weight: 700, color: C.green })
  s.text(g3, 785, 150, '✓ 不靠到達順序', { anchor: 'middle', size: 15, weight: 700, color: C.green })
  s.text(g3, 785, 190, '✓ 回打 API', { anchor: 'middle', size: 15, weight: 700, color: C.green })
  s.text(g3, 785, 212, '拿最新狀態', { anchor: 'middle', size: 13, color: C.green })
  s.text(g3, 785, 256, 'seen.has(id)', { anchor: 'middle', size: 13, color: C.navy, font: MONO })
})
</script>

<template>
  <svg ref="svg" viewBox="0 20 900 285" class="w-full" />
</template>
