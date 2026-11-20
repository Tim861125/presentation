<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// 直式：上半 VM（每台自帶 kernel），下半容器（共用一顆 kernel）。
const svg = ref<SVGSVGElement>()

const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 1.8 }
const kern = { fill: '#fde2e4', fillStyle: 'solid', stroke: C.red, strokeWidth: 1.8 }
const hw = { fill: C.paper, fillStyle: 'solid', stroke: C.grey, strokeWidth: 1.6 }
const t = { color: C.navy, size: 16 }
const cols = [15, 210, 405]

useRoughScene(svg, (s) => {
  // layer 0：VM
  const g0 = s.layer(0, { duration: 1200 })
  s.text(g0, 300, 14, '虛擬機（VM）', { anchor: 'middle', size: 19, weight: 800, color: C.navy })
  cols.forEach((x, i) => {
    s.box(g0, x, 32, 180, 40, `App ${i + 1}`, box, t)
    s.box(g0, x, 78, 180, 40, '函式庫 / OS', box, t)
    s.box(g0, x, 124, 180, 40, 'Guest kernel', kern, { ...t, color: C.red })
  })
  s.box(g0, 15, 172, 570, 36, 'Hypervisor', hw, { ...t, color: C.grey })
  s.box(g0, 15, 214, 570, 32, '硬體', hw, { ...t, color: C.grey })

  // layer 1：容器
  const g1 = s.layer(1, { duration: 1200 })
  s.text(g1, 300, 300, '容器（Container）', { anchor: 'middle', size: 19, weight: 800, color: C.orangeDark })
  ;['alpine', 'nginx', 'postgres'].forEach((name, i) => {
    const x = cols[i]
    s.rect(g1, x - 4, 316, 188, 100, { stroke: C.orange, strokeWidth: 1.6, strokeLineDash: [5, 5], roughness: 0.6 })
    s.box(g1, x, 322, 180, 40, name, box, { ...t, font: MONO })
    s.box(g1, x, 368, 180, 40, '自己的檔案', box, t)
  })
  s.box(g1, 15, 432, 570, 60, 'Linux kernel（只有一顆，大家共用）', { fill: '#fff3d6', fillStyle: 'solid', stroke: C.orange, strokeWidth: 2.4 }, { color: C.navy, size: 18 })
  s.box(g1, 15, 500, 570, 32, '硬體', hw, { ...t, color: C.grey })

  // layer 2：差在哪
  const g2 = s.layer(2)
  s.text(g2, 300, 266, '每台自帶 kernel · 開機要秒級', { anchor: 'middle', size: 18, weight: 700, color: C.red })
  s.text(g2, 300, 554, '共用 kernel · 開一個行程（毫秒級）', { anchor: 'middle', size: 18, weight: 700, color: C.orangeDark })

  // layer 3：結論
  const g3 = s.layer(3)
  s.pill(g3, 50, 574, 500, 40, '容器不是小 VM，是被隔離的行程', C.orange, C.navy, 18)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 600 620" class="vscene" />
</template>
