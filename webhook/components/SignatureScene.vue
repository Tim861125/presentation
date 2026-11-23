<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// HMAC 簽章：雙方共享 secret，GitHub 簽 body，你重算比對；沒有 secret 的攻擊者簽不出來。
const svg = ref<SVGSVGElement>()

useRoughScene(svg, (s) => {
  const box = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2.2 }

  const g0 = s.layer(0)
  s.rect(g0, 20, 30, 250, 150, box)
  s.text(g0, 145, 55, 'GitHub', { anchor: 'middle', size: 18, weight: 700, color: C.navy })
  s.rect(g0, 630, 30, 250, 150, box)
  s.text(g0, 755, 55, '你的 server', { anchor: 'middle', size: 18, weight: 700, color: C.navy })
  s.pill(g0, 55, 138, 180, 28, 'secret', C.orange, C.navy, 13)
  s.pill(g0, 665, 138, 180, 28, 'secret', C.orange, C.navy, 13)
  s.text(g0, 450, 152, '設定 webhook 時就共享的 secret', { anchor: 'middle', size: 13, color: C.orangeDark, italic: true })

  // 1 · GitHub 用 secret 簽 body，放進 header
  const g1 = s.layer(1)
  s.text(g1, 145, 96, 'HMAC-SHA256(', { anchor: 'middle', size: 13, font: MONO, color: C.navy })
  s.text(g1, 145, 114, '  secret, body)', { anchor: 'middle', size: 13, font: MONO, color: C.navy })
  s.arrow(g1, 278, 100, 622, 100, { stroke: C.orange, strokeWidth: 3 }, 12)
  s.text(g1, 450, 70, 'body + X-Hub-Signature-256:', { anchor: 'middle', size: 13, font: MONO, weight: 700, color: C.navy })
  s.text(g1, 450, 88, 'sha256=757107ea…', { anchor: 'middle', size: 13, font: MONO, color: C.navy })

  // 2 · 你用同一把 secret 重算、比對
  const g2 = s.layer(2)
  s.text(g2, 755, 88, '自己重算一次', { anchor: 'middle', size: 14, color: C.navy })
  s.text(g2, 755, 112, '✓ 相符 → 處理', { anchor: 'middle', size: 15, weight: 700, color: C.green })

  // 3 · 攻擊者沒有 secret
  const g3 = s.layer(3)
  s.box(g3, 330, 225, 220, 64, '攻擊者', { fill: '#fbe3e5', fillStyle: 'solid', stroke: C.red, strokeWidth: 2 }, { color: C.red })
  s.arrow(g3, 556, 245, 700, 188, { stroke: C.red, strokeWidth: 2.4 }, 11)
  s.text(g3, 300, 210, '偽造 body，但沒有 secret → 簽不出對的值', { anchor: 'end', size: 13, color: C.red })
  s.text(g3, 755, 235, '✗ 不符 → 401', { anchor: 'middle', size: 16, weight: 700, color: C.red })
})
</script>

<template>
  <svg ref="svg" viewBox="0 15 900 290" class="w-full" />
</template>
