<script setup lang="ts">
import { ref } from 'vue'
import { C, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// search-first 流程：Need → 平行搜尋四個管道 → Evaluate → 四種決策；最後圈出本例的決定。
const svg = ref<SVGSVGElement>()

const channels = ['repo · rg\n沒有現成 parser', 'npm\nkeep-a-changelog 等', 'MCP / skills\n只有產生端', 'GitHub\ngh 未登入 → 跳過']
const CY = [15, 88, 161, 234]
const decisions = ['Adopt · 直接裝', 'Extend · 薄包一層', 'Compose · 組 2–3 個', 'Build · 自己寫']
const DY = [15, 80, 145, 210]

useRoughScene(svg, (s) => {
  const g0 = s.layer(0)
  s.box(g0, 10, 115, 150, 86, 'Need\n解析 CHANGELOG', { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }, { color: C.navy, size: 16 })
  s.text(g0, 85, 226, 'preflight 先查管道', { anchor: 'middle', size: 13, color: C.grey, italic: true })

  const g1 = s.layer(1)
  channels.forEach((c, i) => {
    const skipped = i === 3
    s.box(g1, 205, CY[i], 205, 62, c, { fill: C.white, fillStyle: 'solid', stroke: skipped ? C.red : C.blue, strokeWidth: 1.8 }, { color: skipped ? C.red : C.navy, size: 14 })
    s.arrow(g1, 164, 158, 199, CY[i] + 31, { stroke: C.ink, strokeWidth: 1.4 }, 8)
  })

  const g2 = s.layer(2)
  s.box(g2, 460, 108, 140, 100, 'Evaluate\n功能 · 維護\n授權 · 相依', { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }, { color: C.navy, size: 15 })
  CY.forEach(y => s.arrow(g2, 414, y + 31, 454, 158, { stroke: C.ink, strokeWidth: 1.4 }, 8))

  const g3 = s.layer(3)
  decisions.forEach((d, i) => {
    s.box(g3, 670, DY[i], 220, 48, d, { stroke: C.grey, strokeWidth: 1.6 }, { color: C.ink, size: 15 })
    s.arrow(g3, 604, 158, 664, DY[i] + 24, { stroke: C.grey, strokeWidth: 1.3 }, 8)
  })

  const g4 = s.layer(4)
  s.ellipse(g4, 780, 234, 250, 72, { stroke: C.orange, strokeWidth: 3 })
  s.pill(g4, 520, 280, 370, 34, 'BUILD：54 行 parser + 測試', C.orange, C.navy, 15)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 320" class="w-full" />
</template>
