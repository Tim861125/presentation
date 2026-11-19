<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// http://web.kiri.local 怎麼找到容器：小 DNS 回 127.0.0.1，再由 :80/:443 router 看 Host / SNI 挑容器。
const svg = ref<SVGSVGElement>()

const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }
const containers = ['web · nginx', 'api.myapp', 'db · postgres']

useRoughScene(svg, (s) => {
  // layer 0：瀏覽器打網址
  const g0 = s.layer(0)
  s.box(g0, 10, 120, 180, 80, '瀏覽器', box, { color: C.navy, size: 17 })
  s.text(g0, 100, 225, 'http://web.kiri.local', { anchor: 'middle', size: 13, font: MONO, color: C.orangeDark, weight: 700 })

  // layer 1：DNS
  const g1 = s.layer(1)
  s.box(g1, 270, 10, 240, 70, 'DNS 127.0.0.1:53535', box, { color: C.navy, size: 15, font: MONO })
  s.curve(g1, 150, 116, 266, 48, -30, { stroke: C.ink, strokeWidth: 1.6 }, 9)
  s.text(g1, 390, 100, '*.kiri.local → 127.0.0.1', { anchor: 'middle', size: 13, font: MONO, color: C.grey })

  // layer 2：router 依 Host / SNI 分流
  const g2 = s.layer(2)
  s.arrow(g2, 194, 160, 266, 160, { stroke: C.ink, strokeWidth: 1.8 }, 9)
  s.box(g2, 270, 125, 240, 70, 'router :80 / :443', box, { color: C.navy, size: 15, font: MONO })
  s.text(g2, 390, 215, '看 Host header / SNI', { anchor: 'middle', size: 13, color: C.grey, italic: true })

  // layer 3：挑到 web
  const g3 = s.layer(3)
  containers.forEach((c, i) => {
    const y = 50 + i * 75
    const hit = i === 0
    s.box(g3, 620, y, 260, 50, c, hit
      ? { fill: '#fff3d6', fillStyle: 'solid', stroke: C.orange, strokeWidth: 2.2 }
      : { stroke: C.greyLight, strokeWidth: 1.4 }, { color: hit ? C.navy : C.grey, size: 15, font: MONO })
  })
  s.curve(g3, 514, 150, 616, 75, -20, { stroke: C.orange, strokeWidth: 3 }, 11)

  // layer 4：HTTPS 的 CA 被 name constraints 綁住
  const g4 = s.layer(4)
  s.pill(g4, 110, 280, 680, 36, 'Kiri CA 只能簽 *.kiri.local / *.kiri.localhost', C.orange, C.navy, 15)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 330" class="w-full" />
</template>
