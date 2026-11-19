<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// 關機 flush：Bun preset 正式環境不跑 close hook → 佇列中的 log 掉；改掛 SIGTERM 自己 flush。
// layer 0 docker stop；1 close hook 不觸發 → log 遺失；2 自掛 SIGTERM → flush → exit；3 5 秒上限 → clicks: 3
const svg = ref<SVGSVGElement>()

useRoughScene(svg, (s) => {
  const blue = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }
  const ink = { stroke: C.ink, strokeWidth: 2 }
  const X = [150, 400, 650]
  const W = 190

  // 0 · 之前：docker stop
  const g0 = s.layer(0)
  s.text(g0, 70, 75, '只靠', { anchor: 'middle', size: 15, color: C.grey, weight: 600 })
  s.text(g0, 70, 97, 'close hook', { anchor: 'middle', size: 14, color: C.grey, font: MONO })
  s.box(g0, X[0], 40, W, 70, 'docker stop\n→ SIGTERM', blue, { color: C.navy, size: 15, font: MONO })

  // 1 · close hook 不觸發 → 最後一批遺失
  const g1 = s.layer(1)
  s.arrow(g1, X[0] + W + 2, 75, X[1] - 4, 75, ink, 10)
  s.box(g1, X[1], 40, W, 70, 'close hook\n正式環境不觸發', { fill: C.white, fillStyle: 'solid', stroke: C.red, strokeWidth: 2, strokeLineDash: [7, 5] }, { color: C.red, size: 15 })
  s.arrow(g1, X[1] + W + 2, 75, X[2] - 4, 75, ink, 10)
  s.box(g1, X[2], 40, W, 70, 'process 結束', blue, { color: C.navy, size: 15 })
  ;[0, 1, 2].forEach((i) => {
    s.rect(g1, X[2] + 30 + i * 46, 124, 36, 20, { stroke: C.red, strokeWidth: 1.6 })
  })
  s.line(g1, X[2] + 22, 150, X[2] + 170, 118, { stroke: C.red, strokeWidth: 2.6 })
  s.text(g1, X[2] + W / 2, 165, '佇列中的 log 遺失', { anchor: 'middle', size: 14, color: C.red, weight: 700 })

  // 2 · 之後：自掛 SIGTERM / SIGINT
  const g2 = s.layer(2)
  s.text(g2, 70, 225, '自己掛', { anchor: 'middle', size: 15, color: C.orangeDark, weight: 700 })
  s.text(g2, 70, 247, 'signal', { anchor: 'middle', size: 14, color: C.orangeDark, font: MONO })
  s.box(g2, X[0], 190, W, 70, 'SIGTERM / SIGINT\nprocess.once', blue, { color: C.navy, size: 14, font: MONO })
  s.arrow(g2, X[0] + W + 2, 225, X[1] - 4, 225, { stroke: C.orange, strokeWidth: 2.6 }, 10)
  s.box(g2, X[1], 190, W, 70, 'provider.shutdown()\n→ flush', { fill: '#fff8e6', fillStyle: 'solid', stroke: C.orange, strokeWidth: 2.6 }, { color: C.navy, size: 14, font: MONO })
  s.arrow(g2, X[1] + W + 2, 225, X[2] - 4, 225, { stroke: C.orange, strokeWidth: 2.6 }, 10)
  s.box(g2, X[2], 190, W, 70, 'logs.disable()\nexit(0)', blue, { color: C.navy, size: 14, font: MONO })

  // 3 · 5 秒上限
  const g3 = s.layer(3)
  s.pill(g3, X[1] + 40, 275, 110, 28, '最多 5 秒', C.orange, C.navy, 13)
  s.text(g3, X[2] + W / 2, 290, '送完（或逾時）才退出', { anchor: 'middle', size: 14, color: C.green, weight: 700 })
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 320" class="w-full" />
</template>
