<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// docker run --rm alpine true 的路：CLI → dockerd → containerd → shim → runc → container。
const svg = ref<SVGSVGElement>()

const W = 120
const GAP = 30
const X0 = 15
const Y = 60
const H = 60
const col = (i: number) => X0 + i * (W + GAP)
const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }

const nodes: [string, string, string][] = [
  ['docker CLI', '你打的指令', '翻成 API 請求'],
  ['dockerd', '管 image、', '網路、volume'],
  ['containerd', '管容器的', '生命週期'],
  ['shim', '每個容器一支', '當容器的 parent'],
  ['runc', '設 namespace、', 'cgroup、seccomp'],
  ['container', 'alpine true', '就是一個 process'],
]
const links = ['HTTP', 'gRPC', '啟動', 'exec', 'clone']

useRoughScene(svg, (s) => {
  nodes.forEach(([label, n1, n2], i) => {
    // layer i：第 i 個元件；runc 與 container 一起出現
    const g = s.layer(i === 5 ? 4 : i)
    const last = i === 5
    s.box(g, col(i), Y, W, H, label, last ? { ...box, fill: '#fff3d6', stroke: C.orange } : box, { color: C.navy, size: 16, font: MONO })
    s.text(g, col(i) + W / 2, 146, n1, { anchor: 'middle', size: 13, color: C.grey })
    s.text(g, col(i) + W / 2, 166, n2, { anchor: 'middle', size: 13, color: C.grey })
    if (i > 0) {
      const x1 = col(i - 1) + W + 3
      const x2 = col(i) - 3
      s.arrow(g, x1, Y + H / 2, x2, Y + H / 2, { stroke: last ? C.orange : C.ink, strokeWidth: last ? 2.6 : 1.8 }, 8)
      s.text(g, (x1 + x2) / 2, Y - 14, links[i - 1], { anchor: 'middle', size: 12, weight: 700, color: last ? C.orangeDark : C.blue, font: MONO })
      if (i === 1)
        s.text(g, (x1 + x2) / 2, 20, 'via /var/run/docker.sock', { anchor: 'middle', size: 13, color: C.grey, font: MONO })
    }
  })

  // layer 5：runc 建完就離開，shim 留下來顧容器
  const g5 = s.layer(5)
  s.line(g5, col(4) - 4, Y + H + 4, col(4) + W + 4, Y - 4, { stroke: C.red, strokeWidth: 2.6 })
  s.text(g5, col(4) + W / 2, 28, '建完就結束', { anchor: 'middle', size: 13, weight: 700, color: C.red })
  s.curve(g5, col(3) + W / 2, 180, col(5) + W / 2, 186, 46, { stroke: C.orange, strokeWidth: 2.2 }, 10)
  s.text(g5, col(3) + W / 2 + 20, 228, 'parent', { size: 13, weight: 700, color: C.orangeDark, font: MONO })
  s.pill(g5, 170, 268, 560, 36, '每個 docker run 都要穿過這 5 層', C.orange, C.navy, 16)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 320" class="w-full" />
</template>
