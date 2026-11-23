<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// 問題頁：polling 一直問、幾乎都是空的 → 換成 GitHub 事件發生時主動 POST。
const svg = ref<SVGSVGElement>()

useRoughScene(svg, (s) => {
  const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2.2 }

  const g0 = s.layer(0)
  s.box(g0, 30, 100, 220, 110, '我們的 server', box, { color: C.navy })
  s.box(g0, 650, 100, 220, 110, 'GitHub', box, { color: C.navy })

  // 1 · polling：一直問，一直空手而回
  const g1 = s.layer(1, { to: 1 })
  ;[0, 1, 2].forEach((i) => {
    const y = 100 + i * 54
    s.arrow(g1, 262, y, 640, y, { stroke: C.grey, strokeWidth: 1.6 }, 9)
    s.text(g1, 450, y - 9, 'GET /issues?since=…  有新的嗎？', { anchor: 'middle', size: 12, color: C.grey, font: MONO })
    s.arrow(g1, 640, y + 14, 262, y + 14, { stroke: C.red, strokeWidth: 1.2, strokeLineDash: [5, 5] }, 7)
    s.text(g1, 610, y + 25, '200 []  沒有', { anchor: 'end', size: 11, color: C.red, font: MONO })
  })
  s.text(g1, 450, 268, '每 30 秒問一次：大多是空回應、最多延遲 30 秒、還吃 rate limit', { anchor: 'middle', size: 16, weight: 700, color: C.red })

  // 2 · webhook：事件發生，GitHub 主動打過來
  const g2 = s.layer(2)
  s.pill(g2, 670, 50, 180, 32, 'issue #42 opened', C.orange, C.navy, 14)
  s.arrow(g2, 640, 155, 262, 155, { stroke: C.orange, strokeWidth: 3.2 }, 14)
  s.text(g2, 450, 135, 'POST /webhook', { anchor: 'middle', size: 16, weight: 700, color: C.orangeDark, font: MONO })
  s.text(g2, 450, 178, '{ "action": "opened", "issue": { … } }', { anchor: 'middle', size: 13, color: C.navy, font: MONO })

  // 3 · 結論
  const g3 = s.layer(3)
  s.pill(g3, 220, 250, 460, 38, '有事才通知：不空轉、近即時、只打一次', C.orange, C.navy, 16)
})
</script>

<template>
  <svg ref="svg" viewBox="0 20 900 290" class="w-full" />
</template>
