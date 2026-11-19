<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// 問題：545 個使用者各自送 RUM，進了 _rumdata 後 ip 欄位只剩 Traefik 一個值。
const svg = ref<SVGSVGElement>()

useRoughScene(svg, (s) => {
  const users = ['usr_id #1', 'usr_id #2', 'usr_id #3', '… #545']
  const ys = [40, 105, 170, 235]

  // 0 · 使用者們（各有自己的外部 IP）
  const g0 = s.layer(0)
  users.forEach((u, i) => {
    s.box(g0, 10, ys[i], 150, 46, u, { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }, { color: C.navy, size: 15, font: MONO })
  })
  s.text(g0, 85, 305, '各自不同的外部 IP', { anchor: 'middle', size: 14, color: C.grey, italic: true })

  // 1 · 全部經過 Traefik
  const g1 = s.layer(1)
  ys.forEach((y) => {
    s.arrow(g1, 166, y + 23, 318, 155, { stroke: C.ink, strokeWidth: 1.8 }, 10)
  })
  s.box(g1, 325, 115, 170, 80, 'Traefik\n192.168.99.11', { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2.5 }, { color: C.navy, size: 17 })
  s.text(g1, 410, 220, '代理 /rum/v1/pi_prod/', { anchor: 'middle', size: 13, color: C.grey, font: MONO })

  // 2 · 進到 OpenObserve，ip 全是同一個
  const g2 = s.layer(2)
  s.arrow(g2, 500, 155, 575, 155, { stroke: C.ink, strokeWidth: 2 }, 10)
  s.rect(g2, 582, 30, 308, 250, { fill: C.white, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2.2 })
  s.text(g2, 736, 55, 'OpenObserve · _rumdata', { anchor: 'middle', size: 16, weight: 700, color: C.navy })
  s.line(g2, 595, 75, 878, 75, { stroke: C.blueLight, strokeWidth: 1.4 })
  for (let i = 0; i < 4; i++) {
    const y = 100 + i * 34
    s.text(g2, 600, y, `usr_id #${i < 3 ? i + 1 : 545}`, { size: 13, color: C.grey, font: MONO })
    s.text(g2, 720, y, 'ip = 192.168.99.11', { size: 14, color: C.red, font: MONO, weight: 700 })
  }
  s.text(g2, 736, 250, 'geo（country / city）欄位：無', { anchor: 'middle', size: 14, color: C.red, weight: 600 })

  // 3 · 結論
  const g3 = s.layer(3)
  s.pill(g3, 200, 290, 500, 36, '134,388 筆 · 545 usr_id · ip 只有 1 個值', C.orange, C.navy, 15)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 330" class="w-full" />
</template>
