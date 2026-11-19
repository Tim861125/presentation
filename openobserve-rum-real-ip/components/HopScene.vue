<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// 通用機制：每過一層代理，TCP 來源就變成上一層；真實 IP 只能靠 header 接力，任何一層覆寫就斷。
const svg = ref<SVGSVGElement>()

useRoughScene(svg, (s) => {
  const blue = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }
  const xs = [10, 240, 470, 700]
  const labels = ['使用者\n1.2.3.4', '代理 A\n10.0.0.1', '代理 B', 'App']

  // 0 · 一條代理鏈
  const g0 = s.layer(0)
  labels.forEach((l, i) => {
    s.box(g0, xs[i], 30, 190, 70, l, blue, { color: C.navy, size: 17 })
    if (i > 0)
      s.arrow(g0, xs[i] - 36, 65, xs[i] - 6, 65, { stroke: C.ink, strokeWidth: 2 }, 9)
  })

  // 1 · 代理 A：TCP 來源是使用者 → 寫入 header
  const g1 = s.layer(1)
  s.text(g1, 335, 125, 'TCP 來源 = 1.2.3.4', { anchor: 'middle', size: 13, color: C.grey, font: MONO })
  s.text(g1, 335, 150, '設 X-Real-Ip: 1.2.3.4', { anchor: 'middle', size: 14, color: C.green, font: MONO, weight: 700 })

  // 2 · 代理 B 信任 A：保留 header
  const g2 = s.layer(2, { to: 2 })
  s.text(g2, 565, 125, 'TCP 來源 = 10.0.0.1', { anchor: 'middle', size: 13, color: C.grey, font: MONO })
  s.text(g2, 565, 150, '信任 A → 保留', { anchor: 'middle', size: 14, color: C.green, weight: 700 })
  s.text(g2, 565, 172, 'X-Real-Ip: 1.2.3.4', { anchor: 'middle', size: 14, color: C.green, font: MONO, weight: 700 })
  s.text(g2, 795, 150, '看到 1.2.3.4', { anchor: 'middle', size: 15, color: C.green, weight: 700 })

  // 3 · 代理 B 不信任 A：覆寫 header
  const g3 = s.layer(3)
  s.text(g3, 565, 125, 'TCP 來源 = 10.0.0.1', { anchor: 'middle', size: 13, color: C.grey, font: MONO })
  s.text(g3, 565, 150, '不信任 A → 覆寫', { anchor: 'middle', size: 14, color: C.red, weight: 700 })
  s.text(g3, 565, 172, 'X-Real-Ip: 10.0.0.1', { anchor: 'middle', size: 14, color: C.red, font: MONO, weight: 700 })
  s.text(g3, 795, 150, '看到 10.0.0.1', { anchor: 'middle', size: 15, color: C.red, weight: 700 })
  s.line(g3, 430, 50, 460, 82, { stroke: C.red, strokeWidth: 3.5 })
  s.line(g3, 460, 50, 430, 82, { stroke: C.red, strokeWidth: 3.5 })

  // 4 · 結論
  const g4 = s.layer(4)
  s.rect(g4, 60, 215, 780, 92, { fill: C.paper, fillStyle: 'solid', stroke: C.orange, strokeWidth: 2 })
  s.text(g4, 450, 245, 'X-Real-Ip ＝「最後一層代理看到的直接連線者」', { anchor: 'middle', size: 18, color: C.navy, weight: 700 })
  s.text(g4, 450, 280, '只有整條鏈都互相信任，它才會等於使用者本人', { anchor: 'middle', size: 16, color: C.ink })
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 320" class="w-full" />
</template>
