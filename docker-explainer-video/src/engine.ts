// 時間軸驅動的手繪動畫引擎（rough.js）。
// 所有畫面都由 renderAt(秒) 決定，沒有 CSS transition / WAAPI，所以逐格截圖可以得到穩定、不掉格的影片。
import rough from 'roughjs'
import type { Options } from 'roughjs/bin/core'
import type { RoughSVG } from 'roughjs/bin/svg'

/** 手寫風格調色盤（與簡報的 --sk-* 一致） */
export const C = {
  blue: '#4f61ab',
  blueLight: '#95a0cd',
  blueTint: '#e4e8f5',
  navy: '#1e2a5a',
  orange: '#f5a700',
  orangeDark: '#b57a00',
  orangeTint: '#fff3d6',
  ink: '#212529',
  grey: '#6c757d',
  greyLight: '#dee2e6',
  red: '#dc3545',
  redTint: '#fde2e4',
  green: '#198754',
  white: '#ffffff',
  paper: '#f8f9fa',
}
export const FONT = 'system-ui, -apple-system, "Segoe UI", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif'
export const MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Noto Sans Mono CJK TC", monospace'

const NS = 'http://www.w3.org/2000/svg'
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x))
export const ease = {
  out: (x: number) => 1 - (1 - x) ** 3,
  inOut: (x: number) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2),
}

/** 依 [t, ...values] 關鍵影格做 inOut 內插 */
function interp(stops: number[][], t: number): number[] {
  if (t <= stops[0][0])
    return stops[0].slice(1)
  for (let i = 1; i < stops.length; i++) {
    const a = stops[i - 1]
    const b = stops[i]
    if (t <= b[0]) {
      const k = ease.inOut(clamp01((t - a[0]) / (b[0] - a[0] || 1)))
      return a.slice(1).map((v, j) => v + (b[j + 1] - v) * k)
    }
  }
  return stops[stops.length - 1].slice(1)
}

export interface TextOpts {
  size?: number
  weight?: number | string
  color?: string
  anchor?: 'start' | 'middle' | 'end'
  font?: string
  italic?: boolean
}

interface Piece { el: SVGElement, kind: 'stroke' | 'fade', len: number }

/** 一組一起「畫出來」的元素：at 開始、dur 內畫完；可 hide() 淡出、move() 沿關鍵影格移動 */
export class Item {
  pieces: Piece[] = []
  outAt = Infinity
  outDur = 0.4
  stops?: number[][]
  constructor(public g: SVGGElement, public at: number, public dur: number) {}

  hide(at: number, dur = 0.4) {
    this.outAt = at
    this.outDur = dur
    return this
  }

  /** stops: [t, dx, dy]（相對原本畫的位置） */
  move(stops: [number, number, number][]) {
    this.stops = stops
    return this
  }

  render(t: number) {
    const o = t < this.at ? 0 : t >= this.outAt ? 1 - clamp01((t - this.outAt) / this.outDur) : 1
    if (o <= 0) {
      this.g.style.display = 'none'
      return
    }
    this.g.style.display = ''
    this.g.style.opacity = String(o)
    const p = clamp01((t - this.at) / this.dur)
    const n = this.pieces.length
    this.pieces.forEach((pc, i) => {
      const s = n > 1 ? (i / (n - 1)) * 0.4 : 0
      const q = ease.out(clamp01((p - s) / 0.6))
      if (pc.kind === 'stroke') {
        if (q >= 1) {
          pc.el.style.strokeDasharray = ''
          pc.el.style.strokeDashoffset = ''
        }
        else {
          pc.el.style.strokeDasharray = `${pc.len} ${pc.len}`
          pc.el.style.strokeDashoffset = `${pc.len * (1 - q)}`
        }
      }
      else {
        pc.el.style.opacity = String(q)
      }
    })
    if (this.stops) {
      const [x, y] = interp(this.stops, t)
      this.g.setAttribute('transform', `translate(${x} ${y})`)
    }
  }
}

/** 在一個 Item 裡畫東西的工具（座標系 1080 × 1920） */
export class Draw {
  constructor(private scene: Scene, private item: Item) {}

  private get rc(): RoughSVG {
    return this.scene.video.rc
  }

  private opts(o: Options = {}): Options {
    return { roughness: 1.3, bowing: 1.2, stroke: C.ink, strokeWidth: 3, seed: this.scene.video.seed++, ...o }
  }

  private add<T extends SVGElement>(node: T): T {
    this.item.g.appendChild(node)
    const paths = node.tagName === 'path' ? [node] : Array.from(node.querySelectorAll('path'))
    for (const p of paths) {
      const stroke = p.getAttribute('stroke')
      const fill = p.getAttribute('fill')
      if (stroke && stroke !== 'none' && (!fill || fill === 'none')) {
        let len = 0
        try {
          len = (p as SVGPathElement).getTotalLength()
        }
        catch {}
        this.item.pieces.push({ el: p, kind: 'stroke', len: len || 2000 })
      }
      else {
        this.item.pieces.push({ el: p, kind: 'fade', len: 0 })
      }
    }
    return node
  }

  rect(x: number, y: number, w: number, h: number, o?: Options) { return this.add(this.rc.rectangle(x, y, w, h, this.opts(o))) }
  ellipse(cx: number, cy: number, w: number, h: number, o?: Options) { return this.add(this.rc.ellipse(cx, cy, w, h, this.opts(o))) }
  circle(cx: number, cy: number, d: number, o?: Options) { return this.add(this.rc.circle(cx, cy, d, this.opts(o))) }
  line(x1: number, y1: number, x2: number, y2: number, o?: Options) { return this.add(this.rc.line(x1, y1, x2, y2, this.opts(o))) }
  path(d: string, o?: Options) { return this.add(this.rc.path(d, this.opts(o))) }
  polygon(pts: [number, number][], o?: Options) { return this.add(this.rc.polygon(pts, this.opts(o))) }

  arrow(x1: number, y1: number, x2: number, y2: number, o: Options = {}, head = 22) {
    this.line(x1, y1, x2, y2, o)
    const a = Math.atan2(y2 - y1, x2 - x1)
    for (const s of [-1, 1]) {
      const b = a + Math.PI + s * 0.45
      this.line(x2, y2, x2 + head * Math.cos(b), y2 + head * Math.sin(b), o)
    }
  }

  curve(x1: number, y1: number, x2: number, y2: number, bend = 60, o: Options = {}, head = 22) {
    const len = Math.hypot(x2 - x1, y2 - y1) || 1
    const cx = (x1 + x2) / 2 + (-(y2 - y1) / len) * bend
    const cy = (y1 + y2) / 2 + ((x2 - x1) / len) * bend
    this.path(`M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`, o)
    if (head > 0) {
      const a = Math.atan2(y2 - cy, x2 - cx)
      for (const s of [-1, 1]) {
        const b = a + Math.PI + s * 0.45
        this.line(x2, y2, x2 + head * Math.cos(b), y2 + head * Math.sin(b), o)
      }
    }
  }

  cross(cx: number, cy: number, r = 40, color = C.red) {
    this.line(cx - r, cy - r, cx + r, cy + r, { stroke: color, strokeWidth: 6 })
    this.line(cx + r, cy - r, cx - r, cy + r, { stroke: color, strokeWidth: 6 })
  }

  text(x: number, y: number, str: string, t: TextOpts = {}) {
    const el = document.createElementNS(NS, 'text')
    el.setAttribute('x', String(x))
    el.setAttribute('y', String(y))
    el.setAttribute('fill', t.color ?? C.ink)
    el.setAttribute('font-size', String(t.size ?? 34))
    el.setAttribute('font-weight', String(t.weight ?? 600))
    el.setAttribute('font-family', t.font ?? FONT)
    el.setAttribute('text-anchor', t.anchor ?? 'start')
    el.setAttribute('dominant-baseline', 'middle')
    if (t.italic)
      el.setAttribute('font-style', 'italic')
    el.textContent = str
    return this.add(el)
  }

  /** 多行文字（\n 斷行），以 y 為整塊的垂直中心 */
  lines(x: number, y: number, str: string, t: TextOpts = {}, lh = 1.3) {
    const ls = str.split('\n')
    const size = t.size ?? 34
    return ls.map((ln, i) => this.text(x, y + (i - (ls.length - 1) / 2) * size * lh, ln, t))
  }

  /** 方框＋置中文字 */
  box(x: number, y: number, w: number, h: number, label: string, o: Options = {}, t: TextOpts = {}) {
    this.rect(x, y, w, h, o)
    return this.lines(x + w / 2, y + h / 2, label, { anchor: 'middle', color: C.navy, size: 34, weight: 700, ...t })
  }

  /** 小膠囊標籤，回傳文字元素（可在 tick 裡改字） */
  pill(x: number, y: number, w: number, h: number, label: string, fill: string = C.orange, color: string = C.navy, size = 30, font = MONO) {
    this.rect(x, y, w, h, { fill, fillStyle: 'solid', stroke: C.ink, strokeWidth: 2.5, roughness: 1 })
    return this.text(x + w / 2, y + h / 2 + 2, label, { anchor: 'middle', size, weight: 700, color, font })
  }

  /** 非手繪的實心矩形（給進度條等需要精準寬度的東西） */
  solid(x: number, y: number, w: number, h: number, fill: string) {
    const el = document.createElementNS(NS, 'rect')
    el.setAttribute('x', String(x))
    el.setAttribute('y', String(y))
    el.setAttribute('width', String(w))
    el.setAttribute('height', String(h))
    el.setAttribute('fill', fill)
    return this.add(el)
  }

  /** 打字效果：at 起 dur 秒內逐字出現，打字時有游標 */
  typed(x: number, y: number, str: string, t: TextOpts, at: number, dur: number) {
    const el = this.text(x, y, '', t)
    this.scene.tick((tt) => {
      const n = Math.round(clamp01((tt - at) / dur) * str.length)
      const caret = tt >= at && tt < at + dur + 0.8 && Math.floor(tt * 2.5) % 2 === 0 ? '▍' : ''
      el.textContent = str.slice(0, n) + caret
    })
    return el
  }
}

export interface Sub { at: number, end: number, html: string }

/** 一幕：有自己的局部時間（0 ~ dur）、元素、字幕與鏡頭 */
export class Scene {
  root: SVGGElement
  items: Item[] = []
  ticks: ((t: number) => void)[] = []
  subs: Sub[] = []
  cam?: number[][]
  start = 0

  constructor(public video: Video, public label: string, public dur: number) {
    this.root = document.createElementNS(NS, 'g')
    video.svg.appendChild(this.root)
  }

  draw(at: number, dur: number, build: (d: Draw) => void): Item {
    const g = document.createElementNS(NS, 'g')
    this.root.appendChild(g)
    const it = new Item(g, at, dur)
    build(new Draw(this, it))
    this.items.push(it)
    return it
  }

  tick(fn: (t: number) => void) {
    this.ticks.push(fn)
  }

  sub(at: number, end: number, html: string) {
    this.subs.push({ at, end, html })
  }

  /** stops: [t, scale, cx, cy]，(cx, cy) 會被放到畫面焦點 (540, 850) */
  camera(stops: [number, number, number, number][]) {
    this.cam = stops
  }

  render(t: number) {
    for (const it of this.items) it.render(t)
    for (const f of this.ticks) f(t)
    const [k, cx, cy] = this.cam ? interp(this.cam, t) : [1, 540, 850]
    this.root.setAttribute('transform', `translate(540 850) scale(${k}) translate(${-cx} ${-cy})`)
  }
}

/** 整支影片：依序串接各幕，幕與幕之間交叉淡化 */
export class Video {
  scenes: Scene[] = []
  total = 0
  seed = 1
  svg: SVGSVGElement
  rc: RoughSVG
  private num: HTMLElement
  private title: HTMLElement
  private bar: HTMLElement
  private subEl: HTMLElement
  private subText: HTMLElement
  private lastSub = ''
  private lastLabel = ''

  constructor(stage: HTMLElement) {
    this.svg = stage.querySelector('svg')!
    this.rc = rough.svg(this.svg)
    this.num = stage.querySelector('.hdr__num')!
    this.title = stage.querySelector('.hdr__title')!
    this.bar = stage.querySelector('.bar > div')!
    this.subEl = stage.querySelector('.sub')!
    this.subText = stage.querySelector('.sub__text')!
  }

  /** label 格式：'02|隔離：namespaces'（章節號可省略：'|重點整理'） */
  scene(label: string, dur: number, build: (s: Scene) => void) {
    const s = new Scene(this, label, dur)
    s.start = this.total
    this.total += dur
    build(s)
    this.scenes.push(s)
    return s
  }

  renderAt(T: number) {
    const X = 0.45
    let active = this.scenes[0]
    this.scenes.forEach((s, i) => {
      const t = T - s.start
      const first = i === 0
      const last = i === this.scenes.length - 1
      const visible = (first || t >= -X) && (last || t <= s.dur + X)
      if (!visible) {
        s.root.style.display = 'none'
        return
      }
      const fin = first ? 1 : clamp01((t + X) / (2 * X))
      const fout = last ? 1 : clamp01((s.dur + X - t) / (2 * X))
      s.root.style.display = ''
      s.root.style.opacity = String(Math.min(fin, fout))
      s.render(t)
      if (t >= 0)
        active = s
    })

    // 標題
    if (active.label !== this.lastLabel) {
      const [num, title] = active.label.split('|')
      this.num.textContent = num
      this.title.textContent = title
      this.lastLabel = active.label
    }
    const ht = T - active.start
    const hdr = this.title.parentElement!
    hdr.style.opacity = String(active === this.scenes[0] ? 1 : clamp01((ht + 0.1) / 0.4))

    // 進度條
    this.bar.style.width = `${(T / this.total) * 100}%`

    // 字幕
    const lt = T - active.start
    const sub = active.subs.find(s => lt >= s.at && lt < s.end)
    if (!sub) {
      this.subEl.style.opacity = '0'
      return
    }
    if (sub.html !== this.lastSub) {
      this.subText.innerHTML = sub.html
      this.lastSub = sub.html
    }
    const o = Math.min(clamp01((lt - sub.at) / 0.25), clamp01((sub.end - lt) / 0.25))
    this.subEl.style.opacity = '1'
    this.subText.style.opacity = String(o)
  }
}
