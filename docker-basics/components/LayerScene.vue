<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// image = 一疊唯讀 layer；每個容器在上面加一層自己的可寫層。
const svg = ref<SVGSVGElement>()

const ro = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 1.8 }
const rw = { fill: '#fff3d6', fillStyle: 'solid', stroke: C.orange, strokeWidth: 2.2 }
const note = { size: 15, color: C.navy, weight: 600 }

useRoughScene(svg, (s) => {
  // layer 0：image 由下往上疊
  const g0 = s.layer(0, { duration: 1100 })
  const rows: [number, string][] = [[230, 'FROM alpine（基底檔案系統）'], [192, 'RUN apk add curl'], [154, 'COPY app /app']]
  rows.forEach(([y, label]) => s.box(g0, 250, y, 400, 34, label, ro, { color: C.navy, size: 14, font: MONO }))
  s.text(g0, 236, 192, 'image', { anchor: 'end', size: 18, weight: 800, color: C.blue })
  s.text(g0, 236, 216, '唯讀 · 共用', { anchor: 'end', size: 13, color: C.grey, italic: true })

  // layer 1：兩個容器，各自一層可寫層
  const g1 = s.layer(1)
  s.box(g1, 250, 100, 190, 40, '可寫層 A', rw, { color: C.navy, size: 15 })
  s.box(g1, 460, 100, 190, 40, '可寫層 B', rw, { color: C.navy, size: 15 })
  s.text(g1, 345, 82, '容器 A', { anchor: 'middle', size: 15, weight: 700, color: C.orangeDark })
  s.text(g1, 555, 82, '容器 B', { anchor: 'middle', size: 15, weight: 700, color: C.orangeDark })
  s.text(g1, 680, 120, '每個容器一層自己的', note)
  s.text(g1, 680, 142, '可寫層，image 不動', note)

  // layer 2：copy-on-write
  const g2 = s.layer(2)
  s.curve(g2, 258, 244, 258, 144, -44, { stroke: C.orange, strokeWidth: 2.4 }, 10)
  s.text(g2, 226, 112, '改 /etc/hosts', { anchor: 'end', size: 14, color: C.orangeDark, weight: 700, font: MONO })
  s.text(g2, 226, 134, '→ copy_up 上來', { anchor: 'end', size: 14, color: C.orangeDark, weight: 700 })
  s.text(g2, 680, 190, 'copy-on-write：', note)
  s.text(g2, 680, 212, '沒改的檔案不複製', note)

  // layer 3：刪容器
  const g3 = s.layer(3)
  s.line(g3, 246, 96, 444, 144, { stroke: C.red, strokeWidth: 3 })
  s.line(g3, 444, 96, 246, 144, { stroke: C.red, strokeWidth: 3 })
  s.text(g3, 680, 252, 'docker rm A：', { ...note, color: C.red })
  s.text(g3, 680, 274, '可寫層跟著消失', { ...note, color: C.red })
  s.pill(g3, 250, 286, 400, 34, '要留資料 → volume / bind mount', C.orange, C.navy, 15)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 330" class="w-full" />
</template>
