<script setup lang="ts">
import { ref } from 'vue'
import { C, useRoughScene } from '../utils/rough-scene'

// 封面裝飾手繪：writeLog 一行 log 分兩路 —— stdout 與 OTel SDK → OpenObserve。
const svg = ref<SVGSVGElement>()

const nodes: [number, number, string][] = [
  [110, 70, 'writeLog()'],
  [360, 60, 'stdout'],
  [250, 190, 'OTel SDK'],
  [380, 290, 'OpenObserve'],
]
const edges: [number, number][] = [[0, 1], [0, 2], [2, 3]]
const tagline = '一行 log，兩個出口'

useRoughScene(svg, (s) => {
  s.base = { stroke: C.white, strokeWidth: 2 }
  nodes.forEach(([x, y, label], i) => {
    const g = s.layer(0, { delay: 250 + i * 260, duration: 600 })
    s.ellipse(g, x, y, 150, 62, { fill: C.blue, fillStyle: 'solid', stroke: C.white })
    s.text(g, x, y + 1, label, { anchor: 'middle', color: C.white, weight: 700, size: 15 })
  })
  edges.forEach(([a, b], i) => {
    const g = s.layer(0, { delay: 450 + i * 260, duration: 500 })
    const [x1, y1] = nodes[a]
    const [x2, y2] = nodes[b]
    const d = Math.hypot(x2 - x1, y2 - y1)
    const ux = (x2 - x1) / d
    const uy = (y2 - y1) / d
    s.arrow(g, x1 + ux * 72, y1 + uy * 30, x2 - ux * 74, y2 - uy * 32, { stroke: C.orange, strokeWidth: 2.4 })
  })
  const g = s.layer(0, { delay: 1600, duration: 700 })
  s.pill(g, 20, 350, 230, 34, tagline, C.orange, C.navy, 14)
}, () => 0)
</script>

<template>
  <svg ref="svg" viewBox="0 0 480 400" class="w-full h-full" />
</template>
