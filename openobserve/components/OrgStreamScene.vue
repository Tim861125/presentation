<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from '../utils/rough-scene'

// 組織 → 串流：每個組織有自己的一組串流，組織之間互相隔離。
const svg = ref<SVGSVGElement>()

const orgs = [
  { x: 10, name: 'pi_dev', note: '測試站' },
  { x: 480, name: 'pi_prod', note: '正式站' },
]
const W = 410
const streams: [string, string][] = [
  ['logs', 'default'],
  ['traces', 'default'],
  ['logs', '_rumdata'],
  ['logs', '_sessionreplay'],
]

useRoughScene(svg, (s) => {
  const g0 = s.layer(0)
  orgs.forEach((o) => {
    s.rect(g0, o.x, 10, W, 250, { stroke: C.navy, strokeWidth: 2.2 })
    s.text(g0, o.x + 18, 36, `組織 ${o.name}`, { size: 19, weight: 700, color: C.navy })
    s.text(g0, o.x + W - 18, 36, o.note, { anchor: 'end', size: 15, color: C.grey, italic: true })
  })

  const g1 = s.layer(1)
  orgs.forEach((o) => {
    streams.forEach(([type, name], i) => {
      const y = 62 + i * 48
      s.rect(g1, o.x + 18, y, W - 36, 38, { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 1.8 })
      s.text(g1, o.x + 34, y + 20, type, { size: 14, color: C.grey, weight: 700, font: MONO })
      s.text(g1, o.x + 120, y + 20, name, { size: 16, color: C.navy, weight: 700, font: MONO })
    })
  })

  const g2 = s.layer(2)
  s.line(g2, 445, 0, 445, 270, { stroke: C.red, strokeWidth: 3, strokeLineDash: [10, 8] })
  s.text(g2, 450, 296, '組織之間完全隔離：串流、儀表板、告警、權限都不共用', { anchor: 'middle', size: 18, weight: 600, color: C.red })
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 315" class="w-full" />
</template>
