<script setup lang="ts">
import { ref } from 'vue'
import { C, useRoughScene } from '../utils/rough-scene'

// 通用手繪流程圖：每按一次 click 畫出下一個方塊（＋箭頭），最後一 click 畫出結論 pill。
// 第 1 個方塊在 step 0 就出現，所以 slide frontmatter 設 `clicks: steps.length - 1 + (result ? 1 : 0)`。
const props = defineProps<{
  /** 方塊標題，可用 \n 斷行；建議 3–5 個 */
  steps: string[]
  /** 方塊下方的灰色斜體小註解（與 steps 同長，可省略） */
  notes?: string[]
  /** 最後一 click 出現的橘色結論 */
  result?: string
}>()

const svg = ref<SVGSVGElement>()
const VW = 900
const GAP = 46

useRoughScene(svg, (s) => {
  const n = props.steps.length
  const W = (VW - 20 - GAP * (n - 1)) / n
  props.steps.forEach((label, i) => {
    const x = 10 + i * (W + GAP)
    const g = s.layer(i)
    s.box(g, x, 40, W, 90, label, { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }, { color: C.navy, size: 18 })
    if (props.notes?.[i])
      s.text(g, x + W / 2, 160, props.notes[i], { anchor: 'middle', size: 13, color: C.grey, italic: true })
    if (i > 0)
      s.arrow(g, x - GAP + 6, 85, x - 6, 85, { stroke: C.ink, strokeWidth: 2 }, 10)
  })
  if (props.result) {
    const g = s.layer(n)
    s.path(g, `M20 205 Q${VW / 2} 225 ${VW - 20} 205`, { stroke: C.orange, strokeWidth: 3 })
    s.pill(g, VW / 2 - 200, 225, 400, 38, props.result, C.orange, C.navy, 16)
  }
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 280" class="w-full" />
</template>
