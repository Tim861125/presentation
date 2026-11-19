// 把直式 Slidev deck 錄成 1080×1920 mp4。
//
//   1. 先開 dev server：node_modules/.bin/slidev docker-basics-video/short.md --port 3051
//   2. 再錄影：      node docker-basics-video/scripts/record.mjs 3051 docker-basics-video/out/short.mp4
//
// 節奏：每一步停留時間依字幕字數計算（<Sub>），沒有字幕的頁面讀 <Hold :ms>。
// 依賴 dev 模式才有的 window.__slidev__.nav。Chrome 路徑可用 CHROME_PATH 覆寫。
// 錄影用 CDP Page.startScreencast 抓 JPEG 畫格（帶時間戳），再用系統 ffmpeg 依時間戳合成 mp4，
// 不需要 Playwright 自帶的 ffmpeg。畫面靜止時 Chrome 不送畫格，靠時間戳補足停留時間。
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { chromium } from 'playwright-core'

const [port = '3050', out = 'docker-basics-video/out/full.mp4'] = process.argv.slice(2)
const W = 1080
const H = 1920
const SETTLE = 700 // 換頁 / 換步後等動畫與字幕淡入
// units：一個中日韓字或一個英數單字算 1 單位（約每秒讀 6–7 單位）
const dwell = ({ hold, units }) => hold ?? Math.max(2400, 900 + units * 150)

const dir = mkdtempSync(join(tmpdir(), 'vrec-'))
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/usr/bin/google-chrome' })
const ctx = await browser.newContext({ viewport: { width: W, height: H } })
const page = await ctx.newPage()

const frames = [] // { t: 秒（wall clock）, file }
let recording = false
const cdp = await ctx.newCDPSession(page)
cdp.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
  if (recording) {
    const file = join(dir, `f${String(frames.length).padStart(5, '0')}.jpg`)
    writeFileSync(file, Buffer.from(data, 'base64'))
    frames.push({ t: metadata.timestamp, file })
  }
  cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {})
})

// 先停在第 2 頁且整個畫面隱藏，等載入完再跳回封面並顯示，封面的手繪動畫才會從頭播。
await page.goto(`http://localhost:${port}/2`, { waitUntil: 'networkidle' })
const hide = await page.addStyleTag({ content: '#app { opacity: 0 !important; }' })
await page.addStyleTag({ content: '* { cursor: none !important; }' })
await page.waitForFunction(() => window.__slidev__?.nav)
await page.waitForTimeout(1500)
await page.evaluate(() => window.__slidev__.nav.go(1))
await page.waitForTimeout(80)
recording = true
const start = Date.now() / 1000
await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: W, maxHeight: H, everyNthFrame: 1 })
await hide.evaluate(el => el.remove())

let steps = 0
for (;;) {
  await page.waitForTimeout(SETTLE)
  const st = await page.evaluate(() => {
    const n = window.__slidev__.nav
    const root = document.querySelector(`.slidev-page-${n.currentSlideNo}`) ?? document
    const hold = root.querySelector('.vhold')?.getAttribute('data-hold')
    const text = root.querySelector('.vsub__text')?.textContent ?? ''
    return { no: n.currentSlideNo, clicks: n.clicks, hasNext: n.hasNext, hold: hold ? Number(hold) : undefined, units: (text.match(/[\u3400-\u9fff]|[\w.:/-]+/g) ?? []).length, text }
  })
  const ms = dwell(st)
  console.log(`slide ${st.no} click ${st.clicks} · ${ms} ms · ${st.text}`)
  await page.waitForTimeout(Math.max(0, ms - SETTLE))
  steps++
  if (!st.hasNext)
    break
  await page.evaluate(() => window.__slidev__.nav.next())
}
await page.waitForTimeout(600)
const end = Date.now() / 1000
await cdp.send('Page.stopScreencast')
recording = false
await browser.close()

// concat 清單：每格停到下一格出現為止；第一格從 start 起算，最後一格撐到 end。
frames[0].t = Math.min(frames[0].t, start)
const lines = ['ffconcat version 1.0']
frames.forEach((f, i) => {
  const next = i + 1 < frames.length ? frames[i + 1].t : end
  lines.push(`file '${f.file}'`, `duration ${Math.max(0.001, next - f.t).toFixed(4)}`)
})
lines.push(`file '${frames.at(-1).file}'`)
const list = join(dir, 'list.txt')
writeFileSync(list, `${lines.join('\n')}\n`)

mkdirSync(dirname(out), { recursive: true })
execFileSync('ffmpeg', [
  '-loglevel', 'error', '-y',
  '-f', 'concat', '-safe', '0', '-i', list,
  '-vf', `fps=30,scale=${W}:${H},format=yuv420p`,
  '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', '-movflags', '+faststart',
  out,
], { stdio: 'inherit' })
console.log(`\n${steps} steps · ${frames.length} frames · ${(end - start).toFixed(1)} s → ${out}`)
