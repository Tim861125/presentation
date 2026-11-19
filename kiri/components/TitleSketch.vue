<script setup lang="ts">
import { ref } from 'vue'
import { C, useRoughScene } from '../utils/rough-scene'

// 封面裝飾手繪：docker CLI → kiri daemon → agent → container，一次 clone3 就到。
const svg = ref<SVGSVGElement>()

const nodes: [number, number, string][] = [
  [80, 70, 'docker CLI'],
  [290, 60, 'kiri daemon'],
  [380, 190, 'agent'],
  [160, 250, 'container'],
]
const edges: [number, number, string][] = [[0, 1, 'API'], [1, 2, 'vsock'], [2, 3, 'clone3']]
const tagline = 'docker run → 22 ms'

useRoughScene(svg, (s) => {
  s.base = { stroke: C.white, strokeWidth: 2 }
  nodes.forEach(([x, y, label], i) => {
    const g = s.layer(0, { delay: 250 + i * 260, duration: 600 })
    s.ellipse(g, x, y, 140, 62, { fill: C.blue, fillStyle: 'solid', stroke: C.white })
    s.text(g, x, y + 1, label, { anchor: 'middle', color: C.white, weight: 700, size: 15 })
  })
  edges.forEach(([a, b, label], i) => {
    const g = s.layer(0, { delay: 450 + i * 260, duration: 500 })
    const [x1, y1] = nodes[a]
    const [x2, y2] = nodes[b]
    const d = Math.hypot(x2 - x1, y2 - y1)
    const ux = (x2 - x1) / d
    const uy = (y2 - y1) / d
    s.arrow(g, x1 + ux * 66, y1 + uy * 30, x2 - ux * 68, y2 - uy * 32, { stroke: C.orange, strokeWidth: 2.4 })
    s.text(g, (x1 + x2) / 2 + uy * 22, (y1 + y2) / 2 - ux * 18, label, { anchor: 'middle', color: C.orange, size: 13, weight: 700 })
  })
  const g = s.layer(0, { delay: 1600, duration: 700 })
  s.pill(g, 40, 330, 260, 34, tagline, C.orange, C.navy, 14)
}, () => 0)
</script>

<template>
  <svg ref="svg" viewBox="0 0 480 400" class="w-full h-full" />
</template>
