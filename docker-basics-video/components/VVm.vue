<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// 直式：macOS 上的 docker CLI → Docker Desktop → vsock → Linux VM 裡的 dockerd → 容器。
const svg = ref<SVGSVGElement>()

const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }
const cx = [105, 300, 495]

useRoughScene(svg, (s) => {
  // layer 0：macOS 上的 client
  const g0 = s.layer(0)
  s.rect(g0, 4, 4, 592, 196, { stroke: C.greyLight, strokeWidth: 1.4, strokeLineDash: [6, 6], roughness: 0.6 })
  s.text(g0, 16, 22, 'macOS（沒有 Linux kernel）', { size: 15, weight: 700, color: C.grey })
  ;['docker CLI', 'compose', 'buildx'].forEach((c, i) => s.box(g0, cx[i] - 85, 40, 170, 44, c, box, { color: C.navy, size: 16, font: MONO }))

  // layer 1：Docker Desktop 在 host 端接手
  const g1 = s.layer(1)
  cx.forEach(x => s.arrow(g1, x, 88, 300 + (x - 300) * 0.35, 122, { stroke: C.ink, strokeWidth: 1.8 }, 8))
  s.box(g1, 170, 126, 260, 56, 'Docker Desktop（host 端）', box, { color: C.navy, size: 16 })
  s.text(g1, 440, 154, 'docker.sock', { size: 14, color: C.grey, font: MONO })

  // layer 2：vsock 進 Linux VM
  const g2 = s.layer(2)
  s.rect(g2, 4, 236, 592, 330, { stroke: C.blue, strokeWidth: 1.6, strokeLineDash: [6, 6], roughness: 0.6 })
  s.text(g2, 16, 256, 'Linux VM（自己的 kernel）', { size: 15, weight: 700, color: C.blue })
  s.arrow(g2, 300, 186, 300, 276, { stroke: C.orange, strokeWidth: 3.2 }, 12)
  s.text(g2, 314, 214, 'vsock', { size: 16, weight: 800, color: C.orangeDark, font: MONO })
  s.box(g2, 190, 280, 220, 112, 'dockerd\n↓ containerd\n↓ shim\n↓ runc', box, { color: C.navy, size: 16, font: MONO })

  // layer 3：容器
  const g3 = s.layer(3)
  ;['alpine', 'nginx', 'postgres'].forEach((c, i) => {
    s.curve(g3, 300, 396, cx[i], 456, i === 1 ? 0 : (i === 0 ? 20 : -20), { stroke: C.orange, strokeWidth: 2.2 }, 9)
    s.box(g3, cx[i] - 85, 460, 170, 44, c, { fill: '#fff3d6', fillStyle: 'solid', stroke: C.orange, strokeWidth: 1.8 }, { color: C.navy, size: 16, font: MONO })
  })

  // layer 4：比較重點
  const g4 = s.layer(4)
  s.pill(g4, 40, 516, 520, 40, 'VM 開多快 · 吃多少記憶體 · 經過幾層', C.orange, C.navy, 16)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 600 570" class="vscene" />
</template>
