<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// VM 每台自帶 kernel；容器共用主機那一顆 kernel，本身只是 process。
const svg = ref<SVGSVGElement>()

const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 1.8 }
const kern = { fill: '#fde2e4', fillStyle: 'solid', stroke: C.red, strokeWidth: 1.8 }
const hw = { fill: C.paper, fillStyle: 'solid', stroke: C.grey, strokeWidth: 1.6 }
const t = { color: C.navy, size: 14 }

useRoughScene(svg, (s) => {
  // layer 0：VM 那一邊
  const g0 = s.layer(0, { duration: 1200 })
  s.text(g0, 220, 16, '虛擬機（VM）', { anchor: 'middle', size: 17, weight: 800, color: C.navy })
  ;[20, 157, 294].forEach((x, i) => {
    s.box(g0, x, 36, 125, 38, `App ${i + 1}`, box, t)
    s.box(g0, x, 80, 125, 38, '函式庫 / OS', box, t)
    s.box(g0, x, 124, 125, 38, 'Guest kernel', kern, { ...t, color: C.red })
  })
  s.box(g0, 20, 172, 399, 36, 'Hypervisor', hw, { ...t, color: C.grey })
  s.box(g0, 20, 216, 399, 32, '硬體', hw, { ...t, color: C.grey })

  // layer 1：容器那一邊
  const g1 = s.layer(1, { duration: 1200 })
  s.text(g1, 680, 16, '容器（Container）', { anchor: 'middle', size: 17, weight: 800, color: C.orangeDark })
  ;[['alpine', 476], ['nginx', 614], ['postgres', 752]].forEach(([name, x]) => {
    const xx = Number(x)
    s.rect(g1, xx - 4, 30, 136, 94, { stroke: C.orange, strokeWidth: 1.6, strokeLineDash: [5, 5], roughness: 0.6 })
    s.box(g1, xx, 36, 128, 38, String(name), box, { ...t, font: MONO })
    s.box(g1, xx, 80, 128, 38, '自己的檔案', box, t)
  })
  s.box(g1, 472, 140, 412, 68, 'Linux kernel（只有一顆，大家共用）', { fill: '#fff3d6', fillStyle: 'solid', stroke: C.orange, strokeWidth: 2.4 }, { color: C.navy, size: 16 })
  s.box(g1, 472, 216, 412, 32, '硬體', hw, { ...t, color: C.grey })

  // layer 2：差在哪
  const g2 = s.layer(2)
  s.text(g2, 220, 272, '每台自帶 kernel · 開機要秒級', { anchor: 'middle', size: 15, weight: 700, color: C.red })
  s.text(g2, 680, 272, '共用 kernel · 啟動就是開一個 process（毫秒級）', { anchor: 'middle', size: 15, weight: 700, color: C.orangeDark })

  // layer 3：結論
  const g3 = s.layer(3)
  s.pill(g3, 230, 292, 440, 34, '容器不是小 VM，是被隔離的 process', C.orange, C.navy, 16)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 330" class="w-full" />
</template>
