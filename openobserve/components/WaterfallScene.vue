<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// 一次慢的 GetPatentByText：span 樹一層層畫出來，最後標出時間幾乎全花在 OpenSearch kNN。
const svg = ref<SVGSVGElement>()

const X0 = 340
const PX = 540 / 32 // 32 秒畫滿 540px
const rows = [
  { name: 'POST /api/Search/GetPatentByText', depth: 0, t0: 0, t1: 32.0, layer: 0 },
  { name: 'search.by_text', depth: 1, t0: 0.05, t1: 31.95, layer: 1 },
  { name: 'search.embed', depth: 2, t0: 0.08, t1: 0.38, layer: 2 },
  { name: 'POST …/embeddings', depth: 3, t0: 0.1, t1: 0.35, layer: 2 },
  { name: 'search.knn', depth: 2, t0: 0.42, t1: 31.9, layer: 3 },
  { name: 'POST …:9200/_search', depth: 3, t0: 0.45, t1: 31.85, layer: 3 },
]
const Y0 = 44
const RH = 38

useRoughScene(svg, (s) => {
  const g0 = s.layer(0)
  s.text(g0, 10, 18, 'span（縮排 = 子步驟）', { size: 14, weight: 700, color: C.grey })
  s.text(g0, X0, 18, '時間 →', { size: 14, weight: 700, color: C.grey })
  s.line(g0, 10, 32, 890, 32, { stroke: C.greyLight, strokeWidth: 1.2, roughness: 0.5 })

  rows.forEach((r, i) => {
    const g = s.layer(r.layer)
    const y = Y0 + i * RH
    s.text(g, 10 + r.depth * 18, y + 13, r.name, { size: 13, weight: 700, color: C.navy, font: MONO })
    const x = X0 + r.t0 * PX
    const w = Math.max(10, (r.t1 - r.t0) * PX)
    s.rect(g, x, y, w, 26, { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 1.6 })
    const dur = `${(r.t1 - r.t0).toFixed(r.t1 - r.t0 < 1 ? 2 : 1)} s`
    if (w > 80)
      s.text(g, x + w - 8, y + 14, dur, { anchor: 'end', size: 13, weight: 700, color: C.navy, font: MONO })
    else
      s.text(g, x + w + 8, y + 14, dur, { size: 13, weight: 700, color: C.navy, font: MONO })
  })

  const g4 = s.layer(4)
  const y5 = Y0 + 5 * RH
  s.rect(g4, X0 + 0.45 * PX - 4, Y0 + 4 * RH - 5, (31.85 - 0.45) * PX + 8, 2 * RH + 2, { stroke: C.orange, strokeWidth: 3 })
  s.pill(g4, 300, y5 + 50, 360, 34, '橫條最長 = 慢在 OpenSearch kNN', C.orange, C.navy, 15)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 320" class="w-full" />
</template>
