---
title: Docker 60 秒
info: |
  Docker 底層入門：直式短影片（簡略版）
colorSchema: light
canvasWidth: 540
aspectRatio: 9/16
layout: vcover
transition: fade
fonts:
  provider: none
  sans: system-ui, -apple-system, "Segoe UI", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif
  mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
mdc: true
---

# 容器到底是什麼？

按下 <code>docker run</code> 之後，底下發生的事。

<Hold :ms="3500" />

::brand::

Docker 60 秒

::art::

<TitleSketch />

---
clicks: 3
---

<div class="v-eyebrow">1 / 4 · 容器 vs VM</div>

# 容器跟 VM 差在哪？

<VVmVsContainer />

<Sub :lines="[
  'VM 每一台都帶著<em>自己的 kernel</em>，像一台完整的電腦。',
  '容器沒有自己的 kernel，大家<em>共用主機那一顆</em>。',
  '所以 VM 開機要秒級，容器啟動只要毫秒級。',
  '容器不是小 VM，而是一個<em>被隔離的行程</em>。',
]" />

---
clicks: 3
---

<div class="v-eyebrow">2 / 4 · 隔離與限制</div>

# kernel 怎麼隔離行程？

<VNamespace />

<Sub :lines="[
  '同一台機器上，本來就跑著很多行程。',
  '<em>namespaces</em> 讓容器只看得到自己：它以為自己是 PID 1。',
  '<em>cgroups</em> 限制它最多能用多少記憶體和 CPU。',
  '<em>seccomp</em> 擋掉危險的系統呼叫。',
]" />

---
clicks: 5
---

<div class="v-eyebrow">3 / 4 · docker run 的路</div>

# docker run 穿過幾層？

<VChain />

<Sub :lines="[
  'docker CLI 只是 client，把指令翻成 HTTP 請求。',
  '請求經 docker.sock 送到 daemon：<em>dockerd</em>。',
  'dockerd 再請 <em>containerd</em> 管容器的生命週期。',
  'containerd 替每個容器啟動一支 <em>shim</em>。',
  '<em>runc</em> 設好 namespace 和 cgroup，clone 出你的行程。',
  'runc 建完就離開，shim 留下來當容器的 parent。',
]" />

---
clicks: 4
---

<div class="v-eyebrow">4 / 4 · Mac 與 Windows</div>

# Mac 上的容器跑在哪？

<VVm />

<Sub :lines="[
  'Mac 沒有 Linux kernel，docker 指令卻照打。',
  '指令先送到 Docker Desktop 在 macOS 上的程式。',
  '再經 <em>vsock</em> 進到一台 Linux VM，dockerd 整串都在裡面。',
  '容器其實跑在這台 VM 的 kernel 上。',
  '所以各家產品比的是：VM 開多快、吃多少記憶體、經過幾層。',
]" />

---
layout: vcover
---

# 容器 = 被隔離的行程

1. 容器共用主機的 <strong>kernel</strong>
2. <strong>namespaces</strong> 隔離、<strong>cgroups</strong> 限制
3. docker run 一路穿過 dockerd → … → runc
4. Mac / Windows 要先開一台 <strong>Linux VM</strong>

<Hold :ms="6000" />

::brand::

重點回顧
