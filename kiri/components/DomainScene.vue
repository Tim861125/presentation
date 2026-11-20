<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// Linux 上 http://web.kiri.localhost 怎麼找到容器：*.localhost 本來就是 127.0.0.1，再由 loopback :80 router 看 Host 挑容器。
const svg = ref<SVGSVGElement>()

const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }
const containers = ['web · nginx', 'api.myapp', 'db · postgres']

useRoughScene(svg, (s) => {
  // layer 0：瀏覽器打網址
  const g0 = s.layer(0)
  s.box(g0, 10, 120, 180, 80, '瀏覽器', box, { color: C.navy, size: 17 })
  s.text(g0, 100, 225, 'http://web.kiri.localhost', { anchor: 'middle', size: 13, font: MONO, color: C.orangeDark, weight: 700 })

  // layer 1：*.localhost 由系統直接解析，不用 Kiri 的 DNS
  const g1 = s.layer(1)
  s.box(g1, 270, 10, 240, 70, '系統解析 *.localhost', box, { color: C.navy, size: 15, font: MONO })
  s.curve(g1, 150, 116, 266, 48, -30, { stroke: C.ink, strokeWidth: 1.6 }, 9)
  s.text(g1, 390, 100, '*.kiri.localhost → 127.0.0.1', { anchor: 'middle', size: 13, font: MONO, color: C.grey })

  // layer 2：router 只聽 loopback，依 Host header 分流
  const g2 = s.layer(2)
  s.arrow(g2, 194, 160, 266, 160, { stroke: C.ink, strokeWidth: 1.8 }, 9)
  s.box(g2, 270, 125, 240, 70, 'router 127.0.0.1:80', box, { color: C.navy, size: 15, font: MONO })
  s.text(g2, 390, 215, '看 Host header', { anchor: 'middle', size: 13, color: C.grey, italic: true })

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

  // layer 4：Linux 目前只有 HTTP
  const g4 = s.layer(4)
  s.pill(g4, 110, 280, 680, 36, 'Linux 目前只有 HTTP，容器 HTTPS 還沒做', C.orange, C.navy, 15)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 330" class="w-full" />
</template>
