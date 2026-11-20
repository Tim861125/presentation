<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// kiri 3000：本機主動連出一條 TLS 到 edge，所有訪客連線都是這條線上的編號 stream。
const svg = ref<SVGSVGElement>()

const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }
const TY1 = 128
const TY2 = 172

useRoughScene(svg, (s) => {
  // layer 0：你的電腦，app 在 :3000
  const g0 = s.layer(0)
  s.rect(g0, 520, 30, 370, 230, { stroke: C.greyLight, strokeWidth: 1.4, strokeLineDash: [6, 6], roughness: 0.6 })
  s.text(g0, 534, 50, '你的電腦（在 NAT 後面也行）', { size: 13, weight: 700, color: C.grey })
  s.box(g0, 740, 110, 130, 80, 'app\n:3000', box, { color: C.navy, size: 16 })

  // layer 1：kiri 3000 往外連一條 TLS 到 edge
  const g1 = s.layer(1)
  s.box(g1, 560, 110, 130, 80, 'kiri 3000', box, { color: C.navy, size: 16, font: MONO })
  s.box(g1, 250, 95, 170, 110, 'Share edge\n*.runkiri.cloud', { fill: C.navy, fillStyle: 'solid', stroke: C.navy }, { color: C.white, size: 15 })
  s.line(g1, 424, TY1, 556, TY1, { stroke: C.orange, strokeWidth: 2.6 })
  s.line(g1, 424, TY2, 556, TY2, { stroke: C.orange, strokeWidth: 2.6 })
  s.text(g1, 490, 228, '一條 TLS 連線（由本機連出）', { anchor: 'middle', size: 13, color: C.orangeDark, weight: 700 })

  // layer 2：訪客打公開網址
  const g2 = s.layer(2)
  ;['訪客 A', '訪客 B', '訪客 C'].forEach((v, i) => {
    const y = 60 + i * 70
    s.box(g2, 10, y, 140, 46, v, { stroke: C.grey, strokeWidth: 1.6 }, { color: C.ink, size: 15 })
    s.arrow(g2, 154, y + 23, 246, 150, { stroke: C.ink, strokeWidth: 1.5 }, 8)
  })
  s.text(g2, 80, 290, 'https://demo.runkiri.cloud', { anchor: 'start', size: 13, font: MONO, color: C.grey })

  // layer 3：多工 stream 進 tunnel，再交給 app
  const g3 = s.layer(3)
  ;[138, 150, 162].forEach((y, i) => {
    s.line(g3, 430, y, 552, y, { stroke: C.blue, strokeWidth: 1.4, roughness: 0.6 })
    if (i === 0)
      s.text(g3, 490, 100, 'stream #1 #2 #3', { anchor: 'middle', size: 13, font: MONO, color: C.blue, weight: 700 })
  })
  s.arrow(g3, 694, 150, 736, 150, { stroke: C.blue, strokeWidth: 2 }, 9)

  // layer 4：注意事項
  const g4 = s.layer(4)
  s.pill(g4, 380, 280, 500, 36, '訪客先看到警告頁 · edge 不開源', C.orange, C.navy, 15)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 330" class="w-full" />
</template>
