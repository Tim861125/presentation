<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// 直式：docker run 由上往下穿過 CLI → dockerd → containerd → shim → runc → container。
const svg = ref<SVGSVGElement>()

const X = 180
const W = 240
const H = 62
const row = (i: number) => 14 + i * 90
const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }

const nodes: [string, string][] = [
  ['docker CLI', '把指令翻成 API 請求'],
  ['dockerd', '管 image、網路、volume'],
  ['containerd', '管容器的生命週期'],
  ['shim', '每個容器一支'],
  ['runc', '設 namespace、cgroup'],
  ['container', 'alpine true'],
]
const links = ['HTTP · docker.sock', 'gRPC', '啟動', 'exec', 'clone']

useRoughScene(svg, (s) => {
  nodes.forEach(([label, note], i) => {
    const last = i === 5
    const g = s.layer(last ? 4 : i)
    const y = row(i)
    s.rect(g, X, y, W, H, last ? { ...box, fill: '#fff3d6', stroke: C.orange } : box)
    s.text(g, X + W / 2, y + 23, label, { anchor: 'middle', size: 19, weight: 700, color: C.navy, font: MONO })
    s.text(g, X + W / 2, y + 46, note, { anchor: 'middle', size: 14, color: C.grey })
    if (i > 0) {
      const y1 = row(i - 1) + H + 3
      const y2 = y - 3
      s.arrow(g, 300, y1, 300, y2, { stroke: last ? C.orange : C.ink, strokeWidth: last ? 2.8 : 2 }, 8)
      s.text(g, 288, (y1 + y2) / 2, links[i - 1], { anchor: 'end', size: 14, weight: 700, color: last ? C.orangeDark : C.blue, font: MONO })
    }
  })

  // layer 5：runc 建完就走，shim 留下來當 parent
  const g5 = s.layer(5)
  const ry = row(4)
  s.line(g5, X - 4, ry + H + 4, X + W + 4, ry - 4, { stroke: C.red, strokeWidth: 3 })
  s.text(g5, X - 12, ry + H / 2, '建完就結束', { anchor: 'end', size: 16, weight: 800, color: C.red })
  s.curve(g5, X + W + 4, row(3) + H / 2, X + W + 4, row(5) + H / 2, -90, { stroke: C.orange, strokeWidth: 2.6 }, 10)
  s.text(g5, 500, ry + H / 2, 'parent', { size: 16, weight: 800, color: C.orangeDark, font: MONO })
  s.pill(g5, 60, 558, 480, 44, '每個 docker run 都穿過這 5 層', C.orange, C.navy, 17)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 600 610" class="vscene" />
</template>
