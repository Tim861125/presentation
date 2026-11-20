---
theme: sketch
title: Kiri 快在哪
footer: Kiri · RD 技術分享
info: |
  Kiri 技術分享：用 Rust 寫的輕量容器 runtime
  丁吾心
layout: cover
---

# Kiri

用 Rust 寫、開源的容器 runtime：`docker` 指令照用，在 Ubuntu 上跑一個容器 **188 ms**，比 Docker Engine 快約 3.4 倍。

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

<div class="scene-caption">來源：Ubuntu（Docker Engine）<a href="https://github.com/libracoder/kiri/blob/main/bench/ubuntu-2026-10-26.md">bench/ubuntu-2026-10-26.md</a>；Mac（M3 Max，Docker Desktop）<a href="https://runkiri.com/benchmarks/">runkiri.com/benchmarks</a></div>

<!--
Docker：CLI → dockerd → containerd → shim → runc，最後才有 container。
[click] 一路往下，中位數 Ubuntu 約 697 ms（Docker Engine）、Mac 約 178 ms（Docker Desktop）。
[click] Kiri：CLI → kiri daemon → agent，一次 clone3 就把容器建起來，Ubuntu 188 ms、Mac 22 ms。
[click] 中間四層全部不需要，這就是快的主因。
兩組數字的機器和環境都不同，不能互相比：697／188 是 repo 裡的 Ubuntu 量測（跑在 VM 裡的 Ubuntu）；178／22 是官網 runkiri.com/benchmarks 在 M3 Max Mac 上量的，比的是 Docker Desktop。
-->

---
layout: center
---

<div class="big-quote max-w-3xl">

Kiri 是一個 <em>實作 Docker Engine API</em> 的輕量容器 runtime：你的 `docker`、Compose、buildx 不用改，底下換成 <em>一支 Rust agent</em>。

</div>

<div class="grid grid-cols-2 gap-6 mt-10 max-w-3xl">
<div class="callout blue">

**相容。** `docker` CLI、Compose、buildx、Testcontainers 直接用；`.deb`／`.rpm` 套件內附 docker CLI。

</div>
<div class="callout">

**輕。** Linux 上沒有 VM，agent 直接跑在主機 kernel；每個容器的 shim 記憶體是 0。

</div>
</div>

<!--
docker 指令本身不會建容器，它只是把指令變成 HTTP 請求送給 engine。Kiri 寫了一個新的 engine，對外講同一套 Docker Engine API，所以 docker、Compose、buildx、Testcontainers 都不用改。
差別在 API 底下：Docker 要經過 dockerd、containerd、shim、runc；Kiri 只有一支 Rust agent，一次 clone3 就把容器建好。在 Linux 上它直接用主機 kernel，也沒有 shim。
補充：Linux 上由 systemd 的 kiri.service 跑 engine，socket 在 /run/kiri/docker.sock。Apache-2.0。
-->

---
layout: section
---

<div class="eyebrow">Part 1</div>

# 為什麼這麼快

拿掉中間層，容器直接從 agent 長出來

---
clicks: 4
---

# 架構：一路直達 `clone3`

<ArchScene />

<div class="scene-caption">Linux host：沒有 VM，engine 由 systemd 的 <code>kiri.service</code> 啟動。</div>

<!--
所有 client 都只認得 Docker Engine API。
[click] kiri daemon 以 root 跑在 systemd 的 kiri.service，在 /run/kiri/docker.sock 實作這套 API。
[click] daemon 直接啟動 kiri-init 這支 Rust agent，跑在主機 kernel 上，中間沒有 VM。
[click] agent 一次 clone3（CLONE_INTO_CGROUP）建 namespaces + cgroup，容器是 agent 的直接子行程。unit 設了 Delegate=yes，cgroup 由 daemon 自己建。
[click] 所以沒有 runc、shim、dockerd，每個容器的 shim 記憶體是 0。
-->

---

# 快在哪？不是 `clone3` 本身

<div class="grid grid-cols-2 gap-6 mt-6">
<div class="callout blue">

**最後一步，兩邊一樣。** runc 最後也是請 kernel 建 namespaces 和 cgroup。這一步本身很快：建 namespaces 再 exec 0.78 ms，cgroup 1.23 ms。

</div>
<div class="callout">

**差在中間轉手幾次。** Docker 要經過 dockerd → containerd → 啟動一個 shim → 再執行 runc，每一層都是一次行程啟動或跨行程溝通。Kiri 把請求交給早就在跑的 agent，agent 直接 `clone3`。

</div>
</div>

<div class="big-quote mt-10" v-click>

像寄包裹：Docker 要經過 <em>四個窗口</em> 轉手，<br>Kiri <em>櫃檯收件後直接進倉庫</em>。

</div>

<!--
常見的誤會是「Kiri 快是因為用了 clone3」。其實 runc 最後也是請 kernel 做同一件事，這一步本身只要幾 ms，數字來自 bench/results.json 的 kernel_primitives。
Docker 慢在前面：dockerd 用 gRPC 交給 containerd，containerd 為這個容器啟動一個 shim，shim 再執行 runc。每一層都是一次行程啟動或跨行程溝通。
[click] Kiri 把這四層合成兩個早就在跑的行程：kiri daemon 收請求，kiri-init 直接 clone3。clone3 的好處是一次就把容器放進 cgroup（CLONE_INTO_CGROUP），不用另外起一支 runc。
所以快在「少了中間層」，不是快在 clone3。
-->

---

# 時間花在哪：拆開 697 ms 和 188 ms

<div class="mt-8 space-y-5 text-sm">
<div>
<div class="font-bold mb-1">Docker Engine　697 ms</div>
<div class="flex h-10 rounded overflow-hidden">
<div class="flex items-center justify-center text-white" style="width:28.7%;background:#8a8fa8">docker CLI 約 200 ms</div>
<div class="flex items-center justify-center text-white font-bold" style="width:71.3%;background:#c2413a">引擎 約 500 ms</div>
</div>
</div>
<div>
<div class="font-bold mb-1">Kiri　188 ms</div>
<div class="flex h-10 rounded overflow-hidden">
<div class="flex items-center justify-center text-white" style="width:25.5%;background:#8a8fa8">docker CLI 約 180 ms</div>
<div style="width:1.5%;background:#f5a700"></div>
<div class="flex items-center pl-2 font-bold" style="color:#b47a00">← 引擎 約 10 ms</div>
</div>
</div>
</div>

<div class="grid grid-cols-2 gap-6 mt-8" v-click>
<div class="callout">

**差距幾乎全在引擎。** 不經過 docker CLI、直接打 API：Docker Engine 跑完一個容器約 500 ms，Kiri 約 10 ms。

</div>
<div class="callout blue">

**Kiri 剩下的大多是 CLI。** docker CLI 那約 180 ms 兩邊都要付。Kiri 的 10 ms 裡，kernel 建容器只佔幾 ms，`--rm` 也不等刪網卡（18.9 ms）。

</div>
</div>

<div class="scene-caption">來源：<a href="https://github.com/libracoder/kiri/blob/main/bench/ubuntu-2026-10-26.md">bench/ubuntu-2026-10-26.md</a>「Engine-only latency」。引擎時間是扣掉 curl 成本（約 35 ms）後的估算。</div>

<!--
上一頁說快在少了中間層，這一頁拆開看時間到底花在哪。
作者另外用 curl 直接打 Docker API，不經過 docker CLI，跑一次 create、start、wait、delete。Docker Engine 531 ms，Kiri 33 到 47 ms，裡面約 35 ms 是 curl 和 jq 自己的成本。扣掉之後，Docker Engine 的引擎約 500 ms，Kiri 的引擎約 10 ms。
所以 697 ms 減 500 ms，Docker 這邊 CLI 大約 200 ms；Kiri 188 減 10，CLI 大約 180 ms。兩邊 CLI 差不多，差距幾乎全部在引擎裡。
[click] 換句話說，Kiri 已經把引擎壓到 10 ms，現在 188 ms 裡大部分是 docker CLI 自己的時間。
引擎那 10 ms 裡，真正建容器的 kernel 動作（namespaces、cgroup、overlay、veth）只要幾 ms；另外 --rm 時 Docker 會等刪 veth（18.9 ms）才回傳，Kiri 先回報結束、之後才清。
exec 也一樣：直接打 API，Docker Engine 50 ms、Kiri 17 ms（引擎約 1 ms）。但經過 CLI 後，Kiri 是 187 ms，反而比 nerdctl 的 57 ms 慢，因為 nerdctl 不走 docker CLI，直接跟 containerd 講話。
這些估算是用兩組不同的量測相減，只看數量級，不要當成精確值。
-->

---

# 對照表：Kiri 換掉了誰

<div class="[&_td]:py-1.5 [&_th]:py-1.5">

| Docker 的元件 | 白話：它在做什麼 | Kiri |
|---|---|---|
| `docker` CLI、Compose、buildx | 你打指令的工具 | **不換**，套件直接內附 |
| Docker Engine API | 工具和引擎之間的「語言」 | **不換**，Kiri 講同一套 |
| dockerd | 接請求、管網路和 volume | **kiri daemon** |
| containerd | 管容器的一生、拉映像 | kiri daemon + **kiri-init** 分攤 |
| containerd-shim | 每個容器配一個看門的行程 | **不需要**：容器直接掛在 kiri-init 底下 |
| runc | 呼叫 kernel 把容器建出來 | kiri-init 一次 **`clone3`** |
| dockerd 內建的 BuildKit | 處理 `docker build` | BuildKit 跑在一個 Kiri 容器裡 |

</div>

<div class="callout mt-4" v-click>

**一句話：** 上面兩層不動；dockerd、containerd、shim、runc 四層，合成 kiri daemon + kiri-init 兩個行程。

</div>

<!--
前兩列是「相容」：工具和 API 都沒換，所以使用者無感。
中間四列是「輕」：Docker 的四層，在 Kiri 變成兩個行程。containerd-shim 這一列最關鍵，容器是 kiri-init 的直接子行程，由它的 poll() 迴圈收輸出、回收行程，所以每個容器的 shim 記憶體是 0。
最後一列：docker build 走的是跑在 Kiri 容器裡的 BuildKit（buildx 的 docker-container driver），閒置 5 分鐘先暫停。
[click] 網路、seccomp 這些細節在後面的「實作細節」那頁。
-->

---

# 效能數字：要看量測條件

Ubuntu 24.04、16 核 x86-64、32 GB，同一支 docker CLI，30 次取中位數（2026-10-26）：

| 引擎 | `run --rm alpine true` | `exec … true` | 1 GB bind mount 讀 |
|---|---:|---:|---:|
| **Kiri** | **188 ms** | 187 ms | **3851 MB/s** |
| Docker Engine | 697 ms | 224 ms | 1307 MB/s |
| Podman | 1105 ms | 274 ms | 907 MB/s |
| nerdctl | 631 ms | **57 ms** | 1485 MB/s |

<div class="callout mt-6" v-click>

**條件要講清楚：** 這台不是 bare metal，作者註明腳本可原封不動在原生 Ubuntu 重跑。啟動快約 **3.4 倍**，但 `exec` 比 nerdctl 慢約 3 倍。

</div>

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

**安全邊界：** 就算 `--privileged`，seccomp 仍會擋掉 `AF_VSOCK` socket 和 io_uring。

</div>

---
layout: section
---

<div class="eyebrow">Part 2</div>

# 安裝與上手

裝套件、授權使用者，就能用 docker 指令

---
clicks: 4
---

# 第一次啟動做了什麼

<FlowScene
  :steps="['sudo apt install\n./kiri_*.deb', 'sudo kiri\nhost-access $USER', 'docker run …', '打開 web.\nkiri.localhost']"
  :notes="['裝完不啟動任何東西', '加入 kiri 群組、啟動 engine', '套件的 docker 預設連 Kiri', '不用記 port']"
  result="docker 指令一個字都不用改"
/>

<div class="scene-caption">Ubuntu 流程（Fedora 用 <code>.rpm</code>）。<code>kiri</code> 套件內附 docker CLI、Compose、buildx；<code>kiri-lite</code> 只有 engine。</div>

<!--
[click] 裝 .deb：放好 /usr/bin/kiri、kiri-init、kiri.service，但不啟動任何東西。
[click] sudo kiri host-access $USER：建 kiri 群組、把你加進去、啟動並設成開機啟動 engine。
[click] 套件的 docker（update-alternatives，只在 /usr/bin/docker 不存在時）預設就連 /run/kiri/docker.sock。
[click] 容器用 <name>.kiri.localhost 開。結論：工作流程不用改。
-->

---

# 裝在 Linux 上的東西

| 項目 | 位置 |
|---|---|
| engine | systemd `kiri.service`（`kiri daemon`，以 root 執行） |
| API socket | `/run/kiri/docker.sock`（0660 root:kiri） |
| 映像與容器 | `/var/lib/kiri`；狀態在 `/var/lib/kiri-daemon` |
| docker CLI | `/usr/libexec/kiri/docker`，`/usr/bin/docker` 沒被占用才接上 |
| 更新／移除 | apt／dnf 簽章套件庫；`apt remove` 保留資料，`apt purge` 才刪 |

<div class="callout mt-6" v-click>

**權限：** 被授權的使用者會加進 `kiri` 群組，這**等同 root**，和 `docker` 群組一樣。

</div>

---

# 兩種下指令的方式

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### 透過 docker context

```sh
# Linux 套件不會自動建 context，先建一次
docker context create kiri \
  --docker host=unix:///run/kiri/docker.sock

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

**Gotcha：** Linux 上沒有 `kiri update`，打了會變成 `docker update`（改容器設定）。更新請用 `sudo apt upgrade` 或 `sudo dnf upgrade`。

</div>

---
layout: section
---

<div class="eyebrow">Part 3</div>

# 開發體驗

用名字連容器，不用記 port

---
clicks: 4
---

# `http://web.kiri.localhost` 怎麼找到容器

<DomainScene />

<div class="scene-caption">不用另外架 DNS：<code>*.localhost</code> 本來就指向 127.0.0.1，router 只聽 loopback。</div>

<!--
瀏覽器打 http://web.kiri.localhost。
[click] *.localhost 由瀏覽器或 systemd-resolved 直接解析成 127.0.0.1，Kiri 不用動系統 DNS 設定。
[click] 連到 daemon 在 127.0.0.1:80 的 router，看 Host header。Linux 上 router 只聽 loopback，只服務本機。
[click] 挑到名為 web 的容器。
[click] Linux 目前只有 HTTP：原始碼寫明「HTTPS for containers isn't on Linux yet」（daemon/tls.rs）。
-->

---

# 網域、Build 與 Linux 整合

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### 自訂網域：Compose label

```yaml
services:
  api:
    image: my-api
    labels:
      dev.kiri.domain: api.myapp
      # → http://api.myapp.kiri.localhost
```

Compose service 預設是 `<service>.<project>.kiri.localhost`。

</div>
<div class="text-sm">

### Linux 整合

- 視窗是原生 GTK + WebKitGTK，不是 Electron（只有 x86-64 的 `kiri` 套件有）
- 容器內 SSH agent：`/run/host-services/ssh-auth.sock`
- `/var/run/docker.sock` 沒被占用時也接到 Kiri，Testcontainers、docker-py 直接能用
- k8s 的 LoadBalancer 發佈在 `localhost`

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

k8s、Linux 機器、分享、USB

---

# 一行指令

| 指令 | 做什麼 | 備註 |
|---|---|---|
| `kiri k8s start --use` | 單節點 k3s，約 20 秒就緒 | LoadBalancer 發佈在 `localhost` |
| `kiri machine create dev` | 持續執行的 distro，帶你的使用者和 sudo | ubuntu / debian / fedora / arch… |
| `kiri 3000` | 本機 port 變成公開 HTTPS 網址 | 類似 ngrok |
| `kiri usb attach <DEVICE>` | USB 裝置交給容器（beta） | Linux 主機原生看得到裝置 |

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

# k8s 與 machine

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### Kubernetes（k3s）

```sh
kiri k8s start --use     # 寫入 kubectl context: kiri
kubectl get nodes
kiri k8s set --lan on    # API server 開到區網
kiri k8s delete          # 連狀態 volume 一起刪
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

**Gotcha：** machine 會帶著你的使用者和 sudo，並把主機的 `/home` 掛在同一個路徑；`stop`／`start`／`restart` 都要帶 NAME。

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
| `exec` 延遲 | 187 ms，比 nerdctl（57 ms）慢約 3 倍 |
| 容器 HTTPS 網域 | Linux 還沒有，只能用 HTTP |
| `kiri share` | 服務直接公開到網路，edge 不開源 |
| 成熟度 | v0.2.1、官網標 Beta，repo 2026-11-02 才公開 |

<div class="callout mt-4" v-click>

**一句話：** 啟動延遲很強，但吞吐量型的工作負載（大量走 published port 的網路傳輸）要自己量。

</div>

---
layout: section
---

<div class="eyebrow">Takeaways</div>

# 一句話總結

<div class="text-left max-w-2xl mx-auto mt-8 text-lg leading-relaxed">

1. **相容：** 實作 Docker Engine API，`docker`、Compose、buildx 照用
2. **快的原因：** agent 一次 `clone3`，沒有 runc／shim／dockerd；Linux 上連 VM 都沒有
3. **開發體驗：** `*.kiri.localhost` 用名字連容器，k8s、machine、share 都是一行指令
4. **看條件：** Ubuntu 上啟動比 Docker Engine 快約 3.4 倍；吞吐量和成熟度還要觀察

</div>

---

# 參考資料

- Kiri GitHub repo：[github.com/libracoder/kiri](https://github.com/libracoder/kiri)（查證時 HEAD `36923b2`）
- 官網與下載：[runkiri.com/releases](https://runkiri.com/releases/)
- Ubuntu 量測：[bench/ubuntu-2026-10-26.md](https://github.com/libracoder/kiri/blob/main/bench/ubuntu-2026-10-26.md)
- Linux 套件說明：[packaging/README.md](https://github.com/libracoder/kiri/blob/main/packaging/README.md)
- 功能清單：[docs/features.md](https://github.com/libracoder/kiri/blob/main/docs/features.md)
- 架構與開發說明：[docs/development.md](https://github.com/libracoder/kiri/blob/main/docs/development.md)
- Kiri Share：[runkiri.com/share](https://runkiri.com/share/)
