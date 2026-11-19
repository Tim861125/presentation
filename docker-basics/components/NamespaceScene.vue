<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// 同一顆 kernel 上：主機 process、容器 A、容器 B。namespace 隔離視野，cgroup 限制用量，seccomp 過濾 syscall。
const svg = ref<SVGSVGElement>()

const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 1.8 }
const proc = { fill: '#fff3d6', fillStyle: 'solid', stroke: C.orange, strokeWidth: 2 }
const ns = ['pid', 'net', 'mnt', 'uts']

function container(s: any, g: SVGGElement, x: number, name: string, cmd: string, hostPid: string) {
  s.rect(g, x, 10, 290, 216, { stroke: C.blue, strokeWidth: 1.6, strokeLineDash: [6, 6], roughness: 0.6 })
  s.text(g, x + 12, 28, name, { size: 14, weight: 700, color: C.blue })
  s.box(g, x + 20, 44, 250, 52, `${cmd}\n自己看：PID 1`, proc, { color: C.navy, size: 14 })
  s.text(g, x + 145, 114, `主機看：PID ${hostPid}`, { anchor: 'middle', size: 13, color: C.grey, font: MONO })
  ns.forEach((n, i) => s.pill(g, x + 20 + i * 64, 132, 56, 26, n, C.blueTint, C.navy, 13))
}

useRoughScene(svg, (s) => {
  // layer 0：一顆 kernel、主機上的 process
  const g0 = s.layer(0)
  s.box(g0, 10, 276, 880, 44, 'Linux kernel（只有一顆）', { fill: C.paper, fillStyle: 'solid', stroke: C.ink, strokeWidth: 2 }, { color: C.navy, size: 16 })
  s.text(g0, 20, 22, '主機上的 process', { size: 14, weight: 700, color: C.grey })
  ;['systemd · PID 1', 'sshd · PID 812', 'dockerd · PID 1093'].forEach((p, i) =>
    s.box(g0, 20, 40 + i * 48, 226, 38, p, box, { color: C.navy, size: 14, font: MONO }))

  // layer 1：兩個容器，各自一組 namespaces
  const g1 = s.layer(1, { duration: 1200 })
  container(s, g1, 280, '容器 A · alpine', 'sh', '24817')
  container(s, g1, 600, '容器 B · nginx', 'nginx', '25120')

  // layer 2：cgroup 限制用量
  const g2 = s.layer(2)
  s.text(g2, 425, 196, 'cgroup：mem ≤ 256 MB', { anchor: 'middle', size: 14, weight: 700, color: C.orangeDark, font: MONO })
  s.text(g2, 745, 196, 'cgroup：cpu ≤ 0.5', { anchor: 'middle', size: 14, weight: 700, color: C.orangeDark, font: MONO })
  s.rect(g2, 274, 4, 302, 228, { stroke: C.orange, strokeWidth: 2.2, roughness: 0.9 })
  s.rect(g2, 594, 4, 302, 228, { stroke: C.orange, strokeWidth: 2.2, roughness: 0.9 })

  // layer 3：seccomp 擋在容器和 kernel 之間
  const g3 = s.layer(3)
  s.line(g3, 280, 252, 890, 252, { stroke: C.red, strokeWidth: 2.4, strokeLineDash: [8, 6] })
  s.text(g3, 266, 244, 'seccomp', { anchor: 'end', size: 15, weight: 800, color: C.red, font: MONO })
  s.text(g3, 266, 262, '擋危險 syscall', { anchor: 'end', size: 12, color: C.red })
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 330" class="w-full" />
</template>
