<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// 對照組：同一個瀏覽器，RUM 路記到 Traefik IP；API 路（Nuxt OTel）記到真實 IP。
const svg = ref<SVGSVGElement>()

useRoughScene(svg, (s) => {
  const blue = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }

  // 0 · 瀏覽器
  const g0 = s.layer(0)
  s.box(g0, 10, 115, 130, 70, '瀏覽器\n快檢通', blue, { color: C.navy, size: 17 })

  // 1 · RUM 路
  const g1 = s.layer(1)
  s.text(g1, 175, 30, 'RUM：POST /rum/v1/pi_prod/', { size: 14, color: C.blue, font: MONO, weight: 700 })
  s.arrow(g1, 145, 130, 245, 75, { stroke: C.ink, strokeWidth: 2 }, 10)
  s.box(g1, 250, 45, 150, 60, 'Traefik', blue, { color: C.navy, size: 17 })
  s.line(g1, 405, 75, 470, 75, { stroke: C.grey, strokeWidth: 2, strokeLineDash: [6, 6] })
  s.text(g1, 437, 55, '?', { anchor: 'middle', size: 18, color: C.orangeDark, weight: 700 })
  s.arrow(g1, 470, 75, 515, 75, { stroke: C.ink, strokeWidth: 2 }, 10)
  s.box(g1, 520, 45, 150, 60, 'OpenObserve', blue, { color: C.navy, size: 17 })

  // 2 · RUM 結果
  const g2 = s.layer(2)
  s.text(g2, 690, 62, '_rumdata.ip', { size: 14, color: C.grey, font: MONO })
  s.text(g2, 690, 88, '192.168.99.11', { size: 17, color: C.red, font: MONO, weight: 700 })

  // 3 · API 路
  const g3 = s.layer(3)
  s.text(g3, 175, 270, 'API：/api/Search/…', { size: 14, color: C.blue, font: MONO, weight: 700 })
  s.arrow(g3, 145, 170, 245, 225, { stroke: C.ink, strokeWidth: 2 }, 10)
  s.box(g3, 250, 195, 150, 60, 'Nuxt 後端\n(OTel span)', blue, { color: C.navy, size: 15 })
  s.arrow(g3, 405, 225, 515, 225, { stroke: C.ink, strokeWidth: 2 }, 10)
  s.box(g3, 520, 195, 150, 60, 'OpenObserve', blue, { color: C.navy, size: 17 })
  s.text(g3, 460, 255, 'OTLP', { anchor: 'middle', size: 12, color: C.grey, font: MONO })

  // 4 · API 結果
  const g4 = s.layer(4)
  s.text(g4, 690, 200, 'traces.client_address', { size: 14, color: C.grey, font: MONO })
  s.text(g4, 690, 226, '60.251.214.112 …', { size: 17, color: C.green, font: MONO, weight: 700 })
  s.text(g4, 690, 252, 'network_peer_address', { size: 12, color: C.grey, font: MONO })
  s.text(g4, 690, 270, '10.42.93.150', { size: 13, color: C.grey, font: MONO })

  // 5 · 結論
  const g5 = s.layer(5)
  s.pill(g5, 220, 295, 460, 32, '真實 IP 只在 RUM 這條路上遺失', C.orange, C.navy, 15)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 330" class="w-full" />
</template>
