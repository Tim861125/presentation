<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// 直式：image 是一疊唯讀 layer，每個容器在上面加一層可寫層。
const svg = ref<SVGSVGElement>()

const ro = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 1.8 }
const rw = { fill: '#fff3d6', fillStyle: 'solid', stroke: C.orange, strokeWidth: 2.2 }

useRoughScene(svg, (s) => {
  // layer 0：image 由下往上疊
  const g0 = s.layer(0, { duration: 1100 })
  const rows: [number, string][] = [[320, 'FROM alpine'], [276, 'RUN apk add curl'], [232, 'COPY app /app']]
  rows.forEach(([y, label]) => s.box(g0, 100, y, 400, 38, label, ro, { color: C.navy, size: 17, font: MONO }))
  s.text(g0, 300, 384, 'image：唯讀、大家共用', { anchor: 'middle', size: 19, weight: 800, color: C.blue })

  // layer 1：兩個容器各一層可寫層
  const g1 = s.layer(1)
  s.box(g1, 100, 162, 190, 46, '可寫層 A', rw, { color: C.navy, size: 17 })
  s.box(g1, 310, 162, 190, 46, '可寫層 B', rw, { color: C.navy, size: 17 })
  s.text(g1, 195, 144, '容器 A', { anchor: 'middle', size: 17, weight: 700, color: C.orangeDark })
  s.text(g1, 405, 144, '容器 B', { anchor: 'middle', size: 17, weight: 700, color: C.orangeDark })

  // layer 2：copy-on-write
  const g2 = s.layer(2)
  s.curve(g2, 92, 340, 92, 186, -50, { stroke: C.orange, strokeWidth: 2.6 }, 10)
  s.text(g2, 300, 70, '改 /etc/hosts → 才 copy_up 上來', { anchor: 'middle', size: 17, weight: 700, color: C.orangeDark })

  // layer 3：刪容器 A
  const g3 = s.layer(3)
  s.line(g3, 96, 158, 294, 212, { stroke: C.red, strokeWidth: 3 })
  s.line(g3, 294, 158, 96, 212, { stroke: C.red, strokeWidth: 3 })
  s.text(g3, 300, 108, 'docker rm A → 可寫層跟著消失', { anchor: 'middle', size: 17, weight: 700, color: C.red })
  s.pill(g3, 70, 426, 460, 40, '要留資料 → volume / bind mount', C.orange, C.navy, 16)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 600 480" class="vscene" />
</template>
