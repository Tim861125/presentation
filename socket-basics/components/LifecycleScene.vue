<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// Stream socket 生命週期：server socket→bind→listen→accept，client socket→connect，之後 read/write，最後 close。
const svg = ref<SVGSVGElement>()
const call = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }
const callT = { font: MONO, size: 15, color: C.navy }
const SX = 60
const CX = 690
const W = 150
const H = 36
const note = { size: 13, color: C.grey, italic: true }

useRoughScene(svg, (s) => {
  const g0 = s.layer(0)
  s.text(g0, SX + W / 2, 12, 'Server', { anchor: 'middle', size: 16, weight: 700, color: C.blue })
  s.text(g0, CX + W / 2, 12, 'Client', { anchor: 'middle', size: 16, weight: 700, color: C.blue })

  const rows: [string, string][] = [
    ['socket()', '向 kernel 要一個 socket → fd 3'],
    ['bind()', '綁上位址：/tmp/demo.sock 出現'],
    ['listen()', '開門營業，連線先排隊（backlog）'],
    ['accept()', '等客人上門（會卡住）'],
  ]
  rows.forEach(([fn, txt], i) => {
    const y = 30 + i * 46
    const g = s.layer(i + 1)
    s.box(g, SX, y, W, H, fn, call, callT)
    // accept() 的註解在 click 5 讓位給 connect 箭頭
    s.text(i === 3 ? s.layer(4, { to: 4 }) : g, SX + W + 16, y + H / 2, txt, note)
    if (i > 0)
      s.arrow(g, SX + W / 2, y - 9, SX + W / 2, y - 1, { stroke: C.ink, strokeWidth: 1.6 }, 6)
  })

  // 5 · client socket() + connect()
  const g5 = s.layer(5)
  s.box(g5, CX, 30, W, H, 'socket()', call, callT)
  s.line(g5, CX + W / 2, 68, CX + W / 2, 166, { stroke: C.grey, strokeWidth: 1.4, strokeLineDash: [5, 5] })
  s.box(g5, CX, 168, W, H, 'connect()', call, callT)
  s.arrow(g5, CX - 4, 186, SX + W + 6, 186, { stroke: C.orange, strokeWidth: 3 }, 12)
  s.text(g5, 450, 172, '敲門：連到 /tmp/demo.sock', { anchor: 'middle', size: 14, weight: 700, color: C.orangeDark })
  s.pill(g5, SX, 212, W, 26, 'accept() → fd 4', C.orange, C.navy, 13)
  s.text(g5, SX + W + 16, 225, '新的 fd 專門服務這位；fd 3 繼續等下一位', note)

  // 6 · 雙向收送
  const g6 = s.layer(6)
  s.arrow(g6, SX + W + 6, 262, CX - 6, 262, { stroke: C.navy, strokeWidth: 2 }, 10)
  s.arrow(g6, CX - 6, 284, SX + W + 6, 284, { stroke: C.navy, strokeWidth: 2 }, 10)
  s.text(g6, 450, 251, 'write(fd 4, "hello")  →  read()', { anchor: 'middle', size: 13, font: MONO, color: C.navy })
  s.text(g6, 450, 273, 'read()  ←  write(fd, "hi")', { anchor: 'middle', size: 13, font: MONO, color: C.navy })

  // 7 · close
  const g7 = s.layer(7)
  s.box(g7, SX, 296, W, 30, 'close()', { stroke: C.grey, strokeWidth: 1.6 }, { font: MONO, size: 14, color: C.grey })
  s.box(g7, CX, 296, W, 30, 'close()', { stroke: C.grey, strokeWidth: 1.6 }, { font: MONO, size: 14, color: C.grey })
  s.text(g7, 450, 311, '掛電話：對方 read() 拿到 0（EOF）', { anchor: 'middle', size: 13, color: C.grey, italic: true })
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 330" class="w-full" />
</template>
