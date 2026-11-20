<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// 問題：兩個 process 記憶體互相隔離 → 用檔案傳話要一直輪詢 → socket 給一條雙向通道。
const svg = ref<SVGSVGElement>()
const proc = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }

useRoughScene(svg, (s) => {
  // 0 · 兩個各自隔離的程式
  const g0 = s.layer(0)
  s.box(g0, 30, 40, 240, 120, '程式 A\nPID 101', proc, { color: C.navy, size: 20 })
  s.box(g0, 630, 40, 240, 120, '程式 B\nPID 202', proc, { color: C.navy, size: 20 })
  s.text(g0, 150, 182, '自己的記憶體', { anchor: 'middle', size: 13, color: C.grey, italic: true })
  s.text(g0, 750, 182, '自己的記憶體', { anchor: 'middle', size: 13, color: C.grey, italic: true })

  // 1 · 用共用檔案傳話：要一直輪詢
  const g1 = s.layer(1, { to: 1 })
  s.box(g1, 375, 60, 150, 70, '/tmp/msg.txt', { fill: C.white, fillStyle: 'solid', stroke: C.grey, strokeWidth: 1.6 }, { font: MONO, size: 14, color: C.ink })
  s.arrow(g1, 275, 95, 368, 95, { stroke: C.ink, strokeWidth: 2 }, 10)
  s.text(g1, 320, 78, 'write', { anchor: 'middle', size: 13, font: MONO, color: C.grey })
  s.curve(g1, 625, 80, 530, 80, -40, { stroke: C.red, strokeWidth: 2, strokeLineDash: [6, 5] }, 10)
  s.curve(g1, 530, 115, 625, 115, -40, { stroke: C.red, strokeWidth: 2, strokeLineDash: [6, 5] }, 10)
  s.text(g1, 450, 205, '✗ 有新訊息了嗎？一直問、一直讀，誰先寫誰後寫還會打架', { anchor: 'middle', size: 16, weight: 700, color: C.red })

  // 2 · socket：kernel 接好的雙向通道
  const g2 = s.layer(2)
  s.line(g2, 275, 90, 625, 90, { stroke: C.orange, strokeWidth: 4 })
  s.line(g2, 275, 112, 625, 112, { stroke: C.orange, strokeWidth: 4 })
  s.circle(g2, 280, 101, 22, { fill: C.orange, fillStyle: 'solid', stroke: C.orangeDark })
  s.circle(g2, 620, 101, 22, { fill: C.orange, fillStyle: 'solid', stroke: C.orangeDark })
  s.text(g2, 450, 140, 'socket（雙向）', { anchor: 'middle', size: 15, weight: 700, color: C.orangeDark })
  const msg = s.mover([[2, 0, 0], [3, 230, 0]], g2)
  s.pill(msg, 300, 52, 90, 28, '"hi"', C.white, C.navy, 14)

  // 3 · 結論
  const g3 = s.layer(3)
  s.path(g3, 'M40 235 Q450 255 860 235', { stroke: C.orange, strokeWidth: 3 })
  s.pill(g3, 190, 255, 520, 38, '有人在聽、資料一來就收到：這就是 socket', C.orange, C.navy, 16)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 310" class="w-full" />
</template>
