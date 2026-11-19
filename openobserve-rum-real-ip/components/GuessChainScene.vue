<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// 猜測（尚未確認）：Traefik 與 OpenObserve 之間可能還有一層 ingress，且它不信任 Traefik 而覆寫 header。
const svg = ref<SVGSVGElement>()

useRoughScene(svg, (s) => {
  const blue = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }
  const guess = { fill: '#fff8e6', fillStyle: 'solid', stroke: C.orange, strokeWidth: 2.4, strokeLineDash: [9, 6] }

  // 0 · 推測的鏈路
  const g0 = s.layer(0)
  s.box(g0, 10, 30, 150, 70, '瀏覽器\n使用者 IP', blue, { color: C.navy, size: 16 })
  s.arrow(g0, 165, 65, 205, 65, { stroke: C.ink, strokeWidth: 2 }, 9)
  s.box(g0, 210, 30, 170, 70, 'Traefik\n192.168.99.11', blue, { color: C.navy, size: 16 })
  s.arrow(g0, 385, 65, 425, 65, { stroke: C.ink, strokeWidth: 2, strokeLineDash: [6, 5] }, 9)
  s.box(g0, 430, 30, 250, 70, '另一層 ingress？\n(Traefik 或 nginx？)', guess, { color: C.orangeDark, size: 15 })
  s.text(g0, 555, 118, 'openobserve.in.twpat.com', { anchor: 'middle', size: 13, color: C.grey, font: MONO })
  s.arrow(g0, 685, 65, 725, 65, { stroke: C.ink, strokeWidth: 2, strokeLineDash: [6, 5] }, 9)
  s.box(g0, 730, 30, 160, 70, 'OpenObserve', blue, { color: C.navy, size: 17 })

  // 1 · Traefik 送出的 header（推測內容）
  const g1 = s.layer(1)
  s.text(g1, 295, 150, 'Traefik 送出（推測）', { anchor: 'middle', size: 13, color: C.grey })
  s.text(g1, 295, 175, 'X-Real-Ip: 使用者IP', { anchor: 'middle', size: 14, color: C.green, font: MONO, weight: 700 })
  s.text(g1, 295, 198, 'XFF: 使用者IP', { anchor: 'middle', size: 14, color: C.green, font: MONO, weight: 700 })

  // 2 · ingress 可能不信任 99.11 → 覆寫
  const g2 = s.layer(2)
  s.text(g2, 555, 150, '可能不信任 99.11 → 覆寫？', { anchor: 'middle', size: 13, color: C.red, weight: 700 })
  s.text(g2, 555, 175, 'X-Real-Ip: 192.168.99.11', { anchor: 'middle', size: 14, color: C.red, font: MONO, weight: 700 })
  s.text(g2, 555, 198, 'XFF: 使用者IP, 192.168.99.11', { anchor: 'middle', size: 14, color: C.red, font: MONO, weight: 700 })

  // 3 · OpenObserve 兩種讀法都可能得到 99.11
  const g3 = s.layer(3)
  s.text(g3, 810, 150, 'XRealIp → 99.11', { anchor: 'middle', size: 13, color: C.red, font: MONO, weight: 700 })
  s.text(g3, 810, 175, 'RightmostXFF', { anchor: 'middle', size: 13, color: C.red, font: MONO, weight: 700 })
  s.text(g3, 810, 196, '→ 99.11', { anchor: 'middle', size: 13, color: C.red, font: MONO, weight: 700 })

  // 4 · 標註
  const g4 = s.layer(4)
  s.rect(g4, 120, 240, 660, 70, { fill: '#fff8e6', fillStyle: 'solid', stroke: C.orange, strokeWidth: 2, strokeLineDash: [9, 6] })
  s.text(g4, 450, 262, '猜測：這條鏈路與覆寫行為都尚未確認', { anchor: 'middle', size: 17, color: C.orangeDark, weight: 700 })
  s.text(g4, 450, 290, '中間有幾層、各是什麼、header 是否保留，要問部署負責人', { anchor: 'middle', size: 14, color: C.ink })
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 320" class="w-full" />
</template>
