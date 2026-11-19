---
title: Kiri
info: |
  Kiri 技術分享：用 Rust 寫的輕量容器 runtime
  丁吾心
colorSchema: light
layout: cover
transition: slide-left
fonts:
  provider: none
  sans: system-ui, -apple-system, "Segoe UI", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif
  mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace
mdc: true
---

# Kiri

用 Rust 寫、開源的 Docker Desktop 替代品：`docker` 指令照用，容器 **22 ms** 就跑完。

丁吾心 · RD 技術分享

::brand::

RD Tech Talk

::art::

<TitleSketch />

<!--
Kiri 是伊博語 ntakịrị「小」的意思。今天全場用同一個例子：docker run --rm alpine true。
-->

---
clicks: 3
---

# 問題：一個 `docker run` 要穿過幾層？

<ProblemScene />

<div class="scene-caption">同一個 <code>docker run --rm alpine true</code>，官網量測（2 CPU／8 GB、M3 Max）的中位數。</div>

<!--
Docker Desktop：CLI → dockerd → containerd → shim → runc，最後才有 container。
[click] 一路往下，中位數約 178 ms。
[click] Kiri：CLI → kiri daemon → VM 裡的 agent，一次 clone3 就把容器建起來，22 ms。
[click] 中間四層全部不需要，這就是快的主因。
-->

---
layout: center
---

<div class="big-quote max-w-3xl">

Kiri 是一個 <em>實作 Docker Engine API</em> 的輕量容器 runtime：你的 `docker`、Compose、buildx 不用改，底下換成 <em>一支 Rust agent</em>。

</div>

<div class="grid grid-cols-2 gap-6 mt-10 max-w-3xl">
<div class="callout blue">

**相容。** `docker` CLI、Compose、buildx、Testcontainers 直接用；Apple silicon 上 amd64 走 Rosetta。

</div>
<div class="callout">

**輕。** engine 常駐約 10 MB；沒有容器在跑 60 秒就休眠，約 0.1 秒喚醒。

</div>
</div>

<!--
Mac / Windows 跑在一台很小的 Linux VM，Linux 直接用主機 kernel。Apache-2.0。
-->

---
layout: section
---

<div class="eyebrow">Part 1</div>

# 為什麼這麼快

拿掉中間層，連 kernel 都自己裁

---
clicks: 4
---

# 架構：一路直達 `clone3`

<ArchScene />

<div class="scene-caption">macOS 為例。Windows 經 named pipe 進 WSL2；Linux 沒有 VM，agent 直接跑在主機 kernel。</div>

<!--
所有 client 都只認得 Docker Engine API。
[click] kiri daemon 在 host 上實作這套 API，並擁有 VM。
[click] daemon 經 vsock 和 VM 溝通（來回 p50 31 µs）。VM 用自製 10 MB kernel，PID 1 就是 Rust agent。
[click] agent 一次 clone3（CLONE_INTO_CGROUP）建 namespaces + cgroup，容器是 agent 的直接子行程。
[click] 所以沒有 runc、shim、dockerd，每個容器的 shim 記憶體是 0。
-->

---

# 效能數字：要看量測條件

`alpine true` 跑完即刪，中位數。官網 2026-11-02 量測，每個引擎都限制 2 CPU／8 GB：

| 引擎 | `docker run --rm` | Docker Engine API |
|---|---:|---:|
| **Kiri** | **22 ms** | **3.1 ms** |
| Docker Desktop | 178 ms | 163 ms |
| OrbStack | 279 ms | 238 ms |
| Colima | 152 ms | 88 ms |

<div class="callout mt-6" v-click>

**README 寫的「2.5 ms、80 倍」是較早的量測**：當時 OrbStack 機器上還跑著 86 個容器加 k8s。簡報與比較請用官網這組，約 **8 倍**。

</div>

---
clicks: 4
---

# 開機最佳化：810 → 112 ms

<BootScene />

<div class="scene-caption">VM 冷開機到 agent ready 的中位數（<code>bench/results.json</code> 的 <code>boot_journey</code>）。kernel 從 32 MB 裁到 10 MB。</div>

<!--
從 stock defconfig 的 810 ms 開始。
[click] 改從 allnoconfig 往上加，只留需要的驅動：175 ms。
[click] expedited RCU 讓 cgroup2 mount 從 23 ms 降到 0.1 ms：140 ms。
[click] 再 patch virtio-pci reset，改用 hrtimer 輪詢：112 ms。
[click] kernel 開到 PID 1 本身只要 8 ms。
-->

---

# 實作細節：每一步都自己來

| 環節 | 常見做法 | Kiri |
|---|---|---|
| 建容器 | runc + shim | agent 一次 `clone3`（`CLONE_INTO_CGROUP`） |
| 網路設定 | 呼叫 `ip` / `iptables` | 手寫 rtnetlink、nf_tables 訊息 |
| seccomp | allow list | 手寫 BPF **deny list**，指令更少 |
| `--rm` 回傳 | 等刪 veth（約 18.9 ms） | 先回報結束，之後才清 |
| 每容器常駐 | shim 約 7.9 MB（OrbStack） | **0** |

<div class="callout mt-6" v-click>

**安全邊界：** 就算 `--privileged`，容器也拿不到 `AF_VSOCK` 和 io_uring，碰不到和 host 溝通的通道。

</div>

---
layout: section
---

<div class="eyebrow">Part 2</div>

# 安裝與上手

裝完就有 `kiri` context

---
clicks: 4
---

# 第一次啟動做了什麼

<FlowScene
  :steps="['下載安裝檔\n.dmg / .msi / .deb', 'kiri setup\n建 kiri context', 'docker --context\nkiri run …', '打開\nweb.kiri.local']"
  :notes="['runkiri.com/releases', '+ LaunchAgent、builder', '原本的指令照打', '不用記 port']"
  result="docker 指令一個字都不用改"
/>

<div class="scene-caption">macOS 流程。Kiri 版內附 docker CLI、Compose、buildx；Kiri Lite 只有 engine。</div>

<!--
[click] 打開 Kiri.app 會執行 kiri setup：建 docker context、LaunchAgent、build 用的 builder。
[click] 之後 docker --context kiri，或 docker context use kiri。
[click] 第一次會問要不要啟用 *.kiri.local 網域。
[click] 結論：工作流程不用改。
-->

---

# 三個平台，三種跑法

| 平台 | 容器跑在哪 | API 入口 | 第一次啟用 |
|---|---|---|---|
| **macOS 14+** | 自製 kernel 的小 VM | `~/.kiri/run/docker.sock` | 打開 `Kiri.app` |
| **Windows 10/11** | WSL2 裡的 Kiri distro | named pipe `//./pipe/kiri` | MSI（per-user） |
| **Linux** | 直接用主機 kernel | `/run/kiri/docker.sock` | `sudo kiri host-access $USER` |

<div class="callout mt-6" v-click>

**Linux：** 裝套件本身不啟動任何東西。被授權的使用者會加進 `kiri` 群組，這**等同 root**，和 `docker` 群組一樣。

</div>

---

# 兩種下指令的方式

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### 透過 docker context

```sh
# 每次指定
docker --context kiri run --rm alpine true
docker --context kiri compose up -d

# 或設成預設
docker context use kiri
docker ps
```

</div>
<div>

### 透過 kiri 子指令

```sh
# 永遠指向 Kiri，不受目前 context 影響
kiri run --rm alpine true
kiri run -d --name web nginx
kiri compose up -d
kiri logs -f web
```

</div>
</div>

<div class="callout mt-6" v-click>

**Gotcha：** `kiri update` 只有 macOS 有。Linux／Windows 上打 `kiri update` 會變成 `docker update`（改容器設定）。Linux 請用 apt／dnf 更新。

</div>

---
layout: section
---

<div class="eyebrow">Part 3</div>

# 開發體驗

用名字連容器，還有 HTTPS

---
clicks: 4
---

# `http://web.kiri.local` 怎麼找到容器

<DomainScene />

<div class="scene-caption">整條路都不需要 root：DNS 在高 port，router 依網址挑容器。</div>

<!--
瀏覽器打 http://web.kiri.local。
[click] macOS 透過 /etc/resolver/kiri.local 問 daemon 的小 DNS（127.0.0.1:53535），所有 *.kiri.local 都回 127.0.0.1。
[click] 連到 daemon 監聽 80/443 的 router，HTTP 看 Host header，HTTPS 看 SNI。
[click] 挑到名為 web 的容器。
[click] HTTPS 憑證由 Kiri 自己的 CA 簽，CA 有 name constraints，就算被信任也冒充不了其他網站。
-->

---

# 網域、Build 與 Mac 整合

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### 自訂網域：Compose label

```yaml
services:
  api:
    image: my-api
    labels:
      dev.kiri.domain: api.myapp
      # → http://api.myapp.kiri.local
```

Compose service 預設是 `<service>.<project>.kiri.local`。

</div>
<div class="text-sm">

### Mac 整合

- `~/Kiri`：Finder 直接看容器檔案（daemon 自己寫的唯讀 NFSv3 server）
- 容器內 SSH agent：`/run/host-services/ssh-auth.sock`
- 視窗是原生 AppKit + WebKit，不是 Electron
- 記憶體 balloon 把用不到的還給 macOS；休眠時整台 VM 釋放

</div>
</div>

<div class="callout mt-6" v-click>

**Build：** BuildKit 跑在 Kiri 容器裡，閒置 5 分鐘先暫停，下次 build 約 1 秒就能開始，cache 還在。`kiri build-with kiri|docker` 切換。

</div>

---
layout: section
---

<div class="eyebrow">Part 4</div>

# 一行指令的附加功能

k8s、Linux 機器、搬家、分享、USB

---

# 一行指令

| 指令 | 做什麼 | 備註 |
|---|---|---|
| `kiri k8s start --use` | 單節點 k3s，約 20 秒就緒 | LoadBalancer 發佈在 `localhost` |
| `kiri machine create dev` | 持續執行的 distro，帶你的使用者和 sudo | ubuntu / debian / fedora / arch… |
| `kiri import orbstack` | 搬 images、volumes、containers | 來源唯讀；只有 macOS |
| `kiri 3000` | 本機 port 變成公開 HTTPS 網址 | 類似 ngrok |
| `kiri usb attach <DEVICE>` | USB 裝置交給容器（beta） | Mac 走 USB/IP |

---
clicks: 4
---

# `kiri 3000`：不用開防火牆的分享

<ShareScene />

<div class="scene-caption">先 <code>kiri share login</code>（GitHub device flow），之後一行就有公開網址。</div>

<!--
本機有個 app 開在 3000。
[click] kiri 3000 由本機主動連出一條 TLS 到 Kiri Share edge，所以在 NAT 後面也行。
[click] 訪客打 https://demo.runkiri.cloud。
[click] 每個訪客連線都是這條 TLS 上的一個編號 stream，用 window credit 做流量控制。
[click] 訪客第一次會看到警告頁防釣魚；edge 是官方託管、不開源。
-->

---

# k8s、machine、import

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### Kubernetes（k3s）

```sh
kiri k8s start --use     # 寫入 kubectl context: kiri
kubectl get nodes
kiri k8s set --lan on    # API server 開到區網
kiri k8s delete          # 連狀態 volume 一起刪
```

### 從別的引擎搬家（macOS）

```sh
kiri import --list
kiri import desktop-linux
```

</div>
<div>

### Linux 機器

```sh
kiri machine create dev --distro ubuntu
kiri machine create box --distro fedora --systemd
kiri machine shell dev -- uname -a
kiri machine stop dev    # start / restart 也要帶 NAME
kiri machine delete dev
```

</div>
</div>

<div class="callout mt-6" v-click>

**Gotcha：** import 搬過來的容器是**停止狀態**，要自己啟動。machine 掛載家目錄：Mac 是 `/Users`，Linux 是 `/home`。

</div>

---
layout: section
---

<div class="eyebrow">Part 5</div>

# 限制與注意

0.x、Beta，導入前先看這頁

---

# 目前的限制

| 項目 | 狀況 |
|---|---|
| BuildKit `--add-host x:host-gateway` | 會失敗；寫死 IP 或 `DOCKER_BUILDKIT=0`，內建 builder 在 roadmap |
| published port 吞吐量 | 約 Docker Engine 的 **1/10**（user-space relay） |
| Mac bind mount 讀取 | 1724 MB/s，落後 Colima、OrbStack |
| Windows 安裝檔 | 尚未簽章，SmartScreen 會警告 |
| `kiri share` | 服務直接公開到網路，edge 不開源 |
| 成熟度 | v0.2.1、官網標 Beta，repo 2026-11-02 才公開 |

<div class="callout mt-4" v-click>

**一句話：** 啟動延遲很強，但吞吐量型的工作負載（大量網路、Mac 上大量讀檔）要自己量。

</div>

---
layout: section
---

<div class="eyebrow">Takeaways</div>

# 一句話總結

<div class="text-left max-w-2xl mx-auto mt-8 text-lg leading-relaxed">

1. **相容：** 實作 Docker Engine API，`docker`、Compose、buildx 照用
2. **快的原因：** agent 一次 `clone3`，沒有 runc／shim／dockerd，kernel 自己裁到 112 ms 開機
3. **開發體驗：** `*.kiri.local` + HTTPS，k8s、machine、share 都是一行指令
4. **看條件：** 官網公平量測約 8 倍；吞吐量和成熟度還要觀察

</div>

---

# 參考資料

- Kiri GitHub repo：[github.com/libracoder/kiri](https://github.com/libracoder/kiri)（查證時 HEAD `36923b2`）
- 官網與下載：[runkiri.com/releases](https://runkiri.com/releases/)
- 官方 benchmark：[runkiri.com/benchmarks](https://runkiri.com/benchmarks/)
- 功能清單：[docs/features.md](https://github.com/libracoder/kiri/blob/main/docs/features.md)
- 架構與開發說明：[docs/development.md](https://github.com/libracoder/kiri/blob/main/docs/development.md)
- 量測原始資料：[bench/results.json](https://github.com/libracoder/kiri/blob/main/bench/results.json)
- Kiri Share：[runkiri.com/share](https://runkiri.com/share/)
