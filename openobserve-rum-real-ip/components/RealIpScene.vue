<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// OpenObserve（main 分支）決定 RUM ip 的流程：依序試 header → 退回 TCP 對端 → RealIp → ip + MaxMind geo。
const svg = ref<SVGSVGElement>()

useRoughScene(svg, (s) => {
  const blue = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }
  const srcs = ['XEnvoyExternal\nAddress', 'XRealIp', 'RightmostX\nForwardedFor']
  const W = 170
  const xs = [10, 235, 460]

  // 0 · ZO_HTTP_REAL_IP_SOURCE 預設的三個 header 來源
  const g0 = s.layer(0)
  s.text(g0, 10, 20, 'ZO_HTTP_REAL_IP_SOURCE 預設（依序嘗試）', { size: 15, color: C.blue, weight: 700 })
  srcs.forEach((label, i) => {
    s.box(g0, xs[i], 40, W, 70, label, blue, { color: C.navy, size: 15, font: MONO })
    if (i > 0) {
      s.arrow(g0, xs[i] - 50, 75, xs[i] - 6, 75, { stroke: C.grey, strokeWidth: 1.8 }, 9)
      s.text(g0, xs[i] - 28, 58, '失敗', { anchor: 'middle', size: 12, color: C.grey })
    }
  })

  // 1 · 第一個成功者勝
  const g1 = s.layer(1)
  xs.forEach((x) => {
    s.line(g1, x + W / 2, 116, x + W / 2, 150, { stroke: C.green, strokeWidth: 2 })
  })
  s.line(g1, xs[0] + W / 2, 150, 435, 150, { stroke: C.green, strokeWidth: 2 })
  s.line(g1, xs[2] + W / 2, 150, 465, 150, { stroke: C.green, strokeWidth: 2 })
  s.arrow(g1, 450, 150, 450, 188, { stroke: C.green, strokeWidth: 2.2 }, 10)
  s.text(g1, 120, 170, '第一個成功者勝', { anchor: 'middle', size: 14, color: C.green, weight: 700 })

  // 2 · 都失敗 → 隱含退回 TCP 對端
  const g2 = s.layer(2)
  s.arrow(g2, 635, 75, 683, 75, { stroke: C.grey, strokeWidth: 1.8 }, 9)
  s.text(g2, 659, 58, '失敗', { anchor: 'middle', size: 12, color: C.grey })
  s.box(g2, 690, 40, 200, 70, 'ConnectInfo\n(TCP 對端)', { fill: C.paper, fillStyle: 'solid', stroke: C.grey, strokeWidth: 2, strokeLineDash: [7, 5] }, { color: C.ink, size: 15 })
  s.text(g2, 790, 128, '隱含 fallback', { anchor: 'middle', size: 13, color: C.grey, italic: true })
  s.path(g2, 'M790 140 Q790 205 545 210', { stroke: C.grey, strokeWidth: 1.8 })
  s.arrow(g2, 560, 210, 545, 210, { stroke: C.grey, strokeWidth: 1.8 }, 9)

  // 3 · RealIp → _rumdata.ip
  const g3 = s.layer(3)
  s.pill(g3, 365, 192, 170, 36, 'RealIp', C.orange, C.navy, 16)
  s.arrow(g3, 360, 210, 255, 210, { stroke: C.ink, strokeWidth: 2 }, 10)
  s.box(g3, 70, 185, 180, 50, '_rumdata.ip', blue, { color: C.navy, size: 16, font: MONO })

  // 4 · 拿同一個 IP 查 MaxMind geo
  const g4 = s.layer(4)
  s.arrow(g4, 160, 240, 160, 268, { stroke: C.ink, strokeWidth: 2 }, 9)
  s.box(g4, 70, 272, 180, 46, 'MaxMind → geo_info', blue, { color: C.navy, size: 14 })
  s.text(g4, 270, 287, 'country / city 也由這個 IP 查出', { size: 14, color: C.ink })
  s.text(g4, 270, 308, '→ ip 是內網位址時，geo 查不到（由原始碼推得）', { size: 14, color: C.blue, weight: 600 })
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 330" class="w-full" />
</template>
