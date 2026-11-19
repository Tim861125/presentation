# Kiri 研究筆記（spec.md 事實查核與補充）

> 用途：在把 `spec.md` 做成 Slidev 簡報前，逐條對照一手來源（repo 原始碼／文件、runkiri.com 官方網站）查核。
> 查核日期：2026-11-18。不採用部落格、HN、新聞等二手資料。

---

## 1. 讀過的來源

### Repo
- `https://github.com/libracoder/kiri`，shallow clone（depth 50）
- **讀取時的 HEAD：`36923b2`（2026-11-18 09:07 +0100）**「Security: import runs only an official image as its volume helper (#506)」
- spec.md 宣稱的 `f68a8d2` 確實存在，日期 **2026-11-17 00:20 +0100**（"Fix layer hard links to absolute symlinks (#398)"），比 HEAD 舊 17 個 commit（見 §3.10）
- 最新 tag：`v0.2.1`（`git ls-remote --tags`）；GitHub Releases API：v0.2.1 發佈於 2026-11-15T08:32Z
- 根目錄 `Cargo.toml` 的 version 是 `0.0.0`，正式版的版本號取自 tag（`Cargo.toml:6-8`、`RELEASES.md`）

讀過的檔案：
- `README.md`、`RELEASES.md`、`CLA.md`（開頭）
- `docs/features.md`、`docs/development.md`、`docs/releases/*.md`（0.1.0、0.1.1、0.1.7、0.1.8、0.1.10–0.1.15、0.1.17、0.1.18、0.2.0、0.2.1）
- `packaging/README.md`、`contrib/linux/kiri.service`
- `bench/results.json`、`bench/windows-2026-10-25.md`、`bench/ubuntu-2026-10-26.md`
- `crates/kiri/src/`：`main.rs`、`docker.rs`、`wsl.rs`、`machine.rs`、`k8s.rs`、`share.rs`、`usb.rs`、`usb/usbip.rs`、`usb/helper.rs`、`import.rs`、`bench.rs`、`setup.rs`、`update.rs`、`hostaccess.rs`、`flavor.rs`、`diag/mod.rs`、`diag/report.rs`、`ui/mod.rs`、`ui/lang/`
- `crates/kiri/src/daemon/`：`mod.rs`、`engine.rs`、`network.rs`、`ports.rs`、`mirror.rs`、`domains.rs`、`dns.rs`、`tls.rs`、`nfs.rs`
- `crates/kiri-init/src/main.rs`、`linux/container.rs`、`linux/seccomp.rs`、`linux/agent.rs`
- `crates/kiri-win/src/main.rs`、`crates/kiri-share-proto/src/lib.rs`、`crates/kiri-vmm/src/apple.rs`（Rosetta 部分）、`guest/kernel/patches/`（檔名）
- `git log`（HEAD 往前 50 個 commit）

### 官方網站（2026-11-18 以 curl 抓取）
- <https://runkiri.com/>（首頁）
- <https://runkiri.com/releases/>
- <https://runkiri.com/benchmarks/>
- <https://runkiri.com/bench/results.json>（**與 repo 內的版本不同**，見 §2.1）
- <https://runkiri.com/share/>
- <https://download.runkiri.com/latest.json>、`latest-mac-arm64.json`（兩者都回報 `"version": "0.2.1"`）
- GitHub REST API `repos/libracoder/kiri`（repo metadata）與 `/releases`

---

## 2. spec.md 主張查核表

圖例：✅ 吻合 ／ ⚠️ 有出入或需補充條件 ／ ❌ 一手來源中找不到

### 2.1 數字與效能

| spec.md 主張 | 判定 | 來源 | 正確值／備註 |
|---|---|---|---|
| 透過 Docker API 啟動並結束容器約 2.5 ms，約 Docker Desktop 的 80 倍 | ✅（附條件） | `README.md:45`；`bench/results.json` lifecycle：Kiri API p50 2.55 ms、DD API p50 213.4 ms（約 84 倍） | 這組數字的量測日期是 **2026-10-24**（`bench/results.json` 的 `updated`）。量測時 **OrbStack 正在跑 86 個容器和一個 Kubernetes 叢集，Docker Desktop 的 VM 也開著**（`caveats[1]`），作者自己也說「OrbStack's numbers are pessimistic」 |
| 表格 2.55 / 14.2 / 213 / 243 / 380 / 442 ms | ✅ | `README.md:97-103`；`bench/results.json` lifecycle rows（14.15、243.3、379.9、442.2） | README 只列 p50。p99 差距更大，例如 DD API 774 ms、OrbStack CLI 2383 ms |
| 「alpine 執行 true 後移除，30 次取中位數，三者使用同一支 docker CLI」 | ✅ | `README.md:97`；`bench/results.json` `caveats[0]`（docker CLI 29.7.2） | — |
| **官網的數字不一樣** | ⚠️ spec 未提 | runkiri.com 首頁、`/benchmarks/`、`/bench/results.json`（`measured: 2026-11-02`） | 官網用**較新的一輪量測**（2026-11-02，M3 Max，**每個引擎都限制為 2 CPU／8 GB**，OrbStack 關掉 Kubernetes，還加入 Colima），標語是「**8× faster than Docker**」：`docker run --rm alpine true` 在 Kiri 是 **22 ms**，DD 178 ms、OrbStack 279 ms、Colima 152 ms。走 Docker API 時 Kiri **3.1 ms**，DD 163、OrbStack 238、Colima 88 ms。repo 的 README 和 `bench/results.json` 還沒更新成這組數字 |
| 可以用 `kiri bench` 在自己機器上重跑（macOS） | ✅（附條件） | `main.rs:139-140`（`#[cfg(target_os = "macos")]`）；`bench.rs:23,42,54` | `kiri bench` 的預設是 **50 次加 5 次暖機、`--network none`**，只比較 Kiri、OrbStack、Docker Desktop（沒有 Colima），和 README 表格的條件（30 次、bridge）不一樣，跑出來的數字不能直接對照 |
| VM 閒置 60 秒後休眠 | ✅（附條件） | `README.md:46`；`features.md:57-58`；`daemon/engine.rs:1137-1141,1280` | 休眠條件是**沒有任何執行中的容器或 exec，也沒有 API 請求**，持續 `KIRI_IDLE_SECS`（預設 60 秒，設 0 代表永不休眠）。換句話說，只要還有容器在跑，VM 就不會休眠 |
| daemon 常駐約 15 MB | ✅（README）／⚠️ | `README.md:46`；`bench/results.json` kiri rows | 量測值是 engine 常駐 **9.7 MB**（Mac 上的 daemon 9.0 MB 加上 guest agent 0.69 MB）。15 MB 是 README 的行銷取整，要說「約 10–15 MB」比較保險 |
| 喚醒約 0.15 s | ✅ | `README.md:46`；`features.md:58` | `bench/results.json`：VM 冷開機到 agent ready 是 **112 ms**（中位數，共 5 次）；`docs/releases/0.1.14.md` 寫的是「about a tenth of a second」 |
| 自製約 10 MB 的 kernel | ✅ | `README.md:116`；`development.md:73`；`bench/results.json`（guest kernel image 10264 KB，原本 32 MB） | — |
| PID 1 是約 900 KB 的 Rust agent | ✅（README）／⚠️ | `README.md:116`；`development.md:79` | `bench/results.json` 的「guest init binary size」量測值是 **650 KB**（2026-10-24），repo 內兩份資料不一致。簡報可以寫「< 1 MB」 |
| k3s 約 20 秒就緒 | ✅ | `features.md:68-69`；runkiri.com 首頁「about 20 seconds」 | 程式的等待上限是 3 分鐘（`k8s.rs:308`） |
| 38 種語言，包含繁體中文 | ✅ | `README.md:23,51,57-68`；`docs/releases/0.2.1.md`；`crates/kiri/src/ui/lang/` 有 37 個 JSON（含 `zh-Hant.json`），加上英文共 38 種 | 官網首頁還寫著「Kiri's window is now in 15 languages」，那是 0.2.0 的數字，網站沒更新 |
| 「沒有 runc/shim/dockerd，是比 DD 快**兩個數量級**的主因」 | ⚠️ | README 只說「around 80 times」（`README.md:45`） | 「兩個數量級」（100 倍）是 spec 自己推的。用 README 的數字是約 80 倍；用官網較新、條件公平的量測，CLI 約 8 倍，API 約 50 倍 |

### 2.2 架構

| spec.md 主張 | 判定 | 來源 | 備註 |
|---|---|---|---|
| docker CLI/compose/buildx/UI → Engine API → kiri daemon → vsock → guest agent (PID 1) → clone3 | ✅ | `README.md:109-114`；`development.md:65-70` | Mac 上 socket 是 `~/.kiri/run/docker.sock`（`daemon/mod.rs:56-63`、`development.md:67`） |
| agent 用一次 `clone3` 建立 namespaces 和 cgroup | ✅ | `README.md:116-118`；`kiri-init/src/linux/container.rs:3-6,357-364` | 用 `CLONE_INTO_CGROUP` 直接進 cgroup。agent 是單執行緒，所以可以安全地 clone3（不帶 CLONE_VM） |
| 沒有 runc、shim、dockerd | ✅ | `README.md:118`；`development.md:87`；`container.rs:5` | 每個容器 process 都是 agent 的直接子行程，所以 wait 很單純（`container.rs:5-6`） |
| daemon 和 guest 之間走 vsock | ✅ | `README.md:111`；`kiri-init/src/main.rs:3-6` | vsock 來回 p50 31 µs、p99 62 µs（`bench/results.json`） |
| Windows：`kiri-win.exe` 在 `npipe:////./pipe/kiri` 提供 API，經 `wsl.exe … kiri bridge` 進 WSL2，不用改網路設定 | ✅ | `features.md:82-90`；`kiri-win/src/main.rs:1-6` | 不走 TCP 的原因：WSL 的 localhost relay 會丟掉 half-close，`docker run` 會因此拿不到輸出 |
| Linux：同一支 `kiri`，agent 直接跑在主機 kernel（systemd `kiri.service`） | ✅ | `features.md:76-78`；`contrib/linux/kiri.service`；`packaging/README.md:45-53` | unit 設了 `Delegate=yes`（daemon 自己建立 cgroup）和 `KIRI_SOCKET=/run/kiri/docker.sock` |
| 官網說「Inside, the Kiri daemon creates each container with clone3」 | ⚠️（官網用詞） | runkiri.com 首頁 How it works | Mac 上實際呼叫 clone3 的是 guest 裡的 agent（`kiri-init`），不是 host daemon。README 的說法比較精確 |

### 2.3 安裝、平台、路徑

| spec.md 主張 | 判定 | 來源 | 備註 |
|---|---|---|---|
| macOS 14+（Apple silicon / Intel）`.dmg`；Windows 10/11（x86-64/Arm，WSL 2）`.msi`；Linux `.deb`/`.rpm` | ✅ | `README.md:74-78`；`features.md:7` | 0.2.1 實際檔名和大小見 runkiri.com/releases（例如 `Kiri-0.2.1-arm64.dmg` 51 MB、`kiri-lite_0.2.1_amd64.deb` 2.7 MB） |
| 兩種版本 Kiri／Kiri Lite；Mac 的 Lite 首次啟動下載固定版本 CLI 並驗 SHA-256 | ✅ | `packaging/README.md:15-19`；`features.md:103-107` | 版本和 SHA-256 統一釘在 `crates/kiri/src/cli_pins.rs` |
| `kiri setup`：建立 context、LaunchAgent、builder、開視窗 | ✅（不完整） | `features.md:72-75`；`setup.rs:1-25` | setup 實際做的事更多，見 §3.3 |
| Linux 安裝不會啟動任何東西；Allow access 或 `sudo kiri host-access $USER` | ✅ | `packaging/README.md:45-48`；`docs/releases/0.1.14.md`；`hostaccess.rs:1-18` | `host-access` **只在 Linux 編譯**（`main.rs:122-127`），而且**沒有列在 USAGE 字串裡** |
| socket `/run/kiri/docker.sock`，由 `kiri` 群組擁有；加入群組等同 root | ✅ | `packaging/README.md:49-51`；`contrib/linux/kiri.service:1-7`；`features.md:80-81` | socket 權限 0660 root:kiri |
| `update-alternatives` priority 10，**只在 `/usr/bin/docker` 不存在時** | ⚠️ | `packaging/README.md:55-58` | 原文是「only when `/usr/bin/docker` is absent **or already an alternatives link**」。Compose 和 buildx 的 plugin 也各自走 alternatives，並用 dpkg trigger 和 rpm `%filetriggerin` 重新檢查，所以 Docker 官方的 plugin 一定優先 |
| `/var/lib/kiri`（映像、容器）、`/var/lib/kiri-daemon`（狀態），`apt remove` 保留、`apt purge` 刪除 | ✅ | `packaging/README.md:51-53` | 權限分別是 0710 和 0700 |
| Windows MSI 是 per-user，在 WSL2 建 distro，設 `kiri` context | ✅ | `features.md:82-88`；`wsl.rs:38-43` | **Windows 安裝檔目前沒有 Authenticode 簽章**，SmartScreen 會跳警告（`RELEASES.md` "Checking what you download"；`docs/releases/0.1.7.md`） |
| App 自動更新，先檢查 SHA-256 和簽章 | ✅ | `README.md:80`；`update.rs:1-17`；`RELEASES.md` | Mac 會檢查 SHA-256、**同一個 Developer ID team**、notarization，以及 feed 承諾的版本號 |
| `kiri update --check`／`kiri update`（macOS） | ✅ | `main.rs:86,160-161`（只在 macOS 編譯） | 注意：Linux 和 Windows 上的 `kiri update` 會落進 docker 指令清單（`docker.rs:15-18` 有 `"update"`），實際執行的是 `docker update`（改容器資源），**不是**更新 Kiri。`docs/releases/0.1.13.md` 寫「`kiri update` on Linux does the same」，和目前的 `main.rs` 對不上。Linux 實際的更新管道是 apt/dnf 套件庫（0.1.15） |

### 2.4 CLI 子指令（對照 `crates/kiri/src/main.rs:78-98` USAGE）

| spec.md 寫法 | 判定 | 來源 | 備註 |
|---|---|---|---|
| `kiri run/ps/images/compose/logs …` 永遠指向 Kiri | ✅ | `docker.rs:1-4,15-19,28-44` | 做法是用 `exec` 換成 `docker`，設定 `DOCKER_HOST=unix://…` 並移除 `DOCKER_CONTEXT`；`import` 刻意不在清單內 |
| `kiri k8s start [--use] / status / stop / delete` | ✅ | `main.rs:91`；`k8s.rs:211-221` | `delete` 會連同 `kiri-k8s` volume 和 kubeconfig 一起刪（`k8s.rs:511-525`） |
| `kiri k8s set --lan on` / `--tls-san` / `--port` | ✅ | `main.rs:91`；`k8s.rs:105-128` | `--tls-san` 可以用逗號分隔多個名稱；`--lan` 也讓 LoadBalancer 服務開放到所有網卡（`k8s.rs:25-29`） |
| `kiri machine create dev --distro ubuntu`、`--systemd`、`--image` | ✅ | `machine.rs:45-49,67-68` | USAGE 只寫 `[--distro D]`，`--image` 和 `--systemd` 只出現在 machine.rs 自己的 usage |
| `kiri machine list / shell dev / shell dev -- uname -a / delete dev` | ✅ | `machine.rs:50-66` | 還有別名 `ls`、`rm` |
| `kiri machine stop \| start \| restart` | ⚠️ | `machine.rs:56-60` | 三者都**需要 NAME**（例如 `kiri machine stop dev`），spec 漏寫。`main.rs:93` 的 USAGE 只列 `stop`，沒有 start 和 restart |
| `kiri import --list`／`orbstack`／`desktop-linux` | ✅ | `main.rs:94`；`import.rs:852-905` | 另外有 `--force` 和單項匯入 `image\|volume\|container NAME`。CLI 只在 **macOS** 編譯（`main.rs:158-159`）；Windows 走視窗的 Settings → Import（commit `4df9bfb`） |
| `kiri share login / logout / status`、`kiri share web --name demo` | ✅ | `main.rs:90`；`share.rs:1878-1910` | 還有 `share names`、`share reserve NAME`、`share release NAME`、`--json`、`--no-reserve` |
| `kiri 3000` 簡寫 | ✅ | `main.rs:89,147-149`；`share.rs:751-763` | 也接受 `host:port`，`kiri 3000 myapp` 等同 `--name myapp` |
| `kiri usb list / attach / detach` | ✅ | `main.rs:92`；`usb.rs:28-35` | 別名 `ls`；Mac 另有 `kiri usb helper remove`。DEVICE 可以是 location、`vendor:product` 或名稱的一部分 |
| `kiri ui --view containers\|images\|volumes\|networks` | ✅ | `main.rs:83,167-171` | 另有 `--start`。Linux 只有 **x86-64 的完整版 `kiri` 套件**有視窗（`packaging/README.md:68-74`） |
| `kiri build-with kiri\|docker` | ✅ | `main.rs:85,151` | Windows 版 kiri.exe 沒有這個指令 |
| `kiri diag logs -f`、`--engine --errors`、`kiri diag report --out` | ✅ | `main.rs:87-88`；`diag/report.rs:180-187,458-459` | 另有 `--ui`/`--cli`、`-n N`，以及 `report --send` |
| `kiri setup --use`、`kiri setup --uninstall` | ✅ | `main.rs:84`；`setup.rs:127-154` | 另有 `--no-agent`、`--docker-socket`、`--domains`、`--no-domains`。**只在 macOS 編譯** |
| `kiri bench` | ✅ | `main.rs:95` | 旗標 `--runs N --image IMAGE --network none\|bridge`，`bench.rs:23` 另有 `--only kiri\|orbstack\|docker` |

**spec 漏掉、但 USAGE 有列的指令**（`main.rs:81-98`）：
- `kiri daemon`：直接啟動引擎
- `kiri bridge [--socket PATH]`：WSL2 這一端，供 kiri-win 連線（只在 Linux 編譯）
- `kiri boot [--console] [--pings N]`：只開 VM 做測試（macOS）
- `kiri raw run|pull|images|rmi`：不經 daemon，自己開一個 guest 的低階工具（`development.md:52-53`）
- `kiri share names|reserve|release`（`share.rs:1888-1910`；`docs/releases/0.1.11.md`）
- 隱藏指令：`kiri host-access`（Linux）、`kiri hostrelay`（Linux/WSL 內部用）、`kiri usb serve|helper|fake`

**各平台能用哪些指令**（依 `main.rs` 的 `#[cfg]`）：
- 只有 macOS：`setup`、`update`、`import`、`bench`、`boot`
- 只有 Linux：`host-access`、`bridge`
- Windows 的 `kiri.exe`：docker 指令、`share`/`kiri PORT`，以及 `k8s`/`machine`/`diag`/`usb` 會轉給 WSL 裡的 Linux `kiri` 執行（`wsl.rs:1-13`）。`machine shell` 例外，會在 Windows 端用 docker.exe exec 進去，所以 Windows 上機器的使用者是 root（`wsl.rs:45-61`；`machine.rs:5-7`）

### 2.5 功能細節

| spec.md 主張 | 判定 | 來源 | 備註 |
|---|---|---|---|
| 5.1 容器、限制、安全旗標清單 | ✅ | `features.md:10-20` | features 另列 `--security-opt seccomp=unconfined`，紀錄在 daemon 重啟後保留，每個 list 都支援 filter |
| privileged 容器也拿不到 vsock 和 io_uring | ✅ | `features.md:18-20`；`kiri-init/src/linux/seccomp.rs:246-256` | privileged 或 unconfined 時只套「host boundary」seccomp：擋 `AF_VSOCK` socket 和三個 io_uring syscall |
| 5.1 儲存：bind mount 走 virtiofs | ✅ | `features.md:40-41` | — |
| 5.1 映像：支援 GitHub、Amazon ECR | ✅ | `docs/releases/0.2.1.md` | — |
| 5.1 Testcontainers（0.2.1 起） | ✅ | `docs/releases/0.2.1.md` | Mac 的 `kiri setup` 也會把 `/var/run/docker.sock` 連到 Kiri，或寫 `~/.testcontainers.properties`（`setup.rs:17-23`） |
| 5.2 網路清單 | ✅ | `features.md:21-39` | 預設 bridge 是 `kiri0` 172.17.0.0/16，自訂網路從 172.18.0.0/16 開始配（`daemon/network.rs:3-5`） |
| 5.3 `*.kiri.local`、Compose 的 `<service>.<project>.kiri.local`、`*.kiri.localhost`、`dev.kiri.domain` label | ✅ | `features.md:33-39`；`daemon/domains.rs:1-7` | — |
| CA 在 `~/.kiri/tls`，name constraints 只允許 `*.kiri.local`、`*.kiri.localhost` | ✅ | `features.md:37-39`；`daemon/tls.rs:1-7,24-26,45` | CA 名稱是「Kiri Local Certificate Authority」；用 SNI 在第一次連線時簽發；Mac 透過 `security add-trusted-cert` 信任 |
| 5.4 BuildKit 跑在 Kiri 容器，閒置時停掉 | ⚠️ | `features.md:45-47`；`docs/releases/0.1.11.md`；`engine.rs:1284-1296` | 0.1.11 起閒置的 build worker 先**暫停（pause）**，不是停掉。過 `KIRI_BUILDER_IDLE_SECS`（預設 300 秒）才 pause，引擎休眠前才真正停止。下一次 build 約 1 秒就能開始，cache 還在 |
| 5.5 API server 在 127.0.0.1:6443，被占用就往後找 | ✅ | `k8s.rs:1-5,43-45,74-80` | 往後最多試 20 個 port |
| 5.5 LoadBalancer 發佈在 localhost | ✅ | `features.md:92` | — |
| 5.5 設定存在 `~/.kiri/k8s.json`，修改會重建 node 容器，資料保留 | ✅ | `k8s.rs:25-29,90` | — |
| 5.6 machine：使用者、sudo、主機 `/Users` 掛在同路徑 | ⚠️ | `machine.rs:1-7,74` | Mac 掛 `/Users`，**Linux 掛 `/home`**；Windows 上是 root |
| 5.6 distro 清單和版本 | ✅ | `machine.rs:19-27` | ubuntu:24.04、debian:trixie、alpine:3.22、fedora:42、archlinux:latest、rockylinux:9、opensuse/tumbleweed:latest |
| 5.7 import：來源唯讀；image 用 save、container 用 inspect、volume 用唯讀掛載的臨時 helper | ✅ | `import.rs:1-7` | 精確說法：volume 是從一個**唯讀掛載、從不啟動、用完即刪**的容器做 `docker cp`。HEAD `36923b2` 起 helper 只用官方映像 |
| 5.7 搬來的容器是停止狀態 | ✅ | `import.rs:7` | — |
| 5.8 Share 經 `*.runkiri.cloud`，GitHub device flow 登入，帳號存在 `~/.kiri/share.json` | ✅ | `share.rs:1-2,13-14,69,461-510` | edge 主機是 `edge.runkiri.com:443`（`share.rs:46`） |
| 5.9 USB（beta）、Mac 斷線後重新 attach | ✅ | `features.md:49-53`；`docs/releases/0.2.1.md` | — |
| 5.10 Finder `~/Kiri` 唯讀 NFS、SSH agent socket、balloon、選單列 | ✅ | `features.md:54-58,66-67` | balloon 的細節見 §3.2 |
| 5.11 GUI 四個分頁、Compose 分組、容器頁 | ✅ | `features.md:59-63` | — |
| 6. `~/.kiri/vm.json`、`KIRI_CPUS`、`KIRI_MEMORY_MIB` | ✅ | `features.md:63-65`；`engine.rs:38-66` | 預設 CPU 是 **2**；記憶體上限預設為**實體 RAM 的一半，夾在 2–8 GiB 之間** |
| 7. 已知問題：BuildKit `host-gateway`；IP Mac `198.19.248.254`、Win/Linux `172.18.0.1`；`DOCKER_BUILDKIT=0` | ✅（文件）／⚠️ | `features.md:121-129`；`daemon/ports.rs:961-962`；`daemon/mirror.rs:137-140`；`daemon/network.rs:549-553,746-751` | `198.19.248.254` 是 Mac 上 `host.docker.internal` 的位址（`HOST_ADDR`）。Win/Linux 的值其實是「預設 bridge 的 gateway」，原始碼預設 bridge 用 172.17.0.0/16，只有在主機已經路由 172.17（例如裝了 Docker）時才往後挑。所以 `172.18.0.1` 不一定成立，建議簡報加一句「以 `docker network inspect bridge` 的 Gateway 為準」 |
| 7. Mac 睡眠時 USB 會離開，用 `caffeinate -s` | ✅ | `features.md:111-119` | — |
| 7. `--network container:<name>` 要跟著重啟 | ✅ | `features.md:25-27` | 原文寫在 Networking 的說明裡，不在 Known issues 區 |
| 7. Roadmap 下一步是內建 builder | ✅ | `README.md:127-132` | — |
| 8. 對照表：DD 平台、OrbStack「Mac 為主」、DD/OrbStack 不開源 | ❌（不在 Kiri 來源） | — | Kiri 的 README 沒有寫這些，要另外查各產品官方資料。k8s.rs 的註解確認 OrbStack 和 Docker Desktop 都有單節點 k8s（`k8s.rs:1-2`） |
| 9. 專案仍在 0.x | ✅ | tags 到 v0.2.1 為止 | 官網全站標示「**Beta**」，Windows 另標「(beta)」 |

### 2.6 來源標頭

| spec.md 主張 | 判定 | 備註 |
|---|---|---|
| commit `f68a8d2`，2026-11-17 | ✅ | 已不是 HEAD。HEAD 是 `36923b2`（2026-11-18） |
| 最新 release notes 是 0.2.1 | ✅ | `docs/releases/` 最新一份是 0.2.1；download feed 也是 0.2.1；commit `2d6c2d6` 提到「0.2.2 merges」，可見 0.2.2 正在準備，還沒有 release notes |

---

## 3. spec.md 沒寫、適合技術分享的事實

### 3.1 VM 與開機最佳化（簡報可以講的故事）
- VM 用 Apple **Virtualization.framework**，從 Rust 透過 `objc2` 驅動，獨立成 `kiri-vmm` crate（`development.md:72`、`:96`）
- kernel 從 **allnoconfig** 開始裁，開機時間逐步下降（`bench/results.json` `boot_journey`）：
  stock arm64 defconfig **810 ms** → allnoconfig **175 ms** → expedited RCU（cgroup2 mount 從 23 ms 降到 0.1 ms）**140 ms** → virtio-pci reset poll patch **112 ms**
- 「guest kernel boot to PID 1」只要 **8 ms**（defconfig 時是 680 ms）；PID 1 到 agent ready **0.4 ms**（`bench/results.json`）
- kernel patch 清單（`guest/kernel/patches/`）：virtio-pci 用 hrtimer 輪詢 reset、virtio-net 把 big TCP 當 GSO 交給 host、FUSE 新建檔案保持 owner 可讀、GRO frag-list 修正、binfmt hwcap3、fsnotify 事件從 host 傳進來
- Rosetta 透過 virtiofs 分享進 guest，再註冊到 `binfmt_misc`（`development.md:77-78`；`kiri-vmm/src/apple.rs:41-43`）。Intel Mac 沒有 Rosetta for Linux，amd64 映像原生執行，**沒有 amd64 版本的映像會被拒絕**（`development.md:24-26`）
- 映像在 **Mac 端 pull 和 push**（`kiri-image` crate），只串流進 guest 一次並在 guest 內解開；layer 解開在 ext4 資料碟上，以 overlayfs 疊起來（`development.md:83-90`）

### 3.2 Guest agent 與容器
- agent 是單一 `poll()` 迴圈：服務 host、回收子行程、轉送輸出、轉發 port、回答 DNS、跑 DHCP（`development.md:79-82`）
- 網路設定靠**手寫的 rtnetlink 和 nf_tables 訊息**，不呼叫 `ip` 或 `iptables`（`development.md:86`）
- seccomp 是**手寫的 BPF deny list**（Docker 用的是 allow list）。作者說保護效果相同，但程式短很多，每次 syscall 執行的指令更少（`kiri-init/src/linux/seccomp.rs:1-10`）
- 容器拆解成 kernel 原語的耗時（`bench/results.json` `kernel_primitives`）：namespaces + exec 0.78 ms、加上 netns 1.15 ms、cgroup v2 1.23 ms、overlay mount 0.36 ms、veth 2.2 ms、**刪除 veth 18.9 ms**（Docker 在 `--rm` 回傳前會做這一步）
- Kiri 在 `--rm` 容器的紀錄移除後就回報結束，guest 內的檔案稍後才刪；把刪除也算進去，約 3 ms（`bench/results.json` caveats[2]）
- 每個容器的 shim 記憶體是 0（沒有 shim）。對照 OrbStack 每個 shim 約 7.9 MB，143 個 shim 共 1133 MB（`bench/results.json`）
- 記憶體 balloon：保留 guest 實際用量加 256 MiB，其餘還給 macOS（`engine.rs:22-27`）。但原始碼註解也說 Apple 的 balloon 裝置「takes pages from the guest but does not release them」，所以**真正把記憶體全部還回去的是休眠**（`engine.rs:1137-1141`）

### 3.3 Mac 整合的實作方式
- `kiri setup`（`setup.rs:1-25`）除了 context、LaunchAgent、builder 以外，還會：
  - 把 `docker` 和 `kiri` 放進 `~/.kiri/bin`，並在 zsh、bash、fish 的 profile 加一行，接到 PATH 的**最後面**，已安裝的 docker CLI 仍然優先
  - 在沒有其他 Docker 引擎的 Mac 上，把 `kiri` 設成 docker 的預設 context
  - 寫入 `/etc/resolver/kiri.local`（需要一次管理員權限）
  - 在 `/var/run/docker.sock` 沒被其他引擎占用時連到 Kiri，並裝一個 LaunchDaemon 讓開機後連結還在
- `*.kiri.local` 的做法：daemon 在 127.0.0.1:**53535** 跑一個小型 DNS，所有 `*.kiri.local` 都回答 127.0.0.1；再由監聽 80/443 的 router 依 Host header（HTTPS 用 SNI）挑容器。整個過程不需要 root（`daemon/dns.rs:1-5,19-21`；`daemon/domains.rs:1-7`）
- Finder 的 `~/Kiri`：daemon 自己實作一個**唯讀 NFSv3 server**，掛在 Unix socket 上，用 macOS 內建的 `mount_nfs`，不需要 kext 或 admin。用 socket 而不是 loopback port，是因為 kernel 會告訴 server 連線的是誰（`daemon/nfs.rs:1-14`）
- Mac 的 published port：連線經 VM 的 NAT 網路交給 guest kernel DNAT，guest 不必複製資料；VPN 搶走路由時才退回 vsock relay。註解寫明「vsock is several times slower in Virtualization.framework」（`daemon/ports.rs:1-7`）
- 視窗不是 Electron：Mac 用 AppKit 加系統 WebKit（objc2），Linux 用 GTK 加 WebKitGTK 4.1，Windows 用 Win32 加 WebView2。頁面是一個內嵌的 HTML（`ui/mod.rs:1-8`；`packaging/README.md:68-71`；runkiri.com 首頁「A native app, not a web wrapper」）

### 3.4 USB 直通是怎麼做的
- Mac 的 VM 沒有 USB controller。`kiri usb attach` 透過一個 root LaunchDaemon helper（裝在 `/Library/PrivilegedHelperTools`，第一次使用時要輸入一次管理員密碼）從 macOS 搶下裝置，再用 **USB/IP** 協定交給 guest 的 `vhci_hcd`（`usb.rs:1-12`；`usb/helper.rs:1-15`；`usb/usbip.rs:1-20`）
- 不支援 isochronous URB，會回 `-EINVAL`（`usbip.rs:20`），所以 webcam 和音訊這類裝置大概不能用（這是推論）
- Linux 原生就看得到裝置；Windows 透過 **usbipd-win** 交給 WSL 2（`usb.rs:11-12`）

### 3.5 Kiri Share 的協定
- 一條 TLS 連線（ALPN）上多工承載所有訪客連線，每條是一個編號 stream，以 window credit 做流量控制（`kiri-share-proto/src/lib.rs:1-25`；`share.rs:17-24`）
- 支援「lanes」，可以多開幾條連線分散 chunk，改善長距離傳輸（`docs/releases/0.1.1.md`）
- 官方 build 會用內嵌的 build key 回應 edge 的 attestation challenge；自己編的版本會顯示為「unverified」（`share.rs:52-63`）
- 名稱保留要人工審核，「usually within a day」，數量受方案限制（`share.rs:1889-1900,1952-1958`）
- 訪客第一次造訪會看到 Kiri 的警告頁，防止被拿來釣魚（runkiri.com/share）
- **edge 伺服器不在這個 repo**，只有 client 和協定（crates 只有 `kiri-share-proto`）；`*.runkiri.cloud` 是官方託管的服務

### 3.6 其他平台的實測數字（repo 內的 bench 文件）
- Windows（2026-10-25，`bench/windows-2026-10-25.md`）：`docker run --rm alpine true` Kiri **78 ms** vs DD 491 ms；200 MB 容器 → host 255 MB/s vs 40 MB/s
- Ubuntu on WSL2（2026-10-26，`bench/ubuntu-2026-10-26.md`）：run Kiri 188 ms、Docker Engine 697 ms、Podman 1105 ms、nerdctl 631 ms
  - **Kiri 輸的地方**：published port 吞吐量 **10.3 Gbit/s，Docker Engine 是 100.7 Gbit/s**，因為 Kiri 在 user space relay；`exec` 比 nerdctl 慢約 3 倍
- 官網 Mac 四引擎表（2026-11-02，runkiri.com/benchmarks）：Kiri 在多數項目領先，但 **1 GB bind mount 讀取**（1724 MB/s，Colima 5235、OrbStack 3240）和**新 HTTP 連線數**（1892/s，OrbStack 2389/s）落後。官網自己也寫了這兩點

### 3.7 發行、安全與可信度
- 正式版由**私有 repo** 建置，因為簽章金鑰不能放在公開 CI 上，但建置腳本都在公開 repo（`xtask/`、`scripts/`、`packaging/`）；build 還不是 byte-for-byte reproducible（`RELEASES.md`）
- Linux 每次發版會在 Ubuntu 和 Fedora 上實際安裝並跑容器，沒通過就不發（`RELEASES.md`；`packaging/README.md:28-32`）
- 0.1.15 起有簽章的 apt/dnf 套件庫（`docs/releases/0.1.15.md`）。不過 `packaging/README.md:86-87` 還寫著「Not yet: an apt/dnf repository … and signing」，**文件之間互相矛盾**，以較新的 release notes 為準
- 0.1.17 大幅加強 log 和 crash report 的去敏感化（token、cookie、JWT、email、使用者名稱等），crash report 只在使用者打開後才會送出（`docs/releases/0.1.17.md`；`diag/mod.rs:1-26`）
- 測試：`tests/e2e.sh` 約 350 項檢查，透過真實的 docker CLI 執行，另有 leak soak（`development.md:101`），以及 `edge.sh`、`ipv6-conformance.sh`、`testcontainers-api.py` 等
- 貢獻需要簽 CLA，授權給 **Canestack Labs**（`CLA.md`）。「Kiri」名稱和 logo 不在 Apache-2.0 授權範圍內，fork 必須改名（`README.md:146-147`）
- VM 當掉時，`always` 和 `unless-stopped` 的容器會自動在新 VM 重啟，backoff 從 100 ms 到 1 分鐘（`development.md:111-126`）

### 3.8 專案成熟度與時間軸
| 版本 | 日期（runkiri.com/releases） | 重點（`docs/releases/`） |
|---|---|---|
| 0.0.1 | 2026-08-04 | 首版（repo 內沒有 notes） |
| 0.1.0 | 官網沒列 | Kiri Share、k8s 視窗、Builds 和漏洞掃描、Docker Hub 搜尋（`docs/releases/0.1.0.md`） |
| 0.1.1 | 2026-09-30 | `kiri` 在所有終端機都能用、Share 流量顯示和多連線 |
| 0.1.7 | 2026-11-01 | **Windows 版**（x64、ARM，未簽章） |
| 0.1.8 | 2026-11-01 | Intel Mac |
| 0.1.11 | 2026-11-01 | IPv6、127.0.0.11 DNS、share 名稱審核 |
| 0.1.12 | 2026-11-01 | Linux 自動 setup（`host-access`）、Stop 會維持停止 |
| 0.1.14 | 2026-11-02 | 安裝後保持安靜、Linux 安裝不啟動任何東西、引擎以休眠狀態啟動 |
| 0.1.15 | 2026-11-03 | Linux 簽章套件庫 |
| 0.1.17 | 2026-11-03 | 隱私和去敏感化（0.1.16 有打 tag 但沒發佈），第一位外部貢獻者 |
| 0.1.18 | 2026-11-06 | 視窗內建終端機、k8s hostPath |
| 0.2.0 | 2026-11-10 | USB（beta）、15 種語言 |
| 0.2.1 | 2026-11-15 | Testcontainers、GHCR/ECR、38 種語言（**目前最新**） |

- GitHub repo 在 **2026-11-02 才建立／公開**（GitHub API `created_at`）。查詢當下（2026-11-18）約 10.4k stars、468 forks、186 個 open issue 和 PR（API 回傳，會隨時間變動）
- GitHub repo 描述是「…with free Ngrok alternative」，可見 Share 是賣點之一
- Homebrew 只有計畫，還沒做（`packaging/README.md:89-119`）

### 3.9 可調整的環境變數（原始碼裡找到的）
`KIRI_IDLE_SECS`（預設 60）、`KIRI_BUILDER_IDLE_SECS`（預設 300）、`KIRI_CPUS`、`KIRI_MEMORY_MIB`、`KIRI_SOCKET`、`KIRI_DATA_DIR`（Mac 資料預設在 `~/Library/Application Support/Kiri`）、`KIRI_LOG`、`KIRI_BRIDGE_IPV6`、`KIRI_UPDATE_URL`（出處：`engine.rs:38-53,1280-1284`、`daemon/mod.rs:56-60`、`development.md:55-56`、`diag/mod.rs:11-12`、`network.rs:555-557`、`update.rs:6`）

### 3.10 `f68a8d2` 之後的 17 個 commit（到 HEAD `36923b2`）
重要的幾個：Linux/WSL 在 kernel < 6.3 時容器連不上網路和防火牆失效的修正（`ccf612b`，`NFT_MSG_DESTROYTABLE` 只有 6.3+ 才有）、published TCP 連線閒置多久都不斷線（`efcfb17`）、guest kernel 支援 loop device（`d60d28d`）、`/info` 回報 daemon 時間讓 Compose 5.7 能 attach（`d161a46`）、Finder 顯示 volume 和 bind mount（`2182531`）、import 的 volume helper 只用官方映像（`36923b2`）。

---

## 4. 建議對 spec.md 做的修正

1. **來源標頭**：補上「查核時 HEAD 為 `36923b2`（2026-11-18）」；最新發佈版本 0.2.1（2026-11-15）。
2. **效能數字**：保留 README 的 2.55 ms／80×，但**加註量測條件**（2026-10-24；OrbStack 當時負載很重，有 86 個容器和 k8s）。同時**列出官網較新的公平量測**（2026-11-02，各引擎 2 CPU／8 GB）：CLI 22 vs 178/279/152 ms（「8×」），API 3.1 vs 163/238/88 ms。簡報最好用官網這組，或兩組並列並標清楚。
3. 刪掉或改寫「**快兩個數量級**」，改成「README 數字約 80 倍，條件公平時 CLI 約 8 倍」。
4. **`kiri bench`**：補充只有 macOS 能跑、預設 50 次加 `--network none`，和 README 表格的條件不同。
5. **daemon 15 MB、agent 900 KB**：加註實測 9.7 MB（daemon 加 agent）和 650 KB（`bench/results.json`），或改寫成「約 10–15 MB」「< 1 MB」。
6. **60 秒休眠**：補上條件「沒有執行中的容器或 exec」，以及 `KIRI_IDLE_SECS`。
7. **`update-alternatives`**：改成「`/usr/bin/docker` 不存在，**或已經是 alternatives 連結**時」。
8. **`kiri update`**：註明只有 macOS 有。Linux/Windows 上同名指令實際會執行 `docker update`；Linux 用 apt/dnf 套件庫更新。
9. **`kiri machine stop|start|restart`** 要寫成 `kiri machine stop dev` 這種帶 NAME 的形式；machine 掛載的是「Mac `/Users`、Linux `/home`」。
10. **`kiri import`、`kiri setup`、`kiri bench`** 都標成 macOS 限定；Windows 的 import 走 Settings → Import。
11. **BuildKit 閒置**：改成「閒置 5 分鐘後暫停（pause），引擎休眠前才停止」。
12. **`172.18.0.1`**：加註「實際值是預設 bridge 的 gateway，以 `docker network inspect bridge` 為準」（原始碼預設 bridge 是 172.17.0.0/16）。
13. **Windows 安裝檔目前沒有簽章**，SmartScreen 會跳警告，可以加進「限制與注意」。
14. **Linux 視窗**只有 x86-64 完整版 `kiri` 套件才有；`kiri-lite` 和 ARM 套件沒有。
15. **§8 對照表**中 Docker Desktop／OrbStack 的平台和開源欄位不在 Kiri 的一手來源裡，要另外查證或刪掉。
16. **CLI 補充**：`kiri share names|reserve|release`、`kiri daemon`、`kiri raw …`、`kiri diag report --send`、`kiri setup --docker-socket|--domains|--no-agent`。
17. **「限制與注意」可以加上**：published port 吞吐量約為 Docker Engine 的 1/10（user-space relay）；Mac 的 bind mount 讀取比 Colima、OrbStack 慢；USB 不支援 isochronous；Share 的 edge 是官方託管服務（不開源）；官網標示 Beta。
