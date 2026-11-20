<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// HTTP over a Unix socket：socket 只搬 bytes，HTTP 是兩邊約定的文字格式。
const svg = ref<SVGSVGElement>()
const proc = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }
const card = { fill: C.white, fillStyle: 'solid', stroke: C.navy, strokeWidth: 1.6 }

useRoughScene(svg, (s) => {
  // 0 · 兩端 + 中間的 socket
  const g0 = s.layer(0)
  s.box(g0, 20, 60, 150, 80, 'curl', proc, { color: C.navy, size: 20, font: MONO })
  s.box(g0, 730, 60, 150, 80, 'dockerd', proc, { color: C.navy, size: 20, font: MONO })
  s.line(g0, 172, 90, 728, 90, { stroke: C.orange, strokeWidth: 3.5 })
  s.line(g0, 172, 110, 728, 110, { stroke: C.orange, strokeWidth: 3.5 })
  s.text(g0, 450, 100, '/var/run/docker.sock', { anchor: 'middle', size: 13, font: MONO, weight: 700, color: C.orangeDark })

  // 1 · request：一段純文字
  const g1 = s.layer(1)
  const req = s.mover([[1, 0, 0], [2, 290, 0]], g1)
  s.rect(req, 190, 8, 240, 66, card)
  s.text(req, 202, 26, 'GET /version HTTP/1.1', { size: 13, font: MONO, color: C.navy, weight: 700 })
  s.text(req, 202, 46, 'Host: localhost', { size: 13, font: MONO, color: C.orangeDark, weight: 700 })
  s.text(req, 202, 64, 'Accept: */*', { size: 13, font: MONO, color: C.grey })

  // 2 · response 回來
  const g2 = s.layer(2, { delay: 500 })
  s.rect(g2, 230, 126, 300, 66, card)
  s.text(g2, 242, 144, 'HTTP/1.1 200 OK', { size: 13, font: MONO, color: C.navy, weight: 700 })
  s.text(g2, 242, 164, 'Content-Type: application/json', { size: 13, font: MONO, color: C.grey })
  s.text(g2, 242, 182, '{"Version": "...", ...}', { size: 13, font: MONO, color: C.grey })
  s.arrow(g2, 220, 160, 180, 160, { stroke: C.navy, strokeWidth: 2 }, 10)

  // 3 · 分層：HTTP 在上，socket 在下
  const g3 = s.layer(3)
  s.box(g3, 20, 214, 860, 38, 'HTTP：bytes 的「格式」— GET /version、Host header、JSON（兩邊約定好）', { fill: '#fff4d6', fillStyle: 'solid', stroke: C.orangeDark, strokeWidth: 2 }, { size: 15, color: C.orangeDark })
  s.box(g3, 20, 260, 860, 38, 'socket：只負責把 bytes 從這頭送到那頭，不在乎內容是什麼', { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }, { size: 15, color: C.navy })
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 305" class="w-full" />
</template>
