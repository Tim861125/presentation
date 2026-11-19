<script setup lang="ts">
import { ref } from 'vue'
import { C, useRoughScene } from '../utils/rough-scene'

// 封面：瀏覽器 → Traefik → ?（中間層未確認）→ OpenObserve，最後 545 位使用者只剩 1 個 IP。
const svg = ref<SVGSVGElement>()

const nodes: [number, number, number, string][] = [
  [80, 70, 130, 'browser'],
  [300, 70, 130, 'Traefik'],
  [370, 200, 90, '?'],
  [170, 270, 160, 'OpenObserve'],
]
const edges: [number, number][] = [[0, 1], [1, 2], [2, 3]]

useRoughScene(svg, (s) => {
  s.base = { stroke: C.white, strokeWidth: 2 }
  nodes.forEach(([x, y, w, label], i) => {
    const g = s.layer(0, { delay: 250 + i * 260, duration: 600 })
    const unknown = label === '?'
    s.ellipse(g, x, y, w, 62, unknown
      ? { fill: C.navy, fillStyle: 'solid', stroke: C.orange, strokeLineDash: [7, 6] }
      : { fill: C.blue, fillStyle: 'solid', stroke: C.white })
    s.text(g, x, y + 1, label, { anchor: 'middle', color: unknown ? C.orange : C.white, weight: 700, size: unknown ? 24 : 16 })
  })
  edges.forEach(([a, b], i) => {
    const g = s.layer(0, { delay: 450 + i * 260, duration: 500 })
    const [x1, y1, w1] = nodes[a]
    const [x2, y2, w2] = nodes[b]
    const d = Math.hypot(x2 - x1, y2 - y1)
    const ux = (x2 - x1) / d
    const uy = (y2 - y1) / d
    s.arrow(g, x1 + ux * (w1 / 2 - 4), y1 + uy * 34, x2 - ux * (w2 / 2 - 2), y2 - uy * 36, { stroke: C.orange, strokeWidth: 2.4 })
  })
  const g = s.layer(0, { delay: 1600, duration: 700 })
  s.pill(g, 60, 340, 300, 36, 'ip = 192.168.99.11 × 545 人', C.orange, C.navy, 14)
}, () => 0)
</script>

<template>
  <svg ref="svg" viewBox="0 0 480 400" class="w-full h-full" />
</template>
