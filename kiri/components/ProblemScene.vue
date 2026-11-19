<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// 同一個 `docker run --rm alpine true`：Docker Desktop 要穿過四層，Kiri 一次 clone3。
const svg = ref<SVGSVGElement>()

const W = 110
const GAP = 22
const X0 = 125
const col = (i: number) => X0 + i * (W + GAP)
const R1 = 40
const R2 = 175
const H = 56

const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }
const txt = { color: C.navy, size: 15 }

useRoughScene(svg, (s) => {
  // layer 0：Docker Desktop 那一列的起點
  const g0 = s.layer(0)
  s.box(g0, 0, R1, 105, H, 'Docker\nDesktop', { stroke: 'none' }, { color: C.grey, size: 15 })
  s.box(g0, col(0), R1, W, H, 'docker CLI', box, txt)

  // layer 1：一路穿過 dockerd → containerd → shim → runc
  const g1 = s.layer(1, { duration: 1400 })
  const chain = ['dockerd', 'containerd', 'shim', 'runc', 'container']
  chain.forEach((label, i) => {
    s.arrow(g1, col(i) + W + 3, R1 + H / 2, col(i + 1) - 3, R1 + H / 2, { stroke: C.ink, strokeWidth: 1.8 }, 8)
    s.box(g1, col(i + 1), R1, W, H, label, box, txt)
  })
  s.text(g1, 890, R1 + H + 24, 'p50 ≈ 178 ms', { anchor: 'end', size: 18, weight: 800, color: C.red, font: MONO })

  // layer 2：Kiri 那一列，agent 直接 clone3 出 container
  const g2 = s.layer(2, { duration: 1200 })
  s.box(g2, 0, R2, 105, H, 'Kiri', { stroke: 'none' }, { color: C.orangeDark, size: 18 })
  s.box(g2, col(0), R2, W, H, 'docker CLI', box, txt)
  s.arrow(g2, col(0) + W + 3, R2 + H / 2, col(1) - 3, R2 + H / 2, { stroke: C.ink, strokeWidth: 1.8 }, 8)
  s.box(g2, col(1), R2, W, H, 'kiri daemon', box, txt)
  s.arrow(g2, col(1) + W + 3, R2 + H / 2, col(2) - 3, R2 + H / 2, { stroke: C.ink, strokeWidth: 1.8 }, 8)
  s.box(g2, col(2), R2, W, H, 'agent', box, txt)
  s.arrow(g2, col(2) + W + 3, R2 + H / 2, col(5) - 3, R2 + H / 2, { stroke: C.orange, strokeWidth: 3 }, 12)
  s.text(g2, (col(3) + col(5)) / 2 + 20, R2 + H / 2 - 16, 'clone3', { anchor: 'middle', size: 16, weight: 700, color: C.orangeDark, font: MONO })
  s.box(g2, col(5), R2, W, H, 'container', { ...box, fill: '#fff3d6', stroke: C.orange }, txt)
  s.text(g2, 890, R2 + H + 24, 'p50 ≈ 22 ms', { anchor: 'end', size: 18, weight: 800, color: C.orangeDark, font: MONO })

  // layer 3：劃掉 Kiri 不需要的四層
  const g3 = s.layer(3)
  for (let i = 1; i <= 4; i++)
    s.line(g3, col(i) - 4, R1 + H + 4, col(i) + W + 4, R1 - 4, { stroke: C.red, strokeWidth: 2.6 })
  s.pill(g3, 175, 282, 550, 36, '沒有 dockerd / containerd / shim / runc', C.orange, C.navy, 16)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 330" class="w-full" />
</template>
