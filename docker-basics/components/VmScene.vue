<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// Mac 沒有 Linux kernel：docker CLI 在 macOS，dockerd 和容器都在一台 Linux VM 裡。
const svg = ref<SVGSVGElement>()

const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }
const clients = ['docker CLI', 'compose', 'buildx']

useRoughScene(svg, (s) => {
  // layer 0：macOS 上的 client
  const g0 = s.layer(0)
  s.rect(g0, 2, 4, 380, 260, { stroke: C.greyLight, strokeWidth: 1.4, strokeLineDash: [6, 6], roughness: 0.6 })
  s.text(g0, 14, 22, 'macOS host（沒有 Linux kernel）', { size: 14, weight: 700, color: C.grey })
  clients.forEach((c, i) => s.box(g0, 20, 46 + i * 70, 130, 46, c, box, { color: C.navy, size: 15, font: MONO }))

  // layer 1：送到 host 上的 socket，由 Docker Desktop 的 host 端程式接手
  const g1 = s.layer(1)
  clients.forEach((_, i) => s.arrow(g1, 154, 69 + i * 70, 212, 140, { stroke: C.ink, strokeWidth: 1.6 }, 8))
  s.box(g1, 216, 96, 150, 88, 'Docker Desktop\nhost 端程式', box, { color: C.navy, size: 15 })
  s.text(g1, 291, 206, 'docker.sock', { anchor: 'middle', size: 13, color: C.grey, font: MONO })
  s.text(g1, 291, 226, '轉發進 VM', { anchor: 'middle', size: 13, color: C.grey, italic: true })

  // layer 2：vsock 進 Linux VM，dockerd 整串在裡面
  const g2 = s.layer(2)
  s.rect(g2, 440, 4, 456, 260, { stroke: C.blue, strokeWidth: 1.6, strokeLineDash: [6, 6], roughness: 0.6 })
  s.text(g2, 452, 22, 'Linux VM（自己的 kernel）', { size: 14, weight: 700, color: C.blue })
  s.arrow(g2, 370, 140, 474, 140, { stroke: C.orange, strokeWidth: 3 }, 12)
  s.text(g2, 422, 122, 'vsock', { anchor: 'middle', size: 14, weight: 700, color: C.orangeDark, font: MONO })
  s.box(g2, 478, 84, 170, 112, 'dockerd\n↓ containerd\n↓ shim\n↓ runc', box, { color: C.navy, size: 14, font: MONO })

  // layer 3：容器
  const g3 = s.layer(3)
  ;['alpine true', 'nginx (web)', 'postgres'].forEach((c, i) => {
    const y = 50 + i * 66
    s.curve(g3, 650, 140, 712, y + 22, i === 1 ? 0 : (i === 0 ? -16 : 16), { stroke: C.orange, strokeWidth: 2 }, 9)
    s.box(g3, 716, y, 166, 44, c, { fill: '#fff3d6', fillStyle: 'solid', stroke: C.orange, strokeWidth: 1.8 }, { color: C.navy, size: 14, font: MONO })
  })

  // layer 4：比較重點
  const g4 = s.layer(4)
  s.pill(g4, 150, 280, 600, 36, 'VM 開機多快 · 常駐多少記憶體 · 中間幾層', C.orange, C.navy, 16)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 325" class="w-full" />
</template>
