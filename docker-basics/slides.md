---
theme: sketch
title: Docker 底層入門
footer: Docker 底層入門 · RD 技術分享
info: |
  Docker 底層入門：docker run 底下發生什麼事
  丁吾心
layout: cover
---

# Docker 底層入門

按下 `docker run` 之後，底下其實是 **一個被隔離的 Linux process**。看懂這件事，Docker 的其他東西就都說得通了。

丁吾心 · RD 技術分享

::brand::

RD Tech Talk

::art::

<TitleSketch />

<!--
全場用同一個例子：docker run --rm alpine true（跑一個 alpine 容器，執行 true，跑完就刪）。
-->

---
clicks: 3
---

# 問題：容器跟 VM 差在哪？

<VmVsContainerScene />

<div class="scene-caption">很多人把容器想成「比較小的 VM」，這是最常見的誤解。</div>

<!--
VM：每台都有自己的 guest kernel，下面靠 hypervisor 模擬硬體。
[click] 容器：沒有自己的 kernel，所有容器共用主機那一顆 Linux kernel。
[click] 所以 VM 開機要秒級；容器啟動只是開一個 process，毫秒級。
[click] 結論：容器不是小 VM，是被 kernel 隔離起來的 process。
-->

---
layout: center
---

<div class="big-quote max-w-3xl">

容器 = 一個被 <em>隔離</em>、被 <em>限制</em> 的普通 Linux process；Docker 是幫你 <em>打包</em> 和 <em>啟動</em> 它的一整套工具。

</div>

<div class="grid grid-cols-2 gap-6 mt-10 max-w-3xl">
<div class="callout blue">

**隔離（namespaces）。** 讓 process 以為整台機器只有自己：自己的 PID 1、自己的網路、自己的檔案系統。

</div>
<div class="callout">

**限制（cgroups）。** 規定 process 最多用多少 CPU、記憶體、IO，免得一個容器拖垮整台機器。

</div>
</div>

<!--
兩件事都是 Linux kernel 本來就有的功能，Docker 沒有發明新東西，是把它們包得很好用。
-->

---
layout: section
---

<div class="eyebrow">Part 1</div>

# Image 與 Container

先看「打包」：容器的檔案從哪來

---
clicks: 3
---

# Image 是一疊唯讀 layer

<LayerScene />

<div class="scene-caption">Docker 預設的 storage driver 是 <code>overlay2</code>，用 Linux 的 overlayfs 把這幾層疊成一個檔案系統。</div>

<!--
image 由下往上疊：基底 alpine、裝 curl、複製程式。每層只記錄和上一層的差異，全部唯讀。
[click] 每個容器在最上面加一層自己的可寫層。兩個容器共用同一份 image。
[click] 容器第一次修改某個檔案時，才把它從下層複製（copy_up）到可寫層。沒改的檔案不複製，所以啟動很快、很省空間。
[click] 刪容器時，可寫層一起丟掉，image 不變。要保留資料就用 volume 或 bind mount。
-->

---

# Dockerfile 與名詞

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### 一條指令 = 一層

```dockerfile
FROM alpine:3.20        # 基底 layer
RUN apk add curl        # 新增一層
COPY app /app           # 再一層
CMD ["/app/server"]     # 只是設定，不產生檔案
```

```sh
docker build -t my-app .
docker run --rm alpine true
```

</div>
<div>

| 名詞 | 一句話 |
|---|---|
| **image** | 唯讀模板，一疊 layer |
| **container** | image + 可寫層 + 一個 process |
| **registry** | 放 image 的地方，例如 Docker Hub |
| **volume** | Docker 管理的資料區，刪容器也在 |
| **bind mount** | 把主機資料夾直接掛進容器 |

</div>
</div>

<div class="callout mt-6" v-click>

**`--rm` 是什麼：** 容器結束後自動刪掉，包含可寫層。`docker run --rm alpine true` 就是「起一個容器、執行 `true`、馬上結束、刪掉」，所以很適合拿來量啟動速度。

</div>

---
layout: section
---

<div class="eyebrow">Part 2</div>

# 容器其實是 process

Linux kernel 的四個機制

---
clicks: 3
---

# 同一顆 kernel，各自的世界

<NamespaceScene />

<div class="scene-caption">在主機上 <code>ps aux</code> 看得到容器裡的 process；在容器裡 <code>ps</code> 只看得到自己。</div>

<!--
只有一顆 Linux kernel，主機上本來就有 systemd、sshd、dockerd 等 process。
[click] 容器 A、B 各自有一組 namespaces：pid、net、mnt、uts。容器裡的 sh 覺得自己是 PID 1，主機看它其實是 PID 24817。
[click] cgroup 限制每個容器最多用多少記憶體、CPU。
[click] seccomp 擋在容器和 kernel 之間，過濾危險的 syscall。
-->

---

# 四個機制

| 機制 | 管什麼 | 例子 |
|---|---|---|
| **namespaces** | 看得到什麼 | `pid` process、`net` 網路、`mnt` 檔案系統、`uts` hostname、`ipc`、`user`、`cgroup` |
| **cgroups** | 能用多少 | `--memory 256m`、`--cpus 0.5`、`--pids-limit` |
| **seccomp** | 能呼叫哪些 syscall | Docker 預設是 **allowlist**，300 多個 syscall 中擋掉約 44 個 |
| **capabilities** | root 能做哪些事 | 預設只留必要的；`--privileged` 幾乎全開 |

<div class="callout mt-6" v-click>

**建立方式：** kernel 用 `clone()` 開新 process 時，帶 `CLONE_NEWPID`、`CLONE_NEWNET`… 旗標就會開新的 namespaces。新版的 `clone3` 還能用 `CLONE_INTO_CGROUP`，**一次就把 process 放進 cgroup**。

</div>

---

# 不用 Docker 也能做出容器

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### 用 `unshare` 手動開 namespaces

```sh
# 開新的 pid / mount / uts namespace
sudo unshare --pid --fork --mount-proc --uts sh

# 在裡面：
hostname box   # 只改到自己的 hostname
ps             # 只看到 sh 和 ps
#   PID  CMD
#     1  sh
#     2  ps
```

</div>
<div>

### Docker 幫你多做的事

```sh
docker run --rm --memory 256m --cpus 0.5 \
  --hostname box alpine true

# --memory / --cpus → cgroup
# --hostname        → uts namespace
# 另外自動：換 rootfs（image）、
# 接網路、套 seccomp、拿掉 capabilities
```

</div>
</div>

<div class="callout mt-6" v-click>

**重點：** 容器的隔離是 kernel 做的，Docker 只是幫你「設定好再呼叫」。所以 runtime 可以換：只要能把同樣的 namespaces、cgroup、seccomp 設好，誰來呼叫都行。

</div>

---
clicks: 7
---

# 拆解這行指令

<CmdAnatomyScene />

<div class="scene-caption">參數說明依 <code>man unshare</code>、<code>man pid_namespaces</code>、<code>man uts_namespaces</code>。</div>

<!--
一行指令，7 個零件，從左到右拆。
[click] sudo：superuser do，用 root 執行。建立 namespace 需要 CAP_SYS_ADMIN，沒有就是 Operation not permitted。
[click] unshare：字面就是「不再共用」。process 預設跟父 process 共用 namespaces，unshare 把指定的換成新的，再執行後面的程式。
[click] --pid：新的 PID namespace，裡面從 1 開始編號。
[click] --fork：重點。unshare 自己不會搬進新的 PID namespace，它之後生的第一個子 process 才是那裡的 PID 1。不加的話 sh 不是 PID 1，第一個子 process 結束後，再開 process 會 ENOMEM。
[click] --mount-proc：ps 讀 /proc 列 process。不重掛，ps 看到的是主機的 /proc。這個選項會順便開 mount namespace，只換掉裡面的 /proc。
[click] --uts：UNIX Time-Sharing，名稱來自 uname 的 utsname 結構；隔離 hostname 和 NIS domain name。
[click] sh：要跑的程式，可以換成任何程式；不寫就跑 $SHELL。
-->

---
clicks: 4
---

# 剛剛的指令做了什麼

<div class="cmd-strip">
  <code :class="$clicks === 1 ? 'on' : ''">$ sudo unshare --pid --fork --mount-proc --uts sh</code>
  <code :class="$clicks === 2 ? 'on' : ''">$ ps</code>
  <code :class="$clicks === 3 ? 'on' : ''">$ hostname box</code>
</div>

<UnshareScene />

<div class="scene-caption">上方是上一頁的指令，每畫一步就亮起對應的那一行。</div>

<!--
主機上原本的 shell 打 ps aux，systemd、sshd、dockerd、你自己的 bash，全部看得到。
[click] 用 unshare 開新的 pid、mnt、uts namespace，再在裡面跑一個 sh。這個 sh 自己看是 PID 1，主機看只是 PID 3105。
[click] 在裡面打 ps，只看到 sh 和 ps 自己，主機的其他 process 都看不到。
[click] 在裡面改 hostname 叫 box，只有裡面變了，主機還是 my-pc。這就是 uts namespace。
[click] 這已經是一個最陽春的容器。Docker 只是再幫你加上 cgroup 限制、image 的檔案、網路、seccomp。
-->

---
layout: section
---

<div class="eyebrow">Part 3</div>

# 一個 docker run 穿過幾層

client、daemon、runtime

---
clicks: 5
---

# `docker run --rm alpine true` 的路

<ChainScene />

<div class="scene-caption">在 Linux 主機上的標準 Docker Engine。每一層都是一支獨立的程式。</div>

<!--
docker CLI 只是 client，它把指令翻成 HTTP 請求，送到 /var/run/docker.sock。
[click] dockerd 是 daemon，實作 Docker Engine API，管 image、網路、volume。
[click] dockerd 用 gRPC 請 containerd 管容器生命週期。
[click] containerd 為每個容器啟動一支 shim。
[click] shim 執行 runc；runc 設好 namespace、cgroup、seccomp，clone 出你的 process。
[click] runc 建完就結束，shim 留下來當容器的 parent：收 exit code、保留 stdout。這樣 dockerd 重啟也不會殺掉容器。
-->

---

# 每一層在做什麼

| 元件 | 角色 | 一直在跑？ |
|---|---|---|
| `docker` CLI | client，把指令變成 Engine API 請求 | 否，指令跑完就結束 |
| `dockerd` | daemon，實作 **Docker Engine API**，管 image / network / volume | 是 |
| `containerd` | 管容器生命週期、拉 image、管快照 | 是 |
| `containerd-shim` | 每個容器一支，當容器的 parent | 是，**每個容器一支** |
| `runc` | OCI runtime，真正呼叫 `clone` 建容器 | 否，建完就結束 |

<div class="callout mt-6" v-click>

**為什麼分這麼多層：** 分工清楚，runtime 可以換（runc 換成別的 OCI runtime）；shim 讓 dockerd、containerd 重啟時容器不會被殺掉。代價是每多一層就多一次程式間溝通，每個容器也多一支常駐的 shim。

</div>

---

# Engine API 其實就是 HTTP

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### 不用 docker CLI 也能操作

```sh
# 列出容器 = docker ps
curl --unix-socket /var/run/docker.sock \
  http://localhost/containers/json

# CLI 只是幫你發 HTTP 請求
docker ps
```

所有工具都講同一套 API：`docker` CLI、Compose、buildx、Testcontainers、各種 GUI。

</div>
<div>

### docker context：要連哪個 daemon

```sh
docker context ls
# NAME       DOCKER ENDPOINT
# default    unix:///var/run/docker.sock
# remote     ssh://me@build-server

docker --context remote ps  # 只有這次
docker context use remote   # 改預設
export DOCKER_HOST=unix:///...   # 環境變數
```

</div>
</div>

<div class="callout mt-6" v-click>

**安全：** dockerd 以 root 執行，**能寫這個 socket 就等於 root**。Linux 上把人加進 `docker` 群組就是給他 root 權限。

</div>

---
layout: section
---

<div class="eyebrow">Part 4</div>

# Mac 和 Windows 上的 Docker

沒有 Linux kernel，就先開一台 VM

---
clicks: 4
---

# 容器其實跑在一台 Linux VM 裡

<VmScene />

<div class="scene-caption">以 macOS 上的 Docker Desktop 為例。Windows 用 WSL2 這台 VM；Linux 主機直接用自己的 kernel，不需要 VM。</div>

<!--
Mac 上的 docker CLI、compose、buildx 都在 macOS 上執行，可是 macOS 沒有 Linux kernel。
[click] 它們連到 host 上的 docker.sock，由 Docker Desktop 的 host 端程式接手轉發。
[click] 透過 vsock（VM 專用的 socket）進到 Linux VM，dockerd、containerd、shim、runc 整串都在 VM 裡。
[click] 容器跑在 VM 的 kernel 上。
[click] 所以這類產品比的是：VM 開多快、常駐多少記憶體、中間經過幾層。
-->

---

# 同一個思路，不同產品

| 產品 | Linux VM | 對外提供 |
|---|---|---|
| **Docker Desktop** | Mac：Apple Virtualization；Windows：WSL2 | Docker Engine API（dockerd） |
| **OrbStack** | 自己的輕量 VM（Mac） | Docker Engine API |
| **Colima** | Lima 開的 VM（Mac / Linux） | Docker Engine API |

<div class="callout mt-6" v-click>

**共通點：** client 只看 Engine API，所以底下換什麼都行，`docker` 指令不用改。差別在 VM 多輕、開機多快、檔案分享和網路怎麼做。

</div>

---
layout: section
---

<div class="eyebrow">Part 5</div>

# 網路與周邊

port、veth、build、compose

---
clicks: 4
---

# `-p 8080:80` 怎麼連到容器

<NetScene />

<div class="scene-caption"><code>docker run -d -p 8080:80 --name web nginx</code>：每個容器有自己的 net namespace，靠一對虛擬網卡（veth）接回主機。</div>

<!--
瀏覽器打 localhost:8080。
[click] 主機上的 iptables 規則做 DNAT，把 8080 改成容器的 IP 和 80 port。
[click] 封包進到 docker0，一台虛擬交換器。
[click] veth pair 一端在主機接 docker0，另一端在容器裡叫 eth0，nginx 就收到了。
[click] 另外還有 docker-proxy 在 user space 轉送；容器刪掉時，veth 和規則都要清掉，這也要花時間。
-->

---

# 名詞速查：常見周邊工具

| 名詞 | 一句話 |
|---|---|
| **Compose** | 用 YAML 描述多個容器一起起；也是 Engine API 的 client |
| **BuildKit / buildx** | BuildKit 是建 image 的引擎，`docker buildx` 是它的 CLI |
| **Testcontainers** | 測試程式裡自動起容器的函式庫，同樣走 Engine API |
| **Kubernetes / k3s** | 管理大量容器的編排系統；k3s 是單機也能跑的輕量版 |

---
layout: section
---

<div class="eyebrow">Takeaways</div>

# 一句話總結

<div class="text-left max-w-2xl mx-auto mt-8 text-lg leading-relaxed">

1. **容器是 process：** 共用主機 kernel，靠 namespaces 隔離、cgroups 限制、seccomp 過濾
2. **Image 是一疊唯讀 layer：** 容器只在上面加一層可寫層，刪了就沒了
3. **Docker 是分層的：** CLI → Engine API → dockerd → containerd → shim → runc
4. **Mac / Windows 要 VM：** 各家產品都在 VM 裡跑 Linux，對外提供同一套 Engine API

</div>

---

# 參考資料

- Docker overview（架構）：[docs.docker.com/get-started/docker-overview](https://docs.docker.com/get-started/docker-overview/)
- Storage drivers（layer、copy-on-write）：[docs.docker.com/engine/storage/drivers](https://docs.docker.com/engine/storage/drivers/)
- Docker Engine security（namespaces、cgroups、daemon）：[docs.docker.com/engine/security](https://docs.docker.com/engine/security/)
- Seccomp profiles：[docs.docker.com/engine/security/seccomp](https://docs.docker.com/engine/security/seccomp/)
- Bridge network：[docs.docker.com/engine/network/drivers/bridge](https://docs.docker.com/engine/network/drivers/bridge/)
- Docker contexts：[docs.docker.com/engine/manage-resources/contexts](https://docs.docker.com/engine/manage-resources/contexts/)
- containerd：[containerd.io](https://containerd.io/) · runc：[github.com/opencontainers/runc](https://github.com/opencontainers/runc)
- Linux man pages：namespaces(7)、cgroups(7)、clone(2)
