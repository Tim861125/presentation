<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// VM 冷開機到 agent ready 的中位數（bench/results.json boot_journey），每 click 多一刀。
const svg = ref<SVGSVGElement>()

const rows = [
  { label: 'stock arm64 defconfig', note: '', ms: 810 },
  { label: 'allnoconfig 從零裁', note: '只留需要的', ms: 175 },
  { label: '+ expedited RCU', note: 'cgroup2 mount 23 → 0.1 ms', ms: 140 },
  { label: '+ virtio-pci patch', note: 'reset 改 hrtimer 輪詢', ms: 112 },
]
const X = 300
const SCALE = 0.64
const Y0 = 20
const RH = 62

useRoughScene(svg, (s) => {
  rows.forEach((r, i) => {
    const g = s.layer(i)
    const y = Y0 + i * RH
    const last = i === rows.length - 1
    s.text(g, 10, y + 16, r.label, { size: 16, weight: 700, color: C.navy })
    if (r.note)
      s.text(g, 10, y + 38, r.note, { size: 12, color: C.grey, italic: true })
    const w = r.ms * SCALE
    s.rect(g, X, y + 4, w, 40, {
      fill: i === 0 ? C.greyLight : last ? '#fff3d6' : C.blueTint,
      fillStyle: 'solid',
      stroke: i === 0 ? C.grey : last ? C.orange : C.blue,
      strokeWidth: 2,
    })
    s.text(g, X + w + 12, y + 25, `${r.ms} ms`, { size: 18, weight: 800, font: MONO, color: last ? C.orangeDark : C.ink })
  })

  const g4 = s.layer(4)
  s.pill(g4, 300, 280, 460, 36, 'kernel 開到 PID 1：8 ms', C.orange, C.navy, 16)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 330" class="w-full" />
</template>
