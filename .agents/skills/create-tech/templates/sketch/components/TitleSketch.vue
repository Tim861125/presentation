<script setup lang="ts">
import { ref } from 'vue'
import { C, useRoughScene } from '../utils/rough-scene'

// 封面裝飾手繪：主題的核心元件一個個被畫出來，箭頭串起資料流。
// 換主題時只改 nodes / edges / tagline。
const svg = ref<SVGSVGElement>()

const nodes: [number, number, string][] = [
  [70, 80, 'client'],
  [250, 50, 'api'],
  [400, 150, 'service'],
  [230, 240, 'store'],
]
const edges: [number, number][] = [[0, 1], [1, 2], [2, 3]]
const tagline = 'TOPIC 的一句核心概念'

useRoughScene(svg, (s) => {
  s.base = { stroke: C.white, strokeWidth: 2 }
  nodes.forEach(([x, y, label], i) => {
    const g = s.layer(0, { delay: 250 + i * 260, duration: 600 })
    s.ellipse(g, x, y, 120, 62, { fill: C.blue, fillStyle: 'solid', stroke: C.white })
    s.text(g, x, y + 1, label, { anchor: 'middle', color: C.white, weight: 700, size: 15 })
  })
  edges.forEach(([a, b], i) => {
    const g = s.layer(0, { delay: 450 + i * 260, duration: 500 })
    const [x1, y1] = nodes[a]
    const [x2, y2] = nodes[b]
    const d = Math.hypot(x2 - x1, y2 - y1)
    const ux = (x2 - x1) / d
    const uy = (y2 - y1) / d
    s.arrow(g, x1 + ux * 56, y1 + uy * 30, x2 - ux * 58, y2 - uy * 32, { stroke: C.orange, strokeWidth: 2.4 })
  })
  const g = s.layer(0, { delay: 1600, duration: 700 })
  s.pill(g, 40, 330, 260, 34, tagline, C.orange, C.navy, 14)
}, () => 0)
</script>

<template>
  <svg ref="svg" viewBox="0 0 480 400" class="w-full h-full" />
</template>
