<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// Mac 上的架構：各種 client 都講 Docker Engine API → kiri daemon → vsock → VM 裡的 agent → clone3。
const svg = ref<SVGSVGElement>()

const clients = ['docker CLI', 'compose', 'buildx', 'kiri UI']
const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }

useRoughScene(svg, (s) => {
  // layer 0：host 端的 client
  const g0 = s.layer(0)
  s.rect(g0, 2, 4, 400, 316, { stroke: C.greyLight, strokeWidth: 1.4, strokeLineDash: [6, 6], roughness: 0.6 })
  s.text(g0, 14, 22, 'macOS host', { size: 14, weight: 700, color: C.grey })
  clients.forEach((c, i) => s.box(g0, 20, 45 + i * 66, 130, 46, c, box, { color: C.navy, size: 15 }))

  // layer 1：全部匯到 kiri daemon（Docker Engine API）
  const g1 = s.layer(1)
  clients.forEach((_, i) => s.arrow(g1, 154, 68 + i * 66, 222, 160, { stroke: C.ink, strokeWidth: 1.6 }, 8))
  s.box(g1, 226, 110, 156, 100, 'kiri daemon', { ...box, strokeWidth: 2.4 }, { color: C.navy, size: 17 })
  s.text(g1, 304, 192, 'Docker Engine API', { anchor: 'middle', size: 12, color: C.grey, font: MONO })
  s.text(g1, 304, 238, '常駐 ≈ 10 MB', { anchor: 'middle', size: 13, color: C.grey, italic: true })

  // layer 2：vsock 進 VM，PID 1 是 Rust agent
  const g2 = s.layer(2)
  s.rect(g2, 450, 4, 446, 316, { stroke: C.blue, strokeWidth: 1.6, strokeLineDash: [6, 6], roughness: 0.6 })
  s.text(g2, 462, 22, 'Linux VM · 自製 10 MB kernel', { size: 14, weight: 700, color: C.blue })
  s.arrow(g2, 386, 160, 486, 160, { stroke: C.orange, strokeWidth: 3 }, 12)
  s.text(g2, 436, 142, 'vsock', { anchor: 'middle', size: 14, weight: 700, color: C.orangeDark, font: MONO })
  s.box(g2, 490, 118, 140, 84, 'agent\nPID 1 · < 1 MB', box, { color: C.navy, size: 15 })

  // layer 3：agent clone3 出每個 container
  const g3 = s.layer(3)
  ;['alpine true', 'nginx (web)', 'postgres'].forEach((c, i) => {
    const y = 50 + i * 68
    s.curve(g3, 632, 160, 712, y + 22, i === 1 ? 0 : (i === 0 ? -20 : 20), { stroke: C.orange, strokeWidth: 2 }, 9)
    s.box(g3, 716, y, 164, 44, c, { fill: '#fff3d6', fillStyle: 'solid', stroke: C.orange, strokeWidth: 1.8 }, { color: C.navy, size: 14, font: MONO })
  })
  s.text(g3, 560, 226, 'clone3 ↗', { anchor: 'middle', size: 14, weight: 700, color: C.orangeDark, font: MONO })

  // layer 4：結論
  const g4 = s.layer(4)
  s.pill(g4, 486, 270, 396, 36, '沒有 runc · 沒有 shim · 沒有 dockerd', C.orange, C.navy, 15)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 330" class="w-full" />
</template>
