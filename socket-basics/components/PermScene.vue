<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// Unix socket 的門禁 = 檔案權限：srw-rw---- root docker
const svg = ref<SVGSVGElement>()
const user = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 }
const ok = { stroke: C.green, strokeWidth: 2.4 }
const bad = { stroke: C.red, strokeWidth: 2.4, strokeLineDash: [7, 5] }

useRoughScene(svg, (s) => {
  // 0 · socket 檔與權限
  const g0 = s.layer(0)
  s.rect(g0, 330, 70, 270, 130, { fill: C.white, fillStyle: 'solid', stroke: C.navy, strokeWidth: 2.2 })
  s.text(g0, 465, 95, '/var/run/docker.sock', { anchor: 'middle', size: 14, font: MONO, weight: 700, color: C.navy })
  s.text(g0, 352, 135, 's', { size: 24, font: MONO, weight: 700, color: C.orangeDark })
  s.text(g0, 372, 135, 'rw-', { size: 24, font: MONO, weight: 700, color: C.green })
  s.text(g0, 425, 135, 'rw-', { size: 24, font: MONO, weight: 700, color: C.green })
  s.text(g0, 478, 135, '---', { size: 24, font: MONO, weight: 700, color: C.red })
  s.text(g0, 535, 135, 'root', { size: 14, font: MONO, color: C.ink })
  s.text(g0, 535, 155, 'docker', { size: 14, font: MONO, color: C.ink })
  s.text(g0, 395, 168, 'owner', { anchor: 'middle', size: 12, color: C.grey, italic: true })
  s.text(g0, 448, 168, 'group', { anchor: 'middle', size: 12, color: C.grey, italic: true })
  s.text(g0, 501, 168, 'others', { anchor: 'middle', size: 12, color: C.grey, italic: true })
  s.text(g0, 465, 188, 'connect 需要 w 權限', { anchor: 'middle', size: 12, color: C.grey, italic: true })

  // 1 · root
  const g1 = s.layer(1)
  s.box(g1, 20, 30, 170, 50, 'root', user, { color: C.navy, size: 16, font: MONO })
  s.arrow(g1, 195, 60, 325, 110, ok, 10)
  s.text(g1, 262, 68, '✓', { anchor: 'middle', size: 20, weight: 700, color: C.green })

  // 2 · docker 群組成員 ✓，其他人 ✗
  const g2 = s.layer(2)
  s.box(g2, 20, 110, 170, 50, 'alice ∈ docker', user, { color: C.navy, size: 15, font: MONO })
  s.arrow(g2, 195, 135, 325, 135, ok, 10)
  s.text(g2, 262, 122, '✓', { anchor: 'middle', size: 20, weight: 700, color: C.green })
  s.box(g2, 20, 190, 170, 50, 'bob', user, { color: C.navy, size: 16, font: MONO })
  s.arrow(g2, 195, 210, 320, 175, bad, 10)
  s.text(g2, 120, 262, '✗ Permission denied（EACCES）', { anchor: 'middle', size: 14, weight: 700, color: C.red })

  // 3 · docker 群組 ≈ root
  const g3 = s.layer(3)
  s.arrow(g3, 605, 135, 690, 135, { stroke: C.ink, strokeWidth: 2 }, 10)
  s.box(g3, 695, 100, 185, 70, 'dockerd\n（以 root 執行）', { fill: '#fff4d6', fillStyle: 'solid', stroke: C.orangeDark, strokeWidth: 2 }, { size: 15, color: C.orangeDark })
  s.text(g3, 787, 195, 'docker run -v /:/host …', { anchor: 'middle', size: 13, font: MONO, color: C.navy })
  s.text(g3, 787, 215, '→ 改主機任何檔案', { anchor: 'middle', size: 13, color: C.grey, italic: true })
  s.pill(g3, 560, 250, 320, 36, '能連 docker.sock ≈ 有 root', C.orange, C.navy, 16)
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 300" class="w-full" />
</template>
