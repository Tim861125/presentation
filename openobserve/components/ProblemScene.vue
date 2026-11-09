<script setup lang="ts">
import { ref } from 'vue'
import { C, useRoughScene } from '../utils/rough-scene'

// 問題：使用者說「搜尋好慢」。沒有可觀測性只能猜；有了 OpenObserve，三種訊號用同一個 trace_id 串起來。
const svg = ref<SVGSVGElement>()

const comp = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }
const label = { color: C.navy, size: 17 }

useRoughScene(svg, (s) => {
  const g0 = s.layer(0)
  s.box(g0, 10, 60, 150, 80, '使用者\n「搜尋好慢」', { stroke: C.ink, strokeWidth: 2 }, { color: C.ink, size: 17 })
  s.box(g0, 215, 60, 150, 80, '瀏覽器\n前端', comp, label)
  s.box(g0, 420, 60, 150, 80, 'pi API\n後端', comp, label)
  s.box(g0, 660, 10, 200, 60, 'vLLM\nembedding', comp, { ...label, size: 15 })
  s.box(g0, 660, 130, 200, 60, 'OpenSearch\nkNN', comp, { ...label, size: 15 })
  s.arrow(g0, 166, 100, 209, 100, { stroke: C.ink, strokeWidth: 2 }, 10)
  s.arrow(g0, 371, 100, 414, 100, { stroke: C.ink, strokeWidth: 2 }, 10)
  s.arrow(g0, 576, 88, 654, 48, { stroke: C.ink, strokeWidth: 2 }, 10)
  s.arrow(g0, 576, 112, 654, 152, { stroke: C.ink, strokeWidth: 2 }, 10)

  const g1 = s.layer(1, { to: 1 })
  for (const x of [290, 495, 760])
    s.text(g1, x, 222, '?', { anchor: 'middle', size: 40, weight: 800, color: C.red })
  s.text(g1, 450, 280, '慢在哪？只能一台一台登進去翻 log、靠經驗猜', { anchor: 'middle', size: 19, weight: 600, color: C.red })

  const g2 = s.layer(2)
  s.ellipse(g2, 290, 100, 180, 104, { stroke: C.orange, strokeWidth: 2.5 })
  s.ellipse(g2, 495, 100, 180, 104, { stroke: C.orange, strokeWidth: 2.5 })
  s.ellipse(g2, 760, 160, 230, 84, { stroke: C.orange, strokeWidth: 2.5 })
  s.pill(g2, 190, 210, 200, 32, 'RUM：API 等了 32 秒', C.white, C.navy, 13)
  s.pill(g2, 400, 210, 190, 32, 'Traces：慢在 kNN', C.white, C.navy, 13)
  s.pill(g2, 640, 210, 240, 32, 'Logs：opensearch 逾時', C.white, C.navy, 13)

  const g3 = s.layer(3)
  s.path(g3, 'M290 246 Q390 270 495 246 Q620 270 760 246', { stroke: C.orange, strokeWidth: 3 })
  s.pill(g3, 270, 278, 360, 36, '同一個 trace_id 串起三種訊號', C.orange, C.navy, 15)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 320" class="w-full" />
</template>
