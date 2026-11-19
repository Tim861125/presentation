<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// 不用 Docker：左邊是原本的 shell（看得到全部 process），unshare 開出新的 namespaces，裡面的 sh 只看得到自己。
const svg = ref<SVGSVGElement>()

const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 1.8 }
const warm = { fill: '#fff3d6', fillStyle: 'solid', stroke: C.orange, strokeWidth: 2 }
const paper = { fill: C.paper, fillStyle: 'solid', stroke: C.grey, strokeWidth: 1.4, roughness: 0.8 }
const mono = { size: 13, font: MONO, color: C.navy }

useRoughScene(svg, (s) => {
  // layer 0：主機上原本的 shell，ps 看得到全部
  const g0 = s.layer(0, { duration: 1000 })
  s.rect(g0, 10, 20, 300, 270, { stroke: C.greyLight, strokeWidth: 1.4, strokeLineDash: [6, 6], roughness: 0.6 })
  s.text(g0, 24, 40, '主機（原本的 shell）', { size: 14, weight: 700, color: C.grey })
  s.text(g0, 24, 62, 'hostname：my-pc', { ...mono, color: C.grey })
  s.rect(g0, 28, 80, 264, 150, paper)
  s.text(g0, 42, 98, '$ ps aux', { ...mono, weight: 700 })
  // SVG 會合併連續空白，所以 PID 與名稱分兩欄畫
  ;[['1', 'systemd'], ['812', 'sshd'], ['1093', 'dockerd']].forEach(([pid, cmd], i) => {
    s.text(g0, 42, 124 + i * 24, pid, mono)
    s.text(g0, 100, 124 + i * 24, cmd, mono)
  })
  s.text(g0, 42, 196, '3001', { ...mono, weight: 700, color: C.orangeDark })
  s.text(g0, 100, 196, 'bash  ← 你', { ...mono, weight: 700, color: C.orangeDark })
  s.text(g0, 160, 250, '全部都看得到', { anchor: 'middle', size: 14, weight: 700, color: C.navy })

  // layer 1：unshare 開出新的 namespaces，sh 在裡面變成 PID 1
  const g1 = s.layer(1, { duration: 1100 })
  s.arrow(g1, 312, 200, 396, 200, { stroke: C.orange, strokeWidth: 2.6 }, 10)
  s.text(g1, 354, 182, 'unshare', { anchor: 'middle', size: 14, weight: 800, color: C.orangeDark, font: MONO })
  s.rect(g1, 400, 20, 490, 270, { stroke: C.orange, strokeWidth: 2.6, roughness: 1 })
  s.text(g1, 414, 40, '新的 namespaces：pid · mnt · uts', { size: 14, weight: 700, color: C.orangeDark })
  s.box(g1, 420, 62, 200, 60, 'sh\n自己看：PID 1', warm, { color: C.navy, size: 14 })
  s.text(g1, 520, 140, '主機看：PID 3105', { anchor: 'middle', size: 12, color: C.grey, font: MONO })

  // layer 2：在裡面 ps，只看到自己
  const g2 = s.layer(2)
  s.rect(g2, 650, 62, 220, 110, paper)
  s.text(g2, 664, 80, '$ ps', { ...mono, weight: 700 })
  ;[['PID', 'CMD'], ['1', 'sh'], ['2', 'ps']].forEach(([pid, cmd], i) => {
    const t = i === 0 ? { ...mono, color: C.grey } : mono
    s.text(g2, 664, 104 + i * 22, pid, t)
    s.text(g2, 710, 104 + i * 22, cmd, t)
  })
  s.text(g2, 760, 192, '只看到自己', { anchor: 'middle', size: 14, weight: 700, color: C.orangeDark })

  // layer 3：改 hostname 只影響裡面
  const g3 = s.layer(3)
  s.box(g3, 420, 214, 200, 56, '$ hostname box\n這裡叫 box', box, { ...mono, size: 13 })
  s.text(g3, 160, 274, '主機還是 my-pc', { anchor: 'middle', size: 14, weight: 700, color: C.green })

  // layer 4：Docker 多做的事
  const g4 = s.layer(4)
  s.pill(g4, 110, 298, 680, 30, 'Docker = 這些 namespaces + cgroup + image + 網路 + seccomp', C.orange, C.navy, 13)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 330" class="w-full" />
</template>
