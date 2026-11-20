<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'
import type { Scene } from 'slidev-theme-sketch/utils/rough-scene'

// 直式：同一顆 kernel 上，兩個容器各自一組 namespaces；cgroup 限制用量；seccomp 擋 syscall。
const svg = ref<SVGSVGElement>()

const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 1.8 }
const proc = { fill: '#fff3d6', fillStyle: 'solid', stroke: C.orange, strokeWidth: 2 }
const ns = ['pid', 'net', 'mnt', 'uts']

function container(s: Scene, g: SVGGElement, x: number, name: string, cmd: string, hostPid: string) {
  s.rect(g, x, 100, 280, 300, { stroke: C.blue, strokeWidth: 1.6, strokeLineDash: [6, 6], roughness: 0.6 })
  s.text(g, x + 12, 120, name, { size: 15, weight: 700, color: C.blue })
  s.box(g, x + 15, 138, 250, 62, `${cmd}\n自己看：PID 1`, proc, { color: C.navy, size: 16 })
  s.text(g, x + 140, 222, `主機看：PID ${hostPid}`, { anchor: 'middle', size: 14, color: C.grey, font: MONO })
  ns.forEach((n, i) => s.pill(g, x + 20 + (i % 2) * 125, 246 + Math.floor(i / 2) * 38, 115, 30, n, C.blueTint, C.navy, 15))
}

useRoughScene(svg, (s) => {
  // layer 0：一顆 kernel、主機上的行程
  const g0 = s.layer(0)
  s.text(g0, 15, 14, '主機上的行程', { size: 15, weight: 700, color: C.grey })
  ;['systemd · 1', 'sshd · 812', 'dockerd · 1093'].forEach((p, i) =>
    s.box(g0, 15 + i * 195, 30, 180, 40, p, box, { color: C.navy, size: 15, font: MONO }))
  s.box(g0, 10, 476, 580, 52, 'Linux kernel（只有一顆）', { fill: C.paper, fillStyle: 'solid', stroke: C.ink, strokeWidth: 2 }, { color: C.navy, size: 18 })

  // layer 1：兩個容器
  const g1 = s.layer(1, { duration: 1200 })
  container(s, g1, 15, '容器 A · alpine', 'sh', '24817')
  container(s, g1, 305, '容器 B · nginx', 'nginx', '25120')

  // layer 2：cgroup
  const g2 = s.layer(2)
  s.text(g2, 155, 356, 'cgroup：mem ≤ 256MB', { anchor: 'middle', size: 15, weight: 700, color: C.orangeDark, font: MONO })
  s.text(g2, 445, 356, 'cgroup：cpu ≤ 0.5', { anchor: 'middle', size: 15, weight: 700, color: C.orangeDark, font: MONO })
  s.rect(g2, 9, 94, 292, 312, { stroke: C.orange, strokeWidth: 2.4, roughness: 0.9 })
  s.rect(g2, 299, 94, 292, 312, { stroke: C.orange, strokeWidth: 2.4, roughness: 0.9 })

  // layer 3：seccomp
  const g3 = s.layer(3)
  s.line(g3, 15, 428, 585, 428, { stroke: C.red, strokeWidth: 2.6, strokeLineDash: [8, 6] })
  s.text(g3, 300, 452, 'seccomp：擋掉危險的 syscall', { anchor: 'middle', size: 16, weight: 800, color: C.red })
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 600 540" class="vscene" />
</template>
