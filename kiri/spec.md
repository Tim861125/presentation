# Kiri 使用教學（spec）

> 來源：<https://github.com/libracoder/kiri>（commit `f68a8d2`，2026-11-17；最新 release notes 為 0.2.1）
> 主要依據：`README.md`、`docs/features.md`、`docs/releases/*.md`、`packaging/README.md`、`crates/kiri/src/main.rs`（CLI usage）及各模組註解。
> 官網／下載：<https://runkiri.com/releases/>
> 2026-11-18 對照 HEAD `36923b2` 與 runkiri.com 查證，細節與出處見 `kiri-notes.md`。最新發佈版本 0.2.1（2026-11-15），官網標示 **Beta**。

## 注意（簡報製作）

- 手寫風格（rough.js 手繪圖、白底藍＋琥珀）
- 不要使用 icon
- 每一頁的高度不能超過螢幕
- 繁體中文（技術名詞保留原文）
- 貫穿全場的例子：`docker run --rm alpine true`，以及一個叫 `web` 的 nginx 容器
- **所有例子都用 Linux（Ubuntu）舉例，不用 macOS**。Linux 上和 Mac 不同的地方（2026-11-20 對照 HEAD `36923b2` 原始碼）：
  - 沒有 VM：systemd `kiri.service` 跑 `kiri daemon`（root），daemon 直接啟動同機的 `kiri-init` agent（`guest.rs` `agent_binary()`）
  - 效能數字用 `bench/ubuntu-2026-10-26.md`：Ubuntu 24.04、16 核 x86-64，非 bare metal。`run --rm alpine true` Kiri 188 ms、Docker Engine 697 ms、Podman 1105 ms、nerdctl 631 ms；`exec` 比 nerdctl 慢約 3 倍
  - 網域是 `*.kiri.localhost`（`/etc/resolver` 只有 Mac 有），router 只聽 loopback（`daemon/domains.rs`）
  - **Linux 還沒有容器 HTTPS**（`daemon/tls.rs:258`「HTTPS for containers isn't on Linux yet」）
  - 套件不會自動建 `kiri` docker context；完整版的 docker wrapper 預設連 `/run/kiri/docker.sock`，engine-only 要自己 `docker context create kiri --docker host=unix:///run/kiri/docker.sock`（`packaging/linux/deb/postinst`）
  - 開機最佳化（VM kernel 810 → 112 ms）只跟 Mac 的 VM 有關，簡報不放

---

## 1. Kiri 是什麼

**Kiri 是一個用 Rust 寫的輕量容器 runtime**，定位是 **Docker Desktop / OrbStack 的替代品**，支援 macOS、Linux（本簡報不涵蓋 Windows）。

- 它**實作 Docker Engine API**，所以你原本的 `docker` CLI、Docker Compose、buildx、Testcontainers 都能直接用，不用改指令。
- macOS 上把容器跑在**一台很小的 Linux VM** 裡；Linux 上則**直接跑在主機 kernel**，不需要 VM。
- 名稱來自伊博語（Igbo）的 *ntakịrị*，意思是「小」。
- 授權：Apache-2.0（guest kernel 為 Linux GPL-2.0）。

### 賣點一覽

| 特點 | 說明 |
|---|---|
| 快 | 官網公平量測：`docker run` **22 ms** vs Docker Desktop 178 ms（約 8 倍）；走 API **3.1 ms** |
| 輕 | 沒有容器在跑時閒置 60 秒就休眠，engine 常駐約 **10–15 MB**，喚醒約 **0.1–0.15 s** |
| 相容 | `docker`、Compose、buildx、`docker login`；Apple silicon 上 amd64 映像透過 **Rosetta** 執行 |
| 本機網域 | `http://<容器名>.kiri.local`，並有 Kiri 自己的 CA 提供 HTTPS |
| 不只容器 | 一行指令開 **Kubernetes（k3s）**、建立 **Linux machine** |
| 原生視窗 | 管理 containers / images / volumes / networks，加上選單列圖示 |
| 多語系 | 38 種語言，包含繁體中文 |

### 效能數據（官方 benchmark，有兩組）

**A. 官網較新、較公平的量測**（runkiri.com/benchmarks，2026-11-02，M3 Max，每個引擎都限制 2 CPU／8 GB，OrbStack 關掉 k8s）。標語「8× faster than Docker」：

| `alpine true` | `docker run --rm` | Docker Engine API |
|---|---:|---:|
| **Kiri** | **22 ms** | **3.1 ms** |
| Docker Desktop | 178 ms | 163 ms |
| OrbStack | 279 ms | 238 ms |
| Colima | 152 ms | 88 ms |

**B. README 的舊數字**（`bench/results.json`，2026-10-24，30 次取中位數，同一支 docker CLI）。量測時 OrbStack 正跑著 86 個容器加 k8s，作者也說 OrbStack 的數字偏悲觀：

| | Docker Engine API | `docker` CLI |
|---|---:|---:|
| **Kiri** | **2.55 ms** | **14.2 ms** |
| Docker Desktop | 213 ms | 243 ms |
| OrbStack | 380 ms | 442 ms |

- 實測 engine 常駐 **9.7 MB**（daemon 9.0 + agent 0.69 MB），README 寫「約 15 MB」。agent binary 實測 **650 KB**，README 寫「約 900 KB」。
- Kiri 輸的地方：published port 吞吐量約為 Docker Engine 的 **1/10**（user-space relay）；Mac 上 1 GB bind mount 讀取 1724 MB/s，Colima 5235、OrbStack 3240（官網自己也列出來了）。
- `kiri bench`（只有 macOS）可以在自己機器上重跑，但預設 50 次加 `--network none`，條件和上面兩組都不同。

---

## 2. 架構：為什麼這麼快

```
docker CLI ─┐
compose ────┼─ Docker Engine API ─► kiri daemon ── vsock ──► guest agent (PID 1)
buildx ─────┤                         owns the VM           clone3 → container
kiri UI ────┘
```

- **kiri daemon**：在主機上提供 Docker Engine API，並擁有 VM。
- **guest VM**：用 Apple Virtualization.framework（Rust 透過 `objc2`）。自製約 **10 MB 的 Linux kernel**，PID 1 是 **不到 1 MB 的 Rust agent**（`kiri-init`）。
- **啟動容器**：agent 用一次 `clone3`（`CLONE_INTO_CGROUP`）建立 namespaces + cgroup 就把容器跑起來。
  **沒有 runc、沒有 shim、也沒有 dockerd**，每個容器都是 agent 的直接子行程，per-container shim 記憶體是 0（OrbStack 每個 shim 約 7.9 MB）。這是它快的主因。
- daemon 與 guest 之間走 **vsock** 溝通（來回 p50 31 µs）。
- 映像在主機端 pull，只串流進 guest 一次，解開在 ext4 資料碟上，用 overlayfs 疊起來。

### 開機最佳化的故事

kernel 從 `allnoconfig` 開始裁剪（`bench/results.json` 的 `boot_journey`）：

| 階段 | VM 冷開機到 agent ready |
|---|---:|
| stock arm64 defconfig | 810 ms |
| allnoconfig | 175 ms |
| expedited RCU（cgroup2 mount 從 23 ms 降到 0.1 ms） | 140 ms |
| virtio-pci reset 改用 hrtimer 輪詢（kernel patch） | **112 ms** |

kernel 開到 PID 1 只要 **8 ms**，PID 1 到 agent ready 只要 0.4 ms。

### 其他實作細節

- agent 是單一 `poll()` 迴圈，服務 host、回收子行程、轉送輸出、轉發 port、DNS、DHCP 都在裡面。
- 網路靠**手寫 rtnetlink 與 nf_tables 訊息**，不呼叫 `ip`／`iptables`。
- seccomp 是**手寫的 BPF deny list**（Docker 用 allow list），程式更短，每次 syscall 跑的指令更少。
- 容器拆成 kernel 原語的耗時：namespaces + exec 0.78 ms、cgroup v2 1.23 ms、overlay 0.36 ms、veth 2.2 ms；**刪除 veth 要 18.9 ms**。Docker 在 `--rm` 回傳前會等這一步，Kiri 先回報結束，之後才清理。
- VM 當掉時，`always`／`unless-stopped` 的容器會自動在新 VM 重啟。
- Linux：同一支 `kiri`，agent 直接跑在主機 kernel 上（systemd 的 `kiri.service`）。

---

## 3. 安裝

| 平台 | 安裝檔 |
|---|---|
| macOS 14+（Apple silicon / Intel） | `.dmg`（`Kiri-<ver>-arm64.dmg` / `-x86_64.dmg`） |
| Linux（Ubuntu、Fedora 等） | `.deb` / `.rpm` |

全部從 <https://runkiri.com/releases/> 下載。

### 兩種版本（Flavour）

- **Kiri**：內附 `docker` CLI、Compose、buildx，裝完就能 `docker run`。
- **Kiri Lite**：只有 engine，給已經有 `docker` CLI 的人。（macOS 的 Lite 版若本機沒有 docker CLI，首次啟動時會下載固定版本並驗證 SHA-256。）

### 第一次啟動做了什麼

**macOS**：打開 `Kiri.app` 會執行 `kiri setup`：
1. 建立 `kiri` 這個 **Docker context**
2. 安裝 LaunchAgent
3. 設定 build 用的 builder
4. 打開視窗（第一次會詢問語言、是否啟用 `*.kiri.local` 網域）

**Linux**：安裝套件本身**不會啟動任何東西**。要在視窗按「Allow access」，或執行：

```sh
sudo kiri host-access $USER
```

之後 engine 會啟動並開機自動啟動。socket 在 `/run/kiri/docker.sock`，由 `kiri` 群組擁有。

> ⚠️ 加入 `kiri` 群組 **等同 root 權限**，和 `docker` 群組一樣，請謹慎授權。

Linux 套件會把 `docker` 透過 `update-alternatives`（priority 10）放上 PATH，但**只在 `/usr/bin/docker` 不存在，或本來就是 alternatives 連結時**；若已裝 Docker 官方 CLI，Docker 的會優先。資料位置：`/var/lib/kiri`（映像、容器）、`/var/lib/kiri-daemon`（狀態）；`apt remove` 會保留，`apt purge` 才會刪除。

### 更新

App 會自動更新，下載後先檢查 **SHA-256 與簽章**。Mac 也可以手動更新：

```sh
kiri update --check   # 只檢查（只有 macOS）
kiri update           # 安裝新版（只有 macOS）
```

> ⚠️ Linux 上打 `kiri update`，實際跑的是 `docker update`（改容器資源設定），不會更新 Kiri。Linux 請用 apt／dnf 簽章套件庫更新（0.1.15 起）。

---

## 4. 快速上手

### 4.1 用 docker CLI 操作（推薦）

Kiri 建立了一個名為 `kiri` 的 Docker context。兩種用法：

```sh
# 每次指定 context
docker --context kiri run --rm alpine echo hello
docker --context kiri compose up -d

# 或切換成預設 context，之後直接用 docker
docker context use kiri
docker ps
```

（macOS 上 `kiri setup --use` 會把 `kiri` 設成目前使用的 context。）

### 4.2 用 kiri 指令操作

Docker 的指令都能直接當 `kiri` 子指令用，而且**永遠指向 Kiri**，不受目前 docker context 影響：

```sh
kiri run --rm alpine echo hello
kiri ps
kiri images
kiri compose up -d
kiri logs -f web
```

### 4.3 五行體驗完整功能

```sh
docker --context kiri run --rm alpine echo hello                # 跑容器
docker --context kiri compose up -d                             # Compose
kiri k8s start                                                  # 單節點 Kubernetes
kiri machine create dev --distro ubuntu && kiri machine shell dev   # Linux 機器
kiri import                                                     # 從 OrbStack / Docker Desktop 搬家
```

---

## 5. 功能詳解

### 5.1 容器（與 Docker 相容的範圍）

- **生命週期**：`run`（`--rm`、`-d`、`-it`、`-e`、`-u`、`-w`、`--name`、`--restart`、`--entrypoint`）、`exec`、`logs`、`attach`、`stop`、`kill`、`restart`、`rm`、`wait`、`rename`、`pause`/`unpause`、`update`、`stats`、`top`、`diff`、`export`、`commit`、`cp`（雙向，容器是否執行中皆可）、`container prune`
- **資源與安全**：`--memory`、`--cpus`、`--cpu-shares`、`--pids-limit`、`--shm-size`；Docker 預設 capabilities 與 seccomp；`--cap-add/--cap-drop`、`--privileged`、`--read-only`、`no-new-privileges`
  - 即使是 privileged 容器，也**拿不到 vsock 與 io_uring**，保住和主機之間的邊界
- **儲存**：具名 / 匿名 volume、bind mount（macOS 透過 **virtiofs**）、`--tmpfs`、`--mount`
- **映像**：`pull`（支援 `docker login`、GitHub、Amazon ECR）、`push`、`tag`、`save`、`load`、`history`、`search`、`image prune`、`system df`；`--platform` 有效
- **Compose**：`up`、`down`、`ps`、`logs`、`exec`、多網路、events
- **Testcontainers**（0.2.1 起）：版本檢查、Ryuk 清理、MySQL 等資料庫 readiness 都正常

### 5.2 網路

- 預設 bridge、自訂網路（以名稱 / alias 做 DNS）、`network connect/disconnect`
- `--network host|none|container:<name>`、`-p` / `-P`（TCP 與 UDP）
- `-p` 預設綁所有介面（同 Docker）；要只開本機用 `-p 127.0.0.1:8080:80`
- `host.docker.internal`、`--add-host`、IPAM（`--subnet`、`--gateway`…）、`--ip`、`--ipv6`

### 5.3 本機網域 `*.kiri.local`

不用記 port，直接用名字連容器：

| 對象 | 網址 |
|---|---|
| 一般容器 | `http://<容器名>.kiri.local` |
| Compose service | `http://<service>.<project>.kiri.local` |
| 不需任何設定的版本 | `http://<容器名>.kiri.localhost` |
| HTTPS | `https://<容器名>.kiri.local` |

- 首次打開 App 會詢問是否啟用；之後在 **Settings → Domains** 修改。
- 自訂網域：在容器加 label `dev.kiri.domain=api.myapp`。
- HTTPS 憑證由 Kiri 自己的 CA 簽發，放在 `~/.kiri/tls`；該 CA 有 **name constraints**，只能簽 `*.kiri.local` 與 `*.kiri.localhost`，就算被信任也無法冒充其他網站。在 **Settings → Domains → HTTPS** 讓 macOS 信任它。

範例：

```sh
kiri run -d --name web nginx
open http://web.kiri.local
```

```yaml
# compose.yaml
services:
  api:
    image: my-api
    labels:
      dev.kiri.domain: api.myapp   # → http://api.myapp.kiri.local
```

### 5.4 Build

- `docker build` / `buildx build` 透過一個跑在 Kiri 容器裡的 **BuildKit**（buildx 的 docker-container driver）。閒置 5 分鐘後先**暫停**（`KIRI_BUILDER_IDLE_SECS`），下次 build 約 1 秒就能開始，cache 還在；引擎休眠前才真正停止。
- Apple silicon 上 amd64 的 build 步驟也走 Rosetta。
- 切換一般 `docker build` 使用哪個 builder：

```sh
kiri build-with kiri     # 用 Kiri 的 builder
kiri build-with docker   # 用 Docker 的 builder
```

### 5.5 Kubernetes：`kiri k8s`

一個容器裡的單節點 **k3s**，約 20 秒就緒，並自動寫入名為 `kiri` 的 kubectl context。

```sh
kiri k8s start --use     # 啟動並切換 kubectl context 到 kiri
kubectl get nodes
kiri k8s status
kiri k8s stop
kiri k8s delete          # 刪除整個叢集（含狀態 volume）
```

- API server 在 `127.0.0.1:6443`（被占用就往後找空 port）。
- **LoadBalancer service 會發佈在 `localhost`**。
- 進階設定（存於 `~/.kiri/k8s.json`，修改會重建 node 容器，但叢集資料保留）：

```sh
kiri k8s set --lan on                  # API server 開放到所有網卡（區網可連）
kiri k8s set --tls-san k8s.example.lan # 憑證加額外名稱
kiri k8s set --port 7443               # 換 port
```

### 5.6 Linux 機器：`kiri machine`

類似 OrbStack 的 machines：一個持續執行的 distro 容器，帶著你的使用者和 sudo，並把主機家目錄掛在同樣路徑（Mac 掛 `/Users`，Linux 掛 `/home`）。

```sh
kiri machine create dev --distro ubuntu   # 預設 ubuntu
kiri machine create box --distro fedora --systemd   # 用 systemd 當 init
kiri machine create x --image debian:trixie         # 指定任意映像
kiri machine list
kiri machine shell dev                    # 進入 shell
kiri machine shell dev -- uname -a        # 執行單一指令
kiri machine stop dev                     # 也有 start / restart，都要帶 NAME
kiri machine delete dev
```

可用 distro：`ubuntu`（24.04）、`debian`（trixie）、`alpine`（3.22）、`fedora`（42）、`arch`、`rocky`、`opensuse`。

### 5.7 從 OrbStack / Docker Desktop 搬家：`kiri import`（macOS）

```sh
kiri import --list           # 先看會搬哪些東西
kiri import orbstack         # 從 OrbStack
kiri import desktop-linux    # 從 Docker Desktop
```

- 透過各引擎自己的 docker CLI 複製 **images、volumes、containers**。
- 來源**只讀不改**：image 用 `docker save`、container 用 `inspect`，volume 用一個唯讀掛載的臨時 helper 容器複製（保留檔案擁有者）。
- 搬過來的容器是**停止狀態**，需要自己啟動。
- CLI 只有 macOS 有。

### 5.8 分享到網際網路：`kiri share`

把本機 port 或容器開一個**公開 HTTPS 網址**（類似 ngrok），經由 Kiri Share edge（`*.runkiri.cloud`）。

```sh
kiri share login          # GitHub device flow 登入
kiri 3000                 # 簡寫：分享本機 3000 port
kiri share web --name demo   # 分享名為 web 的容器
kiri share status
kiri share logout
```

帳號資訊存在 `~/.kiri/share.json`。另有 `kiri share names|reserve|release` 管理保留名稱（要人工審核）。

- 協定：所有訪客連線多工跑在**一條 TLS 連線**上，每條是一個編號 stream，以 window credit 做流量控制。
- 訪客第一次造訪會看到 Kiri 的警告頁，防止被拿來釣魚。
- **edge 伺服器不開源**，repo 只有 client 和協定，`*.runkiri.cloud` 是官方託管的服務。

> ⚠️ 會把服務公開到網路上，使用前確認沒有敏感資料或未驗證的管理介面。

### 5.9 USB 裝置（beta）：`kiri usb`

把序列轉接器、Zigbee 棒、開發板交給容器使用（Mac / Linux）：

```sh
kiri usb list
kiri usb attach <DEVICE>
kiri usb detach <DEVICE>
```

視窗的 USB 分頁會顯示裝置在 Linux 內的路徑，以及可直接複製的 `--device` 參數，例如：

```sh
kiri run --rm -it --device /dev/ttyACM0 my-flasher
```

Mac 上裝置斷線（開發板重開、Mac 睡眠）回來後會自動重新 attach。

實作方式：Mac 的 VM 沒有 USB controller。root helper 從 macOS 搶下裝置，再用 **USB/IP** 協定交給 guest 的 `vhci_hcd`。不支援 isochronous 傳輸，所以 webcam、音訊這類裝置大概不能用。

### 5.10 Mac 整合

- **Finder**：容器內的檔案出現在 `~/Kiri`（唯讀，即時更新）。daemon 自己實作一個 **NFSv3 server**，掛在 Unix socket 上，用 macOS 內建的 `mount_nfs`，不需要 kext 或 admin
- **`*.kiri.local` 怎麼做到的**：daemon 在 127.0.0.1:53535 跑一個小型 DNS（透過 `/etc/resolver/kiri.local`），再由監聽 80/443 的 router 依 Host header 或 SNI 挑容器
- **原生視窗，不是 Electron**：Mac 用 AppKit + WebKit，Linux 用 GTK + WebKitGTK
- **SSH agent forwarding**：容器內可用 `/run/host-services/ssh-auth.sock`
- **記憶體 balloon**：執行中會把用不到的記憶體還給 macOS
- **選單列**：關掉視窗後 Kiri 留在選單列，可看 VM 狀態、執行中的容器、Start / Stop

### 5.11 圖形介面

- 容器、映像、volume、網路四個分頁；**Compose 專案分組**，可整組啟動 / 停止 / 重啟 / 刪除
- 每個容器有自己的頁面：詳細資訊、即時 log（搜尋、等級過濾、可選取複製）、命令列（「Open in Terminal」開完整 shell）、檔案瀏覽（預覽、存到下載、在 Finder 顯示）
- 從 CLI 開啟：`kiri ui --view containers|images|volumes|networks`

---

## 6. 設定

| 項目 | 位置 / 方式 |
|---|---|
| VM 的 CPU、記憶體 | Settings，或 `~/.kiri/vm.json`（下次 VM 啟動生效）。預設 2 CPU；記憶體預設為實體 RAM 的一半，限制在 2–8 GiB |
| 用環境變數覆蓋 | `KIRI_CPUS`、`KIRI_MEMORY_MIB`、`KIRI_IDLE_SECS`（休眠秒數，0 = 永不休眠） |
| 本機網域、HTTPS | Settings → Domains |
| 語言、字型、字級 | Settings → Appearance |
| k8s 設定 | `~/.kiri/k8s.json`（用 `kiri k8s set` 改） |
| TLS CA | `~/.kiri/tls` |

---

## 7. 疑難排解與移除

```sh
kiri diag logs -f                # 追蹤 log
kiri diag logs --engine --errors # 只看 engine 錯誤
kiri diag report --out kiri.txt  # 產生回報用檔案（token 會被移除）
kiri setup --uninstall           # macOS：移除 context、LaunchAgent 等設定
```

### 已知問題

1. **`docker build --add-host name:host-gateway` 用 BuildKit 會失敗**
   buildx 只允許 Docker 內建 builder 使用 `host-gateway`。暫時解法：
   - 直接寫 IP：Mac 用 `198.19.248.254`；Linux 用預設 bridge 的 gateway（文件寫 `172.18.0.1`，實際以 `docker network inspect bridge` 為準）
   - 或用 `DOCKER_BUILDKIT=0`，讓 Kiri 自己處理 `host-gateway`
   - 官方 Roadmap 下一步就是**內建 builder**，會解決此問題
2. **Mac 睡眠時 USB 裝置會暫時離開容器**
   長時間無人值守的工作（燒錄、記錄序列埠）請保持 Mac 喚醒：`caffeinate -s`。
3. **`--network container:<name>`**：被共用的容器重啟後，共用它網路的其他容器也要重啟（與 Docker 行為相同）。

---

## 8. 和 Docker Desktop / OrbStack 對照

| | Docker Desktop | OrbStack | Kiri |
|---|---|---|---|
| `docker run`（官網 2026-11-02） | 178 ms | 279 ms | **22 ms** |
| 容器啟動（API） | 163 ms | 238 ms | **3.1 ms** |
| Kiri 的內部組成 | — | — | 自製 kernel + Rust agent，直接 `clone3`（無 runc / shim / dockerd） |
| Kubernetes | 有 | 有 | 有（k3s） |
| Kiri 額外功能 | — | — | `*.kiri.local` + HTTPS、`kiri share`、USB 直通（beta）、Linux machines |
| Kiri 授權 | — | — | **Apache-2.0**（名稱與 logo 除外，貢獻需簽 CLA） |

> 注意：效能數字是「建立+執行+移除一個最小容器」的延遲，不代表長時間工作負載的吞吐量。published port 吞吐量和 Mac bind mount 讀取，Kiri 反而落後。Docker Desktop／OrbStack 的平台與授權不在 Kiri 的一手來源裡，所以這裡不列。

---

## 9. 簡報可用的重點（slides 取材）

1. **一句話**：開源、Rust 寫的 Docker Desktop 替代品，`docker` 指令照用。
2. **數字衝擊**：`docker run` 22 ms vs 178 ms（約 8 倍）、API 3.1 ms；engine 約 10 MB；閒置 60 秒休眠、約 0.1 秒喚醒。
3. **架構圖**：docker CLI → Engine API → kiri daemon → vsock → < 1 MB agent → `clone3`；沒有 runc / shim / dockerd。開機最佳化：810 → 112 ms。
4. **安裝即用**：裝完自動建立 `kiri` context，`docker --context kiri ...` 或 `kiri run ...`。
5. **開發體驗**：`*.kiri.local` + HTTPS、Compose 分組、Finder 看容器檔案。
6. **一行指令的附加功能**：`kiri k8s start`、`kiri machine create`、`kiri import`、`kiri 3000`。
7. **限制與注意**：BuildKit `host-gateway`、`kiri` 群組 = root、`share` 會公開到網路（edge 不開源）、port 吞吐量與 Mac bind mount 讀取落後、專案仍在 0.x Beta（repo 2026-11-02 才公開）。

---

## 10. 大綱 (Slide Plan)

1. **封面**：Kiri：把 Docker Desktop 縮成 10 MB。手繪 docker CLI → kiri daemon → agent → container
2. **問題**（ProblemScene）：Docker Desktop 跑一次 `docker run` 要經過 dockerd → containerd → shim → runc，Kiri 只要 daemon → agent `clone3`；178 ms vs 22 ms
3. **定義**：開源、Rust 寫、實作 Docker Engine API 的輕量容器 runtime；callout：相容（docker 指令照用）／輕（休眠、10 MB）
4. **Part 1 為什麼快**
   - ArchScene（Linux）：CLI / Compose / buildx / UI → Engine API → kiri daemon（systemd）→ kiri-init → `clone3` → container
   - 快在哪：不是 `clone3` 本身（runc 最後也請 kernel 建 namespaces／cgroup，只要幾 ms），而是少了 dockerd → containerd → shim → runc 的轉手；比喻：寄包裹四個窗口轉手 vs 櫃檯收件後直接進倉庫
   - 時間花在哪（`bench/ubuntu-2026-10-26.md`「Engine-only latency」，curl 直接打 API）：Docker Engine lifecycle 531 ms、Kiri 33–47 ms，各含約 35 ms curl+jq 成本 → 引擎約 500 ms vs 約 10 ms；CLI 剩約 200 ms vs 約 180 ms。差距幾乎全在引擎，Kiri 的 188 ms 大多是 docker CLI。exec：API Docker 50 ms、Kiri 17 ms（引擎約 1 ms）
   - 對照表：CLI／API 不換；dockerd → kiri daemon；containerd → daemon + kiri-init；shim → 不需要；runc → 一次 `clone3`；BuildKit → 跑在 Kiri 容器裡
   - 效能表：Ubuntu 量測，callout 說明量測條件（非 bare metal、exec 較慢）
   - 實作細節表：手寫 rtnetlink／nf_tables、seccomp deny list、刪 veth 18.9 ms、shim 記憶體 0
5. **Part 2 安裝與上手**
   - FlowScene：下載安裝檔 → `kiri setup` 建 context → `docker --context kiri` → `web.kiri.local`
   - 兩平台表：Mac（VM）、Linux（主機 kernel + `host-access`）
   - 程式碼：docker context 用法 vs `kiri run` 子指令
6. **Part 3 開發體驗**
   - DomainScene：瀏覽器 → `web.kiri.local` → DNS :53535 → router :80/:443（Host／SNI）→ 容器 `web`；Kiri CA name constraints
   - 程式碼：compose label `dev.kiri.domain`、`kiri build-with`；Mac 整合（Finder NFS、SSH agent、balloon）
7. **Part 4 一行指令的附加功能**
   - 指令表：`k8s`、`machine`、`import`、`share`、`usb`
   - ShareScene：訪客 → `*.runkiri.cloud` edge → 一條多工 TLS → kiri → `localhost:3000`
   - 程式碼：k8s / machine / import
8. **Part 5 限制與注意**：表格（BuildKit host-gateway、kiri 群組 = root、share 公開、port 吞吐量、Mac bind mount、Beta）
9. **Takeaways**
10. **參考資料**
