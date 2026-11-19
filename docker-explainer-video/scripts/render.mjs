// 逐格算繪成 mp4（或抽幾格當靜態圖檢查）。
//
//   node docker-explainer-video/scripts/render.mjs                       # 完整影片 → out/docker-explainer.mp4
//   node docker-explainer-video/scripts/render.mjs --still 3,12.5,40      # 只輸出這些秒數的 PNG → out/stills/
//   node docker-explainer-video/scripts/render.mjs --from 30 --to 60      # 只算一段
//   選項：--fps 30  --workers 4  --out <path>
//
// 每一格都呼叫 window.video.renderAt(t) 再截圖，畫面完全由時間決定，不會掉格。
// 需要 bun（打包 src/）、ffmpeg、Chrome（CHROME_PATH，預設 /usr/bin/google-chrome）。
import { execFileSync, spawn } from 'node:child_process'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { chromium } from 'playwright-core'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = Object.fromEntries(process.argv.slice(2).reduce((acc, a, i, all) => {
  if (a.startsWith('--'))
    acc.push([a.slice(2), all[i + 1]?.startsWith('--') ? 'true' : all[i + 1] ?? 'true'])
  return acc
}, []))
const FPS = Number(args.fps ?? 30)
const WORKERS = Number(args.workers ?? 4)
const OUT = resolve(args.out ?? join(ROOT, 'out/docker-explainer.mp4'))

execFileSync('bun', ['build', join(ROOT, 'src/main.ts'), '--outfile', join(ROOT, 'dist/video.js'), '--format', 'iife', '--target', 'browser'], { stdio: 'inherit' })
const url = pathToFileURL(join(ROOT, 'index.html')).href

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/usr/bin/google-chrome' })
async function openPage() {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 })
  page.on('pageerror', e => console.error('page error:', e.message))
  await page.goto(url)
  await page.waitForFunction(() => window.video && document.fonts.status === 'loaded')
  const cdp = await page.context().newCDPSession(page)
  const shot = async (t, format = 'jpeg') => {
    await page.evaluate(tt => window.video.renderAt(tt), t)
    const { data } = await cdp.send('Page.captureScreenshot', { format, quality: format === 'jpeg' ? 92 : undefined, optimizeForSpeed: true })
    return Buffer.from(data, 'base64')
  }
  return { page, shot }
}

const first = await openPage()
const total = await first.page.evaluate(() => window.video.total)
console.log(`影片總長 ${total.toFixed(1)} 秒`)

if (args.still) {
  const dir = join(ROOT, 'out/stills')
  mkdirSync(dir, { recursive: true })
  for (const t of args.still.split(',').map(Number)) {
    writeFileSync(join(dir, `t${t.toFixed(1).padStart(6, '0')}.png`), await first.shot(t, 'png'))
    console.log(`  ${t}s`)
  }
  await browser.close()
  process.exit(0)
}

const from = Number(args.from ?? 0)
const to = Math.min(total, Number(args.to ?? total))
const frames = Math.round((to - from) * FPS)
const per = Math.ceil(frames / WORKERS)
mkdirSync(dirname(OUT), { recursive: true })
const parts = []
const started = Date.now()
let done = 0

async function worker(w, ctx) {
  const a = w * per
  const b = Math.min(frames, a + per)
  if (a >= b)
    return
  const part = `${OUT}.part${w}.mp4`
  parts[w] = part
  const ff = spawn('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', '-r', String(FPS), part], { stdio: ['pipe', 'inherit', 'inherit'] })
  const closed = new Promise((res, rej) => ff.on('close', c => (c === 0 ? res() : rej(new Error(`ffmpeg exit ${c}`)))))
  for (let i = a; i < b; i++) {
    const buf = await ctx.shot(from + i / FPS)
    if (!ff.stdin.write(buf))
      await new Promise(r => ff.stdin.once('drain', r))
    if (++done % 150 === 0) {
      const el = (Date.now() - started) / 1000
      console.log(`  ${done}/${frames} 格 · ${el.toFixed(0)}s 經過 · 約剩 ${((el / done) * (frames - done)).toFixed(0)}s`)
    }
  }
  ff.stdin.end()
  await closed
}

const ctxs = [first, ...(await Promise.all(Array.from({ length: WORKERS - 1 }, openPage)))]
await Promise.all(ctxs.map((c, w) => worker(w, c)))
await browser.close()

const list = `${OUT}.parts.txt`
writeFileSync(list, parts.filter(Boolean).map(p => `file '${p}'`).join('\n'))
execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', '-movflags', '+faststart', OUT], { stdio: 'inherit' })
for (const p of [...parts.filter(Boolean), list]) rmSync(p)
console.log(`\n${frames} 格 · ${((Date.now() - started) / 1000).toFixed(0)}s → ${OUT}`)
