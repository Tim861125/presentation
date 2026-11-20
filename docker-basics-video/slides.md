---
theme: sketch
title: Docker 底層入門（影片）
footer: false
info: |
  Docker 底層入門：直式短影片（詳細版）
canvasWidth: 540
aspectRatio: 9/16
layout: vcover
transition: fade
---

# docker run 底下發生什麼事？

從 VM 到 veth，一次看懂容器怎麼跑起來。

<Hold :ms="3500" />

::brand::

Docker 底層入門

::art::

<TitleSketch />

---
clicks: 3
---

<div class="v-eyebrow">1 / 6 · 容器 vs VM</div>

# 容器跟 VM 差在哪？

<VVmVsContainer />

<Sub :lines="[
  'VM 每一台都帶著<em>自己的 kernel</em>，像一台完整的電腦。',
  '容器沒有自己的 kernel，大家<em>共用主機那一顆</em>。',
  '所以 VM 開機要秒級，容器啟動只要毫秒級。',
  '容器不是小 VM，而是一個<em>被隔離的行程</em>。',
]" />

---
clicks: 2
---

<div class="v-eyebrow">一句話定義</div>

# 那容器到底是什麼？

<div class="vquote">

容器 = 一個被 <em>隔離</em>、被 <em>限制</em> 的普通 Linux 行程。

</div>

<div class="callout blue vcard" v-click>

**隔離（namespaces）** 讓行程以為整台機器只有自己。

</div>

<div class="callout vcard" v-click>

**限制（cgroups）** 規定它最多用多少 CPU、記憶體。

</div>

<Sub :lines="[
  '兩件事都是 Linux kernel 本來就有的功能。',
  '第一件：<em>隔離</em>，看不到別人。',
  '第二件：<em>限制</em>，用不了太多。Docker 只是把它們包得好用。',
]" />

---
clicks: 3
---

<div class="v-eyebrow">2 / 6 · Image 與 Container</div>

# image 是一疊唯讀 layer

<VLayer />

<Sub :lines="[
  'image 是一疊<em>唯讀的 layer</em>，Dockerfile 每一行疊一層。',
  '每個容器在上面多一層自己的<em>可寫層</em>，image 本身不動。',
  '第一次改某個檔案時，才把它<em>複製上來</em>（copy-on-write）。',
  '刪掉容器，可寫層就跟著消失；要留資料請用 volume。',
]" />

---
clicks: 3
---

<div class="v-eyebrow">3 / 6 · 隔離與限制</div>

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

<div class="v-eyebrow">4 / 6 · docker run 的路</div>

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

<div class="v-eyebrow">5 / 6 · Mac 與 Windows</div>

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
clicks: 4
---

<div class="v-eyebrow">6 / 6 · 網路</div>

# -p 8080:80 怎麼連進去？

<VNet />

<Sub :lines="[
  '<em>-p 8080:80</em>：瀏覽器連的是主機的 8080。',
  '主機的 <em>iptables</em> 把 8080 改寫成容器的 IP 和 80 port。',
  '封包進到 <em>docker0</em>，一台虛擬交換器。',
  '一對 <em>veth</em> 虛擬網卡把它接進容器，nginx 收到了。',
  '容器刪掉時，veth 和規則也要一起清掉。',
]" />

---
layout: vcover
---

# 容器 = 被隔離的行程

1. 容器共用主機的 <strong>kernel</strong>
2. image 是唯讀 layer，容器多一層<strong>可寫層</strong>
3. <strong>namespaces</strong> 隔離、<strong>cgroups</strong> 限制、<strong>seccomp</strong> 過濾
4. docker run 一路穿過 dockerd → … → runc
5. Mac / Windows 要先開一台 <strong>Linux VM</strong>

<Hold :ms="7000" />

::brand::

重點回顧
