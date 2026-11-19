<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// docker run -d -p 8080:80 --name web nginx：localhost:8080 怎麼走到容器的 :80。
const svg = ref<SVGSVGElement>()

const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }
const t = { color: C.navy, size: 14 }

useRoughScene(svg, (s) => {
  // layer 0：瀏覽器與主機
  const g0 = s.layer(0)
  s.box(g0, 10, 66, 120, 60, '瀏覽器', { fill: C.paper, fillStyle: 'solid', stroke: C.ink, strokeWidth: 1.8 }, { ...t, size: 15 })
  s.text(g0, 70, 146, 'localhost:8080', { anchor: 'middle', size: 13, color: C.grey, font: MONO })
  s.rect(g0, 160, 4, 734, 300, { stroke: C.greyLight, strokeWidth: 1.4, strokeLineDash: [6, 6], roughness: 0.6 })
  s.text(g0, 172, 22, 'Linux host（Mac / Windows 上就是那台 VM）', { size: 14, weight: 700, color: C.grey })

  // layer 1：iptables DNAT
  const g1 = s.layer(1)
  s.arrow(g1, 134, 96, 184, 96, { stroke: C.ink, strokeWidth: 2 }, 9)
  s.box(g1, 188, 56, 180, 80, 'iptables\nDNAT', box, { ...t, size: 15, font: MONO })
  s.text(g1, 278, 156, '8080 → 172.17.0.2:80', { anchor: 'middle', size: 13, color: C.grey, font: MONO })

  // layer 2：docker0 bridge
  const g2 = s.layer(2)
  s.arrow(g2, 372, 96, 412, 96, { stroke: C.ink, strokeWidth: 2 }, 9)
  s.box(g2, 416, 56, 130, 80, 'docker0\nbridge', box, { ...t, size: 15, font: MONO })
  s.text(g2, 481, 156, '虛擬交換器', { anchor: 'middle', size: 13, color: C.grey, italic: true })

  // layer 3：veth pair 接到容器自己的 net namespace
  const g3 = s.layer(3)
  s.rect(g3, 596, 34, 286, 136, { stroke: C.orange, strokeWidth: 1.8, strokeLineDash: [6, 6], roughness: 0.6 })
  s.text(g3, 608, 52, '容器 web（自己的 net ns）', { size: 13, weight: 700, color: C.orangeDark })
  s.line(g3, 550, 96, 616, 96, { stroke: C.orange, strokeWidth: 3.2 })
  s.text(g3, 572, 76, 'veth', { anchor: 'middle', size: 13, weight: 700, color: C.orangeDark, font: MONO })
  s.box(g3, 620, 72, 100, 48, 'eth0', box, { ...t, font: MONO })
  s.arrow(g3, 724, 96, 752, 96, { stroke: C.ink, strokeWidth: 2 }, 8)
  s.box(g3, 756, 72, 114, 48, 'nginx :80', { fill: '#fff3d6', fillStyle: 'solid', stroke: C.orange, strokeWidth: 2 }, { ...t, font: MONO })

  // layer 4：另一條路與收尾
  const g4 = s.layer(4)
  s.box(g4, 188, 206, 358, 60, 'docker-proxy\nuser-space 轉送（iptables 管不到時）', { stroke: C.grey, strokeWidth: 1.4, strokeLineDash: [5, 5] }, { color: C.grey, size: 13 })
  s.pill(g4, 574, 216, 300, 40, '刪容器 → veth、規則也要清', C.orange, C.navy, 14)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 310" class="w-full" />
</template>
