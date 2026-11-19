<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// 直式：-p 8080:80，localhost:8080 經 iptables → docker0 → veth → 容器 :80。
const svg = ref<SVGSVGElement>()

const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }

useRoughScene(svg, (s) => {
  // layer 0：瀏覽器與主機
  const g0 = s.layer(0)
  s.box(g0, 190, 6, 220, 50, '瀏覽器', { fill: C.paper, fillStyle: 'solid', stroke: C.ink, strokeWidth: 1.8 }, { color: C.navy, size: 18 })
  s.text(g0, 420, 31, 'localhost:8080', { size: 15, color: C.grey, font: MONO })
  s.rect(g0, 4, 84, 592, 490, { stroke: C.greyLight, strokeWidth: 1.4, strokeLineDash: [6, 6], roughness: 0.6 })
  s.text(g0, 16, 102, 'Linux host（Mac 上就是那台 VM）', { size: 15, weight: 700, color: C.grey })

  // layer 1：iptables DNAT
  const g1 = s.layer(1)
  s.arrow(g1, 300, 60, 300, 124, { stroke: C.ink, strokeWidth: 2 }, 9)
  s.box(g1, 170, 128, 260, 62, 'iptables DNAT', box, { color: C.navy, size: 18, font: MONO })
  s.text(g1, 300, 208, '8080 → 172.17.0.2:80', { anchor: 'middle', size: 15, color: C.grey, font: MONO })

  // layer 2：docker0 bridge
  const g2 = s.layer(2)
  s.arrow(g2, 300, 222, 300, 252, { stroke: C.ink, strokeWidth: 2 }, 9)
  s.box(g2, 170, 256, 260, 58, 'docker0 bridge', box, { color: C.navy, size: 18, font: MONO })
  s.text(g2, 440, 285, '虛擬交換器', { size: 15, color: C.grey, italic: true })

  // layer 3：veth 進容器自己的 net namespace
  const g3 = s.layer(3)
  s.rect(g3, 120, 362, 360, 150, { stroke: C.orange, strokeWidth: 1.8, strokeLineDash: [6, 6], roughness: 0.6 })
  s.text(g3, 132, 380, '容器 web（自己的 net ns）', { size: 15, weight: 700, color: C.orangeDark })
  s.line(g3, 300, 318, 300, 396, { stroke: C.orange, strokeWidth: 3.4 })
  s.text(g3, 314, 340, 'veth', { size: 16, weight: 800, color: C.orangeDark, font: MONO })
  s.box(g3, 220, 398, 160, 40, 'eth0', box, { color: C.navy, size: 16, font: MONO })
  s.arrow(g3, 300, 440, 300, 456, { stroke: C.ink, strokeWidth: 2 }, 7)
  s.box(g3, 210, 460, 180, 40, 'nginx :80', { fill: '#fff3d6', fillStyle: 'solid', stroke: C.orange, strokeWidth: 2 }, { color: C.navy, size: 16, font: MONO })

  // layer 4：收尾
  const g4 = s.layer(4)
  s.pill(g4, 60, 524, 480, 40, '刪容器 → veth、規則也要清', C.orange, C.navy, 16)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 600 580" class="vscene" />
</template>
