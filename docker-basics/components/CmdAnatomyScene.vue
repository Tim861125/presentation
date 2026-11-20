<script setup lang="ts">
import { ref } from 'vue'
import { C, MONO, useRoughScene } from 'slidev-theme-sketch/utils/rough-scene'

// 拆解 `sudo unshare --pid --fork --mount-proc --uts sh`：每 click 標出一個零件，下方說明框換成它的全名、用途、沒有它會怎樣。
// 依據：man unshare(1)、pid_namespaces(7)、uts_namespaces(7)。
const svg = ref<SVGSVGElement>()

interface Part {
  token: string
  title: string
  lines: string[]
  /** 沒有它會怎樣（紅字，可省略） */
  without?: string
}

const parts: Part[] = [
  {
    token: 'sudo',
    title: 'superuser do：用 root 身分執行',
    lines: ['建立 namespace 需要管理者權限（CAP_SYS_ADMIN）。'],
    without: '沒有它：unshare 會回 Operation not permitted',
  },
  {
    token: 'unshare',
    title: 'un-share：不再共用',
    lines: ['平常每個 process 都跟父 process 共用同一組 namespaces。', 'unshare 把指定的幾種換成新的，再執行後面的程式。'],
  },
  {
    token: '--pid',
    title: '開一個新的 PID namespace',
    lines: ['新的 process 編號空間，裡面從 PID 1 開始重新編號，', '看不到主機上的其他 process。'],
  },
  {
    token: '--fork',
    title: '先 fork 一個子 process，再讓它執行 sh',
    lines: ['unshare 自己不會搬進新的 PID namespace，', '它之後生出的「第一個子 process」才會成為那裡的 PID 1。'],
    without: '沒有它：sh 不是 PID 1，之後開新 process 會失敗（ENOMEM）',
  },
  {
    token: '--mount-proc',
    title: '在新的 mount namespace 裡重新掛載 /proc',
    lines: ['ps 是讀 /proc 來列出 process 的。這個選項會順便開新的', 'mount namespace，所以只換掉裡面的 /proc，主機不受影響。'],
    without: '沒有它：/proc 還是主機的，ps 會列出主機全部 process',
  },
  {
    token: '--uts',
    title: 'UTS = UNIX Time-Sharing，隔離主機名稱',
    lines: ['UTS namespace 隔離 hostname 和 NIS domain name。', '名稱來自 uname 回傳的 utsname 結構。'],
    without: '沒有它：在裡面改 hostname，主機也跟著改',
  },
  {
    token: 'sh',
    title: '要在新 namespaces 裡執行的程式',
    lines: ['可以換成任何程式，例如 bash 或 python。', '不寫的話，unshare 預設執行 $SHELL。'],
  },
]

const SIZE = 22
const CW = SIZE * 0.6 // 等寬字寬度
const CMD_Y = 34
const full = `$ ${parts.map(p => p.token).join(' ')}`
const X0 = 450 - (full.length * CW) / 2
const PANEL = { x: 40, y: 110, w: 820, h: 200 }

useRoughScene(svg, (s) => {
  // layer 0：整行指令＋說明框（開場文字）
  const g0 = s.layer(0)
  s.text(g0, X0, CMD_Y, '$', { size: SIZE, font: MONO, color: C.grey, weight: 700 })
  let col = 2
  const pos = parts.map((p) => {
    const x = X0 + col * CW
    const w = p.token.length * CW
    col += p.token.length + 1
    return { x, w, cx: x + w / 2 }
  })
  parts.forEach((p, i) => s.text(g0, pos[i].x, CMD_Y, p.token, { size: SIZE, font: MONO, color: C.navy, weight: 700 }))
  s.rect(g0, PANEL.x, PANEL.y, PANEL.w, PANEL.h, { fill: C.paper, fillStyle: 'solid', stroke: C.blue, strokeWidth: 2 })
  const intro = s.layer(0, { to: 0 })
  s.text(intro, 450, 195, '一行指令，7 個零件', { anchor: 'middle', size: 24, weight: 800, color: C.navy })
  s.text(intro, 450, 232, '按一下，從左到右一個一個拆開', { anchor: 'middle', size: 17, color: C.grey })

  parts.forEach((p, i) => {
    const step = i + 1
    const { x, w, cx } = pos[i]
    // 已說明過的零件留一條灰底線
    const done = s.layer(step + 1)
    s.line(done, x - 2, CMD_Y + 18, x + w + 2, CMD_Y + 18, { stroke: C.blueLight, strokeWidth: 2, roughness: 0.6 })

    // 這一步：琥珀底線＋連到說明框
    const g = s.layer(step, { to: step })
    s.line(g, x - 3, CMD_Y + 18, x + w + 3, CMD_Y + 18, { stroke: C.orange, strokeWidth: 4, roughness: 0.8 })
    s.line(g, cx, CMD_Y + 24, Math.min(Math.max(cx, PANEL.x + 40), PANEL.x + PANEL.w - 40), PANEL.y - 2, { stroke: C.orange, strokeWidth: 2.2 })
    s.text(g, PANEL.x + 24, PANEL.y + 34, p.token, { size: 24, weight: 800, color: C.orangeDark, font: MONO })
    s.text(g, PANEL.x + 24 + p.token.length * 24 * 0.6 + 16, PANEL.y + 34, p.title, { size: 21, weight: 800, color: C.navy })
    p.lines.forEach((ln, j) => s.text(g, PANEL.x + 24, PANEL.y + 82 + j * 30, ln, { size: 17, color: C.ink }))
    if (p.without)
      s.text(g, PANEL.x + 24, PANEL.y + 82 + p.lines.length * 30 + 12, p.without, { size: 16, weight: 700, color: C.red })
  })
}, undefined)
</script>

<template>
  <svg ref="svg" viewBox="0 0 900 330" class="w-full" />
</template>
