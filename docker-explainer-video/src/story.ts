// 分鏡：Docker 底層觀念（直式 1080×1920，字幕不配音）。內容依據 ../docker-basics/spec.md。
// 每一幕的時間都是該幕的局部秒數；畫面主體放在 y 230–1480，下方留給字幕。
import type { Options } from 'roughjs/bin/core'
import type { Video } from './engine'
import { C, FONT, MONO, clamp01 } from './engine'

const box: Options = { fill: C.blueTint, fillStyle: 'solid', stroke: C.blue, strokeWidth: 3 }
const warm: Options = { fill: C.orangeTint, fillStyle: 'solid', stroke: C.orange, strokeWidth: 3 }
const redb: Options = { fill: C.redTint, fillStyle: 'solid', stroke: C.red, strokeWidth: 3 }
const grey: Options = { fill: C.paper, fillStyle: 'solid', stroke: C.grey, strokeWidth: 2.5 }
const dashed = (stroke: string, w = 3): Options => ({ stroke, strokeWidth: w, strokeLineDash: [16, 12], roughness: 0.7 })
const cols = [90, 400, 710]

export function story(v: Video) {
  // ───────────────────────── 開場 ─────────────────────────
  v.scene('|Docker 底層觀念', 11, (s) => {
    s.draw(0.2, 0.8, (d) => {
      d.rect(90, 420, 900, 380, { fill: C.navy, fillStyle: 'solid', stroke: C.navy, strokeWidth: 4 })
      d.line(90, 484, 990, 484, { stroke: C.blueLight, strokeWidth: 2 })
      ;[C.red, C.orange, C.green].forEach((c, i) => d.circle(140 + i * 42, 452, 24, { fill: c, fillStyle: 'solid', stroke: c, strokeWidth: 1 }))
    })
    s.draw(0.9, 0.2, d => d.typed(130, 570, '$ docker run --rm alpine true', { size: 40, color: C.white, font: MONO, weight: 600 }, 1.0, 2.2))
    s.draw(3.7, 0.6, d => d.text(130, 660, '（不到一秒，跑完就結束）', { size: 34, color: C.blueLight }))
    s.draw(5.2, 1.0, (d) => {
      d.text(540, 1010, '這不到一秒裡', { anchor: 'middle', size: 76, weight: 800, color: C.navy })
      d.text(540, 1110, '到底發生了什麼？', { anchor: 'middle', size: 76, weight: 800, color: C.navy })
      d.path('M260 1180 Q540 1205 820 1178', { stroke: C.orange, strokeWidth: 8 })
    })
    s.sub(0, 5.2, '只打一行指令，一個 Linux 環境就跑起來，又馬上消失。')
    s.sub(5.2, 11, '這支影片帶你一層一層<em>拆開</em>它。')
  })

  // ───────────────────────── 01 容器不是小 VM ─────────────────────────
  v.scene('01|容器不是小 VM', 27, (s) => {
    s.draw(0.2, 0.6, d => d.box(90, 1320, 900, 70, '硬體', grey, { color: C.grey }))
    const vm: ReturnType<typeof s.draw>[] = []
    vm.push(s.draw(0.8, 0.6, d => d.box(90, 1230, 900, 70, 'Hypervisor（模擬硬體）', grey, { color: C.grey, size: 32 })))
    cols.forEach((x, i) => {
      vm.push(s.draw(1.5 + i * 0.5, 0.9, (d) => {
        d.box(x, 1120, 280, 85, 'kernel', redb, { color: C.red })
        d.box(x, 1020, 280, 85, '作業系統', box)
        d.box(x, 920, 280, 85, `App ${i + 1}`, box)
      }))
      vm.push(s.draw(3.4 + i * 0.2, 0.6, (d) => {
        d.rect(x - 10, 905, 300, 315, dashed(C.blue))
        d.text(x + 140, 878, `VM ${i + 1}`, { anchor: 'middle', size: 32, weight: 800, color: C.blue })
      }))
    })
    vm.push(s.draw(5, 0.5, (d) => {
      d.text(540, 740, '開機中…', { anchor: 'middle', size: 34, color: C.grey })
      cols.forEach((x, i) => {
        d.rect(x, 790, 280, 34, { stroke: C.grey, strokeWidth: 2.5, roughness: 0.8 })
        const fill = d.solid(x + 4, 794, 0, 26, C.red)
        s.tick((t) => {
          const k = clamp01((t - 5.3) / (3.2 + i * 0.8))
          fill.setAttribute('width', String(272 * k))
        })
      })
    }))
    vm.forEach(it => it.hide(10.4))

    s.draw(11, 0.9, d => d.box(90, 1150, 900, 140, '一顆 Linux kernel（大家共用）', warm, { size: 40 }))
    ;['alpine', 'nginx', 'postgres'].forEach((name, i) => {
      const x = cols[i]
      s.draw(12.2 + i * 0.4, 0.8, (d) => {
        d.rect(x - 10, 890, 300, 225, dashed(C.orange))
        d.box(x, 905, 280, 85, name, box, { font: MONO })
        d.box(x, 1005, 280, 85, '自己的檔案', box, { size: 32 })
      })
    })
    s.draw(16.2, 0.9, (d) => {
      d.text(540, 700, '啟動 = 開一個行程', { anchor: 'middle', size: 66, weight: 800, color: C.navy })
      d.path('M250 750 Q540 772 830 748', { stroke: C.orange, strokeWidth: 8 })
    })
    s.draw(21.2, 1.0, (d) => {
      d.box(70, 290, 450, 150, 'VM\n模擬一整台電腦', redb, { color: C.red, size: 36 })
      d.box(560, 290, 450, 150, '容器\n一個被隔離的行程', warm, { size: 36 })
    })
    s.sub(0, 5, '很多人以為容器就是「比較小的虛擬機」。')
    s.sub(5, 10.6, '虛擬機要模擬整台電腦，每一台都帶著<em>自己的 kernel</em>，開機就是真的開一台電腦。')
    s.sub(10.6, 16, '容器沒有自己的 kernel，所有容器<em>共用主機那一顆</em> Linux kernel。')
    s.sub(16, 21, '所以啟動容器不用開機，只是<em>開一個行程</em>，毫秒等級。')
    s.sub(21, 27, '記住這句話：容器不是小 VM，而是<em>被隔離的行程</em>。')
  })

  // ───────────────────────── 02 隔離：namespaces ─────────────────────────
  v.scene('02|隔離：namespaces', 34, (s) => {
    s.draw(0.2, 0.7, d => d.box(90, 1300, 900, 110, 'Linux kernel', grey, { size: 40 }))
    const procs: [number, number, string, string][] = [
      [230, 650, 'systemd', 'PID 1'],
      [540, 580, 'sshd', 'PID 812'],
      [850, 660, 'chrome', 'PID 2310'],
      [260, 900, 'dockerd', 'PID 1093'],
      [820, 930, 'postgres', 'PID 1544'],
    ]
    procs.forEach(([x, y, name, pid], i) => s.draw(0.8 + i * 0.3, 0.7, (d) => {
      d.ellipse(x, y, 220, 92, box)
      d.text(x, y + 2, name, { anchor: 'middle', size: 32, weight: 700, color: C.navy, font: MONO })
      d.text(x, y + 74, pid, { anchor: 'middle', size: 26, color: C.grey, font: MONO })
    }))
    s.draw(2.3, 0.7, (d) => {
      d.ellipse(540, 790, 210, 92, warm)
      d.text(540, 792, 'sh', { anchor: 'middle', size: 36, weight: 800, color: C.navy, font: MONO })
    })
    s.draw(2.3, 0.7, d => d.text(540, 862, 'PID 24817', { anchor: 'middle', size: 26, color: C.grey, font: MONO })).hide(6.2)

    // 牆
    s.draw(6.4, 1.2, (d) => {
      d.rect(380, 705, 320, 210, { stroke: C.orange, strokeWidth: 6, roughness: 1.1 })
      d.text(540, 688, 'namespace', { anchor: 'middle', size: 24, weight: 800, color: C.orangeDark, font: MONO })
    })
    s.draw(9.8, 0.6, (d) => {
      d.text(540, 862, '我看到的：PID 1', { anchor: 'middle', size: 21, weight: 800, color: C.orangeDark })
      d.text(540, 892, '這台機器只有我', { anchor: 'middle', size: 16, color: C.navy })
    })
    s.camera([[8, 1, 540, 850], [9.6, 2.3, 540, 810], [17.6, 2.3, 540, 810], [19.2, 1, 540, 850]])
    s.draw(19.4, 0.6, d => d.text(540, 975, '主機看：PID 24817', { anchor: 'middle', size: 30, weight: 700, color: C.grey, font: MONO }))

    // 各種 namespace
    const ns = ['pid 行程', 'net 網路', 'mnt 檔案', 'uts 主機名', 'ipc 通訊', 'user 使用者']
    ns.forEach((n, i) => s.draw(24.2 + i * 0.35, 0.5, d => d.pill(cols[i % 3], 280 + Math.floor(i / 3) * 90, 280, 66, n, C.blueTint, C.navy, 28, FONT)))
    s.draw(30.2, 0.7, d => d.pill(240, 1440, 600, 66, '隔離 = 看不到別人', C.orange, C.navy, 32))

    s.sub(0, 6.2, '先看主機：一顆 kernel 上面本來就跑著一大堆行程，彼此都看得到。')
    s.sub(6.2, 12, 'Docker 用 <em>namespaces</em> 在行程周圍蓋一道牆。')
    s.sub(12, 18, '牆裡的 sh 以為自己是 <em>PID 1</em>，整台機器只有它。')
    s.sub(18, 24, '但從主機看，它只是 PID 24817：同一個行程，兩種視角。')
    s.sub(24, 30, '牆不只一道：行程、網路、檔案系統、hostname，各有自己的 namespace。')
    s.sub(30, 34, '這就是<em>隔離</em>：讓行程看不到別人。')
  })

  // ───────────────────────── 03 限制與過濾 ─────────────────────────
  v.scene('03|限制與過濾', 30, (s) => {
    s.draw(0.2, 0.7, d => d.box(90, 1300, 900, 110, 'Linux kernel', grey, { size: 40 }))
    s.draw(0.4, 0.9, (d) => {
      d.rect(300, 360, 480, 300, { stroke: C.orange, strokeWidth: 6, roughness: 1.1 })
      d.ellipse(540, 480, 260, 100, warm)
      d.text(540, 482, 'sh', { anchor: 'middle', size: 40, weight: 800, color: C.navy, font: MONO })
      d.text(540, 600, '被隔離的行程', { anchor: 'middle', size: 30, color: C.grey })
    })

    // cgroups：記憶體與 CPU 量表
    const meters = s.draw(1.8, 0.9, (d) => {
      d.text(300, 725, '記憶體', { size: 34, weight: 800, color: C.navy })
      d.rect(300, 760, 480, 64, { stroke: C.ink, strokeWidth: 3, roughness: 0.8 })
      const mem = d.solid(304, 764, 0, 56, C.orange)
      d.line(660, 742, 660, 842, { stroke: C.red, strokeWidth: 4, strokeLineDash: [10, 8] })
      d.text(660, 868, '上限 256 MB', { anchor: 'middle', size: 28, weight: 700, color: C.red })
      d.text(300, 975, 'CPU', { size: 34, weight: 800, color: C.navy })
      d.rect(300, 1010, 480, 64, { stroke: C.ink, strokeWidth: 3, roughness: 0.8 })
      const cpu = d.solid(304, 1014, 0, 56, C.blue)
      d.line(540, 992, 540, 1092, { stroke: C.red, strokeWidth: 4, strokeLineDash: [10, 8] })
      d.text(540, 1118, '上限 0.5 核', { anchor: 'middle', size: 28, weight: 700, color: C.red })
      s.tick((t) => {
        const m = Math.min(0.75, clamp01((t - 3) / 4) * 0.98)
        mem.setAttribute('width', String(472 * m))
        mem.setAttribute('fill', m >= 0.75 ? C.red : C.orange)
        cpu.setAttribute('width', String(472 * Math.min(0.5, clamp01((t - 8.4) / 2.4) * 0.9)))
      })
    })
    const oom = s.draw(7.2, 0.5, d => d.text(540, 910, '想用更多？擋下，甚至被 OOM kill', { anchor: 'middle', size: 30, weight: 700, color: C.red }))
    meters.hide(12.4)
    oom.hide(12.4)

    // seccomp
    s.draw(13, 0.9, (d) => {
      d.line(100, 1150, 980, 1150, { stroke: C.red, strokeWidth: 5, strokeLineDash: [18, 12] })
      d.text(100, 1115, 'seccomp', { size: 36, weight: 800, color: C.red, font: MONO })
    })
    s.draw(14.6, 0.3, d => d.pill(260, 690, 200, 62, 'read', C.blueTint)).move([[14.8, 0, 0], [16.4, 0, 545]]).hide(16.6, 0.3)
    s.draw(16.6, 0.3, d => d.pill(440, 690, 200, 62, 'write', C.blueTint)).move([[16.8, 0, 0], [18.3, 0, 545]]).hide(18.5, 0.3)
    s.draw(18.6, 0.3, d => d.pill(620, 690, 200, 62, 'reboot', C.redTint, C.red)).move([[18.8, 0, 0], [19.8, 0, 390], [20.6, 0, 250]]).hide(23.6)
    s.draw(19.8, 0.4, d => d.cross(720, 1150, 44)).hide(23.6)

    s.draw(24.2, 1.0, (d) => {
      d.pill(40, 250, 320, 74, 'namespaces：看不到', C.blueTint, C.navy, 26, FONT)
      d.pill(380, 250, 320, 74, 'cgroups：用不多', C.orangeTint, C.navy, 26, FONT)
      d.pill(720, 250, 320, 74, 'seccomp：做不了', C.redTint, C.red, 26, FONT)
    })

    s.sub(0, 6, '光是看不到別人還不夠，還要限制它能<em>用多少</em>。')
    s.sub(6, 12.4, '<em>cgroups</em> 幫每個容器設上限：記憶體、CPU、IO 都能管。')
    s.sub(12.4, 18.4, '最後一道關卡是 <em>seccomp</em>：行程每次請 kernel 做事（syscall），都要先過濾。')
    s.sub(18.4, 24, '一般的讀寫放行，像 reboot 這種危險操作，直接擋掉。')
    s.sub(24, 30, '隔離、限制、過濾，全是 <em>kernel 本來就有的功能</em>，Docker 只是幫你設定好。')
  })

  // ───────────────────────── 04 檔案從哪來 ─────────────────────────
  v.scene('04|檔案從哪來：image', 32, (s) => {
    s.draw(0.2, 0.7, (d) => {
      d.rect(90, 250, 900, 270, { fill: C.paper, fillStyle: 'solid', stroke: C.ink, strokeWidth: 3 })
      d.text(120, 285, 'Dockerfile', { size: 26, weight: 700, color: C.grey, font: MONO })
    })
    const lines: [number, string][] = [[345, 'FROM alpine'], [405, 'RUN apk add curl'], [465, 'COPY app /app']]
    const at = [0.6, 3.1, 5.6]
    lines.forEach(([y, str], i) => s.draw(at[i], 0.2, d => d.typed(130, y, str, { size: 38, font: MONO, weight: 700, color: C.navy }, at[i], 0.8)))
    const layers: [number, string][] = [[1200, 'alpine 基底檔案'], [1110, '+ curl'], [1020, '+ /app']]
    layers.forEach(([y, label], i) => {
      const t = at[i] + 1.0
      s.draw(t, 0.5, d => d.box(190, y, 700, 80, label, box, { size: 32 })).move([[t, 0, lines[i][0] - (y + 40)], [t + 1.0, 0, 0]])
    })
    s.draw(8, 0.7, d => d.text(540, 1330, 'image：唯讀、大家共用', { anchor: 'middle', size: 42, weight: 800, color: C.blue }))

    // 兩個容器的可寫層
    const wA = s.draw(13.2, 0.8, (d) => {
      d.rect(190, 900, 340, 108, warm)
      d.text(360, 922, 'A 的可寫層', { anchor: 'middle', size: 28, weight: 700, color: C.navy })
      d.text(360, 868, '容器 A', { anchor: 'middle', size: 34, weight: 800, color: C.orangeDark })
    })
    s.draw(13.8, 0.8, (d) => {
      d.rect(550, 900, 340, 108, warm)
      d.text(720, 954, 'B 的可寫層', { anchor: 'middle', size: 28, weight: 700, color: C.navy })
      d.text(720, 868, '容器 B', { anchor: 'middle', size: 34, weight: 800, color: C.orangeDark })
    })

    // copy-on-write
    const tok = s.draw(19.4, 0.4, d => d.pill(200, 1213, 210, 54, '/etc/hosts', C.white, C.navy, 26)).move([[20.2, 0, 0], [21.8, 0, -260]])
    const cow = s.draw(22, 0.6, d => d.text(540, 800, '第一次修改 → 複製上來', { anchor: 'middle', size: 34, weight: 800, color: C.orangeDark }))
    const x = s.draw(25.4, 0.5, d => d.cross(360, 950, 70))
    ;[wA, tok, cow, x].forEach(it => it.hide(26.8))
    s.draw(27.4, 0.8, d => d.pill(140, 1400, 800, 72, 'volume：資料放在容器外，刪了還在', C.orange, C.navy, 30, FONT))

    s.sub(0, 8, '容器裡的檔案從 <em>image</em> 來。Dockerfile 每一行，就疊上一層 layer。')
    s.sub(8, 13, '疊好的 image 是<em>唯讀</em>的，誰都不能改。')
    s.sub(13, 19.2, '每個容器啟動時，在最上面多一層薄薄的<em>可寫層</em>；兩個容器共用同一份 image。')
    s.sub(19.2, 25.2, '容器第一次修改某個檔案，才把它<em>複製</em>到自己的可寫層。這叫 copy-on-write。')
    s.sub(25.2, 32, '刪掉容器，可寫層就跟著消失。要留下的資料，放在 <em>volume</em>。')
  })

  // ───────────────────────── 05 docker run 的旅程 ─────────────────────────
  v.scene('05|docker run 的旅程', 40, (s) => {
    const X = 360
    const W = 440
    const H = 120
    const ys = [290, 480, 670, 860, 1050]
    const nodes: [string, string][] = [
      ['docker CLI', '你打的指令'],
      ['dockerd', '常駐的 daemon'],
      ['containerd', '管容器生命週期'],
      ['shim', '每個容器一支'],
      ['runc', '真正建容器的人'],
    ]
    const links: [string, string][] = [['HTTP', 'docker.sock'], ['gRPC', ''], ['啟動', ''], ['exec', '']]
    const at = [0.3, 5.2, 12, 17, 22]
    const items = nodes.map(([label, note], i) => s.draw(at[i], 0.9, (d) => {
      d.rect(X, ys[i], W, H, box)
      d.text(X + W / 2, ys[i] + 46, label, { anchor: 'middle', size: 40, weight: 800, color: C.navy, font: MONO })
      d.text(X + W / 2, ys[i] + 92, note, { anchor: 'middle', size: 28, color: C.grey })
      if (i > 0) {
        d.arrow(580, ys[i - 1] + H + 5, 580, ys[i] - 5, { stroke: C.ink, strokeWidth: 4 }, 18)
        d.text(830, ys[i] - 48, links[i - 1][0], { size: 28, weight: 800, color: C.blue, font: MONO })
        if (links[i - 1][1])
          d.text(830, ys[i] - 16, links[i - 1][1], { size: 24, color: C.grey, font: MONO })
      }
    }))

    // 請求 token 沿左側往下走
    const cy = (i: number) => ys[i] + H / 2
    s.draw(5.6, 0.4, d => d.pill(150, cy(0) - 28, 150, 56, '請求', C.orange, C.navy, 28, FONT))
      .move([[6.1, 0, 0], [7.3, 0, cy(1) - cy(0)], [12.4, 0, cy(1) - cy(0)], [13.4, 0, cy(2) - cy(0)], [17.4, 0, cy(2) - cy(0)], [18.4, 0, cy(3) - cy(0)], [22.4, 0, cy(3) - cy(0)], [23.4, 0, cy(4) - cy(0)]])
      .hide(24)

    // clone 出行程
    const proc = s.draw(24, 0.9, (d) => {
      d.arrow(580, ys[4] + H + 5, 580, 1228, { stroke: C.orange, strokeWidth: 5 }, 20)
      d.text(610, 1200, 'clone', { size: 30, weight: 800, color: C.orangeDark, font: MONO })
      d.ellipse(580, 1290, 380, 112, warm)
      d.text(580, 1292, 'alpine true', { anchor: 'middle', size: 38, weight: 800, color: C.navy, font: MONO })
    })
    const nsPills = s.draw(25, 0.8, (d) => {
      d.pill(150, 1210, 130, 50, 'pid', C.blueTint, C.navy, 24)
      d.pill(150, 1280, 130, 50, 'net', C.blueTint, C.navy, 24)
      d.pill(800, 1210, 130, 50, 'mnt', C.blueTint, C.navy, 24)
      d.pill(800, 1280, 130, 50, 'cgroup', C.blueTint, C.navy, 24)
    })
    items[4].hide(28.6, 0.6)
    const gone = s.draw(29, 0.6, d => d.text(580, ys[4] + H / 2, '建完就離開', { anchor: 'middle', size: 38, weight: 800, color: C.red }))
    const parent = s.draw(30.2, 1.0, (d) => {
      d.curve(X + W + 6, cy(3), 760, 1262, -150, { stroke: C.orange, strokeWidth: 5 }, 20)
      d.text(975, 1090, 'parent', { anchor: 'middle', size: 32, weight: 800, color: C.orangeDark, font: MONO })
    })
    s.draw(34.2, 0.7, d => d.text(580, 1420, 'true 執行完 → --rm 刪掉容器', { anchor: 'middle', size: 34, weight: 700, color: C.navy }))
    ;[proc, nsPills, parent, gone, items[3]].forEach(it => it.hide(35.6, 0.8))

    s.sub(0, 5.2, '按下 Enter，docker 這支指令其實只是個 <em>client</em>。')
    s.sub(5.2, 12, '它把指令變成 HTTP 請求，經 docker.sock 送給常駐的 daemon：<em>dockerd</em>。')
    s.sub(12, 17, 'dockerd 管 image、網路、volume，容器的生命週期交給 <em>containerd</em>。')
    s.sub(17, 22, 'containerd 替這個容器啟動一支 <em>shim</em>。')
    s.sub(22, 28.4, 'shim 叫 <em>runc</em> 設好 namespaces、cgroups、seccomp，再 clone 出你的行程。')
    s.sub(28.4, 34, 'runc 做完就離開，shim 留下來當容器的 parent，收結束碼、接輸出。')
    s.sub(34, 40, 'true 一執行完就結束，--rm 再把容器刪掉。整趟旅程不到一秒。')
  })

  // ───────────────────────── 06 Mac 上的 Docker ─────────────────────────
  v.scene('06|Mac 上的 Docker', 30, (s) => {
    s.draw(0.2, 1.0, (d) => {
      d.rect(90, 270, 900, 1030, { fill: '#fbfbfd', fillStyle: 'solid', stroke: C.ink, strokeWidth: 4 })
      d.polygon([[40, 1300], [1040, 1300], [1000, 1352], [80, 1352]], { fill: C.greyLight, fillStyle: 'solid', stroke: C.ink, strokeWidth: 3 })
      d.text(130, 318, 'macOS（沒有 Linux kernel）', { size: 30, weight: 700, color: C.grey })
    })
    s.draw(1.6, 0.7, d => d.box(150, 370, 320, 100, 'docker CLI', box, { font: MONO, size: 36 }))
    s.draw(6.2, 1.0, (d) => {
      d.rect(140, 620, 800, 620, dashed(C.blue, 4))
      d.text(910, 656, 'Linux VM', { anchor: 'end', size: 34, weight: 800, color: C.blue })
    })
    s.draw(7.2, 0.7, d => d.box(170, 1120, 740, 90, 'Linux kernel', grey, { size: 34 }))
    s.draw(8, 0.8, d => d.box(190, 700, 330, 380, 'dockerd\n↓\ncontainerd\n↓\nshim · runc', box, { font: MONO, size: 32 }))
    ;['alpine', 'nginx', 'postgres'].forEach((c, i) => s.draw(9 + i * 0.35, 0.6, d => d.box(580, 720 + i * 130, 300, 90, c, warm, { font: MONO, size: 32 })))
    s.draw(13.2, 0.9, (d) => {
      d.arrow(310, 476, 310, 694, { stroke: C.orange, strokeWidth: 6 }, 24)
      d.text(340, 560, 'vsock', { size: 36, weight: 800, color: C.orangeDark, font: MONO })
    })
    for (const t0 of [14.4, 16.4]) {
      s.draw(t0, 0.2, d => d.circle(310, 490, 30, { fill: C.orange, fillStyle: 'solid', stroke: C.orangeDark, strokeWidth: 2 }))
        .move([[t0, 0, 0], [t0 + 1.2, 0, 190]]).hide(t0 + 1.25, 0.2)
    }
    ;['VM 開機多快', '吃多少記憶體', '中間經過幾層'].forEach((p, i) => s.draw(20.2 + i * 0.4, 0.6, d => d.pill(40 + i * 340, 1395, 320, 70, p, C.orange, C.navy, 28, FONT)))

    s.sub(0, 6, '問題來了：Mac 和 Windows 沒有 Linux kernel，容器要跑在哪？')
    s.sub(6, 13, '答案是：Docker Desktop 偷偷開了一台 <em>Linux VM</em>，dockerd 和容器全都在裡面。')
    s.sub(13, 20, '你在 macOS 打的 docker 指令，經 <em>vsock</em>（主機和 VM 之間的通道）送進 VM。')
    s.sub(20, 26, '所以 Docker Desktop、OrbStack、Colima 這些工具，比的是這台 VM 有多輕、多快。')
    s.sub(26, 30, '在 Linux 上就不需要 VM，容器直接用主機的 kernel。')
  })

  // ───────────────────────── 07 網路怎麼通 ─────────────────────────
  v.scene('07|網路怎麼通', 34, (s) => {
    s.draw(0.3, 0.7, d => d.box(420, 260, 520, 100, '瀏覽器', grey, { size: 36 }))
    s.draw(0.9, 0.9, (d) => {
      d.rect(60, 410, 960, 1010, dashed(C.grey, 3))
      d.text(90, 446, 'Linux host（Mac 上就是那台 VM）', { size: 28, weight: 700, color: C.grey })
    })
    s.draw(6, 0.8, d => d.box(420, 500, 520, 120, 'iptables（DNAT）', box, { font: MONO, size: 34 }))
    s.draw(13, 0.8, (d) => {
      d.arrow(680, 625, 680, 694, { stroke: C.ink, strokeWidth: 4 }, 18)
      d.box(420, 700, 520, 120, 'docker0\n虛擬交換器', box, { size: 32 })
    })
    s.draw(19, 1.2, (d) => {
      d.rect(400, 930, 560, 440, dashed(C.orange, 4))
      d.text(420, 966, '容器（net ns）', { size: 28, weight: 700, color: C.orangeDark })
      d.line(680, 824, 680, 1008, { stroke: C.orange, strokeWidth: 9 })
      d.text(705, 885, 'veth', { size: 34, weight: 800, color: C.orangeDark, font: MONO })
      d.box(530, 1012, 300, 90, 'eth0', box, { font: MONO, size: 34 })
      d.arrow(680, 1106, 680, 1166, { stroke: C.ink, strokeWidth: 4 }, 18)
      d.box(500, 1170, 360, 100, 'nginx :80', warm, { font: MONO, size: 36 })
    })
    let label!: SVGTextElement
    s.draw(1.6, 0.5, (d) => {
      label = d.pill(90, 282, 290, 60, 'localhost:8080', C.white, C.navy, 28)
    }).move([[7, 0, 0], [8, 0, 278], [13.5, 0, 278], [14.5, 0, 478], [20.5, 0, 478], [22, 0, 940]]).hide(26)
    s.tick((t) => {
      const after = t >= 8.6
      label.textContent = after ? '172.17.0.2:80' : 'localhost:8080'
      label.setAttribute('fill', after ? C.orangeDark : C.navy)
    })
    s.draw(27, 0.5, d => d.cross(680, 915, 50))
    s.draw(27.6, 0.6, d => d.text(680, 1325, '刪容器 = 拔線、清規則', { anchor: 'middle', size: 32, weight: 800, color: C.red }))

    s.sub(0, 6, '再看網路：<em>-p 8080:80</em> 之後，瀏覽器連的是主機的 8080。')
    s.sub(6, 13, '封包先遇到主機的 <em>iptables</em>，目的地被改寫成容器的 IP 和 80 port。')
    s.sub(13, 19, '接著進入 <em>docker0</em>，一台由 kernel 模擬的交換器。')
    s.sub(19, 26, '一對 <em>veth</em> 虛擬網卡像一條網路線，一端插在 docker0，一端在容器裡變成 eth0。')
    s.sub(26, 34, '容器刪掉時，這條線和 iptables 規則都要清掉，這也是要花時間的工作。')
  })

  // ───────────────────────── 重點整理 ─────────────────────────
  v.scene('|重點整理', 22, (s) => {
    const cards: [string, string][] = [
      ['容器 = 被隔離的行程', '共用主機的 Linux kernel'],
      ['namespaces 看不到別人', 'cgroups 限用量、seccomp 擋危險操作'],
      ['image 是一疊唯讀 layer', '容器只多一層可寫層'],
      ['docker run 一路經過', 'dockerd → containerd → shim → runc'],
      ['Mac / Windows 上', '容器其實跑在一台 Linux VM 裡'],
    ]
    cards.forEach(([a, b], i) => {
      const y = 260 + i * 200
      s.draw(0.6 + i * 1.6, 0.9, (d) => {
        d.rect(90, y, 900, 170, { fill: C.white, fillStyle: 'solid', stroke: C.blue, strokeWidth: 3 })
        d.circle(170, y + 85, 92, { fill: C.orange, fillStyle: 'solid', stroke: C.ink, strokeWidth: 2.5 })
        d.text(170, y + 88, String(i + 1), { anchor: 'middle', size: 46, weight: 900, color: C.navy })
        d.text(250, y + 58, a, { size: 38, weight: 800, color: C.navy })
        d.text(250, y + 116, b, { size: 30, color: C.grey, font: i === 3 ? MONO : undefined })
      })
    })
    s.draw(10.6, 0.9, d => d.pill(190, 1300, 700, 80, 'docker run，不再是黑盒子', C.orange, C.navy, 36, FONT))
    s.sub(0, 10.4, '整理一下：容器不是魔法，是 Linux kernel 的功能組合起來。')
    s.sub(10.4, 22, '下次打 docker run，你就知道底下是哪幾層在動了。')
  })
}
