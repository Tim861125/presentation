<script setup lang="ts">
import { ref } from 'vue'
import { C, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// 問題頁：開發週期的三個時間點，各自卡在哪裡；每 click 揭露一個痛點與對應的 skill。
const svg = ref<SVGSVGElement>()

const X = [20, 315, 610]
const W = 270
const moments = ['要寫新功能', '專案要交接', '要發新版本']
const contexts = ['「解析 CHANGELOG.md」', 'git clone 下來的新人', 'v1.0.40 → v1.0.41']
const pains = ['直接自己刻\n其實早有現成套件', 'README 只有 3 段指令\n看不出專案在做什麼', '20 個 commit 訊息\n不等於 release note']
const skills = ['search-first', 'create-readme', 'changelog-generator']

useRoughScene(svg, (s) => {
  const g0 = s.layer(0)
  moments.forEach((m, i) => {
    s.box(g0, X[i], 16, W, 62, m, { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }, { color: C.navy, size: 20 })
    s.text(g0, X[i] + W / 2, 98, contexts[i], { anchor: 'middle', size: 14, color: C.grey, italic: true })
  })

  pains.forEach((p, i) => {
    const g = s.layer(i + 1)
    const cx = X[i] + W / 2
    s.arrow(g, cx, 114, cx, 146, { stroke: C.ink, strokeWidth: 2 }, 9)
    s.box(g, X[i] + 10, 152, W - 20, 78, p, { stroke: C.red, strokeWidth: 2 }, { color: C.red, size: 16 })
    s.text(g, X[i] + W - 4, 158, '✗', { anchor: 'middle', size: 26, weight: 800, color: C.red })
    const gs = s.layer(i + 1, { delay: 500 })
    s.arrow(gs, cx, 238, cx, 266, { stroke: C.orange, strokeWidth: 2.4 }, 9)
    s.pill(gs, X[i] + 25, 272, W - 50, 36, skills[i], C.orange, C.navy, 16)
  })
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 320" class="w-full" />
</template>
