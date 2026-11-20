<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// 兩大家族：network socket（IP + port，可跨機器） vs Unix domain socket（檔案路徑，同一台機器）
const svg = ref<SVGSVGElement>()
const proc = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }
const host = { stroke: C.navy, strokeWidth: 2 }

useRoughScene(svg, (s) => {
  const g0 = s.layer(0)
  s.text(g0, 220, 18, 'Network socket  ·  AF_INET / AF_INET6', { anchor: 'middle', size: 16, weight: 700, color: C.blue })
  s.text(g0, 680, 18, 'Unix domain socket  ·  AF_UNIX', { anchor: 'middle', size: 16, weight: 700, color: C.blue })
  s.line(g0, 450, 10, 450, 310, { stroke: C.greyLight, strokeWidth: 1.5, strokeLineDash: [6, 6] })

  // 1 · 兩台機器，位址 = IP + port
  const g1 = s.layer(1)
  s.rect(g1, 10, 50, 170, 180, host)
  s.rect(g1, 260, 50, 170, 180, host)
  s.text(g1, 95, 72, '機器 A', { anchor: 'middle', size: 14, weight: 700, color: C.navy })
  s.text(g1, 345, 72, '機器 B', { anchor: 'middle', size: 14, weight: 700, color: C.navy })
  s.box(g1, 30, 95, 130, 60, 'client', proc, { color: C.navy, size: 17 })
  s.box(g1, 280, 95, 130, 60, 'server', proc, { color: C.navy, size: 17 })
  s.pill(g1, 270, 172, 150, 30, '10.0.0.2:9000', C.orange, C.navy, 13)
  s.arrow(g1, 162, 125, 276, 125, { stroke: C.ink, strokeWidth: 2 }, 10)
  s.text(g1, 220, 108, '網路', { anchor: 'middle', size: 13, color: C.grey, italic: true })
  s.text(g1, 220, 265, '位址 = IP + port，可以跨機器', { anchor: 'middle', size: 15, weight: 700, color: C.navy })
  s.text(g1, 220, 292, '門禁靠防火牆 / 應用層驗證', { anchor: 'middle', size: 13, color: C.grey, italic: true })

  // 2 · 一台機器，位址 = 檔案路徑
  const g2 = s.layer(2)
  s.rect(g2, 470, 50, 420, 180, host)
  s.text(g2, 680, 72, '同一台機器', { anchor: 'middle', size: 14, weight: 700, color: C.navy })
  s.box(g2, 490, 95, 120, 60, 'client', proc, { color: C.navy, size: 17 })
  s.box(g2, 750, 95, 120, 60, 'server', proc, { color: C.navy, size: 17 })
  s.pill(g2, 615, 172, 130, 30, '/tmp/demo.sock', C.orange, C.navy, 13)
  s.arrow(g2, 612, 125, 746, 125, { stroke: C.ink, strokeWidth: 2 }, 10)
  s.text(g2, 680, 108, 'kernel 內部', { anchor: 'middle', size: 13, color: C.grey, italic: true })
  s.text(g2, 680, 265, '位址 = 檔案路徑，只限本機、更快', { anchor: 'middle', size: 15, weight: 700, color: C.navy })
  s.text(g2, 680, 292, '門禁靠檔案權限（rwx）', { anchor: 'middle', size: 13, color: C.grey, italic: true })
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 315" class="w-full" />
</template>
